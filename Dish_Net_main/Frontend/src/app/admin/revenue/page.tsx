'use client';

import { useEffect, useState } from 'react';
import AdminTable, { Column } from '@/components/Admin/AdminTable';
import Pagination from '@/components/Admin/Pagination';
import ViewButton from '@/components/Admin/ViewButton';
import {
  adminRevenueApi,
  type RevenueOrderListItem,
  type RevenueOrderStatusFilter,
  type RevenueOverviewResponse,
} from '@/shared/adminRevenueApi';

const PAGE_SIZE = 10;

const statusOptions: Array<{
  value: RevenueOrderStatusFilter;
  label: string;
}> = [
  { value: 'cho_xac_nhan', label: 'Chờ xác nhận' },
  { value: 'dang_chuan_bi', label: 'Đang chuẩn bị' },
  { value: 'dang_giao', label: 'Đang giao' },
  { value: 'da_giao', label: 'Đã giao' },
  { value: 'da_huy', label: 'Đã hủy' },
  { value: 'tra_hang', label: 'Trả hàng' },
];

function formatCurrency(value: number) {
  return `${value.toLocaleString('vi-VN')} đ`;
}

function formatCompactCurrency(value: number) {
  return `${value.toLocaleString('vi-VN')}đ`;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

function getStatusStyle(status: string) {
  switch (status) {
    case 'Chờ xác nhận':
      return 'text-orange-600 border-orange-300 bg-orange-50';
    case 'Đang chuẩn bị':
      return 'text-blue-600 border-blue-300 bg-blue-50';
    case 'Đang giao':
      return 'text-sky-700 border-sky-300 bg-sky-50';
    case 'Đã giao':
      return 'text-green-700 border-green-300 bg-green-50';
    case 'Đã hủy':
      return 'text-red-600 border-red-300 bg-red-50';
    case 'Trả hàng':
      return 'text-amber-700 border-amber-300 bg-amber-50';
    default:
      return 'text-gray-600 border-gray-300 bg-gray-50';
  }
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function getInitials(value: string) {
  return value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
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

function getRevenueTicks(maxValue: number) {
  const rawTicks =
    maxValue <= 0
      ? [0, 1000000, 2000000, 3000000]
      : [0, maxValue / 3, (maxValue / 3) * 2, maxValue].map((value) => Math.round(value));

  return Array.from(new Set(rawTicks)).sort((a, b) => a - b);
}

function shouldRenderXAxisLabel(index: number, total: number) {
  if (total <= 7) return true;
  if (total <= 14) return index % 2 === 0;
  return index === 0 || index === total - 1 || index % 5 === 0;
}

function RevenueTrendChart({
  data,
  loading,
}: {
  data: RevenueOverviewResponse['bieu_do_doanh_thu_theo_ngay'];
  loading: boolean;
}) {
  const width = 680;
  const height = 240;
  const padding = { top: 20, right: 20, bottom: 42, left: 56 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...data.map((item) => item.doanh_thu), 0);
  const safeMaxValue = maxValue > 0 ? maxValue : 1;
  const ticks = getRevenueTicks(maxValue);
  const stepX = data.length > 1 ? innerWidth / (data.length - 1) : innerWidth / 2;

  const points = data.map((item, index) => {
    const x = padding.left + (data.length > 1 ? stepX * index : innerWidth / 2);
    const y = padding.top + innerHeight - (item.doanh_thu / safeMaxValue) * innerHeight;
    return { x, y, value: item.doanh_thu, label: item.nhan };
  });

  const linePath = buildSmoothPath(points);
  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`
    : '';

  return (
    <div className="rounded-[28px] border border-[#edf2ee] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-black">Biểu đồ doanh thu</h2>
          <p className="mt-1 text-sm text-gray-400">Xu hướng doanh thu theo từng ngày trong 30 ngày gần nhất</p>
        </div>
        <span className="rounded-full bg-[#f3faf1] px-3 py-1 text-xs font-semibold text-[#4e7a4a]">
          {data.length} mốc
        </span>
      </div>

      {loading ? (
        <div className="flex h-[260px] items-center justify-center text-sm text-gray-400">Đang tải biểu đồ...</div>
      ) : data.length === 0 ? (
        <div className="flex h-[260px] items-center justify-center rounded-2xl bg-[#fafcf9] text-sm text-gray-400">
          Chưa có dữ liệu doanh thu hoàn thành.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[680px]">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-[260px] w-full">
              <defs>
                <linearGradient id="revenueAreaFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#18a249" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#18a249" stopOpacity="0.02" />
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
                    <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#99a0ad">
                      {tick === 0 ? '0' : `${Math.round(tick / 1000).toLocaleString('vi-VN')}k`}
                    </text>
                  </g>
                );
              })}

              {areaPath ? <path d={areaPath} fill="url(#revenueAreaFill)" /> : null}
              {linePath ? (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#18a249"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : null}

              {points.map((point, index) => (
                <g key={`${point.label}-${index}`}>
                  <circle cx={point.x} cy={point.y} r="5" fill="#ffffff" stroke="#18a249" strokeWidth="3" />
                  <text x={point.x} y={point.y - 12} textAnchor="middle" fontSize="10" fill="#5b6474" fontWeight="600">
                    {point.value === 0 ? '0' : `${Math.round(point.value / 1000).toLocaleString('vi-VN')}k`}
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

function RevenueSourceChart({
  data,
  loading,
}: {
  data: RevenueOverviewResponse['bieu_do_doanh_thu_theo_nguon'];
  loading: boolean;
}) {
  const tongDoanhThu = data.reduce((sum, item) => sum + item.doanh_thu, 0);

  return (
    <div className="rounded-[28px] border border-[#edf2ee] bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-black">Doanh thu theo nguồn</h2>
        <p className="mt-1 text-sm text-gray-400">Cơ cấu doanh thu từ video review, tìm kiếm món ăn và khuyến mãi</p>
      </div>

      {loading ? (
        <div className="flex h-[260px] items-center justify-center text-sm text-gray-400">Đang tải biểu đồ...</div>
      ) : (
        <div className="space-y-5">
          <div className="h-4 overflow-hidden rounded-full bg-[#f2f5f1]">
            {data.map((item) => (
              <div
                key={item.key}
                className="h-full float-left transition-all"
                style={{
                  width: `${tongDoanhThu > 0 ? (item.doanh_thu / tongDoanhThu) * 100 : item.ty_le}%`,
                  backgroundColor: item.mau,
                }}
              />
            ))}
          </div>

          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.key} className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.mau }} />
                    <span className="text-sm font-medium text-gray-700">{item.nhan}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-black">{formatCompactCurrency(item.doanh_thu)}</p>
                    <p className="text-xs text-gray-400">{item.ty_le}%</p>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-[#f4f6f3]">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.max(item.ty_le, item.doanh_thu > 0 ? 8 : 0)}%`,
                      backgroundColor: item.mau,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RankingCard({
  title,
  loading,
  emptyMessage,
  items,
}: {
  title: string;
  loading: boolean;
  emptyMessage: string;
  items: Array<{
    stt: number;
    ten: string;
    phu_de: string;
  }>;
}) {
  return (
    <div className="rounded-[28px] border border-[#edf2ee] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-black">{title}</h2>
      {loading ? (
        <div className="flex h-[220px] items-center justify-center text-sm text-gray-400">Đang tải dữ liệu...</div>
      ) : items.length === 0 ? (
        <div className="flex h-[220px] items-center justify-center text-sm text-gray-400">{emptyMessage}</div>
      ) : (
        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <div key={`${title}-${item.stt}-${item.ten}`} className="flex items-center gap-4 rounded-2xl bg-[#fafcf9] px-4 py-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1e293b] text-sm font-bold text-white">
                {item.stt}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold text-black">{item.ten}</p>
                <p className="mt-1 text-sm text-gray-500">{item.phu_de}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RevenuePage() {
  const [overview, setOverview] = useState<RevenueOverviewResponse | null>(null);
  const [orders, setOrders] = useState<RevenueOrderListItem[]>([]);
  const [storeOptions, setStoreOptions] = useState<Array<{ id: number; ten_cua_hang: string }>>([]);
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [overviewError, setOverviewError] = useState('');
  const [ordersError, setOrdersError] = useState('');

  useEffect(() => {
    let active = true;

    async function fetchOverview() {
      try {
        setOverviewLoading(true);
        setOverviewError('');
        const data = await adminRevenueApi.layTongQuan();
        if (!active) return;
        setOverview(data);
      } catch (error) {
        if (!active) return;
        setOverviewError(getErrorMessage(error, 'Không thể tải thống kê doanh thu.'));
      } finally {
        if (active) {
          setOverviewLoading(false);
        }
      }
    }

    void fetchOverview();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function fetchOrders() {
      try {
        setOrdersLoading(true);
        setOrdersError('');
        const data = await adminRevenueApi.layDanhSachDonHang({
          id_cua_hang: selectedStoreId ? Number(selectedStoreId) : undefined,
          trang_thai: selectedStatus ? (selectedStatus as RevenueOrderStatusFilter) : undefined,
          trang: currentPage,
          so_luong: PAGE_SIZE,
        });

        if (!active) return;
        setOrders(data.du_lieu);
        setStoreOptions(data.cua_hang_options);
        setTotalPages(data.tong_trang);
      } catch (error) {
        if (!active) return;
        setOrders([]);
        setOrdersError(getErrorMessage(error, 'Không thể tải danh sách đơn hàng gần đây.'));
      } finally {
        if (active) {
          setOrdersLoading(false);
        }
      }
    }

    void fetchOrders();
    return () => {
      active = false;
    };
  }, [currentPage, selectedStatus, selectedStoreId]);

  const columns: Column<RevenueOrderListItem>[] = [
    {
      key: 'ma_don_hang',
      label: 'Mã đơn hàng',
      render: (row) => <span className="font-semibold text-black">{row.ma_don_hang}</span>,
    },
    {
      key: 'cua_hang',
      label: 'Cửa hàng',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#f3faf1] text-xs font-bold text-[#2f7f3b]">
            {getInitials(row.cua_hang)}
          </div>
          <span className="text-gray-700">{row.cua_hang}</span>
        </div>
      ),
    },
    {
      key: 'khach_hang',
      label: 'Khách hàng',
      render: (row) => <span className="text-gray-700">{row.khach_hang}</span>,
    },
    {
      key: 'tong_tien_don',
      label: 'Tổng tiền đơn',
      align: 'center',
      render: (row) => <span className="font-semibold text-[#f59e0b]">{formatCurrency(row.tong_tien_don)}</span>,
    },
    {
      key: 'trang_thai_don',
      label: 'Trạng thái đơn',
      align: 'center',
      render: (row) => (
        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(row.trang_thai_don)}`}>
          {row.trang_thai_don}
        </span>
      ),
    },
    {
      key: 'thoi_gian_dat',
      label: 'Thời gian đặt',
      align: 'center',
      render: (row) => <span className="text-xs font-medium text-[#0f7df2]">{formatDateTime(row.thoi_gian_dat)}</span>,
    },
    {
      key: 'action',
      label: '',
      align: 'center',
      render: (row) => <ViewButton href={`/admin/orders/${row.ma_don_hang}`} variant="blue" />,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Quản lý doanh thu hệ thống</h1>
          <p className="mt-1 text-sm text-gray-400">Theo dõi doanh thu, nguồn doanh thu và các đơn hàng gần đây trên toàn nền tảng.</p>
        </div>
      </div>

      {overviewError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{overviewError}</div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-[28px] bg-[#eaf7ec] p-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-700">Tổng doanh thu hệ thống</p>
          <p className="mt-3 text-3xl font-bold text-[#188038]">
            {overviewLoading ? '...' : formatCurrency(overview?.thong_ke_tong_quan.tong_doanh_thu_he_thong ?? 0)}
          </p>
        </div>
        <div className="rounded-[28px] bg-[#ebf5ff] p-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-700">Doanh thu hôm nay</p>
          <p className="mt-3 text-3xl font-bold text-[#1570ef]">
            {overviewLoading ? '...' : formatCurrency(overview?.thong_ke_tong_quan.doanh_thu_hom_nay ?? 0)}
          </p>
        </div>
        <div className="rounded-[28px] border border-[#edf2ee] bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-700">Tổng số đơn hàng</p>
          <p className="mt-3 text-3xl font-bold text-black">
            {overviewLoading ? '...' : (overview?.thong_ke_tong_quan.tong_so_don_hang ?? 0).toLocaleString('vi-VN')}
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <RevenueTrendChart
          data={overview?.bieu_do_doanh_thu_theo_ngay ?? []}
          loading={overviewLoading}
        />
        <RevenueSourceChart
          data={overview?.bieu_do_doanh_thu_theo_nguon ?? []}
          loading={overviewLoading}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RankingCard
          title="Top cửa hàng doanh thu cao"
          loading={overviewLoading}
          emptyMessage="Chưa có cửa hàng nào phát sinh doanh thu hoàn thành."
          items={(overview?.top_cua_hang ?? []).map((item) => ({
            stt: item.stt,
            ten: item.ten_cua_hang,
            phu_de: `${item.tong_don_hang.toLocaleString('vi-VN')} đơn hàng`,
          }))}
        />
        <RankingCard
          title="Top nhà sáng tạo doanh thu cao"
          loading={overviewLoading}
          emptyMessage="Chưa có nhà sáng tạo nào tạo ra doanh thu."
          items={(overview?.top_nha_sang_tao ?? []).map((item) => ({
            stt: item.stt,
            ten: item.ten_hien_thi,
            phu_de: formatCurrency(item.doanh_thu_tao_ra),
          }))}
        />
      </div>

      <div className="rounded-[28px] border border-[#edf2ee] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-black">Đơn hàng gần đây</h2>
            <p className="mt-1 text-sm text-gray-400">Theo dõi các đơn hàng mới nhất và lọc nhanh theo cửa hàng hoặc trạng thái.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={selectedStoreId}
                onChange={(event) => {
                  setSelectedStoreId(event.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-9 text-sm text-gray-700 outline-none focus:border-green-500"
              >
                <option value="">Tất cả cửa hàng</option>
                {storeOptions.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.ten_cua_hang}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>

            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(event) => {
                  setSelectedStatus(event.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-9 text-sm text-gray-700 outline-none focus:border-green-500"
              >
                <option value="">Tất cả trạng thái</option>
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        {ordersError ? (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{ordersError}</div>
        ) : null}

        <div className="mt-5">
          <AdminTable
            columns={columns}
            data={orders}
            rowKey={(row) => row.ma_don_hang}
            emptyMessage={ordersLoading ? 'Đang tải đơn hàng...' : 'Chưa có đơn hàng phù hợp.'}
          >
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </AdminTable>
        </div>
      </div>
    </div>
  );
}
