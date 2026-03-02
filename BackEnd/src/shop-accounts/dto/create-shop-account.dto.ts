import {
  IsEnum, IsString, IsNumber, IsPositive, IsOptional,
  IsBoolean, IsInt, IsObject, IsArray, MaxLength, MinLength, Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GameCode } from '../../enums';

export class CreateShopAccountDto {
  @ApiProperty({ enum: GameCode })
  @IsEnum(GameCode)
  gameCode!: GameCode;

  @ApiProperty({ example: 'Gold Nova 4' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  rank!: string;

  @ApiProperty({ example: 'Gold Nova' })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  rankGroup!: string;

  @ApiPropertyOptional({ example: '🥇' })
  @IsOptional()
  @IsString()
  @MaxLength(16)
  rankIcon?: string;

  @ApiPropertyOptional({ example: 'rgba(212, 175, 55, 0.15)' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  rankColor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 24.99 })
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiPropertyOptional({ example: 'USD' })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;

  @ApiPropertyOptional({ example: 'Popular' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  badge?: string;

  @ApiPropertyOptional({ example: { hours: '150–300h', winRate: '51%' } })
  @IsOptional()
  @IsObject()
  stats?: Record<string, string>;

  @ApiPropertyOptional({ example: ['Prime Status', 'Low hours'] })
  @IsOptional()
  @IsArray()
  features?: string[];

  @ApiPropertyOptional({ example: ['5-Year Coin'] })
  @IsOptional()
  @IsArray()
  medals?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  screenshots?: { gradient: string; label: string; url?: string }[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  displayOrder?: number;
}
