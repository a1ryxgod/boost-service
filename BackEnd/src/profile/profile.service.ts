import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users.entity';
import { SessionEntity } from '../entities/session.entity';
import { OrderEntity } from '../orders/orders.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { OrderStatus } from '../enums/index';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(SessionEntity)
    private readonly sessionsRepository: Repository<SessionEntity>,
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
  ) {}

  /**
   * Get user profile
   */
  async getProfile(userId: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Remove password from response
    delete (user as any).password;

    return user;
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, dto);
    const updatedUser = await this.usersRepository.save(user);

    // Remove password from response
    delete (updatedUser as any).password;

    return updatedUser;
  }

  /**
   * Change password
   */
  async changePassword(userId: string, dto: ChangePasswordDto): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Hash and save new password
    user.password = await bcrypt.hash(dto.newPassword, 10);
    await this.usersRepository.save(user);

    // Invalidate all sessions except current one (optional security measure)
    // For now, we'll just let them expire naturally
  }

  /**
   * Get user's active sessions
   */
  async getSessions(userId: string): Promise<SessionEntity[]> {
    return this.sessionsRepository.find({
      where: { userId, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Revoke a session
   */
  async revokeSession(userId: string, sessionId: string): Promise<void> {
    const session = await this.sessionsRepository.findOne({
      where: { id: sessionId, userId },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    session.isActive = false;
    await this.sessionsRepository.save(session);
  }

  /**
   * Revoke all sessions except current one
   */
  async revokeAllSessions(userId: string, currentSessionId: string): Promise<void> {
    await this.sessionsRepository
      .createQueryBuilder()
      .update(SessionEntity)
      .set({ isActive: false })
      .where('userId = :userId', { userId })
      .andWhere('id != :currentSessionId', { currentSessionId })
      .execute();
  }

  /**
   * Get user's orders
   */
  async getOrders(userId: string): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      relations: ['booster'],
    });
  }

  /**
   * Get user statistics
   */
  async getStatistics(userId: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const totalOrders = await this.ordersRepository.count({
      where: { userId },
    });

    const completedOrders = await this.ordersRepository.count({
      where: { userId, status: OrderStatus.COMPLETED },
    });

    const result = await this.ordersRepository
      .createQueryBuilder('order')
      .select('SUM(order.price)', 'totalSpent')
      .where('order.userId = :userId', { userId })
      .andWhere('order.status = :status', { status: OrderStatus.COMPLETED })
      .getRawOne();

    const totalSpent = parseFloat(result?.totalSpent || '0');

    return {
      totalOrders,
      completedOrders,
      totalSpent,
      memberSince: user.createdAt,
      boosterRating: user.boosterRating,
      completedOrdersCount: user.completedOrdersCount,
      totalEarnings: user.totalEarnings,
    };
  }
}
