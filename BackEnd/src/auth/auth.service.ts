import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { UserEntity } from '../users.entity';
import { SessionEntity } from '../entities/session.entity';
import { RegisterDto, LoginDto, AuthResponseDto, UserResponseDto } from './dto';
import { UserRole } from '../enums';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
    private jwtService: JwtService,
    private notificationsService: NotificationsService,
  ) {}

  /**
   * Register a new user
   */
  async register(dto: RegisterDto, userAgent?: string, ipAddress?: string): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    // Create user
    const user = this.userRepository.create({
      email: dto.email,
      password: hashedPassword,
      role: dto.role || UserRole.CUSTOMER,
      emailVerificationToken,
    });

    await this.userRepository.save(user);

    // Send verification email (non-blocking)
    this.notificationsService.sendVerificationEmail(user, emailVerificationToken).catch(() => {});

    // Generate tokens and create session
    return this.createAuthResponse(user, userAgent, ipAddress);
  }

  /**
   * Login user
   */
  async login(dto: LoginDto, userAgent?: string, ipAddress?: string): Promise<AuthResponseDto> {
    // Find user by email
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens and create session
    return this.createAuthResponse(user, userAgent, ipAddress);
  }

  /**
   * Refresh access token using refresh token
   */
  async refresh(user: UserEntity, oldRefreshToken: string, userAgent?: string, ipAddress?: string): Promise<AuthResponseDto> {
    // Invalidate old session
    await this.sessionRepository.update(
      { refreshToken: oldRefreshToken },
      { isActive: false },
    );

    // Create new session with new tokens
    return this.createAuthResponse(user, userAgent, ipAddress);
  }

  /**
   * Logout user (invalidate refresh token)
   */
  async logout(userId: string, refreshToken?: string): Promise<void> {
    if (refreshToken) {
      // Invalidate specific session
      await this.sessionRepository.update(
        { userId, refreshToken, isActive: true },
        { isActive: false },
      );
    } else {
      // Invalidate all user sessions
      await this.sessionRepository.update(
        { userId, isActive: true },
        { isActive: false },
      );
    }
  }

  /**
   * Logout from all devices (invalidate all sessions)
   */
  async logoutAll(userId: string): Promise<void> {
    await this.sessionRepository.update(
      { userId, isActive: true },
      { isActive: false },
    );
  }

  /**
   * Get all active sessions for a user
   */
  async getSessions(userId: string): Promise<SessionEntity[]> {
    return this.sessionRepository.find({
      where: { userId, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Create auth response with tokens and session
   */
  private async createAuthResponse(
    user: UserEntity,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<AuthResponseDto> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Generate access token (30 minutes)
    const accessToken = this.jwtService.sign(
      { ...payload, type: 'access' },
      {
        secret: process.env.JWT_SECRET || process.env.JWT_ACCESS_SECRET || 'your-secret-key-change-in-production',
        expiresIn: '30m',
      },
    );

    // Generate refresh token (7 days)
    const refreshToken = this.jwtService.sign(
      { ...payload, type: 'refresh' },
      {
        secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production',
        expiresIn: '7d',
      },
    );

    // Create session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    const session = this.sessionRepository.create({
      userId: user.id,
      refreshToken,
      userAgent,
      ipAddress,
      expiresAt,
      isActive: true,
    });

    await this.sessionRepository.save(session);

    // Return response
    const userResponse: UserResponseDto = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken,
      refreshToken,
      user: userResponse,
    };
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    if (user.emailVerified) {
      return { message: 'Email already verified' };
    }

    await this.userRepository.update(user.id, {
      emailVerified: true,
      emailVerifiedAt: new Date(),
      emailVerificationToken: null,
    });

    return { message: 'Email verified successfully' };
  }

  /**
   * Resend email verification
   */
  async resendVerification(userId: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.emailVerified) {
      throw new BadRequestException('Email is already verified');
    }

    const token = crypto.randomBytes(32).toString('hex');
    await this.userRepository.update(userId, { emailVerificationToken: token });
    user.emailVerificationToken = token;

    await this.notificationsService.sendVerificationEmail(user, token);

    return { message: 'Verification email sent' };
  }

  /**
   * Send password reset email
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    // Always return success to prevent email enumeration
    if (!user) {
      return { message: 'If an account with that email exists, a reset link has been sent' };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour

    await this.userRepository.update(user.id, {
      passwordResetToken: token,
      passwordResetExpires: expires,
    });
    user.passwordResetToken = token;

    await this.notificationsService.sendPasswordResetEmail(user, token);

    return { message: 'If an account with that email exists, a reset link has been sent' };
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { passwordResetToken: token },
    });

    if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userRepository.update(user.id, {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    });

    // Invalidate all sessions for security
    await this.sessionRepository.update({ userId: user.id, isActive: true }, { isActive: false });

    return { message: 'Password reset successfully. Please log in with your new password.' };
  }

  /**
   * Validate user by ID (used by guards)
   */
  async validateUser(userId: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
