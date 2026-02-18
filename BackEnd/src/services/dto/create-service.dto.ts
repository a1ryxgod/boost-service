import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsBoolean,
  IsInt,
  IsOptional,
  IsArray,
  IsObject,
  IsUUID,
  IsNumber,
  MaxLength,
  MinLength,
  Min,
} from 'class-validator';
import { ServiceType } from '../../enums/index';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Game ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('4')
  gameId!: string;

  @ApiProperty({
    description: 'Service type',
    enum: ServiceType,
    example: ServiceType.RANK_BOOST,
  })
  @IsEnum(ServiceType)
  serviceType!: ServiceType;

  @ApiProperty({
    description: 'Service name',
    example: 'Rank Boost',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiPropertyOptional({
    description: 'Service description',
    example: 'Boost your rank to the desired level',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Base price in USD',
    example: 29.99,
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  basePrice!: number;

  @ApiPropertyOptional({
    description: 'Price per rank/level',
    example: 5.99,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  pricePerUnit?: number;

  @ApiPropertyOptional({
    description: 'Estimated completion time in hours',
    example: 24,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  estimatedHours?: number;

  @ApiPropertyOptional({
    description: 'Service icon URL',
    example: '/assets/services/rank-boost.png',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  iconUrl?: string;

  @ApiPropertyOptional({
    description: 'Display order',
    example: 1,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @ApiPropertyOptional({
    description: 'Is service active',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Service features',
    example: ['Anonymous mode', '24/7 support', 'Money-back guarantee'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiPropertyOptional({
    description: 'Additional metadata',
    example: { ranks: ['Silver', 'Gold', 'Platinum'] },
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
