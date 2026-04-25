'use client';
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from 'react';
import OrderDetailView from './OrderDetailView';
import type { OrderDetailData } from './OrderDetailView';
import { fmt, storeOrderApi, type StoreOrderDetail } from '@/shared/storeOrderApi';
import { STORE_OVERVIEW_REFRESH_EVENT } from '@/shared/storeEvents';
import {
  storeOverviewApi,
  type StoreOverviewOrderItem,
  type StoreOverviewResponse,
  type TrangThaiDonHangTongQuan,
} from '@/shared/storeOverviewApi';

type OrderStatus = 'Đã giao' | 'Đã hủy' | 'Trả hàng' | 'Đang giao hàng' | 'Đang giao';
type TimeFilterValue = 'today' | '7days' | '30days' | 'custom';

const ORDER_STATUS_FILTER: Array<{ label: string; value: TrangThaiDonHangTongQuan }> = [
  { label: 'Tất cả', value: 'tat_ca' },
  { label: 'Đã giao', value: 'da_giao' },
  { label: 'Đã hủy', value: 'da_huy' },
  { label: 'Trả hàng', value: 'tra_hang' },
  { label: 'Đang giao hàng', value: 'dang_giao' },
];

const TIME_FILTER: Array<{ label: string; value: TimeFilterValue }> = [
  { label: 'Hôm nay', value: 'today' },
  { label: '7 ngày qua', value: '7days' },
  { label: '30 ngày qua', value: '30days' },
  { label: 'Tùy chỉnh', value: 'custom' },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  'Đã giao': 'text-[#2e7d32]',
  'Đã hủy': 'text-[#d32f2f]',
  'Trả hàng': 'text-[#d32f2f]',
  'Đang giao hàng': 'text-[#1976d2]',
  'Đang giao': 'text-[#1976d2]',
};

function formatDateTime(value?: string | null): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatTime(value?: string | null): string {
  if (!value) return '';
  return String(value).slice(0, 5);
}

function toStoreStatusLabel(status: string): string {
  switch (status) {
    case 'hoat_dong':
      return 'Đang mở cửa';
    case 'tam_nghi':
      return 'Tạm nghỉ';
    case 'cho_duyet':
      return 'Chờ duyệt';
    case 'bi_khoa':
      return 'Bị khóa';
    default:
      return status;
  }
}

function mapTimeline(detail: StoreOrderDetail): OrderDetailData['timeline'] {
  const statusDb = detail.trang_thai_db;
  const daHoanTat = ['da_giao', 'da_hoan_tien'].includes(statusDb);
  const daHuy = statusDb === 'da_huy';
  const traHang = statusDb === 'tra_hang';

  return [
    {
      label: 'Đã đặt hàng',
      time: formatDateTime(detail.thoi_gian_dat),
      done: Boolean(detail.thoi_gian_dat),
    },
    {
      label: 'Đã xác nhận đơn hàng',
      time: formatDateTime(detail.thoi_gian_xac_nhan),
      done: Boolean(detail.thoi_gian_xac_nhan),
    },
    {
      label: 'Đang giao',
      time: formatDateTime(detail.thoi_gian_giao),
      done: Boolean(detail.thoi_gian_giao),
    },
    {
      label: daHuy ? 'Đã hủy' : traHang ? 'Trả hàng' : 'Hoàn thành',
      time: formatDateTime(
        daHuy
          ? detail.thoi_gian_huy
          : detail.thoi_gian_hoan_tat ?? detail.thoi_gian_hoan_tien,
      ),
      done: daHuy || traHang || daHoanTat,
    },
  ];
}

function mapOrderDetailToView(detail: StoreOrderDetail): OrderDetailData {
  const review = detail.danh_gia?.[0];

  return {
    code: detail.ma_don_hang,
    customer: detail.thong_tin_khach_hang.ten_hien_thi,
    customerPhone: detail.thong_tin_khach_hang.so_dien_thoai,
    date: formatDateTime(detail.thoi_gian_dat),
    deliveryDate: detail.thoi_gian_hoan_tat
      ? formatDateTime(detail.thoi_gian_hoan_tat)
      : detail.thoi_gian_giao
        ? formatDateTime(detail.thoi_gian_giao)
        : undefined,
    status: detail.trang_thai_don_hang,
    items: detail.danh_sach_mon_an.map((item) => ({
      name: item.ten_mon,
      qty: item.so_luong,
      price: fmt(item.don_gia),
      image:
        item.hinh_anh ||
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=60&h=60&fit=crop',
    })),
    subtotal: fmt(detail.tong_tien_don_hang.tam_tinh),
    shippingFee: fmt(detail.tong_tien_don_hang.phi_van_chuyen),
    discountAmount: fmt(detail.tong_tien_don_hang.tong_giam_gia),
    totalValue: fmt(detail.tong_tien_don_hang.tong_thanh_toan),
    netIncome: fmt(detail.tong_tien_don_hang.thu_nhap_cua_hang),
    timeline: mapTimeline(detail),
    review: review
      ? {
          rating: review.so_sao,
          date: formatDateTime(review.ngay_danh_gia),
          text: review.noi_dung ?? '',
        }
      : undefined,
  };
}

export default function OverviewTab() {
  const [statusFilter, setStatusFilter] = useState<TrangThaiDonHangTongQuan>('tat_ca');
  const [searchText, setSearchText] = useState('');
  const [timeFilter, setTimeFilter] = useState<TimeFilterValue>('today');
  const [customFromDate, setCustomFromDate] = useState('');
  const [customToDate, setCustomToDate] = useState('');

  const [timeDropdown, setTimeDropdown] = useState(false);
  const [statusDropdown, setStatusDropdown] = useState(false);

  const [overview, setOverview] = useState<StoreOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedOrderCode, setSelectedOrderCode] = useState<string | null>(null);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderDetailData | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');

  const loadOverview = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);

      if (timeFilter === 'custom' && (!customFromDate || !customToDate)) {
        if (!silent) {
          setError('Vui lòng chọn đầy đủ Từ ngày và Đến ngày để lọc tùy chỉnh.');
          setLoading(false);
        }
        return;
      }

      setError('');

      try {
        const data = await storeOverviewApi.layTongQuan({
          tim_kiem: searchText.trim() || undefined,
          trang_thai: statusFilter,
          sap_xep: 'moi_nhat',
          bo_loc_thoi_gian: timeFilter,
          tu_ngay: timeFilter === 'custom' ? customFromDate : undefined,
          den_ngay: timeFilter === 'custom' ? customToDate : undefined,
          trang: 1,
          so_luong: 20,
        });
        setOverview(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Không thể tải tổng quan cửa hàng.');
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [searchText, statusFilter, timeFilter, customFromDate, customToDate],
  );

  useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      void loadOverview(true);
    }, 20000);

    return () => {
      window.clearInterval(timer);
    };
  }, [loadOverview]);

  useEffect(() => {
    const onRefresh = () => {
      void loadOverview(true);
    };

    window.addEventListener(STORE_OVERVIEW_REFRESH_EVENT, onRefresh);

    return () => {
      window.removeEventListener(STORE_OVERVIEW_REFRESH_EVENT, onRefresh);
    };
  }, [loadOverview]);

  const handleViewDetail = useCallback(async (maDonHang: string) => {
    setSelectedOrderCode(maDonHang);
    setDetailLoading(true);
    setDetailError('');
    try {
      const detail = await storeOrderApi.layChiTiet(maDonHang);
      setSelectedOrderDetail(mapOrderDetailToView(detail));
    } catch (e) {
      setDetailError(e instanceof Error ? e.message : 'Không thể tải chi tiết đơn hàng.');
      setSelectedOrderCode(null);
      setSelectedOrderDetail(null);
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const orders = useMemo<StoreOverviewOrderItem[]>(() => {
    return overview?.danh_sach_don_hang_trong_ngay.du_lieu ?? [];
  }, [overview]);

  const timeFilterLabel = useMemo(() => {
    return TIME_FILTER.find((item) => item.value === timeFilter)?.label ?? 'Theo thời gian';
  }, [timeFilter]);

  if (selectedOrderDetail) {
    return (
      <OrderDetailView
        order={selectedOrderDetail}
        onBack={() => {
          setSelectedOrderCode(null);
          setSelectedOrderDetail(null);
        }}
      />
    );
  }

  const thongTin = overview?.thong_tin_cua_hang;
  const thongKeHomNay = overview?.thong_ke_hom_nay;
  const thongKeTrangThai = overview?.thong_ke_trang_thai_don_hang;
  const topMon = overview?.top_mon_ban_chay_trong_ngay ?? [];
  const tongThuNhap = overview?.tong_thu_nhap_trong_ngay ?? 0;

  return (
    <div>
      <div className="mb-4">
        {error ? (
          <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
            {error}
          </div>
        ) : null}
        {detailError ? (
          <div className="mt-2 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
            {detailError}
          </div>
        ) : null}
      </div>

      <div className="rounded-[16px] bg-white p-6 shadow-sm">
        <div className="flex gap-6">
          <img
            src={
              thongTin?.anh_dai_dien ||
              'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop'
            }
            alt={thongTin?.ten_cua_hang ?? 'Cửa hàng'}
            className="h-[140px] w-[200px] rounded-[12px] object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[22px] font-bold text-black">
                  {loading ? 'Đang tải...' : thongTin?.ten_cua_hang ?? 'Cửa hàng'}
                </h2>
                <p className="mt-1 text-[14px] text-[#888]">Quản lý tổng quan hoạt động trong ngày</p>
              </div>
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[10px] bg-[#f6faf4] text-[18px] font-bold text-[#2e7d32]">
                {loading ? '...' : (thongTin?.diem_danh_gia ?? 0).toFixed(1)}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-8">
              <span className="text-[15px] font-semibold text-[#f0a050]">Hôm nay</span>
              <div className="text-center">
                <p className="text-[20px] font-bold text-black">
                  {loading ? '...' : fmt(thongKeHomNay?.doanh_thu ?? 0)}
                </p>
                <p className="text-[12px] text-[#888]">Doanh thu</p>
              </div>
              <div className="text-center">
                <p className="text-[20px] font-bold text-black">
                  {loading ? '...' : thongKeHomNay?.tong_don_hang ?? 0}
                </p>
                <p className="text-[12px] text-[#888]">Đơn hàng</p>
              </div>
              <div className="text-center">
                <p className="text-[20px] font-bold text-black">{loading ? '...' : thongKeHomNay?.don_huy ?? 0}</p>
                <p className="text-[12px] text-[#888]">Đơn hủy</p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[13px] text-[#555]">
              <span>📍</span>
              <span>{thongTin?.dia_chi_kinh_doanh ?? '—'}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-[13px] text-[#2e7d32]">
              <span>⏰</span>
              <span>
                {toStoreStatusLabel(thongTin?.trang_thai_hoat_dong ?? '')}
                {(thongTin?.gio_mo_cua || thongTin?.gio_dong_cua)
                  ? ` ${formatTime(thongTin?.gio_mo_cua)} - ${formatTime(thongTin?.gio_dong_cua)}`
                  : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[16px] bg-white p-5 shadow-sm">
          <h3 className="text-[16px] font-bold text-black">Quản lý đơn hàng</h3>
          <div className="mt-4 grid grid-cols-4 gap-3 text-center">
            <div>
              <p className="text-[22px] font-bold text-black">
                {loading ? '...' : (thongKeTrangThai?.ty_le_hoan_thanh ?? 0).toFixed(1)}%
              </p>
              <p className="text-[12px] text-[#2e7d32]">Hoàn thành</p>
              <div className="mx-auto mt-1 h-1 w-8 rounded bg-[#2e7d32]" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-black">
                {loading ? '...' : (thongKeTrangThai?.ty_le_huy ?? 0).toFixed(1)}%
              </p>
              <p className="text-[12px] text-[#f0a050]">Hủy đơn</p>
              <div className="mx-auto mt-1 h-1 w-8 rounded bg-[#f0a050]" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-black">
                {loading ? '...' : (thongKeTrangThai?.ty_le_dang_giao ?? 0).toFixed(1)}%
              </p>
              <p className="text-[12px] text-[#42a5f5]">Đang giao</p>
              <div className="mx-auto mt-1 h-1 w-8 rounded bg-[#42a5f5]" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-black">
                {loading ? '...' : (thongKeTrangThai?.ty_le_tra_hang ?? 0).toFixed(1)}%
              </p>
              <p className="text-[12px] text-[#888]">Trả hàng</p>
              <div className="mx-auto mt-1 h-1 w-8 rounded bg-[#888]" />
            </div>
          </div>
          <p className="mt-4 text-[11px] text-[#999]">
            {loading
              ? 'Đang cập nhật số liệu...'
              : `Tổng ${thongKeTrangThai?.tong_so_don ?? 0} đơn trong hôm nay.`}
          </p>
        </div>

        <div className="rounded-[16px] bg-white p-5 shadow-sm">
          <h3 className="text-[16px] font-bold text-black">Top món bán chạy hôm nay</h3>
          <div className="mt-4 space-y-3">
            {loading ? (
              <p className="text-[13px] text-[#888]">Đang tải...</p>
            ) : topMon.length === 0 ? (
              <p className="text-[13px] text-[#888]">Chưa có món bán chạy trong hôm nay.</p>
            ) : (
              topMon.map((item) => (
                <div key={`${item.id_mon_an ?? item.ten_mon_an}-${item.xep_hang}`} className="flex items-center gap-4">
                  <span className="text-[18px] font-bold text-[#f0a050]">{item.xep_hang}</span>
                  <img
                    src={
                      item.hinh_anh_mon_an ||
                      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop'
                    }
                    alt={item.ten_mon_an}
                    className="h-10 w-10 rounded-[8px] object-cover"
                  />
                  <span className="flex-1 text-[14px] text-black">{item.ten_mon_an}</span>
                  <span className="text-[14px] font-semibold text-[#2e7d32]">
                    {item.so_luong_da_ban} Lượt bán
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[16px] bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <h3 className="pt-1 text-[16px] font-bold uppercase text-black">ĐƠN HÀNG TRONG HÔM NAY</h3>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setTimeDropdown(!timeDropdown);
                    setStatusDropdown(false);
                  }}
                  className="flex items-center gap-1 rounded-[8px] border border-[#ddd] bg-white px-3 py-1.5 text-[13px] text-black"
                >
                  <span>{timeFilterLabel}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {timeDropdown && (
                  <div className="absolute right-0 top-[calc(100%+4px)] z-10 w-[180px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                    {TIME_FILTER.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => {
                          setTimeFilter(t.value);
                          setTimeDropdown(false);
                        }}
                        className={`block w-full px-3 py-2 text-left text-[13px] transition hover:bg-[#f6faf4] ${
                          timeFilter === t.value ? 'font-bold text-[#2e7d32]' : 'text-black'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setStatusDropdown(!statusDropdown);
                    setTimeDropdown(false);
                  }}
                  className="flex items-center gap-1 rounded-[8px] border border-[#ddd] bg-white px-3 py-1.5 text-[13px] text-black"
                >
                  <span>Trạng thái đơn</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {statusDropdown && (
                  <div className="absolute right-0 top-[calc(100%+4px)] z-10 w-[180px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                    {ORDER_STATUS_FILTER.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => {
                          setStatusFilter(s.value);
                          setStatusDropdown(false);
                        }}
                        className={`block w-full px-3 py-2 text-left text-[13px] transition hover:bg-[#f6faf4] ${
                          statusFilter === s.value ? 'font-bold text-[#2e7d32]' : 'text-black'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 rounded-[8px] border border-[#ddd] bg-white px-3 py-1.5">
                <span className="text-[13px] text-[#999]">Tìm kiếm</span>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-24 bg-transparent text-[13px] text-black outline-none"
                />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
            </div>

            {timeFilter === 'custom' ? (
              <div className="flex items-center gap-2 rounded-[8px] border border-[#e8e8e8] bg-[#fafafa] px-2 py-1.5">
                <input
                  type="date"
                  value={customFromDate}
                  onChange={(e) => setCustomFromDate(e.target.value)}
                  className="rounded border border-[#ddd] px-2 py-1 text-[12px] text-black outline-none"
                />
                <span className="text-[12px] text-[#666]">đến</span>
                <input
                  type="date"
                  value={customToDate}
                  onChange={(e) => setCustomToDate(e.target.value)}
                  className="rounded border border-[#ddd] px-2 py-1 text-[12px] text-black outline-none"
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#e8e8e8] text-left text-[#888]">
                <th className="px-2 py-3 font-medium">Mã đơn</th>
                <th className="px-2 py-3 font-medium">Tên khách</th>
                <th className="px-2 py-3 font-medium">Giá trị đơn hàng</th>
                <th className="px-2 py-3 font-medium">Giảm giá</th>
                <th className="px-2 py-3 font-medium">Phí nền tảng</th>
                <th className="px-2 py-3 font-medium">Giờ đặt</th>
                <th className="px-2 py-3 font-medium">Trạng thái đơn hàng</th>
                <th className="px-2 py-3 font-medium">Thu nhập đơn</th>
                <th className="px-2 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-2 py-4 text-[#888]" colSpan={9}>
                    Đang tải danh sách đơn hàng...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td className="px-2 py-4 text-[#888]" colSpan={9}>
                    Không có đơn hàng phù hợp.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const status = order.trang_thai_don_hang as OrderStatus;
                  return (
                    <tr key={order.id} className="border-b border-[#f0f0f0]">
                      <td className="px-2 py-3 font-medium text-black">{order.ma_don_hang}</td>
                      <td className="px-2 py-3 text-black">{order.ten_khach_hang}</td>
                      <td className="px-2 py-3 text-[#f0a050]">{fmt(order.gia_tri_don_hang)}</td>
                      <td className="px-2 py-3 text-[#d32f2f]">-{fmt(order.giam_gia)}</td>
                      <td className="px-2 py-3 text-black">{fmt(order.phi_nen_tang)}</td>
                      <td className="px-2 py-3 text-black">{formatDateTime(order.thoi_gian_dat)}</td>
                      <td className={`px-2 py-3 font-medium ${STATUS_COLORS[status] ?? 'text-black'}`}>
                        {order.trang_thai_don_hang}
                      </td>
                      <td className="px-2 py-3 text-black">{fmt(order.thu_nhap_tu_don_hang)}</td>
                      <td className="px-2 py-3">
                        <button
                          type="button"
                          onClick={() => {
                            void handleViewDetail(order.ma_don_hang);
                          }}
                          disabled={detailLoading && selectedOrderCode === order.ma_don_hang}
                          className="rounded-[6px] bg-[#2e7d32] px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-[#256b28] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {detailLoading && selectedOrderCode === order.ma_don_hang ? 'Đang tải...' : 'Xem chi tiết'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#e8e8e8] pt-4">
          <span className="text-[15px] font-bold text-black">Tổng thu nhập hôm nay</span>
          <span className="text-[22px] font-bold text-[#d32f2f]">{loading ? '...' : fmt(tongThuNhap)}</span>
        </div>
      </div>
    </div>
  );
}
