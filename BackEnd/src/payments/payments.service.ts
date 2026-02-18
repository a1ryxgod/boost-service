import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity, PaymentMethod, TransactionType } from '../entities/transaction.entity';
import { OrderEntity } from '../orders/orders.entity';
import { PaymentStatus, OrderStatus } from '../enums/index';

/**
 * Payments Service
 *
 * This service handles payment processing with Stripe.
 * For production, install: npm install stripe
 * Then uncomment Stripe integration code below.
 */
@Injectable()
export class PaymentsService {
  // private stripe: Stripe;

  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionsRepository: Repository<TransactionEntity>,
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
  ) {
    // Initialize Stripe (uncomment when stripe package is installed)
    // this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    //   apiVersion: '2023-10-16',
    // });
  }

  /**
   * Create checkout session for an order
   */
  async createCheckoutSession(userId: string, orderId: string): Promise<any> {
    // Find order
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

    // Create transaction record
    const transaction = this.transactionsRepository.create({
      userId,
      orderId,
      transactionType: TransactionType.ORDER_PAYMENT,
      paymentMethod: PaymentMethod.STRIPE,
      amount: order.price,
      currency: 'USD',
      status: PaymentStatus.PENDING,
    });

    const savedTransaction = await this.transactionsRepository.save(transaction);

    /**
     * STRIPE INTEGRATION (Uncomment when stripe is installed)
     *
     * const session = await this.stripe.checkout.sessions.create({
     *   payment_method_types: ['card'],
     *   line_items: [
     *     {
     *       price_data: {
     *         currency: 'usd',
     *         product_data: {
     *           name: `${order.gameCode} - ${order.serviceType}`,
     *           description: order.description || 'Game boosting service',
     *         },
     *         unit_amount: Math.round(order.price * 100),
     *       },
     *       quantity: 1,
     *     },
     *   ],
     *   mode: 'payment',
     *   success_url: `${process.env.FRONTEND_URL}/orders/${orderId}/success`,
     *   cancel_url: `${process.env.FRONTEND_URL}/orders/${orderId}/cancel`,
     *   metadata: {
     *     orderId,
     *     transactionId: savedTransaction.id,
     *   },
     * });
     *
     * // Update transaction with session ID
     * savedTransaction.sessionId = session.id;
     * savedTransaction.externalId = session.payment_intent as string;
     * await this.transactionsRepository.save(savedTransaction);
     *
     * return {
     *   sessionId: session.id,
     *   url: session.url,
     * };
     */

    // Mock response for development (remove when Stripe is integrated)
    return {
      transactionId: savedTransaction.id,
      sessionId: 'mock_session_id',
      url: `http://localhost:3000/mock-payment?orderId=${orderId}`,
      message: 'Stripe integration not configured. Install stripe package to enable.',
    };
  }

  /**
   * Handle Stripe webhook
   */
  async handleWebhook(signature: string, payload: any): Promise<void> {
    /**
     * STRIPE WEBHOOK HANDLING (Uncomment when stripe is installed)
     *
     * let event: Stripe.Event;
     *
     * try {
     *   event = this.stripe.webhooks.constructEvent(
     *     payload,
     *     signature,
     *     process.env.STRIPE_WEBHOOK_SECRET || '',
     *   );
     * } catch (err) {
     *   throw new BadRequestException('Invalid webhook signature');
     * }
     *
     * switch (event.type) {
     *   case 'checkout.session.completed':
     *     const session = event.data.object as Stripe.Checkout.Session;
     *     await this.completePayment(
     *       session.metadata?.transactionId || '',
     *       session.payment_intent as string,
     *     );
     *     break;
     *
     *   case 'payment_intent.payment_failed':
     *     const paymentIntent = event.data.object as Stripe.PaymentIntent;
     *     await this.failPayment(
     *       paymentIntent.id,
     *       paymentIntent.last_payment_error?.message || 'Payment failed',
     *     );
     *     break;
     * }
     */

    console.log('Webhook received (Stripe not configured):', signature);
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

    // Update order status
    if (transaction.orderId) {
      await this.ordersRepository.update(transaction.orderId, {
        paymentStatus: PaymentStatus.PAID,
        status: OrderStatus.PAID,
      });
    }
  }

  /**
   * Fail payment
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

    // Update order payment status
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

    /**
     * STRIPE REFUND (Uncomment when stripe is installed)
     *
     * if (transaction.externalId) {
     *   await this.stripe.refunds.create({
     *     payment_intent: transaction.externalId,
     *   });
     * }
     */

    // Create refund transaction
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

    // Update original transaction
    transaction.status = PaymentStatus.REFUNDED;
    await this.transactionsRepository.save(transaction);

    // Update order status
    if (transaction.orderId) {
      await this.ordersRepository.update(transaction.orderId, {
        paymentStatus: PaymentStatus.REFUNDED,
        status: OrderStatus.CANCELLED,
      });
    }

    return transaction;
  }
}
