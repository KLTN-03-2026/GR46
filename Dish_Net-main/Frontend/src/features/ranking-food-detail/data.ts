import { getHomePageData } from '@/features/home/data';

export type FoodReviewCard = {
    id: string;
    author: string;
    date: string;
    avatar: string;
    heroImage: string;
    gallery: string[];
    excerpt: string;
    tags: string[];
    stats: {
        likes: string;
        comments: string;
        shares: string;
        sends: string;
    };
};

export type FoodCommentCard = {
    id: string;
    author: string;
    source: string;
    date: string;
    rating: string;
    title: string;
    body: string;
    gallery?: string[];
};

export type RankingFoodDetailData = {
    id: string;
    title: string;
    storeName: string;
    coverImage: string;
    address: string;
    hours: string;
    priceRange: string;
    score: string;
    reviews: FoodReviewCard[];
    comments: FoodCommentCard[];
};

const coverFallback = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80';
const galleryFallback = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=900&q=80',
];
const communityImageSet = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
];

const foodMeta: Record<string, { title: string; storeName: string; score: string; priceRange: string }> = {
    'food-1': { title: 'Bún bò Huế số 1', storeName: 'Nét huế - Hàng bông', score: '4.8', priceRange: '35.000đ - 55.000đ' },
    'food-2': { title: 'Cơm sườn trứng', storeName: 'Khu AAAA', score: '4.8', priceRange: '39.000đ - 62.000đ' },
    'food-3': { title: 'Cơm gà xối mỡ', storeName: 'Khu AAAA', score: '4.7', priceRange: '45.000đ - 69.000đ' },
    'food-4': { title: 'Trà sữa truyền thống', storeName: 'Ăn vặt Food', score: '4.9', priceRange: '32.000đ - 49.000đ' },
    'food-5': { title: 'Bánh tráng trộn', storeName: 'Khu AAAA', score: '4.7', priceRange: '25.000đ - 39.000đ' },
    'food-6': { title: 'Mì cay hải sản', storeName: 'Ăn vặt Food', score: '4.8', priceRange: '49.000đ - 75.000đ' },
    'food-7': { title: 'Bánh mì bò nướng', storeName: 'Khu AAAA', score: '4.8', priceRange: '28.000đ - 45.000đ' },
    'food-8': { title: 'Trà sữa kem cheese', storeName: 'Ăn vặt Food', score: '4.9', priceRange: '36.000đ - 54.000đ' },
    'food-9': { title: 'Mì trộn tóp mỡ', storeName: 'Khu AAAA', score: '4.7', priceRange: '42.000đ - 58.000đ' },
    'food-10': { title: 'Bún bò Huế đặc biệt', storeName: 'Ăn vặt Food', score: '4.9', priceRange: '48.000đ - 72.000đ' },
};

export async function getRankingFoodDetailById(id: string): Promise<RankingFoodDetailData | null> {
    const meta = foodMeta[id];

    if (!meta) return null;

    const homeData = await getHomePageData();
    const avatar = homeData.feedPosts[0]?.authorAvatar ?? coverFallback;
    const heroImage = homeData.feedPosts[0]?.images[0] ?? coverFallback;
    const altHeroImage = homeData.feedPosts[1]?.images[0] ?? coverFallback;
    const feedGallery = [
        homeData.feedPosts[0]?.images[0] ?? galleryFallback[0],
        homeData.feedPosts[0]?.images[1] ?? galleryFallback[1],
        homeData.feedPosts[1]?.images[0] ?? galleryFallback[2],
        homeData.feedPosts[1]?.images[1] ?? galleryFallback[3],
    ];

    return {
        id,
        title: meta.title,
        storeName: meta.storeName,
        coverImage: homeData.menu.items[0]?.image ?? heroImage,
        address: '198 Hàng Bông, P. Hàng Bông, Quận Hoàn Kiếm, Hà Nội',
        hours: '07:00 - 22:00',
        priceRange: meta.priceRange,
        score: meta.score,
        reviews: [
            {
                id: 'review-1',
                author: '@vy.fooodieee',
                date: '22 thg 02, 2026',
                avatar,
                heroImage,
                gallery: feedGallery,
                excerpt:
                    'Sau lần ăn thử tại Nét Huế, mình cảm nhận quán bún bò này rất đáng để thử. Nước dùng đậm đà, thơm mùi sả, topping đầy đặn với thịt bò, chả Huế, gân bò mềm ngon và cả tiết bò tươi. Giá hơi nhỉnh một chút nhưng hoàn toàn tương xứng với chất lượng. Quán phục vụ khá nhanh, gọi món tầm 5-7 phút là có. Không gian tuy không quá rộng nhưng sạch sẽ, ấm cúng. Mình nghĩ đây sẽ là lựa chọn ổn cho bữa trưa. Lần sau nhất định sẽ quay lại!',
                tags: ['Ngon', 'Nên thử', 'Đậm vị'],
                stats: {
                    likes: '159',
                    comments: '51',
                    shares: '159',
                    sends: '51',
                },
            },
            {
                id: 'review-2',
                author: '@thi.odieee',
                date: '22 thg 02, 2026',
                avatar,
                heroImage: altHeroImage,
                gallery: [...feedGallery].reverse(),
                excerpt:
                    'Món ăn lên nhanh, phần thịt mềm và nước dùng khá tròn vị. Điểm mình thích là topping đầy đặn, rau sống tươi và quán giữ được chất lượng đều giữa ăn tại chỗ và gọi mang về. Nếu đang tìm một món chắc bụng, dễ ăn vào buổi trưa thì đây là lựa chọn rất ổn.',
                tags: ['Ngon', 'Nên thử', 'Đậm vị'],
                stats: {
                    likes: '159',
                    comments: '51',
                    shares: '159',
                    sends: '51',
                },
            },
        ],
        comments: [
            {
                id: 'comment-1',
                author: 'Vannguyen',
                source: 'via Android',
                date: '26/8/2020 20:27',
                rating: '★★★★★',
                title: 'Dịch vụ giao hàng của quán rất chu đáo',
                body:
                    'Mình ăn ở quán khá nhiều lần nhưng hôm nay mới thử đặt ship trên website. Từ lúc quán confirm đơn đến lúc nhận đồ chỉ khoảng 20 phút. Thực sự khi mở túi đồ mình rất hài lòng, nước và bún trần vẫn còn nóng hổi, thìa, đũa, tăm được để trong túi giấy riêng, và đồ ăn kèm thì không thiếu một thứ gì luôn, từ các loại rau sống, giá đỗ, hoa chuối tới chanh và ớt chưng. Mùa dịch + buổi trưa nắng nóng ngại ra ngoài ăn thì order về quá là hợp lý.',
            },
            {
                id: 'comment-2',
                author: 'Phuong Tran',
                source: 'via MobileWeb',
                date: '6/1/2020 15:13',
                rating: '★★★★★',
                title: 'Rất thích cái vườn của Nét Huế - Hàng Bông',
                body:
                    'Giữa phố cổ chật chội mình không nghĩ lại có 1 nhà hàng to, rộng, đẹp và có 1 khuân viên vườn thư giãn thích đến vậy. Cây cối to nhỏ có cả: xoài, sứ, ngọc lan, cát đằng, tre trúc...v.v. Có tiếng suối, thác róc rách, cá vàng tung ăn dưới bể... Món ăn thì rất ngon, nhẹ nhàng phù hợp với không gian vô cùng.',
            },
            {
                id: 'comment-3',
                author: 'Foodee_c2vxbctc',
                source: 'via iPhone',
                date: '21/12/2017 7:49',
                rating: '★★★★★',
                title: 'Quán rất đẹp khá sạch sẽ',
                body:
                    'Đồ ăn không ngon như mong đợi! Mình gọi bún bò, cơm cá bống lau kho tộ, cuốn thịt, chè bột lọc và chè bắp. Chè bắp ngon còn lại hết sức bình thường.',
                gallery: communityImageSet.slice(2, 8),
            },
            {
                id: 'comment-4',
                author: 'Foodee_c2vxbctc',
                source: 'via iPhone',
                date: '21/12/2017 7:49',
                rating: '★★★★★',
                title: 'Quán rất đẹp khá sạch sẽ',
                body:
                    'Đồ ăn không ngon như mong đợi! Mình gọi bún bò, cơm cá bống lau kho tộ, cuốn thịt, chè bột lọc và chè bắp. Chè bắp ngon còn lại hết sức bình thường.',
                gallery: communityImageSet.slice(2, 8),
            },
        ],
    };
}
