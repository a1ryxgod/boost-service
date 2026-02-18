import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReviewEntity } from '../entities/review.entity';
import { OrderEntity } from '../orders/orders.entity';
import { UserEntity } from '../users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, OrderEntity, UserEntity])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
