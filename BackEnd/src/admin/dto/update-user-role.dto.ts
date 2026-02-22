import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserRole } from '../../enums/index';

export class UpdateUserRoleDto {
  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    example: UserRole.BOOSTER,
  })
  @IsEnum(UserRole)
  role!: UserRole;
}
