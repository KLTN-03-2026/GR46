'use client';

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { emitUserCartRefreshEvent } from '@/shared/cartEvents';
import { userCommerceApi } from '@/shared/userCommerceApi';
import AddressPickerMap from '@/features/checkout/AddressPickerMap';

type CheckoutTopping = {
  id: number;
  ten_topping: string;
  gia: number;
};

type CheckoutItem = {
  id_gio_hang: number;
  id_mon_an: number;
  ten_mon: string;
  hinh_anh: string | null;
  so_luong: number;
  don_gia: number;
  toppings: CheckoutTopping[];
  gia_topping: number;
  thanh_tien: number;
  ghi_chu: string | null;
};

type CheckoutGroup = {
  id_cua_hang: number;
  ten_cua_hang: string;
  phi_van_chuyen: number;
  khoang_cach_km: number | null;
  tam_tinh: number;
  items: CheckoutItem[];
};

type CheckoutPreview = {
  thong_tin_giao_hang_mac_dinh: {
    nguoi_nhan: string;
    so_dien_thoai_nhan: string;
    dia_chi_giao: string;
  };
  groups: CheckoutGroup[];
  khuyen_mai: {
    id: number;
    ma_khuyen_mai: string;
    ten_khuyen_mai: string;
    loai_khuyen_mai: string;
  } | null;
  tong_tien: {
    tam_tinh: number;
    phi_van_chuyen: number;
    giam_gia: number;
    tong_thanh_toan: number;
  };
};

type CheckoutPromoOption = {
  id: number;
  ma_khuyen_mai: string;
  ten_khuyen_mai: string;
  mo_ta?: string | null;
  giam_gia_uoc_tinh: number;
  thoi_gian_ket_thuc?: string;
};

type CheckoutField = 'recipientName' | 'phone' | 'address';
type CheckoutFieldErrors = Partial<Record<CheckoutField, string>>;

function formatCurrency(value: number) {
  return `${value.toLocaleString('vi-VN')}đ`;
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
      <path
        d="M15 5 8 12l7 7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M12 5v14M5 12h14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M5 12h14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M5 7h14M9 7V5h6v2m-7 3v7m4-7v7m4-7v7M7 7l1 12h8l1-12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PaymentMethodRow({
  selected,
  onSelect,
}: {
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center justify-between rounded-[12px] border border-[#e5e7eb] px-4 py-3 text-left"
    >
      <div>
        <p className="text-[15px] font-semibold text-black">VNPAY</p>
        <p className="text-xs text-[#6b7280]">Thanh toán QR / Internet Banking</p>
      </div>
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
          selected
            ? 'border-[#2f9e2f] bg-[#2f9e2f] text-white'
            : 'border-[#bababa] bg-white text-transparent'
        }`}
      >
        ●
      </span>
    </button>
  );
}

export default function CheckoutPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [preview, setPreview] = useState<CheckoutPreview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [pageError, setPageError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<CheckoutFieldErrors>({});

  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryCoords, setDeliveryCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [driverNote, setDriverNote] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'vnpay' | null>(null);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [availablePromos, setAvailablePromos] = useState<CheckoutPromoOption[]>([]);
  const [showPromoList, setShowPromoList] = useState(false);
  const [showEmptyCartPopup, setShowEmptyCartPopup] = useState(false);

  const mapBackendErrorsToFields = useCallback((rawMessage: string) => {
    const entries = rawMessage
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);

    const mapped: CheckoutFieldErrors = {};

    entries.forEach((message) => {
      const lower = message.toLowerCase();
      if (lower.includes('nguoi_nhan')) {
        mapped.recipientName = 'Vui lòng nhập tên người nhận.';
      } else if (lower.includes('so_dien_thoai_nhan')) {
        mapped.phone = lower.includes('empty')
          ? 'Vui lòng nhập số điện thoại nhận hàng.'
          : 'Số điện thoại nhận hàng không hợp lệ.';
      } else if (lower.includes('dia_chi_giao')) {
        mapped.address = 'Vui lòng nhập địa chỉ giao hàng.';
      }
    });

    return mapped;
  }, []);

  const validateDeliveryForm = useCallback(() => {
    const nextErrors: CheckoutFieldErrors = {};
    const tenNguoiNhan = (recipientName ?? '').trim();
    const soDienThoai = (phone ?? '').trim();
    const diaChi = (address ?? '').trim();

    if (!tenNguoiNhan) {
      nextErrors.recipientName = 'Vui lòng nhập tên người nhận.';
    }

    if (!soDienThoai) {
      nextErrors.phone = 'Vui lòng nhập số điện thoại nhận hàng.';
    } else if (!/^0\d{9}$/.test(soDienThoai)) {
      nextErrors.phone = 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.';
    }

    if (!diaChi) {
      nextErrors.address = 'Vui lòng nhập địa chỉ giao hàng.';
    }

    return nextErrors;
  }, [address, phone, recipientName]);

  const vnpayCallbackQuery = useMemo(() => {
    const params = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith('vnp_')) {
        params.set(key, value);
      }
    }
    const serialized = params.toString();
    return serialized || null;
  }, [searchParams]);

  const loadPreview = useCallback(
    async (promoCode?: string | null, coords?: { lat: number; lng: number } | null) => {
      const maKhuyenMai = promoCode?.trim() || undefined;
      const payload = (await userCommerceApi.xemTruocThanhToan(
        maKhuyenMai,
        coords?.lat ?? null,
        coords?.lng ?? null,
      )) as CheckoutPreview;

      setPreview(payload);
      setPageError(null);

      setRecipientName((current) =>
        (current ?? '').trim()
          ? current
          : (payload.thong_tin_giao_hang_mac_dinh.nguoi_nhan ?? ''),
      );
      setPhone((current) =>
        (current ?? '').trim()
          ? current
          : (payload.thong_tin_giao_hang_mac_dinh.so_dien_thoai_nhan ?? ''),
      );
      setAddress((current) =>
        (current ?? '').trim()
          ? current
          : (payload.thong_tin_giao_hang_mac_dinh.dia_chi_giao ?? ''),
      );

      if (payload.khuyen_mai?.ma_khuyen_mai) {
        setAppliedPromo(payload.khuyen_mai.ma_khuyen_mai);
        setPromoInput(payload.khuyen_mai.ma_khuyen_mai);
      } else if (!promoCode) {
        setAppliedPromo(null);
      }
    },
    [],
  );

  useEffect(() => {
    if (!vnpayCallbackQuery) {
      return;
    }
    let mounted = true;

    const run = async () => {
      setIsLoading(true);
      setPageError(null);
      try {
        const callbackResult: any = await userCommerceApi.xuLyCallbackVnpay(
          vnpayCallbackQuery,
        );
        if (!mounted) return;
        emitUserCartRefreshEvent();
        if (callbackResult?.thanh_cong) {
          router.replace('/user/orders?menu=placed&payment=success');
          return;
        }
        setPageError(
          callbackResult?.message || 'Thanh toán VNPAY thất bại, vui lòng thử lại.',
        );
      } catch (error) {
        if (!mounted) return;
        setPageError(
          error instanceof Error
            ? error.message
            : 'Không xử lý được kết quả thanh toán VNPAY',
        );
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void run();
    return () => {
      mounted = false;
    };
  }, [router, vnpayCallbackQuery]);

  useEffect(() => {
    if (vnpayCallbackQuery) {
      return;
    }
    let mounted = true;

    const run = async () => {
      setIsLoading(true);
      try {
        await loadPreview();
      } catch (error) {
        if (!mounted) return;
        setPreview(null);
        setPageError(
          error instanceof Error
            ? error.message
            : 'Không tải được dữ liệu thanh toán',
        );
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void run();
    return () => {
      mounted = false;
    };
  }, [loadPreview, vnpayCallbackQuery]);

  const selectedGroups = useMemo(() => preview?.groups ?? [], [preview]);

  const loadPromotionOptions = useCallback(async () => {
    try {
      const payload: any = await userCommerceApi.layKhuyenMaiThanhToan();
      const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
      setAvailablePromos(rows);
    } catch {
      setAvailablePromos([]);
    }
  }, []);

  useEffect(() => {
    if (!preview) return;
    void loadPromotionOptions();
  }, [loadPromotionOptions, preview]);

  const updateItemQuantity = async (itemId: number, nextQuantity: number) => {
    try {
      await userCommerceApi.capNhatGioHang(itemId, {
        so_luong: Math.max(1, nextQuantity),
      });
      await loadPreview(appliedPromo, deliveryCoords);
      emitUserCartRefreshEvent();
    } catch (error) {
      setPageError(
        error instanceof Error ? error.message : 'Không cập nhật được số lượng món',
      );
    }
  };

  const goBack = () => {
    const prev = sessionStorage.getItem('checkout_back');
    if (prev) {
      sessionStorage.removeItem('checkout_back');
      router.push(prev);
    } else {
      router.back();
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      await userCommerceApi.xoaItemGioHang(itemId);
      emitUserCartRefreshEvent();
      try {
        await loadPreview(appliedPromo, deliveryCoords);
      } catch {
        setShowEmptyCartPopup(true);
      }
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Không xóa được món khỏi đơn');
    }
  };

  const applyPromo = async () => {
    const code = promoInput.trim();
    if (!code) {
      setAppliedPromo(null);
      try {
        await loadPreview(null, deliveryCoords);
      } catch (error) {
        setPageError(
          error instanceof Error
            ? error.message
            : 'Không cập nhật được mã khuyến mãi',
        );
      }
      return;
    }

    setIsApplyingPromo(true);
    try {
      await loadPreview(code, deliveryCoords);
      setAppliedPromo(code);
      setShowPromoList(false);
    } catch (error) {
      setPageError(
        error instanceof Error ? error.message : 'Mã khuyến mãi không hợp lệ',
      );
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const placeOrder = async () => {
    if (isPlacingOrder) return;
    if (!preview || selectedGroups.length === 0) {
      setPageError('Không có món nào để đặt đơn');
      return;
    }

    if (!paymentMethod) {
      setPageError('Vui lòng chọn hình thức thanh toán.');
      return;
    }

    const nextErrors = validateDeliveryForm();
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setPageError('Vui lòng kiểm tra lại thông tin giao hàng.');
      return;
    }

    setIsPlacingOrder(true);
    setPageError(null);
    setFieldErrors({});

    try {
      const result: any = await userCommerceApi.datDonHang({
        nguoi_nhan: (recipientName ?? '').trim(),
        so_dien_thoai_nhan: (phone ?? '').trim(),
        dia_chi_giao: (address ?? '').trim(),
        vi_do_giao: deliveryCoords?.lat ?? null,
        kinh_do_giao: deliveryCoords?.lng ?? null,
        ghi_chu_tai_xe: (driverNote ?? '').trim() || undefined,
        phuong_thuc_thanh_toan: paymentMethod as 'vnpay',
        ma_khuyen_mai: appliedPromo ?? undefined,
      });
      if (typeof result?.payment_url === 'string' && result.payment_url.trim()) {
        window.location.assign(result.payment_url);
        return;
      }
      emitUserCartRefreshEvent();
      router.push('/user/orders?menu=placed&payment=success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Đặt đơn thất bại';
      const mappedFieldErrors = mapBackendErrorsToFields(message);
      if (Object.keys(mappedFieldErrors).length > 0) {
        setFieldErrors(mappedFieldErrors);
        setPageError('Vui lòng kiểm tra lại thông tin giao hàng.');
      } else {
        setPageError(message);
      }
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#f2f2f1]">
        <section className="mx-auto w-full max-w-[1160px] px-5 pb-14 pt-8 text-center text-[#5f6f60]">
          Đang tải dữ liệu thanh toán...
        </section>
      </div>
    );
  }

  if (!preview || selectedGroups.length === 0) {
    return (
      <div className="bg-[#f2f2f1]">
        <section className="mx-auto w-full max-w-[1160px] px-5 pb-14 pt-6 lg:px-8">
          <div className="mb-6 flex items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              className="flex h-10 w-10 items-center justify-center rounded-full text-black transition hover:bg-white"
              aria-label="Quay lại trang trước"
            >
              <ChevronLeftIcon />
            </button>
            <h1 className="text-[28px] font-bold leading-none text-black lg:text-[30px]">
              Thanh toán
            </h1>
          </div>

          <div className="rounded-[20px] bg-white px-8 py-10 text-center shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <p className="text-[18px] font-semibold text-black">Giỏ hàng trống</p>
            <p className="mt-2 text-[14px] text-[#6b7280]">
              Vui lòng chọn món trong giỏ hàng trước khi thanh toán.
            </p>
            {pageError ? <p className="mt-3 text-sm text-red-500">{pageError}</p> : null}
            <Link
              href="/"
              className="mt-5 inline-flex rounded-[10px] bg-[#2f9e2f] px-6 py-2.5 text-[15px] font-semibold text-white"
            >
              Quay lại trang chủ
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#f2f2f1]">
      <section className="mx-auto w-full max-w-[1160px] px-5 pb-14 pt-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const prev = sessionStorage.getItem('checkout_back');
              if (prev) {
                sessionStorage.removeItem('checkout_back');
                router.push(prev);
              } else {
                const storeId = preview?.groups?.[0]?.id_cua_hang;
                storeId ? router.push(`/explore/store/${storeId}/menu`) : router.back();
              }
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full text-black transition hover:bg-white"
            aria-label="Quay lại trang trước"
          >
            <ChevronLeftIcon />
          </button>
          <h1 className="text-[28px] font-bold leading-none text-black lg:text-[30px]">
            Thanh toán
          </h1>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_320px]">
          <div className="space-y-6">
            <section className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <div className="border-b border-[#ececec] px-6 py-4 text-center text-[18px] font-bold text-black">
                Xác nhận thông tin giao hàng
              </div>
              <div className="space-y-4 px-6 py-5">
                <label className="block">
                  <div className="mb-2 text-[13px] font-semibold text-[#a8adb7]">
                    Tên người nhận
                  </div>
                  <input
                    value={recipientName}
                    onChange={(event) => {
                      setRecipientName(event.target.value);
                      setFieldErrors((prev) => ({ ...prev, recipientName: undefined }));
                    }}
                    className={`h-[42px] w-full rounded-[10px] border px-4 text-[14px] text-black outline-none transition ${
                      fieldErrors.recipientName
                        ? 'border-[#ef4444] bg-[#fff7f7] focus:border-[#ef4444]'
                        : 'border-[#e3e6eb] focus:border-[#cfd6df]'
                    }`}
                  />
                  {fieldErrors.recipientName ? (
                    <p className="mt-1 text-[12px] text-[#ef4444]">{fieldErrors.recipientName}</p>
                  ) : null}
                </label>

                <label className="block">
                  <div className="mb-2 text-[13px] font-semibold text-[#a8adb7]">
                    Số điện thoại
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    placeholder="Ví dụ: 0901234567"
                    value={phone}
                    onChange={(event) => {
                      // Chỉ giữ lại chữ số, loại bỏ chữ cái và ký tự khác, tối đa 10 ký tự
                      const onlyDigits = event.target.value.replace(/\D/g, '').slice(0, 10);
                      setPhone(onlyDigits);
                      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    onKeyDown={(event) => {
                      // Chặn các phím chữ ở keyboard layout không có inputMode-aware
                      if (
                        event.key.length === 1 &&
                        !/[0-9]/.test(event.key) &&
                        !event.ctrlKey &&
                        !event.metaKey
                      ) {
                        event.preventDefault();
                      }
                    }}
                    onPaste={(event) => {
                      event.preventDefault();
                      const text = event.clipboardData.getData('text');
                      const onlyDigits = text.replace(/\D/g, '').slice(0, 10);
                      setPhone(onlyDigits);
                      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    className={`h-[42px] w-full rounded-[10px] border px-4 text-[14px] text-black outline-none transition ${
                      fieldErrors.phone
                        ? 'border-[#ef4444] bg-[#fff7f7] focus:border-[#ef4444]'
                        : 'border-[#e3e6eb] focus:border-[#cfd6df]'
                    }`}
                  />
                  {fieldErrors.phone ? (
                    <p className="mt-1 text-[12px] text-[#ef4444]">{fieldErrors.phone}</p>
                  ) : null}
                </label>

                <AddressPickerMap
                  address={address}
                  onAddressChange={(next) => {
                    setAddress(next);
                    setFieldErrors((prev) => ({ ...prev, address: undefined }));
                  }}
                  onCoordsChange={(lat, lng) => {
                    const coords = { lat, lng };
                    setDeliveryCoords(coords);
                    void loadPreview(appliedPromo, coords);
                  }}
                  error={fieldErrors.address}
                />

                <label className="block">
                  <div className="mb-2 text-[13px] font-semibold text-[#a8adb7]">
                    Ghi chú cho tài xế (nếu có)
                  </div>
                  <input
                    value={driverNote}
                    onChange={(event) => setDriverNote(event.target.value)}
                    placeholder="Ví dụ: Gọi trước khi giao"
                    className="h-[42px] w-full rounded-[10px] border border-[#e3e6eb] px-4 text-[14px] text-black outline-none transition focus:border-[#cfd6df]"
                  />
                </label>
              </div>
            </section>

            {selectedGroups.map((group) => (
              <section
                key={group.id_cua_hang}
                className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ececec] px-6 py-4">
                  <div>
                    <h2 className="text-[18px] font-bold text-black">{group.ten_cua_hang}</h2>
                    <p className="mt-1 text-[13px] text-[#68707c]">
                      {group.items.reduce((sum, item) => sum + item.so_luong, 0)} món đang chọn
                    </p>
                  </div>
                  <div className="text-right text-[13px] text-[#4b5563]">
                    <div>Tạm tính: {formatCurrency(group.tam_tinh)}</div>
                    <div className="mt-0.5 text-[#6b7280]">
                      Phí ship:{' '}
                      <span className="text-[#f0a050]">+{formatCurrency(group.phi_van_chuyen)}</span>
                      {group.khoang_cach_km != null && (
                        <span className="ml-1 text-[11px] text-[#9ca3af]">(~{group.khoang_cach_km} km)</span>
                      )}
                    </div>
                    <div className="mt-0.5 font-semibold text-black">
                      Tổng: {formatCurrency(group.tam_tinh + group.phi_van_chuyen)}
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-[#eeeeee] px-5">
                  {group.items.map((item) => (
                    <article key={item.id_gio_hang} className="flex items-center gap-4 py-4">
                      <img
                        src={
                          item.hinh_anh ||
                          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=240&q=80'
                        }
                        alt={item.ten_mon}
                        className="h-[54px] w-[54px] rounded-[12px] object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[15px] font-medium text-black">
                          {item.ten_mon}
                        </h3>
                        <p className="mt-1 text-[13px] text-[#6b7280]">
                          {formatCurrency(item.don_gia + (item.gia_topping ?? 0))}
                        </p>
                        {Array.isArray(item.toppings) && item.toppings.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {item.toppings.map((t) => (
                              <span key={t.id} className="rounded-[5px] bg-[#fff4e5] px-1.5 py-0.5 text-[11px] text-[#c8600a]">
                                {t.ten_topping} +{formatCurrency(t.gia)}
                              </span>
                            ))}
                          </div>
                        )}
                        {item.ghi_chu ? (
                          <p className="mt-1 text-[12px] text-[#6b7280]">
                            Ghi chú: {item.ghi_chu}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => void updateItemQuantity(item.id_gio_hang, item.so_luong - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#f2f4f7] text-[#374151]"
                        >
                          <MinusIcon />
                        </button>
                        <span className="min-w-[24px] text-center text-[15px] font-semibold text-black">
                          {item.so_luong}
                        </span>
                        <button
                          type="button"
                          onClick={() => void updateItemQuantity(item.id_gio_hang, item.so_luong + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#fff2ef] text-[#ff5a2c]"
                        >
                          <PlusIcon />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => void removeItem(item.id_gio_hang)}
                        className="text-[#6b7280] transition hover:text-[#374151]"
                        aria-label="Xóa món"
                      >
                        <TrashIcon />
                      </button>

                      <div className="min-w-[96px] text-right text-[15px] font-medium text-black">
                        {formatCurrency(item.thanh_tien)}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}

            <section className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <div className="border-b border-[#ececec] px-6 py-4 text-[17px] font-bold text-black">
                Hình thức thanh toán
              </div>
              <div className="space-y-4 px-6 py-5">
                <PaymentMethodRow
                  selected={paymentMethod === 'vnpay'}
                  onSelect={() => setPaymentMethod(paymentMethod === 'vnpay' ? null : 'vnpay')}
                />

                <div>
                  <div className="mb-2 text-[13px] font-semibold text-[#a8adb7]">
                    Mã khuyến mãi
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      value={promoInput}
                      onChange={(event) => setPromoInput(event.target.value)}
                      placeholder="Nhập mã khuyến mãi"
                      className="h-[42px] flex-1 rounded-[10px] border border-[#e3e6eb] px-4 text-[14px] text-black outline-none transition focus:border-[#cfd6df]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowPromoList((prev) => !prev);
                      }}
                      disabled={isApplyingPromo}
                      className="h-[42px] rounded-[10px] border border-[#d6dde7] bg-[#f8fafc] px-4 text-[14px] font-semibold text-[#334155] disabled:opacity-70"
                    >
                      Chọn mã
                    </button>
                    <button
                      type="button"
                      onClick={() => void applyPromo()}
                      disabled={isApplyingPromo}
                      className="h-[42px] rounded-[10px] bg-[#2f9e2f] px-4 text-[14px] font-semibold text-white disabled:opacity-70"
                    >
                      {isApplyingPromo ? 'Đang áp dụng...' : 'Áp dụng'}
                    </button>
                  </div>
                  {showPromoList ? (
                    <div className="mt-3 max-h-[220px] overflow-y-auto rounded-[10px] border border-[#e3e6eb] bg-white">
                      {availablePromos.length === 0 ? (
                        <div className="px-4 py-3 text-[13px] text-[#6b7280]">
                          Không có mã khuyến mãi phù hợp với giỏ hàng hiện tại.
                        </div>
                      ) : (
                        availablePromos.map((promo) => (
                          <button
                            key={promo.id}
                            type="button"
                            onClick={() => {
                              setPromoInput(promo.ma_khuyen_mai);
                              setShowPromoList(false);
                            }}
                            className="block w-full border-b border-[#f1f5f9] px-4 py-3 text-left transition hover:bg-[#f8fafc]"
                          >
                            <div className="text-[13px] font-semibold text-black">
                              {promo.ma_khuyen_mai} - {promo.ten_khuyen_mai}
                            </div>
                            <div className="mt-1 text-[12px] text-[#2f9e2f]">
                              Giảm ước tính: {formatCurrency(Number(promo.giam_gia_uoc_tinh ?? 0))}
                            </div>
                            {promo.mo_ta ? (
                              <div className="mt-1 text-[12px] text-[#6b7280]">{promo.mo_ta}</div>
                            ) : null}
                          </button>
                        ))
                      )}
                    </div>
                  ) : null}
                  {preview.khuyen_mai ? (
                    <p className="mt-2 text-xs text-[#2f9e2f]">
                      Đã áp dụng: {preview.khuyen_mai.ma_khuyen_mai} -{' '}
                      {preview.khuyen_mai.ten_khuyen_mai}
                    </p>
                  ) : null}
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <div className="border-b border-[#ececec] px-5 py-4 text-[17px] font-bold text-black">
                Chi tiết thanh toán
              </div>
              <div className="space-y-3 px-5 py-4 text-[15px] text-[#2d2d2d]">
                <div className="flex items-center justify-between gap-4">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(preview.tong_tien.tam_tinh)}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1">
                      Phí vận chuyển
                      {deliveryCoords && (
                        <span className="rounded-full bg-[#e8f5e9] px-1.5 py-0.5 text-[10px] font-semibold text-[#2e7d32]">
                          {preview.groups.length === 1 && preview.groups[0].khoang_cach_km != null
                            ? `~${preview.groups[0].khoang_cach_km} km`
                            : 'theo khoảng cách'}
                        </span>
                      )}
                    </span>
                    <span>{formatCurrency(preview.tong_tien.phi_van_chuyen)}</span>
                  </div>
                  {preview.groups.length > 1 && (
                    <div className="mt-1.5 space-y-1 border-t border-dashed border-[#f0f0f0] pt-1.5">
                      {preview.groups.map((g) => (
                        <div key={g.id_cua_hang} className="flex items-center justify-between text-[12px] text-[#6b7280]">
                          <span className="truncate max-w-[130px]">{g.ten_cua_hang}</span>
                          <span>
                            {g.khoang_cach_km != null && (
                              <span className="mr-1 text-[11px] text-[#9ca3af]">~{g.khoang_cach_km} km ·</span>
                            )}
                            {formatCurrency(g.phi_van_chuyen)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Giảm giá</span>
                  <span>-{formatCurrency(preview.tong_tien.giam_gia)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-[#ececec] px-5 py-4">
                <span className="font-bold text-black">Tổng thanh toán</span>
                <span className="text-[19px] font-bold text-[#ff3b18]">
                  {formatCurrency(preview.tong_tien.tong_thanh_toan)}
                </span>
              </div>
            </section>

            <button
              type="button"
              onClick={() => void placeOrder()}
              disabled={isPlacingOrder}
              className="w-full rounded-[12px] bg-[#ff3b18] px-6 py-3 text-[16px] font-bold text-white transition hover:bg-[#e5310f] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPlacingOrder ? 'Đang xử lý...' : 'Đặt đơn'}
            </button>

            {pageError ? <p className="text-sm text-red-500">{pageError}</p> : null}
          </aside>
        </div>
      </section>

      {showEmptyCartPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-[360px] rounded-[20px] bg-white px-8 py-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff4e5]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f0a050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <h3 className="text-[18px] font-bold text-black">Giỏ hàng trống</h3>
            <p className="mt-2 text-[14px] text-[#6b7280]">
              Vui lòng chọn thêm món để tiếp tục thanh toán.
            </p>
            <button
              type="button"
              onClick={goBack}
              className="mt-6 w-full rounded-[12px] bg-[#2f9e2f] py-3 text-[15px] font-bold text-white transition hover:bg-[#256b28]"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
