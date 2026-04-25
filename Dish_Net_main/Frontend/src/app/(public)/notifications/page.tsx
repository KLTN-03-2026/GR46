import NotificationsPageClient from '@/features/notifications/NotificationsPageClient';
import { getNotificationItems } from '@/features/notifications/data';

export default async function NotificationsPage() {
    const notifications = await getNotificationItems();
    return <NotificationsPageClient notifications={notifications} />;
}
