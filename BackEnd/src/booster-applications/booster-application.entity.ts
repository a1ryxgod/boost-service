import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../users.entity';
import { ApplicationStatus, GameCode } from '../enums';

@Entity('booster_applications')
export class BoosterApplicationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => UserEntity, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @Column({ type: 'simple-array' })
  games!: GameCode[];

  @Column({ name: 'main_game', type: 'varchar', length: 50 })
  mainGame!: string;

  @Column({ name: 'current_rank', type: 'varchar', length: 100 })
  currentRank!: string;

  @Column({ name: 'peak_rank', type: 'varchar', length: 100, nullable: true })
  peakRank!: string | null;

  @Column({ name: 'years_experience', type: 'int' })
  yearsExperience!: number;

  @Column({ type: 'text' })
  motivation!: string;

  @Column({ name: 'profile_link', type: 'varchar', length: 500, nullable: true })
  profileLink!: string | null;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status!: ApplicationStatus;

  @Column({ name: 'admin_note', type: 'text', nullable: true })
  adminNote!: string | null;

  @Column({ name: 'reviewed_by', type: 'uuid', nullable: true })
  reviewedBy!: string | null;

  @Column({ name: 'reviewed_at', type: 'timestamp', nullable: true })
  reviewedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
