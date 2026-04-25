'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import LoginRequiredModal from '@/components/Auth/LoginRequiredModal';

import type { ExploreCategory, ExplorePageData, ExploreStoreCard } from './data';

const addressSuggestions = [
    {
        id: '1',
        title: 'Clb Đa Nẵng',
        address: '143 Nguyễn Du, P.Bến Thành, Q.1, Hồ Chí Minh',
    },
    {
        id: '2',
        title: 'Sân Tập Luyện Bóng Đá Năng Khiếu TP.HCM',
        address: '215 Lý Thường Kiệt, P.15, Q.11, Hồ Chí Minh',
    },
    {
        id: '3',
        title: 'Da Nang Tour Packages',
        address: '1 Đường Cống Quỳnh, P.Phạm Ngũ Lão, Q.1, Hồ Chí Minh',
    },
];

function SectionHeading({
    title,
    accent,
}: {
    title: string;
    accent?: string;
}) {
    return (
        <h2 className="text-[34px] font-bold leading-tight text-[#172554] md:text-[42px]">
            {title}{' '}
            {accent && <span className="text-[#e32222]">{accent}</span>}
        </h2>
    );
}

function CategoryCard({ category }: { category: ExploreCategory }) {
    return (
        <article className="group relative overflow-hidden rounded-[18px] shadow-[0_8px_22px_rgba(8,15,52,0.08)]">
            <img src={category.image} alt={category.title} className="h-[160px] w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,20,49,0.02)_20%,rgba(0,0,0,0.65)_100%)]" />
            <h3 className="absolute bottom-3 left-4 text-[18px] font-bold text-white">{category.title}</h3>
        </article>
    );
}

function StoreCard({
    store,
    emphasizeStatus = false,
    variant = 'default',
}: {
    store: ExploreStoreCard;
    emphasizeStatus?: boolean;
    variant?: 'default' | 'search';
}) {
    const statusColor = store.status.includes('Đóng')
        ? 'text-[#f05023]'
        : store.status.includes('Mở cửa')
            ? 'text-[#2f71ff]'
            : 'text-white';

    if (variant === 'search') {
        const ratingText = store.rating ?? store.meta ?? '4,8 (999+)';

        return (
            <Link href={`/explore/store/${store.id}`} className="block">
                <article className="overflow-hidden rounded-[14px] border border-[#dbe2ea] bg-white">
                    <div className="relative overflow-hidden border-b border-[#e8edf2]">
                        <img src={store.image} alt={store.title} className="h-[236px] w-full object-cover" />
                        <div className="pointer-events-none absolute left-0 top-5 rounded-r-full bg-[#2dc35c] px-4 py-1.5 text-[12px] font-bold tracking-[0.05em] text-white">
                            PROMO
                        </div>
                        <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[21px] text-[#91a0be] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
                            ♡
                        </button>
                    </div>

                    <div className="px-5 pb-4 pt-5">
                        <h3 className="line-clamp-2 text-[20px] font-bold leading-[1.2] text-[#20315f]">
                            {store.title}
                        </h3>
                        <p className="mt-3 truncate text-[15px] text-[#76829b]">{store.address}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-1 text-[15px] text-[#69758d]">
                            <span>📍 {store.distance ?? '1.4 km'}</span>
                            <span className="text-[#f0a500]">★</span>
                            <span>{ratingText}</span>
                        </div>

                        <div className="mt-9 border-t border-[#edf1f5] pt-5">
                            <div className="flex items-center justify-between gap-4">
                                <p className="truncate text-[15px] text-[#42516d]">
                                    {store.featuredItem ?? 'Món nổi bật'}
                                </p>
                                <p className="shrink-0 text-[16px] font-bold text-[#31486d]">
                                    {store.price ?? '50.000đ'}
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        );
    }

    return (
        <Link href={`/explore/store/${store.id}`} className="block">
            <article className="group rounded-[18px] bg-white">
                <div className="relative overflow-hidden rounded-[18px] shadow-[0_8px_22px_rgba(8,15,52,0.06)]">
                    <img src={store.image} alt={store.title} className="h-[196px] w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                    <div className="pointer-events-none absolute left-0 top-3 rounded-r-full bg-[#36c15c] px-3 py-1 text-[13px] font-bold tracking-[0.05em] text-white">
                        PROMO
                    </div>
                    <button className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[20px] text-[#91a0be] shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition hover:text-[#f05023]">
                        ♡
                    </button>
                    {emphasizeStatus ? (
                        <div className={`absolute bottom-0 left-0 bg-white/96 px-4 py-2 text-[13px] font-semibold ${statusColor}`}>
                            {store.status}
                        </div>
                    ) : null}
                </div>

                <div className="px-1 pb-1 pt-4">
                    {!emphasizeStatus && (
                        <p className={`text-[13px] font-semibold ${statusColor}`}>
                            {store.status}
                        </p>
                    )}
                    <h3 className="mt-1 line-clamp-2 text-[20px] font-bold leading-[1.15] text-[#20315f]">
                        {store.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[15px] leading-6 text-[#7b86a6]">{store.address}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[15px] text-[#6a738c]">
                        {store.distance && <span className="inline-flex items-center gap-1">📍 {store.distance}</span>}
                        {store.rating && <span className="inline-flex items-center gap-1 text-[#f0a500]">★ {store.rating}</span>}
                        {!store.distance && !store.rating && store.meta && <span className="inline-flex items-center gap-1 text-[#f0a500]">★ {store.meta}</span>}
                    </div>
                </div>
            </article>
        </Link>
    );
}

function SectionWithButton({
    title,
    accent,
    items,
    emphasizeStatus,
    visibleCount,
    onViewMore,
}: {
    title: string;
    accent?: string;
    items: ExploreStoreCard[];
    emphasizeStatus?: boolean;
    visibleCount: number;
    onViewMore: () => void;
}) {
    const visibleItems = items.slice(0, visibleCount);
    const hasMore = visibleItems.length < items.length;

    return (
        <section className="space-y-8">
            <SectionHeading title={title} accent={accent} />
            <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
                {visibleItems.map((item, index) => (
                    <StoreCard key={`${item.id}-${index}`} store={item} emphasizeStatus={emphasizeStatus} />
                ))}
            </div>
            {hasMore ? (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={onViewMore}
                        className="min-w-[280px] rounded-[16px] border border-[#3b82f6] px-10 py-4 text-[22px] font-semibold text-[#2f71ff] transition hover:bg-[#f5f9ff]"
                    >
                        Xem thêm
                    </button>
                </div>
            ) : null}
        </section>
    );
}

export default function ExplorePageClient({ data }: { data: ExplorePageData }) {
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isAddressOpen, setIsAddressOpen] = useState(false);
    const [isFoodSearchOpen, setIsFoodSearchOpen] = useState(false);
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    const [recentFoodSearches, setRecentFoodSearches] = useState(['mì trộn']);
    const [activeSearchResult, setActiveSearchResult] = useState<string | null>(null);
    const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState(false);
    const [visibleNearbyCount, setVisibleNearbyCount] = useState(8);
    const [visibleRecommendationCount, setVisibleRecommendationCount] = useState(8);
    const [visibleTopReviewerCount, setVisibleTopReviewerCount] = useState(8);
    const [visibleCategoryCount, setVisibleCategoryCount] = useState(8);
    const [visibleSearchCount, setVisibleSearchCount] = useState(8);
    const addressRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (addressRef.current && !addressRef.current.contains(event.target as Node)) {
                setIsAddressOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isFoodSearchOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.setTimeout(() => searchInputRef.current?.focus(), 0);

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsFoodSearchOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFoodSearchOpen]);

    const keyword = deliveryAddress.trim().toLowerCase();
    const filteredAddressSuggestions = !keyword
        ? addressSuggestions
        : addressSuggestions.filter((item) =>
            `${item.title} ${item.address}`.toLowerCase().includes(keyword),
        );
    const hotKeywords = [
        'mì cay',
        'bún đậu mắm tôm',
        'bánh tráng',
        'gà rán',
        'cá viên chiên',
        'cơm tấm',
        'trà sữa',
        'jollibee',
        'chân gà sốt thái',
        'bún bò',
        'gà ủ muối',
        'bánh tráng trộn',
        'gà nướng',
        'cơm',
        'cháo ếch',
        'mì trộn',
        'bánh mì',
        'ốc',
        'cơm gà',
        'cháo',
        'cơm gà xối mỡ',
        'tacos',
        'hồng trà ngô gia',
        'súp cua',
        'mỳ cay',
        'phở',
    ];
    const searchSectionTitleClass = 'text-[12px] font-bold uppercase tracking-[0.12em] text-[#73819b] sm:text-[13px]';
    const searchChipClass = 'rounded-[999px] border border-[#d9e2f0] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#44506b] transition hover:border-[#c5d5ee] hover:bg-[#f7faff] sm:px-4 sm:text-[14px]';
    const activeCategory = activeCategoryId
        ? data.categories.find((category) => category.id === activeCategoryId) ?? null
        : null;
    const allStores = [...data.nearby, ...data.recommendations, ...data.topReviewerPicks];
    const categoryResults = activeCategoryId
        ? allStores.filter(
            (item) => item.categoryId === activeCategoryId,
        )
        : [];
    const normalizedSearchKeyword = activeSearchResult?.trim().toLowerCase() ?? '';
    const searchResults = normalizedSearchKeyword
        ? allStores.filter((item) =>
            `${item.title} ${item.address}`.toLowerCase().includes(normalizedSearchKeyword),
        )
        : [];
    const hasSearchResults = searchResults.length > 0;

    const commitFoodSearch = (value: string) => {
        const trimmedValue = value.trim();
        if (!trimmedValue) return;

        setSearchKeyword(trimmedValue);
        setActiveSearchResult(trimmedValue);
        setActiveCategoryId(null);
        setVisibleSearchCount(8);
        setRecentFoodSearches((current) => [trimmedValue, ...current.filter((item) => item !== trimmedValue)].slice(0, 6));
        setIsFoodSearchOpen(false);
    };

    useEffect(() => {
        setVisibleCategoryCount(8);
    }, [activeCategoryId]);

    const visibleSearchResults = searchResults.slice(0, visibleSearchCount);
    const hasMoreSearchResults = visibleSearchResults.length < searchResults.length;
    const visibleCategoryResults = categoryResults.slice(0, visibleCategoryCount);
    const hasMoreCategoryResults = visibleCategoryResults.length < categoryResults.length;

    return (
        <div className="bg-white">
            <section className="mx-auto w-full max-w-[1440px] px-5 py-12 md:px-10 lg:px-16">
                <div className="grid gap-x-12 gap-y-6 pb-12 md:grid-cols-2">
                    <div className="space-y-5">
                        {!activeCategory && (
                            <h1 className="whitespace-nowrap text-[28px] font-bold leading-[1.18] text-[#172554] md:text-[34px]">
                                Địa chỉ bạn muốn giao món
                            </h1>
                        )}
                        <div ref={addressRef} className="relative w-full max-w-[640px]">
                            <div className={`flex h-[64px] w-full items-center gap-4 rounded-[14px] border px-6 shadow-[0_4px_14px_rgba(15,23,42,0.04)] transition ${isAddressOpen ? 'border-[#2f71ff] shadow-[0_0_0_3px_rgba(47,113,255,0.12)]' : 'border-[#d8dde8]'}`}>
                                <span className="text-[22px] text-[#6d778f]">📍</span>
                                <input
                                    value={deliveryAddress}
                                    onFocus={() => setIsAddressOpen(true)}
                                    onChange={(event) => {
                                        setDeliveryAddress(event.target.value);
                                        setIsAddressOpen(true);
                                    }}
                                    placeholder="Nhập địa chỉ của bạn"
                                    className="w-full text-[18px] text-[#1f2a44] placeholder:text-[#9ca3af]"
                                />
                                {deliveryAddress ? (
                                    <button
                                        type="button"
                                        onClick={() => setDeliveryAddress('')}
                                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5f6e79] text-[28px] leading-none text-white transition hover:bg-[#4e5d69]"
                                    >
                                        ×
                                    </button>
                                ) : null}
                                <button className="text-[22px] text-[#7b86a6]">⌖</button>
                            </div>

                            {isAddressOpen && (
                                <div className="absolute left-0 top-[calc(100%+14px)] z-20 w-full overflow-hidden rounded-[20px] bg-white shadow-[0_24px_40px_rgba(15,23,42,0.12)]">
                                    {filteredAddressSuggestions.map((item, index) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => {
                                                setDeliveryAddress(item.title);
                                                setIsAddressOpen(false);
                                            }}
                                            className={`flex w-full items-start gap-5 px-6 py-5 text-left transition hover:bg-[#f8fbff] ${index !== filteredAddressSuggestions.length - 1 ? 'border-b border-[#eef2f6]' : ''}`}
                                        >
                                            <span className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eef2f8] text-[24px] text-[#6d778f]">
                                                📍
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block truncate text-[20px] font-semibold text-[#20315f]">
                                                    {item.title}
                                                </span>
                                                <span className="mt-1 block truncate text-[16px] text-[#64748b]">
                                                    {item.address}
                                                </span>
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-5">
                        {!activeCategory && (
                            <h2 className="whitespace-nowrap text-[28px] font-bold leading-[1.18] text-[#172554] md:text-[34px]">
                                Bạn muốn tìm kiếm món/ nhà hàng
                            </h2>
                        )}
                        <button
                            type="button"
                            onClick={() => setIsFoodSearchOpen(true)}
                            className="flex h-[64px] w-full max-w-[640px] items-center gap-4 rounded-[14px] border border-[#d8dde8] px-6 text-left shadow-[0_4px_14px_rgba(15,23,42,0.04)]"
                        >
                            <span className="text-[26px] text-black">⌕</span>
                            <span className={`text-[18px] ${searchKeyword ? 'text-[#1f2a44]' : 'text-[#b2b8c5]'}`}>
                                {searchKeyword || 'Nhập món/ nhà hàng'}
                            </span>
                        </button>
                    </div>
                </div>

                {activeSearchResult ? (
                    <section className="space-y-8">
                        <div className="space-y-5">
                            <h2 className="text-[34px] font-bold leading-[1.15] text-[#172554] md:text-[48px]">
                                Kết quả cho <span className="text-[#f59e0b]">{activeSearchResult}</span> gần{' '}
                                <span className="text-[#172554]">clb Đa Nẵng</span>
                            </h2>

                            <div className="flex flex-wrap items-center gap-4">
                                <button className="rounded-[18px] bg-[#18183f] px-10 py-3 text-[18px] font-bold text-white">
                                    Tất cả
                                </button>
                                <button className="rounded-[18px] bg-[#d9d9d9] px-10 py-3 text-[18px] font-bold text-white">
                                    Nhà hàng
                                </button>
                                <button className="rounded-[18px] bg-[#d9d9d9] px-10 py-3 text-[18px] font-bold text-white">
                                    Lựa chọn của Top Reviewer
                                </button>
                            </div>
                            <div className="h-px bg-[#cfd5df]" />
                        </div>

                        {hasSearchResults ? (
                            <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
                                {visibleSearchResults.map((item, index) => (
                                    <StoreCard
                                        key={`${item.id}-${index}`}
                                        store={item}
                                        variant="search"
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-[18px] border border-[#d7dfeb] bg-[#f8fbff] px-8 py-10 text-center text-[22px] font-semibold text-[#61708d]">
                                Không có kết quả cho món này
                            </div>
                        )}

                        {hasMoreSearchResults ? (
                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => setVisibleSearchCount((value) => value + 8)}
                                    className="min-w-[280px] rounded-[16px] border border-[#3b82f6] px-10 py-4 text-[22px] font-semibold text-[#2f71ff] transition hover:bg-[#f5f9ff]"
                                >
                                    Xem thêm
                                </button>
                            </div>
                        ) : null}
                    </section>
                ) : activeCategory ? (
                    <section className="space-y-8">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-[34px] font-bold uppercase tracking-[0.02em] text-[#172554] md:text-[50px]">
                                {activeCategory.title}
                            </h2>
                            <button
                                type="button"
                                onClick={() => setActiveCategoryId(null)}
                                className="rounded-full border border-[#d8dde8] px-5 py-2 text-sm font-semibold text-[#64748b] transition hover:bg-[#f7faff]"
                            >
                                Xem tất cả
                            </button>
                        </div>
                        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
                            {visibleCategoryResults.map((item, index) => (
                                <StoreCard key={`${item.id}-${index}`} store={item} emphasizeStatus />
                            ))}
                        </div>
                        {hasMoreCategoryResults ? (
                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => setVisibleCategoryCount((value) => value + 8)}
                                    className="min-w-[280px] rounded-[16px] border border-[#3b82f6] px-10 py-4 text-[22px] font-semibold text-[#2f71ff] transition hover:bg-[#f5f9ff]"
                                >
                                    Xem thêm
                                </button>
                            </div>
                        ) : null}
                    </section>
                ) : (
                    <>
                        <section className="space-y-8 pb-16">
                            <SectionHeading title="Bộ sưu tập món ăn" />
                            <div className="grid gap-6 md:grid-cols-[repeat(4,minmax(0,1fr))_68px]">
                                {data.categories.map((category) => (
                                    <button key={category.id} type="button" onClick={() => setActiveCategoryId(category.id)} className="text-left">
                                        <CategoryCard category={category} />
                                    </button>
                                ))}
                                <button className="hidden h-[160px] items-center justify-center rounded-[18px] bg-[#f4f7fb] text-[34px] text-[#67748d] shadow-[0_8px_22px_rgba(8,15,52,0.05)] md:flex">
                                    ›
                                </button>
                            </div>
                        </section>

                        <SectionWithButton
                            title="Quán ngon quanh đây"
                            items={data.nearby}
                            visibleCount={visibleNearbyCount}
                            onViewMore={() => setVisibleNearbyCount((value) => value + 8)}
                        />

                        <div className="h-16" />

                        <section className="space-y-8">
                            <SectionHeading title="Có thể bạn sẽ thích" />
                            <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
                                {data.recommendations.slice(0, visibleRecommendationCount).map((item, index) => (
                                    <StoreCard key={`${item.id}-${index}`} store={item} />
                                ))}
                            </div>
                            {visibleRecommendationCount < data.recommendations.length ? (
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setVisibleRecommendationCount((value) => value + 8)}
                                        className="min-w-[280px] rounded-[16px] border border-[#3b82f6] px-10 py-4 text-[22px] font-semibold text-[#2f71ff] transition hover:bg-[#f5f9ff]"
                                    >
                                        Xem thêm
                                    </button>
                                </div>
                            ) : null}
                        </section>

                        <div className="h-16" />

                        <SectionWithButton
                            title="Những món được đánh giá cao bởi"
                            accent="TOP REVIEWER"
                            items={data.topReviewerPicks}
                            emphasizeStatus
                            visibleCount={visibleTopReviewerCount}
                            onViewMore={() => setVisibleTopReviewerCount((value) => value + 8)}
                        />
                    </>
                )}
            </section>

            {isFoodSearchOpen && (
                <div className="fixed inset-0 z-[70] bg-[rgba(15,23,42,0.5)] px-4 py-4 backdrop-blur-[3px] sm:px-6 sm:py-6">
                    <div className="mx-auto flex min-h-full max-w-[720px] items-center justify-center">
                        <div className="relative w-full rounded-[20px] border border-[#e6ebf3] bg-white p-4 shadow-[0_32px_80px_rgba(15,23,42,0.22)] sm:p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a96ad]">
                                        Tìm kiếm nhanh
                                    </p>
                                    <h2 className="mt-1.5 text-[20px] font-bold leading-[1.2] text-[#1d2c4f] sm:text-[22px]">
                                        BẠN MUỐN TÌM KIẾM MÓN GÌ?
                                    </h2>
                                    <p className="mt-1.5 text-[13px] text-[#7d8aa5] sm:text-[14px]">
                                        Chọn nhanh món đang hot hoặc nhập từ khóa để tìm quán phù hợp.
                                    </p>
                                </div>

                                <button
                            type="button"
                            onClick={() => setIsFoodSearchOpen(false)}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#e1e7f0] bg-white text-[22px] leading-none text-[#31405f] transition hover:bg-[#f5f8fc]"
                            aria-label="Đóng tìm kiếm"
                        >
                            ×
                        </button>
                            </div>

                        <div className="mt-4 rounded-[14px] border border-[#e7edf5] bg-[#f8fbff] p-2.5 sm:p-3">
                            <div className="flex h-[48px] items-center gap-3 rounded-[12px] bg-white px-4 shadow-[inset_0_0_0_1px_rgba(223,230,240,0.85)] sm:h-[50px]">
                            <span className="text-[28px] text-[#61708d]">⌕</span>
                            <input
                                ref={searchInputRef}
                                value={searchKeyword}
                                onChange={(event) => setSearchKeyword(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        commitFoodSearch(searchKeyword);
                                    }
                                }}
                                placeholder="Tìm món ăn hoặc nhà hàng"
                                className="w-full bg-transparent text-[14px] font-medium text-[#223252] outline-none placeholder:font-normal placeholder:text-[#9aa6bb] sm:text-[15px]"
                            />
                        </div>

                        </div>

                        <div className="mt-4 rounded-[14px] border border-[#edf2f7] bg-white p-3.5 sm:p-4">
                            <div className="flex items-center justify-between gap-4">
                            <h3 className={searchSectionTitleClass}>
                                Tìm kiếm gần đây
                            </h3>
                            <button
                                type="button"
                                onClick={() => setRecentFoodSearches([])}
                                className="text-[14px] font-semibold text-[#2f71ff] transition hover:opacity-75"
                            >
                                Xóa hết
                            </button>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2.5">
                            {recentFoodSearches.length > 0 ? recentFoodSearches.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => {
                                        setSearchKeyword(item);
                                        commitFoodSearch(item);
                                    }}
                                    className={searchChipClass}
                                >
                                    {item}
                                </button>
                            )) : (
                                <p className="text-[17px] text-[#9aa4b8]">Chưa có tìm kiếm gần đây.</p>
                            )}
                        </div>
                        </div>

                        <div className="mt-3 rounded-[14px] border border-[#edf2f7] bg-[#fbfcfe] p-3.5 sm:p-4">
                            <h3 className={searchSectionTitleClass}>
                                Món gì đang hot
                            </h3>
                            <p className="mt-1 text-[12px] text-[#97a3b8] sm:text-[13px]">
                                Gợi ý phổ biến để thao tác nhanh hơn.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2.5">
                                {hotKeywords.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => {
                                            setSearchKeyword(item);
                                            commitFoodSearch(item);
                                        }}
                                        className={searchChipClass}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            )}

            <LoginRequiredModal isOpen={isLoginRequiredOpen} onClose={() => setIsLoginRequiredOpen(false)} />
        </div>
    );
}
