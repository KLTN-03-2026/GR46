'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/Admin/Pagination';
import { adminReportApi, BaoCaoItem, BaoCaoTrangThai } from '@/shared/adminReportApi';
import { useToast } from '@/components/Admin/Toast';

const ITEMS_PER_PAGE = 5;

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getStatusLabel(status: BaoCaoTrangThai) {
  return status === 'da_xu_ly' ? 'Đã xử lý' : 'Chờ xử lý';
}

export default function ReportsPage() {
  const router = useRouter();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reports, setReports] = useState<BaoCaoItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminReportApi.layDanhSach({
        tim_kiem: searchQuery || undefined,
        trang: currentPage,
        so_luong: ITEMS_PER_PAGE,
      });
      setReports(data.du_lieu);
      setTotalPages(data.tong_trang || 1);
    } catch (fetchError: unknown) {
      toast.error(fetchError instanceof Error ? fetchError.message : 'Không thể tải danh sách báo cáo');
      setReports([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, toast]);

  useEffect(() => {
    void fetchReports();
  }, [fetchReports]);

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-black tracking-wide">QUẢN LÝ BÁO CÁO/ KHIẾU NẠI</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm mã báo cáo hoặc người báo cáo"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border border-gray-200 rounded-2xl pl-4 pr-10 py-2.5 text-sm outline-none focus:border-green-500 transition-colors shadow-sm w-80"
          />
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 text-sm shadow-sm border border-gray-100">
            Không có báo cáo nào phù hợp.
          </div>
        ) : reports.map((report) => (
          <div key={report.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-base">Mã báo cáo: {report.ma_bao_cao}</span>
              <span className={`px-4 py-1.5 rounded-lg text-xs font-semibold border ${report.trang_thai === 'da_xu_ly'
                ? 'bg-green-50 text-green-600 border-green-300'
                : 'bg-orange-50 text-orange-500 border-orange-300'
                }`}>
                {getStatusLabel(report.trang_thai)}
              </span>
            </div>

            <div className="px-6 py-4 flex gap-6">
              <div className="flex-1 space-y-2">
                <p className="font-semibold text-gray-900">{report.nguoi_bao_cao}</p>
                <p className="text-sm text-gray-500">
                  Thời gian báo cáo &nbsp;&nbsp;&nbsp;
                  <span className="text-gray-700 font-medium">{formatDate(report.thoi_gian_bao_cao)}</span>
                </p>
                <p className="text-sm text-gray-500">Nội dung báo cáo</p>
                <div className="bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-600 max-w-xl">
                  {report.noi_dung_bao_cao}
                </div>
              </div>

              <div className="flex flex-col items-end justify-between gap-3 min-w-[280px]">
                <div className="w-full rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-2">Nội dung bị báo cáo</p>
                  <p className="font-semibold text-gray-900 text-sm">{report.noi_dung_bi_bao_cao}</p>
                </div>

                <button
                  onClick={() => router.push(`/admin/reports/${report.id}`)}
                  className={`w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-colors cursor-pointer ${report.trang_thai === 'da_xu_ly'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                  {report.trang_thai === 'da_xu_ly' ? 'Xem chi tiết báo cáo' : 'Xử lý'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
