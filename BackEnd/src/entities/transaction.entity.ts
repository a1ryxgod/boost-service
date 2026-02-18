import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { UserEntity } from '../users.entity';
import { OrderEntity } from '../orders/orders.entity';
import { PaymentStatus } from '../enums/index';
import { ApiProperty } from '@nestjs/swagger';

export enum PaymentMethod {
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
  CRYPTO = 'CRYPTO',
}

export enum TransactionType {
  ORDER_PAYMENT = 'ORDER_PAYMENT',
  REFUND = 'REFUND',
  PAYOUT = 'PAYOUT',
}

@Entity('transactions')
@Index(['userId'])
@Index(['orderId'])
@Index(['status'])
@Index(['externalId'], { unique: true })
export class TransactionEntity {
  @ApiProperty({
    description: 'Transaction ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Column({ type: 'uuid', name: 'user_id' })
  userId!: string;

  @ApiProperty({
    description: 'Related user',
    type: () => UserEntity,
  })
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ApiProperty({
    description: 'Order ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Column({ type: 'uuid', name: 'order_id', nullable: true })
  orderId!: string | null;

  @ApiProperty({
    description: 'Related order',
    type: () => OrderEntity,
  })
  @ManyToOne(() => OrderEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'order_id' })
  order!: OrderEntity | null;

  @ApiProperty({
    description: 'Transaction type',
    enum: TransactionType,
    example: TransactionType.ORDER_PAYMENT,
  })
  @Column({ type: 'enum', enum: TransactionType, name: 'transaction_type' })
  transactionType!: TransactionType;

  @ApiProperty({
    description: 'Payment method',
    enum: PaymentMethod,
    example: PaymentMethod.STRIPE,
  })
  @Column({ type: 'enum', enum: PaymentMethod, name: 'payment_method' })
  paymentMethod!: PaymentMethod;

  @ApiProperty({
    description: 'Amount in USD',
    example: 49.99,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @ApiProperty({
    description: 'Currency code',
    example: 'USD',
  })
  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency!: string;

  @ApiProperty({
    description: 'Payment status',
    enum: PaymentStatus,
    example: PaymentStatus.PAID,
  })
  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status!: PaymentStatus;

  @ApiProperty({
    description: 'External payment ID (Stripe, PayPal)',
    example: 'pi_3AbcDefGhiJkLmNo',
  })
  @Column({ name: 'external_id', type: 'varchar', length: 255, nullable: true })
  externalId!: string | null;

  @ApiProperty({
    description: 'Payment session ID',
    example: 'cs_test_123456789',
  })
  @Column({ name: 'session_id', type: 'varchar', length: 255, nullable: true })
  sessionId!: string | null;

  @ApiProperty({
    description: 'Payment metadata',
    example: { cardLast4: '4242', cardBrand: 'visa' },
  })
  @Column({ type: 'jsonb', nullable: true })
  metadata!: Record<string, any> | null;

  @ApiProperty({
    description: 'Error message if payment failed',
    example: 'Insufficient funds',
  })
  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage!: string | null;

  @ApiProperty({
    description: 'Completed at timestamp',
    example: '2024-01-01T00:00:00Z',
  })
  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt!: Date | null;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-01T00:00:00Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-01T00:00:00Z',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
