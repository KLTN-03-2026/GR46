import { userCommerceApi } from '@/shared/userCommerceApi';

export type NotificationItem = {
    id: string;
    avatar: string;
    type: 'like' | 'support' | 'follow' | 'comment';
    message: string;
    time: string;
    isRead?: boolean;
};

const fallbackAvatar =
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80';

function mapType(loai?: string): NotificationItem['type'] {
    if (!loai) return 'support';
    if (loai.includes('tuong_tac')) return 'like';
    if (loai.includes('binh_luan')) return 'comment';
    if (loai.includes('theo_doi')) return 'follow';
    return 'support';
}

function formatRelativeTime(input?: string | Date | null) {
    if (!input) return 'Vừa xong';
    const date = new Date(input);
    if (Number.isNaN(date.getTime())) return 'Vừa xong';
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} giờ trước`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} ngày trước`;
    const diffWeeks = Math.floor(diffDays / 7);
    return `${diffWeeks} tuần trước`;
}

export async function getNotificationItems(): Promise<NotificationItem[]> {
    try {
        const payload: any = await userCommerceApi.layThongBao({ trang: 1, so_luong: 50 });
        const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];

        return rows.map((item: any, index: number) => ({
            id: String(item.id ?? `notification-${index}`),
            avatar: String(item?.nguoi_nhan?.anh_dai_dien ?? fallbackAvatar),
            type: mapType(String(item.loai_thong_bao ?? '')),
            message: String(item.tieu_de || item.noi_dung || 'Bạn có thông báo mới'),
            time: formatRelativeTime(item.ngay_tao),
            isRead: Boolean(item.da_doc),
        }));
    } catch {
        return [];
    }
}

export const notificationItems: NotificationItem[] = [];
