'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import { userCommerceApi } from '@/shared/userCommerceApi';

type ConversationItem = {
    id_cuoc_tro_chuyen: number;
    doi_tac: { id: number; ten_hien_thi: string; anh_dai_dien?: string | null };
    tin_nhan_cuoi?: string | null;
    thoi_gian_tin_nhan_cuoi?: string | null;
    so_tin_chua_doc?: number;
};

type MessageItem = {
    id: number;
    noi_dung: string;
    thoi_gian_gui: string;
    la_tin_cua_toi: boolean;
};

function formatTimeLabel(value?: string | null) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

function resolveTargetUserId(rawId: string) {
    const numeric = Number(rawId);
    if (Number.isFinite(numeric) && numeric > 0) {
        return numeric;
    }
    const aliasMap: Record<string, number> = {
        'reviewer-1': 3,
        'reviewer-2': 6,
        vy: 3,
    };
    return aliasMap[rawId] ?? null;
}

export default function MessagePageClient({ targetId }: { targetId: string }) {
    const [draft, setDraft] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [conversations, setConversations] = useState<ConversationItem[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
    const [messages, setMessages] = useState<MessageItem[]>([]);

    const activeConversation = useMemo(
        () =>
            conversations.find((item) => item.id_cuoc_tro_chuyen === activeConversationId) ??
            null,
        [conversations, activeConversationId],
    );

    const loadMessages = async (conversationId: number) => {
        const payload: any = await userCommerceApi.layTinNhan(conversationId, {
            so_luong: 100,
            trang: 1,
        });
        const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
        setMessages(
            rows.map((item: any) => ({
                id: Number(item.id),
                noi_dung: String(item.noi_dung ?? ''),
                thoi_gian_gui: String(item.thoi_gian_gui ?? ''),
                la_tin_cua_toi: Boolean(item.la_tin_cua_toi),
            })),
        );
    };

    const loadConversations = async (initialConversationId?: number | null) => {
        const payload: any = await userCommerceApi.layDanhSachTroChuyen({
            trang: 1,
            so_luong: 50,
        });
        const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
        const mapped: ConversationItem[] = rows.map((item: any) => ({
            id_cuoc_tro_chuyen: Number(item.id_cuoc_tro_chuyen),
            doi_tac: {
                id: Number(item?.doi_tac?.id ?? 0),
                ten_hien_thi: String(item?.doi_tac?.ten_hien_thi ?? 'Người dùng'),
                anh_dai_dien: item?.doi_tac?.anh_dai_dien ?? null,
            },
            tin_nhan_cuoi: item?.tin_nhan_cuoi ?? null,
            thoi_gian_tin_nhan_cuoi: item?.thoi_gian_tin_nhan_cuoi ?? null,
            so_tin_chua_doc: Number(item?.so_tin_chua_doc ?? 0),
        }));
        setConversations(mapped);

        const fallbackId = mapped[0]?.id_cuoc_tro_chuyen ?? null;
        const nextActiveId = initialConversationId ?? fallbackId;
        setActiveConversationId(nextActiveId);
        if (nextActiveId) {
            await loadMessages(nextActiveId);
        } else {
            setMessages([]);
        }
    };

    useEffect(() => {
        let mounted = true;
        const run = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const targetUserId = resolveTargetUserId(targetId);
                let initialConversationId: number | null = null;

                if (targetUserId) {
                    const started: any = await userCommerceApi.batDauTroChuyen(targetUserId);
                    initialConversationId = Number(started?.id_cuoc_tro_chuyen ?? 0) || null;
                }

                await loadConversations(initialConversationId);
            } catch (err) {
                if (!mounted) return;
                setError(err instanceof Error ? err.message : 'Không tải được tin nhắn');
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        void run();
        return () => {
            mounted = false;
        };
    }, [targetId]);

    const handleSendMessage = async () => {
        const content = draft.trim();
        if (!activeConversationId || !content) return;
        try {
            await userCommerceApi.guiTinNhan(activeConversationId, content);
            setDraft('');
            await loadConversations(activeConversationId);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Không gửi được tin nhắn');
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Đang tải hội thoại...</div>;
    }

    if (error) {
        return (
            <div className="p-8 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="h-full min-h-0 overflow-hidden bg-[#f4f6f3] p-3 lg:p-4">
            <section className="grid h-full min-h-0 w-full grid-cols-[64px_280px_minmax(0,1fr)] overflow-hidden rounded-[24px] border border-[#dfe9d9] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)] lg:grid-cols-[72px_320px_minmax(0,1fr)]">
                <aside className="flex min-h-0 flex-col items-center gap-6 border-r border-[#e4efe0] bg-[#fbfdf9] py-6 lg:gap-7 lg:py-7">
                    <button type="button" className="text-[22px] text-[#202020] lg:text-[24px]">⌂</button>
                    <button type="button" className="text-[22px] text-[#202020] lg:text-[24px]">◉</button>
                    <button type="button" className="text-[22px] text-[#ff3158] lg:text-[24px]">➤</button>
                    <button type="button" className="relative text-[22px] text-[#202020] lg:text-[24px]">
                        ☏
                    </button>
                </aside>

                <aside className="flex min-h-0 flex-col border-r border-[#e4efe0] bg-white">
                    <div className="border-b border-[#eef3eb] px-5 py-5 lg:px-6 lg:py-6">
                        <h1 className="text-[34px] font-bold leading-none text-black lg:text-[40px]">Tin nhắn</h1>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto p-3 lg:p-4">
                        {conversations.map((conversation) => (
                            <button
                                key={conversation.id_cuoc_tro_chuyen}
                                type="button"
                                onClick={() => {
                                    setActiveConversationId(conversation.id_cuoc_tro_chuyen);
                                    void loadMessages(conversation.id_cuoc_tro_chuyen);
                                }}
                                className={`mb-2 flex w-full items-center gap-3 rounded-[18px] px-3 py-3 text-left transition lg:px-4 lg:py-4 ${
                                    activeConversationId === conversation.id_cuoc_tro_chuyen
                                        ? 'bg-[#f5f6f3]'
                                        : 'hover:bg-[#edf3ea]'
                                }`}
                            >
                                <img
                                    src={conversation.doi_tac.anh_dai_dien || 'https://i.pravatar.cc/160'}
                                    alt={conversation.doi_tac.ten_hien_thi}
                                    className="h-12 w-12 rounded-full object-cover lg:h-14 lg:w-14"
                                />
                                <div className="min-w-0 flex-1">
                                    <div className="truncate text-[16px] font-bold text-[#171717] lg:text-[18px]">
                                        {conversation.doi_tac.ten_hien_thi}
                                    </div>
                                    <div className="mt-1 truncate text-[13px] text-[#7a7a7a] lg:text-[14px]">
                                        {conversation.tin_nhan_cuoi || 'Chưa có tin nhắn'}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[12px] text-[#7a7a7a]">
                                        {formatTimeLabel(conversation.thoi_gian_tin_nhan_cuoi)}
                                    </div>
                                    {(conversation.so_tin_chua_doc ?? 0) > 0 ? (
                                        <span className="mt-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ff3b30] px-1 text-[11px] font-bold text-white">
                                            {conversation.so_tin_chua_doc}
                                        </span>
                                    ) : null}
                                </div>
                            </button>
                        ))}
                    </div>
                </aside>

                <section className="grid min-h-0 grid-rows-[76px_minmax(0,1fr)_92px] bg-[radial-gradient(circle_at_top_left,_rgba(186,230,197,0.22),_transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fbf6_100%)] lg:grid-rows-[82px_minmax(0,1fr)_98px]">
                    <header className="flex items-center justify-between gap-4 border-b border-[#e5eee1] px-5 lg:px-8">
                        <div className="flex min-w-0 items-center gap-3 lg:gap-4">
                            <img
                                src={activeConversation?.doi_tac.anh_dai_dien || 'https://i.pravatar.cc/160'}
                                alt={activeConversation?.doi_tac.ten_hien_thi ?? 'Người dùng'}
                                className="h-10 w-10 rounded-full object-cover ring-4 ring-white lg:h-11 lg:w-11"
                            />
                            <div className="min-w-0">
                                <div className="truncate text-[17px] font-bold text-[#181818] lg:text-[18px]">
                                    {activeConversation?.doi_tac.ten_hien_thi ?? 'Chọn cuộc trò chuyện'}
                                </div>
                                <div className="text-[12px] text-[#5f8e55] lg:text-[13px]">Đang hoạt động gần đây</div>
                            </div>
                        </div>
                    </header>

                    <div className="min-h-0 overflow-y-auto px-5 py-5 lg:px-8 lg:py-6">
                        <div className="space-y-4 lg:space-y-5">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.la_tin_cua_toi ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[560px] rounded-[20px] px-4 py-4 text-[14px] leading-7 shadow-[0_10px_24px_rgba(0,0,0,0.06)] lg:max-w-[620px] lg:px-5 lg:text-[15px] ${
                                            message.la_tin_cua_toi
                                                ? 'rounded-br-[8px] bg-[#2f7f27] text-white'
                                                : 'rounded-bl-[8px] bg-white text-[#2f2f2f]'
                                        }`}
                                    >
                                        <p>{message.noi_dung}</p>
                                        <div className={`mt-2 text-[12px] ${message.la_tin_cua_toi ? 'text-white/70' : 'text-[#8a8a8a]'}`}>
                                            {formatTimeLabel(message.thoi_gian_gui)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-[#e5eee1] bg-white/90 px-5 py-4 backdrop-blur lg:px-7">
                        <div className="flex h-full items-center gap-3 rounded-[22px] border border-[#dbe7d6] bg-white px-3 py-2 shadow-[0_16px_30px_rgba(56,97,49,0.08)] lg:px-4">
                            <textarea
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                                placeholder="Gửi tin nhắn..."
                                className="max-h-28 min-h-[44px] flex-1 resize-none bg-transparent px-1 py-2 text-[14px] text-[#202020] outline-none placeholder:text-[#9aa69a] lg:max-h-32 lg:min-h-[46px] lg:text-[15px]"
                            />
                            <button
                                type="button"
                                onClick={handleSendMessage}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2f7f27] text-[17px] text-white lg:h-11 lg:w-11 lg:text-[18px]"
                            >
                                ➤
                            </button>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}
