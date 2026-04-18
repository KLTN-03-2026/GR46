export type RankingTab = 'stores' | 'reviewers' | 'foods';

export type RankingRowItem = {
    id: string;
    rank: number;
    name: string;
    secondaryName?: string;
    secondaryHref?: string;
    logo?: string;
    secondaryLogo?: string;
    score: string;
    metric: string;
    secondaryMetric?: string;
    finalMetric?: string;
    trend?: 'up' | 'down' | 'neutral';
    href?: string;
};

export type RankingTabConfig = {
    label: string;
    filters: string[];
    columns: {
        primary: string;
        secondary?: string;
        score: string;
        metric: string;
        secondaryMetric?: string;
        finalMetric?: string;
    };
    rows: RankingRowItem[];
};

export const rankingPageData: Record<RankingTab, RankingTabConfig> = {
    stores: {
        label: 'Cửa hàng',
        filters: ['Khu vực', 'Số đơn hàng', 'Đánh giá', 'Trạng thái', 'Tỷ lệ hủy'],
        columns: {
            primary: 'Cửa hàng',
            score: 'Đánh giá',
            metric: 'Số đơn hàng',
            finalMetric: 'Tỉ lệ hủy',
        },
        rows: [
            { id: 'nearby-1', rank: 1, name: 'Ăn vặt Food', logo: '🍟', score: '4.9 ★ (500)', metric: '1.2k +', finalMetric: '1% - 0.5%', trend: 'up', href: '/explore/store/nearby-1' },
            { id: 'top-4', rank: 2, name: 'Ăn vặt Food', logo: '🥪', score: '4.9 ★ (500)', metric: '1.2k +', finalMetric: '1% - 0.5%', href: '/explore/store/top-4' },
            { id: 'top-5', rank: 3, name: 'Ăn vặt Food', logo: '🍜', score: '4.9 ★ (500)', metric: '1.2k +', finalMetric: '1% - 0.5%', href: '/explore/store/top-5' },
            { id: 'nearby-2', rank: 4, name: 'Ăn vặt Food', logo: '🥤', score: '4.9 ★ (500)', metric: '1.2k +', finalMetric: '1% - 0.5%', trend: 'down', href: '/explore/store/nearby-2' },
            { id: 'rec-4', rank: 5, name: 'Ăn vặt Food', logo: '🍔', score: '4.9 ★ (500)', metric: '1.2k +', finalMetric: '1% - 0.5%' },
            { id: 'nearby-8', rank: 6, name: 'Ăn vặt Food', logo: '🍱', score: '4.9 ★ (500)', metric: '1.2k +', finalMetric: '1% - 0.5%', trend: 'up', href: '/explore/store/nearby-8' },
            { id: 'top-2', rank: 7, name: 'Ăn vặt Food', logo: '🍲', score: '4.9 ★ (500)', metric: '1.2k +', finalMetric: '1% - 0.5%', href: '/explore/store/top-2' },
            { id: 'rec-1', rank: 8, name: 'Ăn vặt Food', logo: '🧋', score: '4.9 ★ (500)', metric: '1.2k +', finalMetric: '1% - 0.5%' },
            { id: 'nearby-3', rank: 9, name: 'Ăn vặt Food', logo: '🥟', score: '4.9 ★ (500)', metric: '1.2k +', finalMetric: '1% - 0.5%', trend: 'up', href: '/explore/store/nearby-3' },
            { id: 'rec-3', rank: 10, name: 'Ăn vặt Food', logo: '☕', score: '4.9 ★ (500)', metric: '1.2k +', finalMetric: '1% - 0.5%' },
        ],
    },
    reviewers: {
        label: 'Reviewer',
        filters: ['Khu vực', 'Số lượng xem', 'Số lượng thích', 'Độ tin cậy', 'Số lượt bình luận'],
        columns: {
            primary: 'Food Reviewer',
            score: 'Độ tin cậy',
            metric: 'Lượt xem',
            secondaryMetric: 'Lượt thích',
            finalMetric: 'Lượt bình luận',
        },
        rows: [
            { id: 'reviewer-1', rank: 1, name: 'Vyfoodieee', logo: '🍟', score: '4.9 ★ (500)', metric: '1.2k +', secondaryMetric: '1.2k +', finalMetric: '1% - 0.5%', trend: 'up', href: '/ranking/reviewer/reviewer-1' },
            { id: 'reviewer-2', rank: 2, name: 'Khu AAAA', logo: '👩', score: '4.9 ★ (500)', metric: '1.2k +', secondaryMetric: '1.2k +', finalMetric: '1% - 0.5%', href: '/ranking/reviewer/reviewer-2' },
            { id: 'reviewer-3', rank: 3, name: 'Khu AAAA', logo: '👩', score: '4.9 ★ (500)', metric: '1.2k +', secondaryMetric: '1.2k +', finalMetric: '1% - 0.5%', href: '/ranking/reviewer/reviewer-3' },
            { id: 'reviewer-4', rank: 4, name: 'Ăn vặt Food', logo: '🍟', score: '4.9 ★ (500)', metric: '1.2k +', secondaryMetric: '1.2k +', finalMetric: '1% - 0.5%', trend: 'down', href: '/ranking/reviewer/reviewer-4' },
            { id: 'reviewer-5', rank: 5, name: 'Khu AAAA', logo: '👩', score: '4.9 ★ (500)', metric: '1.2k +', secondaryMetric: '1.2k +', finalMetric: '1% - 0.5%', href: '/ranking/reviewer/reviewer-5' },
            { id: 'reviewer-6', rank: 6, name: 'Ăn vặt Food', logo: '🍟', score: '4.9 ★ (500)', metric: '1.2k +', secondaryMetric: '1.2k +', finalMetric: '1% - 0.5%', trend: 'up', href: '/ranking/reviewer/reviewer-6' },
            { id: 'reviewer-7', rank: 7, name: 'Khu AAAA', logo: '👩', score: '4.9 ★ (500)', metric: '1.2k +', secondaryMetric: '1.2k +', finalMetric: '1% - 0.5%', href: '/ranking/reviewer/reviewer-7' },
            { id: 'reviewer-8', rank: 8, name: 'Ăn vặt Food', logo: '🍟', score: '4.9 ★ (500)', metric: '1.2k +', secondaryMetric: '1.2k +', finalMetric: '1% - 0.5%', href: '/ranking/reviewer/reviewer-8' },
            { id: 'reviewer-9', rank: 9, name: 'Khu AAAA', logo: '👩', score: '4.9 ★ (500)', metric: '1.2k +', secondaryMetric: '1.2k +', finalMetric: '1% - 0.5%', trend: 'up', href: '/ranking/reviewer/reviewer-9' },
            { id: 'reviewer-10', rank: 10, name: 'Ăn vặt Food', logo: '🍟', score: '4.9 ★ (500)', metric: '1.2k +', secondaryMetric: '1.2k +', finalMetric: '1% - 0.5%', href: '/ranking/reviewer/reviewer-10' },
        ],
    },
    foods: {
        label: 'Món ăn',
        filters: ['Khu vực', 'Số lượng xem', 'Số lượng thích', 'Độ tin cậy', 'Số lượt bình luận'],
        columns: {
            primary: 'Món ăn',
            secondary: 'Cửa hàng',
            score: 'Đánh giá',
            metric: 'Đã bán',
        },
        rows: [
            { id: 'food-1', rank: 1, name: 'Trà sữa', secondaryName: 'Lucky - Juice & Tea - Lê Thánh Tôn', secondaryHref: '/explore/store/nearby-3', secondaryLogo: '🥤', score: '4.9 ★ (500)', metric: '1.2k +', trend: 'up', href: '/ranking/food/food-1' },
            { id: 'food-2', rank: 2, name: 'Cơm', secondaryName: 'Cơm Tấm 182 - Lê Thánh Tôn', secondaryHref: '/explore/store/nearby-1', secondaryLogo: '🍽️', score: '4.9 ★ (500)', metric: '1.2k +', href: '/ranking/food/food-2' },
            { id: 'food-3', rank: 3, name: 'Cơm', secondaryName: 'Cơm Tấm, Bún Thịt Nướng & Sinh Tố Sài Gòn Quán', secondaryHref: '/explore/store/nearby-4', secondaryLogo: '🍛', score: '4.9 ★ (500)', metric: '1.2k +', href: '/ranking/food/food-3' },
            { id: 'food-4', rank: 4, name: 'Trà sữa', secondaryName: 'TAKA CHA - Trà Sữa & Chè Sầu Riêng', secondaryHref: '/explore/store/nearby-7', secondaryLogo: '🧋', score: '4.9 ★ (500)', metric: '1.2k +', trend: 'down', href: '/ranking/food/food-4' },
            { id: 'food-5', rank: 5, name: 'Trà sữa', secondaryName: 'Highlands Coffee - AB Tower', secondaryHref: '/explore/store/top-6', secondaryLogo: '☕', score: '4.9 ★ (500)', metric: '1.2k +', href: '/ranking/food/food-5' },
            { id: 'food-6', rank: 6, name: 'Trà sữa', secondaryName: 'Phúc Long - Phạm Hồng Thái', secondaryHref: '/explore/store/top-7', secondaryLogo: '🫖', score: '4.9 ★ (500)', metric: '1.2k +', trend: 'up', href: '/ranking/food/food-6' },
            { id: 'food-7', rank: 7, name: 'Trà sữa', secondaryName: 'Katinat - Phan Bội Châu', secondaryHref: '/explore/store/rec-1', secondaryLogo: '🥤', score: '4.9 ★ (500)', metric: '1.2k +', href: '/ranking/food/food-7' },
            { id: 'food-8', rank: 8, name: 'Trà sữa', secondaryName: 'Phê La - Chợ Bến Thành', secondaryHref: '/explore/store/rec-2', secondaryLogo: '☕', score: '4.9 ★ (500)', metric: '1.2k +', href: '/ranking/food/food-8' },
            { id: 'food-9', rank: 9, name: 'Trà sữa', secondaryName: 'Robusta & Matcha Loves Milk by Boom - Lê Lợi', secondaryHref: '/explore/store/top-8', secondaryLogo: '🧋', score: '4.9 ★ (500)', metric: '1.2k +', trend: 'up', href: '/ranking/food/food-9' },
            { id: 'food-10', rank: 10, name: 'Trà sữa', secondaryName: 'Louis Top Juice - Nước Ép - Trà & Sữa Hạt', secondaryHref: '/explore/store/nearby-5', secondaryLogo: '🥤', score: '4.9 ★ (500)', metric: '1.2k +', href: '/ranking/food/food-10' },
        ],
    },
};
