'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { chatApi } from '@/lib/api';
import { useChat } from '@/hooks/useChat';
import type { ChatRoom, ChatMessage } from '@/types';
import '../AdminDashboard.css';
import './AdminChat.css';

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return formatTime(iso);
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export default function AdminChatPage() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages: socketMessages, sendMessage, joinRoom, markRead } = useChat({
    roomId: selectedRoom ?? undefined,
  });

  // Load rooms list
  useEffect(() => {
    chatApi.getRooms()
      .then(setRooms)
      .catch(() => {})
      .finally(() => setIsLoadingRooms(false));
  }, []);

  // Load message history when room selected
  useEffect(() => {
    if (!selectedRoom) return;
    setIsLoadingMessages(true);
    chatApi.getMessages(selectedRoom)
      .then(setMessages)
      .catch(() => {})
      .finally(() => setIsLoadingMessages(false));

    markRead(selectedRoom);

    // Update unread count in room list
    setRooms((prev) =>
      prev.map((r) => r.roomId === selectedRoom ? { ...r, unreadCount: 0 } : r),
    );
  }, [selectedRoom, markRead]);

  // Merge incoming socket messages
  useEffect(() => {
    if (!socketMessages.length) return;
    setMessages((prev) => {
      const ids = new Set(prev.map((m) => m.id));
      const newOnes = socketMessages.filter((m) => !ids.has(m.id));
      if (!newOnes.length) return prev;

      // Update rooms list with new last message
      setRooms((prevRooms) =>
        prevRooms.map((r) => {
          const relevant = newOnes.filter((m) => m.roomId === r.roomId);
          if (!relevant.length) return r;
          const last = relevant[relevant.length - 1];
          return {
            ...r,
            lastMessage: last.content,
            lastMessageAt: last.createdAt,
            unreadCount: r.roomId === selectedRoom ? 0 : r.unreadCount + relevant.length,
          };
        }),
      );

      return [...prev, ...newOnes];
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketMessages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim() || !selectedRoom) return;
    sendMessage(text.trim(), selectedRoom);
    setText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const selectedRoomData = rooms.find((r) => r.roomId === selectedRoom);

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Support Chat</h1>
      </div>

      <div className="admin-chat">
        {/* Left: Rooms list */}
        <div className="admin-chat__rooms">
          {isLoadingRooms ? (
            <div className="admin-chat__loading">Loading conversations…</div>
          ) : rooms.length === 0 ? (
            <div className="admin-chat__empty-rooms">
              <div className="admin-chat__empty-icon">💬</div>
              <p>No conversations yet</p>
            </div>
          ) : (
            rooms.map((room) => (
              <button
                key={room.roomId}
                type="button"
                className={`admin-chat__room ${selectedRoom === room.roomId ? 'admin-chat__room--active' : ''}`}
                onClick={() => setSelectedRoom(room.roomId)}
              >
                <div className="admin-chat__room-avatar">
                  {(room.userName ?? room.userEmail).slice(0, 2).toUpperCase()}
                </div>
                <div className="admin-chat__room-info">
                  <div className="admin-chat__room-name">
                    {room.userName ?? room.userEmail}
                  </div>
                  <div className="admin-chat__room-last">
                    {room.lastMessage || 'No messages yet'}
                  </div>
                </div>
                <div className="admin-chat__room-meta">
                  {room.lastMessageAt && (
                    <span className="admin-chat__room-time">
                      {formatDate(room.lastMessageAt)}
                    </span>
                  )}
                  {room.unreadCount > 0 && (
                    <span className="admin-chat__room-badge">{room.unreadCount}</span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Right: Messages */}
        <div className="admin-chat__panel">
          {!selectedRoom ? (
            <div className="admin-chat__placeholder">
              <div className="admin-chat__placeholder-icon">💬</div>
              <p>Select a conversation to start chatting</p>
            </div>
          ) : (
            <>
              <div className="admin-chat__panel-header">
                <div className="admin-chat__panel-avatar">
                  {((selectedRoomData?.userName ?? selectedRoomData?.userEmail) ?? selectedRoom).slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="admin-chat__panel-name">
                    {selectedRoomData?.userName ?? selectedRoomData?.userEmail ?? selectedRoom}
                  </div>
                  <div className="admin-chat__panel-id">
                    {selectedRoomData?.userEmail ?? selectedRoom}
                  </div>
                </div>
              </div>

              <div className="admin-chat__messages">
                {isLoadingMessages ? (
                  <div className="admin-chat__loading">Loading…</div>
                ) : messages.length === 0 ? (
                  <div className="admin-chat__empty-msgs">No messages yet</div>
                ) : (
                  messages.map((msg) => {
                    const isAdmin = msg.senderId !== msg.roomId;
                    return (
                      <div
                        key={msg.id}
                        className={`admin-chat__bubble ${isAdmin ? 'admin-chat__bubble--admin' : 'admin-chat__bubble--user'}`}
                      >
                        <div className="admin-chat__bubble-label">
                          {isAdmin ? 'You (Admin)' : (selectedRoomData?.userName ?? selectedRoomData?.userEmail ?? 'User')}
                        </div>
                        <div className="admin-chat__bubble-text">{msg.content}</div>
                        <div className="admin-chat__bubble-time">{formatTime(msg.createdAt)}</div>
                      </div>
                    );
                  })
                )}
                <div ref={bottomRef} />
              </div>

              <div className="admin-chat__footer">
                <textarea
                  className="admin-chat__input"
                  placeholder="Type a reply…"
                  rows={1}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  type="button"
                  className="admin-chat__send"
                  onClick={handleSend}
                  disabled={!text.trim()}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
