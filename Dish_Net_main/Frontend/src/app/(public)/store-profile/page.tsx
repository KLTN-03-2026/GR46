import ProfilePageClient from '@/features/profile/ProfilePageClient';
import { getCurrentStoreProfile } from '@/features/profile/data';

export const metadata = {
    title: 'DishNet - Store Profile',
    description: 'Public store profile on DishNet',
};

export default async function StoreProfilePage() {
    const profile = await getCurrentStoreProfile();

    return <ProfilePageClient profile={profile} editHref="/store-profile/edit" />;
}
