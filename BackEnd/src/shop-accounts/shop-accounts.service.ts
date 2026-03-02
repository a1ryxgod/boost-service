import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { ShopAccountEntity } from './shop-account.entity';
import { CreateShopAccountDto } from './dto/create-shop-account.dto';
import { UpdateShopAccountDto } from './dto/update-shop-account.dto';
import { GameCode } from '../enums';

@Injectable()
export class ShopAccountsService {
  constructor(
    @InjectRepository(ShopAccountEntity)
    private readonly repo: Repository<ShopAccountEntity>,
  ) {}

  list(gameCode?: GameCode, onlyAvailable = false): Promise<ShopAccountEntity[]> {
    const where: FindOptionsWhere<ShopAccountEntity> = {};
    if (gameCode) where.gameCode = gameCode;
    if (onlyAvailable) where.isAvailable = true;

    return this.repo.find({
      where,
      order: { displayOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  async getOne(id: string): Promise<ShopAccountEntity> {
    const account = await this.repo.findOne({ where: { id } });
    if (!account) throw new NotFoundException('Shop account not found');
    return account;
  }

  create(dto: CreateShopAccountDto): Promise<ShopAccountEntity> {
    const account = this.repo.create({
      ...dto,
      rankIcon: dto.rankIcon ?? '🎮',
      rankColor: dto.rankColor ?? '',
      currency: dto.currency ?? 'USD',
      stats: dto.stats ?? {},
      features: dto.features ?? [],
      medals: dto.medals ?? [],
      screenshots: dto.screenshots ?? [],
      isAvailable: dto.isAvailable ?? true,
      displayOrder: dto.displayOrder ?? 0,
    });
    return this.repo.save(account);
  }

  async update(id: string, dto: UpdateShopAccountDto): Promise<ShopAccountEntity> {
    const account = await this.getOne(id);
    Object.assign(account, dto);
    return this.repo.save(account);
  }

  async remove(id: string): Promise<void> {
    const account = await this.getOne(id);
    await this.repo.remove(account);
  }
}
