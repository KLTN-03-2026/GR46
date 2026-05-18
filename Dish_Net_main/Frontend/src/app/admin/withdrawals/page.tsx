'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminTable, { Column } from '@/components/Admin/AdminTable';
import Pagination from '@/components/Admin/Pagination';
import { useToast } from '@/components/Admin/Toast';
import {
  adminWithdrawalApi,
  WithdrawalItem,
  TrangThaiRutTien,
} from '@/shared/adminWithdrawalApi';

const ITEMS_PER_PAGE = 10;

const statusOptions = ['Tất cả', 'Đang xử lý', 'Đã hoàn thành', 'Đã từ chối'];
const statusMap: Record<string, string> = {
  'Đang xử lý': 'dang_xu_ly',
  'Đã hoàn thành': 'da_hoan_thanh',
  'Đã từ chối': 'da_tu_choi',
};
const statusLabel: Record<TrangThaiRutTien, string> = {
  dang_xu_ly: 'Đang xử lý',
  da_hoan_thanh: 'Đã hoàn thành',
  da_tu_choi: 'Đã từ chối',
};
const statusColor: Record<TrangThaiRutTien, string> = {
  dang_xu_ly: 'bg-yellow-100 text-yellow-700',
  da_hoan_thanh: 'bg-green-100 text-green-700',
  da_tu_choi: 'bg-red-100 text-red-600',
};

function formatMoney(amount: number) {
  return amount.toLocaleString('vi-VN') + ' đ';
}
function formatDate(d: string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleString('vi-VN');
}

export default function WithdrawalsPage() {
  const { showToast } = useToast();

  const [data, setData] = useState<WithdrawalItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [loading, setLoading] = useState(false);

  // Reject modal
  const [rejectTarget, setRejectTarget] = useState<WithdrawalItem | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const trangThai = statusMap[statusFilter];
      const res = await adminWithdrawalApi.layDanhSach({
        trang_thai: trangThai,
        trang: currentPage,
        so_luong: ITEMS_PER_PAGE,
      });
      setData(res.du_lieu);
      setTotalPages(res.tong_trang || 1);
    } catch {
      showToast('Không thể tải danh sách yêu cầu rút tiền', 'error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, showToast]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const handleApprove = async (item: WithdrawalItem) => {
    if (!confirm(`Duyệt yêu cầu rút ${formatMoney(item.so_tien)} của ${item.nguoi_dung?.ten_hien_thi ?? ''}?`)) return;
    try {
      await adminWithdrawalApi.duyet(item.id);
      showToast('Đã duyệt yêu cầu rút tiền', 'success');
      void fetchData();
    } catch (err) {
      showToast((err as Error).message || 'Lỗi khi duyệt', 'error');
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectTarget) return;
    if (!rejectReason.trim()) {
      showToast('Vui lòng nhập lý do từ chối', 'error');
      return;
    }
    setSubmitting(true);
    try {
      await adminWithdrawalApi.tuChoi(rejectTarget.id, rejectReason.trim());
      showToast('Đã từ chối yêu cầu rút tiền', 'success');
      setRejectTarget(null);
      setRejectReason('');
      void fetchData();
    } catch (err) {
      showToast((err as Error).message || 'Lỗi khi từ chối', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<WithdrawalItem>[] = [
    {
      key: 'ma_yeu_cau',
      label: 'Mã yêu cầu',
      render: (v) => <span className="font-mono text-xs text-gray-600">{String(v)}</span>,
    },
    {
      key: 'nguoi_dung',
      label: 'Người dùng',
      render: (_, row) => (
        <div>
          <p className="font-medium text-sm text-gray-800">{row.nguoi_dung?.ten_hien_thi ?? '—'}</p>
          <p className="text-xs text-gray-400">{row.nguoi_dung?.email ?? ''}</p>
        </div>
      ),
    },
    {
      key: 'tai_khoan_ngan_hang',
      label: 'Tài khoản ngân hàng',
      render: (_, row) =>
        row.tai_khoan_ngan_hang ? (
          <div>
            <p className="text-sm font-medium text-gray-800">{row.tai_khoan_ngan_hang.ten_ngan_hang}</p>
            <p className="text-xs text-gray-500">{row.tai_khoan_ngan_hang.so_tai_khoan}</p>
            <p className="text-xs text-gray-400">{row.tai_khoan_ngan_hang.ten_chu_tai_khoan}</p>
          </div>
        ) : <span className="text-gray-400">—</span>,
    },
    {
      key: 'so_tien',
      label: 'Số tiền',
      render: (v) => <span className="font-semibold text-[#d32f2f]">{formatMoney(Number(v))}</span>,
    },
    {
      key: 'trang_thai',
      label: 'Trạng thái',
      render: (v) => {
        const s = v as TrangThaiRutTien;
        return (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[s] ?? 'bg-gray-100 text-gray-600'}`}>
            {statusLabel[s] ?? s}
          </span>
        );
      },
    },
    {
      key: 'thoi_gian_yeu_cau',
      label: 'Thời gian yêu cầu',
      render: (v) => <span className="text-xs text-gray-500">{formatDate(v as string)}</span>,
    },
    {
      key: 'id',
      label: 'Thao tác',
      render: (_, row) =>
        row.trang_thai === 'dang_xu_ly' ? (
          <div className="flex gap-2">
            <button
              onClick={() => handleApprove(row)}
              className="rounded-lg bg-[#2e7d32] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1b5e20] transition"
            >
              Duyệt
            </button>
            <button
              onClick={() => { setRejectTarget(row); setRejectReason(''); }}
              className="rounded-lg border border-red-400 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 transition"
            >
              Từ chối
            </button>
          </div>
        ) : (
          <span className="text-xs text-gray-400 italic">
            {formatDate(row.thoi_gian_xu_ly)}
          </span>
        ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Quản lý yêu cầu rút tiền</h1>

      {/* Filter */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {statusOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => { setStatusFilter(opt); setCurrentPage(1); }}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border transition ${
              statusFilter === opt
                ? 'bg-[#2e7d32] text-white border-[#2e7d32]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#2e7d32] hover:text-[#2e7d32]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <AdminTable<WithdrawalItem>
          columns={columns}
          data={data}
          rowKey={(row) => row.id}
          emptyMessage="Không có yêu cầu rút tiền nào"
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Reject Modal */}
      {rejectTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-[16px] font-bold text-gray-800 mb-1">Từ chối yêu cầu rút tiền</h3>
            <p className="text-sm text-gray-500 mb-4">
              Yêu cầu của <strong>{rejectTarget.nguoi_dung?.ten_hien_thi}</strong> —{' '}
              <strong className="text-[#d32f2f]">{formatMoney(rejectTarget.so_tien)}</strong>
            </p>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lý do từ chối</label>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Nhập lý do từ chối..."
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#2e7d32] resize-none"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setRejectTarget(null)}
                disabled={submitting}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleRejectSubmit}
                disabled={submitting}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition disabled:opacity-60"
              >
                {submitting ? 'Đang xử lý...' : 'Xác nhận từ chối'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
