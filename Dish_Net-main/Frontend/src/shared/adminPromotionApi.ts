const BASE = '/api/admin/khuyen-mai';

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

export type KhuyenMaiTrangThai = 'dang_dien_ra' | 'sap_dien_ra' | 'da_ket_thuc' | 'tam_dung';
export type KhuyenMaiLoai = 'phan_tram' | 'so_tien' | 'mien_phi_van_chuyen';

export interface KhuyenMaiItem {
  id: number;
  ten_khuyen_mai: string;
  ma_khuyen_mai: string;
  loai_khuyen_mai: KhuyenMaiLoai;
  gia_tri_khuyen_mai: number;
  dieu_kien_ap_dung: string;
  don_hang_toi_thieu: number;
  so_luot_da_dung: number;
  so_luot_toi_da: number | null;
  thoi_gian_bat_dau: string;
  thoi_gian_ket_thuc: string;
  trang_thai: KhuyenMaiTrangThai;
  ngay_tao: string;
  mo_ta: string | null;
}

export interface DanhSachKhuyenMaiResponse {
  du_lieu: KhuyenMaiItem[];
  tong_so: number;
  trang: number;
  so_luong: number;
  tong_trang: number;
}

export interface KhuyenMaiPayload {
  ten_khuyen_mai: string;
  ma_khuyen_mai: string;
  loai_khuyen_mai: KhuyenMaiLoai;
  gia_tri_khuyen_mai: number;
  don_hang_toi_thieu: number;
  thoi_gian_bat_dau: string;
  thoi_gian_ket_thuc: string;
  mo_ta?: string;
}

export const adminPromotionApi = {
  layDanhSach(params: {
    tim_kiem?: string;
    trang_thai?: KhuyenMaiTrangThai;
    loai_khuyen_mai?: KhuyenMaiLoai;
    sap_xep?: 'moi_nhat' | 'sap_het_han' | 'hieu_qua_cao_nhat' | 'giam_gia_cao_nhat';
    trang?: number;
    so_luong?: number;
  }) {
    const sp = new URLSearchParams();
    if (params.tim_kiem) sp.set('tim_kiem', params.tim_kiem);
    if (params.trang_thai) sp.set('trang_thai', params.trang_thai);
    if (params.loai_khuyen_mai) sp.set('loai_khuyen_mai', params.loai_khuyen_mai);
    if (params.sap_xep) sp.set('sap_xep', params.sap_xep);
    if (params.trang) sp.set('trang', String(params.trang));
    if (params.so_luong) sp.set('so_luong', String(params.so_luong));
    return request<DanhSachKhuyenMaiResponse>(`${BASE}?${sp.toString()}`);
  },

  tao(payload: KhuyenMaiPayload) {
    return request<{ message: string; id: number }>(BASE, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  capNhat(id: number, payload: KhuyenMaiPayload) {
    return request<{ message: string }>(`${BASE}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  tamDung(id: number) {
    return request<{ message: string }>(`${BASE}/${id}/tam-dung`, {
      method: 'PATCH',
    });
  },

  xoa(id: number) {
    return request<{ message: string }>(`${BASE}/${id}`, {
      method: 'DELETE',
    });
  },
};
