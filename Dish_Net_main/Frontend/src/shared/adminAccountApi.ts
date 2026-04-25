export interface TaiKhoanItem {
  id: number;
  ten_dang_nhap: string;
  ten_hien_thi: string;
  email: string;
  so_dien_thoai: string | null;
  anh_dai_dien: string | null;
  loai_tai_khoan: string;
  trang_thai: string;
  ly_do_khoa: string | null;
  ngay_tao: string;
}

export interface DanhSachTaiKhoanResponse {
  du_lieu: TaiKhoanItem[];
  tong_so: number;
  trang: number;
  so_luong: number;
  tong_trang: number;
}

export interface ChiTietTaiKhoan {
  id: number;
  ten_dang_nhap: string;
  ten_hien_thi: string;
  email: string;
  so_dien_thoai: string | null;
  anh_dai_dien: string | null;
  dia_chi: string | null;
  khu_vuc: string | null;
  gioi_tinh: string | null;
  ngay_sinh: string | null;
  tieu_su: string | null;
  diem_uy_tin: number;
  la_nha_sang_tao: boolean;
  la_chu_cua_hang: boolean;
  la_admin: boolean;
  trang_thai_tai_khoan: string;
  ly_do_khoa_hien_tai: string | null;
  nguon_dang_ky: string;
  thoi_gian_xac_thuc_email: string | null;
  lan_dang_nhap_cuoi: string | null;
  ngay_tao: string;
  ngay_cap_nhat: string;
  loai_tai_khoan: string;
}

const BASE = '/api/admin/tai-khoan';

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

export const adminAccountApi = {
  layDanhSach(params: {
    tim_kiem?: string;
    loai_tai_khoan?: string;
    trang_thai?: string;
    trang?: number;
    so_luong?: number;
  }): Promise<DanhSachTaiKhoanResponse> {
    const sp = new URLSearchParams();
    if (params.tim_kiem) sp.set('tim_kiem', params.tim_kiem);
    if (params.loai_tai_khoan) sp.set('loai_tai_khoan', params.loai_tai_khoan);
    if (params.trang_thai) sp.set('trang_thai', params.trang_thai);
    if (params.trang) sp.set('trang', String(params.trang));
    if (params.so_luong) sp.set('so_luong', String(params.so_luong));
    return request(`${BASE}?${sp.toString()}`);
  },

  layChiTiet(id: number): Promise<ChiTietTaiKhoan> {
    return request(`${BASE}/${id}`);
  },

  khoaTaiKhoan(id: number, lyDo: string): Promise<{ message: string }> {
    return request(`${BASE}/${id}/khoa`, {
      method: 'PATCH',
      body: JSON.stringify({ ly_do: lyDo }),
    });
  },

  moKhoaTaiKhoan(id: number): Promise<{ message: string }> {
    return request(`${BASE}/${id}/mo-khoa`, {
      method: 'PATCH',
    });
  },
};
