import { Controller, Post, Get, Patch, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { PromoCodesService } from './promo-codes.service';
import { CreatePromoCodeDto, ValidatePromoCodeResponseDto } from './dto/promo-code.dto';
import { PromoCodeEntity } from './promo-code.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../enums';

@ApiTags('Promo Codes')
@ApiBearerAuth()
@Controller({ path: 'promo-codes', version: '1' })
@UseGuards(JwtAuthGuard)
export class PromoCodesController {
  constructor(private readonly promoCodesService: PromoCodesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create promo code (admin only)' })
  @ApiResponse({ status: 201, description: 'Promo code created', type: PromoCodeEntity })
  async create(@Body() dto: CreatePromoCodeDto): Promise<PromoCodeEntity> {
    return this.promoCodesService.create(dto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'List all promo codes (admin only)' })
  @ApiResponse({ status: 200, description: 'List of promo codes', type: [PromoCodeEntity] })
  async findAll(): Promise<PromoCodeEntity[]> {
    return this.promoCodesService.findAll();
  }

  @Get('validate/:code')
  @ApiOperation({ summary: 'Validate a promo code' })
  @ApiParam({ name: 'code', description: 'Promo code string' })
  @ApiResponse({ status: 200, description: 'Validation result', type: ValidatePromoCodeResponseDto })
  async validate(@Param('code') code: string): Promise<ValidatePromoCodeResponseDto> {
    return this.promoCodesService.validate(code);
  }

  @Patch(':id/deactivate')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Deactivate a promo code (admin only)' })
  @ApiParam({ name: 'id', description: 'Promo code UUID' })
  @ApiResponse({ status: 200, description: 'Promo code deactivated', type: PromoCodeEntity })
  async deactivate(@Param('id') id: string): Promise<PromoCodeEntity> {
    return this.promoCodesService.deactivate(id);
  }
}
