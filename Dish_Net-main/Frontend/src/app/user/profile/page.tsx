import ProfilePageClient from '@/features/profile/ProfilePageClient';
import { getCurrentUserProfile } from '@/features/profile/data';

export const metadata = {
    title: 'DishNet - Trang cá nhân',
    description: 'Xem và quản lý trang cá nhân của bạn trên DishNet',
};

export default async function ProfilePage() {
    const profile = await getCurrentUserProfile();
    return <ProfilePageClient profile={profile} />;
}
