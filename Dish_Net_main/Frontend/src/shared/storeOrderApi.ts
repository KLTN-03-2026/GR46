'use client';

import { emitStoreOverviewRefreshEvent } from './storeEvents';

const BASE = '/api/store/don-hang';

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

function isApiEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
  return !!value && typeof value === 'object' && 'success' in value && 'message' in value && 'data' in value;
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const requestUrl =
    typeof window === 'undefined'
      ? new URL(
          url,
          process.env.NEXT_PUBLIC_APP_ORIGIN ?? 'http://127.0.0.1:4000',
        ).toString()
      : url;

  const res = await fetch(requestUrl, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message = isApiEnvelope(body) ? body.message : body?.message;
    throw new Error(message || `Lỗi ${res.status}`);
  }

  return (isApiEnvelope<T>(body) ? body.data : body) as T;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type TrangThaiDonHangStore =
  | 'cho_xac_nhan'
  | 'dang_chuan_bi'
  | 'dang_giao'
  | 'da_giao'
  | 'da_huy'
  | 'tra_hang';

export interface TabCounts {
  cho_xac_nhan: number;
  dang_chuan_bi: number;
  dang_giao: number;
  da_giao: number;
  da_huy: number;
  tra_hang: number;
}

export interface StoreOrderItem {
  id: number;
  ma_don_hang: string;
  khach_hang: string;
  so_dien_thoai_khach: string;
  dia_chi_giao: string;
  tong_tien: number;
  tam_tinh: number;
  phi_van_chuyen: number;
  tong_giam_gia: number;
  phuong_thuc_thanh_toan: string;
  trang_thai_don_hang: string;
  trang_thai_db: string;
  thoi_gian_dat: string;
  thoi_gian_xac_nhan: string | null;
  thoi_gian_giao: string | null;
  thoi_gian_hoan_tat: string | null;
  thoi_gian_hoan_tien: string | null;
  thoi_gian_huy: string | null;
  ly_do_huy: string | null;
  ly_do_tra_hang: string | null;
  nguoi_huy: string | null;
  anh_dai_dien_khach: string | null;
}

export interface DanhSachDonHangResponse {
  du_lieu: StoreOrderItem[];
  tab_counts: TabCounts;
  tong_so: number;
  trang: number;
  so_luong: number;
  tong_trang: number;
}

export interface ToppingSnapshot {
  ten: string;
  gia: number;
  so_luong: number;
}

export interface StoreOrderDanhGia {
  id: number;
  ten_nguoi_danh_gia: string;
  anh_nguoi_danh_gia: string | null;
  so_sao: number;
  noi_dung: string | null;
  an_danh: boolean;
  ngay_danh_gia: string;
}

export interface StoreOrderDetail {
  id: number;
  ma_don_hang: string;
  thong_tin_khach_hang: {
    ten_hien_thi: string;
    email: string;
    so_dien_thoai: string;
    nguoi_nhan: string;
    dia_chi_giao: string;
  };
  thong_tin_cua_hang: {
    ten_cua_hang: string;
    dia_chi: string;
  };
  danh_sach_mon_an: Array<{
    id: number;
    id_mon_an: number | null;
    ten_mon: string;
    hinh_anh: string | null;
    don_gia: number;
    so_luong: number;
    thanh_tien: number;
    topping: ToppingSnapshot[];
    ghi_chu: string | null;
  }>;
  tong_tien_don_hang: {
    tam_tinh: number;
    phi_van_chuyen: number;
    tong_giam_gia: number;
    tong_thanh_toan: number;
    thu_nhap_cua_hang: number;
    hoa_hong_nen_tang: number;
  };
  trang_thai_don_hang: string;
  trang_thai_db: string;
  thoi_gian_dat: string;
  thoi_gian_xac_nhan: string | null;
  thoi_gian_giao: string | null;
  thoi_gian_hoan_tat: string | null;
  thoi_gian_hoan_tien: string | null;
  thoi_gian_huy: string | null;
  ly_do_huy: string | null;
  ly_do_tra_hang: string | null;
  nguoi_huy: string | null;
  danh_gia: StoreOrderDanhGia[];
  lich_su_cap_nhat: Array<{
    id: number;
    trang_thai_tu: string | null;
    trang_thai_den: string;
    noi_dung: string | null;
    nguoi_cap_nhat: string;
    thoi_gian_cap_nhat: string;
  }>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat('vi-VN').format(n) + 'đ';
}

function fmtPhone(phone: string) {
  if (!phone) return '';
  return phone.slice(0, 3) + '*****' + phone.slice(-2);
}

// ─── API ────────────────────────────────────────────────────────────────────────

export const storeOrderApi = {
  layDanhSach(params: {
    tim_kiem?: string;
    trang_thai?: TrangThaiDonHangStore;
    bo_loc_thoi_gian?: 'today' | '7days' | '30days' | 'custom';
    tu_ngay?: string;
    den_ngay?: string;
    trang?: number;
    so_luong?: number;
  }) {
    const sp = new URLSearchParams();
    if (params.tim_kiem) sp.set('tim_kiem', params.tim_kiem);
    if (params.trang_thai) sp.set('trang_thai', params.trang_thai);
    if (params.bo_loc_thoi_gian) sp.set('bo_loc_thoi_gian', params.bo_loc_thoi_gian);
    if (params.tu_ngay) sp.set('tu_ngay', params.tu_ngay);
    if (params.den_ngay) sp.set('den_ngay', params.den_ngay);
    if (params.trang) sp.set('trang', String(params.trang));
    if (params.so_luong) sp.set('so_luong', String(params.so_luong));
    return request<DanhSachDonHangResponse>(`${BASE}?${sp.toString()}`);
  },

  layChiTiet(maDonHang: string) {
    return request<StoreOrderDetail>(`${BASE}/${maDonHang}`);
  },

  xacNhanDonHang(maDonHang: string, thoiGianDuKien: string) {
    return request<{ message: string; trang_thai_moi: string; thoi_gian_du_kien_chuan_bi: number }>(
      `${BASE}/${maDonHang}/xac-nhan`,
      {
        method: 'PATCH',
        body: JSON.stringify({ thoi_gian_du_kien_chuan_bi: thoiGianDuKien }),
      },
    ).then((res) => {
      emitStoreOverviewRefreshEvent();
      return res;
    });
  },

  tuChoiDonHang(maDonHang: string, lyDo: string) {
    return request<{ message: string; trang_thai_moi: string }>(
      `${BASE}/${maDonHang}/tu-choi`,
      {
        method: 'PATCH',
        body: JSON.stringify({ ly_do: lyDo }),
      },
    ).then((res) => {
      emitStoreOverviewRefreshEvent();
      return res;
    });
  },

  giaoDonHang(maDonHang: string) {
    return request<{ message: string; trang_thai_moi: string }>(
      `${BASE}/${maDonHang}/giao`,
      { method: 'PATCH' },
    ).then((res) => {
      emitStoreOverviewRefreshEvent();
      return res;
    });
  },

  giaHanDonHang(maDonHang: string, soPhutGiaHan: string) {
    return request<{ message: string; so_phut_gia_han: number }>(
      `${BASE}/${maDonHang}/gia-han`,
      {
        method: 'PATCH',
        body: JSON.stringify({ so_phut_gia_han: soPhutGiaHan }),
      },
    );
  },

  duyetHoanTien(maDonHang: string) {
    return request<{ message: string; trang_thai_moi: string; so_tien_hoan: number }>(
      `${BASE}/${maDonHang}/hoan-tien`,
      { method: 'PATCH', body: JSON.stringify({}) },
    ).then((res) => {
      emitStoreOverviewRefreshEvent();
      return res;
    });
  },

  tuChoiHoanTien(maDonHang: string, lyDoTuChoi: string) {
    return request<{ message: string; trang_thai_moi: string }>(
      `${BASE}/${maDonHang}/tu-choi-hoan-tien`,
      {
        method: 'PATCH',
        body: JSON.stringify({ ly_do_tu_choi: lyDoTuChoi }),
      },
    ).then((res) => {
      emitStoreOverviewRefreshEvent();
      return res;
    });
  },
};

// ─── Utilities ────────────────────────────────────────────────────────────────

export { fmt, fmtPhone };
