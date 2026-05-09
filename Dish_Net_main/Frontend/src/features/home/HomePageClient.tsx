'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useAuth } from '@/shared/AuthContext';
import { userContentApi } from '@/shared/userContentApi';
import { userCommerceApi } from '@/shared/userCommerceApi';

import { homeUiAssets } from './assets';
import CommentModal from './CommentModal';
import { mapFeedPosts } from './data';
import type { FeedPost, HomePageData, RankingItem, RankingMode, SpotlightCard } from './types';

const FEED_PAGE_SIZE = 10;

type FeedCategoryFilter = 'tat_ca' | 'bai_viet' | 'video' | 'repost';
type FeedCuisineFilter = 'tat_ca' | 'co_hinh_anh' | 'co_video' | 'chi_van_ban';
type FeedTimeFilter = 'moi_nhat' | 'hom_nay' | 'hom_qua' | 'tuan_nay' | 'thang_nay';

const FEED_CATEGORY_FILTERS: FeedCategoryFilter[] = ['tat_ca', 'bai_viet', 'video', 'repost'];
const FEED_CUISINE_FILTERS: FeedCuisineFilter[] = ['tat_ca', 'co_hinh_anh', 'co_video', 'chi_van_ban'];
const FEED_TIME_FILTERS: FeedTimeFilter[] = ['moi_nhat', 'hom_nay', 'hom_qua', 'tuan_nay', 'thang_nay'];

function parseEnumParam<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
    if (!value) return fallback;
    return (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

const rankingColumnLabels: Record<RankingMode, { name: string; metric: string; popularity: string }> = {
    stores: {
        name: 'Cửa hàng',
        metric: 'Đánh giá / đã bán',
        popularity: 'Độ phổ biến',
    },
    reviewers: {
        name: 'Reviewer',
        metric: 'Bài review',
        popularity: 'Độ phổ biến',
    },
};

function RankingRow({ item }: { item: RankingItem }) {
    return (
        <div className="grid grid-cols-[32px_minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,1fr)] items-center gap-3 border-b border-[#d8ddd6] py-3 text-[13px] text-black last:border-b-0">
            <div className="text-center text-[15px] font-bold whitespace-nowrap">{item.rank}</div>
            <div className="truncate whitespace-nowrap">{item.name}</div>
            <div className="truncate text-center text-[11px] text-[#5e625e] whitespace-nowrap">{item.metric}</div>
            <div className="truncate text-center text-[11px] text-[#5e625e] whitespace-nowrap">{item.popularity}</div>
        </div>
    );
}

function parseVietnameseDate(value: string): Date | null {
    if (!value) return null;
    const fromNative = new Date(value);
    if (!Number.isNaN(fromNative.getTime())) return fromNative;

    const ddmmyyyy = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!ddmmyyyy) return null;
    const day = Number(ddmmyyyy[1]);
    const month = Number(ddmmyyyy[2]) - 1;
    const year = Number(ddmmyyyy[3]);
    const parsed = new Date(year, month, day);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDisplayDate(value: string) {
    const parsed = parseVietnameseDate(value);
    if (!parsed) return '';
    return parsed.toLocaleDateString('vi-VN');
}

function hasVideoMedia(images: string[]) {
    return images.some((url) => /\.(mp4|mov|avi|mkv|webm)(\?|#|$)/i.test(url));
}

function isSameDate(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function isInCurrentWeek(target: Date, now: Date) {
    const day = now.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + mondayOffset);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return target >= startOfWeek && target < endOfWeek;
}

function SidebarStoreCard({
    card,
    onOpenGallery,
    onOpenComment,
    onOpenDetail,
}: {
    card: SpotlightCard;
    onOpenGallery: () => void;
    onOpenComment: () => void;
    onOpenDetail: () => void;
}) {
    return (
        <article
            onClick={onOpenDetail}
            className="cursor-pointer overflow-hidden rounded-[18px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        >
            <img src={card.coverImage} alt={card.title} className="h-40 w-full object-cover" />
            <div className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-base font-semibold text-black">{card.title}</h3>
                        <p className="mt-1 text-xs text-[#5f655f]">{card.address}</p>
                    </div>
                    <img src={homeUiAssets.ratingStars} alt="Sao đánh giá" className="mt-1 h-5 w-20 object-contain" />
                </div>

                <div className="flex items-center gap-3 border-y border-[#d8ddd6] py-3">
                    <img src={card.reviewerAvatar} alt="Người dùng" className="h-10 w-10 rounded-full object-cover" />
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-black">{card.area}</p>
                        <p className="line-clamp-2 text-xs text-[#5f655f]">{card.excerpt}</p>
                        <p className="mt-1 line-clamp-1 text-xs text-[#285e19]">{card.dishName}</p>
                    </div>
                </div>
                <div className="rounded-[10px] bg-[#f7faf6] px-3 py-2 text-sm">
                    <p className="font-semibold text-[#e65b00]">{card.discountedPrice ?? 'Đang cập nhật giá'}</p>
                    <p className="text-xs text-[#7b7b7b] line-through">{card.originalPrice ?? ''}</p>
                    <p className="text-xs font-medium text-[#2f8f22]">{card.discountText ?? ''}</p>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                onOpenGallery();
                            }}
                            className="inline-flex items-center gap-2 rounded-full bg-[#f6faf4] px-4 py-2 text-sm font-semibold text-[#285e19] transition hover:bg-[#ebf5e8]"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 7a2 2 0 0 1 2-2h3l1.5 2H18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" />
                                <circle cx="12" cy="13" r="3" />
                            </svg>
                            Ảnh
                        </button>
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                onOpenComment();
                            }}
                            className="inline-flex items-center gap-2 rounded-full bg-[#fff3ea] px-4 py-2 text-sm font-semibold text-[#d56a1f] transition hover:bg-[#ffe8d8]"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            Bình luận
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

function GalleryModal({
    isOpen,
    onClose,
    card,
    onOrder,
}: {
    isOpen: boolean;
    onClose: () => void;
    card: SpotlightCard | null;
    onOrder: () => void;
}) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    if (!isOpen || !card) return null;

    const galleryImages = card.galleryImages?.length ? card.galleryImages : [card.coverImage];
    const galleryTabs = [
        { label: 'Tất cả 582', active: true },
        { label: 'Video' },
        { label: 'Chuyên nghiệp' },
        { label: 'Món ăn 335' },
        { label: 'Không gian 39' },
        { label: 'Tổng hợp 31' },
        { label: 'Thực đơn 177' },
    ];

    return (
        <div className="fixed inset-0 z-[65] flex items-center justify-center bg-black/55 px-4 py-6" onClick={onClose}>
            <div
                className="relative flex h-[min(82vh,760px)] w-full max-w-[1120px] flex-col overflow-hidden rounded-[20px] bg-white px-8 pb-6 pt-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-3 z-20 rounded-full bg-white/95 px-2 text-[40px] leading-none text-black transition hover:opacity-60"
                    aria-label="Đóng thư viện ảnh"
                >
                    ×
                </button>

                <div className="flex items-start justify-between gap-6">
                    <div>
                        <h2 className="text-[34px] font-bold text-[#1f1f1f]">{card.title}</h2>
                        <p className="mt-3 text-[16px] text-[#666b66]">{card.address}</p>
                    </div>

                    <button
                        type="button"
                        onClick={onOrder}
                        className="mr-12 rounded-full border border-[#3ca53b] bg-[#e6f3e1] px-8 py-3 text-[20px] font-bold text-[#2a6b1d] transition hover:bg-[#d9eed3]"
                    >
                        Đặt món
                    </button>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-0 overflow-hidden rounded-[4px] bg-[#ededeb]">
                    {galleryTabs.map((tab) => (
                        <button
                            key={tab.label}
                            type="button"
                            className={`border-b-2 px-6 py-4 text-[18px] transition ${
                                tab.active
                                    ? 'border-[#ff4d4f] bg-white text-[#ff3c30]'
                                    : 'border-transparent text-[#414141] hover:bg-white/70'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-2">
                    <div className="grid grid-cols-5 gap-4">
                        {galleryImages.map((image, index) => (
                            <img
                                key={`${card.id}-gallery-${index}`}
                                src={image}
                                alt={`${card.title} ${index + 1}`}
                                className="h-[220px] w-full cursor-zoom-in rounded-[8px] object-cover"
                                onClick={() => setPreviewImage(image)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {previewImage ? (
                <div
                    className="fixed inset-0 z-[66] flex items-center justify-center bg-black/80 px-4 py-6"
                    onClick={() => setPreviewImage(null)}
                >
                    <button
                        type="button"
                        onClick={() => setPreviewImage(null)}
                        className="absolute right-6 top-4 text-[42px] leading-none text-white"
                        aria-label="Đóng xem ảnh"
                    >
                        ×
                    </button>
                    <img
                        src={previewImage}
                        alt="Xem trước ảnh"
                        className="max-h-[88vh] max-w-[92vw] rounded-[10px] object-contain"
                        onClick={(event) => event.stopPropagation()}
                    />
                </div>
            ) : null}
        </div>
    );
}

function FeedPostCard({
    post,
    onComment,
    onOrder,
    onFollow,
    onLike,
    onShare,
    onReport,
    onOpenDetail,
    onOpenAuthorProfile,
}: {
    post: FeedPost;
    onComment: () => void;
    onOrder: () => void;
    onFollow: () => void;
    onLike: () => void;
    onShare: () => void;
    onReport: () => void;
    onOpenDetail: () => void;
    onOpenAuthorProfile: () => void;
}) {
    const isRepost = post.type === 'repost';

    return (
        <article
            onClick={onOpenDetail}
            className="cursor-pointer rounded-[18px] bg-white p-6 shadow-[0_10px_36px_rgba(0,0,0,0.08)]"
        >
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            onOpenAuthorProfile();
                        }}
                        className="rounded-full"
                        aria-label={`Xem trang cá nhân ${post.author}`}
                    >
                        <img src={post.authorAvatar} alt={post.author} className="h-16 w-16 rounded-full object-cover" />
                    </button>
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onOpenAuthorProfile();
                                }}
                                className="text-left text-[22px] font-bold text-black hover:underline"
                            >
                                {post.author}
                            </button>
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#faeacd] px-4 py-1 text-xs font-bold text-black">
                                <img src={homeUiAssets.starIcon} alt="Top reviewer" className="h-4 w-4 object-contain" />
                                TOP REVIEWER
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-[#727672]">{formatDisplayDate(post.date)}</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {post.rating ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#f7ead0] px-4 py-2 text-sm font-bold text-[#f59e0b]">
                            <img src={homeUiAssets.starIcon} alt="Điểm số" className="h-4 w-4 object-contain" />
                            {post.rating}
                        </span>
                    ) : null}
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            onFollow();
                        }}
                        className={`rounded-full px-6 py-2 text-sm font-bold transition ${
                            post.followLabel === 'Đang theo dõi'
                                ? 'border border-[#258f22] bg-[#e8f4e7] text-[#1f771d] hover:bg-[#dcf0db]'
                                : 'bg-[#258f22] text-white hover:bg-[#1f771d]'
                        }`}
                    >
                        {post.followLabel}
                    </button>
                </div>
            </div>

            <div className="my-6 h-px bg-[#d9ded7]" />

            {isRepost ? (
                <div className="space-y-4">
                    <div className="rounded-[16px] border border-dashed border-[#dfe6d8] bg-[#f8fbf7] px-4 py-4">
                        <p className="text-[17px] font-semibold leading-8 text-[#285e19]">{post.review}</p>
                        {post.sharedPost ? (
                            <div className="mt-4 rounded-[14px] bg-white px-4 py-4 shadow-[0_6px_18px_rgba(0,0,0,0.05)]">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-semibold text-black">{post.sharedPost.author}</p>
                                    <p className="text-xs text-[#7a7a7a]">{formatDisplayDate(post.sharedPost.date)}</p>
                                </div>
                                <p className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-[#404040]">{post.sharedPost.content}</p>
                                {post.sharedPost.images.length > 0 ? (
                                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                                        {post.sharedPost.images.map((image, index) => (
                                            <img
                                                key={`${post.id}-shared-image-${index}`}
                                                src={image}
                                                alt={`Ảnh bài viết gốc ${index + 1}`}
                                                className="h-52 w-full rounded-[14px] object-cover"
                                            />
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : (
                <>
                    <p className="whitespace-pre-wrap text-[17px] leading-8 text-black">{post.review}</p>

                    {post.images.length > 0 ? (
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {post.images.map((image, index) => (
                                <img
                                    key={`${post.id}-image-${index}`}
                                    src={image}
                                    alt={`Ảnh bài viết ${index + 1}`}
                                    className="h-60 w-full rounded-[18px] object-cover"
                                />
                            ))}
                        </div>
                    ) : null}

                    {post.dishLink ? (
                        <div className="mt-4 rounded-[12px] border border-[#dbead5] bg-[#f5fbf2] px-4 py-3">
                            <p className="text-sm font-semibold text-[#2a6b1d]">Link món</p>
                            <p className="mt-1 line-clamp-1 text-sm text-[#285e19]">{post.dishLink}</p>
                        </div>
                    ) : null}
                </>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
                {post.tags.map((tag, index) => (
                    <span
                        key={tag}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${index === 1
                            ? 'bg-[#fad3cd] text-[#f50b0b]'
                            : 'bg-[#faeacd] text-[#f59e0b]'
                            }`}
                    >
                        <img src={homeUiAssets.tagIcon} alt="" className="h-4 w-4 object-contain" />
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-6 border-t border-[#d9ded7] pt-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex flex-nowrap items-center gap-6 overflow-x-auto text-sm font-bold text-[#6d6969]">
                    <button onClick={(event) => { event.stopPropagation(); onLike(); }} className="inline-flex items-center gap-2 transition hover:text-[#285e19]">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className={`h-8 w-8 transition-colors ${
                                post.isLiked ? 'text-[#e53935]' : 'text-[#9ca3af]'
                            }`}
                        >
                            <path
                                fill="currentColor"
                                d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.07 6.07 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"
                            />
                        </svg>
                        <span className={post.isLiked ? 'text-[#d63c3c]' : ''}>
                            {post.isLiked ? 'Đã thích' : 'Yêu thích'} · {post.likeCount}
                        </span>
                    </button>
                    <button onClick={(event) => { event.stopPropagation(); onComment(); }} className="inline-flex items-center gap-2 transition hover:text-[#285e19]">
                        <img src={homeUiAssets.commentIcon} alt="" className="h-8 w-8 object-contain" />
                        Bình luận · {post.commentCount}
                    </button>
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            if (isRepost) return;
                            onShare();
                        }}
                        disabled={isRepost}
                        className={`inline-flex items-center gap-2 transition ${isRepost ? 'cursor-not-allowed text-[#b6b6b6]' : 'hover:text-[#285e19]'}`}
                    >
                        Chia sẻ · {post.shareCount}
                    </button>
                    <button onClick={(event) => { event.stopPropagation(); onReport(); }} className="inline-flex items-center gap-2 transition hover:text-[#c62828]">
                        Báo cáo
                    </button>
                    </div>

                    <div className="shrink-0">
                        <button
                            onClick={(event) => {
                                event.stopPropagation();
                                onOrder();
                            }}
                            className="rounded-full border border-[#258f22] bg-[#dcebdc] px-6 py-2 text-sm font-bold text-[#285e19] transition hover:bg-[#cae4ca]"
                        >
                            Đặt món
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

type ShareRecipient = {
    idCuocTroChuyen: number;
    idNguoiDung: number;
    tenHienThi: string;
    anhDaiDien: string | null;
};

function SharePostModal({
    isOpen,
    post,
    recipients,
    selectedRecipientIds,
    shareText,
    audience,
    isLoadingRecipients,
    isSubmitting,
    onClose,
    onToggleRecipient,
    onChangeText,
    onChangeAudience,
    onShareNow,
    onSendMessage,
}: {
    isOpen: boolean;
    post: FeedPost | null;
    recipients: ShareRecipient[];
    selectedRecipientIds: number[];
    shareText: string;
    audience: 'cong_khai' | 'ban_be';
    isLoadingRecipients: boolean;
    isSubmitting: boolean;
    onClose: () => void;
    onToggleRecipient: (id: number) => void;
    onChangeText: (value: string) => void;
    onChangeAudience: (value: 'cong_khai' | 'ban_be') => void;
    onShareNow: () => void;
    onSendMessage: () => void;
}) {
    if (!isOpen || !post) return null;

    return (
        <div className="fixed inset-0 z-[85] flex items-center justify-center bg-black/55 px-4 py-6" onClick={onClose}>
            <div
                className="w-full max-w-[680px] overflow-hidden rounded-[20px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.25)]"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-[#e6e8e5] px-6 py-4">
                    <h3 className="text-[30px] font-bold text-black">Chia sẻ</h3>
                    <button type="button" onClick={onClose} className="text-[36px] leading-none text-[#666]">×</button>
                </div>

                <div className="space-y-4 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-[#4b5563]">Chế độ chia sẻ:</span>
                        <select
                            value={audience}
                            onChange={(event) => onChangeAudience(event.target.value === 'ban_be' ? 'ban_be' : 'cong_khai')}
                            className="rounded-[10px] border border-[#d7ddd7] bg-white px-3 py-2 text-sm font-semibold text-[#1f2937] outline-none transition focus:border-[#2f8f22]"
                        >
                            <option value="cong_khai">Công khai</option>
                            <option value="ban_be">Bạn bè</option>
                        </select>
                    </div>
                    <p className="text-sm text-[#5f655f] line-clamp-2">{post.review || 'Bài viết từ bảng tin DishNet'}</p>
                    <textarea
                        value={shareText}
                        onChange={(event) => onChangeText(event.target.value)}
                        placeholder="Hãy nói gì đó về nội dung này..."
                        className="h-24 w-full resize-none rounded-[12px] border border-[#d7ddd7] px-4 py-3 text-sm outline-none transition focus:border-[#2f8f22]"
                    />
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onShareNow}
                            disabled={isSubmitting}
                            className="rounded-[10px] bg-[#1f6feb] px-6 py-2 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Chia sẻ ngay
                        </button>
                    </div>
                </div>

                <div className="border-t border-[#e6e8e5] px-6 py-4">
                    <p className="mb-3 text-lg font-semibold text-black">Gửi tới</p>
                    {isLoadingRecipients ? (
                        <p className="text-sm text-[#666]">Đang tải danh sách người nhận...</p>
                    ) : recipients.length === 0 ? (
                        <p className="text-sm text-[#666]">Chưa có cuộc trò chuyện nào để gửi.</p>
                    ) : (
                        <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
                            {recipients.map((recipient) => {
                                const isSelected = selectedRecipientIds.includes(recipient.idNguoiDung);
                                return (
                                    <button
                                        type="button"
                                        key={recipient.idNguoiDung}
                                        onClick={() => onToggleRecipient(recipient.idNguoiDung)}
                                        className={`flex w-full items-center gap-3 rounded-[12px] border px-3 py-2 text-left transition ${isSelected ? 'border-[#2f8f22] bg-[#eef7eb]' : 'border-[#e2e5e0] bg-white hover:bg-[#f8faf7]'}`}
                                    >
                                        <img
                                            src={recipient.anhDaiDien || 'https://i.pravatar.cc/120'}
                                            alt={recipient.tenHienThi}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                        <span className="flex-1 truncate text-sm font-semibold text-black">{recipient.tenHienThi}</span>
                                        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold ${isSelected ? 'border-[#2f8f22] bg-[#2f8f22] text-white' : 'border-[#cfd5cf] text-transparent'}`}>
                                            ✓
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            onClick={onSendMessage}
                            disabled={isSubmitting || selectedRecipientIds.length === 0}
                            className="rounded-[10px] bg-[#258f22] px-6 py-2 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Gửi qua tin nhắn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const REPORT_REASONS: Array<{ value: string; label: string; detail?: string }> = [
    { value: 'duoi_18_tuoi', label: 'Vấn đề liên quan đến người dưới 18 tuổi' },
    { value: 'bat_nat_quay_roi', label: 'Bắt nạt, quấy rối hoặc lăng mạ/lạm dụng/ngược đãi' },
    { value: 'tu_tu_tu_hai', label: 'Tự tử hoặc tự hại bản thân' },
    { value: 'bao_luc_thu_ghet', label: 'Nội dung mang tính bạo lực, thù ghét hoặc gây phiền toái' },
    { value: 'hang_hoa_han_che', label: 'Bán hoặc quảng bá mặt hàng bị hạn chế' },
    { value: 'noi_dung_nguoi_lon', label: 'Nội dung người lớn' },
    { value: 'thong_tin_sai_su_that', label: 'Thông tin sai sự thật, lừa đảo hoặc gian lận' },
    { value: 'so_huu_tri_tue', label: 'Quyền sở hữu trí tuệ' },
    { value: 'khong_muon_xem', label: 'Tôi không muốn xem nội dung này' },
];

function ReportPostModal({
    isOpen,
    isSubmitting,
    onClose,
    onPickReason,
}: {
    isOpen: boolean;
    isSubmitting: boolean;
    onClose: () => void;
    onPickReason: (reason: { value: string; label: string }) => void;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/50 px-4 py-6" onClick={onClose}>
            <div
                className="w-full max-w-[760px] overflow-hidden rounded-[18px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.24)]"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
                    <h3 className="text-[42px] font-bold text-black">Báo cáo</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef1f5] text-[34px] leading-none text-[#59606b]"
                        aria-label="Đóng popup báo cáo"
                    >
                        ×
                    </button>
                </div>

                <div className="border-b border-[#eceff1] px-6 py-5">
                    <p className="text-[18px] font-semibold text-[#111827]">Tại sao bạn báo cáo bài viết này?</p>
                    <p className="mt-2 text-[15px] leading-7 text-[#6b7280]">
                        Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy tìm ngay sự giúp đỡ trước khi báo cáo với DishNet.
                    </p>
                </div>

                <div className="max-h-[56vh] overflow-y-auto px-2 py-2">
                    {REPORT_REASONS.map((reason) => (
                        <button
                            key={reason.value}
                            type="button"
                            onClick={() => onPickReason(reason)}
                            disabled={isSubmitting}
                            className="w-full border-b border-[#f1f3f5] px-5 py-4 text-left transition hover:bg-[#f8fafc] disabled:cursor-not-allowed"
                        >
                            <p className="text-[17px] font-semibold text-[#111827]">{reason.label}</p>
                            {reason.detail ? <p className="mt-1 text-[14px] text-[#6b7280]">{reason.detail}</p> : null}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ReportDoneModal({
    isOpen,
    authorName,
    onClose,
}: {
    isOpen: boolean;
    authorName: string;
    onClose: () => void;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[96] flex items-center justify-center bg-black/50 px-4 py-6" onClick={onClose}>
            <div
                className="w-full max-w-[660px] overflow-hidden rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="px-6 py-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f5e9] text-[#2f8f22]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="m5 12 4 4 10-10" />
                        </svg>
                    </div>
                    <p className="text-[34px] font-bold leading-tight text-[#111827]">Cảm ơn bạn đã cho chúng tôi biết.</p>
                    <p className="mx-auto mt-2 max-w-[560px] text-[15px] leading-7 text-[#6b7280]">
                        Chúng tôi sử dụng ý kiến đóng góp của bạn để giúp hệ thống biết được khi có nội dung vi phạm.
                    </p>
                </div>

                <div className="border-t border-[#eceff1] px-6 py-5">
                    <p className="mb-4 text-[20px] font-bold text-[#111827]">Các bước khác mà bạn có thể thực hiện</p>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 rounded-[10px] px-1 py-1">
                            <span className="mt-1 text-[#111827]">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M4 20c1.8-3.1 4.6-4.6 8-4.6s6.2 1.5 8 4.6" />
                                </svg>
                            </span>
                            <div>
                                <p className="text-[18px] font-semibold text-[#111827]">Chặn {authorName}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-[10px] px-1 py-1">
                            <span className="mt-1 text-[#111827]">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 9v4" />
                                    <path d="M12 17h.01" />
                                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.72 3h16.92a2 2 0 0 0 1.72-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                </svg>
                            </span>
                            <div>
                                <p className="text-[18px] font-semibold text-[#111827]">Báo cáo với quản trị viên</p>
                                <p className="text-[14px] text-[#6b7280]">Thông báo cho quản trị viên về bài viết này.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-[10px] px-1 py-1">
                            <span className="mt-1 text-[#111827]">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                            </span>
                            <div>
                                <p className="text-[18px] font-semibold text-[#111827]">Tùy chọn nội dung</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#eceff1] px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-[10px] bg-[#1f6feb] py-2.5 text-[22px] font-bold text-white transition hover:opacity-90"
                    >
                        Xong
                    </button>
                </div>
            </div>
        </div>
    );
}

function PostDetailModal({
    postId,
    onClose,
}: {
    postId: number | null;
    onClose: () => void;
}) {
    const [error, setError] = useState<string | null>(null);
    const [detail, setDetail] = useState<{
        id: number;
        loai_bai_viet?: string;
        noi_dung: string;
        so_sao: number | null;
        ngay_dang: string;
        thong_tin_nguoi_dang: { ten_hien_thi: string; anh_dai_dien: string | null };
        cua_hang: { ten_cua_hang: string } | null;
        tep_dinh_kem: string[];
        bai_viet_goc?: {
            id: number;
            noi_dung: string;
            ngay_dang: string;
            thong_tin_nguoi_dang: { ten_hien_thi: string; anh_dai_dien: string | null };
            tep_dinh_kem: string[];
        } | null;
    } | null>(null);

    useEffect(() => {
        if (!postId) return;
        let active = true;
        userContentApi
            .layChiTietBaiViet(postId)
            .then((payload: unknown) => {
                if (!active) return;
                const data = (payload ?? {}) as Record<string, unknown>;
                const authorInfo = (data.thong_tin_nguoi_dang ?? {}) as Record<string, unknown>;
                const storeInfo = data.cua_hang as Record<string, unknown> | null;
                const extractMediaUrls = (input: unknown): string[] => {
                    if (!Array.isArray(input)) return [];
                    return input
                        .map((item) => {
                            if (typeof item === 'string') return item;
                            if (item && typeof item === 'object' && 'url' in item) {
                                const value = (item as { url?: unknown }).url;
                                return typeof value === 'string' ? value : '';
                            }
                            return '';
                        })
                        .filter(Boolean);
                };
                setDetail({
                    id: Number(data.id ?? postId),
                    loai_bai_viet: String(data.loai_bai_viet ?? ''),
                    noi_dung: String(data.noi_dung ?? ''),
                    so_sao: data.so_sao != null ? Number(data.so_sao) : null,
                    ngay_dang: String(data.ngay_dang ?? ''),
                    thong_tin_nguoi_dang: {
                        ten_hien_thi: String(authorInfo.ten_hien_thi ?? 'Người dùng'),
                        anh_dai_dien: (authorInfo.anh_dai_dien as string | null) ?? null,
                    },
                    cua_hang: storeInfo
                        ? { ten_cua_hang: String(storeInfo.ten_cua_hang ?? 'Cửa hàng') }
                        : null,
                    tep_dinh_kem: extractMediaUrls(data.tep_dinh_kem),
                    bai_viet_goc: data.bai_viet_goc
                        ? {
                            id: Number((data.bai_viet_goc as Record<string, unknown>).id ?? 0),
                            noi_dung: String((data.bai_viet_goc as Record<string, unknown>).noi_dung ?? ''),
                            ngay_dang: String((data.bai_viet_goc as Record<string, unknown>).ngay_dang ?? ''),
                            thong_tin_nguoi_dang: {
                                ten_hien_thi: String(((data.bai_viet_goc as Record<string, unknown>).thong_tin_nguoi_dang as Record<string, unknown> | undefined)?.ten_hien_thi ?? 'Người dùng'),
                                anh_dai_dien: ((((data.bai_viet_goc as Record<string, unknown>).thong_tin_nguoi_dang as Record<string, unknown> | undefined)?.anh_dai_dien as string | null) ?? null),
                            },
                            tep_dinh_kem: extractMediaUrls((data.bai_viet_goc as Record<string, unknown>).tep_dinh_kem),
                        }
                        : null,
                });
                setError(null);
            })
            .catch((e) => {
                if (!active) return;
                setError(e instanceof Error ? e.message : 'Không tải được chi tiết bài viết');
                setDetail(null);
            });
        return () => {
            active = false;
        };
    }, [postId]);

    if (!postId) return null;
    const loading = detail == null && !error;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-4 py-6" onClick={onClose}>
            <div className="w-full max-w-[980px] rounded-[20px] bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.24)]" onClick={(event) => event.stopPropagation()}>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-[24px] font-bold text-black">Chi tiết bài viết</h2>
                    <button type="button" onClick={onClose} className="text-[40px] leading-none text-[#444]">×</button>
                </div>
                {loading ? <p className="text-[#666]">Đang tải chi tiết...</p> : null}
                {error ? <p className="text-red-500">{error}</p> : null}
                {detail ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <img src={detail.thong_tin_nguoi_dang.anh_dai_dien || 'https://i.pravatar.cc/120'} alt={detail.thong_tin_nguoi_dang.ten_hien_thi} className="h-12 w-12 rounded-full object-cover" />
                            <div>
                                <p className="font-semibold text-black">{detail.thong_tin_nguoi_dang.ten_hien_thi}</p>
                                <p className="text-sm text-[#666]">{detail.ngay_dang ? new Date(detail.ngay_dang).toLocaleString('vi-VN') : ''}</p>
                            </div>
                        </div>
                        {detail.cua_hang?.ten_cua_hang ? (
                            <p className="text-sm text-[#2f8f22]">Cửa hàng: {detail.cua_hang.ten_cua_hang}</p>
                        ) : null}
                        {detail.so_sao != null ? (
                            <p className="text-sm font-semibold text-[#f59e0b]">{Number(detail.so_sao).toFixed(1)} ★</p>
                        ) : null}
                        <p className="whitespace-pre-wrap text-[16px] leading-7 text-[#333]">{detail.noi_dung}</p>
                        {detail.bai_viet_goc ? (
                            <div className="rounded-[14px] border border-dashed border-[#dfe6d8] bg-[#f8fbf7] p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="font-semibold text-[#285e19]">{detail.bai_viet_goc.thong_tin_nguoi_dang.ten_hien_thi}</p>
                                    <p className="text-sm text-[#777]">{detail.bai_viet_goc.ngay_dang ? new Date(detail.bai_viet_goc.ngay_dang).toLocaleString('vi-VN') : ''}</p>
                                </div>
                                <p className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-[#404040]">{detail.bai_viet_goc.noi_dung}</p>
                                {detail.bai_viet_goc.tep_dinh_kem.length > 0 ? (
                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        {detail.bai_viet_goc.tep_dinh_kem.map((image, index) => (
                                            <img key={`${detail.id}-shared-${index}`} src={image} alt={`Ảnh bài viết gốc ${index + 1}`} className="h-56 w-full rounded-[14px] object-cover" />
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                        {detail.tep_dinh_kem.length > 0 ? (
                            <div className="grid gap-3 sm:grid-cols-2">
                                {detail.tep_dinh_kem.map((image, index) => (
                                    <img key={`${detail.id}-${index}`} src={image} alt={`Ảnh bài viết ${index + 1}`} className="h-56 w-full rounded-[14px] object-cover" />
                                ))}
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function DealDetailModal({
    deal,
    onClose,
}: {
    deal: SpotlightCard | null;
    onClose: () => void;
}) {
    if (!deal) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-4 py-6" onClick={onClose}>
            <div className="w-full max-w-[760px] rounded-[20px] bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.24)]" onClick={(event) => event.stopPropagation()}>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-[24px] font-bold text-black">Chi tiết khuyến mãi</h2>
                    <button type="button" onClick={onClose} className="text-[40px] leading-none text-[#444]">×</button>
                </div>
                <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
                    <img src={deal.coverImage} alt={deal.title} className="h-44 w-full rounded-[14px] object-cover" />
                    <div className="space-y-2">
                        <p className="text-lg font-bold text-[#285e19]">{deal.title}</p>
                        <p className="text-[#444]">{deal.excerpt}</p>
                        <p className="text-sm text-[#666]">Mã: {deal.area}</p>
                        <p className="text-sm text-[#666]">Món: {deal.dishName}</p>
                        <p className="text-sm text-[#666]">Giá gốc: {deal.originalPrice ?? 'Đang cập nhật'}</p>
                        <p className="text-base font-semibold text-[#e65b00]">Giá khuyến mãi: {deal.discountedPrice ?? 'Đang cập nhật'}</p>
                        <p className="text-sm font-medium text-[#2f8f22]">{deal.discountText ?? ''}</p>
                        <p className="text-sm text-[#666]">Hạn: {deal.endAt || 'Đang cập nhật'}</p>
                        {deal.storeId ? (
                            <Link href={`/explore/store/${deal.storeId}`} className="inline-flex rounded-full bg-[#285e19] px-5 py-2 text-sm font-semibold text-white">
                                Xem cửa hàng
                            </Link>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function HomePageClient({ data }: { data: HomePageData }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [rankingMode, setRankingMode] = useState<RankingMode>('stores');
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const [commentComposerOpen, setCommentComposerOpen] = useState(false);
    const [activeCommentStore, setActiveCommentStore] = useState('Nét Huế - Hàng Bông');
    const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null);
    const [activeGalleryCard, setActiveGalleryCard] = useState<SpotlightCard | null>(null);
    const [activeDealCard, setActiveDealCard] = useState<SpotlightCard | null>(null);
    const [visibleDealCount, setVisibleDealCount] = useState(3);
    const [activePostDetailId, setActivePostDetailId] = useState<number | null>(null);
    const [feedPosts, setFeedPosts] = useState<FeedPost[]>(data.feedPosts);
    const [feedCurrentPage, setFeedCurrentPage] = useState(() => {
        const page = Number(searchParams.get('page') ?? '1');
        return Number.isFinite(page) && page > 0 ? page : 1;
    });
    const [categoryFilter, setCategoryFilter] = useState<FeedCategoryFilter>(() =>
        parseEnumParam(searchParams.get('category'), FEED_CATEGORY_FILTERS, 'tat_ca'),
    );
    const [cuisineFilter, setCuisineFilter] = useState<FeedCuisineFilter>(() =>
        parseEnumParam(searchParams.get('cuisine'), FEED_CUISINE_FILTERS, 'tat_ca'),
    );
    const [timeFilter, setTimeFilter] = useState<FeedTimeFilter>(() =>
        parseEnumParam(searchParams.get('time'), FEED_TIME_FILTERS, 'moi_nhat'),
    );
    const [activeMenuCategory, setActiveMenuCategory] = useState(data.menu.categories[0]?.id ?? '');
    const [menuQuery, setMenuQuery] = useState('');
    const [actionMessage, setActionMessage] = useState<string | null>(null);
    const [spotlightCards] = useState<SpotlightCard[]>(data.spotlightCards);
    const [menuData] = useState(data.menu);
    const dealSectionRef = useRef<HTMLElement | null>(null);
    const { dangNhap: isAuthenticated, nguoiDung } = useAuth();
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareTargetPost, setShareTargetPost] = useState<FeedPost | null>(null);
    const [shareText, setShareText] = useState('');
    const [shareAudience, setShareAudience] = useState<'cong_khai' | 'ban_be'>('cong_khai');
    const [shareRecipients, setShareRecipients] = useState<ShareRecipient[]>([]);
    const [selectedRecipientIds, setSelectedRecipientIds] = useState<number[]>([]);
    const [isLoadingShareRecipients, setIsLoadingShareRecipients] = useState(false);
    const [isSubmittingShare, setIsSubmittingShare] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isReportDoneModalOpen, setIsReportDoneModalOpen] = useState(false);
    const [isSubmittingReport, setIsSubmittingReport] = useState(false);
    const [reportTargetPost, setReportTargetPost] = useState<FeedPost | null>(null);

    const bumpPostCounter = useCallback(
        (
            id: number,
            field: 'likeCount' | 'commentCount' | 'shareCount',
            nextValue?: number,
            delta = 0,
        ) => {
            setFeedPosts((current) =>
                current.map((post) => {
                    if (Number(post.id) !== id) return post;
                    const fallback = Math.max(0, Number(post[field] ?? 0) + delta);
                    return {
                        ...post,
                        [field]:
                            Number.isFinite(nextValue as number) && nextValue != null
                                ? Math.max(0, Number(nextValue))
                                : fallback,
                    };
                }),
            );
        },
        [],
    );

    const rankingItems = data.rankings[rankingMode];
    const rankingLabels = rankingColumnLabels[rankingMode];
    const normalizedMenuQuery = menuQuery.trim().toLowerCase();
    const menuSearchResults = useMemo(() => {
        if (!normalizedMenuQuery) return [];
        return menuData.items.filter((item) =>
            item.name.toLowerCase().includes(normalizedMenuQuery) ||
            item.note.toLowerCase().includes(normalizedMenuQuery),
        );
    }, [menuData.items, normalizedMenuQuery]);
    const filteredMenuItemsByCategory = useMemo(() => {
        return menuData.items.filter((item) => !activeMenuCategory || item.categoryId === activeMenuCategory);
    }, [activeMenuCategory, menuData.items]);
    const filteredFeedPosts = useMemo(() => {
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);

        const byCategory = feedPosts.filter((post) => {
            if (categoryFilter === 'tat_ca') return true;
            return post.type === categoryFilter;
        });

        const byCuisine = byCategory.filter((post) => {
            if (cuisineFilter === 'tat_ca') return true;
            if (cuisineFilter === 'co_video') return hasVideoMedia(post.images);
            if (cuisineFilter === 'co_hinh_anh') return post.images.length > 0 && !hasVideoMedia(post.images);
            return post.images.length === 0;
        });

        const byTime = byCuisine.filter((post) => {
            if (timeFilter === 'moi_nhat') return true;
            const date = parseVietnameseDate(post.date);
            if (!date) return false;
            if (timeFilter === 'hom_nay') return isSameDate(date, now);
            if (timeFilter === 'hom_qua') return isSameDate(date, yesterday);
            if (timeFilter === 'tuan_nay') return isInCurrentWeek(date, now);
            return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
        });

        return [...byTime].sort((a, b) => {
            const dateA = parseVietnameseDate(a.date)?.getTime() ?? 0;
            const dateB = parseVietnameseDate(b.date)?.getTime() ?? 0;
            return dateB - dateA;
        });
    }, [categoryFilter, cuisineFilter, feedPosts, timeFilter]);
    const totalFeedPages = Math.max(1, Math.ceil(filteredFeedPosts.length / FEED_PAGE_SIZE));
    const currentFeedPage = Math.min(feedCurrentPage, totalFeedPages);
    const paginatedFeedPosts = useMemo(() => {
        const start = (currentFeedPage - 1) * FEED_PAGE_SIZE;
        return filteredFeedPosts.slice(start, start + FEED_PAGE_SIZE);
    }, [currentFeedPage, filteredFeedPosts]);
    const hasMoreDeals = spotlightCards.length > visibleDealCount;

    const closeShareModal = useCallback(() => {
        setIsShareModalOpen(false);
        setShareTargetPost(null);
        setShareText('');
        setShareAudience('cong_khai');
        setSelectedRecipientIds([]);
    }, []);

    const loadShareRecipients = useCallback(async () => {
        setIsLoadingShareRecipients(true);
        try {
            const payload = (await userCommerceApi.layDanhSachTroChuyen({
                trang: 1,
                so_luong: 50,
            })) as { du_lieu?: Array<Record<string, unknown>> };
            const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
            const mapped: ShareRecipient[] = rows
                .map((item) => {
                    const partner = (item.doi_tac as Record<string, unknown> | undefined) ?? {};
                    return {
                        idCuocTroChuyen: Number(item.id_cuoc_tro_chuyen ?? 0),
                        idNguoiDung: Number(partner.id ?? 0),
                        tenHienThi: String(partner.ten_hien_thi ?? 'Người dùng'),
                        anhDaiDien: typeof partner.anh_dai_dien === 'string' ? partner.anh_dai_dien : null,
                    };
                })
                .filter((item) => item.idCuocTroChuyen > 0 && item.idNguoiDung > 0);
            setShareRecipients(mapped);
        } catch {
            setShareRecipients([]);
        } finally {
            setIsLoadingShareRecipients(false);
        }
    }, []);

    const openShareModal = useCallback((post: FeedPost) => {
        setShareTargetPost(post);
        setShareText('');
        setShareAudience('cong_khai');
        setSelectedRecipientIds([]);
        setIsShareModalOpen(true);
        void loadShareRecipients();
    }, [loadShareRecipients]);

    const toggleShareRecipient = useCallback((idNguoiDung: number) => {
        setSelectedRecipientIds((current) =>
            current.includes(idNguoiDung)
                ? current.filter((id) => id !== idNguoiDung)
                : [...current, idNguoiDung],
        );
    }, []);

    const openReportModal = useCallback((post: FeedPost) => {
        setReportTargetPost(post);
        setIsReportDoneModalOpen(false);
        setIsReportModalOpen(true);
    }, []);

    const closeReportModal = useCallback(() => {
        if (isSubmittingReport) return;
        setIsReportModalOpen(false);
        setReportTargetPost(null);
    }, [isSubmittingReport]);

    const closeReportDoneModal = useCallback(() => {
        setIsReportDoneModalOpen(false);
        setReportTargetPost(null);
    }, []);

    useEffect(() => {
        let active = true;
        const syncFeed = async () => {
            try {
                const payload = (await userContentApi.layBangTin({
                    trang: 1,
                    so_luong: 100,
                })) as Record<string, unknown>;
                if (!active) return;
                const latest: FeedPost[] = mapFeedPosts(payload);
                setFeedPosts(latest);
                setFeedCurrentPage(1);
            } catch {
                // keep current UI state if sync fails
            }
        };

        void syncFeed();
        const onFocus = () => {
            void syncFeed();
        };
        window.addEventListener('focus', onFocus);

        return () => {
            active = false;
            window.removeEventListener('focus', onFocus);
        };
    }, [isAuthenticated]);

    useEffect(() => {
        setFeedCurrentPage(1);
    }, [categoryFilter, cuisineFilter, timeFilter]);

    useEffect(() => {
        const urlCategory = parseEnumParam(searchParams.get('category'), FEED_CATEGORY_FILTERS, 'tat_ca');
        const urlCuisine = parseEnumParam(searchParams.get('cuisine'), FEED_CUISINE_FILTERS, 'tat_ca');
        const urlTime = parseEnumParam(searchParams.get('time'), FEED_TIME_FILTERS, 'moi_nhat');
        const urlPageRaw = Number(searchParams.get('page') ?? '1');
        const urlPage = Number.isFinite(urlPageRaw) && urlPageRaw > 0 ? urlPageRaw : 1;

        if (urlCategory !== categoryFilter) setCategoryFilter(urlCategory);
        if (urlCuisine !== cuisineFilter) setCuisineFilter(urlCuisine);
        if (urlTime !== timeFilter) setTimeFilter(urlTime);
        if (urlPage !== feedCurrentPage) setFeedCurrentPage(urlPage);
    }, [searchParams]);

    useEffect(() => {
        const postId = Number(searchParams.get('post_id') ?? 0);
        if (!Number.isFinite(postId) || postId <= 0) return;
        setActivePostDetailId(postId);
    }, [searchParams]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('category', categoryFilter);
        params.set('cuisine', cuisineFilter);
        params.set('time', timeFilter);
        params.set('page', String(currentFeedPage));
        const nextUrl = `${pathname}?${params.toString()}`;
        const currentUrl = `${pathname}?${searchParams.toString()}`;
        if (nextUrl === currentUrl) return;
        router.replace(nextUrl, { scroll: false });
    }, [categoryFilter, cuisineFilter, timeFilter, currentFeedPage, pathname, router, searchParams]);

    const handleShareNow = useCallback(async () => {
        const postId = Number(shareTargetPost?.id ?? 0);
        if (!Number.isFinite(postId) || postId <= 0 || isSubmittingShare) return;
        setIsSubmittingShare(true);
        try {
            const res = (await userContentApi.chiaSeBaiViet(postId, {
                muc_do_hien_thi: shareAudience,
            })) as { tong_luot_chia_se?: number };
            bumpPostCounter(postId, 'shareCount', res?.tong_luot_chia_se);
            setActionMessage('Đã chia sẻ bài viết lên trang cá nhân');
            closeShareModal();
        } catch (error) {
            setActionMessage(error instanceof Error ? error.message : 'Không thể chia sẻ bài viết');
        } finally {
            setIsSubmittingShare(false);
        }
    }, [bumpPostCounter, closeShareModal, isSubmittingShare, shareAudience, shareTargetPost?.id]);

    const handleSendShareViaMessage = useCallback(async () => {
        const postId = Number(shareTargetPost?.id ?? 0);
        if (!Number.isFinite(postId) || postId <= 0 || selectedRecipientIds.length === 0 || isSubmittingShare) return;
        setIsSubmittingShare(true);
        try {
            const origin = typeof window !== 'undefined' ? window.location.origin : '';
            const postLink = `${origin}/?post=${postId}`;
            const prefix = shareText.trim() ? `${shareText.trim()}\n` : '';
            const senderName = nguoiDung?.ten_hien_thi?.trim() || 'Một người dùng';
            const message = `${prefix}${senderName} đã chia sẻ một bài viết với bạn:\n${postLink}`;

            await Promise.all(
                selectedRecipientIds.map(async (idNguoiDung) => {
                    const started = (await userCommerceApi.batDauTroChuyen(idNguoiDung)) as { id_cuoc_tro_chuyen?: number };
                    const idCuocTroChuyen = Number(started?.id_cuoc_tro_chuyen ?? 0);
                    if (!Number.isFinite(idCuocTroChuyen) || idCuocTroChuyen <= 0) return;
                    await userCommerceApi.guiTinNhan(idCuocTroChuyen, message);
                }),
            );
            setActionMessage(`Đã gửi chia sẻ cho ${selectedRecipientIds.length} người`);
            closeShareModal();
        } catch (error) {
            setActionMessage(error instanceof Error ? error.message : 'Không thể gửi chia sẻ qua tin nhắn');
        } finally {
            setIsSubmittingShare(false);
        }
    }, [closeShareModal, isSubmittingShare, nguoiDung?.ten_hien_thi, selectedRecipientIds, shareTargetPost?.id, shareText]);

    const handlePickReportReason = useCallback(async (reason: { value: string; label: string }) => {
        const postId = Number(reportTargetPost?.id ?? 0);
        if (!Number.isFinite(postId) || postId <= 0 || isSubmittingReport) return;
        setIsSubmittingReport(true);
        try {
            await userContentApi.baoCaoBaiViet(postId, {
                loai_vi_pham: reason.value,
                noi_dung_bao_cao: reason.label,
            });
            setIsReportModalOpen(false);
            setIsReportDoneModalOpen(true);
            setActionMessage('Đã gửi báo cáo bài viết');
        } catch (error) {
            setActionMessage(error instanceof Error ? error.message : 'Không thể báo cáo bài viết');
        } finally {
            setIsSubmittingReport(false);
        }
    }, [isSubmittingReport, reportTargetPost?.id]);

    return (
        <>
            <div className="bg-[#fafaf9] pb-14">
                <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
                    {actionMessage ? (
                        <div className="rounded-[10px] bg-[#eaf8eb] px-4 py-3 text-sm text-[#285e19]">{actionMessage}</div>
                    ) : null}
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(360px,0.9fr)]">
                        <article className="relative overflow-hidden rounded-[24px] bg-[#285e19] shadow-[0_18px_50px_rgba(40,94,25,0.18)]">
                            <img src={data.hero.backgroundImage} alt={data.hero.title} className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,52,11,0.82)_0%,rgba(33,92,19,0.28)_55%,rgba(33,92,19,0.1)_100%)]" />
                            <div className="relative grid min-h-[364px] gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                                <div className="max-w-[360px] text-white">
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/75">
                                        {data.hero.eyebrow}
                                    </p>
                                    <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                                        {data.hero.title}
                                    </h1>
                                    <p className="mt-4 text-base leading-7 text-white/85">
                                        {data.hero.description}
                                    </p>
                                    <button
                                        onClick={() => dealSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                                        className="mt-8 inline-flex items-center rounded-full border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/12"
                                    >
                                        {data.hero.ctaLabel}
                                    </button>
                                </div>

                                <div className="justify-self-end rounded-[20px] bg-white/8 p-2 backdrop-blur-sm">
                                    <img
                                        src={data.hero.collageImage}
                                        alt="Bộ sưu tập món ăn"
                                        className="h-[220px] w-full max-w-[420px] rounded-[18px] object-cover"
                                    />
                                </div>
                            </div>
                        </article>

                        <aside className="rounded-[24px] bg-white p-5 shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
                            <div className="flex items-center justify-between gap-4">
                                <h2 className="text-2xl font-bold text-[#285e19]">Bảng Xếp Hạng</h2>
                                <Link
                                    href={`/ranking?tab=${rankingMode}`}
                                    className="text-sm font-medium text-[#285e19] transition hover:underline"
                                >
                                    Mở BXH →
                                </Link>
                            </div>

                            <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-full border border-[#dcebdc] bg-[#f7faf6] p-1">
                                <button
                                    onClick={() => setRankingMode('stores')}
                                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${rankingMode === 'stores'
                                        ? 'bg-[#285e19] text-white shadow'
                                        : 'text-[#98ab92]'
                                        }`}
                                >
                                    Cửa hàng
                                </button>
                                <button
                                    onClick={() => setRankingMode('reviewers')}
                                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${rankingMode === 'reviewers'
                                        ? 'bg-[#285e19] text-white shadow'
                                        : 'text-[#98ab92]'
                                        }`}
                                >
                                    Reviewer
                                </button>
                            </div>

                            <div className="mt-5 rounded-[18px] border border-[#edf2eb]">
                                <div className="grid grid-cols-[32px_minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,1fr)] gap-3 bg-[#f9fbf8] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-[#98ab92]">
                                    <span className="whitespace-nowrap">#</span>
                                    <span className="truncate whitespace-nowrap">{rankingLabels.name}</span>
                                    <span className="truncate whitespace-nowrap">{rankingLabels.metric}</span>
                                    <span className="truncate whitespace-nowrap">{rankingLabels.popularity}</span>
                                </div>
                                <div className="px-4">
                                    {rankingItems.map((item) => (
                                        <RankingRow key={`${rankingMode}-${item.rank}`} item={item} />
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>

                    <section className="rounded-[22px] bg-[#e6e9e6] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                        <div className="flex flex-wrap justify-end gap-4">
                            <label className="inline-flex min-w-[180px] items-center justify-between gap-3 rounded-[10px] bg-white px-4 py-3 text-base text-[#616462] shadow-[0_3px_8px_rgba(0,0,0,0.03)]">
                                <span>Danh mục</span>
                                <select
                                    value={categoryFilter}
                                    onChange={(event) => setCategoryFilter(event.target.value as FeedCategoryFilter)}
                                    className="bg-transparent text-sm outline-none"
                                >
                                    <option value="tat_ca">Tất cả</option>
                                    <option value="bai_viet">Bài viết</option>
                                    <option value="video">Video</option>
                                    <option value="repost">Bài đăng lại</option>
                                </select>
                            </label>
                            <label className="inline-flex min-w-[180px] items-center justify-between gap-3 rounded-[10px] bg-white px-4 py-3 text-base text-[#616462] shadow-[0_3px_8px_rgba(0,0,0,0.03)]">
                                <span>Ẩm thực</span>
                                <select
                                    value={cuisineFilter}
                                    onChange={(event) => setCuisineFilter(event.target.value as FeedCuisineFilter)}
                                    className="bg-transparent text-sm outline-none"
                                >
                                    <option value="tat_ca">Tất cả</option>
                                    <option value="co_hinh_anh">Có ảnh</option>
                                    <option value="co_video">Có video</option>
                                    <option value="chi_van_ban">Chỉ văn bản</option>
                                </select>
                            </label>
                            <label className="inline-flex min-w-[180px] items-center justify-between gap-3 rounded-[10px] bg-white px-4 py-3 text-base text-[#616462] shadow-[0_3px_8px_rgba(0,0,0,0.03)]">
                                <span>Thời gian</span>
                                <select
                                    value={timeFilter}
                                    onChange={(event) => setTimeFilter(event.target.value as FeedTimeFilter)}
                                    className="bg-transparent text-sm outline-none"
                                >
                                    <option value="moi_nhat">Mới nhất</option>
                                    <option value="hom_nay">Hôm nay</option>
                                    <option value="hom_qua">Hôm qua</option>
                                    <option value="tuan_nay">Tuần này</option>
                                    <option value="thang_nay">Tháng này</option>
                                </select>
                            </label>
                        </div>
                    </section>

                    <section ref={dealSectionRef} className="grid gap-8 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]">
                        <div className="space-y-8">
                                {paginatedFeedPosts.map((post) => (
                                    <FeedPostCard
                                        key={post.id}
                                        post={post}
                                        onComment={() => {
                                            setActiveCommentStore(post.storeName || post.author || 'Bài viết');
                                            setActiveCommentPostId(Number(post.id) || null);
                                            setCommentComposerOpen(false);
                                            setIsCommentModalOpen(true);
                                        }}
                                        onOrder={() => {
                                            const postId = Number(post.id);
                                            if (!Number.isFinite(postId) || postId <= 0) {
                                                setActionMessage('Không xác định được bài viết để đặt món');
                                                return;
                                            }
                                            void userContentApi
                                                .nhanLinkMonBaiViet(postId)
                                                .then((payload: unknown) => {
                                                    const data = (payload ?? {}) as { url?: unknown };
                                                    const resolved = typeof data.url === 'string' ? data.url.trim() : '';
                                                    const fallback = post.dishLink?.trim() ?? '';
                                                    const nextLink = resolved || fallback;
                                                    if (!nextLink) {
                                                        setActionMessage('Bài viết này chưa gắn link món');
                                                        return;
                                                    }
                                                    if (/^https?:\/\//i.test(nextLink)) {
                                                        window.location.href = nextLink;
                                                    } else {
                                                        router.push(nextLink.startsWith('/') ? nextLink : `/${nextLink}`);
                                                    }
                                                })
                                                .catch((error) => {
                                                    setActionMessage(error instanceof Error ? error.message : 'Không thể mở link món');
                                                });
                                        }}
                                        onOpenDetail={() => setActivePostDetailId(Number(post.id) || null)}
                                        onOpenAuthorProfile={() => {
                                            const targetId = Number(post.authorId || 0);
                                            if (!Number.isFinite(targetId) || targetId <= 0) {
                                                setActionMessage('Không tìm thấy trang cá nhân của người dùng này.');
                                                return;
                                            }
                                            router.push(`/ranking/reviewer/${targetId}`);
                                        }}
                                    onFollow={() => {
                                        const targetId = Number(post.authorId || 0);
                                        if (!Number.isFinite(targetId) || targetId <= 0) {
                                            setActionMessage('Chưa có dữ liệu người dùng để theo dõi');
                                            return;
                                        }
                                        void userContentApi.toggleTheoDoiNguoiDung(targetId)
                                            .then((res: unknown) => {
                                                const data = (res ?? {}) as { dang_theo_doi?: boolean };
                                                setFeedPosts((current) =>
                                                    current.map((item) =>
                                                        Number(item.authorId || 0) === targetId
                                                            ? {
                                                                ...item,
                                                                followLabel:
                                                                    typeof data?.dang_theo_doi === 'boolean'
                                                                        ? data.dang_theo_doi
                                                                            ? 'Đang theo dõi'
                                                                            : 'Follow +'
                                                                        : item.followLabel === 'Follow +'
                                                                            ? 'Đang theo dõi'
                                                                            : 'Follow +',
                                                            }
                                                            : item,
                                                    ),
                                                );
                                            })
                                            .catch((e) => setActionMessage(e instanceof Error ? e.message : 'Không thể theo dõi người dùng'));
                                    }}
                                    onLike={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        void userContentApi.toggleThichBaiViet(id)
                                            .then((res: unknown) => {
                                                const data = (res ?? {}) as { da_tuong_tac?: boolean; tong_luot?: number };
                                                bumpPostCounter(id, 'likeCount', data.tong_luot);
                                                setFeedPosts((current) =>
                                                    current.map((item) =>
                                                        Number(item.id) === id
                                                            ? {
                                                                ...item,
                                                                isLiked:
                                                                    typeof data?.da_tuong_tac === 'boolean'
                                                                        ? data.da_tuong_tac
                                                                        : !item.isLiked,
                                                            }
                                                            : item,
                                                    ),
                                                );
                                                setActionMessage(data?.da_tuong_tac ? 'Đã thích bài viết' : 'Đã bỏ thích bài viết');
                                            })
                                            .catch((e) => setActionMessage(e instanceof Error ? e.message : 'Không thể thích bài viết'));
                                    }}
                                    onShare={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        if (post.type === 'repost') {
                                            setActionMessage('Không thể chia sẻ lại một bài đăng lại');
                                            return;
                                        }
                                        openShareModal(post);
                                    }}
                                    onReport={() => {
                                        openReportModal(post);
                                    }}
                                />
                            ))}
                            <div className="flex flex-col items-center gap-3 pt-2">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setFeedCurrentPage((current) => Math.max(1, current - 1))}
                                        disabled={currentFeedPage <= 1}
                                        className="rounded-full border border-[#d7d7d7] px-4 py-2 text-sm font-semibold text-[#2f8f22] disabled:opacity-40"
                                    >
                                        Trước
                                    </button>
                                    <span className="text-sm text-[#4b5563]">
                                        Trang {currentFeedPage}/{totalFeedPages}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setFeedCurrentPage((current) => Math.min(totalFeedPages, current + 1))}
                                        disabled={currentFeedPage >= totalFeedPages}
                                        className="rounded-full border border-[#d7d7d7] px-4 py-2 text-sm font-semibold text-[#2f8f22] disabled:opacity-40"
                                    >
                                        Sau
                                    </button>
                                </div>
                                <p className="text-sm text-[#6b7280]">
                                    Hiển thị tối đa {FEED_PAGE_SIZE} bài viết mỗi trang
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-[16px] bg-white px-4 py-3 text-base font-semibold text-[#285e19] shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
                                Deal hôm nay
                            </div>
                            {spotlightCards.slice(0, visibleDealCount).map((card) => (
                                <SidebarStoreCard
                                    key={card.id}
                                    card={card}
                                    onOpenGallery={() => {
                                        setActiveGalleryCard(card);
                                        setIsGalleryModalOpen(true);
                                    }}
                                    onOpenComment={() => {
                                        setActiveCommentStore(card.title);
                                        setActiveCommentPostId(
                                            Number(feedPosts[0]?.id || 0) || null,
                                        );
                                        setCommentComposerOpen(true);
                                        setIsCommentModalOpen(true);
                                    }}
                                    onOpenDetail={() => setActiveDealCard(card)}
                                />
                            ))}
                            {hasMoreDeals ? (
                                <button
                                    type="button"
                                    onClick={() => setVisibleDealCount((current) => current + 3)}
                                    className="w-full rounded-[12px] border border-[#2f8f22] bg-white px-4 py-2 text-sm font-semibold text-[#2f8f22]"
                                >
                                    Xem thêm deal
                                </button>
                            ) : null}
                        </div>
                    </section>
                </section>
            </div>

            {isMenuModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
                    <div className="relative flex h-[min(88vh,900px)] w-full max-w-[1360px] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
                        <button
                            onClick={() => setIsMenuModalOpen(false)}
                            className="absolute right-6 top-5 z-10 text-[54px] leading-none text-black transition hover:opacity-65"
                            aria-label="Đóng thực đơn"
                        >
                            ×
                        </button>

                        <aside className="w-[250px] shrink-0 border-r border-[#ececec] px-8 py-14">
                            <h2 className="mb-8 text-[28px] font-bold text-[#ef3124]">{menuData.title}</h2>
                            <div className="space-y-4">
                                {menuData.categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveMenuCategory(category.id)}
                                        className={`block rounded-[8px] px-4 py-2 text-left text-[18px] uppercase transition ${activeMenuCategory === category.id
                                            ? 'bg-[#a4a8ae] font-bold text-white'
                                            : 'text-[#7e8797] hover:text-[#4e5560]'
                                            }`}
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </div>
                        </aside>

                        <div className="relative flex min-w-0 flex-1 flex-col px-8 pb-8 pt-8">
                            <div className="mr-14 flex h-[76px] items-center gap-4 border border-[#ededed] px-6">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" className="text-[#374151]">
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="m20 20-3.5-3.5" />
                                </svg>
                                <input
                                    value={menuQuery}
                                    onChange={(event) => setMenuQuery(event.target.value)}
                                    placeholder="Tìm món"
                                    className="w-full border-none text-[18px] text-[#6b7280] placeholder:text-[#9ca3af] focus:outline-none"
                                />
                            </div>

                            <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-4">
                                {normalizedMenuQuery ? (
                                    <section className="mb-7">
                                        <h3 className="mb-4 text-[20px] font-medium uppercase text-[#8b929c]">
                                            Kết quả tìm kiếm ({menuSearchResults.length})
                                        </h3>
                                        <div>
                                            {menuSearchResults.map((item) => (
                                                <article
                                                    key={`search-${item.id}`}
                                                    className="grid grid-cols-[84px_minmax(0,1fr)_140px_56px] items-center gap-5 border-b border-[#f0f0f0] py-3.5"
                                                >
                                                    <img src={item.image} alt={item.name} className="h-[64px] w-[64px] rounded-[4px] object-cover" />
                                                    <div className="min-w-0">
                                                        <h4 className="truncate text-[20px] font-bold text-[#3b3b3b]">{item.name}</h4>
                                                        <p className="mt-1 line-clamp-2 text-[14px] text-[#6d6d6d]">{item.note}</p>
                                                    </div>
                                                    <div className="text-right text-[18px] font-bold text-[#2aa8f4]">{item.price}</div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (!isAuthenticated) {
                                                                setIsOrderModalOpen(true);
                                                                return;
                                                            }
                                                            const dishId = Number(item.id);
                                                            if (Number.isFinite(dishId) && dishId > 0) {
                                                                setIsMenuModalOpen(false);
                                                                router.push(`/ranking/food/${dishId}`);
                                                                return;
                                                            }
                                                            setActionMessage('Không xác định được món để thêm vào giỏ');
                                                        }}
                                                        className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] bg-[#ff5a2c] text-[30px] leading-none text-white transition hover:bg-[#ef4b1d]"
                                                    >
                                                        +
                                                    </button>
                                                </article>
                                            ))}
                                            {menuSearchResults.length === 0 ? (
                                                <p className="py-4 text-[15px] text-[#6b7280]">Không tìm thấy món phù hợp.</p>
                                            ) : null}
                                        </div>
                                    </section>
                                ) : (
                                    menuData.categories
                                        .filter((category) => !activeMenuCategory || category.id === activeMenuCategory)
                                        .map((category) => {
                                            const categoryItems = filteredMenuItemsByCategory.filter((item) => item.categoryId === category.id);

                                            if (categoryItems.length === 0) return null;

                                            return (
                                                <section key={category.id} className="mb-7">
                                                    <h3 className="mb-4 text-[20px] font-medium uppercase text-[#8b929c]">
                                                        {category.label}
                                                    </h3>
                                                    <div>
                                                        {categoryItems.map((item) => (
                                                            <article
                                                                key={item.id}
                                                                className="grid grid-cols-[84px_minmax(0,1fr)_140px_56px] items-center gap-5 border-b border-[#f0f0f0] py-3.5"
                                                            >
                                                                <img src={item.image} alt={item.name} className="h-[64px] w-[64px] rounded-[4px] object-cover" />
                                                                <div className="min-w-0">
                                                                    <h4 className="truncate text-[20px] font-bold text-[#3b3b3b]">{item.name}</h4>
                                                                    <p className="mt-1 line-clamp-2 text-[14px] text-[#6d6d6d]">{item.note}</p>
                                                                </div>
                                                                <div className="text-right text-[18px] font-bold text-[#2aa8f4]">{item.price}</div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (!isAuthenticated) {
                                                                            setIsOrderModalOpen(true);
                                                                            return;
                                                                        }
                                                                        const dishId = Number(item.id);
                                                                        if (Number.isFinite(dishId) && dishId > 0) {
                                                                            setIsMenuModalOpen(false);
                                                                            router.push(`/ranking/food/${dishId}`);
                                                                            return;
                                                                        }
                                                                        setActionMessage('Không xác định được món để thêm vào giỏ');
                                                                    }}
                                                                    className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] bg-[#ff5a2c] text-[30px] leading-none text-white transition hover:bg-[#ef4b1d]"
                                                                >
                                                                    +
                                                                </button>
                                                            </article>
                                                        ))}
                                                    </div>
                                                </section>
                                            );
                                        })
                                )}
                            </div>

                            {!isAuthenticated ? (
                                <div className="pointer-events-none absolute bottom-10 right-10 flex h-[88px] w-[88px] items-center justify-center rounded-full border border-[#dadada] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
                                    <div className="text-[42px]">🛍️</div>
                                    <div className="absolute bottom-[6px] right-[6px] flex h-10 w-10 items-center justify-center rounded-full bg-[#ff5a2c] text-[32px] leading-none text-white">
                                        +
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}

            {isOrderModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
                    <div className="w-full max-w-[460px] rounded-[28px] bg-white p-7 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#98ab92]">
                                    Đặt món
                                </p>
                                <h2 className="mt-2 text-2xl font-bold text-[#285e19]">
                                    Đăng nhập để tiếp tục
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsOrderModalOpen(false)}
                                className="rounded-full bg-[#f1f2f1] p-2 text-[#616462] transition hover:bg-[#e5e7e5]"
                                aria-label="Đóng popup"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        <p className="mt-4 text-[15px] leading-7 text-[#5f655f]">
                            Bạn đang xem DishNet với vai trò khách vãng lai. Đăng nhập để lưu món yêu thích,
                            xem menu chi tiết và hoàn tất đơn hàng.
                        </p>

                        <div className="mt-6 rounded-[22px] bg-[#f7faf6] p-4">
                            <div className="flex items-center gap-4">
                                <img src={data.orderPreview.image} alt={data.orderPreview.title} className="h-20 w-24 rounded-[14px] object-cover" />
                                <div>
                                    <h3 className="text-base font-semibold text-black">{data.orderPreview.title}</h3>
                                    <p className="mt-1 text-sm text-[#616462]">{data.orderPreview.address}</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <img src={homeUiAssets.ratingStars} alt="Đánh giá" className="h-5 w-20 object-contain" />
                                        <span className="text-xs font-medium text-[#616462]">{data.orderPreview.badgeText}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={() => setIsOrderModalOpen(false)}
                                className="flex-1 rounded-full border border-[#b7afaf] px-5 py-3 text-sm font-bold text-[#616462] transition hover:border-[#8f948f]"
                            >
                                Xem sau
                            </button>
                            <a
                                href="/login"
                                className="flex-1 rounded-full bg-[#285e19] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#1f4a13]"
                            >
                                Đi đến đăng nhập
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <PostDetailModal
                postId={activePostDetailId}
                onClose={() => setActivePostDetailId(null)}
            />

            <DealDetailModal
                deal={activeDealCard}
                onClose={() => setActiveDealCard(null)}
            />

            <GalleryModal
                isOpen={isGalleryModalOpen}
                onClose={() => setIsGalleryModalOpen(false)}
                card={activeGalleryCard}
                onOrder={() => {
                    setIsGalleryModalOpen(false);
                    setIsOrderModalOpen(true);
                }}
            />

            <CommentModal
                key={`${activeCommentStore}-${commentComposerOpen ? 'compose' : 'view'}-${isCommentModalOpen ? 'open' : 'closed'}`}
                isOpen={isCommentModalOpen}
                onClose={() => {
                    setIsCommentModalOpen(false);
                    setCommentComposerOpen(false);
                    setActiveCommentStore('Nét Huế - Hàng Bông');
                    setActiveCommentPostId(null);
                }}
                storeName={activeCommentStore}
                startComposerOpen={commentComposerOpen}
                postId={activeCommentPostId}
                onCommentPosted={(postId) => {
                    bumpPostCounter(postId, 'commentCount', undefined, 1);
                }}
            />

            <SharePostModal
                isOpen={isShareModalOpen}
                post={shareTargetPost}
                recipients={shareRecipients}
                selectedRecipientIds={selectedRecipientIds}
                shareText={shareText}
                audience={shareAudience}
                isLoadingRecipients={isLoadingShareRecipients}
                isSubmitting={isSubmittingShare}
                onClose={closeShareModal}
                onToggleRecipient={toggleShareRecipient}
                onChangeText={setShareText}
                onChangeAudience={setShareAudience}
                onShareNow={() => {
                    void handleShareNow();
                }}
                onSendMessage={() => {
                    void handleSendShareViaMessage();
                }}
            />

            <ReportPostModal
                isOpen={isReportModalOpen}
                isSubmitting={isSubmittingReport}
                onClose={closeReportModal}
                onPickReason={(reason) => {
                    void handlePickReportReason(reason);
                }}
            />

            <ReportDoneModal
                isOpen={isReportDoneModalOpen}
                authorName={reportTargetPost?.author || 'người dùng này'}
                onClose={closeReportDoneModal}
            />
        </>
    );
}
