import { getExploreStoreById } from '@/features/explore/data';
import { getHomePageData } from '@/features/home/data';

export type StoreDetailMenuItem = {
    id: string;
    name: string;
    note: string;
    price: string;
    image: string;
};

export type StoreDetailReviewCard = {
    id: string;
    author: string;
    date: string;
    excerpt: string;
    heroImage: string;
    gallery: string[];
};

export type StoreDetailComment = {
    id: string;
    author: string;
    source: string;
    date: string;
    rating: string;
    title: string;
    body: string;
    gallery?: string[];
};

export type StoreDetailData = {
    id: string;
    title: string;
    subtitle: string;
    coverImage: string;
    views: string;
    address: string;
    hours: string;
    priceRange: string;
    score: string;
    soldCount: string;
    reviewCount: string;
    commentCount: string;
    menuItems: StoreDetailMenuItem[];
    reviewCards: StoreDetailReviewCard[];
    communityImages: string[];
    comments: StoreDetailComment[];
};

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

export async function getStoreDetailById(id: string): Promise<StoreDetailData | null> {
    const store = getExploreStoreById(id);

    if (!store) return null;

    const homeData = await getHomePageData();
    const menuItems = homeData.menu.items.slice(0, 10).map((item) => ({
        id: item.id,
        name: item.name,
        note: 'Đã được đặt lần',
        price: item.price,
        image: item.image,
    }));

    return {
        id: store.id,
        title: store.title,
        subtitle: 'Nhà hàng - Món Huế - Gia đình, Hội nhóm',
        coverImage: store.image,
        views: '1.0k lượt xem',
        address: store.address,
        hours: '07:00 - 22:00',
        priceRange: '35.000đ - 55.000đ',
        score: (store.rating ?? '4.8').split(' ')[0].replace(',', '.'),
        soldCount: '1K',
        reviewCount: '10',
        commentCount: '200',
        menuItems,
        reviewCards: [
            {
                id: 'review-card-1',
                author: '@vy.fooodieee',
                date: '22 thg 02, 2026',
                excerpt:
                    'Sau lần ăn thử tại quán, mình cảm nhận phần nước dùng rất đậm đà, topping đầy đặn và lên món nhanh. Không gian sạch sẽ, hợp cho bữa trưa hoặc đi nhóm nhỏ.',
                heroImage: homeData.feedPosts[0].images[0],
                gallery: [homeData.feedPosts[0].images[0], homeData.feedPosts[0].images[1], communityImageSet[0], communityImageSet[1]],
            },
            {
                id: 'review-card-2',
                author: '@thi.odieee',
                date: '22 thg 02, 2026',
                excerpt:
                    'Đánh giá nhanh: vị trí tiện, chất lượng món ổn định, tốc độ phục vụ khá nhanh và trải nghiệm tổng thể dễ quay lại lần nữa.',
                heroImage: homeData.feedPosts[1].images[0],
                gallery: [homeData.feedPosts[1].images[0], homeData.feedPosts[1].images[1], communityImageSet[2], communityImageSet[3]],
            },
        ],
        communityImages: communityImageSet,
        comments: [
            {
                id: 'comment-1',
                author: 'Vannguyen',
                source: 'via Android',
                date: '26/8/2020 20:27',
                rating: '4.8',
                title: 'Dịch vụ giao hàng của quán rất chu đáo',
                body:
                    'Mình ăn ở quán khá nhiều lần nhưng hôm nay mới thử đặt ship trên website. Từ lúc quán confirm đơn đến lúc nhận đồ chỉ khoảng 20 phút. Nước và bún trần vẫn còn nóng, rau sống được để riêng nên rất hợp lý.',
            },
            {
                id: 'comment-2',
                author: 'Phuong Tran',
                source: 'via MobileWeb',
                date: '6/1/2020 15:13',
                rating: '4.5',
                title: 'Rất thích không khí và cách phục vụ',
                body:
                    'Giữa phố cổ khá chật chội mình không nghĩ có một nhà hàng đẹp và rộng như vậy. Món ăn ngon, không gian thoáng và nhân viên tư vấn món rất ổn.',
            },
            {
                id: 'comment-3',
                author: 'Foodee_c2vxbctc',
                source: 'via iPhone',
                date: '21/12/2017 7:49',
                rating: '4.9',
                title: 'Quán rất đẹp khá sạch sẽ',
                body:
                    'Đồ ăn không quá cầu kỳ nhưng vị ổn định. Mình gọi bún bò, cơm cá bóng lau kho tộ và chè bắp, tổng thể đều tròn vị. Điểm cộng là lên món khá nhanh và bày biện đẹp.',
                gallery: communityImageSet.slice(2, 8),
            },
        ],
    };
}
