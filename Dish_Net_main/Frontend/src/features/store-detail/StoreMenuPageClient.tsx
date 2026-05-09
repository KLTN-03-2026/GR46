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
  cartItemId: number;
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

type ShareConv = {
  id: number;
  name: string;
  avatar?: string | null;
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

const MAX_DISTINCT_CART_ITEMS = 50;
const MAX_QUANTITY_PER_ITEM = 50;

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

export default function StoreMenuPageClient({ store }: { store: StoreDetailData }) {
  const router = useRouter();
  const { dangNhap } = useAuth();

  const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState(false);
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

  const [shareDish, setShareDish] = useState<MenuItem | null>(null);
  const [shareConversations, setShareConversations] = useState<ShareConv[]>([]);
  const [shareLoading, setShareLoading] = useState(false);
  const [shareSelectedId, setShareSelectedId] = useState<number | null>(null);
  const [shareSending, setShareSending] = useState(false);
  const [shareDone, setShareDone] = useState(false);

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
      const label = menuCategories.find((item) => item.id === activeMenuCategory)?.label ?? 'Thực đơn';
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
      const payload = (await userCommerceApi.layGioHang()) as { groups?: CartApiGroup[] };
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
              cartItemId: Number(item?.id ?? 0),
              name: menuItem.name,
              quantity: soLuong,
              thanhTien: donGia * soLuong,
            } satisfies StoreCartSummaryItem;
          }),
        )
        .filter((entry): entry is StoreCartSummaryItem => {
          if (!entry) return false;
          return entry.quantity > 0;
        });

      setCartSummary(mapped);
    } catch {
      setCartSummary([]);
    }
  }, [dangNhap, store.menuItems]);

  const cartTotal = useMemo(() => cartSummary.reduce((sum, item) => sum + item.thanhTien, 0), [cartSummary]);

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
  const selectedNoodlePrice = NOODLE_OPTIONS.find((option) => option.id === selectedNoodle)?.extraPrice ?? 0;
  const selectedPackagingPrice = PACKAGING_OPTIONS.find((option) => option.id === selectedPackaging)?.extraPrice ?? 0;
  const selectedDishTotal = (selectedDishBasePrice + selectedNoodlePrice + selectedPackagingPrice) * dishQuantity;

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
    if (rows.length === 0) return null;

    const targetName = normalizeText(item.name);
    const exact = rows.find((candidate) => normalizeText(String(candidate?.ten_mon ?? '')) === targetName);
    if (exact?.id != null) return Number(exact.id);

    const partial = rows.find((candidate) => normalizeText(String(candidate?.ten_mon ?? '')).includes(targetName));
    if (partial?.id != null) return Number(partial.id);

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
        setCartActionError('Món này chưa có dữ liệu backend để thêm vào giỏ hàng.');
        return false;
      }

      const cartPayload = (await userCommerceApi.layGioHang()) as { groups?: CartApiGroup[] };
      const groups = Array.isArray(cartPayload?.groups) ? cartPayload.groups : [];
      const allItems = groups.flatMap((group) => (Array.isArray(group?.items) ? group.items : []));
      const existing = allItems.find((cartItem) => Number(cartItem?.id_mon_an) === monAnId);
      const distinctCount = allItems.length;

      if (!existing && distinctCount >= MAX_DISTINCT_CART_ITEMS) {
        setCartActionError(`Giỏ hàng chỉ chứa tối đa ${MAX_DISTINCT_CART_ITEMS} món khác nhau.`);
        return false;
      }

      const currentQuantity = Number(existing?.so_luong ?? 0);
      if (currentQuantity + quantity > MAX_QUANTITY_PER_ITEM) {
        setCartActionError(`Mỗi món chỉ được tối đa ${MAX_QUANTITY_PER_ITEM} phần.`);
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
      setCartActionError(error instanceof Error ? error.message : 'Không thêm được món vào giỏ hàng');
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

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(`/explore/store/${store.id}`);
  };

  const openSharePopup = async (item: MenuItem) => {
    if (!dangNhap) {
      setIsLoginRequiredOpen(true);
      return;
    }
    setShareDish(item);
    setShareSelectedId(null);
    setShareDone(false);
    setShareLoading(true);
    try {
      const payload: any = await userCommerceApi.layDanhSachTroChuyen({ trang: 1, so_luong: 50 });
      const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
      setShareConversations(
        rows.map((r: any) => ({
          id: Number(r.id_cuoc_tro_chuyen),
          name: String(r?.doi_tac?.ten_hien_thi ?? 'Người dùng'),
          avatar: r?.doi_tac?.anh_dai_dien ?? null,
        })),
      );
    } catch {
      setShareConversations([]);
    } finally {
      setShareLoading(false);
    }
  };

  const handleSendShare = async () => {
    if (!shareSelectedId || !shareDish || shareSending) return;
    const dishUrl = `${window.location.origin}/explore/store/${store.id}/menu?mon=${encodeURIComponent(shareDish.id)}`;
    const message = `nguoi-dung đã chia sẻ một bài viết với bạn: ${dishUrl}`;
    setShareSending(true);
    try {
      await userCommerceApi.guiTinNhan(shareSelectedId, message);
      setShareDone(true);
      setTimeout(() => setShareDish(null), 1200);
    } catch {
      // ignore
    } finally {
      setShareSending(false);
    }
  };

  return (
    <div className="bg-[#f1f2f0] py-6">
      <section className="mx-auto w-full max-w-[1460px] px-2 sm:px-4 lg:px-5">
        <div className="overflow-hidden rounded-[22px] bg-[#f1f2f1] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
          <div className="border-b border-[#dde3da] bg-white px-4 py-4 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
            <div className="mb-3">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-[10px] border border-[#d8dfd4] bg-white px-3 py-1.5 text-sm text-[#374151]"
              >
                ← Quay lại cửa hàng
              </button>
            </div>
            <div className="grid gap-3 sm:gap-4 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
              <img
                src={store.coverImage}
                alt={store.title}
                className="h-[112px] w-full rounded-[14px] object-cover sm:h-[132px] lg:h-[150px]"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
                  <h1 className="min-w-0 flex-1 truncate text-[22px] font-bold leading-tight text-[#151737] sm:text-[28px] lg:text-[32px]">
                    {store.title}
                  </h1>
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
                      <h2 className="mb-2 text-[20px] font-bold text-[#151737]">{section.label}</h2>
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
                                  onClick={() => void openSharePopup(item)}
                                  className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#d0d0d0] text-[#4b5563] transition hover:border-[#f59e0b] hover:text-[#f59e0b]"
                                  aria-label={`Chia sẻ ${item.name}`}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
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
                <h2 className="text-[28px] font-bold leading-tight text-[#151737]">Giỏ hàng của tôi</h2>
                {cartSummary.length === 0 ? (
                  <div className="mt-4 rounded-[16px] bg-[#f8f9f8] px-4 py-10 text-center text-[#9ca3af]">
                    Giỏ hàng hiện đang trống
                  </div>
                ) : (
                  <>
                    <div className="mt-4 space-y-3">
                      {cartSummary.map((item) => (
                        <article key={`${item.id}-${item.name}`} className="flex items-start gap-2 rounded-[12px] border border-[#ececec] px-3 py-3">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-[#1f2937]">{item.name}</p>
                            <p className="text-sm text-[#6b7280]">SL: {item.quantity}</p>
                            <p className="mt-1 text-base font-bold text-[#f59e0b]">{formatCurrency(item.thanhTien)}</p>
                          </div>
                          <button
                            type="button"
                            aria-label={`Xoá ${item.name}`}
                            onClick={async () => {
                              try {
                                await userCommerceApi.xoaItemGioHang(item.cartItemId);
                                emitUserCartRefreshEvent();
                                await loadStoreCartSummary();
                              } catch {
                                // ignore
                              }
                            }}
                            className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[#9ca3af] transition hover:bg-red-50 hover:text-red-500"
                          >
                            ×
                          </button>
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
                        onClick={() => { sessionStorage.setItem('checkout_back', window.location.pathname); router.push('/checkout'); }}
                        className="mt-4 w-full rounded-[12px] bg-[#2f9e2f] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#257f25]"
                      >
                        Tiến hành đặt món
                      </button>
                      {cartActionMessage ? <p className="mt-2 text-xs text-[#2f9e2f]">{cartActionMessage}</p> : null}
                      {cartActionError ? <p className="mt-2 text-xs text-red-500">{cartActionError}</p> : null}
                    </div>
                  </>
                )}
              </aside>
            </div>
          </div>
        </div>
      </section>

      {selectedDish ? (
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

            <div className="flex max-h-[min(82vh,680px)] flex-col">
              <div className="overflow-y-auto">
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
                    <label className="mb-2 flex items-center gap-2 text-[13px] font-medium text-[#616462]" htmlFor="dish-note-page">
                      📝 Ghi chú cho quán
                    </label>
                    <textarea
                      id="dish-note-page"
                      value={dishNote}
                      onChange={(event) => setDishNote(event.target.value)}
                      placeholder="Ví dụ: bớt cay, không hành..."
                      className="h-16 w-full resize-none rounded-[10px] border border-[#d9d9d9] px-3 py-2 text-[14px] text-[#374151] placeholder:text-[#babbba] focus:border-[#f59e0b] focus:outline-none"
                    />
                  </section>
                </div>
                </div>
              </div>

              <div className="border-t border-[#ececec] bg-white px-4 pb-4 pt-3 sm:px-6">
                <div className="flex flex-col gap-3 rounded-[12px] bg-[#f8faf8] p-3 sm:flex-row sm:items-center sm:justify-between">
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
                        onClick={() => {
                          if (dishQuantity >= MAX_QUANTITY_PER_ITEM) {
                            setCartActionError(`Mỗi món chỉ được tối đa ${MAX_QUANTITY_PER_ITEM} phần.`);
                            return;
                          }
                          setDishQuantity((value) => value + 1);
                        }}
                        className="flex h-[36px] w-[40px] items-center justify-center rounded-[9px] bg-[#f59e0b] text-[24px] font-medium text-white"
                        aria-label="Tăng số lượng"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={async () => {
                        const success = await addToCart(selectedDish, dishQuantity, dishNote);
                        if (success) {
                          setSelectedDish(null);
                        }
                      }}
                      className="rounded-[10px] bg-[#f59e0b] px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-[#db8f08] disabled:opacity-70"
                      disabled={isAddingToCart}
                    >
                      {isAddingToCart ? 'Đang thêm...' : `Thêm vào giỏ hàng - ${formatCurrency(selectedDishTotal)}`}
                    </button>
                </div>
                {cartActionError ? <p className="mt-3 text-sm text-red-500">{cartActionError}</p> : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <LoginRequiredModal isOpen={isLoginRequiredOpen} onClose={() => setIsLoginRequiredOpen(false)} />

      {shareDish ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShareDish(null)}
        >
          <div
            className="w-full max-w-[360px] overflow-hidden rounded-[18px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#f0f0f0] px-5 py-4">
              <div className="min-w-0">
                <p className="text-[13px] text-[#9ca3af]">Chia sẻ món ăn</p>
                <p className="truncate text-[16px] font-semibold text-[#111827]">{shareDish.name}</p>
              </div>
              <button type="button" onClick={() => setShareDish(null)} className="ml-3 text-2xl leading-none text-[#6b7280] hover:text-black">×</button>
            </div>

            <div className="max-h-[280px] overflow-y-auto px-3 py-3">
              {shareLoading ? (
                <p className="py-6 text-center text-sm text-[#9ca3af]">Đang tải...</p>
              ) : shareConversations.length === 0 ? (
                <p className="py-6 text-center text-sm text-[#9ca3af]">Bạn chưa có cuộc trò chuyện nào</p>
              ) : shareConversations.map((conv) => (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => setShareSelectedId(conv.id === shareSelectedId ? null : conv.id)}
                  className={`mb-1 flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left transition ${
                    shareSelectedId === conv.id ? 'bg-[#fff7ed]' : 'hover:bg-[#f9fafb]'
                  }`}
                >
                  <img
                    src={conv.avatar || 'https://i.pravatar.cc/160'}
                    alt={conv.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <span className="flex-1 truncate text-[15px] font-medium text-[#1f2937]">{conv.name}</span>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border text-[11px] font-bold ${
                    shareSelectedId === conv.id
                      ? 'border-[#f59e0b] bg-[#f59e0b] text-white'
                      : 'border-[#d1d5db] bg-white text-transparent'
                  }`}>✓</span>
                </button>
              ))}
            </div>

            <div className="border-t border-[#f0f0f0] px-4 py-3">
              {shareDone ? (
                <p className="py-1 text-center text-sm font-medium text-[#16a34a]">Đã gửi thành công!</p>
              ) : (
                <button
                  type="button"
                  onClick={() => void handleSendShare()}
                  disabled={!shareSelectedId || shareSending}
                  className="w-full rounded-[12px] bg-[#f59e0b] py-2.5 text-sm font-bold text-white transition hover:bg-[#d97706] disabled:opacity-40"
                >
                  {shareSending ? 'Đang gửi...' : 'Gửi'}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
