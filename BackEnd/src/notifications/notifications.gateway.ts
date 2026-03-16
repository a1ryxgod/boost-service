import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UserRole, OrderStatus } from '../enums';

interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export interface OrderStatusChangedEvent {
  orderId: string;
  newStatus: OrderStatus;
  gameCode: string;
  serviceType: string;
}

@WebSocketGateway({
  cors: { origin: '*', credentials: true },
  namespace: '/notifications',
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly jwtService: JwtService) {}

  handleConnection(client: Socket) {
    try {
      const token =
        (client.handshake.auth as { token?: string }).token ||
        (client.handshake.headers.authorization ?? '').replace('Bearer ', '');

      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      });

      client.data = { userId: payload.sub, role: payload.role };

      // Each user joins their own room for targeted notifications
      client.join(`notify:${payload.sub}`);

      // Admins join a global room to receive all notifications
      if (payload.role === UserRole.ADMIN) {
        client.join('notify:admins');
      }
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(_client: Socket) {}

  /**
   * Notify a specific user that their order status changed.
   */
  notifyOrderStatusChanged(userId: string, event: OrderStatusChangedEvent): void {
    this.server.to(`notify:${userId}`).emit('order:status_changed', event);
  }

  /**
   * Notify a booster that an order was assigned to them.
   */
  notifyOrderAssigned(boosterId: string, event: OrderStatusChangedEvent): void {
    this.server.to(`notify:${boosterId}`).emit('order:assigned', event);
  }
}
