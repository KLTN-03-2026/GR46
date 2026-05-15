import { notFound, redirect } from 'next/navigation';
import ProfilePageClient from '@/features/profile/ProfilePageClient';
import { getCurrentUserId, getUserProfileById } from '@/features/profile/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
    title: 'DishNet - Trang cá nhân',
};

export default async function PublicProfilePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const idNumber = Number(id);
    if (!Number.isFinite(idNumber) || idNumber <= 0) {
        notFound();
    }

    const meId = await getCurrentUserId();
    if (meId && meId === idNumber) {
        redirect('/user/profile');
    }

    const profile = await getUserProfileById(idNumber);
    if (!profile) {
        notFound();
    }

    return <ProfilePageClient profile={profile} canEdit={false} />;
}
