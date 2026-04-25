'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import OrderDetailView from './OrderDetailView';
import type { OrderDetailData } from './OrderDetailView';
import { fmt, storeOrderApi, type StoreOrderDetail } from '@/shared/storeOrderApi';
import {
  storeRevenueApi,
  type StoreRevenueOverviewResponse,
  type StoreRevenueOrderListResponse,
  type StoreRevenueStatusFilter,
} from '@/shared/storeRevenueApi';
import { STORE_OVERVIEW_REFRESH_EVENT } from '@/shared/storeEvents';

type OrderStatus = 'Đã giao' | 'Đã hủy' | 'Trả hàng' | 'Đang giao hàng' | 'Đang giao';
type TimeFilterValue = 'today' | '7days' | '30days' | 'custom';

const ORDER_STATUS_FILTER: Array<{ label: string; value: StoreRevenueStatusFilter }> = [
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

const PIE_COLORS = ['#2e7d32', '#66bb6a', '#f0a050', '#42a5f5', '#ab47bc', '#8d6e63'];

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

function RevenueLineChart({
  data,
}: {
  data: StoreRevenueOverviewResponse['bieu_do_doanh_thu_30_ngay'];
}) {
  const W = 680;
  const H = 220;
  const PAD = { t: 20, r: 20, b: 30, l: 48 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  const values = data.map((d) => d.doanh_thu);
  const minV = Math.min(...values, 0);
  const maxV = Math.max(...values, 1);
  const range = Math.max(1, maxV - minV);

  const points = data.map((v, i) => {
    const x = PAD.l + (i / Math.max(1, data.length - 1)) * innerW;
    const y = PAD.t + innerH - ((v.doanh_thu - minV) / range) * innerH;
    return { x, y, v };
  });

  if (points.length === 0) return null;

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaD = `${pathD} L${points[points.length - 1].x},${H - PAD.b} L${points[0].x},${H - PAD.b} Z`;

  const yLabels = [0, 0.5, 1].map((k) => {
    const value = minV + range * k;
    const y = PAD.t + innerH - k * innerH;
    return { value, y };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      {yLabels.map((yl, idx) => (
        <g key={idx}>
          <line x1={PAD.l} y1={yl.y} x2={W - PAD.r} y2={yl.y} stroke="#f0f0f0" strokeWidth="1" />
          <text x={PAD.l - 8} y={yl.y + 4} textAnchor="end" className="fill-[#999] text-[10px]">
            {Math.round(yl.value / 1000)}K
          </text>
        </g>
      ))}

      <path d={areaD} fill="url(#areaGradRevenue)" opacity="0.3" />
      <defs>
        <linearGradient id="areaGradRevenue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2e7d32" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2e7d32" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d={pathD}
        fill="none"
        stroke="#2e7d32"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="5" fill="#2e7d32" />

      {points
        .filter((_, i) => i % 5 === 0 || i === points.length - 1)
        .map((p, i) => (
          <text key={i} x={p.x} y={H - 8} textAnchor="middle" className="fill-[#999] text-[9px]">
            {p.v.nhan}
          </text>
        ))}
    </svg>
  );
}

function DonutChart({
  items,
}: {
  items: Array<{ ten_mon_an: string; ty_le: number }>;
}) {
  const segments = items.map((item, index) => ({
    ...item,
    color: PIE_COLORS[index % PIE_COLORS.length],
  }));

  const normalized =
    segments.length > 0
      ? segments
      : [{ ten_mon_an: 'Chưa có dữ liệu', ty_le: 100, color: '#e0e0e0' }];

  const conic = normalized
    .reduce(
      (acc, item) => {
        const start = acc.cursor;
        const end = acc.cursor + item.ty_le;
        return {
          cursor: end,
          parts: [...acc.parts, `${item.color} ${start}% ${end}%`],
        };
      },
      { cursor: 0, parts: [] as string[] },
    )
    .parts.join(', ');

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-[130px] w-[130px] shrink-0">
        <div className="h-full w-full rounded-full" style={{ background: `conic-gradient(${conic})` }} />
        <div className="absolute inset-[20%] flex items-center justify-center rounded-full bg-white text-[16px] font-bold text-[#2e7d32]">
          {normalized[0]?.ty_le ?? 0}%
        </div>
      </div>
      <div className="space-y-2">
        {normalized.map((item) => (
          <div key={item.ten_mon_an} className="flex items-center gap-2 text-[12px]">
            <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-black">{item.ten_mon_an}</span>
            <span className="text-[#666]">{item.ty_le}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RevenueTab() {
  const [statusFilter, setStatusFilter] = useState<StoreRevenueStatusFilter>('tat_ca');
  const [searchText, setSearchText] = useState('');
  const [timeFilter, setTimeFilter] = useState<TimeFilterValue>('today');
  const [customFromDate, setCustomFromDate] = useState('');
  const [customToDate, setCustomToDate] = useState('');

  const [timeDropdown, setTimeDropdown] = useState(false);
  const [statusDropdown, setStatusDropdown] = useState(false);

  const [overviewData, setOverviewData] = useState<StoreRevenueOverviewResponse | null>(null);
  const [orderListData, setOrderListData] = useState<StoreRevenueOrderListResponse | null>(null);

  const [overviewLoading, setOverviewLoading] = useState(true);
  const [orderListLoading, setOrderListLoading] = useState(true);

  const [overviewError, setOverviewError] = useState('');
  const [orderListError, setOrderListError] = useState('');

  const [selectedOrderCode, setSelectedOrderCode] = useState<string | null>(null);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderDetailData | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');

  const loadOverview = useCallback(async (silent = false) => {
    if (!silent) setOverviewLoading(true);
    setOverviewError('');

    try {
      const res = await storeRevenueApi.layTongQuan();
      setOverviewData(res);
    } catch (e) {
      setOverviewError(e instanceof Error ? e.message : 'Không thể tải tổng quan doanh thu.');
    } finally {
      if (!silent) setOverviewLoading(false);
    }
  }, []);

  const loadOrderList = useCallback(
    async (silent = false) => {
      if (!silent) setOrderListLoading(true);

      if (timeFilter === 'custom' && (!customFromDate || !customToDate)) {
        if (!silent) {
          setOrderListError('Vui lòng chọn đầy đủ Từ ngày và Đến ngày để lọc tùy chỉnh.');
          setOrderListLoading(false);
        }
        return;
      }

      setOrderListError('');

      try {
        const res = await storeRevenueApi.layDanhSachDonHang({
          tim_kiem: searchText.trim() || undefined,
          trang_thai: statusFilter,
          bo_loc_thoi_gian: timeFilter,
          tu_ngay: timeFilter === 'custom' ? customFromDate : undefined,
          den_ngay: timeFilter === 'custom' ? customToDate : undefined,
          trang: 1,
          so_luong: 20,
        });
        setOrderListData(res);
      } catch (e) {
        setOrderListError(e instanceof Error ? e.message : 'Không thể tải danh sách đơn hàng doanh thu.');
      } finally {
        if (!silent) setOrderListLoading(false);
      }
    },
    [searchText, statusFilter, timeFilter, customFromDate, customToDate],
  );

  useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

  useEffect(() => {
    void loadOrderList();
  }, [loadOrderList]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      void loadOverview(true);
      void loadOrderList(true);
    }, 20000);

    return () => {
      window.clearInterval(timer);
    };
  }, [loadOverview, loadOrderList]);

  useEffect(() => {
    const onRefresh = () => {
      void loadOverview(true);
      void loadOrderList(true);
    };

    window.addEventListener(STORE_OVERVIEW_REFRESH_EVENT, onRefresh);

    return () => {
      window.removeEventListener(STORE_OVERVIEW_REFRESH_EVENT, onRefresh);
    };
  }, [loadOverview, loadOrderList]);

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

  const summary = overviewData?.thong_ke_tong_quan;
  const chart30 = overviewData?.bieu_do_doanh_thu_30_ngay ?? [];
  const donutData = overviewData?.bieu_do_doanh_thu_theo_mon ?? [];
  const topMon = overviewData?.top_mon_ban_chay ?? [];
  const orders = orderListData?.du_lieu ?? [];

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

  return (
    <div>
      <h1 className="text-[22px] font-bold uppercase text-black">QUẢN LÝ DOANH THU</h1>

      {overviewError ? (
        <div className="mt-4 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
          {overviewError}
        </div>
      ) : null}
      {orderListError ? (
        <div className="mt-4 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
          {orderListError}
        </div>
      ) : null}
      {detailError ? (
        <div className="mt-4 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
          {detailError}
        </div>
      ) : null}

      <div className="mt-5 grid grid-cols-4 gap-4">
        <div className="rounded-[12px] bg-white p-5 shadow-sm">
          <p className="text-[13px] text-[#888]">Doanh thu hôm nay</p>
          <p className="mt-2 text-[24px] font-bold text-black">
            {overviewLoading ? '...' : fmt(summary?.doanh_thu_hom_nay ?? 0)}
          </p>
        </div>
        <div className="rounded-[12px] bg-white p-5 shadow-sm">
          <p className="text-[13px] text-[#888]">Doanh thu thực nhận</p>
          <p className="mt-2 text-[24px] font-bold text-black">
            {overviewLoading ? '...' : fmt(summary?.doanh_thu_thuc_nhan ?? 0)}
          </p>
        </div>
        <div className="rounded-[12px] bg-white p-5 shadow-sm">
          <p className="text-[13px] text-[#888]">Tổng số đơn hàng</p>
          <p className="mt-2 text-[24px] font-bold text-black">
            {overviewLoading ? '...' : (summary?.tong_so_don_hang ?? 0).toLocaleString('vi-VN')}
          </p>
        </div>
        <div className="rounded-[12px] bg-white p-5 shadow-sm">
          <p className="text-[13px] text-[#888]">Tỷ lệ hủy/hoàn</p>
          <p className="mt-2 text-[24px] font-bold text-black">
            {overviewLoading ? '...' : `${summary?.ty_le_huy_hoan ?? 0}%`}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[12px] bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold text-black">Thống kê doanh thu 30 ngày qua</h3>
          <div className="mt-3">
            {overviewLoading ? (
              <p className="text-[13px] text-[#888]">Đang tải...</p>
            ) : (
              <RevenueLineChart data={chart30} />
            )}
          </div>
        </div>

        <div className="rounded-[12px] bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold text-black">Doanh thu theo món</h3>
          <div className="mt-5">
            {overviewLoading ? (
              <p className="text-[13px] text-[#888]">Đang tải...</p>
            ) : (
              <DonutChart items={donutData.slice(0, 5)} />
            )}
          </div>
          <div className="mt-4 border-t border-[#f0f0f0] pt-3">
            <p className="text-[13px] font-semibold text-black">Top món bán chạy</p>
            <div className="mt-2 space-y-1.5">
              {topMon.length === 0 ? (
                <p className="text-[12px] text-[#888]">Chưa có dữ liệu.</p>
              ) : (
                topMon.map((item) => (
                  <div
                    key={`${item.xep_hang}-${item.ten_mon_an}`}
                    className="flex items-center justify-between text-[12px]"
                  >
                    <span className="text-black">
                      {item.xep_hang}. {item.ten_mon_an}
                    </span>
                    <span className="font-semibold text-[#2e7d32]">{item.so_luong_da_ban} món</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[12px] bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <h3 className="pt-1 text-[15px] font-bold text-black">Doanh thu theo trạng thái đơn</h3>
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
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Tìm kiếm"
                  className="w-24 bg-transparent text-[13px] text-black outline-none placeholder:text-[#999]"
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
              {orderListLoading ? (
                <tr>
                  <td className="px-2 py-4 text-[#888]" colSpan={9}>
                    Đang tải danh sách đơn...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td className="px-2 py-4 text-[#888]" colSpan={9}>
                    Không có dữ liệu phù hợp.
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
                      <td className={`px-2 py-3 font-semibold ${STATUS_COLORS[status] ?? 'text-black'}`}>
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
                          {detailLoading && selectedOrderCode === order.ma_don_hang
                            ? 'Đang tải...'
                            : 'Xem chi tiết'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
