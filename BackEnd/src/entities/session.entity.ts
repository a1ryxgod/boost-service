import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../users.entity';

@Entity('sessions')
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id' })
  userId!: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @Column({ name: 'refresh_token', type: 'text' })
  refreshToken!: string;

  @Column({ name: 'user_agent', type: 'varchar', length: 500, nullable: true })
  userAgent!: string;

  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress!: string;

  @Column({ name: 'expires_at', type: 'timestamp' })
  expiresAt!: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
