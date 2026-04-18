import { Suspense } from 'react';
import RankingPageClient from '@/features/ranking/RankingPageClient';

export default function RankingPage() {
    return (
        <Suspense fallback={null}>
            <RankingPageClient />
        </Suspense>
    );
}
