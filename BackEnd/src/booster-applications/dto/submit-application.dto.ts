import { IsArray, IsEnum, IsInt, IsOptional, IsString, IsUrl, Max, Min, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GameCode } from '../../enums';

export class SubmitApplicationDto {
  @ApiProperty({ enum: GameCode, isArray: true })
  @IsArray()
  @IsEnum(GameCode, { each: true })
  games!: GameCode[];

  @ApiProperty()
  @IsString()
  mainGame!: string;

  @ApiProperty()
  @IsString()
  currentRank!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  peakRank?: string;

  @ApiProperty({ minimum: 0, maximum: 20 })
  @IsInt()
  @Min(0)
  @Max(20)
  yearsExperience!: number;

  @ApiProperty({ minLength: 50 })
  @IsString()
  @MinLength(50)
  motivation!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  profileLink?: string;
}

export class ReviewApplicationDto {
  @ApiProperty({ enum: ['APPROVED', 'REJECTED'] })
  @IsEnum(['APPROVED', 'REJECTED'])
  action!: 'APPROVED' | 'REJECTED';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  adminNote?: string;
}
