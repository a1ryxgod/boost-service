import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsInt, IsOptional, IsObject, MaxLength, MinLength } from 'class-validator';

export class UpdateGameDto {
  @ApiPropertyOptional({
    description: 'Game name',
    example: 'Counter-Strike 2',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    description: 'URL slug',
    example: 'cs2',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  slug?: string;

  @ApiPropertyOptional({
    description: 'Game description',
    example: 'Professional CS2 boosting services',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Game icon URL',
    example: '/assets/games/cs2-icon.png',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  iconUrl?: string;

  @ApiPropertyOptional({
    description: 'Game banner URL',
    example: '/assets/games/cs2-banner.jpg',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bannerUrl?: string;

  @ApiPropertyOptional({
    description: 'Display order',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @ApiPropertyOptional({
    description: 'Is game active',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Additional metadata',
    example: { minRank: 'Silver', maxRank: 'Global Elite' },
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
