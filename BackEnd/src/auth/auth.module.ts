import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from '../users.entity';
import { SessionEntity } from '../entities/session.entity';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SessionEntity]),
    PassportModule.register({ defaultStrategy: 'jwt-access' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
  exports: [AuthService, JwtAccessStrategy],
})
export class AuthModule {}
