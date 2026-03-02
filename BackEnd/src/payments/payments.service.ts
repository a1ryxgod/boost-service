import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { TransactionEntity, PaymentMethod, TransactionType } from '../entities/transaction.entity';
import { OrderEntity } from '../orders/orders.entity';
import { PaymentStatus, OrderStatus } from '../enums/index';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly apiKey = process.env.COINBASE_COMMERCE_API_KEY ?? '';
  private readonly webhookSecret = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET ?? '';
  private readonly apiUrl = 'https://api.commerce.coinbase.com';

  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionsRepository: Repository<TransactionEntity>,
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
  ) {}

  /**
   * Create Coinbase Commerce checkout charge for an order
   */
  async createCheckoutSession(userId: string, orderId: string): Promise<{ url: string; chargeId: string }> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.userId !== userId) {
      throw new ForbiddenException('You can only pay for your own orders');
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Order is not in PENDING status');
    }

    // Create pending transaction record
    const transaction = this.transactionsRepository.create({
      userId,
      orderId,
      transactionType: TransactionType.ORDER_PAYMENT,
      paymentMethod: PaymentMethod.CRYPTO,
      amount: order.price,
      currency: 'USD',
      status: PaymentStatus.PENDING,
    });

    const savedTransaction = await this.transactionsRepository.save(transaction);

    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';

    const chargePayload = {
      name: `${order.gameCode} — ${order.serviceType.replace('_', ' ')}`,
      description: `${order.currentRank} → ${order.targetRank}`,
      pricing_type: 'fixed_price',
      local_price: {
        amount: order.price.toFixed(2),
        currency: 'USD',
      },
      metadata: {
        orderId: order.id,
        transactionId: savedTransaction.id,
        userId,
      },
      redirect_url: `${frontendUrl}/orders/${orderId}/success`,
      cancel_url: `${frontendUrl}/orders/${orderId}/cancel`,
    };

    const response = await fetch(`${this.apiUrl}/charges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': this.apiKey,
        'X-CC-Version': '2018-03-22',
      },
      body: JSON.stringify(chargePayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Coinbase Commerce error: ${errorText}`);
      throw new BadRequestException('Failed to create payment charge');
    }

    const data = await response.json() as { data: { id: string; hosted_url: string } };

    savedTransaction.externalId = data.data.id;
    await this.transactionsRepository.save(savedTransaction);

    return {
      url: data.data.hosted_url,
      chargeId: data.data.id,
    };
  }

  /**
   * Handle Coinbase Commerce webhook
   */
  async handleWebhook(signature: string, rawBody: Buffer): Promise<void> {
    if (!this.webhookSecret) {
      this.logger.warn('COINBASE_COMMERCE_WEBHOOK_SECRET is not set');
      return;
    }

    const expectedSig = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (signature !== expectedSig) {
      throw new BadRequestException('Invalid webhook signature');
    }

    const event = JSON.parse(rawBody.toString()) as {
      event: { type: string; data: { id: string; metadata: { transactionId: string } } };
    };

    const eventType = event.event.type;
    this.logger.log(`Coinbase Commerce webhook: ${eventType}`);

    if (eventType === 'charge:confirmed' || eventType === 'charge:resolved') {
      const { transactionId } = event.event.data.metadata;
      const chargeId = event.event.data.id;
      await this.completePayment(transactionId, chargeId);
    }

    if (eventType === 'charge:failed') {
      const chargeId = event.event.data.id;
      await this.failPayment(chargeId, 'Charge failed');
    }
  }

  /**
   * Complete payment and update order status
   */
  async completePayment(transactionId: string, externalId: string): Promise<void> {
    const transaction = await this.transactionsRepository.findOne({
      where: { id: transactionId },
      relations: ['order'],
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    transaction.status = PaymentStatus.PAID;
    transaction.externalId = externalId;
    transaction.completedAt = new Date();
    await this.transactionsRepository.save(transaction);

    if (transaction.orderId) {
      await this.ordersRepository.update(transaction.orderId, {
        paymentStatus: PaymentStatus.PAID,
        status: OrderStatus.PAID,
      });
    }
  }

  /**
   * Fail payment by charge ID
   */
  async failPayment(externalId: string, errorMessage: string): Promise<void> {
    const transaction = await this.transactionsRepository.findOne({
      where: { externalId },
    });

    if (!transaction) {
      return;
    }

    transaction.status = PaymentStatus.FAILED;
    transaction.errorMessage = errorMessage;
    await this.transactionsRepository.save(transaction);

    if (transaction.orderId) {
      await this.ordersRepository.update(transaction.orderId, {
        paymentStatus: PaymentStatus.FAILED,
      });
    }
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(userId: string, transactionId: string): Promise<TransactionEntity> {
    const transaction = await this.transactionsRepository.findOne({
      where: { id: transactionId, userId },
      relations: ['order'],
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  /**
   * Get user's transactions
   */
  async getUserTransactions(userId: string): Promise<TransactionEntity[]> {
    return this.transactionsRepository.find({
      where: { userId },
      relations: ['order'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Refund payment (admin only)
   */
  async refundPayment(transactionId: string): Promise<TransactionEntity> {
    const transaction = await this.transactionsRepository.findOne({
      where: { id: transactionId },
      relations: ['order'],
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.status !== PaymentStatus.PAID) {
      throw new BadRequestException('Can only refund paid transactions');
    }

    const refund = this.transactionsRepository.create({
      userId: transaction.userId,
      orderId: transaction.orderId,
      transactionType: TransactionType.REFUND,
      paymentMethod: transaction.paymentMethod,
      amount: transaction.amount,
      currency: transaction.currency,
      status: PaymentStatus.REFUNDED,
      completedAt: new Date(),
    });

    await this.transactionsRepository.save(refund);

    transaction.status = PaymentStatus.REFUNDED;
    await this.transactionsRepository.save(transaction);

    if (transaction.orderId) {
      await this.ordersRepository.update(transaction.orderId, {
        paymentStatus: PaymentStatus.REFUNDED,
        status: OrderStatus.CANCELLED,
      });
    }

    return transaction;
  }
}
