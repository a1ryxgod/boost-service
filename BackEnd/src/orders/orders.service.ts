import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { OrderStatus, PaymentStatus, UserRole } from '../enums';

/**
 * State machine — допустимые переходы статуса заказа.
 *
 * PENDING     →  PAID  |  CANCELLED
 * PAID        →  ASSIGNED  |  CANCELLED
 * ASSIGNED    →  IN_PROGRESS  |  CANCELLED
 * IN_PROGRESS →  COMPLETED
 * COMPLETED   →  (terminal)
 * CANCELLED   →  (terminal)
 */
const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.PAID, OrderStatus.CANCELLED],
  [OrderStatus.PAID]: [OrderStatus.ASSIGNED, OrderStatus.CANCELLED],
  [OrderStatus.ASSIGNED]: [OrderStatus.IN_PROGRESS, OrderStatus.CANCELLED],
  [OrderStatus.IN_PROGRESS]: [OrderStatus.COMPLETED],
  [OrderStatus.COMPLETED]: [],
  [OrderStatus.CANCELLED]: [],
};

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
  ) {}

  async create(userId: string, dto: CreateOrderDto): Promise<OrderEntity> {
    const order = this.ordersRepository.create({
      userId,
      gameCode: dto.gameCode,
      serviceType: dto.serviceType,
      currentRank: dto.currentRank,
      targetRank: dto.targetRank,
      price: dto.price,
      currency: dto.currency,
      notes: dto.notes ?? null,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
      commission: 0,
    });

    return this.ordersRepository.save(order);
  }

  async findById(id: string): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({ where: { id } });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async findAll(userId: string, role: UserRole): Promise<OrderEntity[]> {
    const where = role === UserRole.ADMIN ? {} : { userId };

    return this.ordersRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<OrderEntity> {
    const order = await this.findById(id);

    this.validateTransition(order.status, dto.status);

    if (dto.status === OrderStatus.ASSIGNED) {
      this.validateBoosterAssignment(dto.boosterId);
      order.boosterId = dto.boosterId!;
    }

    order.status = dto.status;

    return this.ordersRepository.save(order);
  }

  private validateTransition(current: OrderStatus, target: OrderStatus): void {
    const allowed = ALLOWED_TRANSITIONS[current];

    if (!allowed.includes(target)) {
      throw new HttpException(
        `Transition "${current}" → "${target}" is not allowed`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validateBoosterAssignment(boosterId: string | undefined): void {
    if (!boosterId) {
      throw new HttpException(
        'boosterId is required for ASSIGNED transition',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
