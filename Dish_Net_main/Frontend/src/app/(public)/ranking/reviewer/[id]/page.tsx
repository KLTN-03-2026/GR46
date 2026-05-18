import { redirect } from 'next/navigation';

export default async function RankingReviewerDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    redirect(`/profile/${id}`);
}
