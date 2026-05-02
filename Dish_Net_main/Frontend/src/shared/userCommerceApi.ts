const API_BASE = '/api';

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

function isApiEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
  return (
    !!value &&
    typeof value === 'object' &&
    'success' in value &&
    'message' in value &&
    'data' in value
  );
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const path = `${API_BASE}${url}`;
  const requestUrl =
    typeof window === 'undefined'
      ? new URL(
          path,
          process.env.NEXT_PUBLIC_APP_ORIGIN ?? 'http://127.0.0.1:4000',
        ).toString()
      : path;

  const res = await fetch(requestUrl, {
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
    throw new Error(
      Array.isArray(message) ? message.join(', ') : message || 'Có lỗi xảy ra',
    );
  }

  return payload as T;
}

export type UserOrderTab = 'placed' | 'purchased' | 'cancelled' | 'returned' | 'review';

export const userCommerceApi = {
  taoHoTro: (body: {
    chu_de: string;
    noi_dung: string;
    thong_tin_lien_he: string;
    tep_dinh_kem?: string[];
  }) =>
    request('/user/ho-tro', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  layDanhSachHoTro: (query?: {
    tim_kiem?: string;
    trang_thai?: 'dang_xu_ly' | 'da_giai_quyet';
    trang?: number;
    so_luong?: number;
  }) => {
    const params = new URLSearchParams();
    if (query?.tim_kiem) params.set('tim_kiem', query.tim_kiem);
    if (query?.trang_thai) params.set('trang_thai', query.trang_thai);
    if (query?.trang) params.set('trang', String(query.trang));
    if (query?.so_luong) params.set('so_luong', String(query.so_luong));
    const suffix = params.toString() ? `?${params.toString()}` : '';
    return request(`/user/ho-tro${suffix}`);
  },

  layChiTietHoTro: (id: number | string) => request(`/user/ho-tro/${id}`),

  layThongBao: (query?: {
    chi_chua_doc?: boolean;
    trang?: number;
    so_luong?: number;
  }) => {
    const params = new URLSearchParams();
    if (typeof query?.chi_chua_doc === 'boolean') {
      params.set('chi_chua_doc', query.chi_chua_doc ? '1' : '0');
    }
    if (query?.trang) params.set('trang', String(query.trang));
    if (query?.so_luong) params.set('so_luong', String(query.so_luong));
    const suffix = params.toString() ? `?${params.toString()}` : '';
    return request(`/user/thong-bao${suffix}`);
  },

  layYeuCauChuyenNghiep: () => request('/user/che-do-chuyen-nghiep/yeu-cau'),

  dangKyKiemTienNoiDung: (body: {
    ten_tai_khoan: string;
    gioi_tinh?: string;
    ngay_sinh: string;
    ngan_hang: string;
    so_tai_khoan_ngan_hang: string;
    email: string;
    so_dien_thoai: string;
    dia_chi: string;
    mo_ta?: string;
  }) =>
    request('/user/che-do-chuyen-nghiep/kiem-tien-noi-dung', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  dangKyMoCuaHang: (body: {
    chu_so_huu: string;
    so_cccd: string;
    so_dien_thoai: string;
    dia_chi: string;
    ten_cua_hang: string;
    so_dien_thoai_lien_he: string;
    danh_muc_kinh_doanh: string;
    gio_mo_cua: string;
    gio_dong_cua: string;
    dia_chi_kinh_doanh: string;
    dong_y_dieu_khoan: boolean;
    anh_cccd: string[];
    anh_menu: string[];
    minh_chung_thanh_toan: string[];
  }) =>
    request('/user/che-do-chuyen-nghiep/mo-cua-hang', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  uploadTepMoCuaHang: async (
    file: File,
    loai: 'cccd' | 'menu' | 'payment',
  ) => {
    const path = `${API_BASE}/user/che-do-chuyen-nghiep/mo-cua-hang/upload?loai=${encodeURIComponent(loai)}`;
    const requestUrl =
      typeof window === 'undefined'
        ? new URL(
            path,
            process.env.NEXT_PUBLIC_APP_ORIGIN ?? 'http://127.0.0.1:4000',
          ).toString()
        : path;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(requestUrl, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const body = await res.json().catch(() => null);
    const payload = isApiEnvelope<{ url: string }>(body) ? body.data : body;

    if (!res.ok || !payload?.url) {
      const message = isApiEnvelope(body) ? body.message : body?.message;
      throw new Error(
        Array.isArray(message) ? message.join(', ') : message || 'Có lỗi xảy ra',
      );
    }

    return payload as { url: string };
  },

  layGioHang: () => request('/user/gio-hang'),

  themVaoGioHang: (body: {
    id_mon_an: number;
    so_luong?: number;
    ghi_chu?: string;
  }) =>
    request('/user/gio-hang/items', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  capNhatGioHang: (
    idItem: number,
    body: { so_luong?: number; ghi_chu?: string; duoc_chon?: boolean },
  ) =>
    request(`/user/gio-hang/items/${idItem}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  xoaItemGioHang: (idItem: number) =>
    request(`/user/gio-hang/items/${idItem}`, { method: 'DELETE' }),

  xoaTatCaGioHang: () => request('/user/gio-hang', { method: 'DELETE' }),

  xemTruocThanhToan: (ma_khuyen_mai?: string) => {
    const suffix = ma_khuyen_mai
      ? `?ma_khuyen_mai=${encodeURIComponent(ma_khuyen_mai)}`
      : '';
    return request(`/user/thanh-toan/preview${suffix}`);
  },

  layKhuyenMaiThanhToan: () => request('/user/thanh-toan/khuyen-mai'),

  datDonHang: (body: {
    nguoi_nhan: string;
    so_dien_thoai_nhan: string;
    dia_chi_giao: string;
    ghi_chu_tai_xe?: string;
    phuong_thuc_thanh_toan: 'vnpay';
    ma_khuyen_mai?: string;
  }) =>
    request('/user/thanh-toan/dat-don', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  xuLyCallbackVnpay: (queryString: string) =>
    request(`/user/thanh-toan/vnpay/callback?${queryString}`),

  layDanhSachDonHang: (query: {
    tab: UserOrderTab;
    tim_kiem?: string;
    trang?: number;
    so_luong?: number;
  }) => {
    const params = new URLSearchParams();
    params.set('tab', query.tab);
    if (query.tim_kiem) params.set('tim_kiem', query.tim_kiem);
    if (query.trang) params.set('trang', String(query.trang));
    if (query.so_luong) params.set('so_luong', String(query.so_luong));
    return request(`/user/don-hang?${params.toString()}`);
  },

  layChiTietDonHang: (maDonHang: string) =>
    request(`/user/don-hang/${encodeURIComponent(maDonHang)}`),

  huyDonHang: (maDonHang: string, ly_do: string) =>
    request(`/user/don-hang/${encodeURIComponent(maDonHang)}/huy`, {
      method: 'POST',
      body: JSON.stringify({ ly_do }),
    }),

  yeuCauHoanTien: (
    maDonHang: string,
    body: { ly_do: string; thong_tin_tai_khoan_hoan_tien: string },
  ) =>
    request(`/user/don-hang/${encodeURIComponent(maDonHang)}/hoan-tien`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  muaLaiDonHang: (maDonHang: string) =>
    request(`/user/don-hang/${encodeURIComponent(maDonHang)}/mua-lai`, {
      method: 'POST',
    }),

  danhGiaDonHang: (
    maDonHang: string,
    body: {
      so_sao: number;
      noi_dung: string;
      tep_dinh_kem?: string[];
      an_danh?: boolean;
    },
  ) =>
    request(`/user/don-hang/${encodeURIComponent(maDonHang)}/danh-gia`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  batDauTroChuyen: (idNguoiDung: number) =>
    request(`/user/nguoi-dung/${idNguoiDung}/bat-dau-tro-chuyen`, {
      method: 'POST',
    }),

  layDanhSachTroChuyen: (query?: {
    tim_kiem?: string;
    trang?: number;
    so_luong?: number;
  }) => {
    const params = new URLSearchParams();
    if (query?.tim_kiem) params.set('tim_kiem', query.tim_kiem);
    if (query?.trang) params.set('trang', String(query.trang));
    if (query?.so_luong) params.set('so_luong', String(query.so_luong));
    const suffix = params.toString() ? `?${params.toString()}` : '';
    return request(`/user/tro-chuyen${suffix}`);
  },

  layTinNhan: (
    idCuocTroChuyen: number,
    query?: { trang?: number; so_luong?: number },
  ) => {
    const params = new URLSearchParams();
    if (query?.trang) params.set('trang', String(query.trang));
    if (query?.so_luong) params.set('so_luong', String(query.so_luong));
    const suffix = params.toString() ? `?${params.toString()}` : '';
    return request(`/user/tro-chuyen/${idCuocTroChuyen}/tin-nhan${suffix}`);
  },

  guiTinNhan: (idCuocTroChuyen: number, noi_dung: string) =>
    request(`/user/tro-chuyen/${idCuocTroChuyen}/tin-nhan`, {
      method: 'POST',
      body: JSON.stringify({ noi_dung }),
    }),
};
