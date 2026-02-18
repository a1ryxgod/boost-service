import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { GameCode } from '../enums/index';
import { ApiProperty } from '@nestjs/swagger';

@Entity('games')
@Index(['slug'], { unique: true })
@Index(['isActive'])
export class GameEntity {
  @ApiProperty({
    description: 'Game ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Game code',
    enum: GameCode,
    example: GameCode.CS2,
  })
  @Column({ type: 'enum', enum: GameCode, unique: true })
  code!: GameCode;

  @ApiProperty({
    description: 'Game name',
    example: 'Counter-Strike 2',
  })
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @ApiProperty({
    description: 'URL slug',
    example: 'cs2',
  })
  @Column({ type: 'varchar', length: 100, unique: true })
  slug!: string;

  @ApiProperty({
    description: 'Game description',
    example: 'Professional CS2 boosting services',
  })
  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @ApiProperty({
    description: 'Game icon URL',
    example: '/assets/games/cs2-icon.png',
  })
  @Column({ name: 'icon_url', type: 'varchar', length: 500, nullable: true })
  iconUrl!: string | null;

  @ApiProperty({
    description: 'Game banner URL',
    example: '/assets/games/cs2-banner.jpg',
  })
  @Column({ name: 'banner_url', type: 'varchar', length: 500, nullable: true })
  bannerUrl!: string | null;

  @ApiProperty({
    description: 'Display order',
    example: 1,
  })
  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder!: number;

  @ApiProperty({
    description: 'Is game active',
    example: true,
  })
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @ApiProperty({
    description: 'Additional metadata',
    example: { minRank: 'Silver', maxRank: 'Global Elite' },
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
