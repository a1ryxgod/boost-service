import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../orders/orders.entity';
import { UserEntity } from '../users.entity';
import { TransactionEntity } from '../entities/transaction.entity';
import { OrderStatus } from '../enums';
import { TransactionType } from '../entities/transaction.entity';

export interface BoosterStats {
  completedOrders: number;
  activeOrders: number;
  totalEarnings: number;
  rating: number | null;
}

@Injectable()
export class BoosterService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(TransactionEntity)
    private readonly transactionsRepository: Repository<TransactionEntity>,
  ) {}

  async getAvailableOrders(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      where: { status: OrderStatus.PAID, boosterId: null as any },
      order: { createdAt: 'ASC' },
      relations: ['user'],
    });
  }

  async getMyOrders(boosterId: string): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      where: { boosterId },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }

  async getStats(boosterId: string): Promise<BoosterStats> {
    const booster = await this.usersRepository.findOne({ where: { id: boosterId } });
    if (!booster) throw new NotFoundException('Booster not found');

    const completedOrders = await this.ordersRepository.count({
      where: { boosterId, status: OrderStatus.COMPLETED },
    });

    const activeOrders = await this.ordersRepository.count({
      where: [
        { boosterId, status: OrderStatus.ASSIGNED },
        { boosterId, status: OrderStatus.IN_PROGRESS },
      ],
    });

    const earningsResult = await this.ordersRepository
      .createQueryBuilder('order')
      .select('SUM(order.price - order.commission)', 'earnings')
      .where('order.booster_id = :boosterId', { boosterId })
      .andWhere('order.status = :status', { status: OrderStatus.COMPLETED })
      .getRawOne();

    const totalEarnings = parseFloat(earningsResult?.earnings || '0');

    return {
      completedOrders,
      activeOrders,
      totalEarnings,
      rating: booster.boosterRating ? Number(booster.boosterRating) : null,
    };
  }

  async getEarningsHistory(boosterId: string): Promise<TransactionEntity[]> {
    return this.transactionsRepository.find({
      where: { userId: boosterId, transactionType: TransactionType.PAYOUT },
      order: { createdAt: 'DESC' },
    });
  }
}
