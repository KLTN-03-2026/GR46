'use client';

import { use, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { adminOrderApi, OrderDetailResponse } from '@/shared/adminOrderApi';

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

function getStatusBadgeStyle(status: string) {
  switch (status) {
    case 'Đang giao':
      return 'text-blue-600 border-blue-500 bg-blue-50';
    case 'Đang chuẩn bị':
      return 'text-gray-700 border-gray-400 bg-gray-50';
    case 'Chờ xác nhận':
      return 'text-orange-500 border-orange-400 bg-orange-50';
    case 'Đã giao':
      return 'text-white border-green-500 bg-green-500';
    case 'Đã hủy':
      return 'text-red-500 border-red-400 bg-red-50';
    case 'Trả hàng':
      return 'text-orange-600 border-orange-500 bg-orange-50';
    default:
      return 'text-gray-600 border-gray-300 bg-gray-50';
  }
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<OrderDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await adminOrderApi.layChiTiet(id);
        setOrder(data);
      } catch (fetchError: unknown) {
        setError(getErrorMessage(fetchError, 'Không thể tải chi tiết đơn hàng'));
      } finally {
        setLoading(false);
      }
    };

    void fetchDetail();
  }, [id]);

  const historyItems = useMemo(() => order?.lich_su_cap_nhat ?? [], [order]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-medium text-red-600">{error || 'Không tìm thấy đơn hàng'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1250px] mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/orders" className="hover:opacity-70 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-black">Chi tiết đơn {order.ma_don_hang}</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8">
        <div className="flex items-center gap-4">
          <span className="text-base font-bold text-black">Mã đơn: {order.ma_don_hang}</span>
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getStatusBadgeStyle(order.trang_thai_don_hang)}`}>
            {order.trang_thai_don_hang}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 p-5 space-y-3">
              <h2 className="text-base font-bold text-black">Thông tin khách hàng</h2>
              <div className="grid gap-2 text-sm text-gray-700">
                <p>Tên khách hàng: <span className="font-medium text-black">{order.thong_tin_khach_hang.ten_hien_thi}</span></p>
                <p>Email: <span className="font-medium text-black">{order.thong_tin_khach_hang.email}</span></p>
                <p>Người nhận: <span className="font-medium text-black">{order.thong_tin_khach_hang.nguoi_nhan}</span></p>
                <p>Số điện thoại: <span className="font-medium text-black">{order.thong_tin_khach_hang.so_dien_thoai}</span></p>
                <p>Địa chỉ giao: <span className="font-medium text-black">{order.thong_tin_khach_hang.dia_chi_giao}</span></p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 p-5 space-y-3">
              <h2 className="text-base font-bold text-black">Thông tin cửa hàng</h2>
              <div className="grid gap-2 text-sm text-gray-700">
                <p>Cửa hàng: <span className="font-medium text-black">{order.thong_tin_cua_hang.ten_cua_hang}</span></p>
                <p>Địa chỉ: <span className="font-medium text-black">{order.thong_tin_cua_hang.dia_chi}</span></p>
                <p>Trạng thái hoạt động: <span className="font-medium text-black">{order.thong_tin_cua_hang.trang_thai_hoat_dong}</span></p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 p-5 space-y-4">
              <h2 className="text-base font-bold text-black">Danh sách món ăn trong đơn</h2>
              {order.danh_sach_mon_an.map((item) => (
                <div key={item.id} className="flex items-center gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                    <span className="text-lg">🍜</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-black">{item.ten_mon}</p>
                    <p className="text-xs text-gray-500">Số lượng: x{item.so_luong}</p>
                    {item.ghi_chu ? <p className="text-xs text-gray-400">Ghi chú: {item.ghi_chu}</p> : null}
                  </div>
                  <p className="text-sm font-semibold text-black">{formatCurrency(item.thanh_tien)}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-100 p-5 space-y-3">
              <h2 className="text-base font-bold text-black">Tổng tiền đơn hàng</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(order.tong_tien_don_hang.tam_tinh)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span>{formatCurrency(order.tong_tien_don_hang.phi_van_chuyen)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Giảm giá</span>
                  <span>{formatCurrency(order.tong_tien_don_hang.tong_giam_gia)}</span>
                </div>
                <div className="flex justify-between font-bold text-black border-t border-gray-100 pt-2">
                  <span>Tổng thanh toán</span>
                  <span>{formatCurrency(order.tong_tien_don_hang.tong_thanh_toan)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 p-5 space-y-3">
              <h2 className="text-base font-bold text-black">Theo dõi đơn hàng</h2>
              <p className="text-sm text-gray-700">Trạng thái hiện tại: <span className="font-semibold text-black">{order.trang_thai_don_hang}</span></p>
              <p className="text-sm text-gray-700">Thời gian đặt: <span className="font-semibold text-black">{formatDate(order.thoi_gian_dat_hang)}</span></p>
            </div>

            <div className="rounded-2xl border border-gray-100 p-5 space-y-4">
              <h2 className="text-base font-bold text-black">Lịch sử cập nhật trạng thái</h2>
              {historyItems.length > 0 ? historyItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 h-3 w-3 rounded-full bg-green-500" />
                    <span className="mt-1 h-full w-px bg-gray-200 last:hidden" />
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-semibold text-black">{item.trang_thai_den}</p>
                    {item.trang_thai_tu ? (
                      <p className="text-xs text-gray-500">
                        Từ {item.trang_thai_tu} sang {item.trang_thai_den}
                      </p>
                    ) : null}
                    {item.noi_dung ? <p className="text-sm text-gray-600">{item.noi_dung}</p> : null}
                    <p className="text-xs text-gray-400">
                      {item.nguoi_cap_nhat} - {formatDate(item.thoi_gian_cap_nhat)}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-400">Chưa có lịch sử trạng thái.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
