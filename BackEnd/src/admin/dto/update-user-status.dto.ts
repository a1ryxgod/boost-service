import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserStatus } from '../../enums/index';

export class UpdateUserStatusDto {
  @ApiProperty({
    description: 'User status',
    enum: UserStatus,
    example: UserStatus.SUSPENDED,
  })
  @IsEnum(UserStatus)
  status!: UserStatus;
}
