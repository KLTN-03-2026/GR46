const API_BASE = '/api';

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

type ThongTinNguoiDung = {
  id: number;
  email: string;
  ten_hien_thi: string;
  anh_dai_dien: string | null;
  ten_dang_nhap: string;
  la_admin: boolean;
  la_chu_cua_hang: boolean;
};

function isApiEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
  return !!value && typeof value === 'object' && 'success' in value && 'message' in value && 'data' in value;
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include',
  });

  const body = await res.json().catch(() => null);
  const payload = isApiEnvelope<T>(body) ? body.data : body;

  if (!res.ok) {
    const message = isApiEnvelope(body) ? body.message : body?.message;
    throw new Error(message || 'Co loi xay ra');
  }

  return payload as T;
}

export const authApi = {
  dangKy: (body: {
    email: string;
    so_dien_thoai?: string;
    ten_hien_thi: string;
    khu_vuc?: string;
    dia_chi?: string;
    mat_khau: string;
    xac_nhan_mat_khau: string;
  }) => request<{ message: string; email: string; ten_dang_nhap: string }>('/auth/dang-ky', {
    method: 'POST',
    body: JSON.stringify(body),
  }),

  xacNhanDangKy: (body: { email: string; ma_otp: string }) =>
    request<{ message: string }>('/auth/xac-nhan-dang-ky', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  dangNhap: (body: { tai_khoan: string; mat_khau: string; luu_dang_nhap?: boolean }) =>
    request<{
      access_token?: string;
      vai_tro?: string;
      expires_in?: string;
      nguoi_dung?: {
        id: number;
        email: string;
        ten_hien_thi: string;
        anh_dai_dien: string | null;
        ten_dang_nhap: string;
      };
      can_chon_vai_tro?: boolean;
      danh_sach_vai_tro?: string[];
      email?: string;
      message?: string;
    }>('/auth/dang-nhap', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  chonVaiTro: (body: { email: string; vai_tro: string }) =>
    request<{
      access_token: string;
      vai_tro: string;
      nguoi_dung: {
        id: number;
        email: string;
        ten_hien_thi: string;
        anh_dai_dien: string | null;
        ten_dang_nhap: string;
      };
    }>('/auth/chon-vai-tro', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  quenMatKhau: (body: { email: string }) =>
    request<{ message: string }>('/auth/quen-mat-khau', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  xacNhanQuenMatKhau: (body: { email: string; ma_otp: string }) =>
    request<{ message: string }>('/auth/xac-nhan-quen-mat-khau', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  datLaiMatKhau: (body: {
    email: string;
    ma_otp: string;
    mat_khau_moi: string;
    xac_nhan_mat_khau: string;
  }) =>
    request<{ message: string }>('/auth/dat-lai-mat-khau', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  guiLaiOtp: (body: { email: string; loai_xac_thuc: string }) =>
    request<{ message: string }>('/auth/gui-lai-otp', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  dangXuat: () =>
    request<{ message: string }>('/auth/dang-xuat', { method: 'POST' }),

  layThongTin: () =>
    request<ThongTinNguoiDung>('/auth/toi', { method: 'GET' }),
};
