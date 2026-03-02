'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import type { ChatMessage } from '../types';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4001';
const TOKEN_KEY = 'boost_access_token';

interface UseChatOptions {
  roomId?: string; // for admin: specify which user room to join
}

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    const socket = io(`${WS_URL}/chat`, {
      auth: { token },
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      if (options.roomId) {
        socket.emit('join', { roomId: options.roomId });
      }
    });

    socket.on('disconnect', () => setIsConnected(false));

    socket.on('newMessage', (msg: ChatMessage) => {
      setMessages((prev) => {
        // avoid duplicates
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    });

    socket.on('messagesRead', ({ roomId }: { roomId: string }) => {
      setMessages((prev) =>
        prev.map((m) => (m.roomId === roomId ? { ...m, isRead: true } : m)),
      );
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.roomId]);

  const sendMessage = useCallback((content: string, roomId?: string) => {
    socketRef.current?.emit('sendMessage', { content, roomId });
  }, []);

  const joinRoom = useCallback((roomId: string) => {
    socketRef.current?.emit('join', { roomId });
  }, []);

  const markRead = useCallback((roomId: string) => {
    socketRef.current?.emit('markRead', { roomId });
  }, []);

  return { messages, isConnected, sendMessage, joinRoom, markRead, setMessages };
}
