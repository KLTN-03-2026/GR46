import ExplorePageClient from '@/features/explore/ExplorePageClient';
import { explorePageData } from '@/features/explore/data';

export default function ExplorePage() {
    return <ExplorePageClient data={explorePageData} />;
}
