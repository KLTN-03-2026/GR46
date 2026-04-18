'use client';
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from 'react';

import CommentModal from '@/features/home/CommentModal';
import { figmaFallbackAssets } from '@/shared/assets/figmaFallback';

const storeCover = figmaFallbackAssets.storeImage;
const ratingBadge = figmaFallbackAssets.ratingBadge;
const reviewerAvatar = figmaFallbackAssets.reviewerAvatarA;
const reviewGallery = figmaFallbackAssets.feedDishImage;
const likeIcon = figmaFallbackAssets.likeIcon;
const commentIcon = figmaFallbackAssets.commentIcon;
const topReviewerIcon = figmaFallbackAssets.topReviewerIcon;
const menuDish = figmaFallbackAssets.menuItemImage;

const storeCards = Array.from({ length: 2 }, (_, index) => ({
    id: `store-${index}`,
    title: 'Bún Bò Gốc Đa',
    area: 'Khu AAAAA',
    address: '4 Ngõ Gạch, Quận Hoàn Kiếm, Hà Nội',
    excerpt: 'Mình ăn ở quán khá nhiều lần nhưng hôm nay mới thử đặt ship trên website...',
}));

const menuGroups = Array.from({ length: 2 }, (_, index) => ({
    id: `menu-group-${index}`,
    storeName: 'Cơm gà, Bún, Phở - An Ký',
    rating: '4.7 (120)',
    dishes: [
        { id: `${index}-1`, name: 'Bún Bò Giò', price: '35.000 đ' },
        { id: `${index}-2`, name: 'Bún Bò Giò', price: '35.000 đ' },
        { id: `${index}-3`, name: 'Bún Bò Giò', price: '35.000 đ' },
    ],
}));

function Toggle({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onChange}
            aria-pressed={checked}
            className={`relative inline-flex h-5 w-9 rounded-full transition ${checked ? 'bg-[#5ca24d]' : 'bg-[#9aa09a]'}`}
        >
            <span
                className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition ${checked ? 'left-[18px]' : 'left-[2px]'}`}
            />
        </button>
    );
}

export default function SearchResultsClient({
    query,
}: {
    query: string;
}) {
    const [filters, setFilters] = useState({
        food: true,
        store: true,
        review: true,
        user: true,
        nearby: false,
        hot: false,
        bestSelling: false,
        mostReviewed: false,
    });
    const [districtMode, setDistrictMode] = useState(false);
    const [locationInput, setLocationInput] = useState('');
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    const visibleStoreCards = useMemo(() => {
        if (!filters.store) return [];
        if (filters.nearby && !locationInput.trim()) return storeCards.slice(0, 1);
        return storeCards;
    }, [filters.nearby, filters.store, locationInput]);

    const visibleMenuGroups = useMemo(() => {
        if (!filters.food) return [];
        if (filters.hot) return menuGroups.slice(0, 1);
        return menuGroups;
    }, [filters.food, filters.hot]);

    const showReviewSection = filters.review;
    const showUserHint = filters.user;

    return (
        <div className="bg-[#fafaf9]">
            <section className="grid w-full gap-10 px-4 pb-8 pt-0 sm:px-6 sm:pt-0 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-0 lg:pt-0">
                <aside className="bg-white pb-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                    <div className="px-8 py-6">
                        <h1 className="text-[32px] font-bold text-[#2c312b]">Kết quả tìm kiếm</h1>
                    </div>

                    <div className="space-y-8 px-6 py-6">
                        <div>
                            <div className="mb-4 flex items-center gap-3 rounded-[6px] bg-[#eef7ed] px-4 py-4">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3ab54a] text-white">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 3a9 9 0 1 0 9 9" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                </span>
                                <h2 className="text-[18px] font-bold text-[#679d55]">Tất cả</h2>
                            </div>

                            <div className="space-y-4 px-4">
                                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]">
                                    <span>Món ăn</span>
                                    <Toggle checked={filters.food} onChange={() => setFilters((current) => ({ ...current, food: !current.food }))} />
                                </div>
                                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]">
                                    <span>Cửa hàng</span>
                                    <Toggle checked={filters.store} onChange={() => setFilters((current) => ({ ...current, store: !current.store }))} />
                                </div>
                                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]">
                                    <span>Bài viết/ Review</span>
                                    <Toggle checked={filters.review} onChange={() => setFilters((current) => ({ ...current, review: !current.review }))} />
                                </div>
                                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]">
                                    <span>Người dùng</span>
                                    <Toggle checked={filters.user} onChange={() => setFilters((current) => ({ ...current, user: !current.user }))} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-4 flex items-center gap-3 rounded-[6px] bg-[#eef7ed] px-4 py-4">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3ab54a] text-white">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 3a9 9 0 1 0 9 9" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                </span>
                                <h2 className="text-[18px] font-bold text-[#679d55]">Khu vực</h2>
                            </div>

                            <div className="space-y-4 px-4">
                                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]">
                                    <span>Gần bạn</span>
                                    <Toggle checked={filters.nearby} onChange={() => setFilters((current) => ({ ...current, nearby: !current.nearby }))} />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setDistrictMode((current) => !current)}
                                    className="flex w-full items-center justify-between gap-4 text-left text-[18px] text-[#30362f]"
                                >
                                    <span>Theo quận/ khu vực</span>
                                    <span className={`text-[#7b837b] transition ${districtMode ? 'rotate-180' : ''}`}>⌄</span>
                                </button>
                            </div>

                            {districtMode && (
                                <div className="px-4 pt-4">
                                    <input
                                        value={locationInput}
                                        onChange={(event) => setLocationInput(event.target.value)}
                                        placeholder="Nhập địa điểm"
                                        className="w-full rounded-full border border-[#d4d5d4] bg-white px-5 py-3 text-[18px] text-[#525252] placeholder:text-[#8d8d8d]"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="mb-4 flex items-center gap-3 rounded-[6px] bg-[#eef7ed] px-4 py-4">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3ab54a] text-white">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 3a9 9 0 1 0 9 9" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                </span>
                                <h2 className="text-[18px] font-bold text-[#679d55]">Độ phổ biến</h2>
                            </div>

                            <div className="space-y-4 px-4">
                                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]">
                                    <span>Đang hot</span>
                                    <Toggle checked={filters.hot} onChange={() => setFilters((current) => ({ ...current, hot: !current.hot }))} />
                                </div>
                                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]">
                                    <span>Nhiều lượt mua</span>
                                    <Toggle checked={filters.bestSelling} onChange={() => setFilters((current) => ({ ...current, bestSelling: !current.bestSelling }))} />
                                </div>
                                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]">
                                    <span>Được review nhiều</span>
                                    <Toggle checked={filters.mostReviewed} onChange={() => setFilters((current) => ({ ...current, mostReviewed: !current.mostReviewed }))} />
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="space-y-10 lg:ml-[calc((100vw-1440px)/2+2rem)] lg:max-w-[1040px] lg:pr-8">
                    {showReviewSection && (
                        <article className="rounded-[8px] bg-white p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <img src={reviewerAvatar} alt="@vy.fooodieee" className="h-16 w-16 rounded-full object-cover" />
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-[22px] font-bold text-black">@vy.fooodieee</h2>
                                            <span className="inline-flex items-center gap-2 rounded-full bg-[#faeacd] px-4 py-1 text-xs font-bold text-black">
                                                <img src={topReviewerIcon} alt="" className="h-4 w-4 object-contain" />
                                                TOP REVIEWER
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm text-[#6c6c6c]">22 thg 02, 2026</p>
                                    </div>
                                </div>
                                <button className="rounded-full bg-[#258f22] px-6 py-2 text-sm font-bold text-white">Follow +</button>
                            </div>

                            <div className="my-6 h-px bg-[#d9ded7]" />

                            <p className="text-[17px] leading-8 text-black">
                                Sau lần ăn thử tại Nét Huế, mình cảm nhận quán {query} này rất đáng để thử. Nước dùng đậm đà, thơm mùi sả,
                                topping đầy đặn với thịt bò, chả Huế, gân bò mềm ngon và cả tiết bò tươi. Giá hơi nhỉnh một chút nhưng hoàn toàn tương xứng với chất lượng.
                            </p>
                            <p className="mt-4 text-[17px] leading-8 text-black">
                                Quán phục vụ khá nhanh, gọi món tầm 5–7 phút là có. Không gian tuy không quá rộng nhưng sạch sẽ, ấm cúng. Mình nghĩ đây sẽ là lựa chọn ổn cho bữa trưa.
                            </p>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <img src={reviewGallery} alt="Review món ăn" className="h-[240px] w-full rounded-[16px] object-cover" />
                                <img src={reviewGallery} alt="Review món ăn thứ hai" className="h-[240px] w-full rounded-[16px] object-cover" />
                            </div>

                            <div className="mt-5 flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-[#faeacd] px-4 py-2 text-sm font-bold text-[#f59e0b]">Ngon</span>
                                <span className="rounded-full bg-[#fad3cd] px-4 py-2 text-sm font-bold text-[#f50b0b]">Nên thử</span>
                                <span className="rounded-full bg-[#faeacd] px-4 py-2 text-sm font-bold text-[#f59e0b]">Đậm vị</span>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#d9ded7] pt-4">
                                <div className="flex items-center gap-8 text-sm font-bold text-[#6d6969]">
                                    <span className="inline-flex items-center gap-2"><img src={likeIcon} alt="" className="h-8 w-8 object-contain" />Yêu thích</span>
                                    <button
                                        type="button"
                                        onClick={() => setIsCommentModalOpen(true)}
                                        className="inline-flex items-center gap-2"
                                    >
                                        <img src={commentIcon} alt="" className="h-8 w-8 object-contain" />
                                        Bình luận
                                    </button>
                                </div>
                                <button className="rounded-full border border-[#258f22] bg-[#dcebdc] px-8 py-2 text-sm font-bold text-[#285e19]">Đặt món</button>
                            </div>
                        </article>
                    )}

                    {showUserHint && (
                        <div className="rounded-[8px] border border-[#dcebdc] bg-[#eef7ed] px-6 py-4 text-[16px] text-[#4c6b43]">
                            Kết quả người dùng liên quan tới <span className="font-bold">{query}</span> đang được bật.
                        </div>
                    )}

                    {visibleStoreCards.length > 0 && (
                        <section className="space-y-4">
                            <div className="grid gap-6 lg:grid-cols-2">
                                {visibleStoreCards.map((card) => (
                                    <article key={card.id} className="overflow-hidden rounded-[8px] bg-white shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
                                        <img src={storeCover} alt={card.title} className="h-[164px] w-full object-cover" />
                                        <div className="space-y-3 p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-black">{card.title}</h3>
                                                    <p className="mt-1 text-xs text-[#595959]">{card.address}</p>
                                                </div>
                                                <img src={ratingBadge} alt="Đánh giá" className="h-7 w-20 object-contain" />
                                            </div>
                                            <div className="border-y border-[#e6e6e6] py-3">
                                                <p className="text-sm font-medium text-black">{card.area}</p>
                                                <p className="mt-1 text-xs text-[#656565]">{card.excerpt}</p>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-[#717171]">
                                                <span>11</span>
                                                <span>58</span>
                                                <button className="rounded bg-[#ededed] px-3 py-1 text-[#9a9a9a]">Lưu</button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            <div className="rounded-[3px] bg-[#eaf8eb] py-3 text-center text-[22px] text-[#285e19]">Xem Thêm →</div>
                        </section>
                    )}

                    {visibleMenuGroups.map((group) => (
                        <section key={group.id} className="rounded-[8px] bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <img src={menuDish} alt={group.storeName} className="h-[84px] w-[126px] rounded-[8px] object-cover" />
                                    <div>
                                        <h3 className="text-[28px] font-medium text-black">{group.storeName}</h3>
                                        <div className="mt-2 h-px w-full bg-[#575757]" />
                                    </div>
                                </div>
                                <div className="text-[22px] font-bold text-[#f0a500]">{group.rating}</div>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                {group.dishes.map((dish) => (
                                    <article key={dish.id} className="text-center">
                                        <img src={menuDish} alt={dish.name} className="h-[165px] w-full rounded-[10px] object-cover" />
                                        <h4 className="mt-3 text-[18px] text-black">{dish.name}</h4>
                                        <p className="mt-1 text-[20px] font-bold text-[#d71414]">{dish.price}</p>
                                    </article>
                                ))}
                            </div>

                            <div className="mt-5 flex justify-end">
                                <button className="rounded bg-[#fce8e8] px-8 py-3 text-sm text-[#d71414]">Xem Thêm →</button>
                            </div>
                        </section>
                    ))}

                    {!showReviewSection && visibleStoreCards.length === 0 && visibleMenuGroups.length === 0 && !showUserHint && (
                        <div className="rounded-[8px] bg-white px-8 py-12 text-center text-[18px] text-[#6b7280] shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                            Không có kết quả phù hợp với bộ lọc hiện tại.
                        </div>
                    )}
                </div>
            </section>

            <CommentModal isOpen={isCommentModalOpen} onClose={() => setIsCommentModalOpen(false)} />
        </div>
    );
}
