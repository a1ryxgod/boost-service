'use client';

import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { API_BASE_URL } from '../lib/constants';
import { TokenStorage } from '../lib/tokens';

interface OrderStatusChangedEvent {
  orderId: string;
  newStatus: string;
  gameCode: string;
  serviceType: string;
}

type Handler = (event: OrderStatusChangedEvent) => void;

let socket: Socket | null = null;

export function useOrderNotifications(onStatusChanged: Handler) {
  useEffect(() => {
    const token = TokenStorage.getAccess();
    if (!token) return;

    const wsUrl = API_BASE_URL.replace('/api/v1', '');

    socket = io(`${wsUrl}/notifications`, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 3,
    });

    socket.on('order:status_changed', onStatusChanged);
    socket.on('order:assigned', onStatusChanged);

    return () => {
      socket?.off('order:status_changed', onStatusChanged);
      socket?.off('order:assigned', onStatusChanged);
      socket?.disconnect();
      socket = null;
    };
  }, [onStatusChanged]);
}
