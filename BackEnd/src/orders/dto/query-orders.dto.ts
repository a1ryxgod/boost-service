import { IsOptional, IsEnum, IsInt, Min, Max, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { OrderStatus, PaymentStatus, GameCode, ServiceType } from '../../enums';

export class QueryOrdersDto {
  @ApiPropertyOptional({
    description: 'Filter by order status',
    enum: OrderStatus,
    example: OrderStatus.IN_PROGRESS,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiPropertyOptional({
    description: 'Filter by payment status',
    enum: PaymentStatus,
    example: PaymentStatus.PAID,
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @ApiPropertyOptional({
    description: 'Filter by game code',
    enum: GameCode,
    example: GameCode.CS2,
  })
  @IsOptional()
  @IsEnum(GameCode)
  gameCode?: GameCode;

  @ApiPropertyOptional({
    description: 'Filter by service type',
    enum: ServiceType,
    example: ServiceType.RANK_BOOST,
  })
  @IsOptional()
  @IsEnum(ServiceType)
  serviceType?: ServiceType;

  @ApiPropertyOptional({
    description: 'Filter by user ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID('4')
  userId?: string;

  @ApiPropertyOptional({
    description: 'Filter by booster ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsOptional()
  @IsUUID('4')
  boosterId?: string;

  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 20,
    minimum: 1,
    maximum: 100,
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
