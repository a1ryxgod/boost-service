import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './users.entity';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(dto);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }
}
