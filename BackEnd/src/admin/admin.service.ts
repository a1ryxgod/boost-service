import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { UserEntity } from '../users.entity';
import { OrderEntity } from '../orders/orders.entity';
import { TransactionEntity } from '../entities/transaction.entity';
import { ReviewEntity } from '../entities/review.entity';
import { UserStatus, UserRole, OrderStatus } from '../enums/index';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    @InjectRepository(TransactionEntity)
    private readonly transactionsRepository: Repository<TransactionEntity>,
    @InjectRepository(ReviewEntity)
    private readonly reviewsRepository: Repository<ReviewEntity>,
  ) {}

  /**
   * Get all users with filtering
   */
  async getUsers(
    role?: UserRole,
    status?: UserStatus,
  ): Promise<UserEntity[]> {
    const where: FindOptionsWhere<UserEntity> = {};

    if (role) {
      where.role = role;
    }

    if (status) {
      where.status = status;
    }

    const users = await this.usersRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });

    // Remove passwords
    return users.map((user) => {
      delete (user as any).password;
      return user;
    });
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    delete (user as any).password;
    return user;
  }

  /**
   * Update user status (ban/suspend/activate)
   */
  async updateUserStatus(
    userId: string,
    status: UserStatus,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = status;
    const updatedUser = await this.usersRepository.save(user);

    delete (updatedUser as any).password;
    return updatedUser;
  }

  /**
   * Get all orders with filtering
   */
  async getOrders(
    status?: OrderStatus,
    gameCode?: string,
  ): Promise<OrderEntity[]> {
    const where: FindOptionsWhere<OrderEntity> = {};

    if (status) {
      where.status = status;
    }

    if (gameCode) {
      where.gameCode = gameCode as any;
    }

    return this.ordersRepository.find({
      where,
      relations: ['user', 'booster'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get order by ID
   */
  async getOrderById(orderId: string): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'booster'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  /**
   * Update order status
   */
  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
  ): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = status;
    return this.ordersRepository.save(order);
  }

  /**
   * Assign order to booster
   */
  async assignOrder(orderId: string, boosterId: string): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const booster = await this.usersRepository.findOne({
      where: { id: boosterId },
    });

    if (!booster) {
      throw new NotFoundException('Booster not found');
    }

    if (booster.role !== UserRole.BOOSTER) {
      throw new BadRequestException('User is not a booster');
    }

    order.boosterId = boosterId;
    order.status = OrderStatus.ASSIGNED;

    return this.ordersRepository.save(order);
  }

  /**
   * Get platform statistics
   */
  async getStatistics(): Promise<any> {
    const totalUsers = await this.usersRepository.count();
    const totalCustomers = await this.usersRepository.count({
      where: { role: UserRole.CUSTOMER },
    });
    const totalBoosters = await this.usersRepository.count({
      where: { role: UserRole.BOOSTER },
    });

    const totalOrders = await this.ordersRepository.count();
    const pendingOrders = await this.ordersRepository.count({
      where: { status: OrderStatus.PENDING },
    });
    const inProgressOrders = await this.ordersRepository.count({
      where: { status: OrderStatus.IN_PROGRESS },
    });
    const completedOrders = await this.ordersRepository.count({
      where: { status: OrderStatus.COMPLETED },
    });

    const revenueResult = await this.ordersRepository
      .createQueryBuilder('order')
      .select('SUM(order.price)', 'totalRevenue')
      .where('order.status = :status', { status: OrderStatus.COMPLETED })
      .getRawOne();

    const totalRevenue = parseFloat(revenueResult?.totalRevenue || '0');

    const totalTransactions = await this.transactionsRepository.count();
    const totalReviews = await this.reviewsRepository.count();

    const avgRatingResult = await this.reviewsRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avgRating')
      .where('review.isVisible = :isVisible', { isVisible: true })
      .getRawOne();

    const averageRating = parseFloat(avgRatingResult?.avgRating || '0');

    return {
      users: {
        total: totalUsers,
        customers: totalCustomers,
        boosters: totalBoosters,
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        inProgress: inProgressOrders,
        completed: completedOrders,
      },
      revenue: {
        total: totalRevenue,
      },
      transactions: {
        total: totalTransactions,
      },
      reviews: {
        total: totalReviews,
        averageRating,
      },
    };
  }

  /**
   * Get all transactions
   */
  async getTransactions(): Promise<TransactionEntity[]> {
    return this.transactionsRepository.find({
      relations: ['user', 'order'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get all reviews
   */
  async getReviews(includeHidden: boolean = false): Promise<ReviewEntity[]> {
    const where: any = {};

    if (!includeHidden) {
      where.isVisible = true;
    }

    return this.reviewsRepository.find({
      where,
      relations: ['customer', 'booster', 'order'],
      order: { createdAt: 'DESC' },
    });
  }
}
