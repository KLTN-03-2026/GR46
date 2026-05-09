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

  const monAn = filters.food ? (data?.ket_qua.mon_an.du_lieu ?? []) : [];
  const cuaHang = filters.store ? (data?.ket_qua.cua_hang.du_lieu ?? []) : [];
  const baiViet = filters.review ? (data?.ket_qua.bai_viet.du_lieu ?? []) : [];
  const nguoiDung = filters.user ? (data?.ket_qua.nguoi_dung.du_lieu ?? []) : [];

  const hasAnyResult = monAn.length > 0 || cuaHang.length > 0 || baiViet.length > 0 || nguoiDung.length > 0;
  const totalInPage = monAn.length + cuaHang.length + baiViet.length + nguoiDung.length;

  return (
    <div className="bg-[#fafaf9]">
      <section className="grid w-full gap-10 px-4 pb-8 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-0">
        <aside className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto bg-white pb-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 text-[#7b837b] transition-transform duration-200 ${districtMode ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
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
            <section className="rounded-[16px] bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              <h2 className="mb-5 text-[22px] font-bold text-[#1f2937]">Món ăn</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {monAn.map((item: any) => (
                  <Link key={item.id} href={`/ranking/food/${item.id}`} className="overflow-hidden rounded-[12px] bg-[#fafafa] shadow-[0_2px_10px_rgba(0,0,0,0.07)] transition hover:shadow-[0_4px_16px_rgba(0,0,0,0.13)]">
                    <img src={item.hinh_anh || ''} alt={item.ten_mon} className="h-[140px] w-full object-cover" />
                    <div className="p-3">
                      <h3 className="truncate text-[16px] font-semibold text-[#1f2937]">{item.ten_mon}</h3>
                      <p className="mt-1 text-sm text-[#6b7280]">★ {Number(item.diem_danh_gia || 0).toFixed(1)} • {item.tong_danh_gia} đánh giá</p>
                      <p className="mt-1 text-[16px] font-bold text-[#d71414]">{formatPrice(item.gia_ban)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {cuaHang.length > 0 ? (
            <section className="rounded-[16px] bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              <h2 className="mb-5 text-[22px] font-bold text-[#1f2937]">Cửa hàng</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {cuaHang.map((item: any) => (
                  <Link key={item.id} href={`/explore/store/${item.id}`} className="flex items-center gap-4 rounded-[12px] bg-[#fafafa] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.07)] transition hover:shadow-[0_4px_16px_rgba(0,0,0,0.13)]">
                    <img src={item.anh_dai_dien || ''} alt={item.ten_cua_hang} className="h-[72px] w-[72px] shrink-0 rounded-[10px] object-cover" />
                    <div className="min-w-0">
                      <h3 className="truncate text-[16px] font-bold text-[#1f2937]">{item.ten_cua_hang}</h3>
                      <p className="mt-0.5 truncate text-sm text-[#6b7280]">{item.dia_chi || item.khu_vuc || ''}</p>
                      <p className="mt-0.5 text-sm text-[#6b7280]">★ {Number(item.diem_danh_gia || 0).toFixed(1)} • {item.tong_don_hang} đơn</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {baiViet.length > 0 ? (
            <section className="rounded-[16px] bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              <h2 className="mb-5 text-[22px] font-bold text-[#1f2937]">Bài viết / Review</h2>
              <div className="space-y-4">
                {baiViet.map((item: any) => {
                  const images: string[] = Array.isArray(item.tep_dinh_kem) ? item.tep_dinh_kem.filter(Boolean) : [];
                  return (
                    <article key={item.id} className="overflow-hidden rounded-[16px] bg-[#fff6ee] shadow-[0_4px_16px_rgba(0,0,0,0.07)]">
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {item.anh_dai_dien
                              ? <img src={item.anh_dai_dien} alt={item.ten_nguoi_dang ?? ''} className="h-11 w-11 rounded-full object-cover" />
                              : <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ffe0b6] text-lg">👤</div>
                            }
                            <div>
                              <p className="text-[16px] font-bold text-[#172554]">{item.ten_nguoi_dang ?? 'Người dùng'}</p>
                              {item.ten_dang_nhap ? <p className="text-xs text-[#6b7280]">@{item.ten_dang_nhap}</p> : null}
                            </div>
                          </div>
                          {item.ngay_dang ? (
                            <p className="shrink-0 text-xs text-[#9ca3af]">{new Date(item.ngay_dang).toLocaleDateString('vi-VN')}</p>
                          ) : null}
                        </div>

                        <p className="mt-4 line-clamp-4 text-[15px] leading-7 text-[#3f3f46]">{item.noi_dung}</p>

                        {images.length > 0 ? (
                          <div className={`mt-4 grid gap-2 ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                            {images.slice(0, 3).map((src: string, idx: number) => (
                              <div key={idx} className="relative overflow-hidden rounded-[10px]">
                                <img src={src} alt="" className={`w-full object-cover ${images.length === 1 ? 'h-[200px]' : 'h-[120px]'}`} />
                                {idx === 2 && images.length > 3 ? (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-[15px] font-bold text-white">
                                    +{images.length - 3}
                                  </div>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        ) : null}

                        <div className="mt-4 flex items-center gap-6 border-t border-[#efe5d9] pt-4 text-[14px] text-[#6b7280]">
                          <span className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                            {item.tong_luot_thich ?? 0}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            {item.tong_luot_binh_luan ?? 0}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                            {item.tong_luot_chia_se ?? 0}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ) : null}

          {nguoiDung.length > 0 ? (
            <section className="rounded-[16px] bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              <h2 className="mb-5 text-[22px] font-bold text-[#1f2937]">Người dùng</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {nguoiDung.map((item: any) => (
                  <Link key={item.id} href={`/profile/${item.id}`} className="flex items-center gap-4 rounded-[12px] bg-[#fafafa] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.07)] transition hover:shadow-[0_4px_16px_rgba(0,0,0,0.13)]">
                    <img src={item.anh_dai_dien || ''} alt={item.ten_hien_thi} className="h-[52px] w-[52px] shrink-0 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="truncate text-[16px] font-semibold text-[#1f2937]">{item.ten_hien_thi}</p>
                      <p className="text-sm text-[#6b7280]">@{item.ten_dang_nhap} • uy tín {Number(item.diem_uy_tin || 0).toFixed(1)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {!loading && !error && hasAnyResult ? (
            <div className="flex justify-center gap-3 pb-2">
              {page > 1 ? (
                <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded border px-4 py-2">Trước</button>
              ) : null}
              <span className="inline-flex items-center px-3 text-sm">Trang {page}</span>
              {totalInPage >= 12 ? (
                <button type="button" onClick={() => setPage((p) => p + 1)} className="rounded border px-4 py-2">Xem thêm</button>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
