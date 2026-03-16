import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { DiscountType } from '../enums';

@Entity('promo_codes')
@Index(['code'], { unique: true })
export class PromoCodeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 32, unique: true })
  code!: string;

  @Column({ type: 'enum', enum: DiscountType, name: 'discount_type' })
  discountType!: DiscountType;

  @Column({ type: 'numeric', precision: 10, scale: 2, name: 'discount_value' })
  discountValue!: number;

  @Column({ type: 'int', name: 'max_uses', nullable: true, default: null })
  maxUses!: number | null;

  @Column({ type: 'int', name: 'used_count', default: 0 })
  usedCount!: number;

  @Column({ type: 'timestamp', name: 'expires_at', nullable: true, default: null })
  expiresAt!: Date | null;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
