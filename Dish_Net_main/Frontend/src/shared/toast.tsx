'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

function SuccessIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const toastStyles: Record<ToastType, {
  wrapper: string;
  icon: string;
  iconBg: string;
  border: string;
}> = {
  success: {
    wrapper: 'bg-white border-green-300',
    icon: 'text-green-500',
    iconBg: 'bg-green-50',
    border: 'border-l-4 border-l-green-500',
  },
  error: {
    wrapper: 'bg-white border-red-300',
    icon: 'text-red-500',
    iconBg: 'bg-red-50',
    border: 'border-l-4 border-l-red-500',
  },
  info: {
    wrapper: 'bg-white border-blue-300',
    icon: 'text-blue-500',
    iconBg: 'bg-blue-50',
    border: 'border-l-4 border-l-blue-500',
  },
  warning: {
    wrapper: 'bg-white border-orange-300',
    icon: 'text-orange-500',
    iconBg: 'bg-orange-50',
    border: 'border-l-4 border-l-orange-400',
  },
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used inside <ToastProvider>');
  }
  return ctx;
}

function useToastTimer(id: string, onDismiss: (id: string) => void, duration = 4000) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (duration <= 0) return;
    timerRef.current = setTimeout(() => onDismiss(id), duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [id, duration, onDismiss]);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return { cancel };
}

function ToastItemView({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const { cancel } = useToastTimer(item.id, onDismiss);
  const styles = toastStyles[item.type];

  const IconComp =
    item.type === 'success'
      ? SuccessIcon
      : item.type === 'error'
        ? ErrorIcon
        : item.type === 'warning'
          ? WarningIcon
          : InfoIcon;

  return (
    <div
      role="alert"
      aria-live="polite"
      onMouseEnter={cancel}
      className={`
        flex items-center gap-3 rounded-2xl px-4 py-3.5 shadow-lg
        border ${styles.border}
        animate-toast-in
        ${styles.wrapper}
      `}
    >
      <div className={`shrink-0 mt-0.5 rounded-full p-1.5 ${styles.iconBg} ${styles.icon}`}>
        <IconComp />
      </div>
      <p className="flex-1 text-sm font-medium text-gray-800 leading-snug pr-2">
        {item.message}
      </p>
      <button
        onClick={() => onDismiss(item.id)}
        className="shrink-0 mt-0.5 rounded-full p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
        aria-label="Đóng thông báo"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = 'info') => addToast(message, type),
    [addToast],
  );
  const success = useCallback((message: string) => addToast(message, 'success'), [addToast]);
  const error = useCallback((message: string) => addToast(message, 'error'), [addToast]);
  const info = useCallback((message: string) => addToast(message, 'info'), [addToast]);
  const warning = useCallback((message: string) => addToast(message, 'warning'), [addToast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info, warning }}>
      {children}
      <div
        aria-label="Thông báo"
        className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none"
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto w-80 sm:w-96">
            <ToastItemView item={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
