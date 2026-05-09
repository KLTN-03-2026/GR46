'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuth } from '@/shared/AuthContext';
import CartModal from '@/components/Cart/CartModal';
import { USER_CART_REFRESH_EVENT } from '@/shared/cartEvents';
import { userCommerceApi } from '@/shared/userCommerceApi';

type MessagePreviewItem = {
    id: number;
    label: string;
    avatar: string | null;
};

type ConversationRow = {
    id_cuoc_tro_chuyen?: number;
    so_tin_chua_doc?: number;
    doi_tac?: {
        ten_hien_thi?: string;
        anh_dai_dien?: string | null;
    };
};

const previewFallbackStyles = [
    { bg: 'bg-[#f6e6d2]', text: 'text-[#7a4b19]' },
    { bg: 'bg-[#dff2dc]', text: 'text-[#2c6b22]' },
    { bg: 'bg-[#fde1df]', text: 'text-[#a93b35]' },
];

export default function UserQuickActions() {
    const pathname = usePathname();
    const { dangNhap, nguoiDung } = useAuth();
    const [selectedCount, setSelectedCount] = useState(0);
    const [unreadMessageCount, setUnreadMessageCount] = useState(0);
    const [messagePreviews, setMessagePreviews] = useState<MessagePreviewItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const shouldShow = dangNhap && nguoiDung?.vai_tro === 'nguoi_dung';

    useEffect(() => {
        const syncCart = async () => {
            try {
                const payload = await userCommerceApi.layGioHang() as { tong_mon_da_chon?: number };
                setSelectedCount(Number(payload?.tong_mon_da_chon ?? 0));
            } catch {
                setSelectedCount(0);
            }
        };

        void syncCart();

        const onRefresh = () => {
            void syncCart();
        };
        window.addEventListener(USER_CART_REFRESH_EVENT, onRefresh);

        return () => {
            window.removeEventListener(USER_CART_REFRESH_EVENT, onRefresh);
        };
    }, []);

    useEffect(() => {
        const syncUnreadMessages = async () => {
            try {
                const payload = await userCommerceApi.layDanhSachTroChuyen({
                    trang: 1,
                    so_luong: 50,
                }) as { du_lieu?: ConversationRow[] };
                const rows: ConversationRow[] = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
                const total = rows.reduce((sum: number, item) => sum + Number(item?.so_tin_chua_doc ?? 0), 0);
                setUnreadMessageCount(total);

                const normalized = rows
                    .map((item) => ({
                        id: Number(item?.id_cuoc_tro_chuyen ?? 0),
                        unread: Number(item?.so_tin_chua_doc ?? 0),
                        name: String(item?.doi_tac?.ten_hien_thi ?? 'Người dùng').trim(),
                        avatar: item?.doi_tac?.anh_dai_dien ? String(item.doi_tac.anh_dai_dien) : null,
                    }))
                    .filter((item) => item.id > 0);

                normalized.sort((a, b) => b.unread - a.unread);

                const picked = normalized
                    .filter((item) => item.unread > 0)
                    .slice(0, 3);

                const source = picked.length > 0 ? picked : normalized.slice(0, 3);

                setMessagePreviews(
                    source.map((item) => ({
                        id: item.id,
                        avatar: item.avatar,
                        label: item.name.split(/\s+/).slice(-1)[0].slice(0, 2) || 'ND',
                    })),
                );
            } catch {
                setUnreadMessageCount(0);
                setMessagePreviews([]);
            }
        };

        void syncUnreadMessages();
        const intervalId = window.setInterval(() => {
            void syncUnreadMessages();
        }, 15000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    if (!shouldShow || pathname === '/checkout' || pathname.startsWith('/messages')) return null;

    return (
        <>
            <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
                <button
                    type="button"
                    aria-label="Gio hang"
                    onClick={() => setIsCartOpen(true)}
                    className="relative flex h-[54px] w-[54px] items-center justify-center rounded-full border border-[#d8d8d8] bg-white shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(0,0,0,0.14)]"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4a8f2a" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="9" cy="20" r="1.5" fill="#4a8f2a" stroke="none" />
                        <circle cx="18" cy="20" r="1.5" fill="#4a8f2a" stroke="none" />
                        <path d="M3 4h2.2l2.1 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H7.1" />
                    </svg>
                    <span className="absolute bottom-[1px] right-[1px] flex h-7 min-w-7 items-center justify-center rounded-full bg-[#ff5a2c] px-1.5 text-[12px] font-bold leading-none text-white">
                        {selectedCount}
                    </span>
                </button>

                <Link
                    href="/messages"
                    aria-label="Mo tin nhan"
                    className="group relative flex min-w-[138px] items-center gap-2.5 rounded-full border border-[#e6ebe3] bg-white px-3 py-2.5 shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(0,0,0,0.14)]"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7faf6] text-[#2d6d1f] transition group-hover:bg-[#edf5ea]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                        </svg>
                    </span>
                    <span className="text-[13px] font-semibold text-[#2c2c2c]">Tin nhan</span>
                    <span className="ml-auto flex items-center">
                        {messagePreviews.map((participant, index) => {
                            const style = previewFallbackStyles[index % previewFallbackStyles.length];
                            return (
                                <span
                                    key={`${participant.id}-${index}`}
                                    className={`flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border-2 border-white text-[9px] font-bold ${
                                        index === 0 ? '' : '-ml-2'
                                    } ${participant.avatar ? '' : `${style.bg} ${style.text}`}`}
                                >
                                    {participant.avatar ? (
                                        <img src={participant.avatar} alt={participant.label} className="h-full w-full object-cover" />
                                    ) : (
                                        participant.label
                                    )}
                                </span>
                            );
                        })}
                    </span>
                    {unreadMessageCount > 0 ? (
                        <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ff4d4f] px-1 text-[11px] font-bold text-white">
                            {unreadMessageCount > 99 ? '99+' : unreadMessageCount}
                        </span>
                    ) : null}
                </Link>
            </div>

            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
