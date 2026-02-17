import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../../enums';

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'New order status',
    enum: OrderStatus,
    example: OrderStatus.ASSIGNED,
  })
  @IsEnum(OrderStatus)
  status!: OrderStatus;

  @ApiPropertyOptional({
    description: 'Booster ID (required when status is ASSIGNED)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID('4')
  boosterId?: string;
}
