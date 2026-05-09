import { notFound } from 'next/navigation';

import StoreMenuPageClient from '@/features/store-detail/StoreMenuPageClient';
import { getStoreDetailById } from '@/features/store-detail/data';

export default async function ExploreStoreMenuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const store = await getStoreDetailById(id);

  if (!store) {
    notFound();
  }

  return <StoreMenuPageClient store={store} />;
}
