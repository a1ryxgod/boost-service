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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceEntity } from '../entities/service.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../enums/index';

@ApiTags('Services')
@Controller({ path: 'services', version: '1' })
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new service (admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Service created successfully',
    type: ServiceEntity,
  })
  @ApiResponse({ status: 400, description: 'Game not found' })
  @ApiResponse({ status: 409, description: 'Service already exists' })
  async create(@Body() dto: CreateServiceDto): Promise<ServiceEntity> {
    return this.servicesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all services' })
  @ApiQuery({
    name: 'gameId',
    required: false,
    type: String,
    description: 'Filter by game ID',
  })
  @ApiQuery({
    name: 'includeInactive',
    required: false,
    type: Boolean,
    description: 'Include inactive services',
  })
  @ApiResponse({
    status: 200,
    description: 'Services list retrieved successfully',
    type: [ServiceEntity],
  })
  async findAll(
    @Query('gameId') gameId?: string,
    @Query('includeInactive', new DefaultValuePipe(false), ParseBoolPipe)
    includeInactive?: boolean,
  ): Promise<ServiceEntity[]> {
    return this.servicesService.findAll(gameId, includeInactive);
  }

  @Get('by-game/:slug')
  @ApiOperation({ summary: 'Get services by game slug' })
  @ApiParam({ name: 'slug', description: 'Game slug', example: 'cs2' })
  @ApiResponse({
    status: 200,
    description: 'Services retrieved successfully',
    type: [ServiceEntity],
  })
  @ApiResponse({ status: 404, description: 'Game not found' })
  async findByGameSlug(
    @Param('slug') slug: string,
  ): Promise<ServiceEntity[]> {
    return this.servicesService.findByGameSlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get service by ID' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Service retrieved successfully',
    type: ServiceEntity,
  })
  @ApiResponse({ status: 404, description: 'Service not found' })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ServiceEntity> {
    return this.servicesService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update service (admin only)' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Service updated successfully',
    type: ServiceEntity,
  })
  @ApiResponse({ status: 404, description: 'Service not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateServiceDto,
  ): Promise<ServiceEntity> {
    return this.servicesService.update(id, dto);
  }

  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle service active status (admin only)' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Service status toggled successfully',
    type: ServiceEntity,
  })
  @ApiResponse({ status: 404, description: 'Service not found' })
  async toggleActive(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ServiceEntity> {
    return this.servicesService.toggleActive(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete service (admin only)' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({ status: 200, description: 'Service deleted successfully' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.servicesService.remove(id);
  }
}
