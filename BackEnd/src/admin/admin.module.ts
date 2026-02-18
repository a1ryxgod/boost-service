import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserEntity } from '../users.entity';
import { OrderEntity } from '../orders/orders.entity';
import { TransactionEntity } from '../entities/transaction.entity';
import { ReviewEntity } from '../entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      OrderEntity,
      TransactionEntity,
      ReviewEntity,
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
