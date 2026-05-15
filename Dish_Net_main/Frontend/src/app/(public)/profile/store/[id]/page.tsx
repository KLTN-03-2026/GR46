import { notFound } from 'next/navigation';
import ProfilePageClient from '@/features/profile/ProfilePageClient';
import { getStoreProfileById } from '@/features/profile/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
    title: 'DishNet - Trang cá nhân cửa hàng',
};

export default async function StorePublicProfilePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const idNumber = Number(id);
    if (!Number.isFinite(idNumber) || idNumber <= 0) {
        notFound();
    }

    const profile = await getStoreProfileById(idNumber);
    if (!profile) {
        notFound();
    }

    return <ProfilePageClient profile={profile} canEdit={false} />;
}
