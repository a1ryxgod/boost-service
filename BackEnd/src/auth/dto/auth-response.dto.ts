import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../enums';

export class UserResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: 'user@example.com' })
  email!: string;

  @ApiProperty({ enum: UserRole, example: UserRole.CUSTOMER })
  role!: UserRole;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token (valid for 30 minutes)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'JWT refresh token (valid for 7 days)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken!: string;

  @ApiProperty({ type: UserResponseDto })
  user!: UserResponseDto;
}
