'use client';
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import LoginRequiredModal from '@/components/Auth/LoginRequiredModal';
import { useAuth } from '@/shared/AuthContext';
import { emitUserCartRefreshEvent, USER_CART_REFRESH_EVENT } from '@/shared/cartEvents';
import { userCommerceApi } from '@/shared/userCommerceApi';

import type { StoreDetailData } from './data';

type MenuItem = StoreDetailData['menuItems'][number];
type StoreCartSummaryItem = {
    id: number;
    name: string;
    quantity: number;
    thanhTien: number;
};
type CartApiItem = {
    id?: number | string;
    id_mon_an?: number | string;
    so_luong?: number | string;
    gia?: number | string;
};
type CartApiGroup = {
    items?: CartApiItem[];
};
type SearchDishCandidate = {
    id?: number | string;
    ten_mon?: string;
};

type DishOption = {
    id: string;
    label: string;
    extraPrice: number;
};

const NOODLE_OPTIONS: DishOption[] = [
    { id: 'bun-to', label: 'Sợi bún to', extraPrice: 0 },
    { id: 'bun-nho', label: 'Sợi bún nhỏ', extraPrice: 0 },
];

const PACKAGING_OPTIONS: DishOption[] = [
    { id: 'dong-goi-thuong', label: 'Đựng túi bóng', extraPrice: 0 },
    { id: 'dong-goi-to-dua', label: 'Đựng túi bóng + Tô đũa muỗng', extraPrice: 2000 },
];

function parseCurrency(value: string) {
    const normalized = value.replace(/[^\d]/g, '');
    return Number(normalized || 0);
}

function formatCurrency(amount: number) {
    return `${amount.toLocaleString('vi-VN')}đ`;
}

function normalizeText(value: string) {
    return value
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .trim();
}

function QuickAction({ label, onClick }: { label: string; onClick?: () => void }) {
    const clickable = typeof onClick === 'function';
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={!clickable}
            className={`rounded-[8px] bg-white px-6 py-3 text-[15px] font-medium text-[#4b5563] shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition ${
                clickable ? 'hover:bg-[#f8fafc]' : 'cursor-not-allowed opacity-60'
            }`}
        >
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
    onOrderNow,
}: StoreDetailData['reviewCards'][number] & {
    onRequireLogin?: () => void;
    onOrderNow?: () => void;
}) {
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
                    <span>◔ Bình luận</span>
                </div>
                <button
                    onClick={onOrderNow}
                    className="rounded-full border border-[#2f9e2f] px-6 py-2 text-sm font-bold text-[#2f9e2f] transition hover:bg-[#effced]"
                >
                    Đặt món
                </button>
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
                <span>♥ Thích</span>
                <span>💬 Thảo luận</span>
                <span>⚠ Báo lỗi</span>
            </div>
        </article>
    );
}

function DishOptionGroup({
    title,
    options,
    selected,
    onChange,
}: {
    title: string;
    options: DishOption[];
    selected: string;
    onChange: (value: string) => void;
}) {
    return (
        <section className="overflow-hidden rounded-[10px] border border-[#ececec]">
            <h4 className="bg-[#fcf9e4] px-4 py-3 text-[15px] font-medium text-[#616462]">{title}</h4>
            <div className="divide-y divide-[#ececec] bg-white">
                {options.map((option) => {
                    const isActive = selected === option.id;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => onChange(option.id)}
                            className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition hover:bg-[#fafafa]"
                        >
                            <div>
                                <p className="text-[16px] text-[#1f2937]">{option.label}</p>
                                <p className="text-sm text-[#6b7280]">{option.extraPrice === 0 ? '0 đ' : `+ ${formatCurrency(option.extraPrice)}`}</p>
                            </div>
                            <span
                                className={`flex h-6 w-6 items-center justify-center rounded-[7px] border text-xs font-bold ${
                                    isActive
                                        ? 'border-[#f59e0b] bg-[#f59e0b] text-white'
                                        : 'border-[#c8ccd3] bg-white text-transparent'
                                }`}
                            >
                                ✓
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

export default function StoreDetailPageClient({ store }: { store: StoreDetailData }) {
    const router = useRouter();
    const { dangNhap } = useAuth();
    const [activeSection, setActiveSection] = useState('top');
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState(false);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [menuKeyword, setMenuKeyword] = useState('');
    const [activeMenuCategory, setActiveMenuCategory] = useState('tat-ca');
    const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
    const [dishQuantity, setDishQuantity] = useState(1);
    const [selectedNoodle, setSelectedNoodle] = useState(NOODLE_OPTIONS[0].id);
    const [selectedPackaging, setSelectedPackaging] = useState(PACKAGING_OPTIONS[0].id);
    const [dishNote, setDishNote] = useState('');
    const [cartSummary, setCartSummary] = useState<StoreCartSummaryItem[]>([]);
    const [cartActionMessage, setCartActionMessage] = useState<string | null>(null);
    const [cartActionError, setCartActionError] = useState<string | null>(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const visibleMenu = useMemo(() => store.menuItems.slice(0, 10), [store.menuItems]);
    const openLoginRequired = () => setIsLoginRequiredOpen(true);

    const menuCategories = useMemo(
        () => [{ id: 'tat-ca', label: 'Tất cả' }, ...store.menuCategories],
        [store.menuCategories],
    );

    const modalMenuItems = useMemo(() => {
        const keyword = menuKeyword.trim().toLowerCase();
        return store.menuItems.filter((item) => {
            const matchCategory = activeMenuCategory === 'tat-ca' || item.categoryId === activeMenuCategory;
            const matchKeyword =
                keyword.length === 0 ||
                item.name.toLowerCase().includes(keyword) ||
                item.note.toLowerCase().includes(keyword);
            return matchCategory && matchKeyword;
        });
    }, [activeMenuCategory, menuKeyword, store.menuItems]);

    const categorySections = useMemo(() => {
        if (activeMenuCategory !== 'tat-ca') {
            const label =
                menuCategories.find((item) => item.id === activeMenuCategory)?.label ?? 'Thực đơn';
            return [{ id: activeMenuCategory, label, items: modalMenuItems }];
        }

        return store.menuCategories
            .map((category) => ({
                id: category.id,
                label: category.label,
                items: modalMenuItems.filter((item) => item.categoryId === category.id),
            }))
            .filter((section) => section.items.length > 0);
    }, [activeMenuCategory, menuCategories, modalMenuItems, store.menuCategories]);

    const loadStoreCartSummary = useCallback(async () => {
        if (!dangNhap) {
            setCartSummary([]);
            return;
        }

        try {
            const payload = (await userCommerceApi.layGioHang()) as {
                groups?: CartApiGroup[];
            };
            const groups = Array.isArray(payload?.groups) ? payload.groups : [];
            const menuMap = new Map(store.menuItems.map((item) => [String(item.id), item]));

            const mapped = groups
                .flatMap((group) =>
                    (Array.isArray(group?.items) ? group.items : []).map((item) => {
                        const monAnId = String(item?.id_mon_an ?? '');
                        const menuItem = menuMap.get(monAnId);
                        if (!menuItem) return null;

                        const soLuong = Number(item?.so_luong ?? 0);
                        const donGia = Number(item?.gia ?? parseCurrency(menuItem.price));
                        return {
                            id: Number(monAnId || String(item?.id ?? 0)),
                            name: menuItem.name,
                            quantity: soLuong,
                            thanhTien: donGia * soLuong,
                        } satisfies StoreCartSummaryItem;
                    }),
                )
                .filter(
                    (entry): entry is StoreCartSummaryItem =>
                        Boolean(entry) && entry.quantity > 0,
                );

            setCartSummary(mapped);
        } catch {
            setCartSummary([]);
        }
    }, [dangNhap, store.menuItems]);

    const cartTotal = useMemo(
        () => cartSummary.reduce((sum, item) => sum + item.thanhTien, 0),
        [cartSummary],
    );

    useEffect(() => {
        void loadStoreCartSummary();

        const onRefresh = () => {
            void loadStoreCartSummary();
        };
        window.addEventListener(USER_CART_REFRESH_EVENT, onRefresh);

        return () => {
            window.removeEventListener(USER_CART_REFRESH_EVENT, onRefresh);
        };
    }, [loadStoreCartSummary]);

    const selectedDishBasePrice = selectedDish ? parseCurrency(selectedDish.price) : 0;
    const selectedNoodlePrice =
        NOODLE_OPTIONS.find((option) => option.id === selectedNoodle)?.extraPrice ?? 0;
    const selectedPackagingPrice =
        PACKAGING_OPTIONS.find((option) => option.id === selectedPackaging)?.extraPrice ?? 0;
    const selectedDishTotal =
        (selectedDishBasePrice + selectedNoodlePrice + selectedPackagingPrice) * dishQuantity;

    const resolveBackendMonAnId = async (item: MenuItem) => {
        const numericId = Number(item.id);
        if (Number.isFinite(numericId) && numericId > 0) {
            return numericId;
        }

        const params = new URLSearchParams({
            loai: 'mon_an',
            tu_khoa: item.name,
            so_luong: '20',
        });
        const response = await fetch(`/api/user/tim-kiem?${params.toString()}`, {
            credentials: 'include',
        });

        const raw = await response.json().catch(() => null);
        const payload = ((raw as { data?: unknown } | null)?.data ?? raw) as
            | {
                  ket_qua?: {
                      mon_an?: {
                          du_lieu?: unknown;
                      };
                  };
              }
            | null;
        const rows = Array.isArray(payload?.ket_qua?.mon_an?.du_lieu)
            ? (payload.ket_qua.mon_an.du_lieu as SearchDishCandidate[])
            : [];
        if (rows.length === 0) {
            return null;
        }

        const targetName = normalizeText(item.name);
        const exact = rows.find(
            (candidate) =>
                normalizeText(String(candidate?.ten_mon ?? '')) === targetName,
        );
        if (exact?.id != null) {
            return Number(exact.id);
        }

        const partial = rows.find((candidate) =>
            normalizeText(String(candidate?.ten_mon ?? '')).includes(targetName),
        );
        if (partial?.id != null) {
            return Number(partial.id);
        }

        return Number(rows[0]?.id ?? 0) || null;
    };

    const addToCart = async (item: MenuItem, quantity = 1, note?: string) => {
        if (!dangNhap) {
            setIsLoginRequiredOpen(true);
            return false;
        }
        if (isAddingToCart) return false;

        setIsAddingToCart(true);
        setCartActionError(null);
        setCartActionMessage(null);

        try {
            const monAnId = await resolveBackendMonAnId(item);
            if (!monAnId) {
                setCartActionError(
                    'Món này chưa có dữ liệu backend để thêm vào giỏ hàng.',
                );
                return false;
            }

            await userCommerceApi.themVaoGioHang({
                id_mon_an: monAnId,
                so_luong: quantity,
                ghi_chu: note?.trim() || undefined,
            });
            await loadStoreCartSummary();
            setCartActionMessage('Đã thêm món vào giỏ hàng');
            emitUserCartRefreshEvent();
            return true;
        } catch (error) {
            setCartActionError(
                error instanceof Error ? error.message : 'Không thêm được món vào giỏ hàng',
            );
            return false;
        } finally {
            setIsAddingToCart(false);
        }
    };

    const openDishDetail = (item: MenuItem) => {
        setSelectedDish(item);
        setDishQuantity(1);
        setSelectedNoodle(NOODLE_OPTIONS[0].id);
        setSelectedPackaging(PACKAGING_OPTIONS[0].id);
        setDishNote('');
    };

    const openMenuModal = (item?: MenuItem) => {
        setIsReviewModalOpen(false);
        setIsMenuModalOpen(true);
        if (item) {
            openDishDetail(item);
        }
    };

    const closeMenuModal = () => {
        setIsMenuModalOpen(false);
        setSelectedDish(null);
    };

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

            setActiveSection((current) =>
                current === nextActiveSection ? current : nextActiveSection,
            );
        };

        updateActiveSection();
        window.addEventListener('scroll', updateActiveSection, { passive: true });
        window.addEventListener('resize', updateActiveSection);

        return () => {
            window.removeEventListener('scroll', updateActiveSection);
            window.removeEventListener('resize', updateActiveSection);
        };
    }, []);

    const hasOverlayOpen = isReviewModalOpen || isMenuModalOpen || Boolean(selectedDish);

    useEffect(() => {
        if (!hasOverlayOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;

            if (selectedDish) {
                setSelectedDish(null);
                return;
            }

            if (isMenuModalOpen) {
                closeMenuModal();
                return;
            }

            if (isReviewModalOpen) {
                setIsReviewModalOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [hasOverlayOpen, isMenuModalOpen, isReviewModalOpen, selectedDish]);

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
                                                <button
                                                    onClick={() => openMenuModal(item)}
                                                    className="mt-2 h-8 w-8 rounded-[8px] bg-[#ff5a2c] text-lg font-bold text-white"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => openMenuModal()}
                                className="w-full bg-[#ff5757] px-6 py-4 text-[16px] font-medium text-white"
                            >
                                Xem thêm và Đặt món →
                            </button>
                        </section>

                        <section id="reviews" className="space-y-6">
                            <div className="grid gap-6 xl:grid-cols-2">
                                {store.reviewCards.map((review) => (
                                    <ReviewerCard
                                        key={review.id}
                                        {...review}
                                        onRequireLogin={openLoginRequired}
                                        onOrderNow={() => openMenuModal()}
                                    />
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
                                                        <button onClick={() => openMenuModal()} className="rounded-full border border-[#87b36f] px-4 py-2 text-sm font-medium text-[#5c8f3a]">Xem menu</button>
                                                        <button onClick={() => openMenuModal()} className="rounded-full border border-[#2f9e2f] px-4 py-2 text-sm font-medium text-[#2f9e2f]">Đặt món</button>
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

            {isMenuModalOpen && (
                <div
                    className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 px-3 py-4 sm:px-6"
                    onClick={closeMenuModal}
                >
                    <div
                        className="relative flex h-[min(88vh,860px)] w-full max-w-[1180px] flex-col overflow-hidden rounded-[22px] bg-[#f1f2f1] shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={closeMenuModal}
                            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-[#111827] shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition hover:scale-105"
                            aria-label="Đóng thực đơn"
                        >
                            ×
                        </button>

                        <div className="border-b border-[#dde3da] bg-white px-4 py-4 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
                            <div className="grid gap-3 sm:gap-4 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
                                <img
                                    src={store.coverImage}
                                    alt={store.title}
                                    className="h-[112px] w-full rounded-[14px] object-cover sm:h-[132px] lg:h-[150px]"
                                />
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
                                        <h3 className="min-w-0 flex-1 truncate text-[22px] font-bold leading-tight text-[#151737] sm:text-[28px] lg:text-[32px]">
                                            {store.title}
                                        </h3>
                                        <span className="shrink-0 rounded-full bg-[#f4f8f3] px-3 py-1 text-[14px] font-semibold text-[#2f9e2f] sm:px-4 sm:text-[16px]">
                                            {store.views}
                                        </span>
                                    </div>
                                    <p className="mt-1.5 text-[15px] text-[#5a6556] sm:mt-2 sm:text-[16px] lg:text-[18px]">{store.subtitle}</p>
                                    <p className="mt-1 text-[15px] text-[#6b7280] sm:text-[16px] lg:text-[18px]">📍 {store.address}</p>
                                </div>
                            </div>

                            <div className="mt-3 flex flex-col gap-2.5 sm:mt-4 sm:gap-3">
                                <div className="flex items-center rounded-[14px] border border-[#d9d9d9] bg-white px-4 py-2.5">
                                    <input
                                        value={menuKeyword}
                                        onChange={(event) => setMenuKeyword(event.target.value)}
                                        placeholder="Tìm kiếm món"
                                        className="w-full border-none bg-transparent text-[15px] text-[#3f3f46] placeholder:text-[#a1a1aa] focus:outline-none sm:text-[16px]"
                                    />
                                    <span className="text-xl text-[#4b5563]">⌕</span>
                                </div>

                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {menuCategories.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => setActiveMenuCategory(category.id)}
                                            className={`shrink-0 rounded-[12px] px-4 py-1.5 text-[14px] font-semibold transition sm:px-5 sm:py-2 sm:text-[15px] ${
                                                activeMenuCategory === category.id
                                                    ? 'bg-[#151737] text-white'
                                                    : 'bg-[#d9d9d9] text-[#fafaf9] hover:bg-[#c8c8c8]'
                                            }`}
                                        >
                                            {category.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="min-h-0 flex-1 overflow-hidden px-4 py-4 sm:px-5 sm:py-4">
                            <div className="grid h-full gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
                                <div className="min-h-0 overflow-y-auto pr-1">
                                    {modalMenuItems.length === 0 ? (
                                        <div className="rounded-[16px] border border-dashed border-[#cfd8cc] bg-white px-5 py-16 text-center text-[#6b7280]">
                                            Chưa tìm thấy món phù hợp với bộ lọc hiện tại.
                                        </div>
                                    ) : (
                                        categorySections.map((section) => (
                                            <section key={section.id} className="mb-5">
                                                <h4 className="mb-2 text-[20px] font-bold text-[#151737]">{section.label}</h4>
                                                <div className="grid gap-3 md:grid-cols-2">
                                                    {section.items.map((item) => (
                                                        <article key={item.id} className="rounded-[12px] bg-white p-2.5 shadow-[0_5px_14px_rgba(0,0,0,0.07)]">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="h-[126px] w-full cursor-pointer rounded-[9px] object-cover"
                                                                onClick={() => openDishDetail(item)}
                                                            />
                                                            <div className="mt-2">
                                                                <div className="flex items-start justify-between gap-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => openDishDetail(item)}
                                                                        className="truncate text-left text-[16px] font-semibold leading-tight text-black hover:text-[#1f2937] sm:text-[17px]"
                                                                    >
                                                                        {item.name}
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => openDishDetail(item)}
                                                                        className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#d0d0d0] text-xs text-[#4b5563]"
                                                                        aria-label={`Xem chi tiết ${item.name}`}
                                                                    >
                                                                        ↗
                                                                    </button>
                                                                </div>
                                                                <p className="mt-0.5 text-[12px] text-[#babbba]">{item.note || 'Chú thích về món ăn nếu có'}</p>
                                                                <p className="mt-0.5 text-[12px] text-[#6b7280]">👍 1 | 🛒 50+ đã bán</p>
                                                            </div>
                                                            <div className="mt-1.5 flex items-center justify-between">
                                                                <p className="text-[18px] font-semibold leading-none text-[#f59e0b] sm:text-[20px]">{item.price}</p>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => void addToCart(item)}
                                                                    className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#f59e0b] text-[20px] font-bold leading-none text-white"
                                                                    aria-label={`Thêm ${item.name} vào giỏ`}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </article>
                                                    ))}
                                                </div>
                                            </section>
                                        ))
                                    )}
                                </div>

                                <aside className="min-h-0 overflow-y-auto rounded-[16px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                                    <h4 className="text-[28px] font-bold leading-tight text-[#151737]">Giỏ hàng của tôi</h4>
                                    {cartSummary.length === 0 ? (
                                        <div className="mt-4 rounded-[16px] bg-[#f8f9f8] px-4 py-10 text-center text-[#9ca3af]">
                                            Giỏ hàng hiện đang trống
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mt-4 space-y-3">
                                                {cartSummary.map((item) => (
                                                    <article key={`${item.id}-${item.name}`} className="rounded-[12px] border border-[#ececec] px-3 py-3">
                                                        <p className="text-sm font-semibold text-[#1f2937]">{item.name}</p>
                                                        <p className="text-sm text-[#6b7280]">SL: {item.quantity}</p>
                                                        <p className="mt-1 text-base font-bold text-[#f59e0b]">{formatCurrency(item.thanhTien)}</p>
                                                    </article>
                                                ))}
                                            </div>
                                            <div className="mt-6 border-t border-[#ececec] pt-4">
                                                <div className="flex items-center justify-between text-[#1f2937]">
                                                    <span className="font-semibold">Tổng cộng</span>
                                                    <span className="text-xl font-bold text-[#f59e0b]">{formatCurrency(cartTotal)}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => router.push('/checkout')}
                                                    className="mt-4 w-full rounded-[12px] bg-[#2f9e2f] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#257f25]"
                                                >
                                                    Tiến hành đặt món
                                                </button>
                                                {cartActionMessage ? (
                                                    <p className="mt-2 text-xs text-[#2f9e2f]">
                                                        {cartActionMessage}
                                                    </p>
                                                ) : null}
                                                {cartActionError ? (
                                                    <p className="mt-2 text-xs text-red-500">
                                                        {cartActionError}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </>
                                    )}
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedDish && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-3 py-4 sm:px-6"
                    onClick={() => setSelectedDish(null)}
                >
                    <div
                        className="relative w-full max-w-[700px] overflow-hidden rounded-[18px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.34)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedDish(null)}
                            className="absolute right-3 top-2 z-20 text-3xl leading-none text-[#111827]"
                            aria-label="Đóng chi tiết món"
                        >
                            ×
                        </button>

                        <div className="max-h-[min(82vh,680px)] overflow-y-auto">
                            <img src={selectedDish.image} alt={selectedDish.name} className="h-[170px] w-full object-cover sm:h-[200px]" />

                            <div className="px-4 pb-5 pt-4 sm:px-6">
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-[26px] font-semibold leading-tight text-black">{selectedDish.name}</h3>
                                        <p className="mt-1 text-[13px] text-[#616462]">Bún sợi to. Bún sợi nhỏ ghi chú giúp quán</p>
                                        <p className="text-[13px] text-[#616462]">400+ đã bán | 1 lượt thích</p>
                                    </div>
                                    <p className="text-[28px] font-semibold leading-none text-[#f59e0b]">{selectedDish.price}</p>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <DishOptionGroup
                                        title="Sợi bún (Vui lòng chọn 1 trong 2)"
                                        options={NOODLE_OPTIONS}
                                        selected={selectedNoodle}
                                        onChange={setSelectedNoodle}
                                    />

                                    <DishOptionGroup
                                        title="Cách đóng gói (Vui lòng chọn 1 trong 2)"
                                        options={PACKAGING_OPTIONS}
                                        selected={selectedPackaging}
                                        onChange={setSelectedPackaging}
                                    />

                                    <section className="rounded-[10px] border border-[#ececec] p-3">
                                        <label className="mb-2 flex items-center gap-2 text-[13px] font-medium text-[#616462]" htmlFor="dish-note">
                                            📝 Ghi chú cho quán
                                        </label>
                                        <textarea
                                            id="dish-note"
                                            value={dishNote}
                                            onChange={(event) => setDishNote(event.target.value)}
                                            placeholder="Ví dụ: bớt cay, không hành..."
                                            className="h-16 w-full resize-none rounded-[10px] border border-[#d9d9d9] px-3 py-2 text-[14px] text-[#374151] placeholder:text-[#babbba] focus:border-[#f59e0b] focus:outline-none"
                                        />
                                    </section>
                                </div>

                                <div className="mt-4 flex flex-col gap-3 rounded-[12px] bg-[#f8faf8] p-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setDishQuantity((value) => Math.max(value - 1, 1))}
                                            className="flex h-[36px] w-[40px] items-center justify-center rounded-[9px] bg-[#fceee7] text-[24px] font-medium text-black"
                                            aria-label="Giảm số lượng"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center text-[24px] font-medium text-black">{dishQuantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => setDishQuantity((value) => value + 1)}
                                            className="flex h-[36px] w-[40px] items-center justify-center rounded-[9px] bg-[#f59e0b] text-[24px] font-medium text-white"
                                            aria-label="Tăng số lượng"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={async () => {
                                            const success = await addToCart(
                                                selectedDish,
                                                dishQuantity,
                                                dishNote,
                                            );
                                            if (success) {
                                                setSelectedDish(null);
                                            }
                                        }}
                                        className="rounded-[10px] bg-[#f59e0b] px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-[#db8f08] disabled:opacity-70"
                                        disabled={isAddingToCart}
                                    >
                                        {isAddingToCart
                                            ? 'Đang thêm...'
                                            : `Thêm vào giỏ hàng - ${formatCurrency(selectedDishTotal)}`}
                                    </button>
                                </div>
                                {cartActionError ? (
                                    <p className="mt-3 text-sm text-red-500">{cartActionError}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <LoginRequiredModal isOpen={isLoginRequiredOpen} onClose={() => setIsLoginRequiredOpen(false)} />
        </div>
    );
}
