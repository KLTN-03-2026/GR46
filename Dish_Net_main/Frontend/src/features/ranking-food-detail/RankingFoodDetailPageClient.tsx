'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react';

import { userContentApi } from '@/shared/userContentApi';

import type { FoodCommentCard, FoodReviewCard, RankingFoodDetailData } from './data';

function ToolbarSelect({ label }: { label: string }) {
    return (
        <div className="relative">
            <button
                type="button"
                className="flex min-w-[136px] items-center justify-between gap-4 bg-white px-5 py-3 text-[15px] text-[#5f6660]"
            >
                <span>{label}</span>
                <span>⌄</span>
            </button>
        </div>
    );
}

function TagPill({ label, tone }: { label: string; tone: 'gold' | 'red' }) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-4 py-2 text-[14px] font-semibold ${
                tone === 'gold' ? 'bg-[#ffe9c8] text-[#e49700]' : 'bg-[#ffd9d4] text-[#f04a32]'
            }`}
        >
            {label}
        </span>
    );
}

function ReviewCard({
    review,
    onSave,
    onOpenDetail,
}: {
    review: FoodReviewCard;
    onSave: (id: string) => void;
    onOpenDetail: (id: string) => void;
}) {
    return (
        <article className="rounded-[6px] border border-[#dfdfdf] bg-white p-4 shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <img src={review.avatar} alt={review.author} className="h-14 w-14 rounded-full object-cover" />
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-[16px] font-bold text-black">{review.author}</h3>
                            <span className="rounded-full bg-[#fdecc9] px-4 py-1.5 text-[13px] font-bold text-[#26210f]">⭐ TOP REVIEWER</span>
                            <span className="rounded-full bg-[#eef2f7] px-4 py-2 text-[13px] font-semibold text-[#6b7280]">Theo dõi từ trang reviewer</span>
                        </div>
                        <p className="mt-1 text-[13px] text-[#555555]">{review.date}</p>
                    </div>
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-b border-[#ececec] bg-[#fffaf4] px-2 py-2">
                <span className="text-[14px] text-[#252525]">Đánh giá nhanh</span>
                <div className="flex items-center gap-2 text-[14px] text-[#5a5a5a]">
                    <span className="text-[#ffb31a]">★★★★☆</span>
                    <span>4.8</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-b border-[#ececec] py-3 text-[13px] text-[#535353] lg:grid-cols-3">
                <span>📍 Vị trí <b className="text-[#f3a000]">4.9</b></span>
                <span>🍲 Chất lượng món <b className="text-[#f3a000]">4.8</b></span>
                <span>⚡ Trải nghiệm <b className="text-[#f3a000]">4.6</b></span>
                <span>🌸 Giá cả <b className="text-[#f3a000]">4.8</b></span>
                <span>⏰ Tốc độ phục vụ <b className="text-[#f3a000]">4.7</b></span>
            </div>

            <div className="mt-3 grid grid-cols-[minmax(0,1.45fr)_repeat(2,minmax(0,0.62fr))_40px] gap-2">
                <img src={review.heroImage} alt="" className="row-span-2 h-full min-h-[158px] w-full rounded-[12px] object-cover" />
                {review.gallery.slice(0, 2).map((image, index) => (
                    <img key={`${review.id}-top-${index}`} src={image} alt="" className="h-[74px] w-full rounded-[12px] object-cover" />
                ))}
                <span className="row-span-2 flex items-center justify-center rounded-[16px] bg-[#f0f1f5] text-[12px] font-semibold text-[#697489]">
                    Ảnh
                </span>
                {review.gallery.slice(2, 4).map((image, index) => (
                    <img key={`${review.id}-bottom-${index}`} src={image} alt="" className="h-[74px] w-full rounded-[12px] object-cover" />
                ))}
            </div>

            <p className="mt-4 text-[15px] leading-9 text-[#444444]">{review.excerpt}</p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
                <TagPill label={`🍯 ${review.tags[0]}`} tone="gold" />
                <TagPill label={`🔥 ${review.tags[1]}`} tone="red" />
                <TagPill label={`🪙 ${review.tags[2]}`} tone="gold" />
                <span className="ml-1 text-[24px] leading-none text-[#c9d6e0]">•••</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#ececec] pt-4 text-[15px] text-[#4e4e4e]">
                <div className="flex flex-wrap items-center gap-6">
                    <span>♡ Yêu thích {review.stats.likes}</span>
                    <span>◔ Bình luận {review.stats.comments}</span>
                    <span className="text-[13px]">↺ {review.stats.shares}</span>
                    <span className="text-[13px]">➤ {review.stats.sends}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button type="button" onClick={() => onOpenDetail(review.id)} className="rounded-full border border-[#1f6feb] px-4 py-2 text-[13px] font-bold text-[#1f6feb]">
                        Xem chi tiết
                    </button>
                    <button type="button" onClick={() => onSave(review.id)} className="rounded-full border border-[#404040] px-6 py-2 text-[14px] font-bold text-[#575757]">
                        Lưu đánh giá
                    </button>
                </div>
            </div>
        </article>
    );
}

function CommentCard({ comment }: { comment: FoodCommentCard }) {
    return (
        <article className="rounded-[18px] bg-white p-8 shadow-[0_8px_22px_rgba(0,0,0,0.1)]">
            <div className="flex items-start justify-between gap-6 border-b border-[#dbe8d9] pb-5">
                <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#efefef] text-[28px] text-[#b8b8b8]">👤</div>
                    <div>
                        <h3 className="text-[18px] font-bold text-[#1d1d1d]">{comment.author}</h3>
                        <p className="mt-1 text-[13px] font-semibold text-[#1f1f1f]">
                            {comment.source} <span className="font-normal text-[#666666]">◉ {comment.date}</span>
                        </p>
                    </div>
                </div>
                <div className="text-[24px] tracking-[0.14em] text-[#ffbe12]">{comment.rating}</div>
            </div>

            <div className="pt-5">
                <h4 className="text-[18px] font-bold text-[#383838]">{comment.title}</h4>
                <p className="mt-5 text-[15px] leading-10 text-[#454545]">{comment.body}</p>

                {comment.gallery ? (
                    <div className="mt-5 grid grid-cols-6 gap-0 overflow-hidden rounded-[2px]">
                        {comment.gallery.map((image, index) => (
                            <img key={`${comment.id}-${index}`} src={image} alt="" className="h-[118px] w-full object-cover" />
                        ))}
                    </div>
                ) : null}
            </div>

            <div className="mt-6 flex items-center gap-8 text-[14px] text-[#909090]">
                <span>♥ Thích</span>
                <span>💬 Thảo luận</span>
                <span>⚠ Khiếu nại</span>
            </div>
        </article>
    );
}

export default function RankingFoodDetailPageClient({ food }: { food: RankingFoodDetailData }) {
    const [activeSection, setActiveSection] = useState<'reviews' | 'comments'>('reviews');
    const [actionMessage, setActionMessage] = useState<string | null>(null);
    const [visibleReviewCount, setVisibleReviewCount] = useState(8);
    const [savedReviews, setSavedReviews] = useState<Array<{ id: number; ten_mon: string; ten_nguoi_danh_gia: string }>>([]);
    const [detailData, setDetailData] = useState<any | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);

    useEffect(() => {
        const sectionIds: Array<'reviews' | 'comments'> = ['reviews', 'comments'];
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((section): section is HTMLElement => Boolean(section));

        if (sections.length === 0) return;

        const updateActiveSection = () => {
            const anchorY = window.scrollY + 180;
            let nextSection: 'reviews' | 'comments' = 'reviews';

            sections.forEach((section) => {
                if (section.offsetTop <= anchorY) {
                    nextSection = section.id as 'reviews' | 'comments';
                }
            });

            setActiveSection((current) => (current === nextSection ? current : nextSection));
        };

        updateActiveSection();
        window.addEventListener('scroll', updateActiveSection, { passive: true });
        window.addEventListener('resize', updateActiveSection);

        return () => {
            window.removeEventListener('scroll', updateActiveSection);
            window.removeEventListener('resize', updateActiveSection);
        };
    }, []);

    useEffect(() => {
        let mounted = true;
        const run = async () => {
            try {
                const payload: any = await userContentApi.layDanhGiaDaLuu({ trang: 1, so_luong: 8 });
                if (!mounted) return;
                const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
                setSavedReviews(
                    rows.map((item: any) => ({
                        id: Number(item.id),
                        ten_mon: String(item?.mon_an?.ten_mon ?? 'Món ăn'),
                        ten_nguoi_danh_gia: String(item?.ten_nguoi_danh_gia ?? 'Người dùng'),
                    })),
                );
            } catch {
                if (mounted) setSavedReviews([]);
            }
        };
        void run();
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="bg-[#f1f1ee] py-8">
            <section className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-5 lg:px-8">
                {actionMessage ? (
                    <div className="rounded-[10px] bg-[#eaf8eb] px-5 py-3 text-[#285e19]">{actionMessage}</div>
                ) : null}
                <article className="rounded-[20px] bg-white p-6 shadow-[0_6px_18px_rgba(0,0,0,0.12)] lg:p-8">
                    <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)_150px] lg:items-start">
                        <img src={food.coverImage} alt={food.title} className="h-[250px] w-full rounded-[12px] object-cover" />

                        <div className="pt-1">
                            <h1 className="text-[34px] font-bold leading-tight text-black">{food.title}</h1>
                            <p className="mt-2 text-[24px] font-semibold text-[#666666]">{food.storeName}</p>

                            <div className="mt-8 space-y-4 text-[17px] text-[#3c4652]">
                                <p>✈ {food.address}</p>
                                <p><span className="font-bold text-[#1cba2f]">◉ Đang mở cửa</span> &nbsp; {food.hours}</p>
                                <p>🏷 {food.priceRange}</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-24">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#f5a100] text-[32px] text-white">
                                {food.score}
                            </div>

                            <button
                                type="button"
                                className="flex w-[146px] items-center justify-center gap-3 rounded-[12px] border border-[#404040] bg-white px-5 py-4 text-[18px] text-[#575757]"
                            >
                                <span className="text-black">🔖</span>
                                <span>Lưu</span>
                            </button>
                        </div>
                    </div>
                </article>

                <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
                    <aside className="pt-3 lg:sticky lg:top-24 lg:self-start">
                        <div className="space-y-5">
                            <a
                                href="#reviews"
                                onClick={() => setActiveSection('reviews')}
                                className={`block border-l-4 pl-6 text-[26px] font-bold transition ${
                                    activeSection === 'reviews'
                                        ? 'border-[#2b7a1e] text-[#2b7a1e]'
                                        : 'border-transparent text-[#b7c8ac] hover:border-[#2b7a1e] hover:text-[#2b7a1e]'
                                }`}
                            >
                                Bài Review
                            </a>
                            <a
                                href="#comments"
                                onClick={() => setActiveSection('comments')}
                                className={`block border-l-4 pl-6 text-[24px] transition ${
                                    activeSection === 'comments'
                                        ? 'border-[#2b7a1e] font-bold text-[#2b7a1e]'
                                        : 'border-transparent text-[#b7c8ac] hover:border-[#2b7a1e] hover:text-[#2b7a1e]'
                                }`}
                            >
                                Đánh giá
                            </a>
                            <div className="h-[420px] border-r border-[#e4ede0]" />
                        </div>
                    </aside>

                    <div className="space-y-8">
                        <section id="reviews" className="scroll-mt-28 space-y-8">
                            {savedReviews.length > 0 ? (
                                <div className="rounded-[12px] border border-[#dce4d8] bg-white px-4 py-3">
                                    <div className="text-[15px] font-semibold text-[#1f2937]">
                                        Đánh giá đã lưu của tôi
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {savedReviews.map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={async () => {
                                                    setDetailLoading(true);
                                                    try {
                                                        const detail: any = await userContentApi.layChiTietDanhGia(item.id);
                                                        setDetailData(detail);
                                                    } catch (e) {
                                                        setActionMessage(
                                                            e instanceof Error
                                                                ? e.message
                                                                : 'Không tải được chi tiết đánh giá',
                                                        );
                                                    } finally {
                                                        setDetailLoading(false);
                                                    }
                                                }}
                                                className="rounded-full border border-[#b6c3b1] px-3 py-1 text-[12px] text-[#3f4f3d] hover:bg-[#f7faf6]"
                                            >
                                                {item.ten_mon} - {item.ten_nguoi_danh_gia}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            <div className="flex flex-wrap items-center gap-3 bg-[#e7e9e2] p-4">
                                <button type="button" className="flex min-w-[230px] items-center justify-between bg-white px-5 py-3 text-[15px] text-[#666666]">
                                    <span>Đánh giá</span>
                                    <span className="text-[#ffb31a]">★★★★☆</span>
                                </button>
                                <ToolbarSelect label="Thời gian" />
                                <ToolbarSelect label="Lượng Thích" />
                                <ToolbarSelect label="Bình luận" />
                                <ToolbarSelect label="Đăng lại" />
                                <ToolbarSelect label="Đã gửi" />
                            </div>

                            <div className="grid gap-6 xl:grid-cols-2">
                                {food.reviews.slice(0, visibleReviewCount).map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        review={review}
                                        onOpenDetail={async (id) => {
                                            const reviewId = Number(id);
                                            if (!Number.isFinite(reviewId)) return;
                                            setDetailLoading(true);
                                            try {
                                                const detail: any =
                                                    await userContentApi.layChiTietDanhGia(reviewId);
                                                setDetailData(detail);
                                            } catch (e) {
                                                setActionMessage(
                                                    e instanceof Error
                                                        ? e.message
                                                        : 'Không tải được chi tiết đánh giá',
                                                );
                                            } finally {
                                                setDetailLoading(false);
                                            }
                                        }}
                                        onSave={(id) => {
                                            const reviewId = Number(id);
                                            if (!Number.isFinite(reviewId)) return;
                                            void userContentApi
                                                .toggleLuuDanhGia(reviewId)
                                                .then((res: any) => {
                                                    setActionMessage(res?.da_luu ? 'Đã lưu đánh giá' : 'Đã bỏ lưu đánh giá');
                                                })
                                                .catch((e) => {
                                                    setActionMessage(e instanceof Error ? e.message : 'Không thể lưu đánh giá');
                                                });
                                        }}
                                    />
                                ))}
                            </div>

                            {visibleReviewCount < food.reviews.length ? (
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setVisibleReviewCount((current) => current + 8)}
                                        className="rounded-[12px] border border-[#b8bec8] bg-white px-8 py-3 text-[14px] font-semibold text-[#374151] transition hover:bg-[#f8fafc]"
                                    >
                                        Xem thêm
                                    </button>
                                </div>
                            ) : null}

                            <div className="py-2 text-center text-sm text-[#6f7786]">
                                Hiển thị {Math.min(visibleReviewCount, food.reviews.length)}/{food.reviews.length} bài review từ dữ liệu hệ thống.
                            </div>
                        </section>

                        <section id="comments" className="scroll-mt-28 space-y-6">
                            {food.comments.map((comment) => (
                                <CommentCard key={comment.id} comment={comment} />
                            ))}
                        </section>
                    </div>
                </div>
            </section>
            {detailData ? (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 px-4">
                    <div className="w-full max-w-[760px] rounded-[16px] bg-white p-5 shadow-[0_16px_46px_rgba(0,0,0,0.22)]">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h4 className="text-[20px] font-bold text-black">Chi tiết đánh giá</h4>
                                <p className="mt-1 text-[13px] text-[#6b7280]">
                                    {detailLoading ? 'Đang tải...' : detailData?.mon_an?.ten_mon ?? ''}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setDetailData(null)}
                                className="text-[26px] leading-none text-[#6b7280]"
                            >
                                ×
                            </button>
                        </div>
                        <div className="mt-4 rounded-[12px] border border-[#e5e7eb] p-4">
                            <div className="text-[15px] font-semibold text-black">
                                {detailData?.ten_nguoi_danh_gia ?? 'Người dùng'}
                            </div>
                            <div className="mt-1 text-[12px] text-[#6b7280]">
                                {detailData?.ngay_danh_gia
                                    ? new Date(detailData.ngay_danh_gia).toLocaleString('vi-VN')
                                    : ''}
                            </div>
                            <div className="mt-2 text-[14px] text-[#d97706]">
                                {'★'.repeat(Math.max(0, Math.min(5, Number(detailData?.so_sao ?? 0))))}
                            </div>
                            <p className="mt-3 text-[14px] leading-7 text-[#374151]">
                                {detailData?.noi_dung ?? ''}
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
