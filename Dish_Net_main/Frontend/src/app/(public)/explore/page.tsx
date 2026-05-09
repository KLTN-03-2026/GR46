import ExplorePageClient from '@/features/explore/ExplorePageClient';
import { getExplorePageData } from '@/features/explore/data';

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ address?: string; q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const data = await getExplorePageData({
    dia_chi_giao: params.address,
    khu_vuc: params.address,
  });
  return <ExplorePageClient data={data} />;
}
