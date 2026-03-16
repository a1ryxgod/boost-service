import { IsString, IsEnum, IsNumber, IsOptional, IsBoolean, Min, Max, IsDateString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DiscountType } from '../../enums';

export class CreatePromoCodeDto {
  @ApiProperty({ example: 'SAVE10', description: 'Unique promo code (uppercase)' })
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  code!: string;

  @ApiProperty({ enum: DiscountType, example: DiscountType.PERCENT })
  @IsEnum(DiscountType)
  discountType!: DiscountType;

  @ApiProperty({ example: 10, description: 'Discount value: percent (1-100) or fixed amount' })
  @IsNumber()
  @Min(0.01)
  discountValue!: number;

  @ApiPropertyOptional({ example: 100, description: 'Max number of uses (null = unlimited)' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxUses?: number;

  @ApiPropertyOptional({ example: '2026-12-31T23:59:59Z', description: 'Expiry date (null = no expiry)' })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}

export class ValidatePromoCodeResponseDto {
  valid!: boolean;
  discountType?: DiscountType;
  discountValue?: number;
  message?: string;
}
