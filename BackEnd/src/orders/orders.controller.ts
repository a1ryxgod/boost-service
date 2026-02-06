import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
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

/**
 * POST   /api/v1/orders           — создание заказа
 * GET    /api/v1/orders           — список заказов
 * GET    /api/v1/orders/:id       — заказ по ID
 * PATCH  /api/v1/orders/:id/status — смена статуса
 */
@Controller({ path: 'orders', version: '1' })
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER)
  async create(
    @Request() req: JwtRequest,
    @Body() dto: CreateOrderDto,
  ): Promise<OrderEntity> {
    return this.ordersService.create(req.user.id, dto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  async findAll(@Request() req: JwtRequest): Promise<OrderEntity[]> {
    return this.ordersService.findAll(req.user.id, req.user.role);
  }

  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OrderEntity> {
    return this.ordersService.findById(id);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateOrderStatusDto,
  ): Promise<OrderEntity> {
    return this.ordersService.updateStatus(id, dto);
  }
}
