import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BoosterService, BoosterStats } from './booster.service';
import { OrderEntity } from '../orders/orders.entity';
import { TransactionEntity } from '../entities/transaction.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../enums';

interface JwtRequest {
  user: { id: string; role: UserRole };
}

@ApiTags('Booster')
@ApiBearerAuth()
@Controller({ path: 'booster', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.BOOSTER)
export class BoosterController {
  constructor(private readonly boosterService: BoosterService) {}

  @Get('available-orders')
  @ApiOperation({ summary: 'Get available orders for boosters (PAID, unassigned)' })
  @ApiResponse({ status: 200, description: 'Available orders list', type: [OrderEntity] })
  async getAvailableOrders(): Promise<OrderEntity[]> {
    return this.boosterService.getAvailableOrders();
  }

  @Get('my-orders')
  @ApiOperation({ summary: 'Get orders assigned to current booster' })
  @ApiResponse({ status: 200, description: 'My orders list', type: [OrderEntity] })
  async getMyOrders(@Request() req: JwtRequest): Promise<OrderEntity[]> {
    return this.boosterService.getMyOrders(req.user.id);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get booster statistics (earnings, completed orders, rating)' })
  @ApiResponse({ status: 200, description: 'Booster statistics' })
  async getStats(@Request() req: JwtRequest): Promise<BoosterStats> {
    return this.boosterService.getStats(req.user.id);
  }

  @Get('earnings')
  @ApiOperation({ summary: 'Get earnings/payout history' })
  @ApiResponse({ status: 200, description: 'Earnings history', type: [TransactionEntity] })
  async getEarnings(@Request() req: JwtRequest): Promise<TransactionEntity[]> {
    return this.boosterService.getEarningsHistory(req.user.id);
  }
}
