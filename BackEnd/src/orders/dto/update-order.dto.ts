import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { OrderStatus } from '../../enums';

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status!: OrderStatus;

  @IsOptional()
  @IsUUID('4')
  boosterId?: string;
}
