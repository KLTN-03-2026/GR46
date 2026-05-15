import ProfilePageClient from '@/features/profile/ProfilePageClient';
import { getCurrentStoreProfile } from '@/features/profile/data';

export const metadata = {
    title: 'DishNet - Trang cửa hàng',
};

export default async function StoreProfilePage() {
    const profile = await getCurrentStoreProfile();
    return <ProfilePageClient profile={profile} editHref="/store-profile/edit" />;
}
