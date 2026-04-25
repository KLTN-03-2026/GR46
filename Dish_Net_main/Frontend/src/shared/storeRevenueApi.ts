'use client';

const BASE = '/api/store/doanh-thu';

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

export type StoreRevenueStatusFilter =
  | 'tat_ca'
  | 'da_giao'
  | 'da_huy'
  | 'dang_giao'
  | 'tra_hang';

export interface StoreRevenueOverviewResponse {
  thong_ke_tong_quan: {
    doanh_thu_hom_nay: number;
    doanh_thu_thuc_nhan: number;
    tong_so_don_hang: number;
    ty_le_huy_hoan: number;
  };
  bieu_do_doanh_thu_30_ngay: Array<{
    ngay: string;
    nhan: string;
    doanh_thu: number;
  }>;
  bieu_do_doanh_thu_theo_mon: Array<{
    ten_mon_an: string;
    doanh_thu: number;
    ty_le: number;
  }>;
  top_mon_ban_chay: Array<{
    xep_hang: number;
    ten_mon_an: string;
    doanh_thu: number;
    so_luong_da_ban: number;
  }>;
}

export interface StoreRevenueOrderListResponse {
  du_lieu: Array<{
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
  }>;
  tong_so: number;
  trang: number;
  so_luong: number;
  tong_trang: number;
}

export const storeRevenueApi = {
  layTongQuan() {
    return request<StoreRevenueOverviewResponse>(BASE);
  },

  layDanhSachDonHang(params: {
    tim_kiem?: string;
    trang_thai?: StoreRevenueStatusFilter;
    bo_loc_thoi_gian?: 'today' | '7days' | '30days' | 'custom';
    tu_ngay?: string;
    den_ngay?: string;
    trang?: number;
    so_luong?: number;
  } = {}) {
    const sp = new URLSearchParams();
    if (params.tim_kiem) sp.set('tim_kiem', params.tim_kiem);
    if (params.trang_thai) sp.set('trang_thai', params.trang_thai);
    if (params.bo_loc_thoi_gian) sp.set('bo_loc_thoi_gian', params.bo_loc_thoi_gian);
    if (params.tu_ngay) sp.set('tu_ngay', params.tu_ngay);
    if (params.den_ngay) sp.set('den_ngay', params.den_ngay);
    if (params.trang) sp.set('trang', String(params.trang));
    if (params.so_luong) sp.set('so_luong', String(params.so_luong));
    return request<StoreRevenueOrderListResponse>(`${BASE}/don-hang?${sp.toString()}`);
  },
};
