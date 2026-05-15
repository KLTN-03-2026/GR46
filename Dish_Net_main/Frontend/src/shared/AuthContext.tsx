'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { authApi } from '@/shared/authApi';

type NguoiDung = {
  id: number;
  email: string;
  ten_hien_thi: string;
  anh_dai_dien: string | null;
  ten_dang_nhap: string;
  vai_tro: string;
  id_cua_hang?: number;
  ten_cua_hang?: string;
  la_nha_sang_tao?: boolean;
  la_chu_cua_hang?: boolean;
  la_admin?: boolean;
  trang_thai_kiem_tien_noi_dung?: string;
};

type AuthContextType = {
  nguoiDung: NguoiDung | null;
  dangTai: boolean;
  dangNhap: boolean;
  capNhatNguoiDung: (user: NguoiDung) => void;
  dangXuat: () => Promise<void>;
  kiemTraPhien: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  nguoiDung: null,
  dangTai: true,
  dangNhap: false,
  capNhatNguoiDung: () => { },
  dangXuat: async () => { },
  kiemTraPhien: async () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [nguoiDung, setNguoiDung] = useState<NguoiDung | null>(null);
  const [dangTai, setDangTai] = useState(true);

  const kiemTraPhien = useCallback(async () => {
    try {
      const data = await authApi.layThongTin();
      setNguoiDung({
        id: data.id,
        email: data.email,
        ten_hien_thi: data.ten_hien_thi,
        anh_dai_dien: data.anh_dai_dien,
        ten_dang_nhap: data.ten_dang_nhap,
        vai_tro: data.la_admin ? 'admin' : data.la_chu_cua_hang ? 'chu_cua_hang' : 'nguoi_dung',
        la_nha_sang_tao: Boolean(data.la_nha_sang_tao),
        la_chu_cua_hang: Boolean(data.la_chu_cua_hang),
        la_admin: Boolean(data.la_admin),
        trang_thai_kiem_tien_noi_dung: data.trang_thai_kiem_tien_noi_dung ?? undefined,
      });
    } catch {
      setNguoiDung(null);
    } finally {
      setDangTai(false);
    }
  }, []);

  useEffect(() => {
    kiemTraPhien();
  }, [kiemTraPhien]);

  const capNhatNguoiDung = useCallback((user: NguoiDung) => {
    setNguoiDung(user);
  }, []);

  const dangXuat = useCallback(async () => {
    try {
      await authApi.dangXuat();
    } catch { }
    setNguoiDung(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        nguoiDung,
        dangTai,
        dangNhap: !!nguoiDung,
        capNhatNguoiDung,
        dangXuat,
        kiemTraPhien,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
