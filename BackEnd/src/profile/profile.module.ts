import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UserEntity } from '../users.entity';
import { SessionEntity } from '../entities/session.entity';
import { OrderEntity } from '../orders/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SessionEntity, OrderEntity])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
