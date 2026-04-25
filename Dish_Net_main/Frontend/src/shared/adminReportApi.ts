const BASE = '/api/admin/bao-cao';

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

export type BaoCaoTrangThai = 'cho_xu_ly' | 'da_xu_ly';

export interface BaoCaoItem {
  id: number;
  ma_bao_cao: string;
  nguoi_bao_cao: string;
  noi_dung_bao_cao: string;
  noi_dung_bi_bao_cao: string;
  thoi_gian_bao_cao: string;
  trang_thai: BaoCaoTrangThai;
}

export interface DanhSachBaoCaoResponse {
  du_lieu: BaoCaoItem[];
  tong_so: number;
  trang: number;
  so_luong: number;
  tong_trang: number;
}

export interface ChiTietBaoCaoResponse {
  id: number;
  ma_bao_cao: string;
  thong_tin_nguoi_bao_cao: {
    id: number;
    ten_nguoi_dung: string;
    email: string;
    so_dien_thoai: string | null;
  };
  thong_tin_bao_cao: {
    loai_vi_pham: string;
    noi_dung_bao_cao: string;
    thoi_gian_bao_cao: string;
    trang_thai: BaoCaoTrangThai;
  };
  noi_dung_bi_bao_cao: {
    loai_doi_tuong: string;
    tieu_de: string;
    tac_gia: string;
    mo_ta: string;
    url: string | null;
  };
  bang_chung: {
    noi_dung_text: string | null;
    tep_dinh_kem: Array<{
      id: number;
      loai_tep: string;
      url: string;
      ghi_chu: string | null;
    }>;
  };
  ket_qua_xu_ly: {
    ket_qua_xu_ly: string | null;
    muc_do_vi_pham: string | null;
    hanh_dong_ap_dung: string[];
    gui_canh_bao: boolean;
    admin_xu_ly: string | null;
    thoi_gian_xu_ly: string | null;
  };
  lich_su_xu_ly: Array<{
    id: number;
    thoi_gian: string;
    nguoi_thuc_hien: string;
    hanh_dong: string;
    noi_dung: string | null;
  }>;
}

export const adminReportApi = {
  layDanhSach(params: {
    tim_kiem?: string;
    trang_thai?: string;
    trang?: number;
    so_luong?: number;
  }) {
    const sp = new URLSearchParams();
    if (params.tim_kiem) sp.set('tim_kiem', params.tim_kiem);
    if (params.trang_thai) sp.set('trang_thai', params.trang_thai);
    if (params.trang) sp.set('trang', String(params.trang));
    if (params.so_luong) sp.set('so_luong', String(params.so_luong));

    return request<DanhSachBaoCaoResponse>(`${BASE}?${sp.toString()}`);
  },

  layChiTiet(id: number) {
    return request<ChiTietBaoCaoResponse>(`${BASE}/${id}`);
  },

  xuLy(id: number, payload: {
    ket_qua_xu_ly: string;
    muc_do_vi_pham: string;
    hanh_dong_ap_dung: string[];
    gui_canh_bao: boolean;
  }) {
    return request<{ message: string }>(`${BASE}/${id}/xu-ly`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
};
