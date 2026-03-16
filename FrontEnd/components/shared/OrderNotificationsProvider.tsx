'use client';

import { useCallback, useEffect, useState } from 'react';
import { useOrderNotifications } from '../../hooks/useOrderNotifications';
import styles from './OrderNotificationsProvider.module.css';

interface Toast {
  id: number;
  message: string;
  gameCode: string;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  PAID: 'Paid',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

let toastId = 0;

export function OrderNotificationsProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleStatusChanged = useCallback(
    (event: { orderId: string; newStatus: string; gameCode: string; serviceType: string }) => {
      const label = STATUS_LABELS[event.newStatus] ?? event.newStatus;
      const id = ++toastId;
      setToasts((prev) => [
        ...prev,
        {
          id,
          message: `Order status changed to ${label}`,
          gameCode: event.gameCode,
        },
      ]);
      setTimeout(() => removeToast(id), 5000);
    },
    [],
  );

  useOrderNotifications(handleStatusChanged);

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container} aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={styles.toast}>
          <div className={styles.icon}>🎮</div>
          <div className={styles.body}>
            <span className={styles.title}>{toast.gameCode}</span>
            <span className={styles.message}>{toast.message}</span>
          </div>
          <button
            className={styles.close}
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
