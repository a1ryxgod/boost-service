import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserEntity } from '../users.entity';
import { OrderEntity } from '../orders/orders.entity';
import { TransactionEntity } from '../entities/transaction.entity';
import { ReviewEntity } from '../entities/review.entity';
import { BoosterApplicationsModule } from '../booster-applications/booster-applications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      OrderEntity,
      TransactionEntity,
      ReviewEntity,
    ]),
    BoosterApplicationsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
