'use client';

import { useEffect, useState } from 'react';
import AdminTable, { Column } from '@/components/Admin/AdminTable';
import Pagination from '@/components/Admin/Pagination';
import ViewButton from '@/components/Admin/ViewButton';
import {
  adminOrderApi,
  OrderListItem,
  OrderStatusFilter,
} from '@/shared/adminOrderApi';

const ITEMS_PER_PAGE = 10;

const statusOptions: Array<{ label: string; value: '' | OrderStatusFilter }> = [
  { label: 'Trạng thái đơn', value: '' },
  { label: 'Chờ xác nhận', value: 'cho_xac_nhan' },
  { label: 'Đang chuẩn bị', value: 'dang_chuan_bi' },
  { label: 'Đang giao', value: 'dang_giao' },
  { label: 'Đã giao', value: 'da_giao' },
  { label: 'Đã hủy', value: 'da_huy' },
  { label: 'Trả hàng', value: 'tra_hang' },
];

const dateFilters = [
  { key: 'today', label: 'Hôm nay' },
  { key: '7days', label: '7 ngày' },
  { key: '30days', label: '30 ngày' },
  { key: 'custom', label: 'Tùy chọn' },
] as const;

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

function getStatusStyle(status: string) {
  switch (status) {
    case 'Chờ xác nhận':
      return 'text-orange-500 border-orange-400 bg-orange-50';
    case 'Đang chuẩn bị':
      return 'text-blue-500 border-blue-400 bg-blue-50';
    case 'Đang giao':
      return 'text-blue-600 border-blue-500 bg-blue-50';
    case 'Đã giao':
      return 'text-green-600 border-green-500 bg-green-50';
    case 'Trả hàng':
      return 'text-orange-600 border-orange-500 bg-orange-50';
    case 'Đã hủy':
      return 'text-red-500 border-red-400 bg-red-50';
    default:
      return 'text-gray-600 border-gray-300 bg-gray-50';
  }
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function OrderManagementPage() {
  const [activeDateFilter, setActiveDateFilter] = useState<'' | 'today' | '7days' | '30days' | 'custom'>('');
  const [selectedStore, setSelectedStore] = useState<number | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<'' | OrderStatusFilter>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [customFromDate, setCustomFromDate] = useState('');
  const [customToDate, setCustomToDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [storeOptions, setStoreOptions] = useState<Array<{ id: number; ten_cua_hang: string }>>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');

      try {
        const shouldWaitForCustomRange =
          activeDateFilter === 'custom' && (!customFromDate || !customToDate);

        if (shouldWaitForCustomRange) {
          setOrders([]);
          setTotalPages(1);
          return;
        }

        const data = await adminOrderApi.layDanhSach({
          tim_kiem: searchQuery.trim() || undefined,
          id_cua_hang: selectedStore || undefined,
          trang_thai: selectedStatus || undefined,
          bo_loc_thoi_gian: activeDateFilter || undefined,
          tu_ngay: activeDateFilter === 'custom' ? customFromDate || undefined : undefined,
          den_ngay: activeDateFilter === 'custom' ? customToDate || undefined : undefined,
          trang: currentPage,
          so_luong: ITEMS_PER_PAGE,
        });
        setOrders(data.du_lieu);
        setStoreOptions(data.cua_hang_options);
        setTotalPages(data.tong_trang || 1);
      } catch (fetchError: unknown) {
        setError(getErrorMessage(fetchError, 'Không thể tải danh sách đơn hàng'));
      } finally {
        setLoading(false);
      }
    };

    void fetchOrders();
  }, [activeDateFilter, searchQuery, selectedStore, selectedStatus, customFromDate, customToDate, currentPage]);

  const columns: Column<OrderListItem>[] = [
    {
      key: 'ma_don_hang',
      label: 'Mã đơn',
      render: (row) => <span className="font-semibold text-black">{row.ma_don_hang}</span>,
    },
    {
      key: 'cua_hang',
      label: 'Cửa hàng',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
            <span className="text-xs">🍜</span>
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
      render: (row) => <span className="font-semibold text-green-600">{formatCurrency(row.tong_tien_don)}</span>,
    },
    {
      key: 'trang_thai_don',
      label: 'Trạng thái đơn',
      align: 'center',
      render: (row) => (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(row.trang_thai_don)}`}>
          {row.trang_thai_don}
        </span>
      ),
    },
    {
      key: 'thoi_gian_dat',
      label: 'Thời gian đặt',
      align: 'center',
      render: (row) => <span className="text-gray-500 whitespace-nowrap">{formatDate(row.thoi_gian_dat)}</span>,
    },
    {
      key: 'action',
      label: '',
      align: 'center',
      render: (row) => <ViewButton href={`/admin/orders/${row.ma_don_hang}`} />,
    },
  ];

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-xl font-bold text-black tracking-wide">QUẢN LÝ ĐƠN HÀNG HỆ THỐNG</h1>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
          {dateFilters.map((filter, index) => (
            <button
              key={filter.key}
              onClick={() => { setActiveDateFilter(filter.key); setCurrentPage(1); }}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                activeDateFilter === filter.key ? 'bg-green-button text-white shadow' : 'text-gray-500 hover:text-black'
              } ${index < dateFilters.length - 1 ? 'border-r border-gray-100' : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {activeDateFilter === 'custom' ? (
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="date"
              value={customFromDate}
              onChange={(e) => { setCustomFromDate(e.target.value); setCurrentPage(1); }}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-500 shadow-sm"
            />
            <input
              type="date"
              value={customToDate}
              onChange={(e) => { setCustomToDate(e.target.value); setCurrentPage(1); }}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-500 shadow-sm"
            />
          </div>
        ) : null}

        <div className="flex-1" />

        <div className="relative w-64">
          <input
            type="text"
            placeholder="Tìm kiếm mã đơn, khách hàng"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2.5 text-sm outline-none focus:border-green-500 transition-colors shadow-sm"
          />
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <div className="relative">
          <select
            value={selectedStore}
            onChange={(e) => { setSelectedStore(e.target.value ? Number(e.target.value) : ''); setCurrentPage(1); }}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:border-green-button cursor-pointer"
          >
            <option value="">Tất cả cửa hàng</option>
            {storeOptions.map((store) => (
              <option key={store.id} value={store.id}>{store.ten_cua_hang}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value as '' | OrderStatusFilter); setCurrentPage(1); }}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:border-green-button cursor-pointer"
          >
            {statusOptions.map((status) => (
              <option key={status.label} value={status.value}>{status.label}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      ) : null}

      <AdminTable
        columns={columns}
        data={loading ? [] : orders}
        rowKey={(row) => row.ma_don_hang}
        emptyMessage={loading ? 'Đang tải đơn hàng...' : 'Không có đơn hàng nào phù hợp với bộ lọc đã chọn.'}
      >
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </AdminTable>
    </div>
  );
}
