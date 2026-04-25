import ExplorePageClient from '@/features/explore/ExplorePageClient';
import { getExplorePageData } from '@/features/explore/data';

export default async function ExplorePage() {
  const data = await getExplorePageData();
  return <ExplorePageClient data={data} />;
}
