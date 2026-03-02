import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { UserRole } from '../enums';

interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

@WebSocketGateway({
  cors: { origin: '*', credentials: true },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  handleConnection(client: Socket) {
    try {
      const token =
        (client.handshake.auth as { token?: string }).token ||
        (client.handshake.headers.authorization ?? '').replace('Bearer ', '');

      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      });

      client.data = { userId: payload.sub, role: payload.role };

      // User automatically joins their own room
      if (payload.role !== UserRole.ADMIN) {
        client.join(`room:${payload.sub}`);
      }
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(_client: Socket) {
    // nothing to clean up
  }

  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId: string },
  ) {
    const { role } = client.data as { userId: string; role: UserRole };
    // Only admin can join arbitrary rooms
    if (role === UserRole.ADMIN) {
      client.join(`room:${payload.roomId}`);
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { content: string; roomId?: string },
  ) {
    const { userId, role } = client.data as { userId: string; role: UserRole };

    // Determine the room: user always sends to own room; admin specifies roomId
    const roomId =
      role === UserRole.ADMIN ? payload.roomId ?? '' : userId;

    if (!roomId || !payload.content?.trim()) return;

    const message = await this.chatService.saveMessage(userId, roomId, payload.content.trim());

    this.server.to(`room:${roomId}`).emit('newMessage', {
      id: message.id,
      senderId: message.senderId,
      roomId: message.roomId,
      content: message.content,
      isRead: message.isRead,
      createdAt: message.createdAt,
    });
  }

  @SubscribeMessage('markRead')
  async handleMarkRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId: string },
  ) {
    const { role } = client.data as { userId: string; role: UserRole };
    if (role !== UserRole.ADMIN) return;

    await this.chatService.markAsRead(payload.roomId);
    this.server.to(`room:${payload.roomId}`).emit('messagesRead', { roomId: payload.roomId });
  }
}
