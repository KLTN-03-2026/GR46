const BASE = '/api/admin/rut-tien';

type ApiEnvelope<T> = { success: boolean; message: string; data: T };

function isApiEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
  return !!value && typeof value === 'object' && 'success' in value && 'data' in value;
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const requestUrl =
    typeof window === 'undefined'
      ? new URL(url, process.env.NEXT_PUBLIC_APP_ORIGIN ?? 'http://127.0.0.1:4000').toString()
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

export type TrangThaiRutTien = 'dang_xu_ly' | 'da_hoan_thanh' | 'da_tu_choi';

export interface WithdrawalItem {
  id: number;
  ma_yeu_cau: string;
  so_tien: number;
  trang_thai: TrangThaiRutTien;
  ly_do_tu_choi: string | null;
  thoi_gian_yeu_cau: string;
  thoi_gian_xu_ly: string | null;
  nguoi_dung: { id: number; ten_hien_thi: string; email: string } | null;
  tai_khoan_ngan_hang: {
    ten_ngan_hang: string;
    so_tai_khoan: string;
    ten_chu_tai_khoan: string;
  } | null;
}

export interface DanhSachWithdrawalResponse {
  du_lieu: WithdrawalItem[];
  tong_so: number;
  trang: number;
  so_luong: number;
  tong_trang: number;
}

export const adminWithdrawalApi = {
  layDanhSach(params: { trang_thai?: string; trang?: number; so_luong?: number }) {
    const sp = new URLSearchParams();
    if (params.trang_thai) sp.set('trang_thai', params.trang_thai);
    if (params.trang) sp.set('trang', String(params.trang));
    if (params.so_luong) sp.set('so_luong', String(params.so_luong));
    return request<DanhSachWithdrawalResponse>(`${BASE}?${sp.toString()}`);
  },

  duyet(id: number) {
    return request<{ message: string }>(`${BASE}/${id}/duyet`, { method: 'PATCH' });
  },

  tuChoi(id: number, lyDo: string) {
    return request<{ message: string }>(`${BASE}/${id}/tu-choi`, {
      method: 'PATCH',
      body: JSON.stringify({ ly_do: lyDo }),
    });
  },
};
