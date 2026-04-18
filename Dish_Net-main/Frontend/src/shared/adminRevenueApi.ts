const BASE = '/api/admin/doanh-thu';

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

function isApiEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
  return !!value && typeof value === 'object' && 'success' in value && 'message' in value && 'data' in value;
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
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

export type RevenueOrderStatusFilter =
  | 'cho_xac_nhan'
  | 'dang_chuan_bi'
  | 'dang_giao'
  | 'da_giao'
  | 'da_huy'
  | 'tra_hang';

export interface RevenueOverviewResponse {
  thong_ke_tong_quan: {
    tong_doanh_thu_he_thong: number;
    doanh_thu_hom_nay: number;
    tong_so_don_hang: number;
  };
  bieu_do_doanh_thu_theo_ngay: Array<{
    ngay: string;
    nhan: string;
    doanh_thu: number;
  }>;
  bieu_do_doanh_thu_theo_nguon: Array<{
    key: string;
    nhan: string;
    doanh_thu: number;
    ty_le: number;
    mau: string;
  }>;
  top_cua_hang: Array<{
    stt: number;
    id: number;
    ten_cua_hang: string;
    tong_don_hang: number;
    doanh_thu: number;
  }>;
  top_nha_sang_tao: Array<{
    stt: number;
    id: number;
    ten_hien_thi: string;
    doanh_thu_tao_ra: number;
  }>;
}

export interface RevenueOrderListItem {
  ma_don_hang: string;
  cua_hang: string;
  id_cua_hang: number;
  khach_hang: string;
  tong_tien_don: number;
  trang_thai_don: string;
  thoi_gian_dat: string;
}

export interface RevenueOrderListResponse {
  du_lieu: RevenueOrderListItem[];
  cua_hang_options: Array<{
    id: number;
    ten_cua_hang: string;
  }>;
  tong_so: number;
  trang: number;
  so_luong: number;
  tong_trang: number;
}

export const adminRevenueApi = {
  layTongQuan() {
    return request<RevenueOverviewResponse>(BASE);
  },

  layDanhSachDonHang(params: {
    id_cua_hang?: number;
    trang_thai?: RevenueOrderStatusFilter;
    trang?: number;
    so_luong?: number;
  }) {
    const sp = new URLSearchParams();
    if (params.id_cua_hang) sp.set('id_cua_hang', String(params.id_cua_hang));
    if (params.trang_thai) sp.set('trang_thai', params.trang_thai);
    if (params.trang) sp.set('trang', String(params.trang));
    if (params.so_luong) sp.set('so_luong', String(params.so_luong));
    return request<RevenueOrderListResponse>(`${BASE}/don-hang?${sp.toString()}`);
  },
};
