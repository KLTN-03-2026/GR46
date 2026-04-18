import { getHomePageData } from '@/features/home/data';

export type UserProfile = {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    gender: string;
    birthday: string;
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
    videos: ProfileVideo[];
    isMonetized?: boolean;
    earnings?: EarningsProfile;
};

export type ProfilePost = {
    id: string;
    date: string;
    content: string;
    images: string[];
    likes: string;
    comments: string;
    shares: string;
    sends: string;
};

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

const videoThumbs = [
    'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
] as const;

async function buildBaseProfileContent() {
    const homeData = await getHomePageData();
    const avatar = homeData.feedPosts[0]?.authorAvatar ?? '';

    const basePosts = homeData.feedPosts.map((post, index) => ({
        id: `my-post-${index + 1}`,
        date: post.date,
        content: `${post.review}\n\nQuan phuc vu kha nhanh, goi mon tam 5-7 phut la co. Khong gian tuy khong qua rong nhung sach se, am cung. Minh nghi day se la lua chon on cho bua trua. Lan sau nhat dinh se quay lai!`,
        images: [post.images[0], post.images[1]],
        likes: index === 0 ? '2,4K' : '2,1K',
        comments: index === 0 ? '415' : '368',
        shares: index === 0 ? '159' : '124',
        sends: index === 0 ? '51' : '47',
    }));

    const posts = Array.from({ length: 2 }, (_, cycleIndex) =>
        basePosts.map((post, postIndex) => ({
            ...post,
            id: `my-post-${cycleIndex + 1}-${postIndex + 1}`,
        })),
    ).flat();

    const videos = Array.from({ length: 8 }, (_, index) => ({
        id: `my-video-${index + 1}`,
        image: videoThumbs[index % videoThumbs.length],
        views: ['14.2K', '1.5M', '993.9K', '591', '2035', '135.8K', '54.4K', '16.6K'][index % 8],
        pinned: index < 3,
    }));

    return { avatar, posts, videos };
}

export async function getCurrentUserProfile(): Promise<UserProfile> {
    const { avatar, posts, videos } = await buildBaseProfileContent();

    return {
        id: 'me',
        name: 'Vyfoodieee',
        handle: 'accclone',
        avatar,
        gender: 'Nu',
        birthday: '22/06/2004',
        email: 'vythi930309@gmail.com',
        phone: '0386755402',
        address: '40 nguyen nhu hanh, phuong hoa minh, quan lien chieu, thanh pho da nang',
        trustScore: '4.9',
        postsCount: '106',
        followers: '51,2k',
        following: '10',
        isTopReviewer: true,
        showBadge: true,
        showTrustScore: true,
        isPrivate: false,
        isMonetized: true,
        posts,
        videos,
        earnings: {
            todayRevenue: '5.800.000D',
            todayRevenueDelta: '+12% so voi hom qua',
            totalMonetizedPosts: '15 don',
            totalMonetizedPostsDelta: '+8% so voi hom qua',
            linkClickRate: '12,6 %',
            linkClickRateDelta: '+3% so voi hom qua',
            totalRevenue: '10.000.000D',
            withdrawSummary: {
                availableBalance: '250,000d',
                processingAmount: '0',
                totalWithdrawn: '6,200,000d',
            },
            withdrawalAccounts: [
                {
                    id: 'vcb',
                    provider: 'Vietcombank',
                    accountNumber: '123456789',
                    accountName: 'Nguyen Van A',
                    kind: 'bank',
                },
                {
                    id: 'momo',
                    provider: 'MoMo',
                    accountNumber: '0987654321',
                    accountName: 'Nguyen Van A',
                    kind: 'wallet',
                },
            ],
            withdrawalHistory: [
                { id: 'w-1', date: '03/06/2024', amount: '1,000,000d', method: 'Vietcombank 123456789', status: 'completed' },
                { id: 'w-2', date: '01/05/2024', amount: '500,000d', method: 'MoMo 0987654321', status: 'completed' },
                { id: 'w-3', date: '15/04/2024', amount: '1,200,000d', method: 'Ngan hang ACB 9876543210', status: 'completed' },
                { id: 'w-4', date: '30/03/2024', amount: '2,000,000d', method: 'Vietcombank 123456789', status: 'completed' },
                { id: 'w-5', date: '10/03/2024', amount: '700,000d', method: 'ZaloPay 0981234567', status: 'completed' },
            ],
            items: [
                {
                    id: 'earning-1',
                    title: 'Review ga nuong cuc ngon o ABC',
                    image: posts[0]?.images[0] ?? avatar,
                    views: '30,505',
                    interactions: '2,115',
                    revenue: '3.000.000 VND',
                    publishedAt: '21/02/2026 00:00 SA',
                    status: 'earning',
                },
                {
                    id: 'earning-2',
                    title: 'Review ga nuong cuc ngon o ABC',
                    image: posts[1]?.images[0] ?? avatar,
                    views: '30,505',
                    interactions: '2,115',
                    revenue: '3.000.000 VND',
                    publishedAt: '21/02/2026 00:00 SA',
                    status: 'earning',
                },
                {
                    id: 'earning-3',
                    title: 'Review ga nuong cuc ngon o ABC',
                    image: posts[2]?.images[0] ?? avatar,
                    views: '24,505',
                    interactions: '1,315',
                    revenue: '1.600.000 VND',
                    publishedAt: '19/02/2026 00:00 SA',
                    status: 'high',
                },
                {
                    id: 'earning-4',
                    title: 'Review ga nuong cuc ngon o ABC',
                    image: posts[3]?.images[0] ?? avatar,
                    views: '12,505',
                    interactions: '845',
                    revenue: '420.000 VND',
                    publishedAt: '17/02/2026 00:00 SA',
                    status: 'low',
                },
            ],
        },
    };
}

export async function getCurrentStoreProfile(): Promise<UserProfile> {
    const { avatar, posts, videos } = await buildBaseProfileContent();

    return {
        id: 'store-me',
        name: 'Net Hue - Hang Bong',
        handle: '@nethue.store',
        avatar,
        gender: 'Khac',
        birthday: '01/03/2020',
        email: 'nethue.hangbong@gmail.com',
        phone: '0901234567',
        address: '12 Hang Bong, Hoan Kiem, Ha Noi',
        trustScore: '4.8',
        postsCount: '128',
        followers: '18,4k',
        following: '245',
        isTopReviewer: false,
        showBadge: false,
        showTrustScore: true,
        isPrivate: false,
        posts,
        videos,
    };
}
