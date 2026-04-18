import SettingsPageClient from '@/features/settings/SettingsPageClient';
import { getCurrentUserProfile } from '@/features/profile/data';

export const metadata = {
    title: 'DishNet - Cài đặt',
    description: 'Quản lý cài đặt tài khoản DishNet của bạn',
};

export default async function SettingsPage() {
    const profile = await getCurrentUserProfile();
    return <SettingsPageClient profile={profile} />;
}
