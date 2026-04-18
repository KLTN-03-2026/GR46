import NotificationsPageClient from '@/features/notifications/NotificationsPageClient';
import { notificationItems } from '@/features/notifications/data';

export default function NotificationsPage() {
    return <NotificationsPageClient notifications={notificationItems} />;
}
