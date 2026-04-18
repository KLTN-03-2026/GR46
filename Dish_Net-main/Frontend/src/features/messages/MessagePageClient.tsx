'use client';
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';

import type { ReviewerConversation } from '@/features/ranking-reviewer-detail/data';

export default function MessagePageClient({
    conversation,
}: {
    conversation: ReviewerConversation;
}) {
    const [draft, setDraft] = useState('');

    return (
        <div className="h-full min-h-0 overflow-hidden bg-[#f4f6f3] p-3 lg:p-4">
            <section className="grid h-full min-h-0 w-full grid-cols-[64px_280px_minmax(0,1fr)] overflow-hidden rounded-[24px] border border-[#dfe9d9] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)] lg:grid-cols-[72px_320px_minmax(0,1fr)]">
                <aside className="flex min-h-0 flex-col items-center gap-6 border-r border-[#e4efe0] bg-[#fbfdf9] py-6 lg:gap-7 lg:py-7">
                    <button type="button" className="text-[22px] text-[#202020] lg:text-[24px]">⌂</button>
                    <button type="button" className="text-[22px] text-[#202020] lg:text-[24px]">◉</button>
                    <button type="button" className="text-[22px] text-[#ff3158] lg:text-[24px]">➤</button>
                    <button type="button" className="relative text-[22px] text-[#202020] lg:text-[24px]">
                        ☏
                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff3158] text-[11px] font-bold text-white lg:h-6 lg:w-6 lg:text-[12px]">
                            1
                        </span>
                    </button>
                </aside>

                <aside className="flex min-h-0 flex-col border-r border-[#e4efe0] bg-white">
                    <div className="border-b border-[#eef3eb] px-5 py-5 lg:px-6 lg:py-6">
                        <h1 className="text-[34px] font-bold leading-none text-black lg:text-[40px]">Tin nhắn</h1>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto p-3 lg:p-4">
                        <button
                            type="button"
                            className="flex w-full items-center gap-3 rounded-[18px] bg-[#f5f6f3] px-3 py-3 text-left transition hover:bg-[#edf3ea] lg:px-4 lg:py-4"
                        >
                            <img src={conversation.avatar} alt={conversation.reviewerName} className="h-12 w-12 rounded-full object-cover lg:h-14 lg:w-14" />
                            <div className="min-w-0 flex-1">
                                <div className="truncate text-[16px] font-bold text-[#171717] lg:text-[18px]">{conversation.reviewerName}</div>
                                <div className="mt-1 text-[13px] text-[#7a7a7a] lg:text-[14px]">{conversation.lastSeen}</div>
                            </div>
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff3b30] text-[14px] font-bold text-white">
                                1
                            </span>
                        </button>
                    </div>
                </aside>

                <section className="grid min-h-0 grid-rows-[76px_minmax(0,1fr)_92px] bg-[radial-gradient(circle_at_top_left,_rgba(186,230,197,0.22),_transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fbf6_100%)] lg:grid-rows-[82px_minmax(0,1fr)_98px]">
                    <header className="flex items-center justify-between gap-4 border-b border-[#e5eee1] px-5 lg:px-8">
                        <div className="flex min-w-0 items-center gap-3 lg:gap-4">
                            <img
                                src={conversation.avatar}
                                alt={conversation.reviewerName}
                                className="h-10 w-10 rounded-full object-cover ring-4 ring-white lg:h-11 lg:w-11"
                            />
                            <div className="min-w-0">
                                <div className="truncate text-[17px] font-bold text-[#181818] lg:text-[18px]">{conversation.reviewerName}</div>
                                <div className="text-[12px] text-[#5f8e55] lg:text-[13px]">Đang hoạt động gần đây</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 lg:gap-3">
                            <button
                                type="button"
                                className="rounded-full bg-white px-3 py-2 text-[13px] font-semibold text-[#436b3b] shadow-[0_8px_20px_rgba(67,107,59,0.12)] lg:px-4 lg:text-[14px]"
                            >
                                Xem hồ sơ
                            </button>
                            <button
                                type="button"
                                className="rounded-full bg-[#eff6ec] px-3 py-2 text-[13px] font-semibold text-[#436b3b] lg:px-4 lg:text-[14px]"
                            >
                                Tắt thông báo
                            </button>
                        </div>
                    </header>

                    <div className="min-h-0 overflow-y-auto px-5 py-5 lg:px-8 lg:py-6">
                        <div className="mx-auto mb-4 w-max rounded-full bg-[#edf4ea] px-4 py-2 text-[12px] font-semibold text-[#6d7f68] lg:text-[13px]">
                            Hôm nay
                        </div>

                        <div className="space-y-4 lg:space-y-5">
                            {conversation.messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.from === 'me' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[560px] rounded-[20px] px-4 py-4 text-[14px] leading-7 shadow-[0_10px_24px_rgba(0,0,0,0.06)] lg:max-w-[620px] lg:px-5 lg:text-[15px] ${
                                            message.from === 'me'
                                                ? 'rounded-br-[8px] bg-[#2f7f27] text-white'
                                                : 'rounded-bl-[8px] bg-white text-[#2f2f2f]'
                                        }`}
                                    >
                                        <p>{message.text}</p>
                                        <div className={`mt-2 text-[12px] ${message.from === 'me' ? 'text-white/70' : 'text-[#8a8a8a]'}`}>
                                            {message.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-[#e5eee1] bg-white/90 px-5 py-4 backdrop-blur lg:px-7">
                        <div className="flex h-full items-center gap-3 rounded-[22px] border border-[#dbe7d6] bg-white px-3 py-2 shadow-[0_16px_30px_rgba(56,97,49,0.08)] lg:px-4">
                            <button
                                type="button"
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1f6ef] text-[20px] text-[#4f6b48] lg:h-11 lg:w-11"
                            >
                                +
                            </button>

                            <textarea
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                                placeholder="Gửi tin nhắn..."
                                className="max-h-28 min-h-[44px] flex-1 resize-none bg-transparent px-1 py-2 text-[14px] text-[#202020] outline-none placeholder:text-[#9aa69a] lg:max-h-32 lg:min-h-[46px] lg:text-[15px]"
                            />

                            <div className="flex shrink-0 items-center gap-2">
                                <button
                                    type="button"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f6ef] text-[17px] text-[#4f6b48] lg:h-11 lg:w-11 lg:text-[18px]"
                                >
                                    🖼
                                </button>
                                <button
                                    type="button"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f6ef] text-[17px] text-[#4f6b48] lg:h-11 lg:w-11 lg:text-[18px]"
                                >
                                    ☺
                                </button>
                                <button
                                    type="button"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2f7f27] text-[17px] text-white lg:h-11 lg:w-11 lg:text-[18px]"
                                >
                                    ➤
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}
