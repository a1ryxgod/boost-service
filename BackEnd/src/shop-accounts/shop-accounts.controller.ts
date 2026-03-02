import {
  Controller, Get, Post, Patch, Delete,
  Param, Query, Body, UseGuards, HttpCode, HttpStatus, ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery,
} from '@nestjs/swagger';
import { ShopAccountsService } from './shop-accounts.service';
import { ShopAccountEntity } from './shop-account.entity';
import { CreateShopAccountDto } from './dto/create-shop-account.dto';
import { UpdateShopAccountDto } from './dto/update-shop-account.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GameCode, UserRole } from '../enums';

@ApiTags('Shop Accounts')
@Controller({ path: 'shop-accounts', version: '1' })
export class ShopAccountsController {
  constructor(private readonly service: ShopAccountsService) {}

  @Get()
  @ApiOperation({ summary: 'List shop accounts (public)' })
  @ApiQuery({ name: 'gameCode', required: false, enum: GameCode })
  @ApiQuery({ name: 'all', required: false, type: Boolean, description: 'Admin: include unavailable' })
  list(
    @Query('gameCode') gameCode?: GameCode,
    @Query('all') all?: string,
  ): Promise<ShopAccountEntity[]> {
    const onlyAvailable = all !== 'true';
    return this.service.list(gameCode, onlyAvailable);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one shop account' })
  getOne(@Param('id', ParseUUIDPipe) id: string): Promise<ShopAccountEntity> {
    return this.service.getOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create shop account (admin)' })
  @ApiResponse({ status: 201, type: ShopAccountEntity })
  create(@Body() dto: CreateShopAccountDto): Promise<ShopAccountEntity> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update shop account (admin)' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateShopAccountDto,
  ): Promise<ShopAccountEntity> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete shop account (admin)' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.service.remove(id);
  }
}
