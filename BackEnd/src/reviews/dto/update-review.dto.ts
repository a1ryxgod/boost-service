import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional, IsBoolean, Min, Max } from 'class-validator';

export class UpdateReviewDto {
  @ApiPropertyOptional({
    description: 'Rating (1-5)',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({
    description: 'Review comment',
    example: 'Excellent service, very professional!',
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional({
    description: 'Is review visible',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @ApiPropertyOptional({
    description: 'Admin response',
    example: 'Thank you for your feedback!',
  })
  @IsOptional()
  @IsString()
  adminResponse?: string;
}
