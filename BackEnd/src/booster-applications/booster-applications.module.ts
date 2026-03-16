import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoosterApplicationEntity } from './booster-application.entity';
import { BoosterApplicationsService } from './booster-applications.service';
import { UserEntity } from '../users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoosterApplicationEntity, UserEntity])],
  providers: [BoosterApplicationsService],
  exports: [BoosterApplicationsService],
})
export class BoosterApplicationsModule {}
