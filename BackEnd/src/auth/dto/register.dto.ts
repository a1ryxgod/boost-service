import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../enums';

export class RegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @ApiProperty({
    description: 'User password (minimum 6 characters)',
    example: 'SecurePass123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    default: UserRole.CUSTOMER,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Invalid user role' })
  role?: UserRole;
}
