import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from '../entities/review.entity';
import { OrderEntity } from '../orders/orders.entity';
import { UserEntity } from '../users.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { OrderStatus, UserRole } from '../enums/index';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewsRepository: Repository<ReviewEntity>,
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  /**
   * Create a new review
   */
  async create(userId: string, dto: CreateReviewDto): Promise<ReviewEntity> {
    // Find order and verify it belongs to the user
    const order = await this.ordersRepository.findOne({
      where: { id: dto.orderId },
      relations: ['user', 'booster'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.userId !== userId) {
      throw new ForbiddenException('You can only review your own orders');
    }

    if (order.status !== OrderStatus.COMPLETED) {
      throw new ForbiddenException('You can only review completed orders');
    }

    if (!order.boosterId) {
      throw new ForbiddenException('Order must have a booster to review');
    }

    // Check if review already exists
    const existingReview = await this.reviewsRepository.findOne({
      where: { orderId: dto.orderId },
    });

    if (existingReview) {
      throw new ConflictException('Review already exists for this order');
    }

    // Create review
    const review = this.reviewsRepository.create({
      orderId: dto.orderId,
      customerId: userId,
      boosterId: order.boosterId,
      rating: dto.rating,
      comment: dto.comment || null,
    });

    const savedReview = await this.reviewsRepository.save(review);

    // Update booster rating
    await this.updateBoosterRating(order.boosterId);

    return savedReview;
  }

  /**
   * Get reviews by booster ID
   */
  async findByBooster(boosterId: string): Promise<ReviewEntity[]> {
    return this.reviewsRepository.find({
      where: { boosterId, isVisible: true },
      relations: ['customer', 'order'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get review by ID
   */
  async findById(id: string): Promise<ReviewEntity> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['customer', 'booster', 'order'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  /**
   * Update review (admin or customer)
   */
  async update(
    id: string,
    dto: UpdateReviewDto,
    userId: string,
    userRole: UserRole,
  ): Promise<ReviewEntity> {
    const review = await this.findById(id);

    // Only customer can update rating/comment, only admin can update visibility/response
    if (userRole === UserRole.CUSTOMER) {
      if (review.customerId !== userId) {
        throw new ForbiddenException('You can only update your own reviews');
      }

      if (dto.rating !== undefined) {
        review.rating = dto.rating;
      }

      if (dto.comment !== undefined) {
        review.comment = dto.comment;
      }

      // Update booster rating if rating changed
      if (dto.rating !== undefined) {
        await this.updateBoosterRating(review.boosterId);
      }
    } else if (userRole === UserRole.ADMIN) {
      if (dto.isVisible !== undefined) {
        review.isVisible = dto.isVisible;
      }

      if (dto.adminResponse !== undefined) {
        review.adminResponse = dto.adminResponse;
      }
    }

    return this.reviewsRepository.save(review);
  }

  /**
   * Delete review
   */
  async remove(id: string, userId: string, userRole: UserRole): Promise<void> {
    const review = await this.findById(id);

    if (userRole === UserRole.CUSTOMER && review.customerId !== userId) {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    const boosterId = review.boosterId;
    await this.reviewsRepository.remove(review);

    // Update booster rating
    await this.updateBoosterRating(boosterId);
  }

  /**
   * Update booster rating based on all their reviews
   */
  private async updateBoosterRating(boosterId: string): Promise<void> {
    const result = await this.reviewsRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avgRating')
      .where('review.boosterId = :boosterId', { boosterId })
      .andWhere('review.isVisible = :isVisible', { isVisible: true })
      .getRawOne();

    const avgRating = result?.avgRating ? parseFloat(result.avgRating) : 0;

    await this.usersRepository.update(boosterId, {
      boosterRating: avgRating,
    });
  }

  /**
   * Get all reviews (admin only)
   */
  async findAll(includeHidden: boolean = false): Promise<ReviewEntity[]> {
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
