import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoosterService } from './booster.service';
import { BoosterController } from './booster.controller';
import { OrderEntity } from '../orders/orders.entity';
import { UserEntity } from '../users.entity';
import { TransactionEntity } from '../entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity, TransactionEntity])],
  controllers: [BoosterController],
  providers: [BoosterService],
})
export class BoosterModule {}
