'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useAuth } from '@/shared/AuthContext';
import { userContentApi } from '@/shared/userContentApi';

import { homeUiAssets } from './assets';
import CommentModal from './CommentModal';
import { getBangTinPage, mapFeedPosts } from './data';
import type { FeedPost, HomePageData, RankingItem, RankingMode, SpotlightCard } from './types';

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
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            onOpenDetail();
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-4 py-2 text-sm font-semibold text-[#1f6feb] transition hover:bg-[#e4ecff]"
                    >
                        Chi tiết
                    </button>
                </div>
            </div>
        </article>
    );
}

function GalleryModal({
    isOpen,
    onClose,
    card,
}: {
    isOpen: boolean;
    onClose: () => void;
    card: SpotlightCard | null;
}) {
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
                className="relative flex h-[min(86vh,920px)] w-full max-w-[1500px] flex-col overflow-hidden rounded-[24px] bg-white px-10 pb-8 pt-10 shadow-[0_28px_90px_rgba(0,0,0,0.28)]"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-6 top-5 text-[48px] leading-none text-black transition hover:opacity-60"
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
                        className="rounded-full border border-[#3ca53b] bg-[#e6f3e1] px-12 py-5 text-[24px] font-bold text-[#2a6b1d]"
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
                                className="h-[260px] w-full rounded-[6px] object-cover"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeedPostCard({
    post,
    onComment,
    onOrder,
    onOpenMenu,
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
    onOpenMenu: () => void;
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
                        <p className="mt-1 text-sm text-[#727672]">{post.date}</p>
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
                                    <p className="text-xs text-[#7a7a7a]">{post.sharedPost.date}</p>
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

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#d9ded7] pt-4">
                <div className="flex items-center gap-8 text-sm font-bold text-[#6d6969]">
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

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            onOpenDetail();
                        }}
                        className="rounded-full border border-[#b7afaf] bg-white px-6 py-2 text-sm font-bold text-[#1f6feb] transition hover:border-[#1f6feb]"
                    >
                        Xem chi tiết
                    </button>
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            onOpenMenu();
                        }}
                        className="rounded-full border border-[#b7afaf] bg-[#f7f6f6] px-6 py-2 text-sm font-bold text-[#285e19] transition hover:border-[#285e19]"
                    >
                        Xem menu
                    </button>
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
        </article>
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
                    tep_dinh_kem: Array.isArray(data.tep_dinh_kem)
                        ? data.tep_dinh_kem.filter((item): item is string => typeof item === 'string')
                        : [],
                    bai_viet_goc: data.bai_viet_goc
                        ? {
                            id: Number((data.bai_viet_goc as Record<string, unknown>).id ?? 0),
                            noi_dung: String((data.bai_viet_goc as Record<string, unknown>).noi_dung ?? ''),
                            ngay_dang: String((data.bai_viet_goc as Record<string, unknown>).ngay_dang ?? ''),
                            thong_tin_nguoi_dang: {
                                ten_hien_thi: String(((data.bai_viet_goc as Record<string, unknown>).thong_tin_nguoi_dang as Record<string, unknown> | undefined)?.ten_hien_thi ?? 'Người dùng'),
                                anh_dai_dien: ((((data.bai_viet_goc as Record<string, unknown>).thong_tin_nguoi_dang as Record<string, unknown> | undefined)?.anh_dai_dien as string | null) ?? null),
                            },
                            tep_dinh_kem: Array.isArray((data.bai_viet_goc as Record<string, unknown>).tep_dinh_kem)
                                ? ((data.bai_viet_goc as Record<string, unknown>).tep_dinh_kem as unknown[]).filter((item): item is string => typeof item === 'string')
                                : [],
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
    const [feedPage, setFeedPage] = useState<number>(Number(data.feedPagination?.trang ?? 1));
    const [totalFeedPages, setTotalFeedPages] = useState<number>(Number(data.feedPagination?.tong_trang ?? 1));
    const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);
    const [activeMenuCategory, setActiveMenuCategory] = useState(data.menu.categories[0]?.id ?? '');
    const [menuQuery, setMenuQuery] = useState('');
    const [actionMessage, setActionMessage] = useState<string | null>(null);
    const [spotlightCards] = useState<SpotlightCard[]>(data.spotlightCards);
    const [menuData] = useState(data.menu);
    const feedLoadMoreRef = useRef<HTMLDivElement | null>(null);
    const dealSectionRef = useRef<HTMLElement | null>(null);
    const { dangNhap: isAuthenticated } = useAuth();

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
    const filteredMenuItems = menuData.items.filter((item) => {
        const matchesCategory = !activeMenuCategory || item.categoryId === activeMenuCategory;
        const matchesQuery = !menuQuery || item.name.toLowerCase().includes(menuQuery.toLowerCase());
        return matchesCategory && matchesQuery;
    });
    const hasMorePosts = feedPage < totalFeedPages;
    const hasMoreDeals = spotlightCards.length > visibleDealCount;

    const loadMorePosts = useCallback(async () => {
        if (isLoadingMorePosts || !hasMorePosts) return;
        setIsLoadingMorePosts(true);
        try {
            const nextPage = feedPage + 1;
            const result = await getBangTinPage(nextPage, Number(data.feedPagination?.so_luong ?? 12));
            const nextPosts: FeedPost[] = result.feedPosts;
            setFeedPosts((current) => {
                const existingIds = new Set(current.map((item) => item.id));
                const merged = [...current];
                nextPosts.forEach((post) => {
                    if (!existingIds.has(post.id)) {
                        merged.push(post);
                    }
                });
                return merged;
            });
            setFeedPage(nextPage);
            setTotalFeedPages(
                Number(result.feedPayload?.phan_trang_bai_viet?.tong_trang ?? totalFeedPages),
            );
        } catch (error) {
            setActionMessage(
                error instanceof Error
                    ? error.message
                    : 'Không tải thêm được bài viết',
            );
        } finally {
            setIsLoadingMorePosts(false);
        }
    }, [data.feedPagination?.so_luong, feedPage, hasMorePosts, isLoadingMorePosts, totalFeedPages]);

    useEffect(() => {
        if (!hasMorePosts || !feedLoadMoreRef.current) return;
        const target = feedLoadMoreRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    void loadMorePosts();
                }
            },
            { rootMargin: '180px 0px' },
        );
        observer.observe(target);
        return () => observer.disconnect();
    }, [hasMorePosts, loadMorePosts]);

    useEffect(() => {
        if (!isAuthenticated) return;
        let active = true;
        void userContentApi
            .layBangTin({
                trang: 1,
                so_luong: Number(data.feedPagination?.so_luong ?? 12),
            })
            .then((payload: unknown) => {
                if (!active) return;
                const latest: FeedPost[] = mapFeedPosts(payload as Record<string, unknown>);
                const latestById = new Map(latest.map((item) => [item.id, item]));
                setFeedPosts((current) =>
                    current.map((post) => {
                        const synced = latestById.get(post.id);
                        if (!synced) return post;
                        return {
                            ...post,
                            isLiked: synced.isLiked,
                            followLabel: synced.followLabel,
                            likeCount: synced.likeCount,
                            commentCount: synced.commentCount,
                            shareCount: synced.shareCount,
                        };
                    }),
                );
            })
            .catch(() => {
                // keep current UI state if sync fails
            });
        return () => {
            active = false;
        };
    }, [data.feedPagination?.so_luong, isAuthenticated]);

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
                            {data.filters.map((filter) => (
                                <button
                                    key={filter}
                                    className="inline-flex min-w-[180px] items-center justify-between rounded-[10px] bg-white px-5 py-3 text-base text-[#616462] shadow-[0_3px_8px_rgba(0,0,0,0.03)]"
                                >
                                    {filter}
                                    <img src={homeUiAssets.filterChevron} alt="" className="h-5 w-5 object-contain" />
                                </button>
                            ))}
                        </div>
                    </section>

                    <section ref={dealSectionRef} className="grid gap-8 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]">
                        <div className="space-y-8">
                                {feedPosts.map((post) => (
                                    <FeedPostCard
                                        key={post.id}
                                        post={post}
                                        onComment={() => {
                                            setActiveCommentStore(post.storeName || post.author || 'Bài viết');
                                            setActiveCommentPostId(Number(post.id) || null);
                                            setCommentComposerOpen(false);
                                            setIsCommentModalOpen(true);
                                        }}
                                        onOpenMenu={() => setIsMenuModalOpen(true)}
                                        onOrder={() => setIsOrderModalOpen(true)}
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
                                                setActionMessage(data?.dang_theo_doi ? 'Đã theo dõi người dùng' : 'Đã bỏ theo dõi người dùng');
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
                                        void userContentApi.chiaSeBaiViet(id)
                                            .then((res: unknown) => {
                                                const data = (res ?? {}) as { tong_luot_chia_se?: number };
                                                bumpPostCounter(id, 'shareCount', data.tong_luot_chia_se);
                                                setActionMessage('Đã chia sẻ bài viết');
                                            })
                                            .catch((e) => setActionMessage(e instanceof Error ? e.message : 'Không thể chia sẻ bài viết'));
                                    }}
                                    onReport={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        const reason = window.prompt('Nhập lý do báo cáo bài viết');
                                        if (!reason?.trim()) return;
                                        void userContentApi.baoCaoBaiViet(id, {
                                            loai_vi_pham: 'noi_dung_vi_pham',
                                            noi_dung_bao_cao: reason.trim(),
                                        })
                                            .then(() => setActionMessage('Đã gửi báo cáo bài viết'))
                                            .catch((e) => setActionMessage(e instanceof Error ? e.message : 'Không thể báo cáo bài viết'));
                                    }}
                                />
                            ))}
                            <div className="flex flex-col items-center gap-3 pt-2">
                                {hasMorePosts ? (
                                    <button
                                        type="button"
                                        onClick={() => void loadMorePosts()}
                                        disabled={isLoadingMorePosts}
                                        className="rounded-full border border-[#2f8f22] px-5 py-2 text-sm font-semibold text-[#2f8f22] disabled:opacity-60"
                                    >
                                        {isLoadingMorePosts ? 'Đang tải...' : 'Xem thêm bài viết'}
                                    </button>
                                ) : (
                                    <p className="text-sm text-[#6b7280]">Đã hiển thị tất cả bài viết.</p>
                                )}
                                <div ref={feedLoadMoreRef} className="h-2 w-full" />
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
                                {menuData.categories
                                    .filter((category) => !activeMenuCategory || category.id === activeMenuCategory)
                                    .map((category) => {
                                        const categoryItems = filteredMenuItems.filter((item) => item.categoryId === category.id);

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
                                                            <button className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] bg-[#ff5a2c] text-[30px] leading-none text-white transition hover:bg-[#ef4b1d]">
                                                                +
                                                            </button>
                                                        </article>
                                                    ))}
                                                </div>
                                            </section>
                                        );
                                    })}
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
        </>
    );
}
