import EditProfilePageClient from '@/features/profile/EditProfilePageClient';
import { getCurrentUserProfile } from '@/features/profile/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
    title: 'DishNet - Chỉnh sửa trang cá nhân',
    description: 'Chỉnh sửa thông tin trang cá nhân của bạn trên DishNet',
};

export default async function EditProfilePage() {
    const profile = await getCurrentUserProfile();
    return <EditProfilePageClient profile={profile} />;
}
