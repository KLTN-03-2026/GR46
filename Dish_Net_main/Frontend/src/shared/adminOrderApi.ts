const BASE = '/api/admin/don-hang';

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

export type OrderStatusFilter =
  | 'cho_xac_nhan'
  | 'dang_chuan_bi'
  | 'dang_giao'
  | 'da_giao'
  | 'da_huy'
  | 'tra_hang';

export interface OrderListItem {
  ma_don_hang: string;
  cua_hang: string;
  id_cua_hang: number;
  khach_hang: string;
  tong_tien_don: number;
  trang_thai_don: string;
  thoi_gian_dat: string;
}

export interface OrderListResponse {
  du_lieu: OrderListItem[];
  cua_hang_options: Array<{
    id: number;
    ten_cua_hang: string;
  }>;
  tong_so: number;
  trang: number;
  so_luong: number;
  tong_trang: number;
}

export interface OrderDetailResponse {
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
    trang_thai_hoat_dong: string;
  };
  danh_sach_mon_an: Array<{
    id: number;
    ten_mon: string;
    hinh_anh: string | null;
    don_gia: number;
    so_luong: number;
    thanh_tien: number;
    ghi_chu: string | null;
  }>;
  tong_tien_don_hang: {
    tam_tinh: number;
    phi_van_chuyen: number;
    tong_giam_gia: number;
    tong_thanh_toan: number;
  };
  trang_thai_don_hang: string;
  thoi_gian_dat_hang: string;
  lich_su_cap_nhat: Array<{
    id: number;
    trang_thai_tu: string | null;
    trang_thai_den: string;
    noi_dung: string | null;
    nguoi_cap_nhat: string;
    thoi_gian_cap_nhat: string;
  }>;
}

export const adminOrderApi = {
  layDanhSach(params: {
    tim_kiem?: string;
    id_cua_hang?: number;
    trang_thai?: OrderStatusFilter;
    bo_loc_thoi_gian?: 'today' | '7days' | '30days' | 'custom';
    tu_ngay?: string;
    den_ngay?: string;
    trang?: number;
    so_luong?: number;
  }) {
    const sp = new URLSearchParams();
    if (params.tim_kiem) sp.set('tim_kiem', params.tim_kiem);
    if (params.id_cua_hang) sp.set('id_cua_hang', String(params.id_cua_hang));
    if (params.trang_thai) sp.set('trang_thai', params.trang_thai);
    if (params.bo_loc_thoi_gian) sp.set('bo_loc_thoi_gian', params.bo_loc_thoi_gian);
    if (params.tu_ngay) sp.set('tu_ngay', params.tu_ngay);
    if (params.den_ngay) sp.set('den_ngay', params.den_ngay);
    if (params.trang) sp.set('trang', String(params.trang));
    if (params.so_luong) sp.set('so_luong', String(params.so_luong));
    return request<OrderListResponse>(`${BASE}?${sp.toString()}`);
  },

  layChiTiet(maDonHang: string) {
    return request<OrderDetailResponse>(`${BASE}/${maDonHang}`);
  },
};
