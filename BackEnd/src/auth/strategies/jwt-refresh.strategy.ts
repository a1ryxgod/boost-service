import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionEntity } from '../../entities/session.entity';
import { JwtPayload } from './jwt-access.strategy';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production',
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: JwtPayload) {
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token type');
    }

    const refreshToken = req.body?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    // Find active session with this refresh token
    const session = await this.sessionRepository.findOne({
      where: {
        userId: payload.sub,
        refreshToken: refreshToken,
        isActive: true,
      },
      relations: ['user'],
    });

    if (!session) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Check if session has expired
    if (new Date() > session.expiresAt) {
      await this.sessionRepository.update(session.id, { isActive: false });
      throw new UnauthorizedException('Refresh token has expired');
    }

    return session.user;
  }
}
