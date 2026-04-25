'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useState } from 'react';
import type { ReactNode } from 'react';
import CommentModal from '@/features/home/CommentModal';
import { userContentApi } from '@/shared/userContentApi';

import type {
    EarningsItem,
    EarningsItemStatus,
    EarningsProfile,
    UserProfile,
    WithdrawalAccount,
    WithdrawalStatus,
} from '@/features/profile/data';

type ProfileTab = 'posts' | 'videos' | 'reposts' | 'revenue' | 'withdrawals';
type SortMode = 'latest' | 'oldest';
type EarningsFilter = 'all' | EarningsItemStatus;
type WithdrawalFilter = 'all' | WithdrawalStatus;

function GridIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-current">
            <path d="M3 3h5v5H3V3Zm0 9h5v5H3v-5Zm9-9h5v5h-5V3Zm0 9h5v5h-5v-5Z" />
        </svg>
    );
}

function VideoIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
            <rect x="3.25" y="4.25" width="13.5" height="11.5" rx="2.25" />
            <path d="m8 7 5 3-5 3V7Z" fill="currentColor" stroke="none" />
        </svg>
    );
}

function RepostIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6h7l-1.8-2" />
            <path d="M14 14H7l1.8 2" />
            <path d="M13 6l2 2.2L13 10.5" />
            <path d="M7 14l-2-2.2L7 9.5" />
        </svg>
    );
}

function ShareIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="5" cy="10" r="2" />
            <circle cx="14.5" cy="5" r="2" />
            <circle cx="14.5" cy="15" r="2" />
            <path d="m6.8 9 5.6-3" />
            <path d="m6.8 11 5.6 3" />
        </svg>
    );
}

function WalletIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16.5 6H5a1.75 1.75 0 0 1 0-3.5h11.5" />
            <path d="M3 6.5h13.5v7.75A1.75 1.75 0 0 1 14.75 16H4.75A1.75 1.75 0 0 1 3 14.25V6.5Z" />
            <circle cx="12.8" cy="10.8" r="1.1" fill="currentColor" stroke="none" />
        </svg>
    );
}

function HistoryIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 10a6.5 6.5 0 1 0 2.3-5" />
            <path d="M3.5 3.5v4h4" />
            <path d="M10 6.4v4l2.8 1.7" />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4.5 w-4.5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="9" r="5.5" />
            <path d="m13.5 13.5 3 3" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round">
            <path d="M5 5 15 15" />
            <path d="M15 5 5 15" />
        </svg>
    );
}

function MoreIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 fill-current">
            <circle cx="4" cy="10" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="16" cy="10" r="1.5" />
        </svg>
    );
}

function SearchImageIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="14" height="14" rx="2.5" />
            <circle cx="7.25" cy="7.25" r="1.2" />
            <path d="m17 13-3.5-3.5a1.8 1.8 0 0 0-2.55 0L3 17" />
        </svg>
    );
}

function Badge({ children, tone = 'yellow' }: { children: ReactNode; tone?: 'yellow' | 'pink' }) {
    const toneClass = tone === 'yellow'
        ? 'bg-[#faedc8] text-[#202020]'
        : 'bg-[#ffd8d0] text-[#202020]';

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-[12px] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.02em] ${toneClass}`}>
            {children}
        </span>
    );
}

function CreatePostModal({ profile, onClose }: { profile: UserProfile; onClose: () => void }) {
    const [isOrderLink, setIsOrderLink] = useState(false);

    return (
        <div className="fixed inset-0 z-[100] flex justify-center bg-black/40 px-4 pt-[10vh] backdrop-blur-sm">
            <div className="h-fit w-full max-w-[500px] rounded-[12px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                <div className="flex items-center justify-between border-b border-[#e5e5e5] px-5 py-4">
                    <button onClick={onClose} className="text-[15px] font-medium text-[#666] transition hover:text-black">
                        Hủy
                    </button>
                    <h2 className="text-[18px] font-bold text-black">Tạo bài viết</h2>
                    <div className="w-[30px]" />
                </div>

                <div className="p-5">
                    <div className="flex gap-3">
                        <img src={profile.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-black">{profile.handle}</span>
                                <button className="flex items-center gap-1 rounded bg-[#e4e6eb] px-2 py-0.5 text-[12px] font-medium text-[#050505]">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                    Bạn bè
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>
                            </div>
                            <textarea
                                placeholder="Có gì mới?"
                                className="mt-2 w-full resize-none bg-transparent text-[16px] outline-none placeholder:text-[#8a8d91]"
                                rows={3}
                                autoFocus
                            />

                            <div className="mt-2 flex items-center gap-4 text-[#65676b]">
                                <button className="transition hover:text-black"><SearchImageIcon /></button>
                                <button className="transition hover:text-black"><GridIcon /></button>
                                <button className="transition hover:text-black"><VideoIcon /></button>
                                <button className="transition hover:text-black"><RepostIcon /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-5 pt-8">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-[#1a6e14]">Đặt món</span>
                        <button
                            type="button"
                            onClick={() => setIsOrderLink(!isOrderLink)}
                            className={`relative flex h-[22px] w-10 items-center rounded-full transition-colors ${isOrderLink ? 'bg-[#1a6e14]' : 'bg-[#8a8d91]'}`}
                        >
                            <span className={`inline-block h-[18px] w-[18px] rounded-full bg-white shadow transition-transform ${isOrderLink ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </button>
                        <input
                            type="text"
                            placeholder="Link món"
                            className="h-[34px] w-[180px] rounded-[6px] border border-[#ced0d4] px-3 text-[14px] outline-none transition focus:border-[#1a6e14]"
                            disabled={!isOrderLink}
                            style={{ opacity: isOrderLink ? 1 : 0.6 }}
                        />
                    </div>

                    <button className="rounded-[8px] border border-[#f0f0f0] px-6 py-1.5 font-bold text-[#bcc0c4]">
                        Đăng
                    </button>
                </div>
            </div>
        </div>
    );
}

function CreatePostBox({ profile, onClick }: { profile: UserProfile; onClick: () => void }) {
    return (
        <div className="border-t border-[#d9d9d9] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
                <img src={profile.avatar} alt={profile.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                <button
                    type="button"
                    onClick={onClick}
                    className="flex h-11 flex-1 items-center rounded-full border border-[#d8d8d8] px-4 text-left text-[14px] text-[#9b9b9b] transition hover:bg-[#fafafa]"
                >
                    Có gì mới
                </button>
                <button
                    type="button"
                    onClick={onClick}
                    className="rounded-full bg-[#111111] px-4 py-2 text-[14px] font-bold text-white transition hover:bg-[#2c2c2c]"
                >
                    Đăng
                </button>
            </div>
        </div>
    );
}

function PostMenu({ isOpen, onToggle, onClose }: { isOpen: boolean; onToggle: () => void; onClose: () => void }) {
    return (
        <div className="relative">
            <button
                type="button"
                onClick={onToggle}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#696969] transition hover:bg-[#f3f3f3]"
                aria-label="Tùy chọn bài viết"
            >
                <MoreIcon />
            </button>
            {isOpen ? (
                <div className="absolute right-0 top-[calc(100%+6px)] z-10 w-[132px] rounded-[10px] border border-[#ebebeb] bg-white py-1 shadow-[0_16px_32px_rgba(0,0,0,0.12)]">
                    <button type="button" onClick={onClose} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#222] transition hover:bg-[#f7f7f7]">
                        <span>📝</span>
                        <span>Chỉnh sửa</span>
                    </button>
                    <button type="button" onClick={onClose} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#222] transition hover:bg-[#f7f7f7]">
                        <span>🗑️</span>
                        <span>Xóa bài viết</span>
                    </button>
                </div>
            ) : null}
        </div>
    );
}

function PostCard({
    post,
    profile,
    onLike,
    onComment,
    onShare,
    onReport,
}: {
    post: UserProfile['posts'][number];
    profile: UserProfile;
    onLike: () => void;
    onComment: () => void;
    onShare: () => void;
    onReport: () => void;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isRepost = post.type === 'repost' || Boolean(post.sharedPost);

    return (
        <article className="border-t border-[#d9d9d9] px-4 py-5 sm:px-6">
            <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-4 sm:grid-cols-[44px_minmax(0,1fr)]">
                <div className="flex flex-col items-center">
                    <img src={profile.avatar} alt={profile.name} className="h-10 w-10 rounded-full object-cover" />
                    <div className="mt-3 h-full min-h-[320px] w-px bg-[#ececec]" />
                </div>

                <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="text-[16px] font-bold text-black">@vy.fooodieee</span>
                                <span className="text-[11px] text-[#8c8c8c]">{post.date}</span>
                            </div>
                        </div>
                        <PostMenu
                            isOpen={isMenuOpen}
                            onToggle={() => setIsMenuOpen((current) => !current)}
                            onClose={() => setIsMenuOpen(false)}
                        />
                    </div>

                    <div className="mt-3 space-y-2 text-[13px] leading-7 text-[#535353]">
                        <p className="whitespace-pre-wrap">{post.content}</p>
                    </div>

                    {isRepost && post.sharedPost ? (
                        <div className="mt-4 rounded-[14px] border border-dashed border-[#dfe6d8] bg-[#f8fbf7] p-4">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-[13px] font-semibold text-[#285e19]">{post.sharedPost.author}</p>
                                <p className="text-[11px] text-[#7d7d7d]">{post.sharedPost.date}</p>
                            </div>
                            <p className="mt-2 whitespace-pre-wrap text-[13px] leading-6 text-[#444]">{post.sharedPost.content}</p>
                            {post.sharedPost.images.length > 0 ? (
                                <div className="mt-4 grid max-w-[424px] grid-cols-2 gap-3">
                                    {post.sharedPost.images.slice(0, 2).map((image, index) => (
                                        <img
                                            key={`${post.id}-shared-${index}`}
                                            src={image}
                                            alt=""
                                            className="h-[154px] w-full rounded-[10px] object-cover sm:h-[168px]"
                                        />
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    ) : post.images.length > 0 ? (
                        <div className="mt-4 grid max-w-[424px] grid-cols-2 gap-3">
                            {post.images.slice(0, 2).map((image, index) => (
                                <img
                                    key={`${post.id}-${index}`}
                                    src={image}
                                    alt=""
                                    className="h-[154px] w-full rounded-[10px] object-cover sm:h-[168px]"
                                />
                            ))}
                        </div>
                    ) : null}

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] text-[#5b5b5b]">
                        <button type="button" onClick={onLike} className="transition hover:text-[#285e19]">♡ {post.likes}</button>
                        <button type="button" onClick={onComment} className="transition hover:text-[#285e19]">◔ {post.comments}</button>
                        <button
                            type="button"
                            onClick={onShare}
                            disabled={isRepost}
                            className={`transition ${isRepost ? 'cursor-not-allowed text-[#b5b5b5]' : 'hover:text-[#285e19]'}`}
                        >
                            ↺ {post.shares}
                        </button>
                        <button type="button" onClick={onReport} className="transition hover:text-[#c62828]">⚑ Báo cáo</button>
                        <span>➤ {post.sends}</span>
                        <button
                            type="button"
                            className="ml-auto rounded-full bg-[#2f8e2a] px-5 py-1.5 text-[12px] font-bold text-white transition hover:bg-[#277823]"
                        >
                            Đặt món
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

function VideoCard({ item }: { item: UserProfile['videos'][number] }) {
    return (
        <article className="group relative overflow-hidden rounded-[12px]">
            <img src={item.image} alt="" className="h-[210px] w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {item.pinned ? (
                <span className="absolute left-3 top-3 rounded-[8px] bg-[#ff3356] px-3 py-1 text-[12px] font-bold text-white">Đã ghim</span>
            ) : null}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[15px] font-semibold text-white">
                <span>▷</span>
                <span>{item.views}</span>
            </div>
        </article>
    );
}

function EarningsStatusBadge({ status }: { status: EarningsItemStatus }) {
    const styles = {
        earning: 'bg-[#48bf97] text-white',
        low: 'bg-[#fff0d8] text-[#b77915]',
        high: 'bg-[#e7f5ed] text-[#228152]',
    } as const;

    const labels = {
        earning: 'Đang kiếm tiền',
        low: 'Hiệu quả thấp',
        high: 'Hiệu quả cao',
    } as const;

    return <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-[12px] font-bold ${styles[status]}`}>{labels[status]}</span>;
}

function WithdrawalStatusBadge({ status }: { status: WithdrawalStatus }) {
    const styles = {
        completed: 'bg-[#eef9f3] text-[#26895f]',
        processing: 'bg-[#eef2ff] text-[#6673a4]',
        rejected: 'bg-[#fff0ef] text-[#d7564e]',
    } as const;

    const labels = {
        completed: 'Đã hoàn thành',
        processing: 'Đang xử lý',
        rejected: 'Bị từ chối',
    } as const;

    return (
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold ${styles[status]}`}>
            <span className="text-[10px]">●</span>
            {labels[status]}
        </span>
    );
}

function OverviewMetric({
    label,
    value,
    delta,
    tone = 'green',
}: {
    label: string;
    value: string;
    delta: string;
    tone?: 'green' | 'red' | 'orange';
}) {
    const toneClass = tone === 'red' ? 'text-[#d83e31]' : tone === 'orange' ? 'text-[#e59a19]' : 'text-[#299537]';

    return (
        <div className="space-y-2">
            <p className="text-[14px] font-medium text-[#242424]">{label}</p>
            <p className={`text-[20px] font-bold sm:text-[24px] ${toneClass}`}>{value}</p>
            <p className="text-[12px] text-[#707070]">{delta}</p>
        </div>
    );
}

function EarningsCard({
    item,
    isMenuOpen,
    onToggleMenu,
    onCloseMenu,
}: {
    item: EarningsItem;
    isMenuOpen: boolean;
    onToggleMenu: () => void;
    onCloseMenu: () => void;
}) {
    return (
        <article className="rounded-[14px] border border-[#dcd6cb] bg-white px-4 py-4 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col gap-4 sm:flex-row">
                <img src={item.image} alt={item.title} className="h-[132px] w-full rounded-[12px] object-cover sm:w-[180px]" />

                <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-[18px] font-semibold text-black">{item.title}</h3>
                        </div>

                        <div className="flex items-center gap-2">
                            <EarningsStatusBadge status={item.status} />
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={onToggleMenu}
                                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#333] transition hover:bg-[#f5f5f5]"
                                >
                                    <MoreIcon />
                                </button>
                                {isMenuOpen ? (
                                    <div className="absolute right-0 top-[calc(100%+6px)] z-10 w-[150px] rounded-[10px] border border-[#ebebeb] bg-white py-1 shadow-[0_16px_32px_rgba(0,0,0,0.12)]">
                                        <button type="button" onClick={onCloseMenu} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#222] transition hover:bg-[#f7f7f7]">
                                            <span>✎</span>
                                            <span>Chỉnh sửa</span>
                                        </button>
                                        <button type="button" onClick={onCloseMenu} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#222] transition hover:bg-[#f7f7f7]">
                                            <span>⌁</span>
                                            <span>Tắt kiếm tiền</span>
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-[#2b2b2b]">
                        <span>▶ <strong>{item.views}</strong> lượt xem</span>
                        <span><strong>{item.interactions}</strong> lượt tương tác</span>
                        <span>💸 <strong>{item.revenue}</strong></span>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 border-t border-[#ece7de] pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[13px] text-[#4d4d4d]">Ngày đăng : {item.publishedAt}</p>
                        <button
                            type="button"
                            className="inline-flex h-10 items-center justify-center rounded-[10px] border border-[#202020] px-5 text-[13px] font-semibold text-[#202020] transition hover:bg-[#f8f8f8]"
                        >
                            Xem bài viết
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

function WithdrawModal({
    accounts,
    summary,
    amount,
    selectedAccountId,
    onAmountChange,
    onAccountChange,
    onConfirm,
    onClose,
}: {
    accounts: WithdrawalAccount[];
    summary: EarningsProfile['withdrawSummary'];
    amount: string;
    selectedAccountId: string;
    onAmountChange: (value: string) => void;
    onAccountChange: (value: string) => void;
    onConfirm: () => void;
    onClose: () => void;
}) {
    const selectedAccount = accounts.find((account) => account.id === selectedAccountId) ?? accounts[0];

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
            <div className="w-full max-w-[620px] rounded-[20px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="flex items-center justify-between border-b border-[#ededed] px-5 py-4">
                    <h2 className="w-full text-center text-[22px] font-bold text-[#222]">Rút tiền</h2>
                    <button type="button" onClick={onClose} className="rounded-[10px] bg-[#f5f5f7] p-2 text-[#7f8492] transition hover:text-black">
                        <CloseIcon />
                    </button>
                </div>

                <div className="space-y-5 px-5 py-5 sm:px-6">
                    <div className="grid gap-3 rounded-[16px] bg-[linear-gradient(135deg,#f8fff6_0%,#f5f8ff_100%)] p-3 sm:grid-cols-3">
                        <div className="rounded-[12px] bg-white/70 px-3 py-3">
                            <p className="text-[14px] font-bold text-[#37956e]">{summary.availableBalance}</p>
                            <p className="mt-1 text-[12px] text-[#6b6b6b]">Số dư khả dụng</p>
                        </div>
                        <div className="rounded-[12px] bg-white/70 px-3 py-3">
                            <p className="text-[14px] font-bold text-[#6f768f]">{summary.processingAmount}</p>
                            <p className="mt-1 text-[12px] text-[#6b6b6b]">Đang xử lý</p>
                        </div>
                        <div className="rounded-[12px] bg-white/70 px-3 py-3">
                            <p className="text-[14px] font-bold text-[#3a8a63]">{summary.totalWithdrawn}</p>
                            <p className="mt-1 text-[12px] text-[#6b6b6b]">Tổng đã rút</p>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-[16px] font-semibold text-[#242424]">Số tiền rút</label>
                        <div className="flex items-center rounded-[12px] border border-[#ddd7cd] px-4">
                            <input
                                type="text"
                                value={amount}
                                onChange={(event) => onAmountChange(event.target.value)}
                                className="h-12 w-full bg-transparent text-[18px] font-semibold text-[#2f2f2f] outline-none"
                            />
                            <span className="text-[16px] font-semibold text-[#6f7280]">đ</span>
                        </div>
                        <p className="mt-2 text-[13px] text-[#7b7b7b]">Số tiền tối thiểu có thể rút: 100,000đ</p>
                    </div>

                    <div>
                        <label className="mb-2 block text-[16px] font-semibold text-[#242424]">Tài khoản ngân hàng liên kết</label>
                        <select
                            value={selectedAccount.id}
                            onChange={(event) => onAccountChange(event.target.value)}
                            className="h-12 w-full rounded-[12px] border border-[#ddd7cd] bg-white px-4 text-[15px] text-[#2f2f2f] outline-none"
                        >
                            {accounts.map((account) => (
                                <option key={account.id} value={account.id}>
                                    {account.provider} {account.accountNumber}
                                </option>
                            ))}
                        </select>
                        <div className="mt-3 flex h-12 items-center justify-between rounded-[12px] border border-[#ddd7cd] px-4 text-[15px] text-[#2f2f2f]">
                            <span>{selectedAccount.accountName}</span>
                            <span className="text-[#8a8a8a]">✎</span>
                        </div>
                    </div>

                    <div className="rounded-[14px] bg-[#f3f7ff] px-4 py-3 text-[13px] leading-6 text-[#6a748d]">
                        <p>Số tiền tối thiểu để rút là 100,000đ.</p>
                        <p>Thời gian xử lý có thể mất từ 1 - 3 ngày làm việc.</p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="h-11 rounded-[12px] bg-[linear-gradient(90deg,#2ea57d_0%,#56c194_100%)] text-[16px] font-bold text-white transition hover:opacity-95"
                        >
                            Xác nhận
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-11 rounded-[12px] border border-[#d6d1c8] bg-white text-[16px] font-semibold text-[#303030] transition hover:bg-[#fafafa]"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WithdrawSuccessModal({ onClose, onViewHistory }: { onClose: () => void; onViewHistory: () => void }) {
    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
            <div className="w-full max-w-[620px] rounded-[20px] bg-white px-6 py-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="flex justify-end">
                    <button type="button" onClick={onClose} className="rounded-[10px] bg-[#f5f5f7] p-2 text-[#7f8492] transition hover:text-black">
                        <CloseIcon />
                    </button>
                </div>
                <h3 className="mt-2 text-[28px] font-bold text-[#2e6f25] sm:text-[40px]">Bạn đã rút tiền thành công</h3>
                <button
                    type="button"
                    onClick={onViewHistory}
                    className="mt-8 inline-flex h-11 items-center justify-center rounded-[12px] border border-[#1e1e1e] px-6 text-[15px] font-semibold text-[#202020] transition hover:bg-[#f8f8f8]"
                >
                    Xem lịch sử rút tiền
                </button>
            </div>
        </div>
    );
}

function EarningsPanel({
    earnings,
    filter,
    searchValue,
    openMenuId,
    onFilterChange,
    onSearchChange,
    onToggleMenu,
    onCloseMenu,
}: {
    earnings: EarningsProfile;
    filter: EarningsFilter;
    searchValue: string;
    openMenuId: string | null;
    onFilterChange: (value: EarningsFilter) => void;
    onSearchChange: (value: string) => void;
    onToggleMenu: (value: string) => void;
    onCloseMenu: () => void;
}) {
    const items = earnings.items.filter((item) => {
        const matchedFilter = filter === 'all' ? true : item.status === filter;
        const matchedSearch = item.title.toLowerCase().includes(searchValue.toLowerCase());
        return matchedFilter && matchedSearch;
    });

    return (
        <div className="border-t border-[#d9d9d9] px-4 pb-6 pt-4 sm:px-6">
            <div className="grid gap-4 rounded-[16px] border border-[#ebe7de] bg-[#fffefd] p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.2fr]">
                <OverviewMetric label="Hôm nay" value={earnings.todayRevenue} delta={earnings.todayRevenueDelta} />
                <OverviewMetric label="Tổng bài kiếm tiền" value={earnings.totalMonetizedPosts} delta={earnings.totalMonetizedPostsDelta} tone="red" />
                <OverviewMetric label="Tỷ lệ nhấn link món" value={earnings.linkClickRate} delta={earnings.linkClickRateDelta} tone="orange" />
                <div className="space-y-2 border-t border-[#ece6db] pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
                    <p className="text-[18px] font-bold uppercase text-[#141414]">Tổng doanh thu</p>
                    <p className="text-[28px] font-bold text-[#299537] sm:text-[34px]">{earnings.totalRevenue}</p>
                </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                    {([
                        { key: 'all' as const, label: 'Tất cả' },
                        { key: 'earning' as const, label: 'Đang kiếm tiền' },
                        { key: 'low' as const, label: 'Hiệu quả thấp' },
                        { key: 'high' as const, label: 'Hiệu quả cao' },
                    ]).map((item) => (
                        <button
                            key={item.key}
                            type="button"
                            onClick={() => onFilterChange(item.key)}
                            className={`rounded-[10px] px-4 py-2 text-[13px] font-semibold transition ${
                                filter === item.key
                                    ? 'bg-black text-white'
                                    : 'border border-[#d1cbc1] bg-white text-[#2c2c2c] hover:bg-[#faf9f6]'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <label className="flex h-10 items-center gap-2 rounded-full border border-[#d4cec3] bg-white px-4 text-[#6f6f6f] lg:w-[240px]">
                    <SearchIcon />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Tìm kiếm"
                        className="w-full bg-transparent text-[13px] outline-none placeholder:text-[#9a9a9a]"
                    />
                </label>
            </div>

            <div className="mt-5 space-y-4">
                {items.map((item) => (
                    <EarningsCard
                        key={item.id}
                        item={item}
                        isMenuOpen={openMenuId === item.id}
                        onToggleMenu={() => onToggleMenu(item.id)}
                        onCloseMenu={onCloseMenu}
                    />
                ))}
            </div>
        </div>
    );
}

function WithdrawalHistoryPanel({
    earnings,
    filter,
    searchValue,
    onFilterChange,
    onSearchChange,
}: {
    earnings: EarningsProfile;
    filter: WithdrawalFilter;
    searchValue: string;
    onFilterChange: (value: WithdrawalFilter) => void;
    onSearchChange: (value: string) => void;
}) {
    const rows = earnings.withdrawalHistory.filter((item) => {
        const matchedFilter = filter === 'all' ? true : item.status === filter;
        const matchedSearch = item.method.toLowerCase().includes(searchValue.toLowerCase());
        return matchedFilter && matchedSearch;
    });

    return (
        <div className="border-t border-[#d9d9d9] px-4 pb-6 pt-4 sm:px-6">
            <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[14px] bg-[linear-gradient(135deg,#f7fff4_0%,#f4fbf8_100%)] px-4 py-4">
                    <p className="text-[20px] font-bold text-[#37956e]">{earnings.withdrawSummary.availableBalance}</p>
                    <p className="mt-1 text-[13px] text-[#6b6b6b]">Số dư khả dụng</p>
                </div>
                <div className="rounded-[14px] bg-[linear-gradient(135deg,#f4f6ff_0%,#f8fbff_100%)] px-4 py-4">
                    <p className="text-[20px] font-bold text-[#6f768f]">{earnings.withdrawSummary.processingAmount}</p>
                    <p className="mt-1 text-[13px] text-[#6b6b6b]">Đang xử lý</p>
                </div>
                <div className="rounded-[14px] bg-[linear-gradient(135deg,#f7fff4_0%,#f4fbf8_100%)] px-4 py-4">
                    <p className="text-[20px] font-bold text-[#37956e]">{earnings.withdrawSummary.totalWithdrawn}</p>
                    <p className="mt-1 text-[13px] text-[#6b6b6b]">Tổng đã rút</p>
                </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                    {([
                        { key: 'all' as const, label: 'Tất cả' },
                        { key: 'completed' as const, label: 'Đã hoàn thành' },
                        { key: 'processing' as const, label: 'Đang xử lý' },
                        { key: 'rejected' as const, label: 'Bị từ chối' },
                    ]).map((item) => (
                        <button
                            key={item.key}
                            type="button"
                            onClick={() => onFilterChange(item.key)}
                            className={`rounded-[10px] px-4 py-2 text-[13px] font-semibold transition ${
                                filter === item.key
                                    ? 'bg-[#303030] text-white'
                                    : 'border border-[#d1cbc1] bg-white text-[#2c2c2c] hover:bg-[#faf9f6]'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <label className="flex h-10 items-center gap-2 rounded-full border border-[#d4cec3] bg-white px-4 text-[#6f6f6f] lg:w-[320px]">
                    <SearchIcon />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Tìm kiếm theo số tài khoản..."
                        className="w-full bg-transparent text-[13px] outline-none placeholder:text-[#9a9a9a]"
                    />
                </label>
            </div>

            <div className="mt-5 overflow-hidden rounded-[14px] border border-[#ebe7de]">
                <div className="hidden grid-cols-[1fr_1fr_1.3fr_1fr] border-b border-[#ebe7de] bg-[#fcfcfb] px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.02em] text-[#777] md:grid">
                    <span>Ngày</span>
                    <span>Số tiền</span>
                    <span>Phương thức</span>
                    <span className="text-right">Trạng thái</span>
                </div>

                {rows.map((item) => (
                    <div key={item.id} className="grid gap-2 border-b border-[#f0ece5] px-4 py-4 text-[13px] text-[#2d2d2d] last:border-b-0 md:grid-cols-[1fr_1fr_1.3fr_1fr] md:items-center">
                        <span className="text-[#717171]">{item.date}</span>
                        <span className="font-semibold">{item.amount}</span>
                        <span>{item.method}</span>
                        <div className="md:flex md:justify-end">
                            <WithdrawalStatusBadge status={item.status} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#f0f0f3] text-[#737373]">‹</button>
                <span className="flex h-8 min-w-[34px] items-center justify-center rounded-[8px] border border-[#d9d5ce] bg-white text-[13px] font-semibold text-[#2f2f2f]">1</span>
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#f0f0f3] text-[#737373]">›</button>
            </div>
        </div>
    );
}

export default function ProfilePageClient({
    profile,
    editHref = '/user/profile/edit',
    editLabel = 'Chỉnh sửa trang cá nhân',
}: {
    profile: UserProfile;
    editHref?: string;
    editLabel?: string;
}) {
    const hasEarnings = Boolean(profile.isMonetized && profile.earnings);
    const earnings = profile.earnings;

    const [activeTab, setActiveTab] = useState<ProfileTab>(hasEarnings ? 'revenue' : 'posts');
    const [sortMode, setSortMode] = useState<SortMode>('latest');
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
    const [earningsFilter, setEarningsFilter] = useState<EarningsFilter>('all');
    const [withdrawalFilter, setWithdrawalFilter] = useState<WithdrawalFilter>('all');
    const [earningsSearch, setEarningsSearch] = useState('');
    const [withdrawalSearch, setWithdrawalSearch] = useState('');
    const [openEarningMenuId, setOpenEarningMenuId] = useState<string | null>(null);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isWithdrawSuccessOpen, setIsWithdrawSuccessOpen] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('1,000,000');
    const [selectedWithdrawAccountId, setSelectedWithdrawAccountId] = useState(profile.earnings?.withdrawalAccounts[0]?.id ?? '');
    const [posts, setPosts] = useState(profile.posts);
    const [reposts, setReposts] = useState(profile.reposts ?? []);
    const [actionMessage, setActionMessage] = useState<string | null>(null);
    const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    const visiblePosts = sortMode === 'latest' ? posts : [...posts].reverse();
    const visibleReposts = sortMode === 'latest' ? reposts : [...reposts].reverse();
    const visibleVideos = profile.videos;

    const tabs = [
        { key: 'posts' as const, label: 'Bài viết', icon: <GridIcon /> },
        { key: 'videos' as const, label: 'Video', icon: <VideoIcon /> },
        { key: 'reposts' as const, label: 'Bài đăng lại', icon: <RepostIcon /> },
        ...(hasEarnings
            ? [
                  { key: 'revenue' as const, label: 'Doanh thu', icon: <WalletIcon /> },
                  { key: 'withdrawals' as const, label: 'Lịch sử rút tiền', icon: <HistoryIcon /> },
              ]
            : []),
    ];

    const showSortControls = activeTab === 'posts' || activeTab === 'videos' || activeTab === 'reposts';

    const handleWithdrawConfirm = () => {
        setIsWithdrawModalOpen(false);
        setIsWithdrawSuccessOpen(true);
    };

    const handleOpenWithdrawalHistory = () => {
        setIsWithdrawSuccessOpen(false);
        setActiveTab('withdrawals');
    };

    const patchPostMetric = (
        postId: number,
        field: 'likes' | 'comments' | 'shares',
        nextValue?: number,
        delta = 0,
    ) => {
        setPosts((current) =>
            current.map((post) => {
                if (Number(post.id) !== postId) return post;
                const currentValue = Number.parseInt(String(post[field] ?? '0'), 10) || 0;
                const resolved =
                    Number.isFinite(nextValue as number) && nextValue != null
                        ? Math.max(0, Number(nextValue))
                        : Math.max(0, currentValue + delta);
                return { ...post, [field]: String(resolved) };
            }),
        );
    };

    return (
        <div className="bg-[#f3f3f1] px-4 py-7 sm:px-6 lg:py-8">
            <section className="mx-auto w-full max-w-[820px] overflow-hidden rounded-[18px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)] xl:max-w-[880px]">
                <div className="px-4 pb-3 pt-5 sm:px-6">
                    {actionMessage ? (
                        <div className="mb-3 rounded-[10px] bg-[#eaf8eb] px-4 py-3 text-sm text-[#285e19]">
                            {actionMessage}
                        </div>
                    ) : null}
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
                        <div className="mx-auto flex h-[132px] w-[132px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f6f1ca] sm:mx-0">
                            <img src={profile.avatar} alt={profile.name} className="h-[132px] w-[132px] object-cover" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0">
                                        <h1 className="text-[20px] font-bold leading-none text-black sm:text-[22px]">{profile.name}</h1>
                                        <p className="mt-3 text-[14px] text-[#535353]">{profile.handle}</p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        {profile.isTopReviewer ? (
                                            <Badge tone="yellow">
                                                <span className="text-[#f5b400]">★</span>
                                                <span>Top 10 Reviewer</span>
                                            </Badge>
                                        ) : null}
                                        <Badge tone="pink">
                                            <span>Độ uy tín</span>
                                            <span className="text-[#f50b0b]">{profile.trustScore}</span>
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[14px] text-[#222]">
                                    <span><strong className="font-semibold">{profile.postsCount}</strong> bài viết</span>
                                    <span><strong className="font-semibold">{profile.followers}</strong> người theo dõi</span>
                                    <span>Đang theo dõi <strong className="font-semibold">{profile.following}</strong> người dùng</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Link
                                        href={editHref}
                                        id="btn-edit-profile"
                                        className="flex h-10 flex-1 items-center justify-center rounded-[10px] bg-black px-4 text-[14px] font-bold text-white transition hover:bg-[#262626]"
                                    >
                                        {editLabel}
                                    </Link>
                                    {hasEarnings ? (
                                        <button
                                            type="button"
                                            onClick={() => setIsWithdrawModalOpen(true)}
                                            className="flex h-10 flex-1 items-center justify-center rounded-[10px] bg-[#1f89cf] px-4 text-[14px] font-bold text-white transition hover:bg-[#1777b5]"
                                        >
                                            Rút tiền
                                        </button>
                                    ) : null}
                                    <button
                                        type="button"
                                        className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#d9d9d9] text-[#484848] transition hover:bg-[#f7f7f7]"
                                        aria-label="Chia sẻ trang cá nhân"
                                    >
                                        <ShareIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 border-b border-[#d7d7d7] pt-1 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex flex-wrap items-center gap-5">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setActiveTab(tab.key)}
                                    id={`tab-${tab.key}`}
                                    className={`flex items-center gap-1.5 border-b-2 pb-3 text-[14px] font-semibold transition ${
                                        activeTab === tab.key ? 'border-black text-black' : 'border-transparent text-[#7a7a7a]'
                                    }`}
                                >
                                    <span className="text-[13px]">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {showSortControls ? (
                            <div className="mb-3 flex items-center gap-1.5">
                                <button
                                    type="button"
                                    onClick={() => setSortMode('latest')}
                                    className={`rounded-[6px] px-2.5 py-1.5 text-[11px] font-semibold transition ${
                                        sortMode === 'latest' ? 'border border-[#d8d8d8] bg-white text-[#202020]' : 'bg-[#f2f2f2] text-[#8d8d8d]'
                                    }`}
                                >
                                    Mới nhất
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSortMode('oldest')}
                                    className={`rounded-[6px] px-2.5 py-1.5 text-[11px] font-semibold transition ${
                                        sortMode === 'oldest' ? 'border border-[#d8d8d8] bg-white text-[#202020]' : 'bg-[#f2f2f2] text-[#8d8d8d]'
                                    }`}
                                >
                                    Cũ nhất
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>

                {activeTab === 'posts' ? <CreatePostBox profile={profile} onClick={() => setIsCreatePostModalOpen(true)} /> : null}

                {activeTab === 'posts' ? (
                    <div>
                        {visiblePosts.length > 0 ? (
                            visiblePosts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    profile={profile}
                                    onLike={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        void userContentApi
                                            .toggleThichBaiViet(id)
                                            .then((res: unknown) => {
                                                const data = (res ?? {}) as {
                                                    da_tuong_tac?: boolean;
                                                    tong_luot?: number;
                                                };
                                                patchPostMetric(id, 'likes', data.tong_luot);
                                                setActionMessage(
                                                    data.da_tuong_tac
                                                        ? 'Đã thích bài viết'
                                                        : 'Đã bỏ thích bài viết',
                                                );
                                            })
                                            .catch((e) =>
                                                setActionMessage(
                                                    e instanceof Error
                                                        ? e.message
                                                        : 'Không thể thích bài viết',
                                                ),
                                            );
                                    }}
                                    onComment={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        setActiveCommentPostId(id);
                                        setIsCommentModalOpen(true);
                                    }}
                                    onShare={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        if ((post.type ?? 'bai_viet') === 'repost') {
                                            setActionMessage('Không thể chia sẻ lại một bài đăng lại');
                                            return;
                                        }
                                        void userContentApi
                                            .chiaSeBaiViet(id)
                                            .then((res: unknown) => {
                                                const data = (res ?? {}) as {
                                                    tong_luot_chia_se?: number;
                                                };
                                                patchPostMetric(
                                                    id,
                                                    'shares',
                                                    data.tong_luot_chia_se,
                                                );
                                                setActionMessage('Đã chia sẻ bài viết');
                                            })
                                            .catch((e) =>
                                                setActionMessage(
                                                    e instanceof Error
                                                        ? e.message
                                                        : 'Không thể chia sẻ bài viết',
                                                ),
                                            );
                                    }}
                                    onReport={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        const reason = window.prompt(
                                            'Nhập lý do báo cáo bài viết',
                                        );
                                        if (!reason?.trim()) return;
                                        void userContentApi
                                            .baoCaoBaiViet(id, {
                                                loai_vi_pham: 'noi_dung_vi_pham',
                                                noi_dung_bao_cao: reason.trim(),
                                            })
                                            .then(() =>
                                                setActionMessage('Đã gửi báo cáo bài viết'),
                                            )
                                            .catch((e) =>
                                                setActionMessage(
                                                    e instanceof Error
                                                        ? e.message
                                                        : 'Không thể báo cáo bài viết',
                                                ),
                                            );
                                    }}
                                />
                            ))
                        ) : (
                            <div className="border-t border-[#d9d9d9] px-4 py-12 text-center text-[14px] text-[#787878] sm:px-6">
                                Chưa có bài viết nào để hiển thị.
                            </div>
                        )}
                    </div>
                ) : null}

                {activeTab === 'videos' ? (
                    <div className="border-t border-[#d9d9d9] px-4 pb-5 pt-4 sm:px-6">
                        {visibleVideos.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {visibleVideos.map((video) => (
                                    <VideoCard key={video.id} item={video} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-center text-[14px] text-[#787878]">
                                Chưa có video nào để hiển thị.
                            </div>
                        )}
                    </div>
                ) : null}

                {activeTab === 'reposts' ? (
                    <div>
                        {visibleReposts.length > 0 ? (
                            visibleReposts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    profile={profile}
                                    onLike={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        void userContentApi
                                            .toggleThichBaiViet(id)
                                            .then((res: unknown) => {
                                                const data = (res ?? {}) as {
                                                    da_tuong_tac?: boolean;
                                                    tong_luot?: number;
                                                };
                                                setReposts((current) =>
                                                    current.map((item) =>
                                                        Number(item.id) === id
                                                            ? {
                                                                ...item,
                                                                likes: String(data.tong_luot ?? Number(item.likes)),
                                                            }
                                                            : item,
                                                    ),
                                                );
                                                setActionMessage(
                                                    data.da_tuong_tac
                                                        ? 'Đã thích bài viết'
                                                        : 'Đã bỏ thích bài viết',
                                                );
                                            })
                                            .catch((e) =>
                                                setActionMessage(
                                                    e instanceof Error
                                                        ? e.message
                                                        : 'Không thể thích bài viết',
                                                ),
                                            );
                                    }}
                                    onComment={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        setActiveCommentPostId(id);
                                        setIsCommentModalOpen(true);
                                    }}
                                    onShare={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        if ((post.type ?? 'bai_viet') === 'repost') {
                                            setActionMessage('Không thể chia sẻ lại một bài đăng lại');
                                            return;
                                        }
                                        void userContentApi
                                            .chiaSeBaiViet(id)
                                            .then((res: unknown) => {
                                                const data = (res ?? {}) as {
                                                    tong_luot_chia_se?: number;
                                                };
                                                setReposts((current) =>
                                                    current.map((item) =>
                                                        Number(item.id) === id
                                                            ? {
                                                                ...item,
                                                                shares: String(data.tong_luot_chia_se ?? Number(item.shares)),
                                                            }
                                                            : item,
                                                    ),
                                                );
                                                setActionMessage('Đã chia sẻ bài viết');
                                            })
                                            .catch((e) =>
                                                setActionMessage(
                                                    e instanceof Error
                                                        ? e.message
                                                        : 'Không thể chia sẻ bài viết',
                                                ),
                                            );
                                    }}
                                    onReport={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        const reason = window.prompt(
                                            'Nhập lý do báo cáo bài viết',
                                        );
                                        if (!reason?.trim()) return;
                                        void userContentApi
                                            .baoCaoBaiViet(id, {
                                                loai_vi_pham: 'noi_dung_vi_pham',
                                                noi_dung_bao_cao: reason.trim(),
                                            })
                                            .then(() =>
                                                setActionMessage('Đã gửi báo cáo bài viết'),
                                            )
                                            .catch((e) =>
                                                setActionMessage(
                                                    e instanceof Error
                                                        ? e.message
                                                        : 'Không thể báo cáo bài viết',
                                                ),
                                            );
                                    }}
                                />
                            ))
                        ) : (
                            <div className="border-t border-[#d9d9d9] px-4 py-12 text-center text-[14px] text-[#787878] sm:px-6">
                                Chưa có bài đăng lại nào được hiển thị.
                            </div>
                        )}
                    </div>
                ) : null}

                {activeTab === 'revenue' && earnings ? (
                    <EarningsPanel
                        earnings={earnings}
                        filter={earningsFilter}
                        searchValue={earningsSearch}
                        openMenuId={openEarningMenuId}
                        onFilterChange={setEarningsFilter}
                        onSearchChange={setEarningsSearch}
                        onToggleMenu={(value) => setOpenEarningMenuId((current) => current === value ? null : value)}
                        onCloseMenu={() => setOpenEarningMenuId(null)}
                    />
                ) : null}

                {activeTab === 'withdrawals' && earnings ? (
                    <WithdrawalHistoryPanel
                        earnings={earnings}
                        filter={withdrawalFilter}
                        searchValue={withdrawalSearch}
                        onFilterChange={setWithdrawalFilter}
                        onSearchChange={setWithdrawalSearch}
                    />
                ) : null}
            </section>

                {isCreatePostModalOpen ? (
                    <CreatePostModal profile={profile} onClose={() => setIsCreatePostModalOpen(false)} />
                ) : null}

                <CommentModal
                    isOpen={isCommentModalOpen}
                    onClose={() => {
                        setIsCommentModalOpen(false);
                        setActiveCommentPostId(null);
                    }}
                    storeName={profile.name}
                    postId={activeCommentPostId}
                    onCommentPosted={(postId) => {
                        patchPostMetric(postId, 'comments', undefined, 1);
                    }}
                />

            {isWithdrawModalOpen && earnings ? (
                <WithdrawModal
                    accounts={earnings.withdrawalAccounts}
                    summary={earnings.withdrawSummary}
                    amount={withdrawAmount}
                    selectedAccountId={selectedWithdrawAccountId}
                    onAmountChange={setWithdrawAmount}
                    onAccountChange={setSelectedWithdrawAccountId}
                    onConfirm={handleWithdrawConfirm}
                    onClose={() => setIsWithdrawModalOpen(false)}
                />
            ) : null}

            {isWithdrawSuccessOpen ? (
                <WithdrawSuccessModal
                    onClose={() => setIsWithdrawSuccessOpen(false)}
                    onViewHistory={handleOpenWithdrawalHistory}
                />
            ) : null}
        </div>
    );
}
