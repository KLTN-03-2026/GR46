const BASE = '/api/admin/yeu-cau-ho-tro';

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

export type LoaiTaiKhoan = 'nguoi_dung' | 'nha_sang_tao' | 'chu_cua_hang';
export type TrangThaiHoTro = 'chua_phan_hoi' | 'da_phan_hoi';

export interface AdminSupportItem {
  id: number;
  ma_yeu_cau: string;
  nguoi_gui: string;
  loai_tai_khoan: LoaiTaiKhoan;
  chu_de: string;
  trang_thai: TrangThaiHoTro;
  thoi_gian_gui: string;
}

export interface DanhSachSupportResponse {
  du_lieu: AdminSupportItem[];
  tong_so: number;
  trang: number;
  so_luong: number;
  tong_trang: number;
}

export interface ChiTietSupportResponse {
  id: number;
  ma_yeu_cau: string;
  thong_tin_nguoi_gui: {
    id: number;
    ten_nguoi_dung: string;
    email: string;
    so_dien_thoai: string | null;
    loai_tai_khoan: LoaiTaiKhoan;
  };
  thong_tin_yeu_cau: {
    chu_de: string;
    noi_dung_yeu_cau: string;
    trang_thai: TrangThaiHoTro;
    thoi_gian_gui: string;
  };
  thong_tin_phan_hoi: {
    noi_dung_phan_hoi: string | null;
    thoi_gian_phan_hoi: string | null;
    admin_phan_hoi: string;
  } | null;
  tep_dinh_kem: Array<{
    id: number;
    loai_tep: string;
    url: string;
    ghi_chu: string | null;
  }>;
}

export const adminSupportApi = {
  layDanhSach(params: {
    tim_kiem?: string;
    loai_tai_khoan?: string;
    trang_thai?: string;
    trang?: number;
    so_luong?: number;
  }) {
    const sp = new URLSearchParams();
    if (params.tim_kiem) sp.set('tim_kiem', params.tim_kiem);
    if (params.loai_tai_khoan) sp.set('loai_tai_khoan', params.loai_tai_khoan);
    if (params.trang_thai) sp.set('trang_thai', params.trang_thai);
    if (params.trang) sp.set('trang', String(params.trang));
    if (params.so_luong) sp.set('so_luong', String(params.so_luong));

    return request<DanhSachSupportResponse>(`${BASE}?${sp.toString()}`);
  },

  layChiTiet(id: number) {
    return request<ChiTietSupportResponse>(`${BASE}/${id}`);
  },

  phanHoi(id: number, noiDungPhanHoi: string) {
    return request<{ message: string }>(`${BASE}/${id}/phan-hoi`, {
      method: 'PATCH',
      body: JSON.stringify({ noi_dung_phan_hoi: noiDungPhanHoi }),
    });
  },
};
