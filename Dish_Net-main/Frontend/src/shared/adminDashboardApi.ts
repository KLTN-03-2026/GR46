const BASE = '/api/admin/thong-ke';

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

export type DashboardDateFilter = 'today' | '7days' | '30days' | 'custom';

export interface DashboardOverviewResponse {
  bo_loc: {
    bo_loc_thoi_gian: DashboardDateFilter;
    tu_ngay: string;
    den_ngay: string;
  };
  thong_ke_tong_quan: {
    tong_nguoi_dung: number;
    tong_cua_hang: number;
    tong_don_hang: number;
    doanh_thu: number;
  };
  bieu_do_don_hang_theo_ngay: Array<{
    ngay: string;
    nhan: string;
    tong_don_hang: number;
  }>;
  bieu_do_doanh_thu_theo_thang: Array<{
    thang: string;
    nhan: string;
    doanh_thu: number;
  }>;
  top_cua_hang: Array<{
    stt: number;
    id: number;
    ten_cua_hang: string;
    hinh_anh: string | null;
    tong_don_hang: number;
  }>;
  top_mon_an: Array<{
    stt: number;
    id_mon_an: number;
    ten_mon: string;
    hinh_anh: string | null;
    tong_luot_dat: number;
  }>;
  yeu_cau_can_xu_ly: {
    yeu_cau_nang_cap_tai_khoan: number;
    yeu_cau_dang_ky_cua_hang: number;
    tong_so: number;
    duong_dan_xu_ly: string;
  };
  hoat_dong_gan_day: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  loai: 'nguoi_dung' | 'don_hang' | 'khuyen_mai' | 'yeu_cau_nang_cap';
  ten_chu_the: string;
  noi_dung: string;
  thoi_gian: string;
  href: string;
}

export interface ActivityListResponse {
  du_lieu: ActivityItem[];
  tong_so: number;
  trang: number;
  so_luong: number;
  tong_trang: number;
  bo_loc: {
    bo_loc_thoi_gian: DashboardDateFilter;
    tu_ngay: string;
    den_ngay: string;
  };
}

function toSearchParams(params: {
  bo_loc_thoi_gian?: DashboardDateFilter;
  tu_ngay?: string;
  den_ngay?: string;
  trang?: number;
  so_luong?: number;
}) {
  const sp = new URLSearchParams();
  if (params.bo_loc_thoi_gian) sp.set('bo_loc_thoi_gian', params.bo_loc_thoi_gian);
  if (params.tu_ngay) sp.set('tu_ngay', params.tu_ngay);
  if (params.den_ngay) sp.set('den_ngay', params.den_ngay);
  if (params.trang) sp.set('trang', String(params.trang));
  if (params.so_luong) sp.set('so_luong', String(params.so_luong));
  return sp.toString();
}

export const adminDashboardApi = {
  layTongQuan(params: {
    bo_loc_thoi_gian?: DashboardDateFilter;
    tu_ngay?: string;
    den_ngay?: string;
  }) {
    const query = toSearchParams(params);
    return request<DashboardOverviewResponse>(query ? `${BASE}?${query}` : BASE);
  },

  layDanhSachHoatDong(params: {
    bo_loc_thoi_gian?: DashboardDateFilter;
    tu_ngay?: string;
    den_ngay?: string;
    trang?: number;
    so_luong?: number;
  }) {
    const query = toSearchParams(params);
    return request<ActivityListResponse>(`${BASE}/hoat-dong?${query}`);
  },
};
