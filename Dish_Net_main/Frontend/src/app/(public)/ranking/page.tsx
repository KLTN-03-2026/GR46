import { Suspense } from 'react';

import RankingPageClient from '@/features/ranking/RankingPageClient';
import { getRankingData, type RankingFilterQuery, type RankingTab } from '@/features/ranking/data';

export default async function RankingPage({
  searchParams,
}: {
  searchParams: Promise<{
    tab?: string;
    q?: string;
    khu_vuc?: string;
    so_don_hang_tu?: string;
    diem_danh_gia_tu?: string;
    trang_thai?: 'hoat_dong' | 'tam_dung' | 'cho_duyet';
    ty_le_huy_toi_da?: string;
  }>;
}) {
  const { tab, q, khu_vuc, so_don_hang_tu, diem_danh_gia_tu, trang_thai, ty_le_huy_toi_da } = await searchParams;
  const currentTab: RankingTab = tab === 'reviewers' || tab === 'foods' ? tab : 'stores';
  const filters: RankingFilterQuery = {
    khu_vuc: khu_vuc?.trim() || undefined,
    so_don_hang_tu: so_don_hang_tu ? Number(so_don_hang_tu) : undefined,
    diem_danh_gia_tu: diem_danh_gia_tu ? Number(diem_danh_gia_tu) : undefined,
    trang_thai: trang_thai || undefined,
    ty_le_huy_toi_da: ty_le_huy_toi_da ? Number(ty_le_huy_toi_da) : undefined,
  };
  const initialData = await getRankingData(currentTab, q, filters);

  return (
    <Suspense fallback={null}>
      <RankingPageClient initialData={initialData} initialTab={currentTab} initialQuery={q ?? ''} />
    </Suspense>
  );
}
