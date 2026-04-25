import { notFound } from 'next/navigation';

import StoreDetailPageClient from '@/features/store-detail/StoreDetailPageClient';
import { getStoreDetailById } from '@/features/store-detail/data';

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
