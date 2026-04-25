'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { userContentApi } from '@/shared/userContentApi';

type SearchData = {
  thong_bao?: string;
  phan_trang?: { trang?: number; so_luong?: number };
  ket_qua: {
    mon_an: { du_lieu: any[]; tong_so: number };
    cua_hang: { du_lieu: any[]; tong_so: number };
    bai_viet: { du_lieu: any[]; tong_so: number };
    nguoi_dung: { du_lieu: any[]; tong_so: number };
  };
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`relative inline-flex h-5 w-9 rounded-full transition ${checked ? 'bg-[#5ca24d]' : 'bg-[#9aa09a]'}`}
    >
      <span
        className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition ${checked ? 'left-[18px]' : 'left-[2px]'}`}
      />
    </button>
  );
}

function formatPrice(v?: number) {
  if (!v && v !== 0) return '---';
  return `${v.toLocaleString('vi-VN')}đ`;
}

export default function SearchResultsClient({ query }: { query: string }) {
  const [filters, setFilters] = useState({
    food: true,
    store: true,
    review: true,
    user: true,
    nearby: false,
    hot: false,
    bestSelling: false,
    mostReviewed: false,
  });
  const [districtMode, setDistrictMode] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<SearchData | null>(null);

  const loai = useMemo(() => {
    if (filters.food && !filters.store && !filters.review && !filters.user) return 'mon_an';
    if (!filters.food && filters.store && !filters.review && !filters.user) return 'cua_hang';
    if (!filters.food && !filters.store && filters.review && !filters.user) return 'bai_viet';
    if (!filters.food && !filters.store && !filters.review && filters.user) return 'nguoi_dung';
    return 'tat_ca';
  }, [filters.food, filters.store, filters.review, filters.user]);

  const doPhoBien = useMemo(() => {
    if (filters.mostReviewed) return 'duoc_review_nhieu';
    if (filters.bestSelling) return 'nhieu_luot_mua';
    if (filters.hot) return 'dang_hot';
    return undefined;
  }, [filters.bestSelling, filters.hot, filters.mostReviewed]);

  const boLocKhuVuc = useMemo(() => {
    if (filters.nearby) return 'gan_ban';
    if (locationInput) return districtMode ? 'quan_huyen' : 'dia_diem';
    return undefined;
  }, [districtMode, filters.nearby, locationInput]);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const payload = (await userContentApi.timKiem({
          tu_khoa: query,
          loai: loai as any,
          dia_diem: locationInput || undefined,
          khu_vuc: locationInput || undefined,
          bo_loc_khu_vuc: boLocKhuVuc as any,
          do_pho_bien: doPhoBien as any,
          trang: page,
          so_luong: 12,
        })) as SearchData;
        if (!mounted) return;
        setData(payload);
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : 'Không tải được kết quả tìm kiếm');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void run();
    return () => {
      mounted = false;
    };
  }, [query, loai, locationInput, boLocKhuVuc, doPhoBien, page]);

  const monAn = data?.ket_qua.mon_an.du_lieu ?? [];
  const cuaHang = data?.ket_qua.cua_hang.du_lieu ?? [];
  const baiViet = data?.ket_qua.bai_viet.du_lieu ?? [];
  const nguoiDung = data?.ket_qua.nguoi_dung.du_lieu ?? [];

  return (
    <div className="bg-[#fafaf9]">
      <section className="grid w-full gap-10 px-4 pb-8 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-0">
        <aside className="bg-white pb-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          <div className="px-8 py-6">
            <h1 className="text-[32px] font-bold text-[#2c312b]">Kết quả tìm kiếm</h1>
          </div>

          <div className="space-y-8 px-6 py-6">
            <div>
              <h2 className="mb-4 text-[18px] font-bold text-[#679d55]">Tất cả</h2>
              <div className="space-y-4 px-2">
                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]"><span>Món ăn</span><Toggle checked={filters.food} onChange={() => setFilters((c) => ({ ...c, food: !c.food }))} /></div>
                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]"><span>Cửa hàng</span><Toggle checked={filters.store} onChange={() => setFilters((c) => ({ ...c, store: !c.store }))} /></div>
                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]"><span>Bài viết/Review</span><Toggle checked={filters.review} onChange={() => setFilters((c) => ({ ...c, review: !c.review }))} /></div>
                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]"><span>Người dùng</span><Toggle checked={filters.user} onChange={() => setFilters((c) => ({ ...c, user: !c.user }))} /></div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-[18px] font-bold text-[#679d55]">Khu vực</h2>
              <div className="space-y-4 px-2">
                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]"><span>Gần bạn</span><Toggle checked={filters.nearby} onChange={() => setFilters((c) => ({ ...c, nearby: !c.nearby }))} /></div>
                <button type="button" onClick={() => setDistrictMode((c) => !c)} className="flex w-full items-center justify-between gap-4 text-left text-[18px] text-[#30362f]">
                  <span>Theo quận/ khu vực</span>
                  <span className={`text-[#7b837b] transition ${districtMode ? 'rotate-180' : ''}`}>⌄</span>
                </button>
              </div>
              {districtMode ? (
                <div className="px-2 pt-4">
                  <input value={locationInput} onChange={(event) => setLocationInput(event.target.value)} placeholder="Nhập địa điểm" className="w-full rounded-full border border-[#d4d5d4] bg-white px-5 py-3 text-[16px]" />
                </div>
              ) : null}
            </div>

            <div>
              <h2 className="mb-4 text-[18px] font-bold text-[#679d55]">Độ phổ biến</h2>
              <div className="space-y-4 px-2">
                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]"><span>Đang hot</span><Toggle checked={filters.hot} onChange={() => setFilters((c) => ({ ...c, hot: !c.hot, bestSelling: false, mostReviewed: false }))} /></div>
                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]"><span>Nhiều lượt mua</span><Toggle checked={filters.bestSelling} onChange={() => setFilters((c) => ({ ...c, bestSelling: !c.bestSelling, hot: false, mostReviewed: false }))} /></div>
                <div className="flex items-center justify-between gap-4 text-[18px] text-[#30362f]"><span>Được review nhiều</span><Toggle checked={filters.mostReviewed} onChange={() => setFilters((c) => ({ ...c, mostReviewed: !c.mostReviewed, hot: false, bestSelling: false }))} /></div>
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-8 lg:ml-[calc((100vw-1440px)/2+2rem)] lg:max-w-[1040px] lg:pr-8">
          {loading ? <div className="rounded bg-white p-8 text-center text-[#777]">Đang tìm kiếm...</div> : null}
          {error ? <div className="rounded bg-white p-8 text-center text-red-500">{error}</div> : null}

          {!loading && !error && data?.thong_bao ? (
            <div className="rounded bg-white p-8 text-center text-[#777]">{data.thong_bao}</div>
          ) : null}

          {monAn.length > 0 ? (
            <section className="rounded bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              <h2 className="mb-4 text-xl font-bold">Món ăn</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {monAn.map((item: any) => (
                  <Link key={item.id} href={`/ranking/food/${item.id}`} className="rounded border p-3 hover:border-[#2f8f22]">
                    <img src={item.hinh_anh || ''} alt={item.ten_mon} className="h-[130px] w-full rounded object-cover" />
                    <h3 className="mt-2 font-semibold">{item.ten_mon}</h3>
                    <p className="text-sm text-[#666]">★ {Number(item.diem_danh_gia || 0).toFixed(1)} • {item.tong_danh_gia} đánh giá</p>
                    <p className="text-[#d71414] font-bold">{formatPrice(item.gia_ban)}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {cuaHang.length > 0 ? (
            <section className="rounded bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              <h2 className="mb-4 text-xl font-bold">Cửa hàng</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {cuaHang.map((item: any) => (
                  <Link key={item.id} href={`/explore/store/${item.id}`} className="rounded border p-4 hover:border-[#2f8f22]">
                    <div className="flex gap-3">
                      <img src={item.anh_dai_dien || ''} alt={item.ten_cua_hang} className="h-20 w-20 rounded object-cover" />
                      <div>
                        <h3 className="font-semibold">{item.ten_cua_hang}</h3>
                        <p className="text-sm text-[#666]">{item.dia_chi || item.khu_vuc || '---'}</p>
                        <p className="text-sm text-[#666]">★ {Number(item.diem_danh_gia || 0).toFixed(1)} • {item.tong_don_hang} đơn</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {baiViet.length > 0 ? (
            <section className="rounded bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              <h2 className="mb-4 text-xl font-bold">Bài viết / Review</h2>
              <div className="space-y-4">
                {baiViet.map((item: any) => (
                  <article key={item.id} className="rounded border p-4">
                    <p className="line-clamp-3 text-[15px]">{item.noi_dung}</p>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-[#666]">
                      <span>♡ {item.tong_luot_thich}</span>
                      <span>💬 {item.tong_luot_binh_luan}</span>
                      <span>↺ {item.tong_luot_chia_se}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {nguoiDung.length > 0 ? (
            <section className="rounded bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              <h2 className="mb-4 text-xl font-bold">Người dùng</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {nguoiDung.map((item: any) => (
                  <Link key={item.id} href={`/ranking/reviewer/${item.id}`} className="rounded border p-3 hover:border-[#2f8f22]">
                    <div className="flex items-center gap-3">
                      <img src={item.anh_dai_dien || ''} alt={item.ten_hien_thi} className="h-12 w-12 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold">{item.ten_hien_thi}</p>
                        <p className="text-sm text-[#666]">@{item.ten_dang_nhap} • uy tín {Number(item.diem_uy_tin || 0).toFixed(1)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {!loading && !error ? (
            <div className="flex justify-center gap-3 pb-2">
              <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded border px-4 py-2">Trước</button>
              <span className="inline-flex items-center px-3 text-sm">Trang {page}</span>
              <button type="button" onClick={() => setPage((p) => p + 1)} className="rounded border px-4 py-2">Xem thêm</button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
