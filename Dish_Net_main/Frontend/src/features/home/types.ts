export type RankingMode = 'stores' | 'reviewers';

export interface RankingItem {
    rank: string;
    name: string;
    metric: string;
    popularity: string;
}

export interface HeroSection {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    backgroundImage: string;
    collageImage: string;
}

export interface SpotlightCard {
    id: string;
    dealId?: number;
    postId?: number;
    storeId?: number;
    title: string;
    area: string;
    address: string;
    excerpt: string;
    coverImage: string;
    reviewerAvatar: string;
    galleryImages?: string[];
    dishName?: string;
    originalPrice?: string;
    discountedPrice?: string;
    discountText?: string;
    endAt?: string;
}

export interface FeedPost {
    id: string;
    type: 'bai_viet' | 'video' | 'repost';
    authorId?: number;
    storeId?: number;
    storeName?: string;
    author: string;
    authorAvatar: string;
    date: string;
    rating: string | null;
    review: string;
    followLabel: string;
    tags: string[];
    images: string[];
    likeCount: number;
    commentCount: number;
    shareCount: number;
    saveCount: number;
    isLiked: boolean;
    dishLink?: string;
    dishId?: number;
    sharedPost?: {
        id: string;
        author: string;
        date: string;
        content: string;
        images: string[];
    };
}

export interface OrderPreview {
    title: string;
    address: string;
    image: string;
    badgeText: string;
}

export interface MenuItem {
    id: string;
    name: string;
    price: string;
    note: string;
    image: string;
    categoryId: string;
}

export interface MenuCategory {
    id: string;
    label: string;
}

export interface MenuModalData {
    title: string;
    categories: MenuCategory[];
    items: MenuItem[];
}

export interface HomePageData {
    hero: HeroSection;
    filters: string[];
    rankings: Record<RankingMode, RankingItem[]>;
    spotlightCards: SpotlightCard[];
    feedPosts: FeedPost[];
    feedPagination: {
        trang: number;
        so_luong: number;
        tong_so: number;
        tong_trang: number;
    };
    orderPreview: OrderPreview;
    menu: MenuModalData;
}
