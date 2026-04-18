'use client';

import { useEffect, useMemo, useState } from 'react';
import Pagination from '@/components/Admin/Pagination';
import {
  adminPromotionApi,
  KhuyenMaiItem,
  KhuyenMaiLoai,
  KhuyenMaiTrangThai,
} from '@/shared/adminPromotionApi';
import { useToast } from '@/components/Admin/Toast';

const ITEMS_PER_PAGE = 9;

const statusOptions: Array<{ label: string; value: '' | KhuyenMaiTrangThai }> = [
  { label: 'Trạng thái mã', value: '' },
  { label: 'Đang diễn ra', value: 'dang_dien_ra' },
  { label: 'Sắp diễn ra', value: 'sap_dien_ra' },
  { label: 'Đã kết thúc', value: 'da_ket_thuc' },
  { label: 'Tạm dừng', value: 'tam_dung' },
];

const typeOptions: Array<{ label: string; value: '' | KhuyenMaiLoai }> = [
  { label: 'Loại khuyến mãi', value: '' },
  { label: 'Giảm theo phần trăm', value: 'phan_tram' },
  { label: 'Giảm theo số tiền', value: 'so_tien' },
  { label: 'Miễn phí vận chuyển', value: 'mien_phi_van_chuyen' },
];

const sortOptions = [
  { label: 'Sắp xếp', value: 'moi_nhat' },
  { label: 'Sắp hết hạn', value: 'sap_het_han' },
  { label: 'Hiệu quả cao nhất', value: 'hieu_qua_cao_nhat' },
  { label: 'Giảm giá cao nhất', value: 'giam_gia_cao_nhat' },
];

type PromotionForm = {
  ten_khuyen_mai: string;
  ma_khuyen_mai: string;
  loai_khuyen_mai: KhuyenMaiLoai;
  gia_tri_khuyen_mai: number;
  don_hang_toi_thieu: number;
  thoi_gian_bat_dau: string;
  thoi_gian_ket_thuc: string;
  mo_ta: string;
};

const emptyForm: PromotionForm = {
  ten_khuyen_mai: '',
  ma_khuyen_mai: '',
  loai_khuyen_mai: 'phan_tram',
  gia_tri_khuyen_mai: 0,
  don_hang_toi_thieu: 0,
  thoi_gian_bat_dau: '',
  thoi_gian_ket_thuc: '',
  mo_ta: '',
};

function formatCurrency(value: number) {
  return `${value.toLocaleString('vi-VN')}đ`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function toInputDateTime(value: string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function getStatusLabel(status: KhuyenMaiTrangThai) {
  switch (status) {
    case 'dang_dien_ra':
      return 'Đang diễn ra';
    case 'sap_dien_ra':
      return 'Sắp diễn ra';
    case 'da_ket_thuc':
      return 'Đã kết thúc';
    case 'tam_dung':
      return 'Tạm dừng';
    default:
      return status;
  }
}

function getTypeLabel(type: KhuyenMaiLoai) {
  switch (type) {
    case 'phan_tram':
      return 'Giảm theo phần trăm';
    case 'so_tien':
      return 'Giảm theo số tiền';
    case 'mien_phi_van_chuyen':
      return 'Miễn phí vận chuyển';
    default:
      return type;
  }
}

function getValueLabel(item: KhuyenMaiItem) {
  if (item.loai_khuyen_mai === 'phan_tram') return `${item.gia_tri_khuyen_mai}%`;
  if (item.loai_khuyen_mai === 'mien_phi_van_chuyen') return 'Freeship';
  return formatCurrency(item.gia_tri_khuyen_mai);
}

function getStatusColor(status: KhuyenMaiTrangThai) {
  switch (status) {
    case 'dang_dien_ra':
      return { bg: 'bg-green-50', border: 'border-green-200', title: 'text-green-700', topBg: 'bg-green-100' };
    case 'sap_dien_ra':
      return { bg: 'bg-white', border: 'border-gray-200', title: 'text-gray-800', topBg: 'bg-gray-50' };
    case 'da_ket_thuc':
      return { bg: 'bg-red-50', border: 'border-red-200', title: 'text-red-600', topBg: 'bg-red-100' };
    case 'tam_dung':
      return { bg: 'bg-orange-50', border: 'border-orange-200', title: 'text-orange-600', topBg: 'bg-orange-100' };
    default:
      return { bg: 'bg-white', border: 'border-gray-200', title: 'text-gray-800', topBg: 'bg-gray-50' };
  }
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function PromotionsPage() {
  const toast = useToast();
  const [promotions, setPromotions] = useState<KhuyenMaiItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'' | KhuyenMaiTrangThai>('');
  const [selectedType, setSelectedType] = useState<'' | KhuyenMaiLoai>('');
  const [sortBy, setSortBy] = useState<'moi_nhat' | 'sap_het_han' | 'hieu_qua_cao_nhat' | 'giam_gia_cao_nhat'>('moi_nhat');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState<KhuyenMaiItem | null>(null);
  const [deletingPromo, setDeletingPromo] = useState<KhuyenMaiItem | null>(null);
  const [formData, setFormData] = useState<PromotionForm>(emptyForm);

  useEffect(() => {
    const runFetch = async () => {
      setLoading(true);
      try {
        const data = await adminPromotionApi.layDanhSach({
          tim_kiem: searchQuery.trim() || undefined,
          trang_thai: selectedStatus || undefined,
          loai_khuyen_mai: selectedType || undefined,
          sap_xep: sortBy,
          trang: currentPage,
          so_luong: ITEMS_PER_PAGE,
        });
        setPromotions(data.du_lieu);
        setTotalPages(data.tong_trang || 1);
      } catch (fetchError: unknown) {
        toast.error(getErrorMessage(fetchError, 'Không thể tải danh sách khuyến mãi'));
      } finally {
        setLoading(false);
      }
    };

    void runFetch();
  }, [searchQuery, selectedStatus, selectedType, sortBy, currentPage]);

  const canSubmit = useMemo(() => {
    const valueValid =
      formData.loai_khuyen_mai === 'mien_phi_van_chuyen'
        ? true
        : formData.gia_tri_khuyen_mai > 0;

    return (
      formData.ten_khuyen_mai.trim() &&
      formData.ma_khuyen_mai.trim() &&
      formData.thoi_gian_bat_dau &&
      formData.thoi_gian_ket_thuc &&
      valueValid
    );
  }, [formData]);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingPromo(null);
  };

  const loadPromotionList = async (page = currentPage) => {
    setLoading(true);
    try {
      const data = await adminPromotionApi.layDanhSach({
        tim_kiem: searchQuery.trim() || undefined,
        trang_thai: selectedStatus || undefined,
        loai_khuyen_mai: selectedType || undefined,
        sap_xep: sortBy,
        trang: page,
        so_luong: ITEMS_PER_PAGE,
      });
      setPromotions(data.du_lieu);
      setTotalPages(data.tong_trang || 1);
    } catch (fetchError: unknown) {
      toast.error(getErrorMessage(fetchError, 'Không thể tải danh sách khuyến mãi'));
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEdit = (promo: KhuyenMaiItem) => {
    setEditingPromo(promo);
    setFormData({
      ten_khuyen_mai: promo.ten_khuyen_mai,
      ma_khuyen_mai: promo.ma_khuyen_mai,
      loai_khuyen_mai: promo.loai_khuyen_mai,
      gia_tri_khuyen_mai: promo.gia_tri_khuyen_mai,
      don_hang_toi_thieu: promo.don_hang_toi_thieu,
      thoi_gian_bat_dau: toInputDateTime(promo.thoi_gian_bat_dau),
      thoi_gian_ket_thuc: toInputDateTime(promo.thoi_gian_ket_thuc),
      mo_ta: promo.mo_ta || '',
    });
    setShowEditModal(true);
  };

  const openDelete = (promo: KhuyenMaiItem) => {
    setDeletingPromo(promo);
    setShowDeleteModal(true);
  };

  const handleAdd = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await adminPromotionApi.tao({
        ...formData,
        gia_tri_khuyen_mai: formData.loai_khuyen_mai === 'mien_phi_van_chuyen' ? 0 : Number(formData.gia_tri_khuyen_mai),
        don_hang_toi_thieu: Number(formData.don_hang_toi_thieu),
        thoi_gian_bat_dau: new Date(formData.thoi_gian_bat_dau).toISOString(),
        thoi_gian_ket_thuc: new Date(formData.thoi_gian_ket_thuc).toISOString(),
      });
      setShowAddModal(false);
      resetForm();
      setCurrentPage(1);
      toast.success('Đã thêm khuyến mãi mới');
      await loadPromotionList(1);
    } catch (submitError: unknown) {
      toast.error(getErrorMessage(submitError, 'Không thể tạo khuyến mãi'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async () => {
    if (!editingPromo || !canSubmit) return;
    setSubmitting(true);
    try {
      await adminPromotionApi.capNhat(editingPromo.id, {
        ...formData,
        gia_tri_khuyen_mai: formData.loai_khuyen_mai === 'mien_phi_van_chuyen' ? 0 : Number(formData.gia_tri_khuyen_mai),
        don_hang_toi_thieu: Number(formData.don_hang_toi_thieu),
        thoi_gian_bat_dau: new Date(formData.thoi_gian_bat_dau).toISOString(),
        thoi_gian_ket_thuc: new Date(formData.thoi_gian_ket_thuc).toISOString(),
      });
      setShowEditModal(false);
      resetForm();
      toast.success('Đã cập nhật khuyến mãi');
      await loadPromotionList();
    } catch (submitError: unknown) {
      toast.error(getErrorMessage(submitError, 'Không thể cập nhật khuyến mãi'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingPromo) return;
    setSubmitting(true);
    try {
      await adminPromotionApi.xoa(deletingPromo.id);
      setShowDeleteModal(false);
      setDeletingPromo(null);
      toast.success('Đã xóa khuyến mãi');
      await loadPromotionList();
    } catch (submitError: unknown) {
      toast.error(getErrorMessage(submitError, 'Không thể xóa khuyến mãi'));
    } finally {
      setSubmitting(false);
    }
  };

  const handlePause = async (id: number) => {
    setSubmitting(true);
    try {
      await adminPromotionApi.tamDung(id);
      toast.success('Đã tạm dừng khuyến mãi');
      await loadPromotionList();
    } catch (submitError: unknown) {
      toast.error(getErrorMessage(submitError, 'Không thể tạm dừng khuyến mãi'));
    } finally {
      setSubmitting(false);
    }
  };

  const renderFormModal = (
    title: string,
    submitLabel: string,
    onSubmit: () => void,
    onClose: () => void,
  ) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 mx-4 space-y-6 relative">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-black">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" />
              <path d="M6 6 18 18" />
            </svg>
          </button>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 space-y-5">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Tên chương trình khuyến mãi</label>
              <input
                value={formData.ten_khuyen_mai}
                onChange={(e) => setFormData({ ...formData, ten_khuyen_mai: e.target.value })}
                placeholder="Tên chương trình"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Mã khuyến mãi</label>
              <input
                value={formData.ma_khuyen_mai}
                onChange={(e) => setFormData({ ...formData, ma_khuyen_mai: e.target.value.toUpperCase() })}
                placeholder="Mã khuyến mãi"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-black mb-2 block">Loại khuyến mãi</label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer w-52 shrink-0">
                  <input
                    type="radio"
                    name="formType"
                    checked={formData.loai_khuyen_mai === 'phan_tram'}
                    onChange={() => setFormData({ ...formData, loai_khuyen_mai: 'phan_tram', gia_tri_khuyen_mai: 0 })}
                    className="w-4 h-4 accent-green-600"
                  />
                  Giảm theo phần trăm
                </label>
                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={formData.loai_khuyen_mai === 'phan_tram' ? formData.gia_tri_khuyen_mai || '' : ''}
                    onChange={(e) => setFormData({ ...formData, gia_tri_khuyen_mai: Number(e.target.value) })}
                    disabled={formData.loai_khuyen_mai !== 'phan_tram'}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-300"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">%</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer w-52 shrink-0">
                  <input
                    type="radio"
                    name="formType"
                    checked={formData.loai_khuyen_mai === 'so_tien'}
                    onChange={() => setFormData({ ...formData, loai_khuyen_mai: 'so_tien', gia_tri_khuyen_mai: 0 })}
                    className="w-4 h-4 accent-green-600"
                  />
                  Giảm theo số tiền
                </label>
                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={formData.loai_khuyen_mai === 'so_tien' ? formData.gia_tri_khuyen_mai || '' : ''}
                    onChange={(e) => setFormData({ ...formData, gia_tri_khuyen_mai: Number(e.target.value) })}
                    disabled={formData.loai_khuyen_mai !== 'so_tien'}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-300"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">đ</span>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="formType"
                  checked={formData.loai_khuyen_mai === 'mien_phi_van_chuyen'}
                  onChange={() => setFormData({ ...formData, loai_khuyen_mai: 'mien_phi_van_chuyen', gia_tri_khuyen_mai: 0 })}
                  className="w-4 h-4 accent-green-600"
                />
                Miễn phí vận chuyển
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Điều kiện áp dụng</label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.don_hang_toi_thieu || ''}
                  onChange={(e) => setFormData({ ...formData, don_hang_toi_thieu: Number(e.target.value) })}
                  placeholder="Đơn tối thiểu"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">đ</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Mô tả điều kiện</label>
              <input
                value={formData.mo_ta}
                onChange={(e) => setFormData({ ...formData, mo_ta: e.target.value })}
                placeholder="Ví dụ: Đơn tối thiểu 100.000đ"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-black mb-2 block">Thời gian áp dụng</label>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600 mb-1.5 block">Thời gian bắt đầu</label>
                <input
                  type="datetime-local"
                  value={formData.thoi_gian_bat_dau}
                  onChange={(e) => setFormData({ ...formData, thoi_gian_bat_dau: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1.5 block">Thời gian kết thúc</label>
                <input
                  type="datetime-local"
                  value={formData.thoi_gian_ket_thuc}
                  onChange={(e) => setFormData({ ...formData, thoi_gian_ket_thuc: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer min-w-[120px]"
          >
            Hủy
          </button>
          <button
            onClick={onSubmit}
            disabled={!canSubmit || submitting}
            className="px-8 py-3 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white text-sm font-bold transition-colors cursor-pointer min-w-[120px]"
          >
            {submitting ? 'Đang lưu...' : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-black tracking-wide">QUẢN LÝ KHUYẾN MÃI</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-bold transition-colors shadow-sm cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          Thêm khuyến mãi
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[250px] max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc mã khuyến mãi"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2.5 text-sm outline-none focus:border-green-500 transition-colors shadow-sm"
          />
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value as '' | KhuyenMaiTrangThai); setCurrentPage(1); }}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:border-green-500 cursor-pointer"
          >
            {statusOptions.map((option) => <option key={option.label} value={option.value}>{option.label}</option>)}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        <div className="relative">
          <select
            value={selectedType}
            onChange={(e) => { setSelectedType(e.target.value as '' | KhuyenMaiLoai); setCurrentPage(1); }}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:border-green-500 cursor-pointer"
          >
            {typeOptions.map((option) => <option key={option.label} value={option.value}>{option.label}</option>)}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'moi_nhat' | 'sap_het_han' | 'hieu_qua_cao_nhat' | 'giam_gia_cao_nhat')}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:border-green-500 cursor-pointer"
          >
            {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-20 text-center text-gray-400 text-sm">Đang tải khuyến mãi...</div>
        ) : promotions.length > 0 ? promotions.map((promo) => {
          const color = getStatusColor(promo.trang_thai);
          return (
            <div key={promo.id} className={`rounded-2xl border ${color.border} ${color.bg} overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
              <div className={`px-5 py-3 ${color.topBg}`}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className={`text-base font-bold ${color.title}`}>{promo.ten_khuyen_mai}</h3>
                  <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-gray-700">
                    {getStatusLabel(promo.trang_thai)}
                  </span>
                </div>
              </div>

              <div className="px-5 py-4 space-y-2 text-sm text-gray-600">
                <p className="font-semibold text-black">{promo.ma_khuyen_mai}</p>
                <p>Loại khuyến mãi: <span className="font-medium text-black">{getTypeLabel(promo.loai_khuyen_mai)}</span></p>
                <p>Giá trị khuyến mãi: <span className="font-medium text-black">{getValueLabel(promo)}</span></p>
                <p>Điều kiện áp dụng: <span className="font-medium text-black">{promo.dieu_kien_ap_dung}</span></p>
                <p>Số lượt đã sử dụng: <span className="font-medium text-black">{promo.so_luot_da_dung.toLocaleString('vi-VN')}</span></p>
                <p>Thời gian bắt đầu: <span className="font-medium text-black">{formatDate(promo.thoi_gian_bat_dau)}</span></p>
                <p>Thời gian kết thúc: <span className="font-medium text-black">{formatDate(promo.thoi_gian_ket_thuc)}</span></p>
              </div>

              <div className="px-5 py-3 flex items-center gap-2 border-t border-gray-100/60">
                <button
                  onClick={() => openEdit(promo)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Sửa
                </button>

                {promo.trang_thai !== 'da_ket_thuc' && promo.trang_thai !== 'tam_dung' ? (
                  <button
                    onClick={() => void handlePause(promo.id)}
                    disabled={submitting}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Tạm dừng
                  </button>
                ) : null}

                <div className="flex-1" />

                <button
                  onClick={() => openDelete(promo)}
                  className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Xóa
                </button>
              </div>
            </div>
          );
        }) : (
          <div className="col-span-full py-20 text-center text-gray-400 text-sm">
            Không có khuyến mãi nào phù hợp với bộ lọc đã chọn.
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {showAddModal && renderFormModal('Thêm khuyến mãi', 'Thêm', () => { void handleAdd(); }, () => setShowAddModal(false))}
      {showEditModal && renderFormModal('Sửa thông tin khuyến mãi', 'Lưu thay đổi', () => { void handleEdit(); }, () => { setShowEditModal(false); resetForm(); })}

      {showDeleteModal && deletingPromo ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 mx-4 space-y-5 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-black">Xóa khuyến mãi</h3>
              <button
                onClick={() => { setShowDeleteModal(false); setDeletingPromo(null); }}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18" />
                  <path d="M6 6 18 18" />
                </svg>
              </button>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 space-y-3">
              <p className="font-bold text-black">{deletingPromo.ten_khuyen_mai}</p>
              <p className="text-sm text-gray-500">Mã: {deletingPromo.ma_khuyen_mai}</p>
              <p className="text-sm text-gray-500">Điều kiện áp dụng: {deletingPromo.dieu_kien_ap_dung}</p>
              <p className="text-sm text-gray-500">Số lượt đã sử dụng: {deletingPromo.so_luot_da_dung.toLocaleString('vi-VN')}</p>
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={() => { setShowDeleteModal(false); setDeletingPromo(null); }}
                className="px-8 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer min-w-[120px]"
              >
                Hủy
              </button>
              <button
                onClick={() => { void handleDelete(); }}
                disabled={submitting}
                className="px-8 py-3 rounded-xl bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white text-sm font-bold transition-colors cursor-pointer min-w-[120px]"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
