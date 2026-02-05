import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  ValueTransformer,
} from 'typeorm';
import { OrderStatus, PaymentStatus, GameCode, ServiceType } from '../enums';

const MoneyTransformer: ValueTransformer = {
  to(value: number): number {
    return value;
  },
  from(value: string): number {
    return parseFloat(value);
  },
};

@Entity('orders')
@Index(['userId', 'status'])
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'uuid', nullable: true, default: null })
  boosterId!: string | null;

  @Column({ type: 'enum', enum: GameCode })
  gameCode!: GameCode;

  @Column({ type: 'enum', enum: ServiceType })
  serviceType!: ServiceType;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus!: PaymentStatus;

  @Column({ type: 'varchar', length: 64 })
  currentRank!: string;

  @Column({ type: 'varchar', length: 64 })
  targetRank!: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, transformer: MoneyTransformer })
  price!: number;

  @Column({ type: 'varchar', length: 3 })
  currency!: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0, transformer: MoneyTransformer })
  commission!: number;

  @Column({ type: 'text', nullable: true, default: null })
  notes!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
