import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity } from '../entities/service.entity';
import { GameEntity } from '../entities/game.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly servicesRepository: Repository<ServiceEntity>,
    @InjectRepository(GameEntity)
    private readonly gamesRepository: Repository<GameEntity>,
  ) {}

  /**
   * Create a new service
   */
  async create(dto: CreateServiceDto): Promise<ServiceEntity> {
    // Verify game exists
    const game = await this.gamesRepository.findOne({
      where: { id: dto.gameId },
    });

    if (!game) {
      throw new BadRequestException('Game not found');
    }

    // Check if service with same game and type already exists
    const existingService = await this.servicesRepository.findOne({
      where: { gameId: dto.gameId, serviceType: dto.serviceType },
    });

    if (existingService) {
      throw new ConflictException(
        'Service with this type already exists for this game',
      );
    }

    const service = this.servicesRepository.create(dto);
    return this.servicesRepository.save(service);
  }

  /**
   * Get all services (optionally filter by game)
   */
  async findAll(
    gameId?: string,
    includeInactive: boolean = false,
  ): Promise<ServiceEntity[]> {
    const where: any = {};

    if (gameId) {
      where.gameId = gameId;
    }

    if (!includeInactive) {
      where.isActive = true;
    }

    return this.servicesRepository.find({
      where,
      relations: ['game'],
      order: { displayOrder: 'ASC', name: 'ASC' },
    });
  }

  /**
   * Get services by game slug
   */
  async findByGameSlug(slug: string): Promise<ServiceEntity[]> {
    const game = await this.gamesRepository.findOne({
      where: { slug },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return this.findAll(game.id, false);
  }

  /**
   * Get service by ID
   */
  async findById(id: string): Promise<ServiceEntity> {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['game'],
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  /**
   * Update service
   */
  async update(id: string, dto: UpdateServiceDto): Promise<ServiceEntity> {
    const service = await this.findById(id);

    Object.assign(service, dto);
    return this.servicesRepository.save(service);
  }

  /**
   * Delete service
   */
  async remove(id: string): Promise<void> {
    const service = await this.findById(id);
    await this.servicesRepository.remove(service);
  }

  /**
   * Toggle service active status
   */
  async toggleActive(id: string): Promise<ServiceEntity> {
    const service = await this.findById(id);
    service.isActive = !service.isActive;
    return this.servicesRepository.save(service);
  }
}
