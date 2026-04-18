'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';

import LoginRequiredModal from '@/components/Auth/LoginRequiredModal';

import type { StoreDetailData } from './data';

function QuickAction({ label, onClick }: { label: string; onClick?: () => void }) {
    return (
        <button onClick={onClick} className="rounded-[8px] bg-white px-6 py-3 text-[15px] font-medium text-[#4b5563] shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition hover:bg-[#f8fafc]">
            {label}
        </button>
    );
}

function ReviewerCard({
    author,
    date,
    excerpt,
    heroImage,
    gallery,
    onRequireLogin,
}: StoreDetailData['reviewCards'][number] & { onRequireLogin?: () => void }) {
    return (
        <article className="rounded-[18px] border border-[#ebe5dd] bg-[#fff6ee] p-5 shadow-[0_8px_22px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ffe0b6] text-[20px]">👥</div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h3 className="text-[18px] font-bold text-[#172554]">{author}</h3>
                            <span className="rounded-full bg-[#ffe9bd] px-3 py-1 text-xs font-bold text-[#6b4b00]">TOP REVIEWER</span>
                        </div>
                        <p className="text-sm text-[#6b7280]">{date}</p>
                    </div>
                </div>
                <button onClick={onRequireLogin} className="rounded-full bg-[#2f9e2f] px-5 py-2 text-sm font-bold text-white">Follow +</button>
            </div>

            <div className="mt-4 flex items-center justify-between border-y border-[#efe5d9] py-3 text-sm text-[#5b6475]">
                <span>Đánh giá nhanh</span>
                <span className="text-[#f59e0b]">★★★★☆ 4.8</span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-[#5b6475]">
                <span>📍 Vị trí <b className="text-[#f59e0b]">4.9</b></span>
                <span>🍲 Chất lượng món <b className="text-[#f59e0b]">4.8</b></span>
                <span>⚡ Trải nghiệm <b className="text-[#f59e0b]">4.8</b></span>
                <span>🌸 Giá cả <b className="text-[#f59e0b]">4.8</b></span>
                <span>⏰ Tốc độ phục vụ <b className="text-[#f59e0b]">4.7</b></span>
            </div>

            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_90px_90px_48px] gap-2">
                <img src={heroImage} alt={author} className="h-[146px] w-full rounded-[12px] object-cover" />
                {gallery.slice(0, 3).map((image, index) => (
                    <img key={index} src={image} alt="" className="h-[68px] w-full rounded-[12px] object-cover" />
                ))}
                <button onClick={onRequireLogin} className="row-span-2 rounded-[14px] bg-[#e85f5f] text-sm font-bold text-white">Xem thêm</button>
                {gallery.slice(1, 3).map((image, index) => (
                    <img key={`row-${index}`} src={image} alt="" className="h-[68px] w-full rounded-[12px] object-cover" />
                ))}
            </div>

            <p className="mt-4 text-[15px] leading-8 text-[#3f3f46]">{excerpt}</p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#ffe8c8] px-4 py-2 text-sm font-semibold text-[#d58800]">Ngon</span>
                <span className="rounded-full bg-[#ffd8d3] px-4 py-2 text-sm font-semibold text-[#ef4444]">Nên thử</span>
                <span className="rounded-full bg-[#ffe8c8] px-4 py-2 text-sm font-semibold text-[#d58800]">Đậm vị</span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#efe5d9] pt-4">
                <div className="flex items-center gap-8 text-[15px] text-[#4b5563]">
                    <button onClick={onRequireLogin}>♡ Yêu thích</button>
                    <button>◔ Bình luận</button>
                </div>
                <button onClick={onRequireLogin} className="rounded-full border border-[#2f9e2f] px-6 py-2 text-sm font-bold text-[#2f9e2f]">Đặt món</button>
            </div>
        </article>
    );
}

function UserCommentCard({ comment }: { comment: StoreDetailData['comments'][number] }) {
    return (
        <article className="rounded-[18px] bg-white p-8 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#e9efe6] pb-5">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ececec] text-xl">👤</div>
                    <div>
                        <h3 className="text-[18px] font-bold text-[#1f2937]">{comment.author}</h3>
                        <p className="text-sm text-[#6b7280]">{comment.source} • {comment.date}</p>
                    </div>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2f9e2f] text-[20px] font-bold text-white">
                    {comment.rating}
                </div>
            </div>

            <div className="pt-5">
                <h4 className="text-[18px] font-bold text-[#3f3f46]">{comment.title}</h4>
                <p className="mt-4 text-[15px] leading-8 text-[#3f3f46]">{comment.body}</p>
                {comment.gallery ? (
                    <div className="mt-5 grid grid-cols-3 gap-2 md:grid-cols-6">
                        {comment.gallery.map((image, index) => (
                            <img key={index} src={image} alt="" className="h-24 w-full rounded-[10px] object-cover" />
                        ))}
                    </div>
                ) : null}
            </div>

            <div className="mt-5 flex items-center gap-8 text-[15px] text-[#6b7280]">
                <button>♥ Thích</button>
                <button>💬 Thảo luận</button>
                <button>⚠ Báo lỗi</button>
            </div>
        </article>
    );
}

export default function StoreDetailPageClient({ store }: { store: StoreDetailData }) {
    const [activeSection, setActiveSection] = useState('top');
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState(false);
    const visibleMenu = useMemo(() => store.menuItems.slice(0, 10), [store.menuItems]);
    const openLoginRequired = () => setIsLoginRequiredOpen(true);

    useEffect(() => {
        const sectionIds = ['top', 'menu', 'reviews', 'community', 'comments'] as const;
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((element): element is HTMLElement => Boolean(element));

        if (sections.length === 0) return;

        const updateActiveSection = () => {
            const anchorY = window.scrollY + 180;
            let nextActiveSection: (typeof sectionIds)[number] = sectionIds[0];

            sections.forEach((section) => {
                if (section.offsetTop <= anchorY) {
                    nextActiveSection = section.id as (typeof sectionIds)[number];
                }
            });

            setActiveSection((current) => (current === nextActiveSection ? current : nextActiveSection));
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
        if (!isReviewModalOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsReviewModalOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isReviewModalOpen]);

    return (
        <div className="bg-[#f1f2f0] py-10">
            <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 md:px-8">
                <article id="top" className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                    <div className="grid lg:grid-cols-[1.15fr_1.65fr]">
                        <img src={store.coverImage} alt={store.title} className="h-full min-h-[340px] w-full object-cover" />
                        <div className="p-6 md:p-7">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-[32px] font-bold leading-tight text-black md:text-[36px]">{store.title}</h1>
                                    <p className="mt-3 text-[16px] text-[#4b5563]">{store.subtitle}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[18px] font-bold text-[#f59e0b]">{store.views}</p>
                                    <button className="mt-3 rounded-full bg-[#2f9e2f] px-5 py-2 text-sm font-bold text-white">Follow +</button>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-4 gap-4 border-y border-[#e7ece5] py-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f59e0b] text-[20px] font-bold text-white">
                                        {store.score}
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[22px] font-bold text-[#f59e0b]">{store.score}</div>
                                        <div className="text-[15px] text-[#4b5563]">Chất lượng</div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[22px] font-bold text-[#f59e0b]">{store.soldCount}</div>
                                    <div className="text-[15px] text-[#4b5563]">Số lượng bán</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[22px] font-bold text-[#f59e0b]">{store.reviewCount}</div>
                                    <div className="text-[15px] text-[#4b5563]">Số bài Review</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[22px] font-bold text-[#2f9e2f]">{store.commentCount}</div>
                                    <div className="text-[15px] text-[#4b5563]">Bình luận</div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-5 text-[16px] text-[#374151]">
                                <p>📍 {store.address}</p>
                                <p><span className="font-bold text-[#24b036]">⏺ Đang mở cửa</span> {store.hours}</p>
                                <p>🏷 {store.priceRange}</p>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        {[
                            { label: 'Trang chủ', id: 'top' },
                            { label: 'Thực đơn', id: 'menu' },
                            { label: 'Bài Review', id: 'reviews' },
                            { label: 'Ảnh và Video', id: 'community' },
                            { label: 'Bình Luận', id: 'comments' },
                        ].map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={() => setActiveSection(item.id)}
                                className={`flex items-center justify-between border-b px-5 py-5 text-[22px] transition ${
                                    activeSection === item.id
                                        ? 'border-[#cfe6c7] bg-[#f3fbef] font-bold text-[#1f8f24]'
                                        : 'border-[#e4e8df] font-medium text-[#9aac93] hover:bg-[#f8faf6] hover:text-[#70856a]'
                                }`}
                            >
                                <span>{item.label}</span>
                                <span>›</span>
                            </a>
                        ))}
                    </aside>

                    <div className="space-y-8">
                        <div className="flex flex-wrap items-center justify-end gap-4 bg-[#e9ece6] px-6 py-4">
                            <QuickAction label="📞 Gọi điện thoại" />
                            <QuickAction label="Danh Mục ⌄" />
                            <QuickAction label="🔖 Lưu" onClick={openLoginRequired} />
                            <QuickAction label="🔗 Chia Sẻ" />
                        </div>

                        <section id="menu" className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                            <div className="p-8">
                                <h2 className="text-[34px] font-bold text-black">Thực đơn</h2>
                                <div className="mt-4 h-px bg-[#dce7d6]" />
                                <div className="mt-5 grid gap-x-10 gap-y-4 md:grid-cols-2">
                                    {visibleMenu.map((item) => (
                                        <article key={item.id} className="flex items-center gap-4 border-b border-[#f0f2ed] py-3">
                                            <img src={item.image} alt={item.name} className="h-16 w-16 rounded-[8px] object-cover" />
                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-[18px] font-bold text-[#1f2937]">{item.name}</h3>
                                                <p className="text-sm text-[#9ca3af]">{item.note}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[18px] font-bold text-[#2f71ff]">{item.price}</p>
                                                <button onClick={openLoginRequired} className="mt-2 h-8 w-8 rounded-[8px] bg-[#ff5a2c] text-lg font-bold text-white">+</button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={openLoginRequired}
                                className="w-full bg-[#ff5757] px-6 py-4 text-[16px] font-medium text-white"
                            >
                                Xem thêm và Đặt món →
                            </button>
                        </section>

                        <section id="reviews" className="space-y-6">
                            <div className="grid gap-6 xl:grid-cols-2">
                                {store.reviewCards.map((review) => (
                                    <ReviewerCard key={review.id} {...review} onRequireLogin={openLoginRequired} />
                                ))}
                            </div>
                            <button
                                onClick={() => setIsReviewModalOpen(true)}
                                className="w-full rounded-[8px] bg-[#d7f5cf] px-6 py-5 text-[22px] font-medium text-[#2e7d18]"
                            >
                                Xem Thêm Bài Review →
                            </button>
                        </section>

                        <section id="community" className="rounded-[22px] bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                            <h2 className="text-[28px] font-bold text-black">Hình ảnh từ cộng đồng</h2>
                            <div className="mt-6 grid gap-3 md:grid-cols-4">
                                {store.communityImages.map((image, index) => (
                                    <img key={index} src={image} alt="" className="h-52 w-full rounded-[12px] object-cover" />
                                ))}
                            </div>
                        </section>

                        <section id="comments" className="space-y-5">
                            <article className="rounded-[18px] bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                                <div className="flex flex-wrap items-center justify-between gap-6">
                                    <div className="flex items-center gap-4 text-[#f59e0b]">
                                        <span className="text-[42px] font-bold">{store.score}</span>
                                        <span className="text-[42px]">★★★★☆</span>
                                    </div>
                                    <div className="text-[24px] font-bold text-[#2f9e2f]">{store.commentCount} <span className="font-medium text-[#7a8a78]">bình luận</span></div>
                                </div>
                                <div className="mt-5 grid grid-cols-5 gap-4 border-t border-[#dce7d6] pt-4 text-[15px] text-[#4b5563]">
                                    <span>📍 Vị trí</span>
                                    <span>🌸 Giá cả</span>
                                    <span>🍲 Chất lượng món</span>
                                    <span>⏰ Tốc độ phục vụ</span>
                                    <span>⚡ Trải nghiệm</span>
                                </div>
                            </article>

                            {store.comments.map((comment) => (
                                <UserCommentCard key={comment.id} comment={comment} />
                            ))}
                        </section>
                    </div>
                </div>
            </section>

            {isReviewModalOpen && (
                <div
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 px-4 py-8"
                    onClick={() => setIsReviewModalOpen(false)}
                >
                    <div
                        className="relative flex h-[min(86vh,980px)] w-full max-w-[1380px] overflow-hidden rounded-[18px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.2)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setIsReviewModalOpen(false)}
                            className="absolute right-6 top-4 z-20 text-[50px] leading-none text-black transition hover:opacity-65"
                            aria-label="Đóng bài review"
                        >
                            ×
                        </button>

                        <aside className="w-[440px] shrink-0 border-r border-[#dfe5dd] bg-white p-8">
                            <img src={store.coverImage} alt={store.title} className="h-[238px] w-full rounded-[14px] object-cover" />
                            <div className="mt-5 flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f59e0b] text-[20px] font-bold text-white">
                                    {store.score}
                                </div>
                                <h2 className="text-[28px] font-bold leading-tight text-black">{store.title}</h2>
                            </div>
                        </aside>

                        <div className="min-w-0 flex-1 overflow-y-auto bg-white">
                            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#ececec] bg-[#f6f5f4] px-8 py-4">
                                <div className="flex items-center gap-0 text-[18px]">
                                    <button className="border-b-2 border-[#ff3b30] px-5 py-3 font-medium text-[#ff3b30]">Mới nhất 20</button>
                                    <button className="px-5 py-3 text-[#5f5f5f]">Thịnh hành 20</button>
                                    <button className="px-5 py-3 text-[#5f5f5f]">Cũ nhất 20</button>
                                </div>
                                <button className="rounded-[8px] border border-[#d1d5db] bg-white px-5 py-3 text-[16px] text-[#4b5563]">
                                    Lượng tương tác ⌄
                                </button>
                            </div>

                            <div className="space-y-0 px-8 py-4">
                                {[...store.reviewCards, ...store.reviewCards].map((review, index) => (
                                    <article key={`${review.id}-${index}`} className="border-b border-[#dbdbdb] py-5 last:border-b-0">
                                        <div className="flex gap-5">
                                            <div className="flex w-10 shrink-0 flex-col items-center">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e5e7eb] text-lg">👤</div>
                                                <div className="mt-3 h-full w-px bg-[#d8dde3]" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-[18px] font-bold text-[#172554]">{review.author}</h3>
                                                </div>
                                                <p className="text-sm text-[#6b7280]">{review.date}</p>
                                                <p className="mt-2 text-[16px] leading-9 text-[#444]">{review.excerpt}</p>

                                                <div className="mt-4 flex items-center gap-3 text-[15px] text-[#4b5563]">
                                                    <span>📍 {store.address}</span>
                                                </div>

                                                <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-3">
                                                    <img src={review.heroImage} alt={review.author} className="h-[162px] w-full rounded-[12px] object-cover" />
                                                    {review.gallery.slice(0, 2).map((image, imageIndex) => (
                                                        <img key={imageIndex} src={image} alt="" className="h-[162px] w-full rounded-[12px] object-cover" />
                                                    ))}
                                                </div>

                                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                                        <div className="flex items-center gap-6 text-[15px] text-[#4b5563]">
                                                            <button>♡ 2,4K</button>
                                                            <button>💬 415</button>
                                                            <button>↻ 159</button>
                                                            <button>▷ 51</button>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <button onClick={openLoginRequired} className="rounded-full border border-[#87b36f] px-4 py-2 text-sm font-medium text-[#5c8f3a]">Xem menu</button>
                                                            <button onClick={openLoginRequired} className="rounded-full border border-[#2f9e2f] px-4 py-2 text-sm font-medium text-[#2f9e2f]">Đặt món</button>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <LoginRequiredModal isOpen={isLoginRequiredOpen} onClose={() => setIsLoginRequiredOpen(false)} />
        </div>
    );
}
