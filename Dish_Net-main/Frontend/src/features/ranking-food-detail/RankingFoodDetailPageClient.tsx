'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

function ReviewCard({ review }: { review: FoodReviewCard }) {
    return (
        <article className="rounded-[6px] border border-[#dfdfdf] bg-white p-4 shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <img src={review.avatar} alt={review.author} className="h-14 w-14 rounded-full object-cover" />
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-[16px] font-bold text-black">{review.author}</h3>
                            <span className="rounded-full bg-[#fdecc9] px-4 py-1.5 text-[13px] font-bold text-[#26210f]">⭐ TOP REVIEWER</span>
                            <button type="button" className="rounded-full bg-[#2f9925] px-4 py-2 text-[13px] font-bold text-white">Follow +</button>
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
                <button type="button" className="row-span-2 rounded-[16px] bg-[#e56262] text-[13px] font-bold text-white">
                    Xem thêm
                </button>
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
                    <button type="button">♡ Yêu thích</button>
                    <button type="button">◔ Bình luận</button>
                    <span className="text-[13px]">↺ {review.stats.shares}</span>
                    <span className="text-[13px]">➤ {review.stats.sends}</span>
                </div>
                <button type="button" className="rounded-full border border-[#44a13a] px-6 py-2 text-[14px] font-bold text-[#2f8f27]">
                    Đặt món
                </button>
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
                <button type="button">♥ Thích</button>
                <button type="button">💬 Thảo luận</button>
                <button type="button">⚠ Khiếu nại</button>
            </div>
        </article>
    );
}

export default function RankingFoodDetailPageClient({ food }: { food: RankingFoodDetailData }) {
    const [activeSection, setActiveSection] = useState<'reviews' | 'comments'>('reviews');

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

    return (
        <div className="bg-[#f1f1ee] py-8">
            <section className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-5 lg:px-8">
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
                                {food.reviews.map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>

                            <div className="flex items-center justify-center gap-2 py-2">
                                <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4d4d4] bg-white text-[#6a6a6a]">1</Link>
                                <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4d4d4] bg-white text-[#6a6a6a]">2</Link>
                                <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4d4d4] bg-white text-[#6a6a6a]">3</Link>
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
        </div>
    );
}
