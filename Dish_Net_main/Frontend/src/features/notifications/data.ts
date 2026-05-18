import { userCommerceApi } from '@/shared/userCommerceApi';

export type NotificationItem = {
    id: string;
    avatar: string;
    isSystemAvatar: boolean;
    type: 'like' | 'support' | 'follow' | 'comment' | 'order';
    loaiThongBao?: string;
    loaiDoiTuong?: string;
    idDoiTuong?: number | null;
    message: string;
    noi_dung?: string;
    time: string;
    isRead?: boolean;
};

export const SYSTEM_LOGO = '/images/logo.png';

const SOCIAL_TYPES = ['tuong_tac', 'binh_luan', 'theo_doi'];

function isSocialNotification(loai: string): boolean {
    return SOCIAL_TYPES.some((t) => loai.includes(t));
}

export function mapType(loai?: string): NotificationItem['type'] {
    if (!loai) return 'support';
    if (loai.includes('don_hang')) return 'order';
    if (loai.includes('tuong_tac')) return 'like';
    if (loai.includes('binh_luan')) return 'comment';
    if (loai.includes('theo_doi')) return 'follow';
    return 'support';
}

export function resolveNotificationTarget(item: Pick<NotificationItem, 'loaiThongBao' | 'idDoiTuong'>): string {
    const loai = String(item.loaiThongBao ?? '').toLowerCase();
    const id = Number(item.idDoiTuong ?? 0);

    if (loai.includes('don_hang')) {
        return '/user/orders?tab=purchased';
    }

    if (loai.includes('ho_tro')) {
        return id > 0 ? `/user/support?request=${id}` : '/user/support';
    }

    if (loai.includes('theo_doi')) {
        return id > 0 ? `/profile/${id}` : '/';
    }

    if (loai.includes('tuong_tac') || loai.includes('binh_luan')) {
        return id > 0 ? `/?post_id=${id}` : '/';
    }

    if (loai.includes('bao_cao')) {
        return '/notifications';
    }

    return '/notifications';
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

export function mapNotificationRow(item: any, index: number): NotificationItem {
    const loai = String(item.loai_thong_bao ?? '');
    const social = isSocialNotification(loai);
    const senderAvatar = item?.nguoi_gui?.anh_dai_dien;

    return {
        id: String(item.id ?? `notification-${index}`),
        avatar: social && senderAvatar ? String(senderAvatar) : SYSTEM_LOGO,
        isSystemAvatar: !(social && senderAvatar),
        type: mapType(loai),
        loaiThongBao: loai,
        loaiDoiTuong: String(item.loai_doi_tuong ?? ''),
        idDoiTuong: item.id_doi_tuong != null ? Number(item.id_doi_tuong) : null,
        message: String(item.tieu_de || item.noi_dung || 'Bạn có thông báo mới'),
        noi_dung: item.noi_dung ? String(item.noi_dung) : undefined,
        time: formatRelativeTime(item.ngay_tao),
        isRead: Boolean(item.da_doc),
    };
}

export async function getNotificationItems(): Promise<NotificationItem[]> {
    try {
        const payload: any = await userCommerceApi.layThongBao({ trang: 1, so_luong: 50 });
        const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
        return rows.map(mapNotificationRow);
    } catch {
        return [];
    }
}

export const notificationItems: NotificationItem[] = [];
