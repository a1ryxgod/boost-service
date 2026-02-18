import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserEntity } from '../users.entity';
import { SessionEntity } from '../entities/session.entity';
import { OrderEntity } from '../orders/orders.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtRequest } from '../auth/strategies/jwt-access.strategy';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller({ path: 'profile', version: '1' })
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile retrieved successfully',
    type: UserEntity,
  })
  async getProfile(@Request() req: JwtRequest): Promise<UserEntity> {
    return this.profileService.getProfile(req.user.id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: UserEntity,
  })
  async updateProfile(
    @Request() req: JwtRequest,
    @Body() dto: UpdateProfileDto,
  ): Promise<UserEntity> {
    return this.profileService.updateProfile(req.user.id, dto);
  }

  @Patch('change-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 401, description: 'Current password is incorrect' })
  async changePassword(
    @Request() req: JwtRequest,
    @Body() dto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    await this.profileService.changePassword(req.user.id, dto);
    return { message: 'Password changed successfully' };
  }

  @Get('sessions')
  @ApiOperation({ summary: 'Get active sessions' })
  @ApiResponse({
    status: 200,
    description: 'Sessions retrieved successfully',
    type: [SessionEntity],
  })
  async getSessions(@Request() req: JwtRequest): Promise<SessionEntity[]> {
    return this.profileService.getSessions(req.user.id);
  }

  @Delete('sessions/:sessionId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke a specific session' })
  @ApiParam({ name: 'sessionId', description: 'Session ID' })
  @ApiResponse({ status: 200, description: 'Session revoked successfully' })
  @ApiResponse({ status: 404, description: 'Session not found' })
  async revokeSession(
    @Request() req: JwtRequest,
    @Param('sessionId', ParseUUIDPipe) sessionId: string,
  ): Promise<{ message: string }> {
    await this.profileService.revokeSession(req.user.id, sessionId);
    return { message: 'Session revoked successfully' };
  }

  @Delete('sessions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke all sessions except current' })
  @ApiResponse({ status: 200, description: 'All sessions revoked successfully' })
  async revokeAllSessions(@Request() req: JwtRequest): Promise<{ message: string }> {
    await this.profileService.revokeAllSessions(req.user.id, req.user.sessionId);
    return { message: 'All sessions revoked successfully' };
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get user orders' })
  @ApiResponse({
    status: 200,
    description: 'Orders retrieved successfully',
    type: [OrderEntity],
  })
  async getOrders(@Request() req: JwtRequest): Promise<OrderEntity[]> {
    return this.profileService.getOrders(req.user.id);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get user statistics' })
  @ApiResponse({
    status: 200,
    description: 'Statistics retrieved successfully',
  })
  async getStatistics(@Request() req: JwtRequest): Promise<any> {
    return this.profileService.getStatistics(req.user.id);
  }
}
