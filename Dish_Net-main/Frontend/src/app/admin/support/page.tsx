'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminTable, { Column } from '@/components/Admin/AdminTable';
import Pagination from '@/components/Admin/Pagination';
import ViewButton from '@/components/Admin/ViewButton';
import {
  adminSupportApi,
  AdminSupportItem,
  ChiTietSupportResponse,
  LoaiTaiKhoan,
  TrangThaiHoTro,
} from '@/shared/adminSupportApi';
import { useToast } from '@/components/Admin/Toast';

const ITEMS_PER_PAGE = 10;

const accountTypeOptions = ['Loại tài khoản', 'Người dùng', 'Nhà sáng tạo', 'Cửa hàng'];
const statusOptions = ['Trạng thái', 'Chưa phản hồi', 'Đã phản hồi'];

const accountTypeMap: Record<string, LoaiTaiKhoan> = {
  'Người dùng': 'nguoi_dung',
  'Nhà sáng tạo': 'nha_sang_tao',
  'Cửa hàng': 'chu_cua_hang',
};

const statusMap: Record<string, TrangThaiHoTro> = {
  'Chưa phản hồi': 'chua_phan_hoi',
  'Đã phản hồi': 'da_phan_hoi',
};

const accountTypeLabel: Record<LoaiTaiKhoan, string> = {
  nguoi_dung: 'Người dùng',
  nha_sang_tao: 'Nhà sáng tạo',
  chu_cua_hang: 'Cửa hàng',
};

const statusLabel: Record<TrangThaiHoTro, string> = {
  chua_phan_hoi: 'Chưa phản hồi',
  da_phan_hoi: 'Đã phản hồi',
};

function getAccountTypeBadge(type: LoaiTaiKhoan) {
  switch (type) {
    case 'nguoi_dung':
      return 'bg-green-100 text-green-700 border border-green-300';
    case 'nha_sang_tao':
      return 'bg-orange-100 text-orange-600 border border-orange-300';
    case 'chu_cua_hang':
      return 'bg-blue-100 text-blue-600 border border-blue-300';
  }
}

function getStatusBadge(status: TrangThaiHoTro) {
  return status === 'da_phan_hoi'
    ? 'bg-green-100 text-green-700 border border-green-300'
    : 'bg-orange-100 text-orange-600 border border-orange-300';
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function SupportPage() {
  const toast = useToast();
  const [requests, setRequests] = useState<AdminSupportItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Loại tài khoản');
  const [selectedStatus, setSelectedStatus] = useState('Trạng thái');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const [viewingRequest, setViewingRequest] = useState<ChiTietSupportResponse | null>(null);
  const [responseText, setResponseText] = useState('');
  const [sendingResponse, setSendingResponse] = useState(false);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await adminSupportApi.layDanhSach({
        tim_kiem: searchQuery || undefined,
        loai_tai_khoan: accountTypeMap[selectedType],
        trang_thai: statusMap[selectedStatus],
        trang: currentPage,
        so_luong: ITEMS_PER_PAGE,
      });
      setRequests(res.du_lieu);
      setTotalPages(res.tong_trang || 1);
    } catch (fetchError: unknown) {
      setRequests([]);
      setTotalPages(1);
      setError(getErrorMessage(fetchError, 'Không thể tải danh sách yêu cầu hỗ trợ'));
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, selectedStatus, selectedType]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const openModal = async (requestId: number) => {
    setDetailLoading(true);
    setDetailError('');
    try {
      const data = await adminSupportApi.layChiTiet(requestId);
      setViewingRequest(data);
      setResponseText(data.thong_tin_phan_hoi?.noi_dung_phan_hoi ?? '');
    } catch (fetchError: unknown) {
      setDetailError(getErrorMessage(fetchError, 'Không thể tải chi tiết yêu cầu hỗ trợ'));
      setViewingRequest(null);
      setResponseText('');
    } finally {
      setDetailLoading(false);
    }
  };

  const closeModal = () => {
    setViewingRequest(null);
    setResponseText('');
    setDetailError('');
  };

  const handleSendResponse = async () => {
    if (!viewingRequest || !responseText.trim()) return;

    setSendingResponse(true);
    try {
      await adminSupportApi.phanHoi(viewingRequest.id, responseText);
      const refreshed = await adminSupportApi.layChiTiet(viewingRequest.id);
      setViewingRequest(refreshed);
      setResponseText(refreshed.thong_tin_phan_hoi?.noi_dung_phan_hoi ?? '');
      toast.success('Đã gửi phản hồi thành công');
      await fetchRequests();
    } catch (sendError: unknown) {
      toast.error(getErrorMessage(sendError, 'Không thể gửi phản hồi'));
    } finally {
      setSendingResponse(false);
    }
  };

  const columns: Column<AdminSupportItem>[] = [
    {
      key: 'ma_yeu_cau',
      label: 'Mã yêu cầu',
      render: (row) => <span className="font-medium text-gray-900">{row.ma_yeu_cau}</span>,
      className: 'w-28',
    },
    {
      key: 'nguoi_gui',
      label: 'Người gửi',
    },
    {
      key: 'loai_tai_khoan',
      label: 'Loại tài khoản',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAccountTypeBadge(row.loai_tai_khoan)}`}>
          {accountTypeLabel[row.loai_tai_khoan]}
        </span>
      ),
    },
    {
      key: 'chu_de',
      label: 'Chủ đề yêu cầu',
    },
    {
      key: 'trang_thai',
      label: 'Trạng thái',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(row.trang_thai)}`}>
          {statusLabel[row.trang_thai]}
        </span>
      ),
    },
    {
      key: 'thoi_gian_gui',
      label: 'Thời gian gửi',
      render: (row) => <span className="text-blue-500 font-medium">{formatDate(row.thoi_gian_gui)}</span>,
    },
    {
      key: 'actions',
      label: '',
      align: 'center',
      render: (row) =>
        row.trang_thai === 'da_phan_hoi' ? (
          <ViewButton onClick={() => void openModal(row.id)} label="Xem" />
        ) : (
          <button
            onClick={() => void openModal(row.id)}
            className="px-4 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Phản hồi
          </button>
        ),
    },
  ];

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-xl font-bold text-black tracking-wide">QUẢN LÝ YÊU CẦU HỖ TRỢ</h1>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm mã yêu cầu hoặc người gửi"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-4 pr-10 py-2.5 text-sm outline-none focus:border-green-500 transition-colors shadow-sm"
          />
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <div className="ml-auto flex gap-3">
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none cursor-pointer min-w-[150px]"
            >
              {accountTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </div>

          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none cursor-pointer min-w-[140px]"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </div>
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
          rowKey={(row) => row.id}
          emptyMessage="Không có yêu cầu hỗ trợ nào phù hợp."
        >
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </AdminTable>
      )}

      {(viewingRequest || detailLoading || detailError) ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
            <div className="px-6 pt-5 pb-3 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-start justify-between">
                <h3 className="text-base font-bold text-black">
                  {viewingRequest?.thong_tin_yeu_cau.trang_thai === 'chua_phan_hoi' ? 'Phản hồi yêu cầu hỗ trợ' : 'Chi tiết phản hồi'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" /><path d="M6 6 18 18" />
                  </svg>
                </button>
              </div>
              {viewingRequest ? (
                <p className="text-right text-xs text-gray-400 mt-0.5">{formatDate(viewingRequest.thong_tin_yeu_cau.thoi_gian_gui)}</p>
              ) : null}
            </div>

            <div className="px-6 pb-4 overflow-y-auto flex-1 min-h-0">
              {detailLoading ? (
                <div className="flex justify-center py-10">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
                </div>
              ) : viewingRequest ? (
                <div className="py-3 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <InfoField label="Mã yêu cầu" value={viewingRequest.ma_yeu_cau} />
                    <InfoField label="Trạng thái" value={statusLabel[viewingRequest.thong_tin_yeu_cau.trang_thai]} badgeClass={getStatusBadge(viewingRequest.thong_tin_yeu_cau.trang_thai)} />
                  </div>

                  <div className="rounded-xl border border-gray-100 p-3">
                    <h4 className="mb-2 text-xs font-bold text-black">Thông tin người gửi</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <InfoField label="Người gửi" value={viewingRequest.thong_tin_nguoi_gui.ten_nguoi_dung} />
                      <InfoField label="Loại tài khoản" value={accountTypeLabel[viewingRequest.thong_tin_nguoi_gui.loai_tai_khoan]} badgeClass={getAccountTypeBadge(viewingRequest.thong_tin_nguoi_gui.loai_tai_khoan)} />
                      <InfoField label="Email" value={viewingRequest.thong_tin_nguoi_gui.email} />
                      <InfoField label="SĐT" value={viewingRequest.thong_tin_nguoi_gui.so_dien_thoai || '—'} />
                    </div>
                  </div>

                  <InfoField label="Chủ đề" value={viewingRequest.thong_tin_yeu_cau.chu_de} />

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-black">Nội dung yêu cầu</label>
                      <span className="text-xs text-gray-400">{viewingRequest.thong_tin_yeu_cau.noi_dung_yeu_cau.length}/1000</span>
                    </div>
                    <textarea
                      value={viewingRequest.thong_tin_yeu_cau.noi_dung_yeu_cau}
                      readOnly
                      rows={3}
                      className="w-full bg-gray-100 border border-gray-200 text-gray-600 rounded-xl px-3 py-2 text-sm outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-black mb-1">Tệp đính kèm</label>
                    {viewingRequest.tep_dinh_kem.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {viewingRequest.tep_dinh_kem.map((attachment) => (
                          <a
                            key={attachment.id}
                            href={attachment.url}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm hover:bg-gray-50 text-xs"
                          >
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 1 0 2.828 2.828l6.414-6.586a4 4 0 0 0-5.656-5.656l-6.415 6.585a6 6 0 1 0 8.486 8.486L20.5 13" />
                            </svg>
                            <span className="text-gray-600 max-w-[120px] truncate">{attachment.ghi_chu || 'Tệp đính kèm'}</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-400">
                        Chưa có tệp đính kèm
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-black mb-1">
                      {viewingRequest.thong_tin_yeu_cau.trang_thai === 'chua_phan_hoi' ? 'Nội dung phản hồi' : 'Phản hồi của admin'}
                    </label>
                    {viewingRequest.thong_tin_yeu_cau.trang_thai === 'chua_phan_hoi' ? (
                      <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        rows={4}
                        placeholder="Nhập nội dung phản hồi..."
                        className="w-full bg-white border border-gray-200 focus:border-green-500 text-gray-700 rounded-xl px-3 py-2 text-sm outline-none resize-none shadow-sm placeholder:text-gray-300"
                      />
                    ) : (
                      <div className="space-y-1">
                        <textarea
                          value={viewingRequest.thong_tin_phan_hoi?.noi_dung_phan_hoi || ''}
                          readOnly
                          rows={3}
                          className="w-full bg-gray-100 border border-gray-200 text-gray-600 rounded-xl px-3 py-2 text-sm outline-none resize-none"
                        />
                        <p className="text-xs text-gray-400 text-right">
                          {viewingRequest.thong_tin_phan_hoi
                            ? `${viewingRequest.thong_tin_phan_hoi.admin_phan_hoi} • ${formatDate(viewingRequest.thong_tin_phan_hoi.thoi_gian_phan_hoi || viewingRequest.thong_tin_yeu_cau.thoi_gian_gui)}`
                            : ''}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center pt-1">
                    {viewingRequest.thong_tin_yeu_cau.trang_thai === 'chua_phan_hoi' ? (
                      <button
                        onClick={() => void handleSendResponse()}
                        disabled={!responseText.trim() || sendingResponse}
                        className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors cursor-pointer"
                      >
                        {sendingResponse ? 'Đang gửi...' : 'Gửi phản hồi'}
                      </button>
                    ) : (
                      <button
                        onClick={closeModal}
                        className="w-full py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-colors cursor-pointer"
                      >
                        Quay lại
                      </button>
                    )}
                  </div>
                </div>
              ) : detailError ? (
                <div className="flex flex-col items-center justify-center py-10 gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">{detailError}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function InfoField({ label, value, badgeClass }: { label: string; value: string; badgeClass?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-black mb-1">{label}</label>
      {badgeClass ? (
        <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-semibold ${badgeClass}`}>{value}</span>
      ) : (
        <div className="w-full bg-gray-100 border border-gray-200 text-gray-600 rounded-xl px-3 py-2 text-xs">
          {value}
        </div>
      )}
    </div>
  );
}
