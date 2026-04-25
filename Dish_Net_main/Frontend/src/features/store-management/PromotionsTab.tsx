'use client';
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  storePromotionApi,
  KhuyenMaiItem,
  PromoStatus,
  PromoType,
  SortOption,
  fmt,
} from '@/shared/storePromotionApi';

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
interface PromoUI {
  id: string;
  name: string;
  code: string;
  status: PromoStatus;
  type: PromoType;
  discountValue: string;
  maxDiscount: string;
  minOrder: string;
  usedCount: number;
  maxUse: number;
  startDate: string;
  endDate: string;
  revenue?: string;
  image: string;
  gia_tri_toi_da: number | null;
  mo_ta?: string | null;
  rawDiscountValue: number;
  rawMinOrder: number;
  rawMaxUse: number | null;
  rawStartDate: string;
  rawEndDate: string;
}

function toDateTimeLocal(value: string): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

/* ═══════════════════════════════════════════
   MAP API → UI
   ═══════════════════════════════════════════ */
function mapApiToUi(item: KhuyenMaiItem): PromoUI {
  const start = item.thoi_gian_bat_dau
    ? new Date(item.thoi_gian_bat_dau).toLocaleString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : '';
  const end = item.thoi_gian_ket_thuc
    ? new Date(item.thoi_gian_ket_thuc).toLocaleString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : '';

  let discountDisplay = '';
  let maxDiscountDisplay = '';
  switch (item.loai_khuyen_mai) {
    case 'phan_tram':
      discountDisplay = `${item.gia_tri_khuyen_mai}%`;
      if (item.gia_tri_toi_da) {
        maxDiscountDisplay = fmt(item.gia_tri_toi_da);
      }
      break;
    case 'so_tien':
      discountDisplay = fmt(item.gia_tri_khuyen_mai);
      break;
    case 'mien_phi_van_chuyen':
      discountDisplay = 'Miễn phí vận chuyển';
      break;
  }

  return {
    id: String(item.id),
    name: item.ten_khuyen_mai,
    code: item.ma_khuyen_mai,
    status: item.trang_thai as PromoStatus,
    type: item.loai_khuyen_mai as PromoType,
    discountValue: discountDisplay,
    maxDiscount: maxDiscountDisplay,
    minOrder: fmt(item.don_hang_toi_thieu),
    usedCount: item.so_luot_da_dung,
    maxUse: item.so_luot_toi_da ?? 0,
    startDate: start,
    endDate: end,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=60&h=60&fit=crop',
    gia_tri_toi_da: item.gia_tri_toi_da,
    mo_ta: item.mo_ta,
    rawDiscountValue: item.gia_tri_khuyen_mai,
    rawMinOrder: item.don_hang_toi_thieu,
    rawMaxUse: item.so_luot_toi_da,
    rawStartDate: item.thoi_gian_bat_dau,
    rawEndDate: item.thoi_gian_ket_thuc,
  };
}

/* ═══════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════ */
const STATUS_LABEL: Record<PromoStatus, string> = {
  active: 'Đang diễn ra',
  upcoming: 'Sắp diễn ra',
  paused: 'Tạm Dừng',
  ended: 'Đã kết thúc',
};

const STATUS_BADGE: Record<PromoStatus, string> = {
  active: 'bg-[#2e7d32] text-white',
  upcoming: 'border border-[#888] text-[#555]',
  paused: 'border border-[#f0a050] text-[#f0a050]',
  ended: 'bg-[#d32f2f] text-white',
};

const TYPE_LABEL: Record<PromoType, string> = {
  phan_tram: 'Giảm theo %',
  so_tien: 'Giảm theo số tiền',
  mien_phi_van_chuyen: 'Miễn phí vận chuyển',
};

const STATUS_FILTER_OPTS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'active', label: 'Đang diễn ra' },
  { key: 'upcoming', label: 'Sắp diễn ra' },
  { key: 'paused', label: 'Tạm dừng' },
  { key: 'ended', label: 'Đã kết thúc' },
];

const TYPE_FILTER_OPTS = [
  { key: 'all', label: 'Tất cả loại' },
  { key: 'phan_tram', label: 'Giảm theo %' },
  { key: 'so_tien', label: 'Giảm theo số tiền' },
  { key: 'mien_phi_van_chuyen', label: 'Miễn phí vận chuyển' },
];

const SORT_OPTS = [
  { key: 'moi_nhat', label: 'Mới nhất' },
  { key: 'sap_het_han', label: 'Sắp hết hạn' },
  { key: 'hieu_qua_cao_nhat', label: 'Hiệu quả cao nhất' },
  { key: 'giam_gia_cao_nhat', label: 'Giảm giá cao nhất' },
];

/* ═══════════════════════════════════════════
   DELETE CONFIRM MODAL
   ═══════════════════════════════════════════ */
function DeleteConfirmModal({ promo, onClose, onConfirm }: {
  promo: PromoUI;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-[420px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5">
          <div /><h3 className="text-[17px] font-bold text-black">Xác nhận xóa</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
        </div>
        <div className="px-6 pb-6 pt-4">
          <p className="text-[14px] text-[#555]">
            Bạn chắc chắn muốn xóa chương trình <span className="font-semibold text-black">{promo.name}</span> không?
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50">Hủy</button>
            <button type="button" onClick={onConfirm} className="rounded-[10px] bg-[#d32f2f] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c]">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ADD / EDIT MODAL
   ═══════════════════════════════════════════ */
function PromoModal({
  promo,
  mode,
  onClose,
  onSave,
  isLoading,
}: {
  promo: PromoUI | null;
  mode: 'create' | 'edit';
  onClose: () => void;
  onSave: (data: {
    ten_khuyen_mai: string;
    ma_khuyen_mai: string;
    loai_khuyen_mai: PromoType;
    gia_tri_khuyen_mai: number;
    gia_tri_toi_da?: number;
    don_hang_toi_thieu: number;
    so_luot_toi_da?: number;
    thoi_gian_bat_dau: string;
    thoi_gian_ket_thuc: string;
    mo_ta?: string;
  }) => void;
  isLoading: boolean;
}) {
  const isEdit = mode === 'edit';
  const [name, setName] = useState(promo?.name || '');
  const [code, setCode] = useState(promo?.code || '');
  const [type, setType] = useState<PromoType>(promo?.type || 'phan_tram');
  const [discountValue, setDiscountValue] = useState(promo ? String(promo.rawDiscountValue) : '');
  const [maxDiscount, setMaxDiscount] = useState(promo?.gia_tri_toi_da ? String(promo.gia_tri_toi_da) : '');
  const [minOrder, setMinOrder] = useState(promo ? String(promo.rawMinOrder) : '');
  const [maxUse, setMaxUse] = useState(promo?.rawMaxUse ? String(promo.rawMaxUse) : '');
  const [startDate, setStartDate] = useState(
    promo?.rawStartDate
      ? toDateTimeLocal(promo.rawStartDate)
      : '',
  );
  const [endDate, setEndDate] = useState(
    promo?.rawEndDate
      ? toDateTimeLocal(promo.rawEndDate)
      : '',
  );
  const [description, setDescription] = useState(promo?.mo_ta || '');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!name.trim()) { setError('Tên chương trình không được để trống'); return; }
    if (!code.trim()) { setError('Mã khuyến mãi không được để trống'); return; }
    if (!startDate || !endDate) { setError('Vui lòng chọn đầy đủ thời gian bắt đầu và kết thúc'); return; }
    setError('');

    const giaTri = Number(discountValue.replace(/\D/g, '')) || 0;
    const maxDa = maxDiscount ? Number(maxDiscount.replace(/\D/g, '')) : undefined;
    const donToiThieu = Number(minOrder.replace(/\D/g, '')) || 0;
    const luotToiDa = maxUse ? Number(maxUse) : undefined;

    onSave({
      ten_khuyen_mai: name.trim(),
      ma_khuyen_mai: code.trim().toUpperCase(),
      loai_khuyen_mai: type,
      gia_tri_khuyen_mai: giaTri,
      gia_tri_toi_da: maxDa,
      don_hang_toi_thieu: donToiThieu,
      so_luot_toi_da: luotToiDa,
      thoi_gian_bat_dau: startDate,
      thoi_gian_ket_thuc: endDate,
      mo_ta: description.trim() || undefined,
    });
  };

  const types: { key: PromoType; label: string }[] = [
    { key: 'phan_tram', label: 'Giảm theo %' },
    { key: 'so_tien', label: 'Giảm theo số tiền' },
    { key: 'mien_phi_van_chuyen', label: 'Miễn phí vận chuyển' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-[560px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5">
          <h3 className="text-[17px] font-bold text-black">{isEdit ? 'Sửa thông tin khuyến mãi' : 'Thêm mã khuyến mãi'}</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
        </div>
        <div className="px-6 pb-6 pt-4 space-y-4">
          {/* Name + Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] font-medium text-black">Tên chương trình</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="VD: GIẢM 20% CUỐI TUẦN" className="mt-1 w-full rounded-[8px] border border-[#ddd] px-3 py-2 text-[14px] text-black outline-none focus:border-[#2e7d32]" />
            </div>
            <div>
              <label className="text-[13px] font-medium text-black">Mã khuyến mãi</label>
              <input type="text" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="VD: SUMMER20" className="mt-1 w-full rounded-[8px] border border-[#ddd] px-3 py-2 text-[14px] text-black outline-none focus:border-[#2e7d32]" />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="text-[13px] font-bold text-black">Loại khuyến mãi</label>
            <div className="mt-2 space-y-2">
              {types.map((t) => (
                <div key={t.key} className="flex items-center gap-3">
                  <label className="flex cursor-pointer items-center gap-2" onClick={() => setType(t.key)}>
                    <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${type === t.key ? 'border-[#2e7d32]' : 'border-[#ccc]'}`}>
                      {type === t.key && <span className="h-2.5 w-2.5 rounded-full bg-[#2e7d32]" />}
                    </span>
                    <span className="w-[150px] text-[13px] text-black">{t.label}</span>
                  </label>
                  {t.key === 'phan_tram' && (
                    <div className="flex items-center gap-1">
                      <input
                        type="number" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)}
                        disabled={type !== 'phan_tram'} placeholder="VD: 20"
                        className="w-[80px] rounded-[8px] border border-[#ddd] px-3 py-1.5 text-[14px] text-black outline-none disabled:bg-[#f8f8f8]" />
                      <span className="text-[13px] text-[#555]">%</span>
                      <span className="ml-3 text-[13px] text-[#888]">Tối đa</span>
                      <input
                        type="number" value={maxDiscount} onChange={(e) => setMaxDiscount(e.target.value)}
                        disabled={type !== 'phan_tram'} placeholder="VD: 30000"
                        className="w-[100px] rounded-[8px] border border-[#ddd] px-3 py-1.5 text-[14px] text-black outline-none disabled:bg-[#f8f8f8]" />
                      <span className="text-[13px] text-[#555]">đ</span>
                    </div>
                  )}
                  {t.key === 'so_tien' && (
                    <div className="flex items-center gap-1">
                      <input
                        type="number" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)}
                        disabled={type !== 'so_tien'} placeholder="VD: 15000"
                        className="w-full rounded-[8px] border border-[#ddd] px-3 py-1.5 text-[14px] text-black outline-none disabled:bg-[#f8f8f8]" />
                      <span className="text-[13px] text-[#555]">đ</span>
                    </div>
                  )}
                  {t.key === 'mien_phi_van_chuyen' && (
                    <span className="text-[12px] text-[#888] italic">Giá trị mặc định = 0</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div>
            <label className="text-[13px] font-bold text-black">Điều kiện áp dụng</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-[140px] text-[13px] text-black">Đơn tối thiểu</span>
                <div className="flex flex-1 items-center gap-1">
                  <input type="number" value={minOrder} onChange={(e) => setMinOrder(e.target.value)} placeholder="VD: 50000"
                    className="w-full rounded-[8px] border border-[#ddd] px-3 py-1.5 text-[14px] text-black outline-none focus:border-[#2e7d32]" />
                  <span className="text-[13px] text-[#555]">đ</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-[140px] text-[13px] text-black">Số lượt sử dụng</span>
                <input type="number" value={maxUse} onChange={(e) => setMaxUse(e.target.value)} placeholder="Để trống = không giới hạn"
                  className="flex-1 rounded-[8px] border border-[#ddd] px-3 py-1.5 text-[14px] text-black outline-none focus:border-[#2e7d32]" />
              </div>
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="text-[13px] font-bold text-black">Thời gian</label>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[13px] text-black">Ngày bắt đầu</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-[8px] border border-[#ddd] px-3 py-2 text-[13px] text-black outline-none focus:border-[#2e7d32]"
                />
              </div>
              <div>
                <label className="mb-1 block text-[13px] text-black">Ngày kết thúc</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-[8px] border border-[#ddd] px-3 py-2 text-[13px] text-black outline-none focus:border-[#2e7d32]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[13px] font-bold text-black">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-[8px] border border-[#ddd] px-3 py-2 text-[14px] text-black outline-none focus:border-[#2e7d32]"
            />
          </div>

          {error && <p className="text-[13px] text-[#d32f2f] font-medium">{error}</p>}

          {/* Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50">Hủy</button>
            <button type="button" onClick={handleSave} disabled={isLoading}
              className="rounded-[10px] bg-[#d32f2f] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c] disabled:opacity-60">
              {isLoading ? 'Đang xử lý...' : (isEdit ? 'Lưu thay đổi' : 'Thêm')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PROMO CARD
   ═══════════════════════════════════════════ */
function PromoCard({
  promo,
  onEdit,
  onDelete,
  onPause,
  onActivate,
  onDuplicate,
}: {
  promo: PromoUI;
  onEdit: () => void;
  onDelete: () => void;
  onPause: () => void;
  onActivate: () => void;
  onDuplicate: (promo: PromoUI) => void;
}) {
  return (
    <div className="rounded-[12px] border border-[#e8e8e8] bg-white p-5 shadow-sm">
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img src={promo.image} alt={promo.name} className="h-12 w-12 rounded-full object-cover" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-bold text-black">{promo.name}</span>
              {promo.maxDiscount && (
                <span className="rounded-full bg-[#e8f5e9] px-3 py-0.5 text-[11px] font-semibold text-[#2e7d32]">Tối đa {promo.maxDiscount}đ</span>
              )}
              <span className="rounded-full bg-[#f0f0f0] px-2 py-0.5 text-[10px] text-[#555]">{TYPE_LABEL[promo.type]}</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#2e7d32] text-[10px] text-white">✓</span>
              <span className="text-[13px] text-[#555]">Mã : {promo.code}</span>
            </div>
          </div>
        </div>
        <span className={`rounded-[8px] px-4 py-1.5 text-[13px] font-semibold ${STATUS_BADGE[promo.status]}`}>
          {STATUS_LABEL[promo.status]}
        </span>
      </div>

      {/* Details row */}
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-1 text-[13px] text-[#555]">
          <p>Áp dụng cho đơn từ {promo.minOrder}đ</p>
          <p>Đã dùng : {promo.usedCount}{promo.maxUse > 0 ? `/${promo.maxUse}` : ''}</p>
          {promo.gia_tri_toi_da && (
            <p className="text-[#2e7d32]">Giảm tối đa: {fmt(promo.gia_tri_toi_da)}đ</p>
          )}
        </div>
        <div className="space-y-1 text-[13px] text-[#555] text-right">
          <p>Bắt đầu : {promo.startDate}</p>
          <p>Kết thúc : {promo.endDate}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {(promo.status === 'active' || promo.status === 'upcoming') && (
            <button type="button" onClick={onEdit} className="rounded-[8px] border border-[#ddd] bg-white px-5 py-2 text-[13px] font-semibold text-[#555] transition hover:bg-[#f8f8f8]">Sửa</button>
          )}
          {promo.status === 'active' && (
            <button type="button" onClick={onPause} className="rounded-[8px] border border-[#ddd] bg-white px-4 py-2 text-[13px] font-semibold text-[#555] transition hover:bg-[#f8f8f8]">Tạm Dừng</button>
          )}
          {promo.status === 'upcoming' && (
            <button type="button" onClick={onActivate} className="rounded-[8px] border border-[#2e7d32] bg-white px-4 py-2 text-[13px] font-semibold text-[#2e7d32] transition hover:bg-[#f6faf4]">Kích hoạt</button>
          )}
          {(promo.status === 'active' || promo.status === 'upcoming') && (
            <button type="button" onClick={onDelete} className="rounded-[8px] bg-[#d32f2f] px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#b71c1c]">Xóa</button>
          )}
          {promo.status === 'ended' && (
            <button type="button" onClick={() => onDuplicate(promo)} className="rounded-[8px] border border-[#ddd] bg-white px-5 py-2 text-[13px] font-semibold text-[#555] transition hover:bg-[#f8f8f8]">Nhân bản</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PROMOTIONS TAB
   ═══════════════════════════════════════════ */
export default function PromotionsTab() {
  const [promos, setPromos] = useState<PromoUI[]>([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<PromoStatus | 'all'>('all');
  const [typeFilter, setPromoTypeFilter] = useState<PromoType | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('moi_nhat');
  const [currentPage, setCurrentPage] = useState(1);
  const [editPromo, setEditPromo] = useState<PromoUI | null>(null);
  const [duplicatePromo, setDuplicatePromo] = useState<PromoUI | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PromoUI | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [statusDropOpen, setStatusDropOpen] = useState(false);
  const [typeDropOpen, setTypeDropOpen] = useState(false);
  const [sortDropOpen, setSortDropOpen] = useState(false);

  const fetchPromos = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await storePromotionApi.layDanhSach({
        tim_kiem: searchText || undefined,
        trang_thai: statusFilter,
        loai_khuyen_mai: typeFilter,
        sap_xep: sortBy,
        trang: currentPage,
        so_luong: 9,
      });
      setPromos(res.du_lieu.map(mapApiToUi));
      setTotalPages(res.tong_trang);
    } catch (err) {
      console.error('Lỗi khi tải khuyến mãi:', err);
    } finally {
      setIsFetching(false);
    }
  }, [searchText, statusFilter, typeFilter, sortBy, currentPage]);

  useEffect(() => {
    fetchPromos();
  }, [fetchPromos]);

  const handleSave = async (data: Parameters<typeof storePromotionApi.tao>[0]) => {
    setIsLoading(true);
    try {
      if (editPromo) {
        await storePromotionApi.capNhat(Number(editPromo.id), data);
      } else {
        await storePromotionApi.tao(data);
      }
      setEditPromo(null);
      setDuplicatePromo(null);
      setShowAddModal(false);
      await fetchPromos();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsLoading(true);
    try {
      await storePromotionApi.xoa(Number(deleteTarget.id));
      setDeleteTarget(null);
      await fetchPromos();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Xóa thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePause = async (promo: PromoUI) => {
    try {
      await storePromotionApi.tamDung(Number(promo.id));
      await fetchPromos();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Tạm dừng thất bại');
    }
  };

  const handleActivate = async (promo: PromoUI) => {
    try {
      await storePromotionApi.kichHoat(Number(promo.id));
      await fetchPromos();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Kích hoạt thất bại');
    }
  };

  const handleDuplicate = (promo: PromoUI) => {
    setEditPromo(null);
    setDuplicatePromo({
      ...promo,
      id: '',
      code: `${promo.code}_COPY`,
      status: 'upcoming',
    });
    setShowAddModal(true);
  };

  const pages = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
    if (currentPage >= totalPages - 3) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  }, [currentPage, totalPages]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold uppercase text-black">QUẢN LÝ KHUYẾN MÃI</h1>
        <button type="button" onClick={() => { setEditPromo(null); setDuplicatePromo(null); setShowAddModal(true); }}
          className="flex items-center gap-2 rounded-[10px] bg-[#2e7d32] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#256b28]">
          <span className="text-[18px]">+</span> Thêm khuyến mãi
        </button>
      </div>

      {/* Filters */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-[#ddd] bg-white px-4 py-2">
          <input type="text" value={searchText}
            onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1); }}
            placeholder="Tìm kiếm tên mã, code khuyến mãi"
            className="flex-1 bg-transparent text-[14px] text-black outline-none placeholder:text-[#999]" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
        </div>

        {/* Status filter */}
        <div className="relative">
          <button type="button" onClick={() => { setStatusDropOpen(!statusDropOpen); setTypeDropOpen(false); setSortDropOpen(false); }}
            className="flex items-center gap-1 rounded-full border border-[#ddd] bg-white px-4 py-2 text-[13px] text-black">
            <span>{STATUS_FILTER_OPTS.find((s) => s.key === statusFilter)?.label}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          {statusDropOpen && (
            <div className="absolute left-0 top-[calc(100%+4px)] z-10 w-[160px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
              {STATUS_FILTER_OPTS.map((s) => (
                <button key={s.key} type="button"
                  onClick={() => { setStatusFilter(s.key as PromoStatus | 'all'); setStatusDropOpen(false); setCurrentPage(1); }}
                  className={`block w-full px-4 py-2.5 text-left text-[13px] transition hover:bg-[#f6faf4] ${statusFilter === s.key ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Type filter */}
        <div className="relative">
          <button type="button" onClick={() => { setTypeDropOpen(!typeDropOpen); setStatusDropOpen(false); setSortDropOpen(false); }}
            className="flex items-center gap-1 rounded-full border border-[#ddd] bg-white px-4 py-2 text-[13px] text-black">
            <span>{TYPE_FILTER_OPTS.find((t) => t.key === typeFilter)?.label}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          {typeDropOpen && (
            <div className="absolute left-0 top-[calc(100%+4px)] z-10 w-[190px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
              {TYPE_FILTER_OPTS.map((t) => (
                <button key={t.key} type="button"
                  onClick={() => { setPromoTypeFilter(t.key as PromoType | 'all'); setTypeDropOpen(false); setCurrentPage(1); }}
                  className={`block w-full px-4 py-2.5 text-left text-[13px] transition hover:bg-[#f6faf4] ${typeFilter === t.key ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <button type="button" onClick={() => { setSortDropOpen(!sortDropOpen); setStatusDropOpen(false); setTypeDropOpen(false); }}
            className="flex items-center gap-1 rounded-full border border-[#ddd] bg-white px-4 py-2 text-[13px] text-black">
            <span>{SORT_OPTS.find((s) => s.key === sortBy)?.label}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          {sortDropOpen && (
            <div className="absolute left-0 top-[calc(100%+4px)] z-10 w-[190px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
              {SORT_OPTS.map((s) => (
                <button key={s.key} type="button"
                  onClick={() => { setSortBy(s.key as SortOption); setSortDropOpen(false); setCurrentPage(1); }}
                  className={`block w-full px-4 py-2.5 text-left text-[13px] transition hover:bg-[#f6faf4] ${sortBy === s.key ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="mt-5 space-y-4">
        {isFetching ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <span className="text-[15px] text-[#999]">Đang tải...</span>
          </div>
        ) : promos.length === 0 ? (
          <div className="flex min-h-[200px] items-center justify-center rounded-[12px] bg-white shadow-sm">
            <p className="text-[15px] text-[#999]">Không có khuyến mãi nào</p>
          </div>
        ) : (
          promos.map((promo) => (
            <PromoCard
              key={promo.id}
              promo={promo}
              onEdit={() => setEditPromo(promo)}
              onDelete={() => setDeleteTarget(promo)}
              onPause={() => handlePause(promo)}
              onActivate={() => handleActivate(promo)}
              onDuplicate={handleDuplicate}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {!isFetching && promos.length > 0 && totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-1">
          <button type="button" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] text-[#999] transition hover:bg-[#f0f0f0]">‹</button>
          {pages.map((p, i) =>
            p === '...' ? (
              <span key={`ellipsis-${i}`} className="px-1 text-[13px] text-[#999]">...</span>
            ) : (
              <button key={p} type="button" onClick={() => setCurrentPage(p as number)}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition ${currentPage === p ? 'bg-[#2e7d32] font-bold text-white' : 'text-[#555] hover:bg-[#f0f0f0]'}`}>
                {p}
              </button>
            ),
          )}
          <button type="button" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] text-[#999] transition hover:bg-[#f0f0f0]">›</button>
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <PromoModal
          promo={duplicatePromo}
          mode="create"
          onClose={() => { setShowAddModal(false); setDuplicatePromo(null); }}
          onSave={handleSave}
          isLoading={isLoading}
        />
      )}
      {editPromo && (
        <PromoModal
          promo={editPromo}
          mode="edit"
          onClose={() => setEditPromo(null)}
          onSave={handleSave}
          isLoading={isLoading}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          promo={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
