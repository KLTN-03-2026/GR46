'use client';

const BASE = '/api/store/tong-quan';

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

function isApiEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
  return (
    !!value &&
    typeof value === 'object' &&
    'success' in value &&
    'message' in value &&
    'data' in value
  );
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

export type TrangThaiDonHangTongQuan =
  | 'tat_ca'
  | 'da_giao'
  | 'da_huy'
  | 'dang_giao'
  | 'tra_hang';

export interface StoreOverviewOrderItem {
  id: number;
  ma_don_hang: string;
  ten_khach_hang: string;
  gia_tri_don_hang: number;
  giam_gia: number;
  phi_nen_tang: number;
  thoi_gian_dat: string;
  trang_thai_don_hang: string;
  trang_thai_db: string;
  thu_nhap_tu_don_hang: number;
}

export interface StoreOverviewResponse {
  thong_tin_cua_hang: {
    id: number;
    ten_cua_hang: string;
    anh_dai_dien: string | null;
    dia_chi_kinh_doanh: string;
    gio_mo_cua: string | null;
    gio_dong_cua: string | null;
    trang_thai_hoat_dong: string;
    diem_danh_gia: number;
  };
  thong_ke_hom_nay: {
    tong_don_hang: number;
    don_huy: number;
    doanh_thu: number;
    tong_thu_nhap: number;
  };
  thong_ke_trang_thai_don_hang: {
    tong_so_don: number;
    ty_le_hoan_thanh: number;
    ty_le_huy: number;
    ty_le_dang_giao: number;
    ty_le_tra_hang: number;
  };
  top_mon_ban_chay_trong_ngay: Array<{
    xep_hang: number;
    id_mon_an: number | null;
    ten_mon_an: string;
    hinh_anh_mon_an: string | null;
    so_luong_da_ban: number;
  }>;
  danh_sach_don_hang_trong_ngay: {
    du_lieu: StoreOverviewOrderItem[];
    tong_so: number;
    trang: number;
    so_luong: number;
    tong_trang: number;
  };
  tong_thu_nhap_trong_ngay: number;
}

export const storeOverviewApi = {
  layTongQuan(params: {
    tim_kiem?: string;
    trang_thai?: TrangThaiDonHangTongQuan;
    sap_xep?: 'moi_nhat' | 'cu_nhat';
    bo_loc_thoi_gian?: 'today' | '7days' | '30days' | 'custom';
    tu_ngay?: string;
    den_ngay?: string;
    trang?: number;
    so_luong?: number;
  } = {}) {
    const sp = new URLSearchParams();
    if (params.tim_kiem) sp.set('tim_kiem', params.tim_kiem);
    if (params.trang_thai) sp.set('trang_thai', params.trang_thai);
    if (params.sap_xep) sp.set('sap_xep', params.sap_xep);
    if (params.bo_loc_thoi_gian) sp.set('bo_loc_thoi_gian', params.bo_loc_thoi_gian);
    if (params.tu_ngay) sp.set('tu_ngay', params.tu_ngay);
    if (params.den_ngay) sp.set('den_ngay', params.den_ngay);
    if (params.trang) sp.set('trang', String(params.trang));
    if (params.so_luong) sp.set('so_luong', String(params.so_luong));
    return request<StoreOverviewResponse>(`${BASE}?${sp.toString()}`);
  },
};
