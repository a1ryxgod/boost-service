import { Injectable, HttpException, HttpStatus, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { OrderEntity } from './orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';
import { OrderListResponseDto, OrderStatsDto } from './dto/order-response.dto';
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
    // Calculate commission (10% of price)
    const commission = dto.price * 0.10;

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
      commission,
    });

    return this.ordersRepository.save(order);
  }

  async findById(id: string): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user', 'booster'],
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async findByIdWithAuth(id: string, userId: string, role: UserRole): Promise<OrderEntity> {
    const order = await this.findById(id);

    // Admins can see all orders
    if (role === UserRole.ADMIN) {
      return order;
    }

    // Boosters can see their assigned orders
    if (role === UserRole.BOOSTER && order.boosterId === userId) {
      return order;
    }

    // Customers can only see their own orders
    if (role === UserRole.CUSTOMER && order.userId === userId) {
      return order;
    }

    throw new ForbiddenException('You do not have access to this order');
  }

  async findAll(userId: string, role: UserRole): Promise<OrderEntity[]> {
    const where = role === UserRole.ADMIN ? {} : { userId };

    return this.ordersRepository.find({
      where,
      order: { createdAt: 'DESC' },
      relations: ['user', 'booster'],
    });
  }

  async findAllPaginated(
    userId: string,
    role: UserRole,
    query: QueryOrdersDto,
  ): Promise<OrderListResponseDto> {
    const { page = 1, limit = 20, ...filters } = query;
    const skip = (page - 1) * limit;

    // Build where clause based on role and filters
    let where: FindOptionsWhere<OrderEntity> = {};

    // Role-based filtering
    if (role === UserRole.CUSTOMER) {
      where.userId = userId;
    } else if (role === UserRole.BOOSTER) {
      where.boosterId = userId;
    }
    // Admins can see all orders (no additional filter)

    // Apply query filters
    if (filters.status) where.status = filters.status;
    if (filters.paymentStatus) where.paymentStatus = filters.paymentStatus;
    if (filters.gameCode) where.gameCode = filters.gameCode;
    if (filters.serviceType) where.serviceType = filters.serviceType;
    if (filters.userId && role === UserRole.ADMIN) where.userId = filters.userId;
    if (filters.boosterId && role === UserRole.ADMIN) where.boosterId = filters.boosterId;

    const [orders, total] = await this.ordersRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
      relations: ['user', 'booster'],
    });

    return {
      orders,
      total,
      page,
      limit,
    };
  }

  async getAvailableOrders(): Promise<OrderEntity[]> {
    // Boosters can see orders that are PAID but not yet ASSIGNED
    return this.ordersRepository.find({
      where: {
        status: OrderStatus.PAID,
        boosterId: null as any,
      },
      order: { createdAt: 'ASC' },
      relations: ['user'],
    });
  }

  async getStatistics(): Promise<OrderStatsDto> {
    const total = await this.ordersRepository.count();
    const pending = await this.ordersRepository.count({ where: { status: OrderStatus.PENDING } });
    const inProgress = await this.ordersRepository.count({
      where: [
        { status: OrderStatus.ASSIGNED },
        { status: OrderStatus.IN_PROGRESS },
      ],
    });
    const completed = await this.ordersRepository.count({ where: { status: OrderStatus.COMPLETED } });
    const cancelled = await this.ordersRepository.count({ where: { status: OrderStatus.CANCELLED } });

    // Calculate total revenue from completed orders
    const result = await this.ordersRepository
      .createQueryBuilder('order')
      .select('SUM(order.price)', 'sum')
      .where('order.status = :status', { status: OrderStatus.COMPLETED })
      .getRawOne();

    const totalRevenue = parseFloat(result?.sum || '0');

    return {
      total,
      pending,
      inProgress,
      completed,
      cancelled,
      totalRevenue,
    };
  }

  async updateStatus(
    id: string,
    dto: UpdateOrderStatusDto,
    userId: string,
    role: UserRole,
  ): Promise<OrderEntity> {
    const order = await this.findById(id);

    // Validate permissions
    if (role === UserRole.BOOSTER && order.boosterId !== userId) {
      throw new ForbiddenException('You can only update status of your assigned orders');
    }

    this.validateTransition(order.status, dto.status);

    if (dto.status === OrderStatus.ASSIGNED) {
      this.validateBoosterAssignment(dto.boosterId);
      order.boosterId = dto.boosterId!;
    }

    // Auto-update payment status when order is paid
    if (dto.status === OrderStatus.PAID && order.paymentStatus === PaymentStatus.PENDING) {
      order.paymentStatus = PaymentStatus.PAID;
    }

    order.status = dto.status;

    return this.ordersRepository.save(order);
  }

  async assignToBooster(orderId: string, boosterId: string): Promise<OrderEntity> {
    const order = await this.findById(orderId);

    // Validate order can be assigned
    if (order.status !== OrderStatus.PAID) {
      throw new HttpException(
        'Order must be in PAID status to be assigned',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (order.boosterId !== null) {
      throw new HttpException(
        'Order is already assigned to another booster',
        HttpStatus.CONFLICT,
      );
    }

    order.boosterId = boosterId;
    order.status = OrderStatus.ASSIGNED;

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

