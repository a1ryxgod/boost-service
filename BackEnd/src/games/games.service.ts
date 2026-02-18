import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntity } from '../entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gamesRepository: Repository<GameEntity>,
  ) {}

  /**
   * Create a new game
   */
  async create(dto: CreateGameDto): Promise<GameEntity> {
    // Check if game with code or slug already exists
    const existingGame = await this.gamesRepository.findOne({
      where: [{ code: dto.code }, { slug: dto.slug }],
    });

    if (existingGame) {
      throw new ConflictException('Game with this code or slug already exists');
    }

    const game = this.gamesRepository.create(dto);
    return this.gamesRepository.save(game);
  }

  /**
   * Get all games (only active by default)
   */
  async findAll(includeInactive: boolean = false): Promise<GameEntity[]> {
    const where: any = {};
    if (!includeInactive) {
      where.isActive = true;
    }

    return this.gamesRepository.find({
      where,
      order: { displayOrder: 'ASC', name: 'ASC' },
    });
  }

  /**
   * Get game by ID
   */
  async findById(id: string): Promise<GameEntity> {
    const game = await this.gamesRepository.findOne({ where: { id } });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }

  /**
   * Get game by slug
   */
  async findBySlug(slug: string): Promise<GameEntity> {
    const game = await this.gamesRepository.findOne({ where: { slug } });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }

  /**
   * Update game
   */
  async update(id: string, dto: UpdateGameDto): Promise<GameEntity> {
    const game = await this.findById(id);

    // If slug is being updated, check if it's not taken
    if (dto.slug && dto.slug !== game.slug) {
      const existingGame = await this.gamesRepository.findOne({
        where: { slug: dto.slug },
      });

      if (existingGame) {
        throw new ConflictException('Game with this slug already exists');
      }
    }

    Object.assign(game, dto);
    return this.gamesRepository.save(game);
  }

  /**
   * Delete game (soft delete would be better for production)
   */
  async remove(id: string): Promise<void> {
    const game = await this.findById(id);
    await this.gamesRepository.remove(game);
  }

  /**
   * Toggle game active status
   */
  async toggleActive(id: string): Promise<GameEntity> {
    const game = await this.findById(id);
    game.isActive = !game.isActive;
    return this.gamesRepository.save(game);
  }
}
