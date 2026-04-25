import type { HomePageData } from './types';
import { figmaFallbackAssets } from '@/shared/assets/figmaFallback';
import { userContentApi } from '@/shared/userContentApi';

const heroBanner = figmaFallbackAssets.heroBanner;
const dishCollage = figmaFallbackAssets.dishCollage;
const storeImage = figmaFallbackAssets.storeImage;
const reviewerAvatar = figmaFallbackAssets.reviewerAvatarA;
const feedDishImage = figmaFallbackAssets.feedDishImage;

export const homePageBaseData: HomePageData = {
    hero: {
        eyebrow: 'Khám phá ẩm thực',
        title: 'Deal Hôm Nay',
        description:
            'Khám phá những quán đang lên xu hướng, ưu đãi nổi bật và các bài review mới nhất trên DishNet.',
        ctaLabel: 'Xem thêm',
        backgroundImage: heroBanner,
        collageImage: dishCollage,
    },
    filters: ['Danh mục', 'Ẩm thực', 'Quận / Huyện'],
    rankings: {
        stores: [],
        reviewers: [],
    },
    spotlightCards: [],
    feedPosts: [],
    feedPagination: {
        trang: 1,
        so_luong: 12,
        tong_so: 0,
        tong_trang: 0,
    },
    orderPreview: {
        title: '',
        address: '',
        image: storeImage,
        badgeText: '',
    },
    menu: {
        title: 'Thực đơn',
        categories: [],
        items: [],
    },
};

function formatDate(value?: string | null) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('vi-VN');
}

export function mapFeedPosts(feedPayload: any) {
    return Array.isArray(feedPayload?.bai_viet)
        ? feedPayload.bai_viet.map((item: any) => ({
            id: String(item.id),
            type: String(item?.loai_bai_viet ?? 'bai_viet') as 'bai_viet' | 'video' | 'repost',
            authorId: Number(item?.thong_tin_nguoi_dang?.id || 0),
            storeId: item?.cua_hang?.id != null ? Number(item.cua_hang.id) : undefined,
            storeName: item?.cua_hang?.ten_cua_hang ? String(item.cua_hang.ten_cua_hang) : undefined,
            author: item?.thong_tin_nguoi_dang?.ten_hien_thi || 'Người dùng',
            authorAvatar: item?.thong_tin_nguoi_dang?.anh_dai_dien || reviewerAvatar,
            date: item?.ngay_dang ? new Date(item.ngay_dang).toLocaleDateString('vi-VN') : '',
            rating:
                item?.so_sao != null && Number(item.so_sao) > 0
                    ? Number(item.so_sao).toFixed(1)
                    : null,
            review: item?.noi_dung || '',
            followLabel: item?.trang_thai_tuong_tac?.dang_theo_doi_tac_gia
                ? 'Đang theo dõi'
                : 'Follow +',
            tags: [],
            likeCount: Number(item?.tong_tuong_tac?.luot_thich ?? 0),
            commentCount: Number(item?.tong_tuong_tac?.luot_binh_luan ?? 0),
            shareCount: Number(item?.tong_tuong_tac?.luot_chia_se ?? 0),
            saveCount: Number(item?.tong_tuong_tac?.luot_luu ?? 0),
            isLiked: Boolean(item?.trang_thai_tuong_tac?.da_thich),
            images: (Array.isArray(item?.tep_dinh_kem)
                ? item.tep_dinh_kem.filter((image: unknown): image is string => typeof image === 'string')
                : []).slice(0, 2),
            sharedPost: item?.bai_viet_goc
                ? {
                    id: String(item.bai_viet_goc.id),
                    author: String(item.bai_viet_goc?.thong_tin_nguoi_dang?.ten_hien_thi ?? 'Người dùng'),
                    date: item.bai_viet_goc?.ngay_dang ? new Date(item.bai_viet_goc.ngay_dang).toLocaleDateString('vi-VN') : '',
                    content: String(item.bai_viet_goc?.noi_dung ?? ''),
                    images: (Array.isArray(item.bai_viet_goc?.tep_dinh_kem)
                        ? item.bai_viet_goc.tep_dinh_kem.filter((image: unknown): image is string => typeof image === 'string')
                        : []).slice(0, 2),
                }
                : undefined,
        }))
        : [];
}

export function mapDeals(feedPayload: any) {
    const deals = Array.isArray(feedPayload?.deal_hom_nay) ? feedPayload.deal_hom_nay : [];

    return deals.map((deal: any, index: number) => ({
        id: `deal-${deal.id ?? index + 1}`,
        dealId: deal?.id != null ? Number(deal.id) : undefined,
        storeId: deal?.cua_hang?.id != null ? Number(deal.cua_hang.id) : undefined,
        title: String(deal?.cua_hang?.ten_cua_hang ?? deal?.ten_khuyen_mai ?? 'Deal hôm nay'),
        area: String(deal?.ma_khuyen_mai ?? 'Khuyến mãi'),
        address: String(deal?.cua_hang?.ten_cua_hang ?? 'DishNet'),
        excerpt: String(deal?.ten_khuyen_mai ?? 'Ưu đãi đặc biệt đang diễn ra'),
        coverImage: deal?.mon_goi_y?.hinh_anh || deal?.cua_hang?.anh_dai_dien || feedDishImage,
        reviewerAvatar,
        galleryImages: [
            deal?.mon_goi_y?.hinh_anh || feedDishImage,
            deal?.cua_hang?.anh_dai_dien || storeImage,
            feedDishImage,
            storeImage,
        ],
        dishName: String(deal?.mon_goi_y?.ten_mon ?? 'Món gợi ý'),
        originalPrice:
            deal?.mon_goi_y?.gia_ban != null
                ? `${Number(deal.mon_goi_y.gia_ban).toLocaleString('vi-VN')}đ`
                : undefined,
        discountedPrice:
            deal?.mon_goi_y?.gia_sau_giam != null
                ? `${Number(deal.mon_goi_y.gia_sau_giam).toLocaleString('vi-VN')}đ`
                : undefined,
        discountText:
            deal?.mon_goi_y?.so_tien_giam != null
                ? `Giảm ${Number(deal.mon_goi_y.so_tien_giam).toLocaleString('vi-VN')}đ`
                : undefined,
        endAt: formatDate(deal?.thoi_gian_ket_thuc),
    }));
}

export async function getBangTinPage(trang: number, soLuong = 12) {
    const feedPayload: any = await userContentApi.layBangTin({ trang, so_luong: soLuong });
    const spotlightCards = mapDeals(feedPayload);
    const feedPosts = mapFeedPosts(feedPayload);
    const deals = Array.isArray(feedPayload?.deal_hom_nay) ? feedPayload.deal_hom_nay : [];
    const menuCategories = deals.map((deal: any, index: number) => ({
        id: String(deal?.id ?? index + 1),
        label: String(deal?.cua_hang?.ten_cua_hang ?? `Deal ${index + 1}`),
    }));
    const menuItems = deals
        .filter((deal: any) => deal?.mon_goi_y)
        .map((deal: any) => ({
            id: String(deal.mon_goi_y.id),
            name: String(deal.mon_goi_y.ten_mon ?? 'Món gợi ý'),
            price: `${Number(deal.mon_goi_y.gia_sau_giam ?? deal.mon_goi_y.gia_ban ?? 0).toLocaleString('vi-VN')}đ`,
            note: `${String(deal.ten_khuyen_mai ?? 'Khuyến mãi')} (${String(deal.ma_khuyen_mai ?? '')})`.trim(),
            image: String(deal.mon_goi_y.hinh_anh ?? feedDishImage),
            categoryId: String(deal.id),
        }));

    return {
        feedPayload,
        spotlightCards,
        feedPosts,
        menuCategories,
        menuItems,
    };
}

export async function getHomePageData(): Promise<HomePageData> {
    try {
        const [{ feedPayload, spotlightCards, feedPosts, menuCategories, menuItems }, miniPayload] = await Promise.all([
            getBangTinPage(1, 12),
            userContentApi.layBangXepHangMini({ so_luong: 6 }) as Promise<any>,
        ]);
        const deals = Array.isArray(feedPayload?.deal_hom_nay) ? feedPayload.deal_hom_nay : [];

        const stores = Array.isArray(miniPayload?.cua_hang) ? miniPayload.cua_hang : [];
        const reviewers = Array.isArray(miniPayload?.reviewer) ? miniPayload.reviewer : [];

        const firstDeal = deals[0];

        return {
            ...homePageBaseData,
            rankings: {
                stores: stores.map((item: any) => ({
                    rank: String(item.xep_hang),
                    name: item.ten_cua_hang,
                    metric: `${Number(item.diem_danh_gia || 0).toFixed(1)} / ${item.so_don_hang || 0} đã bán`,
                    popularity: `Tỷ lệ hủy ${Number(item.ty_le_huy_don || 0).toFixed(2)}%`,
                })),
                reviewers: reviewers.map((item: any) => ({
                    rank: String(item.xep_hang),
                    name: item.ten_reviewer,
                    metric: `${item.luot_xem || 0} lượt xem`,
                    popularity: `${item.luot_thich || 0} lượt thích`,
                })),
            },
            feedPosts,
            spotlightCards,
            feedPagination: {
                tong_so: Number(feedPayload?.phan_trang_bai_viet?.tong_so ?? feedPosts.length),
                trang: Number(feedPayload?.phan_trang_bai_viet?.trang ?? 1),
                so_luong: Number(feedPayload?.phan_trang_bai_viet?.so_luong ?? 12),
                tong_trang: Number(feedPayload?.phan_trang_bai_viet?.tong_trang ?? 1),
            },
            orderPreview: {
                title: String(firstDeal?.mon_goi_y?.ten_mon ?? firstDeal?.ten_khuyen_mai ?? ''),
                address: String(firstDeal?.cua_hang?.ten_cua_hang ?? ''),
                image: firstDeal?.mon_goi_y?.hinh_anh || firstDeal?.cua_hang?.anh_dai_dien || storeImage,
                badgeText: firstDeal?.ma_khuyen_mai ? `Mã: ${firstDeal.ma_khuyen_mai}` : '',
            },
            menu: {
                title: 'Thực đơn',
                categories: menuCategories,
                items: menuItems,
            },
        };
    } catch {
        return homePageBaseData;
    }
}
