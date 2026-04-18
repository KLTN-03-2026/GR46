'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminTable, { type Column } from '@/components/Admin/AdminTable';
import Pagination from '@/components/Admin/Pagination';
import {
  adminDashboardApi,
  type ActivityItem,
  type DashboardDateFilter,
} from '@/shared/adminDashboardApi';

const ITEMS_PER_PAGE = 10;

const filters: Array<{ key: DashboardDateFilter; label: string }> = [
  { key: 'today', label: 'Hôm nay' },
  { key: '7days', label: '7 ngày' },
  { key: '30days', label: '30 ngày' },
  { key: 'custom', label: 'Tùy chọn' },
];

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getTypeLabel(type: ActivityItem['loai']) {
  switch (type) {
    case 'nguoi_dung':
      return 'Người dùng';
    case 'don_hang':
      return 'Đơn hàng';
    case 'khuyen_mai':
      return 'Khuyến mãi';
    case 'yeu_cau_nang_cap':
      return 'Yêu cầu';
    default:
      return type;
  }
}

export default function AdminActivitiesPage() {
  const searchParams = useSearchParams();
  const initialFilter = (searchParams.get('bo_loc_thoi_gian') as DashboardDateFilter | null) ?? 'today';
  const [activeFilter, setActiveFilter] = useState<DashboardDateFilter>(initialFilter);
  const [customFromDate, setCustomFromDate] = useState(searchParams.get('tu_ngay') ?? '');
  const [customToDate, setCustomToDate] = useState(searchParams.get('den_ngay') ?? '');
  const [currentPage, setCurrentPage] = useState(1);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      const shouldWaitForCustomRange =
        activeFilter === 'custom' && (!customFromDate || !customToDate);

      if (shouldWaitForCustomRange) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const data = await adminDashboardApi.layDanhSachHoatDong({
          bo_loc_thoi_gian: activeFilter,
          tu_ngay: activeFilter === 'custom' ? customFromDate : undefined,
          den_ngay: activeFilter === 'custom' ? customToDate : undefined,
          trang: currentPage,
          so_luong: ITEMS_PER_PAGE,
        });
        setActivities(data.du_lieu);
        setTotalPages(data.tong_trang || 1);
      } catch (fetchError: unknown) {
        setError(getErrorMessage(fetchError, 'Không thể tải danh sách hoạt động'));
      } finally {
        setLoading(false);
      }
    };

    void fetchActivities();
  }, [activeFilter, customFromDate, customToDate, currentPage]);

  const columns: Column<ActivityItem>[] = [
    {
      key: 'ten_chu_the',
      label: 'Người dùng / Cửa hàng',
      render: (row) => (
        <div>
          <p className="font-semibold text-black">{row.ten_chu_the}</p>
          <p className="text-xs text-gray-400">{getTypeLabel(row.loai)}</p>
        </div>
      ),
    },
    {
      key: 'noi_dung',
      label: 'Nội dung hoạt động',
      render: (row) => <span className="text-gray-700">{row.noi_dung}</span>,
    },
    {
      key: 'thoi_gian',
      label: 'Thời gian thực hiện',
      align: 'center',
      render: (row) => <span className="whitespace-nowrap text-gray-500">{formatDateTime(row.thoi_gian)}</span>,
    },
    {
      key: 'href',
      label: '',
      align: 'center',
      render: (row) => (
        <Link href={row.href} className="text-sm font-medium text-blue-link hover:underline">
          Xem chi tiết
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-black tracking-wide">HOẠT ĐỘNG GẦN ĐÂY</h1>
          <p className="mt-1 text-sm text-gray-500">Theo dõi toàn bộ hoạt động mới nhất của người dùng và cửa hàng.</p>
        </div>
        <Link href="/admin" className="text-sm font-medium text-blue-link hover:underline">
          &lt; Quay lại thống kê
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-2xl border border-gray-100 bg-white p-1 shadow-sm">
          {filters.map((filter, index) => (
            <button
              key={filter.key}
              onClick={() => { setActiveFilter(filter.key); setCurrentPage(1); }}
              className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.key ? 'bg-green-button text-white shadow' : 'text-gray-500 hover:text-black'
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
              onChange={(event) => { setCustomFromDate(event.target.value); setCurrentPage(1); }}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none shadow-sm focus:border-green-500"
            />
            <input
              type="date"
              value={customToDate}
              onChange={(event) => { setCustomToDate(event.target.value); setCurrentPage(1); }}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none shadow-sm focus:border-green-500"
            />
          </div>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      ) : null}

      <AdminTable
        columns={columns}
        data={activities}
        rowKey={(row) => row.id}
        emptyMessage={loading ? 'Đang tải dữ liệu...' : 'Không có hoạt động phù hợp.'}
      >
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </AdminTable>
    </div>
  );
}
