import {
  Controller, Get, Query, UseGuards, Request,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../enums';

interface JwtRequest {
  user: { id: string; role: UserRole };
}

@ApiTags('Chat')
@Controller({ path: 'chat', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  @ApiOperation({ summary: 'Get message history for a room' })
  async getMessages(
    @Query('roomId') roomId: string,
    @Request() req: JwtRequest,
  ) {
    // Users can only access their own room
    if (req.user.role !== UserRole.ADMIN && req.user.id !== roomId) {
      throw new ForbiddenException();
    }
    return this.chatService.getMessages(roomId);
  }

  @Get('rooms')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all chat rooms (admin only)' })
  getRooms() {
    return this.chatService.getRooms();
  }
}
