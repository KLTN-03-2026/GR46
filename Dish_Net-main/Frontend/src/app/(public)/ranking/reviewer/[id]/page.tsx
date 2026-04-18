import { notFound } from 'next/navigation';

import RankingReviewerDetailPageClient from '@/features/ranking-reviewer-detail/RankingReviewerDetailPageClient';
import { getRankingReviewerDetailById } from '@/features/ranking-reviewer-detail/data';

export default async function RankingReviewerDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const reviewer = await getRankingReviewerDetailById(id);

    if (!reviewer) {
        notFound();
    }

    return <RankingReviewerDetailPageClient reviewer={reviewer} />;
}
