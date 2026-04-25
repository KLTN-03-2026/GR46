'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminTable, { Column } from '@/components/Admin/AdminTable';
import Pagination from '@/components/Admin/Pagination';
import ViewButton from '@/components/Admin/ViewButton';
import { adminReviewApi, YeuCauItem } from '@/shared/adminReviewApi';
import { useToast } from '@/components/Admin/Toast';

const statusOptions = ['Trạng thái', 'Chờ duyệt', 'Đã duyệt', 'Đã từ chối'];
const typeOptions = ['Loại yêu cầu', 'Mở cửa hàng', 'Kiếm tiền từ nội dung'];
const dateFilters = [
  { key: 'today', label: 'Hôm nay' },
  { key: '7days', label: '7 ngày' },
  { key: '30days', label: '30 ngày' },
  { key: 'custom', label: 'Tùy chọn' },
] as const;

const ITEMS_PER_PAGE = 10;

const statusMap: Record<string, string> = {
  'Chờ duyệt': 'cho_duyet',
  'Đã duyệt': 'da_duyet',
  'Đã từ chối': 'da_tu_choi',
};

const typeMap: Record<string, string> = {
  'Mở cửa hàng': 'mo_cua_hang',
  'Kiếm tiền từ nội dung': 'kiem_tien_noi_dung',
};

const typeLabel: Record<string, string> = {
  mo_cua_hang: 'Mở cửa hàng',
  kiem_tien_noi_dung: 'Kiếm tiền từ nội dung',
};

const statusLabel: Record<string, string> = {
  cho_duyet: 'Chờ duyệt',
  da_duyet: 'Đã duyệt',
  da_tu_choi: 'Đã từ chối',
};

function getStatusStyle(status: string) {
  switch (status) {
    case 'cho_duyet':
      return 'text-orange-500 border-orange-400 bg-orange-50';
    case 'da_duyet':
      return 'text-green-600 border-green-500 bg-green-50';
    case 'da_tu_choi':
      return 'text-red-500 border-red-400 bg-red-50';
    default:
      return 'text-gray-600 border-gray-300 bg-gray-50';
  }
}

export default function ReviewPage() {
  const toast = useToast();
  const [activeDateFilter, setActiveDateFilter] = useState<(typeof dateFilters)[number]['key']>('today');
  const [selectedStatus, setSelectedStatus] = useState('Trạng thái');
  const [selectedType, setSelectedType] = useState('Loại yêu cầu');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tuNgay, setTuNgay] = useState('');
  const [denNgay, setDenNgay] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requests, setRequests] = useState<YeuCauItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRequests = useCallback(async () => {
    if (activeDateFilter === 'custom' && (!tuNgay || !denNgay)) {
      setLoading(false);
      setRequests([]);
      setTotalPages(1);
      setError(tuNgay || denNgay ? 'Vui lòng chọn đầy đủ từ ngày và đến ngày' : '');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await adminReviewApi.layDanhSach({
        tim_kiem: searchQuery || undefined,
        loai_yeu_cau: typeMap[selectedType],
        trang_thai: statusMap[selectedStatus],
        moc_thoi_gian: activeDateFilter,
        tu_ngay: activeDateFilter === 'custom' ? tuNgay || undefined : undefined,
        den_ngay: activeDateFilter === 'custom' ? denNgay || undefined : undefined,
        trang: currentPage,
        so_luong: ITEMS_PER_PAGE,
      });

      setRequests(res.du_lieu);
      setTotalPages(res.tong_trang || 1);
    } catch (fetchError: unknown) {
      setRequests([]);
      setTotalPages(1);
      setError(fetchError instanceof Error ? fetchError.message : 'Không thể tải danh sách yêu cầu');
    } finally {
      setLoading(false);
    }
  }, [activeDateFilter, currentPage, denNgay, searchQuery, selectedStatus, selectedType, tuNgay]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const columns: Column<YeuCauItem>[] = [
    {
      key: 'stt',
      label: 'STT',
      render: (row) => <span className="font-semibold text-black">{row.stt}</span>,
    },
    {
      key: 'user',
      label: 'Tên người dùng',
      render: (row) => <span className="text-gray-700">{row.ten_nguoi_dung}</span>,
    },
    {
      key: 'email',
      label: 'Email',
      render: (row) => <span className="text-gray-700">{row.email}</span>,
    },
    {
      key: 'type',
      label: 'Loại yêu cầu',
      render: (row) => <span className="text-gray-700">{typeLabel[row.loai_yeu_cau] || row.loai_yeu_cau}</span>,
    },
    {
      key: 'status',
      label: 'Trạng thái',
      align: 'center',
      render: (row) => (
        <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(row.trang_thai)}`}>
          {statusLabel[row.trang_thai] || row.trang_thai}
        </span>
      ),
    },
    {
      key: 'time',
      label: 'Thời gian gửi yêu cầu',
      align: 'center',
      render: (row) => <span className="whitespace-nowrap text-gray-500">{formatDate(row.thoi_gian_gui)}</span>,
    },
    {
      key: 'action',
      label: '',
      align: 'center',
      render: (row) => <ViewButton href={`/admin/review/${row.id}`} />,
    },
  ];

  return (
    <div className="space-y-5 p-6">
      <h1 className="text-xl font-bold tracking-wide text-black">KIỂM DUYỆT YÊU CẦU</h1>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-2xl border border-gray-100 bg-white p-1 shadow-sm">
          {dateFilters.map((filter, index) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => {
                setActiveDateFilter(filter.key);
                setCurrentPage(1);
              }}
              className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeDateFilter === filter.key
                  ? 'bg-green-button text-white shadow'
                  : 'text-gray-500 hover:text-black'
              } ${index < dateFilters.length - 1 ? 'border-r border-gray-100' : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {activeDateFilter === 'custom' ? (
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-gray-100 bg-white px-3 py-2 shadow-sm">
            <input
              type="date"
              value={tuNgay}
              onChange={(event) => {
                setTuNgay(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-500"
            />
            <span className="text-sm text-gray-400">đến</span>
            <input
              type="date"
              value={denNgay}
              onChange={(event) => {
                setDenNgay(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-500"
            />
          </div>
        ) : null}

        <div className="flex-1" />

        <div className="relative w-64">
          <input
            type="text"
            placeholder="Tìm kiếm tên, email"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm outline-none transition-colors shadow-sm focus:border-green-500"
          />
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <div className="relative">
          <select
            value={selectedType}
            onChange={(event) => {
              setSelectedType(event.target.value);
              setCurrentPage(1);
            }}
            className="cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:border-green-button focus:outline-none"
          >
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
            className="cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:border-green-button focus:outline-none"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
        </div>
      ) : (
        <AdminTable
          columns={columns}
          data={requests}
          rowKey={(row) => String(row.id)}
          emptyMessage="Không có yêu cầu nào phù hợp với bộ lọc đã chọn."
        >
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </AdminTable>
      )}
    </div>
  );
}
