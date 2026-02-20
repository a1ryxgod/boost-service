import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Ip,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto, AuthResponseDto } from './dto';
import { JwtAccessAuthGuard } from './guards/jwt-access-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@ApiTags('Authentication')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async register(
    @Body() dto: RegisterDto,
    @Headers('user-agent') userAgent: string,
    @Ip() ipAddress: string,
  ): Promise<AuthResponseDto> {
    return this.authService.register(dto, userAgent, ipAddress);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() dto: LoginDto,
    @Headers('user-agent') userAgent: string,
    @Ip() ipAddress: string,
  ): Promise<AuthResponseDto> {
    return this.authService.login(dto, userAgent, ipAddress);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  async refresh(
    @Body() dto: RefreshTokenDto,
    @Request() req: any,
    @Headers('user-agent') userAgent: string,
    @Ip() ipAddress: string,
  ): Promise<AuthResponseDto> {
    return this.authService.refresh(req.user, dto.refreshToken, userAgent, ipAddress);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user (invalidate current session)' })
  @ApiResponse({ status: 200, description: 'User successfully logged out' })
  async logout(
    @Request() req: any,
    @Body() body: { refreshToken?: string },
  ): Promise<{ message: string }> {
    await this.authService.logout(req.user.id, body.refreshToken);
    return { message: 'Successfully logged out' };
  }

  @Post('logout-all')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout from all devices (invalidate all sessions)' })
  @ApiResponse({ status: 200, description: 'All sessions invalidated' })
  async logoutAll(@Request() req: any): Promise<{ message: string }> {
    await this.authService.logoutAll(req.user.id);
    return { message: 'Successfully logged out from all devices' };
  }

  @Get('me')
  @UseGuards(JwtAccessAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiResponse({ status: 200, description: 'Returns current user data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMe(@Request() req: any) {
    const { password, ...user } = req.user;
    return { user };
  }

  @Get('sessions')
  @UseGuards(JwtAccessAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all active sessions for current user' })
  @ApiResponse({ status: 200, description: 'Returns list of active sessions' })
  async getSessions(@Request() req: any) {
    const sessions = await this.authService.getSessions(req.user.id);
    return { sessions };
  }
}
