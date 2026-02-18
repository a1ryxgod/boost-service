import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { UserRole, UserStatus } from './enums/index';

@Entity('users')
@Index(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ type: 'text' })
  password!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role!: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  // Profile fields
  @Column({ name: 'first_name', type: 'varchar', length: 100, nullable: true })
  firstName!: string | null;

  @Column({ name: 'last_name', type: 'varchar', length: 100, nullable: true })
  lastName!: string | null;

  @Column({ name: 'avatar_url', type: 'varchar', length: 500, nullable: true })
  avatarUrl!: string | null;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
  phone!: string | null;

  @Column({ name: 'country', type: 'varchar', length: 100, nullable: true })
  country!: string | null;

  // Booster-specific fields
  @Column({ name: 'booster_rating', type: 'decimal', precision: 3, scale: 2, default: 0, nullable: true })
  boosterRating!: number | null;

  @Column({ name: 'completed_orders_count', type: 'int', default: 0 })
  completedOrdersCount!: number;

  @Column({ name: 'total_earnings', type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalEarnings!: number;

  // Notification settings
  @Column({ name: 'email_notifications', type: 'boolean', default: true })
  emailNotifications!: boolean;

  @Column({ name: 'push_notifications', type: 'boolean', default: true })
  pushNotifications!: boolean;

  // Verification
  @Column({ name: 'email_verified', type: 'boolean', default: false })
  emailVerified!: boolean;

  @Column({ name: 'email_verified_at', type: 'timestamp', nullable: true })
  emailVerifiedAt!: Date | null;

  // Timestamps
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;

  // Last activity
  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  lastLoginAt!: Date | null;
}
