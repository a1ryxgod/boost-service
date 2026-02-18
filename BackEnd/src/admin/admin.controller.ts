import {
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Query,
  Body,
  UseGuards,
  ParseUUIDPipe,
  ParseEnumPipe,
  ParseBoolPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { AssignOrderDto } from './dto/assign-order.dto';
import { UserEntity } from '../users.entity';
import { OrderEntity } from '../orders/orders.entity';
import { TransactionEntity } from '../entities/transaction.entity';
import { ReviewEntity } from '../entities/review.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole, UserStatus, OrderStatus } from '../enums/index';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller({ path: 'admin', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: UserRole,
    description: 'Filter by role',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: UserStatus,
    description: 'Filter by status',
  })
  @ApiResponse({
    status: 200,
    description: 'Users list retrieved successfully',
    type: [UserEntity],
  })
  async getUsers(
    @Query('role') role?: UserRole,
    @Query('status') status?: UserStatus,
  ): Promise<UserEntity[]> {
    return this.adminService.getUsers(role, status);
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user by ID (admin only)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserEntity> {
    return this.adminService.getUserById(id);
  }

  @Patch('users/:id/status')
  @ApiOperation({ summary: 'Update user status (ban/suspend/activate)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User status updated successfully',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUserStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserStatusDto,
  ): Promise<UserEntity> {
    return this.adminService.updateUserStatus(id, dto.status);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get all orders (admin only)' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: OrderStatus,
    description: 'Filter by status',
  })
  @ApiQuery({
    name: 'gameCode',
    required: false,
    type: String,
    description: 'Filter by game code',
  })
  @ApiResponse({
    status: 200,
    description: 'Orders list retrieved successfully',
    type: [OrderEntity],
  })
  async getOrders(
    @Query('status') status?: OrderStatus,
    @Query('gameCode') gameCode?: string,
  ): Promise<OrderEntity[]> {
    return this.adminService.getOrders(status, gameCode);
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Get order by ID (admin only)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({
    status: 200,
    description: 'Order retrieved successfully',
    type: OrderEntity,
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrderById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OrderEntity> {
    return this.adminService.getOrderById(id);
  }

  @Patch('orders/:id/status')
  @ApiOperation({ summary: 'Update order status (admin only)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({
    status: 200,
    description: 'Order status updated successfully',
    type: OrderEntity,
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async updateOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('status', new ParseEnumPipe(OrderStatus)) status: OrderStatus,
  ): Promise<OrderEntity> {
    return this.adminService.updateOrderStatus(id, status);
  }

  @Post('orders/:id/assign')
  @ApiOperation({ summary: 'Assign order to booster (admin only)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({
    status: 200,
    description: 'Order assigned successfully',
    type: OrderEntity,
  })
  @ApiResponse({ status: 404, description: 'Order or booster not found' })
  @ApiResponse({ status: 400, description: 'User is not a booster' })
  async assignOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AssignOrderDto,
  ): Promise<OrderEntity> {
    return this.adminService.assignOrder(id, dto.boosterId);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get platform statistics (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Statistics retrieved successfully',
  })
  async getStatistics(): Promise<any> {
    return this.adminService.getStatistics();
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Get all transactions (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Transactions list retrieved successfully',
    type: [TransactionEntity],
  })
  async getTransactions(): Promise<TransactionEntity[]> {
    return this.adminService.getTransactions();
  }

  @Get('reviews')
  @ApiOperation({ summary: 'Get all reviews (admin only)' })
  @ApiQuery({
    name: 'includeHidden',
    required: false,
    type: Boolean,
    description: 'Include hidden reviews',
  })
  @ApiResponse({
    status: 200,
    description: 'Reviews list retrieved successfully',
    type: [ReviewEntity],
  })
  async getReviews(
    @Query('includeHidden', new DefaultValuePipe(false), ParseBoolPipe)
    includeHidden: boolean,
  ): Promise<ReviewEntity[]> {
    return this.adminService.getReviews(includeHidden);
  }
}
