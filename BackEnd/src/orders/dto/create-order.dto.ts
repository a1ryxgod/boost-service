import { IsEnum, IsString, IsNumber, IsPositive, IsOptional, MinLength, MaxLength, Length } from 'class-validator';
import { GameCode, ServiceType } from '../../enums';

export class CreateOrderDto {
  @IsEnum(GameCode)
  gameCode!: GameCode;

  @IsEnum(ServiceType)
  serviceType!: ServiceType;

  @IsString()
  @MinLength(1)
  @MaxLength(64)
  currentRank!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(64)
  targetRank!: string;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsString()
  @Length(3, 3)
  currency!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  notes?: string;
}
