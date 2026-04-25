import EditProfilePageClient from '@/features/profile/EditProfilePageClient';
import { getCurrentStoreProfile } from '@/features/profile/data';

export const metadata = {
    title: 'DishNet - Edit Store Profile',
    description: 'Edit store profile on DishNet',
};

export default async function EditStoreProfilePage() {
    const profile = await getCurrentStoreProfile();

    return <EditProfilePageClient profile={profile} backHref="/store-profile" />;
}
