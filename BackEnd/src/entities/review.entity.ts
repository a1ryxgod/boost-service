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
import { ApiProperty } from '@nestjs/swagger';

@Entity('reviews')
@Index(['boosterId'])
@Index(['orderId'], { unique: true })
@Index(['rating'])
export class ReviewEntity {
  @ApiProperty({
    description: 'Review ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Order ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Column({ type: 'uuid', name: 'order_id' })
  orderId!: string;

  @ApiProperty({
    description: 'Related order',
    type: () => OrderEntity,
  })
  @ManyToOne(() => OrderEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: OrderEntity;

  @ApiProperty({
    description: 'Customer ID (who wrote the review)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Column({ type: 'uuid', name: 'customer_id' })
  customerId!: string;

  @ApiProperty({
    description: 'Customer who wrote the review',
    type: () => UserEntity,
  })
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer!: UserEntity;

  @ApiProperty({
    description: 'Booster ID (who received the review)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Column({ type: 'uuid', name: 'booster_id' })
  boosterId!: string;

  @ApiProperty({
    description: 'Booster who received the review',
    type: () => UserEntity,
  })
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'booster_id' })
  booster!: UserEntity;

  @ApiProperty({
    description: 'Rating (1-5)',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @Column({ type: 'int' })
  rating!: number;

  @ApiProperty({
    description: 'Review comment',
    example: 'Excellent service, very professional!',
  })
  @Column({ type: 'text', nullable: true })
  comment!: string | null;

  @ApiProperty({
    description: 'Is review visible',
    example: true,
  })
  @Column({ name: 'is_visible', type: 'boolean', default: true })
  isVisible!: boolean;

  @ApiProperty({
    description: 'Admin response to the review',
    example: 'Thank you for your feedback!',
  })
  @Column({ name: 'admin_response', type: 'text', nullable: true })
  adminResponse!: string | null;

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
