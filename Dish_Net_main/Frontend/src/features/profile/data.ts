import { headers } from 'next/headers';
import { figmaFallbackAssets } from '@/shared/assets/figmaFallback';

export type UserProfile = {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    gender: string;
    birthday: string;
    bio: string;
    email: string;
    phone: string;
    address: string;
    trustScore: string;
    postsCount: string;
    followers: string;
    following: string;
    isTopReviewer: boolean;
    showBadge: boolean;
    showTrustScore: boolean;
    isPrivate: boolean;
    posts: ProfilePost[];
    reposts: ProfilePost[];
    videos: ProfileVideo[];
    isMonetized?: boolean;
    earnings?: EarningsProfile;
};

export type ProfilePost = {
    id: string;
    date: string;
    content: string;
    images: string[];
    views?: string;
    visibility?: 'cong_khai' | 'ban_be';
    likes: string;
    comments: string;
    shares: string;
    sends: string;
    type?: 'bai_viet' | 'video' | 'repost';
    monetized?: boolean;
    dishLink?: string | null;
    sharedPost?: {
        id: string;
        author: string;
        date: string;
        content: string;
        images: string[];
    };
};

function formatCurrencyVnd(value: number) {
    return `${Math.round(value).toLocaleString('vi-VN')}đ`;
}

function extractMediaUrls(input: unknown): string[] {
    if (!Array.isArray(input)) return [];
    return input
        .map((item) => {
            if (typeof item === 'string') return item;
            if (item && typeof item === 'object' && 'url' in item) {
                const url = (item as { url?: unknown }).url;
                return typeof url === 'string' ? url : null;
            }
            return null;
        })
        .filter((url): url is string => typeof url === 'string' && url.length > 0);
}

export type ProfileVideo = {
    id: string;
    image: string;
    views: string;
    pinned?: boolean;
};

export type EarningsItemStatus = 'earning' | 'low' | 'high';
export type WithdrawalStatus = 'completed' | 'processing' | 'rejected';

export type EarningsItem = {
    id: string;
    title: string;
    image: string;
    views: string;
    interactions: string;
    revenue: string;
    publishedAt: string;
    status: EarningsItemStatus;
};

export type WithdrawalAccount = {
    id: string;
    provider: string;
    accountNumber: string;
    accountName: string;
    kind: 'bank' | 'wallet';
};

export type WithdrawalHistoryItem = {
    id: string;
    date: string;
    amount: string;
    method: string;
    status: WithdrawalStatus;
};

export type EarningsProfile = {
    todayRevenue: string;
    todayRevenueDelta: string;
    totalMonetizedPosts: string;
    totalMonetizedPostsDelta: string;
    linkClickRate: string;
    linkClickRateDelta: string;
    totalRevenue: string;
    withdrawSummary: {
        availableBalance: string;
        processingAmount: string;
        totalWithdrawn: string;
    };
    items: EarningsItem[];
    withdrawalAccounts: WithdrawalAccount[];
    withdrawalHistory: WithdrawalHistoryItem[];
};

const DEFAULT_AVATAR = figmaFallbackAssets.reviewerAvatarA;
const EMPTY_EARNINGS: EarningsProfile = {
    todayRevenue: '0đ',
    todayRevenueDelta: '---',
    totalMonetizedPosts: '0',
    totalMonetizedPostsDelta: '---',
    linkClickRate: '0%',
    linkClickRateDelta: '---',
    totalRevenue: '0đ',
    withdrawSummary: {
        availableBalance: '0',
        processingAmount: '0',
        totalWithdrawn: '0',
    },
    items: [],
    withdrawalAccounts: [],
    withdrawalHistory: [],
};

type ApiEnvelope<T> = {
    success: boolean;
    message: string;
    data: T;
};

function unwrapEnvelope<T>(payload: unknown): T {
    if (
        payload &&
        typeof payload === 'object' &&
        'success' in payload &&
        'data' in payload
    ) {
        return (payload as ApiEnvelope<T>).data;
    }
    return payload as T;
}

async function requestWithAuthCookie<T>(path: string): Promise<T> {
    const origin = process.env.NEXT_PUBLIC_APP_ORIGIN ?? 'http://127.0.0.1:4000';
    const reqHeaders = await headers();
    const cookie = reqHeaders.get('cookie') ?? '';
    const res = await fetch(new URL(`/api${path}`, origin), {
        method: 'GET',
        headers: cookie ? { cookie } : undefined,
        cache: 'no-store',
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) {
        const msg =
            body && typeof body === 'object' && 'message' in body
                ? String((body as { message?: string }).message ?? 'Có lỗi xảy ra')
                : 'Có lỗi xảy ra';
        throw new Error(msg);
    }
    return unwrapEnvelope<T>(body);
}

function emptyProfileFromAuth(me?: any): UserProfile {
    return {
        id: String(me?.id ?? 0),
        name: String(me?.ten_hien_thi ?? 'Người dùng'),
        handle: String(me?.ten_dang_nhap ?? 'nguoi-dung'),
        avatar: String(me?.anh_dai_dien ?? DEFAULT_AVATAR),
        gender: '',
        birthday: '',
        bio: '',
        email: String(me?.email ?? ''),
        phone: '',
        address: '',
        trustScore: '0',
        postsCount: '0',
        followers: '0',
        following: '0',
        isTopReviewer: false,
        showBadge: false,
        showTrustScore: false,
        isPrivate: false,
        isMonetized: false,
        posts: [],
        reposts: [],
        videos: [],
        earnings: EMPTY_EARNINGS,
    };
}

export async function getCurrentUserProfile(): Promise<UserProfile> {
    let me: any;
    try {
        me = await requestWithAuthCookie<any>('/auth/toi');
    } catch {
        return emptyProfileFromAuth();
    }

    try {
        const [editPayload, profilePayload, postPayload, videoPayload, repostPayload] = await Promise.all([
            requestWithAuthCookie<any>('/user/trang-ca-nhan/me/chinh-sua'),
            requestWithAuthCookie<any>(`/user/trang-ca-nhan/${Number(me.id)}`),
            requestWithAuthCookie<any>(`/user/trang-ca-nhan/${Number(me.id)}/noi-dung?tab=bai_viet&trang=1&so_luong=20`),
            requestWithAuthCookie<any>(`/user/trang-ca-nhan/${Number(me.id)}/noi-dung?tab=video&trang=1&so_luong=20`),
            requestWithAuthCookie<any>(`/user/trang-ca-nhan/${Number(me.id)}/noi-dung?tab=bai_dang_lai&trang=1&so_luong=20`),
        ]);

        const basic = profilePayload?.thong_tin_co_ban ?? {};
        const monetization = profilePayload?.thong_tin_kiem_tien_noi_dung ?? null;
        const apiPosts = Array.isArray(postPayload?.du_lieu)
            ? postPayload.du_lieu.map((item: any) => ({
                id: String(item.id),
                date: item.ngay_dang ? new Date(item.ngay_dang).toLocaleDateString('vi-VN') : '',
                content: String(item.noi_dung ?? ''),
                images: extractMediaUrls(item.tep_dinh_kem),
                views: String(item.tong_luot_xem ?? 0),
                visibility: item.muc_do_hien_thi === 'ban_be' ? 'ban_be' : 'cong_khai',
                likes: String(item.tong_luot_thich ?? 0),
                comments: String(item.tong_luot_binh_luan ?? 0),
                shares: String(item.tong_luot_chia_se ?? 0),
                sends: '0',
                type: item.loai_bai_viet ?? 'bai_viet',
                monetized: Boolean(item.bat_kiem_tien),
                dishLink: item.link_mon_an ?? null,
            }))
            : [];
        const apiReposts = Array.isArray(repostPayload?.du_lieu)
            ? repostPayload.du_lieu.map((item: any) => ({
                id: String(item.id),
                date: item.ngay_dang ? new Date(item.ngay_dang).toLocaleDateString('vi-VN') : '',
                content: String(item.noi_dung ?? ''),
                images: extractMediaUrls(item.tep_dinh_kem),
                views: String(item.tong_luot_xem ?? 0),
                visibility: item.muc_do_hien_thi === 'ban_be' ? 'ban_be' : 'cong_khai',
                likes: String(item.tong_luot_thich ?? 0),
                comments: String(item.tong_luot_binh_luan ?? 0),
                shares: String(item.tong_luot_chia_se ?? 0),
                sends: '0',
                type: item.loai_bai_viet ?? 'repost',
                sharedPost: item.bai_viet_goc
                    ? {
                        id: String(item.bai_viet_goc.id),
                        author: String(item.bai_viet_goc?.thong_tin_nguoi_dang?.ten_hien_thi ?? 'Người dùng'),
                        date: item.bai_viet_goc?.ngay_dang ? new Date(item.bai_viet_goc.ngay_dang).toLocaleDateString('vi-VN') : '',
                        content: String(item.bai_viet_goc?.noi_dung ?? ''),
                        images: extractMediaUrls(item.bai_viet_goc?.tep_dinh_kem),
                    }
                    : undefined,
            }))
            : [];
        const apiVideos = Array.isArray(videoPayload?.du_lieu)
            ? videoPayload.du_lieu.map((item: any) => ({
                id: String(item.id),
                image: (extractMediaUrls(item.tep_dinh_kem)[0] ?? null) || DEFAULT_AVATAR,
                views: String(item.tong_luot_thich ?? 0),
            }))
            : [];

        const earnings: EarningsProfile = monetization
            ? {
                todayRevenue: formatCurrencyVnd(Number(monetization?.thong_ke?.doanh_thu_hom_nay ?? 0)),
                todayRevenueDelta: `+${Number(monetization?.thong_ke?.luot_nhan_link_hom_nay ?? 0)} lượt nhấn link`,
                totalMonetizedPosts: String(Number(monetization?.thong_ke?.tong_bai_kiem_tien ?? 0)),
                totalMonetizedPostsDelta: 'Đang kiếm tiền',
                linkClickRate: `${Number(monetization?.thong_ke?.ty_le_nhan_link ?? 0).toFixed(2)}%`,
                linkClickRateDelta: `${Number(monetization?.thong_ke?.tong_luot_nhan_link ?? 0)} lượt nhấn`,
                totalRevenue: formatCurrencyVnd(Number(monetization?.thong_ke?.tong_doanh_thu_tich_luy ?? 0)),
                withdrawSummary: {
                    availableBalance: formatCurrencyVnd(Number(monetization?.tong_quan_rut_tien?.so_du_kha_dung ?? 0)),
                    processingAmount: formatCurrencyVnd(Number(monetization?.tong_quan_rut_tien?.so_tien_dang_xu_ly ?? 0)),
                    totalWithdrawn: formatCurrencyVnd(Number(monetization?.tong_quan_rut_tien?.tong_da_rut_thanh_cong ?? 0)),
                },
                items: apiPosts
                    .filter((post: any) => post.monetized)
                    .map((post: any) => ({
                        id: post.id,
                        title: post.content ? post.content.slice(0, 50) : 'Bài viết kiếm tiền',
                        image: post.images[0] ?? DEFAULT_AVATAR,
                        views: String(post.views ?? '0'),
                        interactions: String(Number(post.likes) + Number(post.comments) + Number(post.shares)),
                        revenue: '0đ',
                        publishedAt: post.date,
                        status: 'earning' as const,
                    })),
                withdrawalAccounts: Array.isArray(monetization?.tai_khoan_rut_tien)
                    ? monetization.tai_khoan_rut_tien.map((acc: any) => ({
                        id: String(acc.id),
                        provider: String(acc.ten_ngan_hang ?? 'Ngân hàng'),
                        accountNumber: String(acc.so_tai_khoan ?? ''),
                        accountName: String(acc.ten_chu_tai_khoan ?? ''),
                        kind: 'bank' as const,
                    }))
                    : [],
                withdrawalHistory: Array.isArray(monetization?.lich_su_rut_tien)
                    ? monetization.lich_su_rut_tien.map((item: any) => ({
                        id: String(item.id),
                        date: item.thoi_gian_yeu_cau ? new Date(item.thoi_gian_yeu_cau).toLocaleDateString('vi-VN') : '',
                        amount: formatCurrencyVnd(Number(item.so_tien ?? 0)),
                        method: 'Chuyển khoản ngân hàng',
                        status:
                            item.trang_thai === 'da_hoan_thanh'
                                ? 'completed'
                                : item.trang_thai === 'bi_tu_choi'
                                    ? 'rejected'
                                    : 'processing',
                    }))
                    : [],
            }
            : EMPTY_EARNINGS;

        return {
            id: String(me.id),
            name: basic.ten_hien_thi || me.ten_hien_thi || 'Người dùng',
            handle: basic.ten_tai_khoan || me.ten_dang_nhap || 'user',
            avatar: basic.anh_dai_dien || me.anh_dai_dien || DEFAULT_AVATAR,
            gender: editPayload?.gioi_tinh || '',
            birthday: editPayload?.ngay_sinh ? new Date(editPayload.ngay_sinh).toLocaleDateString('vi-VN') : '',
            bio: String(editPayload?.tieu_su ?? ''),
            email: me.email || '',
            phone: editPayload?.so_dien_thoai || '',
            address: editPayload?.dia_chi || '',
            trustScore: String(basic.diem_uy_tin ?? 0),
            postsCount: String(basic.so_bai_viet ?? apiPosts.length),
            followers: String(basic.so_nguoi_theo_doi ?? 0),
            following: String(basic.so_nguoi_dang_theo_doi ?? 0),
            isTopReviewer: false,
            showBadge: Boolean(editPayload?.cho_hien_thi_huy_hieu),
            showTrustScore: Boolean(editPayload?.cho_hien_thi_diem_uy_tin),
            isPrivate: Boolean(editPayload?.la_tai_khoan_rieng_tu),
            isMonetized: Boolean(monetization),
            posts: apiPosts,
            reposts: apiReposts,
            videos: apiVideos,
            earnings,
        };
    } catch {
        return emptyProfileFromAuth(me);
    }
}

export async function getCurrentStoreProfile(): Promise<UserProfile> {
    const profile = await getCurrentUserProfile();
    return {
        ...profile,
        isTopReviewer: false,
    };
}
