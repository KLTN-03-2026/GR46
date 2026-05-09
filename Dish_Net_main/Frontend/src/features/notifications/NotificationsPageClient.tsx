'use client';
/* eslint-disable @next/next/no-img-element */

import { useRouter } from 'next/navigation';
import { userCommerceApi } from '@/shared/userCommerceApi';
import type { NotificationItem } from './data';
import { resolveNotificationTarget } from './data';

function NotificationTypeBadge({ type }: { type: NotificationItem['type'] }) {
    const palette = {
        like: { bg: 'bg-[#1f7ae0]', icon: '👍' },
        support: { bg: 'bg-[#1f7ae0]', icon: '👥' },
        follow: { bg: 'bg-[#1f7ae0]', icon: '👥' },
        comment: { bg: 'bg-[#35c85a]', icon: '💬' },
    }[type];

    return (
        <span className={`absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white text-[16px] ${palette.bg}`}>
            <span>{palette.icon}</span>
        </span>
    );
}

export default function NotificationsPageClient({
    notifications,
}: {
    notifications: NotificationItem[];
}) {
    const router = useRouter();

    const handleNotificationClick = async (item: NotificationItem) => {
        const id = Number(item.id);
        if (Number.isFinite(id) && id > 0 && !item.isRead) {
            try {
                await userCommerceApi.danhDauThongBaoDaDoc(id);
            } catch {
                // ignore mark-read failures to avoid blocking navigation
            }
        }
        router.push(resolveNotificationTarget(item));
    };

    return (
        <div className="bg-[#f6f5f1] py-10">
            <section className="mx-auto w-full max-w-[1240px] rounded-[28px] border border-[#dfe5db] bg-white px-8 py-8 shadow-[0_14px_34px_rgba(0,0,0,0.05)]">
                <div className="flex items-start justify-between gap-4">
                    <h1 className="text-[44px] font-bold text-black">Thông báo</h1>
                    <span className="pt-3 text-[20px] text-[#1d71e8]">4 giờ trước</span>
                </div>

                <div className="mt-8 flex items-center gap-6">
                    <button type="button" className="rounded-full bg-[#eaf3ff] px-6 py-3 text-[18px] font-bold text-[#1d71e8]">
                        Tất cả
                    </button>
                </div>

                <div className="mt-8 text-[32px] font-bold text-[#232323]">Trước đó</div>

                <div className="mt-6 space-y-2">
                    {notifications.length === 0 ? (
                        <article className="rounded-[22px] border border-[#e5ebe1] bg-[#f8faf7] px-6 py-10 text-center text-[20px] text-[#5f655f]">
                            Bạn chưa có thông báo mới.
                        </article>
                    ) : (
                        notifications.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => void handleNotificationClick(item)}
                                className="flex w-full items-center gap-5 rounded-[22px] px-2 py-4 text-left transition hover:bg-[#f8faf7]"
                            >
                                <div className="relative shrink-0">
                                    <img src={item.avatar} alt="" className="h-24 w-24 rounded-full object-cover" />
                                    <NotificationTypeBadge type={item.type} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-[23px] leading-10 text-[#171717]">{item.message}</p>
                                    <p className="mt-2 text-[19px] font-semibold text-[#1d71e8]">{item.time}</p>
                                </div>

                                <span className={`mr-6 h-6 w-6 rounded-full ${item.isRead ? 'bg-[#c4ccd4]' : 'bg-[#1d71e8]'}`} />
                            </button>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
