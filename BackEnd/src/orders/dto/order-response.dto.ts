import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus, PaymentStatus, GameCode, ServiceType } from '../../enums';

export class OrderResponseDto {
  @ApiProperty({
    description: 'Order ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id!: string;

  @ApiProperty({
    description: 'Customer user ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  userId!: string;

  @ApiPropertyOptional({
    description: 'Assigned booster ID',
    example: '550e8400-e29b-41d4-a716-446655440002',
    nullable: true,
  })
  boosterId!: string | null;

  @ApiProperty({
    description: 'Game code',
    enum: GameCode,
    example: GameCode.CS2,
  })
  gameCode!: GameCode;

  @ApiProperty({
    description: 'Service type',
    enum: ServiceType,
    example: ServiceType.RANK_BOOST,
  })
  serviceType!: ServiceType;

  @ApiProperty({
    description: 'Order status',
    enum: OrderStatus,
    example: OrderStatus.IN_PROGRESS,
  })
  status!: OrderStatus;

  @ApiProperty({
    description: 'Payment status',
    enum: PaymentStatus,
    example: PaymentStatus.PAID,
  })
  paymentStatus!: PaymentStatus;

  @ApiProperty({
    description: 'Current rank/level',
    example: 'Gold Nova 1',
  })
  currentRank!: string;

  @ApiProperty({
    description: 'Target rank/level',
    example: 'Legendary Eagle',
  })
  targetRank!: string;

  @ApiProperty({
    description: 'Order price',
    example: 49.99,
  })
  price!: number;

  @ApiProperty({
    description: 'Currency code',
    example: 'USD',
  })
  currency!: string;

  @ApiProperty({
    description: 'Platform commission',
    example: 4.99,
  })
  commission!: number;

  @ApiPropertyOptional({
    description: 'Additional notes',
    example: 'Please stream all games',
    nullable: true,
  })
  notes!: string | null;

  @ApiProperty({
    description: 'Order creation timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-01T12:00:00.000Z',
  })
  updatedAt!: Date;

  @ApiPropertyOptional({
    description: 'Deletion timestamp (soft delete)',
    example: null,
    nullable: true,
  })
  deletedAt!: Date | null;
}

export class OrderListResponseDto {
  @ApiProperty({
    description: 'List of orders',
    type: [OrderResponseDto],
  })
  orders!: OrderResponseDto[];

  @ApiProperty({
    description: 'Total count',
    example: 42,
  })
  total!: number;

  @ApiProperty({
    description: 'Current page',
    example: 1,
  })
  page!: number;

  @ApiProperty({
    description: 'Items per page',
    example: 20,
  })
  limit!: number;
}

export class OrderStatsDto {
  @ApiProperty({
    description: 'Total orders count',
    example: 150,
  })
  total!: number;

  @ApiProperty({
    description: 'Pending orders count',
    example: 10,
  })
  pending!: number;

  @ApiProperty({
    description: 'In progress orders count',
    example: 25,
  })
  inProgress!: number;

  @ApiProperty({
    description: 'Completed orders count',
    example: 100,
  })
  completed!: number;

  @ApiProperty({
    description: 'Cancelled orders count',
    example: 15,
  })
  cancelled!: number;

  @ApiProperty({
    description: 'Total revenue',
    example: 7499.50,
  })
  totalRevenue!: number;
}
