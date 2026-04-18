'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  adminReviewApi,
  ChiTietYeuCauResponse,
  VideoNoiBat,
  YeuCauLoai,
  YeuCauTrangThai,
} from '@/shared/adminReviewApi';
import { useToast } from '@/components/Admin/Toast';

const rejectReasons = [
  'Thông tin không chính xác',
  'Thiếu minh chứng hợp lệ',
  'Thông tin liên hệ không hợp lệ',
  'Nội dung chưa đáp ứng tiêu chuẩn nền tảng',
  'Khác',
];

const OTHER_REASON = 'Khác';

const typeLabel: Record<YeuCauLoai, string> = {
  mo_cua_hang: 'Mở cửa hàng',
  kiem_tien_noi_dung: 'Kiếm tiền từ nội dung',
};

const accountTypeLabel: Record<string, string> = {
  nguoi_dung: 'Người dùng',
  nha_sang_tao: 'Nhà sáng tạo',
  chu_cua_hang: 'Cửa hàng',
  admin: 'Admin',
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
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

function getAttachmentLabel(loaiTep: string) {
  switch (loaiTep) {
    case 'video':
      return 'Video';
    case 'hinh_anh':
      return 'Hình ảnh';
    case 'pdf':
      return 'PDF';
    default:
      return 'Tệp đính kèm';
  }
}

function getStatusBadge(trangThai: YeuCauTrangThai) {
  switch (trangThai) {
    case 'cho_duyet':
      return <span className="rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold text-orange-600">Chờ duyệt</span>;
    case 'da_duyet':
      return <span className="rounded-full bg-green-100 px-4 py-1.5 text-xs font-semibold text-green-600">Đã duyệt</span>;
    case 'da_tu_choi':
      return <span className="rounded-full bg-red-100 px-4 py-1.5 text-xs font-semibold text-red-600">Đã từ chối</span>;
    default:
      return null;
  }
}

export default function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const toast = useToast();
  const [request, setRequest] = useState<ChiTietYeuCauResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await adminReviewApi.layChiTiet(Number(id));
        setRequest(data);
      } catch (fetchError: unknown) {
        toast.error(getErrorMessage(fetchError, 'Không thể tải chi tiết yêu cầu'));
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, toast]);

  const currentStatus = request?.thong_tin_yeu_cau.trang_thai;
  const finalRejectReason = selectedReason === OTHER_REASON ? customReason.trim() : selectedReason;

  const refreshDetail = async () => {
    const data = await adminReviewApi.layChiTiet(Number(id));
    setRequest(data);
  };

  const handleApprove = async () => {
    if (!request) return;

    setActionLoading(true);
    try {
      await adminReviewApi.pheDuyet(request.id);
      await refreshDetail();
      toast.success('Đã phê duyệt yêu cầu');
    } catch (approveError: unknown) {
      toast.error(getErrorMessage(approveError, 'Không thể phê duyệt yêu cầu'));
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmReject = async () => {
    if (!request || !finalRejectReason) return;

    setActionLoading(true);
    try {
      await adminReviewApi.tuChoi(request.id, finalRejectReason);
      setShowRejectModal(false);
      setSelectedReason('');
      setCustomReason('');
      await refreshDetail();
      toast.success('Đã từ chối yêu cầu');
    } catch (rejectError: unknown) {
      toast.error(getErrorMessage(rejectError, 'Không thể từ chối yêu cầu'));
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-medium text-red-600">{error || 'Không tìm thấy yêu cầu'}</p>
          <Link href="/admin/review" className="mt-2 inline-block text-sm text-blue-500 hover:underline">
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const { thong_tin_nguoi_dung: userInfo, thong_tin_yeu_cau: requestInfo } = request;
  const currentTypeLabel = typeLabel[requestInfo.loai_yeu_cau];
  const accountLabel = accountTypeLabel[userInfo.loai_tai_khoan_hien_tai] || userInfo.loai_tai_khoan_hien_tai;
  const videos = request.thong_tin_kiem_tien_noi_dung?.video_noi_bat ?? [];
  const attachments = request.tep_minh_chung;

  return (
    <div className="space-y-5 p-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/review"
          className="rounded-xl border border-gray-100 bg-white p-2 text-gray-600 shadow-sm transition-all hover:shadow-md hover:text-black"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-black">Chi tiết đơn yêu cầu</h1>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 border-b border-gray-100 pb-4 text-base font-bold text-black">Thông tin người dùng</h2>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <span className="w-40 shrink-0 text-gray-400">Tên người dùng:</span>
                <span className="font-medium text-black">{userInfo.ten_nguoi_dung}</span>
              </div>
              <div className="flex gap-3">
                <span className="w-40 shrink-0 text-gray-400">Số điện thoại:</span>
                <span className="font-medium text-black">{userInfo.so_dien_thoai || '—'}</span>
              </div>
              <div className="flex gap-3">
                <span className="w-40 shrink-0 text-gray-400">Email:</span>
                <span className="font-medium text-black">{userInfo.email}</span>
              </div>
              <div className="flex gap-3">
                <span className="w-40 shrink-0 text-gray-400">Ngày tham gia:</span>
                <span className="font-medium text-black">{formatDate(userInfo.ngay_tham_gia)}</span>
              </div>
              <div className="flex gap-3">
                <span className="w-40 shrink-0 text-gray-400">Loại tài khoản hiện tại:</span>
                <span className="font-medium text-black">{accountLabel}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 border-b border-gray-100 pb-4 text-base font-bold text-black">Thông tin yêu cầu</h2>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <span className="w-40 shrink-0 text-gray-400">Loại yêu cầu:</span>
                <span className="font-medium text-black">{currentTypeLabel}</span>
              </div>
              <div className="flex gap-3">
                <span className="w-40 shrink-0 text-gray-400">Ngày gửi yêu cầu:</span>
                <span className="font-medium text-black">{formatDate(requestInfo.ngay_gui_yeu_cau)}</span>
              </div>
              <div className="flex gap-3">
                <span className="w-40 shrink-0 text-gray-400">Trạng thái yêu cầu:</span>
                <div>{getStatusBadge(requestInfo.trang_thai)}</div>
              </div>
              {requestInfo.ly_do_tu_choi ? (
                <div className="flex gap-3">
                  <span className="w-40 shrink-0 text-gray-400">Lý do từ chối:</span>
                  <span className="font-medium text-red-600">{requestInfo.ly_do_tu_choi}</span>
                </div>
              ) : null}
            </div>
          </div>

          {request.thong_tin_dang_ky_cua_hang ? (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 border-b border-gray-100 pb-4 text-base font-bold text-black">Thông tin đăng ký cửa hàng</h2>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="w-40 shrink-0 text-gray-400">Tên cửa hàng:</span>
                  <span className="font-medium text-black">{request.thong_tin_dang_ky_cua_hang.ten_cua_hang || '—'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-40 shrink-0 text-gray-400">Địa chỉ cửa hàng:</span>
                  <span className="font-medium text-black">{request.thong_tin_dang_ky_cua_hang.dia_chi_cua_hang || '—'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-40 shrink-0 text-gray-400">Số điện thoại liên hệ:</span>
                  <span className="font-medium text-black">{request.thong_tin_dang_ky_cua_hang.so_dien_thoai_lien_he || '—'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-40 shrink-0 text-gray-400">Mô tả cửa hàng:</span>
                  <span className="font-medium text-black">{request.thong_tin_dang_ky_cua_hang.mo_ta_cua_hang || '—'}</span>
                </div>
              </div>
            </div>
          ) : null}

          {request.thong_tin_kiem_tien_noi_dung ? (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 border-b border-gray-100 pb-4 text-base font-bold text-black">Thông tin nâng cấp tài khoản kiếm tiền nội dung</h2>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="w-40 shrink-0 text-gray-400">Tên kênh:</span>
                  <span className="font-medium text-black">{request.thong_tin_kiem_tien_noi_dung.ten_kenh || '—'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-40 shrink-0 text-gray-400">Mô tả nội dung kênh:</span>
                  <span className="font-medium text-black">{request.thong_tin_kiem_tien_noi_dung.mo_ta_noi_dung_kenh || '—'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-40 shrink-0 text-gray-400">Số bài đăng:</span>
                  <span className="font-medium text-black">{request.thong_tin_kiem_tien_noi_dung.so_bai_dang ?? '—'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-40 shrink-0 text-gray-400">Số người theo dõi:</span>
                  <span className="font-medium text-black">{request.thong_tin_kiem_tien_noi_dung.so_nguoi_theo_doi ?? '—'}</span>
                </div>
              </div>
            </div>
          ) : null}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 border-b border-gray-100 pb-4 text-base font-bold text-black">Nội dung minh chứng</h2>
            {attachments.length > 0 ? (
              <div className="space-y-3">
                {attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 text-sm transition-colors hover:border-green-200 hover:bg-green-50"
                  >
                    <div>
                      <p className="font-semibold text-black">{attachment.ghi_chu || getAttachmentLabel(attachment.loai_tep)}</p>
                      <p className="text-xs text-gray-400">
                        {getAttachmentLabel(attachment.loai_tep)} • {formatDate(attachment.ngay_tao)}
                      </p>
                    </div>
                    <span className="text-blue-500">Mở</span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Chưa có minh chứng đính kèm.</p>
            )}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 border-b border-gray-100 pb-4 text-base font-bold text-black">Lịch sử kiểm duyệt</h2>
            <div className="space-y-3">
              {request.lich_su_kiem_duyet.map((item) => (
                <div key={item.id} className="flex gap-3 text-sm">
                  <span className="w-44 shrink-0 text-gray-400">{formatDate(item.thoi_gian_tao)}</span>
                  <span className="font-medium text-black">
                    {item.hanh_dong === 'gui_yeu_cau'
                      ? 'Gửi yêu cầu'
                      : item.hanh_dong === 'phe_duyet'
                        ? 'Phê duyệt yêu cầu'
                        : 'Từ chối yêu cầu'}
                  </span>
                  <span className="text-gray-500">— {item.thuc_hien_boi}</span>
                  {item.ghi_chu ? <span className="text-gray-500">({item.ghi_chu})</span> : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {videos.length > 0 ? (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 border-b border-gray-100 pb-4 text-base font-bold text-black">Video nổi bật</h2>
              <div className="space-y-4">
                {videos.map((video, index) => (
                  <VideoCard key={`${video.url}-${index}`} video={video} />
                ))}
              </div>
            </div>
          ) : null}

          {currentStatus === 'cho_duyet' ? (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleApprove}
                disabled={actionLoading}
                className="flex-1 cursor-pointer rounded-xl bg-green-button px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-green-hover disabled:bg-gray-300"
              >
                {actionLoading ? 'Đang xử lý...' : 'Phê duyệt'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowRejectModal(true);
                }}
                disabled={actionLoading}
                className="flex-1 cursor-pointer rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-red-600 disabled:bg-gray-300"
              >
                Từ chối
              </button>
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <div className="flex justify-center">{getStatusBadge(requestInfo.trang_thai)}</div>
            </div>
          )}
        </div>
      </div>

      {showRejectModal ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-black">Lý do từ chối yêu cầu</h3>

            <div className="space-y-3">
              {rejectReasons.map((reason) => (
                <label
                  key={reason}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all ${
                    selectedReason === reason ? 'border-green-button bg-green-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="rejectReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="h-4 w-4 accent-green-600"
                  />
                  <span className="text-sm text-black">{reason}</span>
                </label>
              ))}
              {selectedReason === OTHER_REASON ? (
                <textarea
                  value={customReason}
                  onChange={(event) => setCustomReason(event.target.value)}
                  placeholder="Nhập lý do từ chối"
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-green-500"
                />
              ) : null}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedReason('');
                  setCustomReason('');
                }}
                className="flex-1 cursor-pointer rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                disabled={!finalRejectReason || actionLoading}
                className={`flex-1 rounded-xl px-5 py-3 text-sm font-bold text-white transition-colors ${
                  finalRejectReason && !actionLoading ? 'bg-red-500 hover:bg-red-600' : 'cursor-not-allowed bg-gray-300'
                }`}
              >
                {actionLoading ? 'Đang xử lý...' : 'Xác nhận từ chối'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function VideoCard({ video }: { video: VideoNoiBat }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      <div className="flex h-32 w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </div>
      <div className="space-y-1 p-3">
        <p className="text-sm font-semibold text-black">{video.tieu_de}</p>
        <p className="text-xs text-gray-400">{video.ngay_dang}</p>
        {video.luot_xem ? <p className="text-xs text-gray-400">{video.luot_xem}</p> : null}
        <a href={video.url} target="_blank" rel="noreferrer" className="block truncate text-xs text-blue-500">
          {video.url}
        </a>
      </div>
    </div>
  );
}
