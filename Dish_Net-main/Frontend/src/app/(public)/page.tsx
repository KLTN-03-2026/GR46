import HomePageClient from '@/features/home/HomePageClient';
import { getHomePageData } from '@/features/home/data';

export default async function HomePage() {
    const data = await getHomePageData();

    return <HomePageClient data={data} />;
}
