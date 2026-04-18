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
    title: string;
    area: string;
    address: string;
    excerpt: string;
    coverImage: string;
    reviewerAvatar: string;
    galleryImages?: string[];
}

export interface FeedPost {
    id: string;
    author: string;
    authorAvatar: string;
    date: string;
    rating: string;
    review: string;
    followLabel: string;
    tags: string[];
    images: string[];
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
    orderPreview: OrderPreview;
    menu: MenuModalData;
}
