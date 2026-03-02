'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../hooks/useChat';
import { chatApi } from '../../lib/api';
import type { ChatMessage } from '../../types';
import './ChatWidget.css';

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function ChatWidget() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, isConnected, sendMessage } = useChat();

  // Load history on first open
  useEffect(() => {
    if (open && user) {
      chatApi.getMessages(user.id)
        .then(setHistory)
        .catch(() => {});
    }
  }, [open, user]);

  // Merge socket messages into history
  useEffect(() => {
    if (!messages.length) return;
    setHistory((prev) => {
      const ids = new Set(prev.map((m) => m.id));
      const newOnes = messages.filter((m) => !ids.has(m.id));
      return newOnes.length ? [...prev, ...newOnes] : prev;
    });
    if (!open) {
      setUnread((n) => n + messages.length);
    }
  }, [messages, open]);

  // Clear unread when opened
  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  // Allow external trigger via custom event
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('chatWidget:open', handler);
    return () => window.removeEventListener('chatWidget:open', handler);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, open]);

  if (!user) return null;

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-widget__panel">
          <div className="chat-widget__header">
            <div className="chat-widget__header-info">
              <div className="chat-widget__avatar">💬</div>
              <div>
                <p className="chat-widget__header-title">Support Chat</p>
                <p className="chat-widget__header-status">
                  {isConnected ? 'Online' : 'Connecting…'}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="chat-widget__close"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="chat-widget__messages">
            {history.length === 0 ? (
              <div className="chat-widget__empty">
                <span className="chat-widget__empty-icon">👋</span>
                <span>Hi! How can we help you today?</span>
              </div>
            ) : (
              history.map((msg) => {
                const isOwn = msg.senderId === user.id;
                return (
                  <div
                    key={msg.id}
                    className={`chat-widget__bubble ${isOwn ? 'chat-widget__bubble--own' : 'chat-widget__bubble--other'}`}
                  >
                    <div className="chat-widget__bubble-text">{msg.content}</div>
                    <span className="chat-widget__bubble-time">{formatTime(msg.createdAt)}</span>
                  </div>
                );
              })
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-widget__footer">
            <textarea
              className="chat-widget__input"
              placeholder="Type a message…"
              rows={1}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="chat-widget__send"
              onClick={handleSend}
              disabled={!text.trim() || !isConnected}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        className="chat-widget__btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open support chat"
      >
        {open ? '✕' : '💬'}
        {!open && unread > 0 && (
          <span className="chat-widget__badge">{unread > 99 ? '99+' : unread}</span>
        )}
      </button>
    </div>
  );
}
