import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessageEntity } from './chat-message.entity';
import { UserEntity } from '../users.entity';

export interface ChatRoom {
  roomId: string;
  userEmail: string;
  userName: string | null;
  lastMessage: string;
  lastMessageAt: Date;
  unreadCount: number;
}

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessageEntity)
    private readonly repo: Repository<ChatMessageEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async saveMessage(senderId: string, roomId: string, content: string): Promise<ChatMessageEntity> {
    const msg = this.repo.create({ senderId, roomId, content });
    return this.repo.save(msg);
  }

  async getMessages(roomId: string): Promise<ChatMessageEntity[]> {
    return this.repo.find({
      where: { roomId },
      order: { createdAt: 'ASC' },
    });
  }

  async getRooms(): Promise<ChatRoom[]> {
    const rows = await this.repo
      .createQueryBuilder('m')
      .select('m.room_id', 'roomId')
      .addSelect('MAX(m.created_at)', 'lastMessageAt')
      .groupBy('m.room_id')
      .orderBy('MAX(m.created_at)', 'DESC')
      .getRawMany<{ roomId: string; lastMessageAt: string }>();

    const rooms: ChatRoom[] = await Promise.all(
      rows.map(async (row) => {
        const last = await this.repo.findOne({
          where: { roomId: row.roomId },
          order: { createdAt: 'DESC' },
        });
        const unreadCount = await this.repo.count({
          where: { roomId: row.roomId, senderId: row.roomId, isRead: false },
        });
        const user = await this.userRepo.findOne({
          where: { id: row.roomId },
          select: ['email', 'firstName', 'lastName'],
        });
        const userName = user?.firstName
          ? `${user.firstName}${user.lastName ? ' ' + user.lastName : ''}`.trim()
          : null;
        return {
          roomId: row.roomId,
          userEmail: user?.email ?? row.roomId,
          userName,
          lastMessage: last?.content ?? '',
          lastMessageAt: last?.createdAt ?? new Date(row.lastMessageAt),
          unreadCount,
        };
      }),
    );

    return rooms;
  }

  async markAsRead(roomId: string): Promise<void> {
    await this.repo.update(
      { roomId, senderId: roomId, isRead: false },
      { isRead: true },
    );
  }
}
