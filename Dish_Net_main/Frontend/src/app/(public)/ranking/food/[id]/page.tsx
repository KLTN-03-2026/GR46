import { notFound } from 'next/navigation';

import RankingFoodDetailPageClient from '@/features/ranking-food-detail/RankingFoodDetailPageClient';
import { getRankingFoodDetailById } from '@/features/ranking-food-detail/data';

export default async function RankingFoodDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const food = await getRankingFoodDetailById(id);

    if (!food) {
        notFound();
    }

    return <RankingFoodDetailPageClient food={food} />;
}
