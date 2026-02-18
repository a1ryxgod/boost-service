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
import { GameEntity } from './game.entity';
import { ServiceType } from '../enums/index';
import { ApiProperty } from '@nestjs/swagger';

@Entity('services')
@Index(['gameId'])
@Index(['isActive'])
@Index(['gameId', 'serviceType'], { unique: true })
export class ServiceEntity {
  @ApiProperty({
    description: 'Service ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Game ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Column({ type: 'uuid', name: 'game_id' })
  gameId!: string;

  @ApiProperty({
    description: 'Related game',
    type: () => GameEntity,
  })
  @ManyToOne(() => GameEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'game_id' })
  game!: GameEntity;

  @ApiProperty({
    description: 'Service type',
    enum: ServiceType,
    example: ServiceType.RANK_BOOST,
  })
  @Column({ type: 'enum', enum: ServiceType, name: 'service_type' })
  serviceType!: ServiceType;

  @ApiProperty({
    description: 'Service name',
    example: 'Rank Boost',
  })
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @ApiProperty({
    description: 'Service description',
    example: 'Boost your rank to the desired level',
  })
  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @ApiProperty({
    description: 'Base price in USD',
    example: 29.99,
  })
  @Column({ name: 'base_price', type: 'decimal', precision: 10, scale: 2 })
  basePrice!: number;

  @ApiProperty({
    description: 'Price per rank/level',
    example: 5.99,
  })
  @Column({
    name: 'price_per_unit',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  pricePerUnit!: number | null;

  @ApiProperty({
    description: 'Estimated completion time in hours',
    example: 24,
  })
  @Column({ name: 'estimated_hours', type: 'int', nullable: true })
  estimatedHours!: number | null;

  @ApiProperty({
    description: 'Service icon URL',
    example: '/assets/services/rank-boost.png',
  })
  @Column({ name: 'icon_url', type: 'varchar', length: 500, nullable: true })
  iconUrl!: string | null;

  @ApiProperty({
    description: 'Display order',
    example: 1,
  })
  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder!: number;

  @ApiProperty({
    description: 'Is service active',
    example: true,
  })
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @ApiProperty({
    description: 'Service features (JSON)',
    example: ['Anonymous mode', '24/7 support', 'Money-back guarantee'],
  })
  @Column({ type: 'jsonb', nullable: true })
  features!: string[] | null;

  @ApiProperty({
    description: 'Additional metadata',
    example: { ranks: ['Silver', 'Gold', 'Platinum'] },
  })
  @Column({ type: 'jsonb', nullable: true })
  metadata!: Record<string, any> | null;

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
