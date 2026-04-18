const BASE = '/api/admin/yeu-cau-he-thong';

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

export type YeuCauTrangThai = 'cho_duyet' | 'da_duyet' | 'da_tu_choi';
export type YeuCauLoai = 'mo_cua_hang' | 'kiem_tien_noi_dung';

export interface YeuCauItem {
  stt: number;
  id: number;
  ten_nguoi_dung: string;
  email: string;
  loai_yeu_cau: YeuCauLoai;
  trang_thai: YeuCauTrangThai;
  thoi_gian_gui: string;
}

export interface DanhSachYeuCauResponse {
  du_lieu: YeuCauItem[];
  tong_so: number;
  trang: number;
  so_luong: number;
  tong_trang: number;
}

export interface VideoNoiBat {
  tieu_de: string;
  ngay_dang: string;
  luot_xem: string | null;
  url: string;
}

export interface TepMinhChung {
  id: number;
  loai_tep: string;
  url: string;
  ghi_chu: string | null;
  ngay_tao: string;
}

export interface ChiTietYeuCauResponse {
  id: number;
  ma_yeu_cau: string;
  thong_tin_nguoi_dung: {
    id: number;
    ten_nguoi_dung: string;
    so_dien_thoai: string | null;
    email: string;
    ngay_tham_gia: string;
    loai_tai_khoan_hien_tai: string;
  };
  thong_tin_yeu_cau: {
    loai_yeu_cau: YeuCauLoai;
    ngay_gui_yeu_cau: string;
    trang_thai: YeuCauTrangThai;
    ly_do_tu_choi: string | null;
  };
  thong_tin_dang_ky_cua_hang: {
    ten_cua_hang: string | null;
    dia_chi_cua_hang: string | null;
    so_dien_thoai_lien_he: string | null;
    mo_ta_cua_hang: string | null;
  } | null;
  thong_tin_kiem_tien_noi_dung: {
    ten_kenh: string | null;
    mo_ta_noi_dung_kenh: string | null;
    so_bai_dang: number | null;
    so_nguoi_theo_doi: number | null;
    video_noi_bat: VideoNoiBat[];
  } | null;
  tep_minh_chung: TepMinhChung[];
  lich_su_kiem_duyet: Array<{
    id: number;
    hanh_dong: string;
    thuc_hien_boi: string;
    ghi_chu: string | null;
    thoi_gian_tao: string;
  }>;
}

export const adminReviewApi = {
  layDanhSach(params: {
    tim_kiem?: string;
    loai_yeu_cau?: string;
    trang_thai?: string;
    moc_thoi_gian?: string;
    tu_ngay?: string;
    den_ngay?: string;
    trang?: number;
    so_luong?: number;
  }) {
    const sp = new URLSearchParams();
    if (params.tim_kiem) sp.set('tim_kiem', params.tim_kiem);
    if (params.loai_yeu_cau) sp.set('loai_yeu_cau', params.loai_yeu_cau);
    if (params.trang_thai) sp.set('trang_thai', params.trang_thai);
    if (params.moc_thoi_gian) sp.set('moc_thoi_gian', params.moc_thoi_gian);
    if (params.tu_ngay) sp.set('tu_ngay', params.tu_ngay);
    if (params.den_ngay) sp.set('den_ngay', params.den_ngay);
    if (params.trang) sp.set('trang', String(params.trang));
    if (params.so_luong) sp.set('so_luong', String(params.so_luong));

    return request<DanhSachYeuCauResponse>(`${BASE}?${sp.toString()}`);
  },

  layChiTiet(id: number) {
    return request<ChiTietYeuCauResponse>(`${BASE}/${id}`);
  },

  pheDuyet(id: number, ghiChu?: string) {
    return request<{ message: string }>(`${BASE}/${id}/phe-duyet`, {
      method: 'PATCH',
      body: JSON.stringify({ ghi_chu: ghiChu }),
    });
  },

  tuChoi(id: number, lyDo: string) {
    return request<{ message: string }>(`${BASE}/${id}/tu-choi`, {
      method: 'PATCH',
      body: JSON.stringify({ ly_do: lyDo }),
    });
  },
};
