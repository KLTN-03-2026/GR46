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

  const isFormData = typeof FormData !== 'undefined' && options?.body instanceof FormData;
  const res = await fetch(requestUrl, {
    ...options,
    cache: typeof window === 'undefined' ? 'no-store' : options?.cache,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options?.headers ?? {}),
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

function toQueryString(input?: Record<string, unknown>) {
  if (!input) return '';
  const params = new URLSearchParams();
  Object.entries(input).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    params.set(key, String(value));
  });
  const query = params.toString();
  return query ? `?${query}` : '';
}

export const userContentApi = {
  timKiem: (query: {
    tu_khoa: string;
    loai?: 'tat_ca' | 'mon_an' | 'cua_hang' | 'bai_viet' | 'nguoi_dung';
    khu_vuc?: string;
    dia_diem?: string;
    bo_loc_khu_vuc?: 'gan_ban' | 'quan_huyen' | 'dia_diem';
    vi_do?: number;
    kinh_do?: number;
    ban_kinh_km?: number;
    do_pho_bien?: 'dang_hot' | 'nhieu_luot_mua' | 'duoc_review_nhieu';
    trang?: number;
    so_luong?: number;
  }) => request(`/user/tim-kiem${toQueryString(query)}`),

  layDanhGiaMonAn: (idMonAn: number, query?: { trang?: number; so_luong?: number }) =>
    request(`/user/mon-an/${idMonAn}/danh-gia${toQueryString(query)}`),

  layChiTietDanhGia: (idDanhGia: number) => request(`/user/danh-gia/${idDanhGia}`),

  toggleLuuDanhGia: (idDanhGia: number) =>
    request(`/user/danh-gia/${idDanhGia}/luu`, { method: 'POST' }),

  layDanhGiaDaLuu: (query?: { trang?: number; so_luong?: number }) =>
    request(`/user/danh-gia-da-luu${toQueryString(query)}`),

  layBangTin: (query?: { trang?: number; so_luong?: number }) =>
    request(`/user/bang-tin${toQueryString(query)}`),

  layChiTietBaiViet: (idBaiViet: number) => request(`/user/bai-viet/${idBaiViet}`),

  layBinhLuanBaiViet: (idBaiViet: number, query?: { trang?: number; so_luong?: number }) =>
    request(`/user/bai-viet/${idBaiViet}/binh-luan${toQueryString(query)}`),

  taoBinhLuan: (idBaiViet: number, body: { noi_dung: string; id_binh_luan_cha?: number }) =>
    request(`/user/bai-viet/${idBaiViet}/binh-luan`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  toggleThichBaiViet: (idBaiViet: number) =>
    request(`/user/bai-viet/${idBaiViet}/tuong-tac/thich`, { method: 'POST' }),

  toggleLuuBaiViet: (idBaiViet: number) =>
    request(`/user/bai-viet/${idBaiViet}/tuong-tac/luu`, { method: 'POST' }),

  chiaSeBaiViet: (idBaiViet: number) =>
    request(`/user/bai-viet/${idBaiViet}/tuong-tac/chia-se`, { method: 'POST' }),

  baoCaoBaiViet: (
    idBaiViet: number,
    body: { loai_vi_pham: string; noi_dung_bao_cao: string; bang_chung_text?: string },
  ) =>
    request(`/user/bai-viet/${idBaiViet}/bao-cao`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  layThongTinTrangCaNhan: (idNguoiDung: number) => request(`/user/trang-ca-nhan/${idNguoiDung}`),

  layNoiDungTrangCaNhan: (
    idNguoiDung: number,
    query?: { tab?: 'bai_viet' | 'video' | 'bai_dang_lai'; trang?: number; so_luong?: number },
  ) => request(`/user/trang-ca-nhan/${idNguoiDung}/noi-dung${toQueryString(query)}`),

  layThongTinChinhSuaTrangCaNhan: () => request('/user/trang-ca-nhan/me/chinh-sua'),

  chinhSuaTrangCaNhan: (body: {
    ten_dang_nhap?: string;
    ten_hien_thi?: string;
    anh_dai_dien?: string;
    gioi_tinh?: 'nam' | 'nu' | 'khac';
    ngay_sinh?: string;
    tieu_su?: string;
    so_dien_thoai?: string;
    dia_chi?: string;
    cho_hien_thi_huy_hieu?: boolean;
    cho_hien_thi_diem_uy_tin?: boolean;
    la_tai_khoan_rieng_tu?: boolean;
  }) =>
    request('/user/trang-ca-nhan/me/chinh-sua', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  uploadAnhDaiDien: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return request<{ url: string }>('/user/trang-ca-nhan/me/upload-anh-dai-dien', {
      method: 'POST',
      body: formData,
    });
  },

  layBangXepHangMini: (query?: { so_luong?: number }) =>
    request(`/user/bang-xep-hang/mini${toQueryString(query)}`),

  layBangXepHangChiTiet: (query?: {
    tab?: 'cua_hang' | 'reviewer' | 'mon_an';
    tu_khoa?: string;
    khu_vuc?: string;
    so_don_hang_tu?: number;
    diem_danh_gia_tu?: number;
    trang_thai?: 'hoat_dong' | 'tam_dung' | 'cho_duyet';
    ty_le_huy_toi_da?: number;
    trang?: number;
    so_luong?: number;
  }) => request(`/user/bang-xep-hang${toQueryString(query)}`),

  layTrangThaiTuongTacNguoiDung: (idNguoiDung: number) =>
    request(`/user/nguoi-dung/${idNguoiDung}/tuong-tac`),

  toggleTheoDoiNguoiDung: (idNguoiDung: number) =>
    request(`/user/nguoi-dung/${idNguoiDung}/theo-doi`, { method: 'POST' }),

  toggleChanNguoiDung: (idNguoiDung: number) =>
    request(`/user/nguoi-dung/${idNguoiDung}/chan`, { method: 'POST' }),

  baoCaoNguoiDung: (
    idNguoiDung: number,
    body: { loai_vi_pham: string; noi_dung_bao_cao: string; bang_chung_text?: string },
  ) =>
    request(`/user/nguoi-dung/${idNguoiDung}/bao-cao`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  batDauTroChuyen: (idNguoiDung: number) =>
    request(`/user/nguoi-dung/${idNguoiDung}/bat-dau-tro-chuyen`, { method: 'POST' }),

  layTrangKhamPha: (query?: {
    dia_chi_giao?: string;
    khu_vuc?: string;
    vi_do?: number;
    kinh_do?: number;
    ban_kinh_km?: number;
  }) => request(`/user/kham-pha${toQueryString(query)}`),

  layMonTheoDanhMuc: (
    idDanhMuc: number,
    query?: { khu_vuc?: string; trang?: number; so_luong?: number },
  ) => request(`/user/kham-pha/danh-muc/${idDanhMuc}${toQueryString(query)}`),
};

export type UserContentApi = typeof userContentApi;
