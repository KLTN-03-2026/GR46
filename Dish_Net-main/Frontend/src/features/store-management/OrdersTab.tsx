'use client';
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  storeOrderApi,
  StoreOrderItem,
  StoreOrderDetail,
  TabCounts,
  TrangThaiDonHangStore,
  fmt,
  fmtPhone,
} from '@/shared/storeOrderApi';

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
type OrderTabKey = 'pending' | 'preparing' | 'delivering' | 'delivered' | 'cancelled' | 'returned';

interface StoreOrder {
  id: string;
  ma_don_hang: string;
  khach_hang: string;
  khach_hinh?: string;
  khach_sdt: string;
  ngay_dat: string;
  items: { name: string; qty: number; price: string }[];
  toppings: { name: string; qty: number; price: string }[];
  subtotal: string;
  shippingFee: string;
  discount: string;
  paymentMethod: string;
  totalValue: string;
  deliveryAddress: string;
  remainingMinutes: string;
  tag: 'Mới' | 'Sắp trễ' | 'Quá giờ';
  status: OrderTabKey;
  review?: { rating: number; text: string; images: string[] };
  cancelInfo?: {
    requestBy: string;
    requestAt: string;
    reason: string;
    refundStatus: 'chua_hoan' | 'da_hoan';
    refundAt: string;
  };
  returnInfo?: {
    requestBy: string;
    requestAt: string;
    reason: string;
    description: string;
    refund: 'pending' | 'approved' | 'rejected';
    refundAt: string;
    rejectReason?: string;
  };
}

function formatDateTime(value?: string | null): string {
  if (!value) return '';
  return new Date(value).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/* ═══════════════════════════════════════════
   MAP API → UI
   ═══════════════════════════════════════════ */
function detailToOrderItem(detail: StoreOrderDetail): StoreOrderItem {
  return {
    id: detail.id,
    ma_don_hang: detail.ma_don_hang,
    khach_hang: detail.thong_tin_khach_hang.ten_hien_thi,
    so_dien_thoai_khach: detail.thong_tin_khach_hang.so_dien_thoai,
    dia_chi_giao: detail.thong_tin_khach_hang.dia_chi_giao,
    tong_tien: detail.tong_tien_don_hang.tong_thanh_toan,
    tam_tinh: detail.tong_tien_don_hang.tam_tinh,
    phi_van_chuyen: detail.tong_tien_don_hang.phi_van_chuyen,
    tong_giam_gia: detail.tong_tien_don_hang.tong_giam_gia,
    phuong_thuc_thanh_toan: '',
    trang_thai_don_hang: detail.trang_thai_don_hang,
    trang_thai_db: detail.trang_thai_db,
    thoi_gian_dat: detail.thoi_gian_dat,
    thoi_gian_xac_nhan: detail.thoi_gian_xac_nhan,
    thoi_gian_giao: detail.thoi_gian_giao,
    thoi_gian_hoan_tat: detail.thoi_gian_hoan_tat,
    thoi_gian_hoan_tien: detail.thoi_gian_hoan_tat,
    thoi_gian_huy: detail.thoi_gian_huy,
    ly_do_huy: detail.ly_do_huy,
    ly_do_tra_hang: detail.ly_do_tra_hang,
    nguoi_huy: detail.nguoi_huy,
    anh_dai_dien_khach: null,
  };
}

function mapPaymentMethod(m: string): string {
  switch (m) {
    case 'vnpay': return 'VN-Pay';
    case 'tien_mat': return 'Tiền mặt';
    case 'vi_dien_tu': return 'Ví điện tử';
    case 'the': return 'Thẻ';
    default: return m || '';
  }
}

function toOrderTabKey(dbStatus: string): OrderTabKey {
  switch (dbStatus) {
    case 'cho_xac_nhan': return 'pending';
    case 'da_xac_nhan':
    case 'dang_chuan_bi': return 'preparing';
    case 'dang_giao': return 'delivering';
    case 'da_giao':
    case 'da_hoan_tien': return 'delivered';
    case 'da_huy': return 'cancelled';
    case 'tra_hang': return 'returned';
    default: return 'pending';
  }
}

function mapApiOrder(item: StoreOrderItem, apiItems: StoreOrderDetail['danh_sach_mon_an']): StoreOrder {
  const status = toOrderTabKey(item.trang_thai_db);
  const items = apiItems.map((i) => ({
    name: i.ten_mon,
    qty: i.so_luong,
    price: fmt(i.don_gia),
  }));
  const toppings = apiItems.flatMap((i) =>
    (i.topping ?? []).map((t) => ({ name: t.ten, qty: t.so_luong, price: fmt(t.gia) })),
  );

  const ngayDat = item.thoi_gian_dat
    ? new Date(item.thoi_gian_dat).toLocaleString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : '';

  let cancelInfo: StoreOrder['cancelInfo'];
  if (status === 'cancelled') {
    cancelInfo = {
      requestBy: item.nguoi_huy === 'cua_hang' ? 'Chủ cửa hàng' : 'Người mua',
      requestAt: item.thoi_gian_huy
        ? new Date(item.thoi_gian_huy).toLocaleString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
          })
        : '',
      reason: item.ly_do_huy ?? '',
      refundStatus: item.thoi_gian_hoan_tien ? 'da_hoan' : 'chua_hoan',
      refundAt: item.thoi_gian_hoan_tien
        ? new Date(item.thoi_gian_hoan_tien).toLocaleString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
          })
        : '',
    };
  }

  let returnInfo: StoreOrder['returnInfo'];
  if (status === 'returned') {
    returnInfo = {
      requestBy: 'Người mua',
      requestAt: item.thoi_gian_hoan_tien
        ? new Date(item.thoi_gian_hoan_tien).toLocaleString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
          })
        : '',
      reason: item.ly_do_tra_hang ?? '',
      description: item.ly_do_tra_hang ?? '',
      refund: 'pending',
      refundAt: '',
    };
  }

  return {
    id: String(item.id),
    ma_don_hang: item.ma_don_hang,
    khach_hang: item.khach_hang,
    khach_hinh: item.anh_dai_dien_khach ?? undefined,
    khach_sdt: fmtPhone(item.so_dien_thoai_khach),
    ngay_dat: ngayDat,
    items,
    toppings,
    subtotal: fmt(item.tam_tinh),
    shippingFee: fmt(item.phi_van_chuyen),
    discount: fmt(item.tong_giam_gia),
    paymentMethod: mapPaymentMethod(item.phuong_thuc_thanh_toan),
    totalValue: fmt(item.tong_tien),
    deliveryAddress: item.dia_chi_giao,
    remainingMinutes: '',
    tag: 'Mới',
    status,
    cancelInfo,
    returnInfo,
  };
}

function mapApiOrderWithDetail(
  item: StoreOrderItem,
  detail?: StoreOrderDetail,
): StoreOrder {
  const base = mapApiOrder(item, detail?.danh_sach_mon_an ?? []);
  const latestReview = detail?.danh_gia?.[0];
  const latestHistory = detail?.lich_su_cap_nhat?.[detail.lich_su_cap_nhat.length - 1];
  const rejectPrefix = 'Chủ cửa hàng từ chối hoàn tiền. Lý do: ';
  const isRefundRejected = latestHistory?.noi_dung?.startsWith(rejectPrefix);
  const rejectReason = isRefundRejected
    ? latestHistory?.noi_dung?.slice(rejectPrefix.length) ?? ''
    : undefined;
  const isRefundApproved = detail?.trang_thai_db === 'da_hoan_tien';

  return {
    ...base,
    ngay_dat: formatDateTime(item.thoi_gian_dat),
    cancelInfo: base.cancelInfo
      ? {
          ...base.cancelInfo,
          requestAt: formatDateTime(item.thoi_gian_huy),
          refundAt: formatDateTime(item.thoi_gian_hoan_tien),
        }
      : undefined,
    returnInfo: base.returnInfo
      ? {
          ...base.returnInfo,
          requestAt: formatDateTime(item.thoi_gian_hoan_tien),
          refund: isRefundApproved ? 'approved' : isRefundRejected ? 'rejected' : base.returnInfo.refund,
          refundAt: isRefundApproved ? formatDateTime(item.thoi_gian_hoan_tien) : base.returnInfo.refundAt,
          rejectReason,
        }
      : undefined,
    review: latestReview
      ? {
          rating: latestReview.so_sao,
          text: latestReview.noi_dung ?? '',
          images: [],
        }
      : undefined,
  };
}

/* ═══════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════ */
const ORDER_TABS: { key: OrderTabKey; label: string; dbKey: TrangThaiDonHangStore }[] = [
  { key: 'pending', label: 'Chờ xác nhận', dbKey: 'cho_xac_nhan' },
  { key: 'preparing', label: 'Đang chuẩn bị', dbKey: 'dang_chuan_bi' },
  { key: 'delivering', label: 'Đang giao', dbKey: 'dang_giao' },
  { key: 'delivered', label: 'Đã giao', dbKey: 'da_giao' },
  { key: 'cancelled', label: 'Đã hủy', dbKey: 'da_huy' },
  { key: 'returned', label: 'Trả hàng', dbKey: 'tra_hang' },
];

const TAB_STYLE_ACTIVE: Record<OrderTabKey, string> = {
  pending: 'bg-[#d32f2f] text-white',
  preparing: 'border-2 border-[#333] text-black font-bold',
  delivering: 'border-2 border-[#333] text-black font-bold',
  delivered: 'border-2 border-[#333] text-black font-bold',
  cancelled: 'border border-[#d32f2f] text-[#d32f2f] font-bold',
  returned: 'border border-[#d32f2f] text-[#d32f2f] font-bold',
};

const STATUS_BADGE: Record<OrderTabKey, { text: string; cls: string }> = {
  pending: { text: '⏳ Chờ xác nhận', cls: 'border border-[#d32f2f] text-[#d32f2f]' },
  preparing: { text: 'Đang chuẩn bị', cls: 'border border-[#333] text-black' },
  delivering: { text: 'Đang giao', cls: 'border border-[#333] text-black' },
  delivered: { text: 'Đã giao', cls: 'bg-[#2e7d32] text-white' },
  cancelled: { text: 'Đã hủy', cls: 'bg-[#d32f2f] text-white' },
  returned: { text: 'Trả hàng', cls: 'bg-[#f0a050] text-white' },
};

const PROCESS_FILTER = ['Tất cả đơn', 'Đơn mới nhất', 'Đơn cũ nhất'] as const;
const REJECT_REASONS = ['Hết món', 'Quán quá tải', 'Ngoài khu vực phục vụ', 'Món tạm ngưng bán', 'Hết nguyên liệu', 'Khác'];
const REFUND_REJECT_REASONS = [
  'Không có bằng chứng hợp lệ', 'Món ăn vẫn đạt chất lượng khi giao',
  'Thông tin khiếu nại không rõ ràng', 'Lỗi không thuộc về cửa hàng',
  'Không liên hệ được với khách để xác minh', 'Khác',
];
const PREP_TIMES = ['15 phút', '20 phút', '30 phút', 'Nhập thời gian'];
const EXTEND_TIMES = ['5 phút', '10 phút', '15 phút', 'Khác'];
const IMG = 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=80&h=80&fit=crop';
const IMG2 = 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=80&h=80&fit=crop';

/* ═══════════════════════════════════════════
   CONFIRM ORDER MODAL
   ═══════════════════════════════════════════ */
function ConfirmOrderModal({
  order,
  onClose,
  onConfirm,
  onReject,
}: {
  order: StoreOrder;
  onClose: () => void;
  onConfirm: (prepTime: string) => void;
  onReject: () => void;
}) {
  const [prepTime, setPrepTime] = useState(PREP_TIMES[0]);
  const [customPrepTime, setCustomPrepTime] = useState('');
  const isCustomPrepTime = prepTime === 'Nhập thời gian';
  const resolvedPrepTime = isCustomPrepTime ? `${customPrepTime} phút` : prepTime;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-[500px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5">
          <div /><h3 className="text-[17px] font-bold text-[#2e7d32]">XÁC NHẬN ĐƠN HÀNG</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
        </div>
        <div className="px-6 pb-6 pt-4">
          <div className="rounded-[10px] border border-[#e8e8e8] p-4">
            <p className="text-[14px] font-bold text-black">Mã đơn : #{order.ma_don_hang}</p>
            <div className="mt-3">
              <p className="text-[13px] font-bold text-black">Chi tiết đơn :</p>
              {order.items.map((item, i) => (
                <div key={i} className="mt-1 flex justify-between text-[13px] text-black">
                  <span>{item.name}   x{item.qty}</span><span>{item.price}</span>
                </div>
              ))}
            </div>
            {order.toppings.length > 0 && (
              <div className="mt-3">
                <p className="text-[13px] font-bold text-black">Topping thêm :</p>
                {order.toppings.map((t, i) => (
                  <div key={i} className="mt-1 flex justify-between text-[13px] text-black">
                    <span>{t.name} x{t.qty}</span><span>{t.price}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-3">
              <p className="text-[13px] font-bold text-black">Ghi chú của Khách hàng :</p>
              <textarea readOnly defaultValue={order.items[0] ? 'không có' : ''} className="mt-1 w-full resize-none rounded-[8px] border border-[#e0e0e0] bg-[#f8f8f8] px-3 py-2 text-[13px] text-[#555] outline-none" rows={2} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[14px] font-bold text-black">Chọn thời gian chuẩn bị món</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {PREP_TIMES.map((t) => (
                <label key={t} className="flex cursor-pointer items-center gap-2" onClick={() => setPrepTime(t)}>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${prepTime === t ? 'border-[#2e7d32]' : 'border-[#ccc]'}`}>
                    {prepTime === t && <span className="h-2.5 w-2.5 rounded-full bg-[#2e7d32]" />}
                  </span>
                  <span className="text-[13px] text-black">{t}</span>
                </label>
              ))}
            </div>
            {isCustomPrepTime && (
              <input
                type="number"
                min="1"
                value={customPrepTime}
                onChange={(e) => setCustomPrepTime(e.target.value)}
                placeholder="Nhập số phút"
                className="mt-3 w-full rounded-[10px] border border-[#e0e0e0] px-3 py-2 text-[13px] text-black outline-none"
              />
            )}
          </div>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => resolvedPrepTime && onConfirm(resolvedPrepTime)}
              disabled={isCustomPrepTime && !customPrepTime.trim()}
              className="rounded-[10px] bg-[#2e7d32] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#256b28] disabled:opacity-60"
            >
              Xác nhận
            </button>
            <button type="button" onClick={onReject} className="rounded-[10px] bg-[#d32f2f] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c]">Từ chối</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   REJECT REASON MODAL
   ═══════════════════════════════════════════ */
function RejectReasonModal({ onClose, onReject }: { onClose: () => void; onReject: (reason: string) => void }) {
  const [reason, setReason] = useState('');
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-[460px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5">
          <div /><h3 className="text-[17px] font-bold text-black">CHỌN LÝ DO</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
        </div>
        <div className="px-6 pb-6 pt-4">
          <div className="rounded-[10px] border border-[#e8e8e8]">
            {REJECT_REASONS.map((r) => (
              <label key={r} className="flex cursor-pointer items-center justify-between border-b border-[#f0f0f0] px-4 py-3.5 last:border-b-0 hover:bg-[#f8f8f8]" onClick={() => setReason(r)}>
                <span className="text-[14px] text-black">{r}</span>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${reason === r ? 'border-[#333]' : 'border-[#ccc]'}`}>
                  {reason === r && <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50">Hủy</button>
            <button type="button" onClick={() => reason && onReject(reason)} className="rounded-[10px] bg-[#d32f2f] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c]">Từ chối</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   EXTEND TIME MODAL
   ═══════════════════════════════════════════ */
function ExtendTimeModal({ onClose, onExtend }: { onClose: () => void; onExtend: (time: string) => void }) {
  const [time, setTime] = useState('');
  const [customMinutes, setCustomMinutes] = useState('');
  const isCustomTime = time === 'Khác';
  const resolvedTime = isCustomTime ? `${customMinutes} phút` : time;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-[460px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5">
          <div /><h3 className="text-[17px] font-bold text-black">Bạn muốn gia hạn thêm bao lâu ?</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
        </div>
        <div className="px-6 pb-6 pt-4">
          <div className="rounded-[10px] border border-[#e8e8e8]">
            {EXTEND_TIMES.map((t) => (
              <label key={t} className="flex cursor-pointer items-center justify-between border-b border-[#f0f0f0] px-4 py-3.5 last:border-b-0 hover:bg-[#f8f8f8]" onClick={() => setTime(t)}>
                <span className="text-[14px] text-black">{t}</span>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${time === t ? 'border-[#333]' : 'border-[#ccc]'}`}>
                  {time === t && <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />}
                </span>
              </label>
            ))}
          </div>
          {isCustomTime && (
            <input
              type="number"
              min="1"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              placeholder="Nhập số phút gia hạn"
              className="mt-3 w-full rounded-[10px] border border-[#e0e0e0] px-3 py-2 text-[13px] text-black outline-none"
            />
          )}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50">Hủy</button>
            <button
              type="button"
              onClick={() => { if (resolvedTime) { onExtend(resolvedTime); onClose(); } }}
              disabled={isCustomTime && !customMinutes.trim()}
              className="rounded-[10px] bg-[#d32f2f] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c] disabled:opacity-60"
            >
              Gia hạn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   REJECT REFUND MODAL
   ═══════════════════════════════════════════ */
function RejectRefundModal({ onClose, onReject }: { onClose: () => void; onReject: (reason: string) => void }) {
  const [reason, setReason] = useState('');
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-[500px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5">
          <div /><h3 className="text-[17px] font-bold text-black">CHỌN LÝ DO</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
        </div>
        <div className="px-6 pb-6 pt-4">
          <div className="rounded-[10px] border border-[#e8e8e8]">
            {REFUND_REJECT_REASONS.map((r) => (
              <label key={r} className="flex cursor-pointer items-center justify-between border-b border-[#f0f0f0] px-4 py-3.5 last:border-b-0 hover:bg-[#f8f8f8]" onClick={() => setReason(r)}>
                <span className="text-[14px] text-black">{r}</span>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${reason === r ? 'border-[#333]' : 'border-[#ccc]'}`}>
                  {reason === r && <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50">Hủy</button>
            <button type="button" onClick={() => reason && onReject(reason)} className="rounded-[10px] bg-[#d32f2f] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c]">Từ chối</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CUSTOMER REVIEW MODAL
   ═══════════════════════════════════════════ */
function ReviewModal({ order, onClose }: { order: StoreOrder; onClose: () => void }) {
  const review = order.review;
  if (!review) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-[560px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex items-center justify-between px-6 pt-5 pb-4 bg-white border-b border-[#f0f0f0]">
          <h3 className="text-[17px] font-bold text-black">Đánh giá của khách hàng</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
        </div>
        <div className="px-6 pb-6 pt-4">
          {/* Header info */}
          <div className="flex items-center gap-3">
            <img src={order.khach_hinh ?? IMG} alt={order.khach_hang} className="h-12 w-12 rounded-full object-cover" />
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-black">{order.khach_hang}</p>
              <p className="flex items-center gap-1 text-[12px] text-[#2e7d32]">📞 {order.khach_sdt}</p>
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-[20px] ${i < review.rating ? 'text-[#f0a050]' : 'text-[#ddd]'}`}>★</span>
              ))}
            </div>
          </div>

          {/* Món đã order */}
          <div className="mt-4 border-t border-[#f0f0f0] pt-4">
            <p className="text-[13px] font-bold text-black">Món đã order</p>
            <div className="mt-2 space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-[8px] border border-[#f0f0f0] bg-[#fafafa] px-3 py-2">
                  <span className="text-[13px] text-black">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-[#555]">x{item.qty}</span>
                    <span className="text-[13px] font-semibold text-black">{item.price}</span>
                  </div>
                </div>
              ))}
              {order.toppings.length > 0 && (
                <>
                  <p className="text-[12px] font-semibold text-black">Topping thêm :</p>
                  {order.toppings.map((t, i) => (
                    <div key={i} className="flex items-center justify-between rounded-[8px] border border-[#f0f0f0] bg-[#fafafa] px-3 py-2">
                      <span className="text-[12px] text-black">{t.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-[#555]">x{t.qty}</span>
                        <span className="text-[12px] font-semibold text-black">{t.price}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Phản hồi */}
          <div className="mt-4 border-t border-[#f0f0f0] pt-4">
            <p className="text-[13px] font-medium text-black">Phản hồi của khách hàng</p>
            <textarea readOnly value={review.text} className="mt-2 w-full resize-none rounded-[8px] border border-[#e0e0e0] bg-[#f8f8f8] px-3 py-2 text-[14px] text-[#555] outline-none" rows={3} />
            <p className="text-right text-[11px] text-[#999]">{review.text?.length ?? 0}/300</p>
          </div>
          {review.images && review.images.length > 0 && (
            <div className="mt-3">
              <p className="text-[13px] font-medium text-black">Hình ảnh</p>
              <div className="mt-2 flex gap-3">
                {review.images.map((img, i) => (
                  <img key={i} src={img} alt={`review-${i}`} className="h-24 w-28 rounded-[8px] object-cover" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ORDER CARD
   ═══════════════════════════════════════════ */
function OrderCard({
  order,
  onConfirm,
  onReject,
  onDeliver,
  onExtend,
  onViewReview,
  onViewDetail,
  onApproveRefund,
  onRejectRefund,
}: {
  order: StoreOrder;
  onConfirm: (id: string) => void;
  onReject: (id: string) => void;
  onDeliver: (id: string) => void;
  onExtend: (id: string) => void;
  onViewReview: (id: string) => void;
  onViewDetail: (id: string) => void;
  onApproveRefund: (id: string) => void;
  onRejectRefund: (id: string) => void;
}) {
  const tagColor = order.tag === 'Mới' ? 'bg-[#2e7d32] text-white' : order.tag === 'Sắp trễ' ? 'bg-[#f0a050] text-white' : 'bg-[#d32f2f] text-white';
  const badge = STATUS_BADGE[order.status];

  return (
    <div className="rounded-[12px] border border-[#e8e8e8] bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#f0f0f0] px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-[18px]">{order.status === 'preparing' || order.status === 'delivering' || order.status === 'delivered' ? '✅' : '🔔'}</span>
          <span className="text-[15px] font-bold text-black">Mã đơn : #{order.ma_don_hang}</span>
          {order.status === 'pending' && <span className={`rounded-full px-3 py-0.5 text-[11px] font-bold ${tagColor}`}>{order.tag}</span>}
          {order.status === 'preparing' && <span className={`rounded-full px-3 py-0.5 text-[11px] font-bold ${tagColor}`}>{order.tag}</span>}
        </div>
        <span className={`rounded-[6px] px-3 py-1 text-[12px] font-semibold ${badge.cls}`}>{badge.text}</span>
      </div>

      {/* Body */}
      <div className="flex gap-5 px-5 py-4">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <img src={order.khach_hinh ?? IMG} alt={order.khach_hang} className="h-14 w-14 rounded-[8px] object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold text-black">{order.khach_hang}</span>
                <span className="text-[11px] text-[#999]">{order.ngay_dat}</span>
              </div>
              {order.items.map((item, i) => (
                <p key={i} className="mt-1 text-[13px] text-black">{item.name}   x{item.qty}<span className="ml-8 text-[#888]">{item.price}</span></p>
              ))}
              {order.toppings.length > 0 && (
                <>
                  <p className="mt-1 text-[12px] font-medium text-black">Topping thêm :</p>
                  {order.toppings.map((t, i) => (
                    <p key={i} className="text-[12px] text-black">{t.name} x{t.qty}<span className="ml-8 text-[#888]">{t.price}</span></p>
                  ))}
                </>
              )}
              <div className="mt-2 space-y-1 text-[12px] text-[#555]">
                <div className="flex justify-between"><span>Tạm tính</span><span>{order.subtotal}</span></div>
                <div className="flex justify-between"><span>Phí vận chuyển</span><span>{order.shippingFee}</span></div>
                <div className="flex justify-between"><span>Giảm giá</span><span>{order.discount}</span></div>
                <div className="flex justify-between"><span>Phương thức thanh toán</span><span>{order.paymentMethod}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex w-[240px] shrink-0 flex-col items-end gap-0">
          {(order.status === 'pending' || order.status === 'preparing' || order.status === 'delivering' || order.status === 'delivered') && (
            <>
              <p className="text-[12px] text-[#555]">Tổng giá trị đơn :</p>
              <p className="text-[18px] font-bold text-[#d32f2f]">{order.totalValue}</p>
            </>
          )}
          {order.status === 'pending' && (
            <div className="mt-2 flex gap-1.5">
              <button type="button" onClick={() => onConfirm(order.id)} className="rounded-[6px] bg-[#2e7d32] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#256b28]">Xác nhận</button>
              <button type="button" onClick={() => onReject(order.id)} className="rounded-[6px] bg-[#d32f2f] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#b71c1c]">Từ chối</button>
            </div>
          )}
          {order.status === 'preparing' && (
            <div className="mt-2 flex gap-1.5">
              <button type="button" onClick={() => onDeliver(order.id)} className="rounded-[6px] bg-[#2e7d32] px-4 py-1.5 text-[12px] font-bold uppercase text-white transition hover:bg-[#256b28]">GIAO</button>
              <button type="button" onClick={() => onExtend(order.id)} className="rounded-[6px] border border-[#2e7d32] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#2e7d32] transition hover:bg-[#f6faf4]">Gia hạn</button>
            </div>
          )}
          {order.status === 'delivering' && (
            <button type="button" disabled className="mt-2 cursor-not-allowed rounded-[6px] bg-[#333] px-4 py-1.5 text-[12px] font-semibold text-white opacity-90">Chờ khách xác nhận</button>
          )}
          {order.status === 'delivered' && order.review && (
            <button type="button" onClick={() => onViewReview(order.id)} className="mt-2 rounded-[6px] border border-[#d32f2f] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#d32f2f] transition hover:bg-[#fff3f3]">Xem đánh giá khách hàng</button>
          )}

          {/* Cancelled */}
          {order.status === 'cancelled' && order.cancelInfo && (
            <div className="w-full">
              <button type="button" onClick={() => onViewDetail(order.id)} className="mb-1.5 text-[11px] text-[#555] underline transition hover:text-black">Xem chi tiết đơn hàng →</button>
              <h4 className="text-[13px] font-bold text-black">Lý do hủy món</h4>
              <div className="mt-1.5 space-y-0.5 text-[12px]">
                <div className="flex justify-between"><span className="text-[#888]">Yêu cầu bởi</span><span className="text-black">{order.cancelInfo.requestBy}</span></div>
                <div className="flex justify-between"><span className="text-[#888]">Yêu cầu vào</span><span className="text-black">{order.cancelInfo.requestAt}</span></div>
                <div className="flex justify-between"><span className="text-[#888]">Lý do hủy</span><span className="text-black">{order.cancelInfo.reason}</span></div>
                <div className="flex justify-between"><span className="text-[#888]">Hoàn tiền</span><span className={`font-semibold ${order.cancelInfo.refundStatus === 'da_hoan' ? 'text-[#2e7d32]' : 'text-[#d32f2f]'}`}>{order.cancelInfo.refundStatus === 'da_hoan' ? 'Đã hoàn tiền' : 'Chưa hoàn'}</span></div>
                {order.cancelInfo.refundStatus === 'da_hoan' && order.cancelInfo.refundAt && (
                  <div className="flex justify-between"><span className="text-[#888]">Thời gian hoàn</span><span className="text-black">{order.cancelInfo.refundAt}</span></div>
                )}
              </div>
            </div>
          )}

          {/* Returned */}
          {order.status === 'returned' && order.returnInfo && (
            <div className="w-full">
              <button type="button" onClick={() => onViewDetail(order.id)} className="mb-1.5 text-[11px] text-[#555] underline transition hover:text-black">Xem chi tiết đơn hàng →</button>
              <h4 className="text-[13px] font-bold text-black">Thông tin khiếu nại</h4>
              <div className="mt-1.5 space-y-0.5 text-[12px]">
                <div className="flex justify-between"><span className="text-[#888]">Yêu cầu bởi</span><span className="text-black">{order.returnInfo.requestBy}</span></div>
                <div className="flex justify-between"><span className="text-[#888]">Thời gian gửi</span><span className="text-black">{order.returnInfo.requestAt || '—'}</span></div>
                <div className="flex justify-between"><span className="text-[#888]">Lý do trả hàng</span><span className="text-black">{order.returnInfo.reason}</span></div>
                <div className="flex justify-between"><span className="text-[#888]">Mô tả</span><span className="text-black">{order.returnInfo.description}</span></div>
                {order.returnInfo.refund === 'approved' && (
                  <>
                    <div className="flex justify-between"><span className="text-[#888]">Hoàn tiền</span><span className="text-[#2e7d32] font-semibold">Đã hoàn tiền</span></div>
                    {order.returnInfo.refundAt && (
                      <div className="flex justify-between"><span className="text-[#888]">Thời gian hoàn</span><span className="text-black">{order.returnInfo.refundAt}</span></div>
                    )}
                  </>
                )}
                {order.returnInfo.refund === 'rejected' && (
                  <div className="flex justify-between"><span className="text-[#888]">Lý do từ chối</span><span className="text-black">{order.returnInfo.rejectReason}</span></div>
                )}
              </div>
              {order.returnInfo.refund === 'pending' && (
                <div className="mt-2 flex gap-1.5">
                  <button type="button" onClick={() => onApproveRefund(order.id)} className="rounded-[6px] bg-[#2e7d32] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#256b28]">Duyệt hoàn tiền</button>
                  <button type="button" onClick={() => onRejectRefund(order.id)} className="rounded-[6px] bg-[#d32f2f] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#b71c1c]">Từ chối</button>
                </div>
              )}
            </div>
          )}

          {order.status !== 'cancelled' && order.status !== 'returned' && (
            <button type="button" onClick={() => onViewDetail(order.id)} className="mt-2 text-[11px] text-[#555] underline transition hover:text-black">Xem chi tiết đơn hàng →</button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[#f0f0f0] px-5 py-3">
        <div className="flex items-center gap-2 text-[12px] text-[#555]">
          <span>📍</span><span>Giao tới : {order.deliveryAddress}</span>
        </div>
        {order.status === 'pending' && order.remainingMinutes && (
          <span className="text-[14px] font-bold text-[#d32f2f]">Còn {order.remainingMinutes} phút để xác nhận</span>
        )}
        {order.status === 'preparing' && order.remainingMinutes && (
          <span className="text-[14px] font-bold text-[#d32f2f]">Còn {order.remainingMinutes} phút để chuẩn bị</span>
        )}
        {order.status === 'cancelled' && (
          <span className="text-[14px] font-bold text-[#2e7d32]">ĐÃ HOÀN TIỀN</span>
        )}
        {order.status === 'returned' && order.returnInfo?.refund === 'approved' && (
          <span className="text-[14px] font-bold text-[#2e7d32]">ĐÃ HOÀN TIỀN</span>
        )}
        {order.status === 'returned' && order.returnInfo?.refund === 'rejected' && (
          <span className="text-[14px] font-bold text-[#d32f2f]">TỪ CHỐI HOÀN TIỀN</span>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ORDER DETAIL MODAL
   ═══════════════════════════════════════════ */
function OrderDetailModal({ order, loading, onClose }: { order: StoreOrder | null; loading: boolean; onClose: () => void }) {
  if (!order && !loading) return null;
  const badge = order ? STATUS_BADGE[order.status] : { text: '', cls: '' };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-[640px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-[#f0f0f0]">
          <h3 className="text-[17px] font-bold text-black">CHI TIẾT ĐƠN HÀNG</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2e7d32] border-t-transparent" />
          </div>
        ) : order ? (
          <div className="px-6 pb-6 pt-4">
            {/* Order header */}
            <div className="flex items-center justify-between rounded-[10px] border border-[#e8e8e8] bg-[#fafafa] px-4 py-3">
              <div>
                <p className="text-[15px] font-bold text-black">#{order.ma_don_hang}</p>
                <p className="text-[12px] text-[#888]">{order.ngay_dat}</p>
              </div>
              <span className={`rounded-[6px] px-3 py-1 text-[12px] font-semibold ${badge.cls}`}>{badge.text}</span>
            </div>

            {/* Customer info */}
            <div className="mt-4">
              <p className="text-[13px] font-bold text-black">Khách hàng</p>
              <div className="mt-2 flex items-center gap-3">
                <img src={order.khach_hinh ?? IMG} alt={order.khach_hang} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="text-[14px] font-semibold text-black">{order.khach_hang}</p>
                  <p className="text-[12px] text-[#888]">📞 {order.khach_sdt}</p>
                </div>
              </div>
            </div>

            {/* Delivery address */}
            <div className="mt-4">
              <p className="text-[13px] font-bold text-black">Địa chỉ giao hàng</p>
              <p className="mt-1 text-[13px] text-[#555]">{order.deliveryAddress}</p>
            </div>

            {/* Food items */}
            <div className="mt-4">
              <p className="text-[13px] font-bold text-black">Danh sách món ăn</p>
              <div className="mt-2 space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-[8px] border border-[#f0f0f0] px-3 py-2">
                    <div className="flex items-center gap-2">
                      <img src={IMG2} alt={item.name} className="h-10 w-10 rounded-[6px] object-cover" />
                      <div>
                        <p className="text-[13px] font-semibold text-black">{item.name}</p>
                        <p className="text-[11px] text-[#888]">x{item.qty}</p>
                      </div>
                    </div>
                    <span className="text-[13px] font-semibold text-black">{item.price}</span>
                  </div>
                ))}
                {order.toppings.length > 0 && (
                  <>
                    <p className="text-[12px] font-semibold text-black">Topping thêm :</p>
                    {order.toppings.map((t, i) => (
                      <div key={i} className="flex items-center justify-between rounded-[8px] border border-[#f0f0f0] px-3 py-2">
                        <span className="text-[12px] text-black">{t.name} x{t.qty}</span>
                        <span className="text-[12px] font-semibold text-black">{t.price}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Price breakdown */}
            <div className="mt-4 border-t border-[#f0f0f0] pt-4">
              <div className="space-y-1 text-[13px]">
                <div className="flex justify-between"><span className="text-[#555]">Tạm tính</span><span className="text-black">{order.subtotal}</span></div>
                <div className="flex justify-between"><span className="text-[#555]">Phí vận chuyển</span><span className="text-black">{order.shippingFee}</span></div>
                <div className="flex justify-between"><span className="text-[#555]">Giảm giá</span><span className="text-black">-{order.discount}</span></div>
                <div className="flex justify-between border-t border-[#f0f0f0] pt-1 font-bold">
                  <span className="text-black">Tổng cộng</span>
                  <span className="text-[#d32f2f]">{order.totalValue}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#555]">Phương thức</span>
                  <span className="text-[13px] text-black">{order.paymentMethod}</span>
                </div>
              </div>
            </div>

            {/* Cancel info */}
            {order.status === 'cancelled' && order.cancelInfo && (
              <div className="mt-4 rounded-[10px] border border-[#f0f0f0] bg-[#fff3f3] px-4 py-3">
                <p className="text-[13px] font-bold text-[#d32f2f]">Thông tin hủy đơn</p>
                <div className="mt-2 space-y-0.5 text-[12px]">
                  <div className="flex justify-between"><span className="text-[#888]">Yêu cầu bởi</span><span className="text-black">{order.cancelInfo.requestBy}</span></div>
                  <div className="flex justify-between"><span className="text-[#888]">Thời gian hủy</span><span className="text-black">{order.cancelInfo.requestAt}</span></div>
                  <div className="flex justify-between"><span className="text-[#888]">Lý do hủy</span><span className="text-black">{order.cancelInfo.reason}</span></div>
                  <div className="flex justify-between">
                    <span className="text-[#888]">Hoàn tiền</span>
                    <span className={`font-semibold ${order.cancelInfo.refundStatus === 'da_hoan' ? 'text-[#2e7d32]' : 'text-[#d32f2f]'}`}>
                      {order.cancelInfo.refundStatus === 'da_hoan' ? 'Đã hoàn tiền' : 'Chưa hoàn'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Return info */}
            {order.status === 'returned' && order.returnInfo && (
              <div className="mt-4 rounded-[10px] border border-[#f0f0f0] bg-[#fff8f0] px-4 py-3">
                <p className="text-[13px] font-bold text-[#f0a050]">Thông tin trả hàng</p>
                <div className="mt-2 space-y-0.5 text-[12px]">
                  <div className="flex justify-between"><span className="text-[#888]">Yêu cầu bởi</span><span className="text-black">{order.returnInfo.requestBy}</span></div>
                  <div className="flex justify-between"><span className="text-[#888]">Thời gian gửi</span><span className="text-black">{order.returnInfo.requestAt || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-[#888]">Lý do trả</span><span className="text-black">{order.returnInfo.reason}</span></div>
                  <div className="flex justify-between"><span className="text-[#888]">Mô tả</span><span className="text-black">{order.returnInfo.description}</span></div>
                  {order.returnInfo.refund === 'approved' && (
                    <div className="flex justify-between"><span className="text-[#888]">Hoàn tiền</span><span className="text-[#2e7d32] font-semibold">Đã hoàn tiền</span></div>
                  )}
                  {order.returnInfo.refund === 'rejected' && (
                    <div className="flex justify-between"><span className="text-[#888]">Lý do từ chối</span><span className="text-black">{order.returnInfo.rejectReason}</span></div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ORDERS TAB
   ═══════════════════════════════════════════ */
export default function OrdersTab() {
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [tabCounts, setTabCounts] = useState<TabCounts | null>(null);
  const [activeTab, setActiveTab] = useState<OrderTabKey>('pending');
  const [searchText, setSearchText] = useState('');
  const [processFilter, setProcessFilter] = useState<string>(PROCESS_FILTER[0]);
  const [processOpen, setProcessOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [confirmOrder, setConfirmOrder] = useState<StoreOrder | null>(null);
  const [rejectOrder, setRejectOrder] = useState<StoreOrder | null>(null);
  const [extendOrder, setExtendOrder] = useState<StoreOrder | null>(null);
  const [reviewOrder, setReviewOrder] = useState<StoreOrder | null>(null);
  const [rejectRefundOrder, setRejectRefundOrder] = useState<StoreOrder | null>(null);
  const [detailOrder, setDetailOrder] = useState<StoreOrder | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [timeFilter, setTimeFilter] = useState<'today' | '7days' | '30days' | 'custom' | ''>('');
  const [timeFilterOpen, setTimeFilterOpen] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({ tu_ngay: '', den_ngay: '' });
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(false);

  // Map tab key → API filter key
  const tabDbKey = ORDER_TABS.find((t) => t.key === activeTab)?.dbKey;

  // Load orders — gọi khi tab, search, time filter, page thay đổi
  const loadOrders = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await storeOrderApi.layDanhSach({
        trang_thai: tabDbKey as TrangThaiDonHangStore,
        tim_kiem: debouncedSearch || undefined,
        bo_loc_thoi_gian: (timeFilter as 'today' | '7days' | '30days' | 'custom') || undefined,
        tu_ngay: customDateRange.tu_ngay || undefined,
        den_ngay: customDateRange.den_ngay || undefined,
        trang: page,
        so_luong: 10,
      });

      // Fetch chi tiết từng đơn để lấy toppings & review
      const ordersWithDetail = await Promise.all(
        (res.du_lieu).map(async (item) => {
          try {
            const detail = await storeOrderApi.layChiTiet(item.ma_don_hang);
            return mapApiOrderWithDetail(item, detail);
          } catch {
            return mapApiOrder(item, []);
          }
        }),
      );

      setOrders(ordersWithDetail);
      setTabCounts(res.tab_counts);
      setCurrentPage(page);
      setTotalPages(res.tong_trang);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Tải đơn hàng thất bại');
    } finally {
      setLoading(false);
    }
  }, [tabDbKey, debouncedSearch, timeFilter, customDateRange.tu_ngay, customDateRange.den_ngay]);

  // Trigger loadOrders khi các dependency thay đổi (sau khi mounted)
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      loadOrders(1);
      return;
    }
    loadOrders(1);
  }, [loadOrders]);

  // Debounce search input
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(searchText);
      setCurrentPage(1);
    }, 500);
    return () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current); };
  }, [searchText]);

  // Action handlers
  const handleConfirm = async (id: string, prepTime: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    try {
      await storeOrderApi.xacNhanDonHang(order.ma_don_hang, prepTime);
      setConfirmOrder(null);
      loadOrders(currentPage);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Xác nhận thất bại');
    }
  };

  const handleReject = async (id: string, reason: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    try {
      await storeOrderApi.tuChoiDonHang(order.ma_don_hang, reason);
      setRejectOrder(null);
      loadOrders(currentPage);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Từ chối thất bại');
    }
  };

  const handleDeliver = async (id: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    try {
      await storeOrderApi.giaoDonHang(order.ma_don_hang);
      loadOrders(currentPage);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Cập nhật thất bại');
    }
  };

  const handleExtend = async (id: string, time: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    try {
      await storeOrderApi.giaHanDonHang(order.ma_don_hang, time);
      loadOrders(currentPage);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gia hạn thất bại');
    }
  };

  const handleApproveRefund = async (id: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    try {
      await storeOrderApi.duyetHoanTien(order.ma_don_hang);
      loadOrders(currentPage);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Duyệt hoàn tiền thất bại');
    }
  };

  const handleRejectRefund = async (id: string, reason: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    try {
      await storeOrderApi.tuChoiHoanTien(order.ma_don_hang, reason);
      setRejectRefundOrder(null);
      loadOrders(currentPage);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Từ chối thất bại');
    }
  };

  const handleViewDetail = async (id: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    setDetailOrder(order);
    setDetailLoading(true);
    try {
      const detail = await storeOrderApi.layChiTiet(order.ma_don_hang);
      const full = mapApiOrderWithDetail(detailToOrderItem(detail), detail);
      setDetailOrder(full);
    } catch {
      // keep order data as-is
    } finally {
      setDetailLoading(false);
    }
  };

  const displayedOrders = processFilter === 'Đơn cũ nhất' && activeTab === 'pending'
    ? [...orders].reverse()
    : orders;

  return (
    <div>
      <h1 className="text-[22px] font-bold uppercase text-black">ĐƠN ĐẶT HÀNG</h1>

      {/* Tab bar */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {ORDER_TABS.map((tab) => {
          const count = tabCounts?.[tab.dbKey] ?? 0;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition ${
                isActive ? TAB_STYLE_ACTIVE[tab.key] : 'border border-[#ddd] text-[#888] hover:border-[#999]'
              }`}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-[#ddd] bg-white px-4 py-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadOrders(1)}
            placeholder="Tìm kiếm mã đơn, tên khách..."
            className="flex-1 bg-transparent text-[14px] text-black outline-none placeholder:text-[#999]"
          />
        </div>
        <div className="relative flex items-center gap-1 rounded-full border border-[#ddd] bg-white px-4 py-2 text-[13px] text-black">
          <button type="button" onClick={() => setTimeFilterOpen(!timeFilterOpen)} className="flex items-center gap-1">
            <span>{timeFilter === 'today' ? 'Hôm nay' : timeFilter === '7days' ? '7 ngày' : timeFilter === '30days' ? '30 ngày' : timeFilter === 'custom' ? 'Tùy chỉnh' : 'Tất cả'}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          {timeFilterOpen && (
            <div className="absolute right-0 top-[calc(100%+4px)] z-10 w-[140px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
              <button type="button" onClick={() => { setTimeFilter(''); setTimeFilterOpen(false); }} className={`block w-full px-4 py-2.5 text-left text-[13px] transition hover:bg-[#f6faf4] ${timeFilter === '' ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>Tất cả</button>
              <button type="button" onClick={() => { setTimeFilter('today'); setTimeFilterOpen(false); }} className={`block w-full px-4 py-2.5 text-left text-[13px] transition hover:bg-[#f6faf4] ${timeFilter === 'today' ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>Hôm nay</button>
              <button type="button" onClick={() => { setTimeFilter('7days'); setTimeFilterOpen(false); }} className={`block w-full px-4 py-2.5 text-left text-[13px] transition hover:bg-[#f6faf4] ${timeFilter === '7days' ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>7 ngày</button>
              <button type="button" onClick={() => { setTimeFilter('30days'); setTimeFilterOpen(false); }} className={`block w-full px-4 py-2.5 text-left text-[13px] transition hover:bg-[#f6faf4] ${timeFilter === '30days' ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>30 ngày</button>
              <button type="button" onClick={() => { setTimeFilter('custom'); setTimeFilterOpen(false); }} className={`block w-full px-4 py-2.5 text-left text-[13px] transition hover:bg-[#f6faf4] ${timeFilter === 'custom' ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>Tùy chỉnh</button>
            </div>
          )}
        </div>
        {timeFilter === 'custom' && (
          <div className="flex items-center gap-2 rounded-full border border-[#ddd] bg-white px-4 py-2">
            <input type="date" value={customDateRange.tu_ngay} onChange={(e) => { setCustomDateRange((p) => ({ ...p, tu_ngay: e.target.value })); }} className="text-[13px] text-black outline-none" />
            <span className="text-[13px] text-[#888]">-</span>
            <input type="date" value={customDateRange.den_ngay} onChange={(e) => { setCustomDateRange((p) => ({ ...p, den_ngay: e.target.value })); }} className="text-[13px] text-black outline-none" />
          </div>
        )}
        <div className="relative flex items-center gap-2">
          {activeTab === 'pending' && (
            <button
              type="button"
              onClick={() => setProcessOpen(!processOpen)}
              className="flex items-center gap-1 rounded-full border border-[#ddd] bg-white px-4 py-2 text-[13px] text-black"
            >
              <span>{processFilter}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
            </button>
          )}
          {processOpen && activeTab === 'pending' && (
            <div className="absolute right-0 top-[calc(100%+4px)] z-10 w-[180px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
              {PROCESS_FILTER.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => { setProcessFilter(f); setProcessOpen(false); }}
                  className={`block w-full px-4 py-2.5 text-left text-[13px] transition hover:bg-[#f6faf4] ${processFilter === f ? 'font-bold text-[#2e7d32]' : 'text-black'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Orders */}
      <div className="mt-5 space-y-4">
        {loading && (
          <div className="flex min-h-[200px] items-center justify-center rounded-[12px] bg-white shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2e7d32] border-t-transparent" />
              <p className="text-[15px] text-[#999]">Đang tải đơn hàng...</p>
            </div>
          </div>
        )}
        {!loading && error && (
          <div className="flex min-h-[200px] items-center justify-center rounded-[12px] bg-white shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <p className="text-[15px] text-[#d32f2f]">{error}</p>
              <button
                type="button"
                onClick={() => loadOrders(currentPage)}
                className="rounded-[8px] border border-[#2e7d32] px-6 py-2 text-[14px] font-semibold text-[#2e7d32] transition hover:bg-[#f6faf4]"
              >
                Thử lại
              </button>
            </div>
          </div>
        )}
        {!loading && !error && orders.length === 0 && (
          <div className="flex min-h-[200px] items-center justify-center rounded-[12px] bg-white shadow-sm">
            <p className="text-[15px] text-[#999]">Không có đơn hàng nào</p>
          </div>
        )}
        {!loading && !error && displayedOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onConfirm={(id) => { const o = orders.find((x) => x.id === id); if (o) setConfirmOrder(o); }}
            onReject={(id) => { const o = orders.find((x) => x.id === id); if (o) setRejectOrder(o); }}
            onDeliver={handleDeliver}
            onExtend={(id) => { const o = orders.find((x) => x.id === id); if (o) setExtendOrder(o); }}
            onViewReview={(id) => { const o = orders.find((x) => x.id === id); if (o) setReviewOrder(o); }}
            onViewDetail={handleViewDetail}
            onApproveRefund={handleApproveRefund}
            onRejectRefund={(id) => { const o = orders.find((x) => x.id === id); if (o) setRejectRefundOrder(o); }}
          />
        ))}
      </div>

      {/* Pagination */}
      {!loading && !error && orders.length > 0 && (
        <div className="mt-5 flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={() => loadOrders(currentPage - 1)}
            disabled={currentPage <= 1}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] text-[#999] transition hover:bg-[#f0f0f0] disabled:cursor-not-allowed disabled:opacity-40"
          >‹</button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).slice(0, 7).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => loadOrders(p)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition ${currentPage === p ? 'bg-[#2e7d32] font-bold text-white' : 'text-[#555] hover:bg-[#f0f0f0]'}`}
            >{p}</button>
          ))}
          <span className="px-1 text-[13px] text-[#999]">...</span>
          <button
            type="button"
            onClick={() => loadOrders(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] text-[#999] transition hover:bg-[#f0f0f0] disabled:cursor-not-allowed disabled:opacity-40"
          >›</button>
        </div>
      )}

      {/* Modals */}
      {confirmOrder && (
        <ConfirmOrderModal
          order={confirmOrder}
          onClose={() => setConfirmOrder(null)}
          onConfirm={(prepTime) => handleConfirm(confirmOrder.id, prepTime)}
          onReject={() => { setConfirmOrder(null); setRejectOrder(confirmOrder); }}
        />
      )}
      {rejectOrder && (
        <RejectReasonModal
          onClose={() => setRejectOrder(null)}
          onReject={(reason) => handleReject(rejectOrder.id, reason)}
        />
      )}
      {extendOrder && (
        <ExtendTimeModal
          onClose={() => setExtendOrder(null)}
          onExtend={(time) => handleExtend(extendOrder.id, time)}
        />
      )}
      {reviewOrder && (
        <ReviewModal
          order={reviewOrder}
          onClose={() => setReviewOrder(null)}
        />
      )}
      {rejectRefundOrder && (
        <RejectRefundModal
          onClose={() => setRejectRefundOrder(null)}
          onReject={(reason) => handleRejectRefund(rejectRefundOrder.id, reason)}
        />
      )}
      {(detailOrder || detailLoading) && (
        <OrderDetailModal
          order={detailOrder}
          loading={detailLoading}
          onClose={() => { setDetailOrder(null); }}
        />
      )}
    </div>
  );
}
