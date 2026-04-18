'use client';

const BASE = '/api/store/menu';

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

// ─── Types ────────────────────────────────────────────────────────────────────

export type ItemStatus = 'dang_ban' | 'het_mon' | 'tam_ngung_ban';
export type MenuSortOption = 'moi_nhat' | 'ban_chay' | 'gia_cao' | 'gia_thap';

export interface ToppingItem {
  id: number;
  ten_topping: string;
  gia: number;
  trang_thai: string;
}

export interface MonAnItem {
  id: number;
  ma_mon: string;
  ten_mon: string;
  mo_ta: string | null;
  hinh_anh_dai_dien: string | null;
  gia_ban: number;
  gia_goc: number | null;
  trang_thai_ban: ItemStatus;
  so_luong_da_ban: number;
  diem_danh_gia: number;
  tong_danh_gia: number;
  la_mon_noi_bat: boolean;
  id_danh_muc: number | null;
  ten_danh_muc: string | null;
  toppings: ToppingItem[];
}

export interface TopMonItem {
  id: number;
  ten_mon: string;
  hinh_anh_dai_dien: string | null;
  gia_ban: number;
  so_luong_da_ban: number;
}

export interface DanhMucItem {
  id: number;
  id_cua_hang: number | null;
  id_danh_muc_cha: number | null;
  ten_danh_muc: string;
  thu_tu_hien_thi: number;
  trang_thai: string;
}

export interface MenuListResponse {
  du_lieu: MonAnItem[];
  top_ban_chay: TopMonItem[];
  het_mon: TopMonItem[];
  tong_so: number;
  trang: number;
  so_luong: number;
  tong_trang: number;
}

export interface DanhMucListResponse {
  du_lieu: DanhMucItem[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function fmt(n: number) {
  return new Intl.NumberFormat('vi-VN').format(n) + 'đ';
}

export function fmtPrice(n: number) {
  return new Intl.NumberFormat('vi-VN').format(n);
}

export function mapDbStatusToUi(status: ItemStatus): string {
  switch (status) {
    case 'dang_ban': return 'Đang bán';
    case 'het_mon': return 'Hết món';
    case 'tam_ngung_ban': return 'Tạm ngưng bán';
    default: return status;
  }
}

export const storeMenuApi = {
  // ═══════════════════════════════════════════════════════════════════════════════
  // MÓN ĂN
  // ═══════════════════════════════════════════════════════════════════════════════

  layDanhSach(params: {
    tim_kiem?: string;
    id_danh_muc?: string;
    trang_thai?: ItemStatus | 'all';
    sap_xep?: MenuSortOption;
    trang?: number;
    so_luong?: number;
  } = {}) {
    const sp = new URLSearchParams();
    if (params.tim_kiem) sp.set('tim_kiem', params.tim_kiem);
    if (params.id_danh_muc) sp.set('id_danh_muc', params.id_danh_muc);
    if (params.trang_thai) sp.set('trang_thai', params.trang_thai);
    if (params.sap_xep) sp.set('sap_xep', params.sap_xep);
    if (params.trang) sp.set('trang', String(params.trang));
    if (params.so_luong) sp.set('so_luong', String(params.so_luong));
    return request<MenuListResponse>(`${BASE}?${sp.toString()}`);
  },

  taoMonAn(data: {
    ten_mon: string;
    mo_ta?: string;
    gia_ban: number;
    gia_goc?: number;
    id_danh_muc?: string;
    hinh_anh_dai_dien?: string;
    trang_thai_ban?: ItemStatus;
    toppings?: { ten_topping: string; gia: number }[];
  }) {
    return request<{ message: string; id: number }>(BASE, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        id_danh_muc: data.id_danh_muc || undefined,
      }),
    });
  },

  capNhatMonAn(id: number, data: {
    ten_mon?: string;
    mo_ta?: string;
    gia_ban?: number;
    gia_goc?: number;
    id_danh_muc?: string;
    hinh_anh_dai_dien?: string;
    trang_thai_ban?: ItemStatus;
    toppings?: { ten_topping: string; gia: number }[];
  }) {
    return request<{ message: string }>(`${BASE}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...data,
        id_danh_muc: data.id_danh_muc || undefined,
      }),
    });
  },

  capNhatTrangThaiBan(id: number, trang_thai_ban: ItemStatus) {
    return request<{ message: string }>(`${BASE}/${id}/trang-thai`, {
      method: 'PATCH',
      body: JSON.stringify({ trang_thai_ban }),
    });
  },

  xoaMonAn(id: number) {
    return request<{ message: string }>(`${BASE}/${id}`, {
      method: 'DELETE',
    });
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // TOPPING
  // ═══════════════════════════════════════════════════════════════════════════════

  themTopping(idMonAn: number, data: { ten_topping: string; gia: number }) {
    return request<{ message: string; id: number }>(`${BASE}/${idMonAn}/topping`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  xoaTopping(idTopping: number) {
    return request<{ message: string }>(`${BASE}/topping/${idTopping}`, {
      method: 'DELETE',
    });
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // DANH MỤC
  // ═══════════════════════════════════════════════════════════════════════════════

  layDanhSachDanhMuc() {
    return request<DanhMucListResponse>(`${BASE}/danh-muc`);
  },

  taoDanhMuc(data: { ten_danh_muc: string; id_danh_muc_cha?: number; thu_tu_hien_thi?: number }) {
    return request<{ message: string; id: number }>(`${BASE}/danh-muc`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  capNhatDanhMuc(id: number, data: {
    ten_danh_muc?: string;
    id_danh_muc_cha?: number;
    thu_tu_hien_thi?: number;
    trang_thai?: string;
  }) {
    return request<{ message: string }>(`${BASE}/danh-muc/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  xoaDanhMuc(id: number) {
    return request<{ message: string }>(`${BASE}/danh-muc/${id}`, {
      method: 'DELETE',
    });
  },
};
