'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { userCommerceApi } from '@/shared/userCommerceApi';
import type { NotificationItem } from './data';
import { resolveNotificationTarget, mapNotificationRow, SYSTEM_LOGO } from './data';

function NotificationAvatar({ item }: { item: NotificationItem }) {
    const iconConfig: Record<NotificationItem['type'], { bg: string; icon: string }> = {
        like: { bg: 'bg-[#1f7ae0]', icon: '👍' },
        support: { bg: 'bg-[#6b7280]', icon: '🛎️' },
        follow: { bg: 'bg-[#1f7ae0]', icon: '👥' },
        comment: { bg: 'bg-[#35c85a]', icon: '💬' },
        order: { bg: 'bg-[#f57c00]', icon: '🛍️' },
    };
    const { bg, icon } = iconConfig[item.type] ?? iconConfig.support;

    return (
        <div className="relative shrink-0">
            {item.isSystemAvatar ? (
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#f0f7e8] border-2 border-[#d4e8c2]">
                    <Image src={SYSTEM_LOGO} alt="DishNet" width={56} height={56} className="object-contain" />
                </div>
            ) : (
                <img src={item.avatar} alt="" className="h-24 w-24 rounded-full object-cover" />
            )}
            <span className={`absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white text-[16px] ${bg}`}>
                {icon}
            </span>
        </div>
    );
}

export default function NotificationsPageClient() {
    const router = useRouter();
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchNotifications = () => {
            void userCommerceApi
                .layThongBao({ trang: 1, so_luong: 50 })
                .then((payload: any) => {
                    if (!mounted) return;
                    const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
                    setNotifications(rows.map(mapNotificationRow));
                })
                .catch(() => { /* keep existing list on error */ })
                .finally(() => { if (mounted) setLoading(false); });
        };

        fetchNotifications();
        const intervalId = window.setInterval(fetchNotifications, 10_000);

        return () => {
            mounted = false;
            window.clearInterval(intervalId);
        };
    }, []);

    const handleNotificationClick = async (item: NotificationItem) => {
        const id = Number(item.id);
        if (Number.isFinite(id) && id > 0 && !item.isRead) {
            try {
                await userCommerceApi.danhDauThongBaoDaDoc(id);
                setNotifications((prev) =>
                    prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n)),
                );
            } catch {
                // ignore
            }
        }
        router.push(resolveNotificationTarget(item));
    };

    return (
        <div className="bg-[#f6f5f1] py-10">
            <section className="mx-auto w-full max-w-[1240px] rounded-[28px] border border-[#dfe5db] bg-white px-8 py-8 shadow-[0_14px_34px_rgba(0,0,0,0.05)]">
                <h1 className="text-[44px] font-bold text-black">Thông báo</h1>

                <div className="mt-8 flex items-center gap-6">
                    <button type="button" className="rounded-full bg-[#eaf3ff] px-6 py-3 text-[18px] font-bold text-[#1d71e8]">
                        Tất cả
                    </button>
                </div>

                <div className="mt-8 text-[32px] font-bold text-[#232323]">Trước đó</div>

                <div className="mt-6 space-y-2">
                    {loading ? (
                        <div className="py-10 text-center text-[18px] text-[#888]">Đang tải...</div>
                    ) : notifications.length === 0 ? (
                        <article className="rounded-[22px] border border-[#e5ebe1] bg-[#f8faf7] px-6 py-10 text-center text-[20px] text-[#5f655f]">
                            Bạn chưa có thông báo nào.
                        </article>
                    ) : (
                        notifications.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => void handleNotificationClick(item)}
                                className={`flex w-full items-center gap-5 rounded-[22px] px-2 py-4 text-left transition hover:bg-[#f8faf7] ${!item.isRead ? 'bg-[#f0f7ff]' : ''}`}
                            >
                                <NotificationAvatar item={item} />

                                <div className="min-w-0 flex-1">
                                    <p className="text-[21px] font-semibold leading-8 text-[#171717]">{item.message}</p>
                                    {item.noi_dung && item.noi_dung !== item.message && (
                                        <p className="mt-1 text-[17px] leading-6 text-[#555]">{item.noi_dung}</p>
                                    )}
                                    <p className="mt-2 text-[17px] font-semibold text-[#1d71e8]">{item.time}</p>
                                </div>

                                <span className={`mr-6 h-6 w-6 shrink-0 rounded-full ${item.isRead ? 'bg-[#c4ccd4]' : 'bg-[#1d71e8]'}`} />
                            </button>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
