import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';
import {
  OrderResponseDto,
  OrderListResponseDto,
  OrderStatsDto,
} from './dto/order-response.dto';
import { OrderEntity } from './orders.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../enums';

interface JwtRequest {
  user: {
    id: string;
    role: UserRole;
  };
}

@ApiTags('Orders')
@ApiBearerAuth()
@Controller({ path: 'orders', version: '1' })
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Request() req: JwtRequest,
    @Body() dto: CreateOrderDto,
  ): Promise<OrderEntity> {
    return this.ordersService.create(req.user.id, dto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER, UserRole.BOOSTER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get orders list with filters and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Orders list retrieved successfully',
    type: OrderListResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @Request() req: JwtRequest,
    @Query() query: QueryOrdersDto,
  ): Promise<OrderListResponseDto> {
    return this.ordersService.findAllPaginated(req.user.id, req.user.role, query);
  }

  @Get('stats')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get order statistics (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Statistics retrieved successfully',
    type: OrderStatsDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin only' })
  async getStats(): Promise<OrderStatsDto> {
    return this.ordersService.getStatistics();
  }

  @Get('booster/available')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BOOSTER)
  @ApiOperation({ summary: 'Get available orders for boosters' })
  @ApiResponse({
    status: 200,
    description: 'Available orders retrieved successfully',
    type: [OrderResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Booster only' })
  async getAvailableOrders(): Promise<OrderEntity[]> {
    return this.ordersService.getAvailableOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @ApiResponse({
    status: 200,
    description: 'Order retrieved successfully',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: JwtRequest,
  ): Promise<OrderEntity> {
    return this.ordersService.findByIdWithAuth(id, req.user.id, req.user.role);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.BOOSTER)
  @ApiOperation({ summary: 'Update order status' })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @ApiResponse({
    status: 200,
    description: 'Order status updated successfully',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin/Booster only' })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateOrderStatusDto,
    @Request() req: JwtRequest,
  ): Promise<OrderEntity> {
    return this.ordersService.updateStatus(id, dto, req.user.id, req.user.role);
  }

  @Patch(':id/assign')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BOOSTER)
  @ApiOperation({ summary: 'Assign order to current booster (self-assignment)' })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @ApiResponse({
    status: 200,
    description: 'Order assigned successfully',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Order cannot be assigned (wrong status)' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Booster only' })
  async assignToSelf(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: JwtRequest,
  ): Promise<OrderEntity> {
    return this.ordersService.assignToBooster(id, req.user.id);
  }
}
