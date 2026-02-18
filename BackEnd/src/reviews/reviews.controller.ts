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
  Request,
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
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from '../entities/review.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../enums/index';
import { JwtRequest } from '../auth/strategies/jwt-access.strategy';

@ApiTags('Reviews')
@Controller({ path: 'reviews', version: '1' })
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a review (customer only)' })
  @ApiResponse({
    status: 201,
    description: 'Review created successfully',
    type: ReviewEntity,
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 409, description: 'Review already exists' })
  async create(
    @Request() req: JwtRequest,
    @Body() dto: CreateReviewDto,
  ): Promise<ReviewEntity> {
    return this.reviewsService.create(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiQuery({
    name: 'includeHidden',
    required: false,
    type: Boolean,
    description: 'Include hidden reviews (admin only)',
  })
  @ApiResponse({
    status: 200,
    description: 'Reviews list retrieved successfully',
    type: [ReviewEntity],
  })
  async findAll(
    @Query('includeHidden', new DefaultValuePipe(false), ParseBoolPipe)
    includeHidden: boolean,
  ): Promise<ReviewEntity[]> {
    return this.reviewsService.findAll(includeHidden);
  }

  @Get('booster/:boosterId')
  @ApiOperation({ summary: 'Get reviews by booster ID' })
  @ApiParam({ name: 'boosterId', description: 'Booster user ID' })
  @ApiResponse({
    status: 200,
    description: 'Booster reviews retrieved successfully',
    type: [ReviewEntity],
  })
  async findByBooster(
    @Param('boosterId', ParseUUIDPipe) boosterId: string,
  ): Promise<ReviewEntity[]> {
    return this.reviewsService.findByBooster(boosterId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get review by ID' })
  @ApiParam({ name: 'id', description: 'Review ID' })
  @ApiResponse({
    status: 200,
    description: 'Review retrieved successfully',
    type: ReviewEntity,
  })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ReviewEntity> {
    return this.reviewsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update review (customer can update own, admin can moderate)',
  })
  @ApiParam({ name: 'id', description: 'Review ID' })
  @ApiResponse({
    status: 200,
    description: 'Review updated successfully',
    type: ReviewEntity,
  })
  @ApiResponse({ status: 404, description: 'Review not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateReviewDto,
    @Request() req: JwtRequest,
  ): Promise<ReviewEntity> {
    return this.reviewsService.update(id, dto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete review (customer or admin)' })
  @ApiParam({ name: 'id', description: 'Review ID' })
  @ApiResponse({ status: 200, description: 'Review deleted successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: JwtRequest,
  ): Promise<void> {
    return this.reviewsService.remove(id, req.user.id, req.user.role);
  }
}
