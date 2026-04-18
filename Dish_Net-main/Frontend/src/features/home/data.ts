import type { HomePageData } from './types';
import { figmaFallbackAssets } from '@/shared/assets/figmaFallback';

const heroBanner = figmaFallbackAssets.heroBanner;
const dishCollage = figmaFallbackAssets.dishCollage;
const storeImage = figmaFallbackAssets.storeImage;
const avatarSmall = figmaFallbackAssets.avatarSmall;
const reviewerAvatar = figmaFallbackAssets.reviewerAvatarA;
const feedDishImage = figmaFallbackAssets.feedDishImage;
const menuItemImage = figmaFallbackAssets.menuItemImage;
const galleryA = [
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=80',
];
const galleryB = [
    'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=1000&q=80',
];

export const homePageMockData: HomePageData = {
    hero: {
        eyebrow: 'Gợi ý cho khách vãng lai',
        title: 'Deal Hôm Nay',
        description:
            'Khám phá những quán đang lên xu hướng, ưu đãi nổi bật và các bài review mới nhất trên DishNet.',
        ctaLabel: 'Xem thêm',
        backgroundImage: heroBanner,
        collageImage: dishCollage,
    },
    filters: ['Danh mục', 'Ẩm thực', 'Quận / Huyện'],
    rankings: {
        stores: [
            { rank: '1', name: 'Bún Bò Gốc Đa', metric: '4.9 / 1.2K đã bán', popularity: '100 người đã ghé' },
            { rank: '2', name: 'Nét Huế Hàng Bông', metric: '4.8 / 950 đã bán', popularity: '92 người đã ghé' },
            { rank: '3', name: 'Bún Chả Cửa Đông', metric: '4.7 / 810 đã bán', popularity: '88 người đã ghé' },
            { rank: '4', name: 'Phở Gánh 1986', metric: '4.7 / 770 đã bán', popularity: '77 người đã ghé' },
            { rank: '5', name: 'Mì Vịt Tiềm An Nam', metric: '4.6 / 690 đã bán', popularity: '73 người đã ghé' },
            { rank: '6', name: 'Bánh Mì Bơm', metric: '4.6 / 640 đã bán', popularity: '68 người đã ghé' },
        ],
        reviewers: [
            { rank: '1', name: '@vy.fooodieee', metric: '128 bài review', popularity: '12.8K người theo dõi' },
            { rank: '2', name: '@anngonmoi', metric: '102 bài review', popularity: '10.1K người theo dõi' },
            { rank: '3', name: '@eatsaigon', metric: '94 bài review', popularity: '9.4K người theo dõi' },
            { rank: '4', name: '@motngayangi', metric: '88 bài review', popularity: '8.9K người theo dõi' },
            { rank: '5', name: '@banhcuonclub', metric: '79 bài review', popularity: '8.1K người theo dõi' },
            { rank: '6', name: '@mlem.chronicle', metric: '74 bài review', popularity: '7.2K người theo dõi' },
        ],
    },
    spotlightCards: [
        {
            id: 'spotlight-1',
            title: 'Bún Bò Gốc Đa',
            area: 'Khu AAAAA',
            address: '4 Ngõ Gạch, Quận Hoàn Kiếm, Hà Nội',
            excerpt:
                "Mình ăn ở quán khá nhiều lần nhưng hôm nay mới thử đặt ship trên website. Từ lúc quán confirm đơn đến lúc nhận đồ chỉ khoảng 20'.",
            coverImage: storeImage,
            reviewerAvatar: avatarSmall,
            galleryImages: galleryA,
        },
        {
            id: 'spotlight-2',
            title: 'Nét Huế Hàng Bông',
            area: 'Khu phố cổ',
            address: '12 Hàng Bông, Quận Hoàn Kiếm, Hà Nội',
            excerpt:
                'Nước dùng đậm vị, topping đầy đặn và giao diện đặt món rất rõ ràng. Đây là quán mình quay lại nhiều nhất trong tháng này.',
            coverImage: storeImage,
            reviewerAvatar: avatarSmall,
            galleryImages: galleryB,
        },
    ],
    feedPosts: [
        {
            id: 'feed-1',
            author: '@vy.fooodieee',
            authorAvatar: reviewerAvatar,
            date: '22 thg 02, 2026',
            rating: '4.6',
            review:
                'Sau lần ăn thử tại Nét Huế, mình cảm nhận quán bún bò này rất đáng để thử. Nước dùng đậm đà, thơm mùi sả, topping đầy đặn với thịt bò, chả Huế, gân bò mềm ngon và cả tiết bò tươi. Giá hơi nhỉnh một chút nhưng hoàn toàn tương xứng với chất lượng.',
            followLabel: 'Follow +',
            tags: ['Ngon', 'Nên thử', 'Đậm vị'],
            images: [feedDishImage, feedDishImage],
        },
        {
            id: 'feed-2',
            author: '@eatsaigon',
            authorAvatar: reviewerAvatar,
            date: '24 thg 02, 2026',
            rating: '4.8',
            review:
                'Điểm mình thích nhất là phần nước dùng rất tròn vị, không bị ngấy. Không gian không quá rộng nhưng sạch và lên món nhanh. Nếu đi nhóm 2 đến 4 người thì rất hợp.',
            followLabel: 'Follow +',
            tags: ['No lâu', 'Quán sạch', 'Giá ổn'],
            images: [feedDishImage, feedDishImage],
        },
    ],
    orderPreview: {
        title: 'Bún Bò Gốc Đa',
        address: '4 Ngõ Gạch, Hoàn Kiếm, Hà Nội',
        image: storeImage,
        badgeText: 'Món nổi bật hôm nay',
    },
    menu: {
        title: 'Thực đơn',
        categories: [
            { id: 'bun', label: 'Món bún' },
            { id: 'com', label: 'Món cơm' },
            { id: 'chao', label: 'Món cháo' },
            { id: 'banh', label: 'Món bánh' },
            { id: 'cuon', label: 'Món cuốn' },
            { id: 'an-choi', label: 'Món ăn chơi' },
            { id: 'lau', label: 'Món lẩu' },
            { id: 'che', label: 'Món chè' },
            { id: 'nuoc-ep', label: 'Nước ép-sinh tố-trà' },
            { id: 'nuoc-ngot', label: 'Nước ngọt' },
        ],
        items: [
            { id: 'bun-1', categoryId: 'bun', name: 'Bún Bò Huế Số 1', price: '56.160đ', note: 'Giá đã bao gồm 10% VAT', image: menuItemImage },
            { id: 'bun-4', categoryId: 'bun', name: 'Bún Bò Huế Số 4', price: '79.920đ', note: 'Giá đã bao gồm 8% VAT', image: menuItemImage },
            { id: 'bun-2', categoryId: 'bun', name: 'Bún Bò Huế Số 2', price: '66.960đ', note: 'Giá đã bao gồm 8% VAT', image: menuItemImage },
            { id: 'bun-db', categoryId: 'bun', name: 'Bún Bò Huế Đặc Biệt', price: '103.680đ', note: 'Giá đã bao gồm 8% VAT', image: menuItemImage },
            { id: 'com-1', categoryId: 'com', name: 'Cơm Thịt Bò Rang Giòn', price: '99.360đ', note: 'Cơm rang, trứng, thịt bò, hành lá, dưa, cà rốt, củ cải muối kèm 1 canh chua thịt', image: menuItemImage },
            { id: 'com-2', categoryId: 'com', name: 'Cơm Thịt Luộc Tôm Chua', price: '77.760đ', note: 'Cơm trắng, thịt ba chỉ luộc, tôm chua Huế, rau xào, củ quả luộc, cải thảo muối kèm 1 canh chua thịt', image: menuItemImage },
            { id: 'com-3', categoryId: 'com', name: 'Cơm Thịt Kho Nước Dừa', price: '73.440đ', note: 'Cơm trắng, thịt ba chỉ kho dừa già, nước dừa, rau xào, củ quả luộc, cải thảo muối kèm 1 canh chua thịt', image: menuItemImage },
        ],
    },
};

export async function getHomePageData(): Promise<HomePageData> {
    return homePageMockData;
}
