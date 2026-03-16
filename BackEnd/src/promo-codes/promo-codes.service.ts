import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromoCodeEntity } from './promo-code.entity';
import { CreatePromoCodeDto, ValidatePromoCodeResponseDto } from './dto/promo-code.dto';
import { DiscountType } from '../enums';

@Injectable()
export class PromoCodesService {
  constructor(
    @InjectRepository(PromoCodeEntity)
    private readonly promoCodesRepository: Repository<PromoCodeEntity>,
  ) {}

  async create(dto: CreatePromoCodeDto): Promise<PromoCodeEntity> {
    const existing = await this.promoCodesRepository.findOne({
      where: { code: dto.code.toUpperCase() },
    });

    if (existing) {
      throw new ConflictException(`Promo code "${dto.code}" already exists`);
    }

    if (dto.discountType === DiscountType.PERCENT && dto.discountValue > 100) {
      throw new BadRequestException('Percent discount cannot exceed 100%');
    }

    const promoCode = this.promoCodesRepository.create({
      code: dto.code.toUpperCase(),
      discountType: dto.discountType,
      discountValue: dto.discountValue,
      maxUses: dto.maxUses ?? null,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
      isActive: true,
    });

    return this.promoCodesRepository.save(promoCode);
  }

  async findAll(): Promise<PromoCodeEntity[]> {
    return this.promoCodesRepository.find({ order: { createdAt: 'DESC' } });
  }

  async validate(code: string): Promise<ValidatePromoCodeResponseDto> {
    const promoCode = await this.promoCodesRepository.findOne({
      where: { code: code.toUpperCase(), isActive: true },
    });

    if (!promoCode) {
      return { valid: false, message: 'Promo code not found or inactive' };
    }

    if (promoCode.expiresAt && promoCode.expiresAt < new Date()) {
      return { valid: false, message: 'Promo code has expired' };
    }

    if (promoCode.maxUses !== null && promoCode.usedCount >= promoCode.maxUses) {
      return { valid: false, message: 'Promo code usage limit reached' };
    }

    return {
      valid: true,
      discountType: promoCode.discountType,
      discountValue: Number(promoCode.discountValue),
    };
  }

  /**
   * Apply promo code and return discounted price.
   * Called internally when creating an order.
   */
  async applyCode(code: string, originalPrice: number): Promise<{ finalPrice: number; discount: number; promoCodeId: string }> {
    const promoCode = await this.promoCodesRepository.findOne({
      where: { code: code.toUpperCase(), isActive: true },
    });

    if (!promoCode) throw new BadRequestException('Invalid promo code');
    if (promoCode.expiresAt && promoCode.expiresAt < new Date()) throw new BadRequestException('Promo code has expired');
    if (promoCode.maxUses !== null && promoCode.usedCount >= promoCode.maxUses) throw new BadRequestException('Promo code usage limit reached');

    let discount: number;
    if (promoCode.discountType === DiscountType.PERCENT) {
      discount = Math.round(originalPrice * (Number(promoCode.discountValue) / 100) * 100) / 100;
    } else {
      discount = Math.min(Number(promoCode.discountValue), originalPrice);
    }

    const finalPrice = Math.max(0, originalPrice - discount);

    // Increment usage count
    await this.promoCodesRepository.increment({ id: promoCode.id }, 'usedCount', 1);

    return { finalPrice, discount, promoCodeId: promoCode.id };
  }

  async deactivate(id: string): Promise<PromoCodeEntity> {
    const promoCode = await this.promoCodesRepository.findOne({ where: { id } });
    if (!promoCode) throw new NotFoundException('Promo code not found');
    promoCode.isActive = false;
    return this.promoCodesRepository.save(promoCode);
  }
}
