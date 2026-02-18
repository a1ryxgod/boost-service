import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
  ParseBoolPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameEntity } from '../entities/game.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../enums/index';

@ApiTags('Games')
@Controller({ path: 'games', version: '1' })
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new game (admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Game created successfully',
    type: GameEntity,
  })
  @ApiResponse({ status: 409, description: 'Game already exists' })
  async create(@Body() dto: CreateGameDto): Promise<GameEntity> {
    return this.gamesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all games' })
  @ApiQuery({
    name: 'includeInactive',
    required: false,
    type: Boolean,
    description: 'Include inactive games',
  })
  @ApiResponse({
    status: 200,
    description: 'Games list retrieved successfully',
    type: [GameEntity],
  })
  async findAll(
    @Query('includeInactive', new DefaultValuePipe(false), ParseBoolPipe)
    includeInactive: boolean,
  ): Promise<GameEntity[]> {
    return this.gamesService.findAll(includeInactive);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get game by ID' })
  @ApiParam({ name: 'id', description: 'Game ID' })
  @ApiResponse({
    status: 200,
    description: 'Game retrieved successfully',
    type: GameEntity,
  })
  @ApiResponse({ status: 404, description: 'Game not found' })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GameEntity> {
    return this.gamesService.findById(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get game by slug' })
  @ApiParam({ name: 'slug', description: 'Game slug', example: 'cs2' })
  @ApiResponse({
    status: 200,
    description: 'Game retrieved successfully',
    type: GameEntity,
  })
  @ApiResponse({ status: 404, description: 'Game not found' })
  async findBySlug(@Param('slug') slug: string): Promise<GameEntity> {
    return this.gamesService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update game (admin only)' })
  @ApiParam({ name: 'id', description: 'Game ID' })
  @ApiResponse({
    status: 200,
    description: 'Game updated successfully',
    type: GameEntity,
  })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @ApiResponse({ status: 409, description: 'Game slug already exists' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateGameDto,
  ): Promise<GameEntity> {
    return this.gamesService.update(id, dto);
  }

  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle game active status (admin only)' })
  @ApiParam({ name: 'id', description: 'Game ID' })
  @ApiResponse({
    status: 200,
    description: 'Game status toggled successfully',
    type: GameEntity,
  })
  @ApiResponse({ status: 404, description: 'Game not found' })
  async toggleActive(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GameEntity> {
    return this.gamesService.toggleActive(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete game (admin only)' })
  @ApiParam({ name: 'id', description: 'Game ID' })
  @ApiResponse({ status: 200, description: 'Game deleted successfully' })
  @ApiResponse({ status: 404, description: 'Game not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.gamesService.remove(id);
  }
}
