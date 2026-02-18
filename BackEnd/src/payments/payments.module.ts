import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { TransactionEntity } from '../entities/transaction.entity';
import { OrderEntity } from '../orders/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity, OrderEntity])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
