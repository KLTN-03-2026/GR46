'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ChatboxPanel from './ChatboxPanel';

const HIDDEN_PATHS = ['/chatbox', '/messages', '/login', '/register', '/forgot-password'];

export default function ChatboxBubble() {
    const pathname = usePathname() ?? '';
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    if (HIDDEN_PATHS.some((p) => pathname.startsWith(p))) return null;
    if (pathname.startsWith('/admin') || pathname.startsWith('/store')) return null;

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="fixed bottom-40 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#2f6f25] to-[#56c194] text-2xl text-white shadow-xl transition hover:scale-105"
                aria-label={open ? 'Đóng chatbot' : 'Mở chatbot'}
                title="Trợ lý DishNet"
            >
                {open ? '×' : '🍜'}
            </button>
            {open && (
                <div className="fixed bottom-56 right-6 z-50">
                    <ChatboxPanel variant="bubble" onClose={() => setOpen(false)} />
                </div>
            )}
        </>
    );
}
