import { IsEnum, IsString, IsNumber, IsPositive, IsOptional, MinLength, MaxLength, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GameCode, ServiceType } from '../../enums';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Game code',
    enum: GameCode,
    example: GameCode.CS2,
  })
  @IsEnum(GameCode)
  gameCode!: GameCode;

  @ApiProperty({
    description: 'Service type',
    enum: ServiceType,
    example: ServiceType.RANK_BOOST,
  })
  @IsEnum(ServiceType)
  serviceType!: ServiceType;

  @ApiProperty({
    description: 'Current rank/level',
    example: 'Gold Nova 1',
    minLength: 1,
    maxLength: 64,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  currentRank!: string;

  @ApiProperty({
    description: 'Target rank/level',
    example: 'Legendary Eagle',
    minLength: 1,
    maxLength: 64,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  targetRank!: string;

  @ApiProperty({
    description: 'Order price',
    example: 49.99,
    minimum: 0.01,
  })
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty({
    description: 'Currency code (ISO 4217)',
    example: 'USD',
    minLength: 3,
    maxLength: 3,
  })
  @IsString()
  @Length(3, 3)
  currency!: string;

  @ApiPropertyOptional({
    description: 'Additional notes or special requests',
    example: 'Please stream all games',
    maxLength: 1024,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  notes?: string;
}
