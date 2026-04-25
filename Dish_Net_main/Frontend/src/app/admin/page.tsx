'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  adminDashboardApi,
  type ActivityItem,
  type DashboardDateFilter,
  type DashboardOverviewResponse,
} from '@/shared/adminDashboardApi';

const filters: Array<{ key: DashboardDateFilter; label: string }> = [
  { key: 'today', label: 'Hôm nay' },
  { key: '7days', label: '7 ngày' },
  { key: '30days', label: '30 ngày' },
  { key: 'custom', label: 'Tùy chọn' },
];

const statIcons: Record<string, React.ReactNode> = {
  users: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  store: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <rect width="20" height="5" x="2" y="7" rx="1" />
    </svg>
  ),
  orders: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  ),
  revenue: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
};

function formatCurrency(value: number) {
  return `${value.toLocaleString('vi-VN')} đ`;
}

function formatNumber(value: number) {
  return value.toLocaleString('vi-VN');
}

function formatRelativeTime(value: string) {
  const date = new Date(value);
  const diffMs = date.getTime() - Date.now();
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const formatter = new Intl.RelativeTimeFormat('vi', { numeric: 'auto' });

  if (Math.abs(diffMinutes) < 60) {
    return formatter.format(diffMinutes, 'minute');
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (Math.abs(diffHours) < 24) {
    return formatter.format(diffHours, 'hour');
  }

  const diffDays = Math.round(diffHours / 24);
  return formatter.format(diffDays, 'day');
}

function buildSmoothPath(points: Array<{ x: number; y: number }>) {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    const controlX = (current.x + next.x) / 2;
    path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }
  return path;
}

function getYAxisTicks(maxValue: number) {
  const rawTicks =
    maxValue <= 0
      ? [0, 1, 2, 3]
      : [0, maxValue / 3, (maxValue / 3) * 2, maxValue].map((value) => Math.round(value));

  return Array.from(new Set(rawTicks)).sort((a, b) => a - b);
}

function shouldRenderXAxisLabel(index: number, total: number) {
  if (total <= 7) return true;
  if (total <= 14) return index % 2 === 0;
  return index === 0 || index === total - 1 || index % 5 === 0;
}

function getInitials(value: string) {
  return value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function RankingAvatar({
  image,
  label,
  badge,
}: {
  image: string | null;
  label: string;
  badge: number;
}) {
  return (
    <div className="relative h-12 w-12 shrink-0">
      {image ? (
        <div
          role="img"
          aria-label={label}
          className="h-12 w-12 rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-sm font-bold text-gray-500">
          {getInitials(label) || badge}
        </div>
      )}
      <div className="absolute -bottom-1 -left-1 flex h-6 w-6 items-center justify-center rounded-xl bg-gray-900 text-xs font-bold text-white">
        {badge}
      </div>
    </div>
  );
}

function ActivityCard({ item }: { item: ActivityItem }) {
  return (
    <Link href={item.href} className="block rounded-xl px-3 py-3 transition hover:bg-gray-50">
      <p className="text-sm font-semibold text-black">{item.ten_chu_the}</p>
      <p className="mt-0.5 text-sm text-gray-600">{item.noi_dung}</p>
      <p className="mt-1 text-xs text-gray-400">{formatRelativeTime(item.thoi_gian)}</p>
    </Link>
  );
}

function OrdersTrendChart({
  data,
  loading,
}: {
  data: DashboardOverviewResponse['bieu_do_don_hang_theo_ngay'];
  loading: boolean;
}) {
  const width = 640;
  const height = 240;
  const padding = { top: 20, right: 20, bottom: 42, left: 34 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...data.map((item) => item.tong_don_hang), 0);
  const safeMaxValue = maxValue > 0 ? maxValue : 1;
  const ticks = getYAxisTicks(maxValue);
  const stepX = data.length > 1 ? innerWidth / (data.length - 1) : innerWidth / 2;

  const points = data.map((item, index) => {
    const x = padding.left + (data.length > 1 ? stepX * index : innerWidth / 2);
    const y = padding.top + innerHeight - (item.tong_don_hang / safeMaxValue) * innerHeight;
    return { x, y, value: item.tong_don_hang, label: item.nhan };
  });

  const linePath = buildSmoothPath(points);
  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`
    : '';

  return (
    <div className="rounded-[24px] border border-[#eef3ed] bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-black">Số đơn hàng theo ngày</h3>
          <p className="mt-1 text-xs text-gray-400">Xu hướng đơn hàng theo khoảng thời gian đã chọn</p>
        </div>
        <span className="rounded-full bg-[#f3faf1] px-3 py-1 text-xs font-medium text-[#5d7f58]">
          {data.length} mốc
        </span>
      </div>

      {loading ? (
        <div className="flex h-[260px] items-center justify-center text-sm text-gray-400">Đang tải biểu đồ...</div>
      ) : data.length === 0 ? (
        <div className="flex h-[260px] items-center justify-center rounded-2xl bg-[#fafcf9] text-sm text-gray-400">
          Không có dữ liệu đơn hàng trong khoảng thời gian này.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-[260px] w-full">
              <defs>
                <linearGradient id="ordersAreaFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1f8f3a" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#1f8f3a" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {ticks.map((tick, index) => {
                const y = padding.top + innerHeight - (tick / safeMaxValue) * innerHeight;
                return (
                  <g key={`${tick}-${index}`}>
                    <line
                      x1={padding.left}
                      x2={padding.left + innerWidth}
                      y1={y}
                      y2={y}
                      stroke="#edf2ee"
                      strokeDasharray="4 6"
                    />
                    <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#97a1b2">
                      {formatNumber(tick)}
                    </text>
                  </g>
                );
              })}

              {areaPath ? <path d={areaPath} fill="url(#ordersAreaFill)" /> : null}
              {linePath ? (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#1f8f3a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : null}

              {points.map((point, index) => (
                <g key={`${point.label}-${index}`}>
                  <circle cx={point.x} cy={point.y} r="5" fill="#ffffff" stroke="#1f8f3a" strokeWidth="3" />
                  <text x={point.x} y={point.y - 12} textAnchor="middle" fontSize="11" fill="#5b6474" fontWeight="600">
                    {formatNumber(point.value)}
                  </text>
                  {shouldRenderXAxisLabel(index, points.length) ? (
                    <text
                      x={point.x}
                      y={padding.top + innerHeight + 26}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#97a1b2"
                    >
                      {point.label}
                    </text>
                  ) : null}
                </g>
              ))}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

function RevenueBarChart({
  data,
  loading,
}: {
  data: DashboardOverviewResponse['bieu_do_doanh_thu_theo_thang'];
  loading: boolean;
}) {
  const width = 640;
  const height = 240;
  const padding = { top: 20, right: 20, bottom: 42, left: 52 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...data.map((item) => item.doanh_thu), 0);
  const safeMaxValue = maxValue > 0 ? maxValue : 1;
  const ticks = getYAxisTicks(maxValue);
  const gap = data.length > 1 ? 24 : 0;
  const barWidth =
    data.length > 0
      ? Math.min(70, Math.max(36, (innerWidth - gap * Math.max(0, data.length - 1)) / data.length))
      : 48;
  const totalBarsWidth = data.length * barWidth + Math.max(0, data.length - 1) * gap;
  const startX = padding.left + Math.max(0, (innerWidth - totalBarsWidth) / 2);

  return (
    <div className="rounded-[24px] border border-[#eef3ed] bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-black">Doanh thu theo tháng</h3>
          <p className="mt-1 text-xs text-gray-400">Doanh thu từ các đơn đã giao</p>
        </div>
        <span className="rounded-full bg-[#f2f7ff] px-3 py-1 text-xs font-medium text-[#5875a0]">
          {data.length} mốc
        </span>
      </div>

      {loading ? (
        <div className="flex h-[260px] items-center justify-center text-sm text-gray-400">Đang tải biểu đồ...</div>
      ) : data.length === 0 ? (
        <div className="flex h-[260px] items-center justify-center rounded-2xl bg-[#fafcf9] text-sm text-gray-400">
          Không có dữ liệu doanh thu trong khoảng thời gian này.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-[260px] w-full">
              <defs>
                <linearGradient id="revenueBarFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2b7fff" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#7eb4ff" stopOpacity="0.92" />
                </linearGradient>
              </defs>

              {ticks.map((tick, index) => {
                const y = padding.top + innerHeight - (tick / safeMaxValue) * innerHeight;
                return (
                  <g key={`${tick}-${index}`}>
                    <line
                      x1={padding.left}
                      x2={padding.left + innerWidth}
                      y1={y}
                      y2={y}
                      stroke="#edf2ee"
                      strokeDasharray="4 6"
                    />
                    <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#97a1b2">
                      {formatNumber(tick)}
                    </text>
                  </g>
                );
              })}

              {data.map((item, index) => {
                const x = startX + index * (barWidth + gap);
                const barHeight = Math.max(10, (item.doanh_thu / safeMaxValue) * innerHeight);
                const y = padding.top + innerHeight - barHeight;
                const isZero = item.doanh_thu === 0;

                return (
                  <g key={item.thang}>
                    <rect
                      x={x}
                      y={padding.top}
                      width={barWidth}
                      height={innerHeight}
                      rx="14"
                      fill="#f3f7fb"
                    />
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      rx="14"
                      fill={isZero ? '#d8e4f7' : 'url(#revenueBarFill)'}
                    />
                    <text
                      x={x + barWidth / 2}
                      y={y - 10}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#5b6474"
                      fontWeight="600"
                    >
                      {formatNumber(item.doanh_thu)}
                    </text>
                    <text
                      x={x + barWidth / 2}
                      y={padding.top + innerHeight + 26}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#97a1b2"
                    >
                      {item.nhan}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [activeFilter, setActiveFilter] = useState<DashboardDateFilter>('today');
  const [customFromDate, setCustomFromDate] = useState('');
  const [customToDate, setCustomToDate] = useState('');
  const [data, setData] = useState<DashboardOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      const shouldWaitForCustomRange =
        activeFilter === 'custom' && (!customFromDate || !customToDate);

      if (shouldWaitForCustomRange) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await adminDashboardApi.layTongQuan({
          bo_loc_thoi_gian: activeFilter,
          tu_ngay: activeFilter === 'custom' ? customFromDate : undefined,
          den_ngay: activeFilter === 'custom' ? customToDate : undefined,
        });
        setData(response);
      } catch (fetchError: unknown) {
        setError(getErrorMessage(fetchError, 'Không thể tải dữ liệu thống kê'));
      } finally {
        setLoading(false);
      }
    };

    void fetchDashboard();
  }, [activeFilter, customFromDate, customToDate]);

  const overview = data?.thong_ke_tong_quan;
  const statCards = [
    {
      label: 'Tổng người dùng',
      value: formatNumber(overview?.tong_nguoi_dung ?? 0),
      sub: 'Trong khoảng đã chọn',
      color: 'bg-blue-500',
      icon: 'users',
    },
    {
      label: 'Tổng cửa hàng',
      value: formatNumber(overview?.tong_cua_hang ?? 0),
      sub: 'Trong khoảng đã chọn',
      color: 'bg-orange-500',
      icon: 'store',
    },
    {
      label: 'Tổng đơn hàng',
      value: formatNumber(overview?.tong_don_hang ?? 0),
      sub: 'Trong khoảng đã chọn',
      color: 'bg-green-500',
      icon: 'orders',
    },
    {
      label: 'Doanh thu',
      value: formatCurrency(overview?.doanh_thu ?? 0),
      sub: 'Đơn đã giao',
      color: 'bg-red-500',
      icon: 'revenue',
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black">Thống kê hệ thống</h1>
          <p className="mt-1 text-sm text-gray-500">Theo dõi tổng quan hoạt động của nền tảng DishNet.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-2xl border border-gray-100 bg-white p-1 shadow-sm">
            {filters.map((filter, index) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.key
                    ? 'bg-green-button text-white shadow-md'
                    : 'text-gray-500 hover:text-black'
                } ${index < filters.length - 1 ? 'border-r border-gray-100' : ''}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {activeFilter === 'custom' ? (
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="date"
                value={customFromDate}
                onChange={(event) => setCustomFromDate(event.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none shadow-sm focus:border-green-500"
              />
              <input
                type="date"
                value={customToDate}
                onChange={(event) => setCustomToDate(event.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none shadow-sm focus:border-green-500"
              />
            </div>
          ) : null}
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-3 flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${card.color}`}>
                {statIcons[card.icon]}
              </div>
            </div>
            <p className="mb-1 text-sm text-gray-500">{card.label}</p>
            <p className="mb-1 text-2xl font-bold text-black">{loading ? '...' : card.value}</p>
            <p className="text-xs font-medium text-gray-400">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <OrdersTrendChart data={data?.bieu_do_don_hang_theo_ngay ?? []} loading={loading} />
        <RevenueBarChart data={data?.bieu_do_doanh_thu_theo_thang ?? []} loading={loading} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-black">Top cửa hàng</h3>
          </div>
          <div className="flex flex-col">
            {(data?.top_cua_hang ?? []).map((store) => (
              <div key={store.id} className="flex items-center gap-3 border-b border-gray-100 py-3 last:border-none">
                <RankingAvatar image={store.hinh_anh} label={store.ten_cua_hang} badge={store.stt} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-black">{store.ten_cua_hang}</p>
                  <p className="text-xs text-gray-400">{formatNumber(store.tong_don_hang)} đơn</p>
                </div>
              </div>
            ))}
            {!loading && (data?.top_cua_hang.length ?? 0) === 0 ? (
              <div className="py-10 text-sm text-gray-400">Chưa có dữ liệu xếp hạng cửa hàng.</div>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-black">Top món ăn</h3>
          </div>
          <div className="flex flex-col">
            {(data?.top_mon_an ?? []).map((food) => (
              <div key={`${food.id_mon_an}-${food.stt}`} className="flex items-center gap-3 border-b border-gray-100 py-3 last:border-none">
                <RankingAvatar image={food.hinh_anh} label={food.ten_mon} badge={food.stt} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-black">{food.ten_mon}</p>
                  <p className="text-xs text-gray-400">{formatNumber(food.tong_luot_dat)} lượt đặt</p>
                </div>
              </div>
            ))}
            {!loading && (data?.top_mon_an.length ?? 0) === 0 ? (
              <div className="py-10 text-sm text-gray-400">Chưa có dữ liệu xếp hạng món ăn.</div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-base font-bold text-black">Yêu cầu cần xử lý</h3>
            <div className="flex flex-col">
              <div className="flex items-center justify-between border-b border-gray-100 py-2">
                <span className="text-sm text-gray-600">Yêu cầu nâng cấp tài khoản</span>
                <span className="text-sm font-bold text-black">
                  {formatNumber(data?.yeu_cau_can_xu_ly.yeu_cau_nang_cap_tai_khoan ?? 0)}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Yêu cầu đăng ký cửa hàng</span>
                <span className="text-sm font-bold text-black">
                  {formatNumber(data?.yeu_cau_can_xu_ly.yeu_cau_dang_ky_cua_hang ?? 0)}
                </span>
              </div>
            </div>
            <Link href={data?.yeu_cau_can_xu_ly.duong_dan_xu_ly ?? '/admin/review'} className="mt-3 inline-flex text-sm font-medium text-green-button hover:underline">
              Xử lý ngay &gt;
            </Link>
          </div>

          <div className="flex-1 rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-black">Hoạt động gần đây</h3>
              <Link
                href={`/admin/activities?bo_loc_thoi_gian=${activeFilter}${activeFilter === 'custom' && customFromDate && customToDate ? `&tu_ngay=${customFromDate}&den_ngay=${customToDate}` : ''}`}
                className="text-sm text-blue-link hover:underline"
              >
                Xem tất cả &gt;
              </Link>
            </div>
            <div className="space-y-1">
              {(data?.hoat_dong_gan_day ?? []).map((item) => (
                <ActivityCard key={item.id} item={item} />
              ))}
              {!loading && (data?.hoat_dong_gan_day.length ?? 0) === 0 ? (
                <div className="py-10 text-sm text-gray-400">Chưa có hoạt động gần đây trong khoảng thời gian này.</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
