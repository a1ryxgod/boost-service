import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ServiceEntity } from '../entities/service.entity';
import { GameEntity } from '../entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity, GameEntity])],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
