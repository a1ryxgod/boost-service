import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';
import { GameCode } from '../enums';

const MoneyTransformer: ValueTransformer = {
  to(value: number): number { return value; },
  from(value: string): number { return parseFloat(value); },
};

export interface ShopScreenshot {
  gradient: string;
  label: string;
  url?: string;
}

@Entity('shop_accounts')
export class ShopAccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: GameCode })
  gameCode!: GameCode;

  @Column({ type: 'varchar', length: 128 })
  rank!: string;

  @Column({ type: 'varchar', length: 64, name: 'rank_group' })
  rankGroup!: string;

  @Column({ type: 'varchar', length: 16, name: 'rank_icon', default: '🎮' })
  rankIcon!: string;

  @Column({ type: 'varchar', length: 255, name: 'rank_color', default: '' })
  rankColor!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, transformer: MoneyTransformer })
  price!: number;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency!: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  badge!: string | null;

  @Column({ type: 'jsonb', default: {} })
  stats!: Record<string, string>;

  @Column({ type: 'jsonb', default: [] })
  features!: string[];

  @Column({ type: 'jsonb', default: [] })
  medals!: string[];

  @Column({ type: 'jsonb', default: [] })
  screenshots!: ShopScreenshot[];

  @Column({ type: 'boolean', name: 'is_available', default: true })
  isAvailable!: boolean;

  @Column({ type: 'int', name: 'display_order', default: 0 })
  displayOrder!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
