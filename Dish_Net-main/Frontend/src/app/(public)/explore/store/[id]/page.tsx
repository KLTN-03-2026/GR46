import { notFound } from 'next/navigation';

import StoreDetailPageClient from '@/features/store-detail/StoreDetailPageClient';
import { getExploreStoreIds } from '@/features/explore/data';
import { getStoreDetailById } from '@/features/store-detail/data';

export function generateStaticParams() {
    return getExploreStoreIds().map((id) => ({ id }));
}

export default async function ExploreStorePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const store = await getStoreDetailById(id);

    if (!store) {
        notFound();
    }

    return <StoreDetailPageClient store={store} />;
}
