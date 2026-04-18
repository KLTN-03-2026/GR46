import { getHomePageData } from '@/features/home/data';

export type ReviewerProfilePost = {
    id: string;
    date: string;
    content: string;
    images: string[];
    likes: string;
    comments: string;
    shares: string;
    sends: string;
};

export type ReviewerVideo = {
    id: string;
    image: string;
    views: string;
    pinned?: boolean;
};

export type RankingReviewerDetailData = {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    trustScore: string;
    postsCount: string;
    followers: string;
    following: string;
    posts: ReviewerProfilePost[];
    videos: ReviewerVideo[];
};

const videoThumbs = [
    'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
];

export async function getRankingReviewerDetailById(id: string): Promise<RankingReviewerDetailData | null> {
    const homeData = await getHomePageData();
    const avatar = homeData.feedPosts[0]?.authorAvatar;

    if (!avatar) return null;

    const basePosts = homeData.feedPosts.map((post, index) => ({
        id: `${id}-post-${index + 1}`,
        date: post.date,
        content: `${post.review}\n\nQuán phục vụ khá nhanh, gọi món tầm 5–7 phút là có. Không gian tuy không quá rộng nhưng sạch sẽ, ấm cúng.`,
        images: [post.images[0], post.images[1]],
        likes: index === 0 ? '2,4K' : '2,1K',
        comments: index === 0 ? '415' : '368',
        shares: index === 0 ? '159' : '124',
        sends: index === 0 ? '51' : '47',
    }));
    const posts = Array.from({ length: 4 }, (_, cycleIndex) =>
        basePosts.map((post, postIndex) => ({
            ...post,
            id: `${id}-post-${cycleIndex + 1}-${postIndex + 1}`,
        })),
    ).flat();

    return {
        id,
        name: id === 'reviewer-1' ? 'Vyfoodieee' : 'Khu AAAA',
        handle: id === 'reviewer-1' ? 'accclone' : 'food.diary',
        avatar,
        trustScore: '4.9',
        postsCount: '106',
        followers: '51,2k',
        following: '10',
        posts,
        videos: Array.from({ length: 12 }, (_, index) => ({
            id: `${id}-video-${index + 1}`,
            image: videoThumbs[index % videoThumbs.length],
            views: ['14.2K', '1.5M', '993.9K', '591', '2035', '135.8K', '54.4K', '16.6K'][index % 8],
            pinned: index < 3,
        })),
    };
}

export type ReviewerConversation = {
    id: string;
    reviewerName: string;
    reviewerHandle: string;
    avatar: string;
    lastSeen: string;
    messages: Array<{
        id: string;
        from: 'me' | 'them';
        text: string;
        time: string;
    }>;
};

export async function getReviewerConversationById(id: string): Promise<ReviewerConversation | null> {
    const reviewer = await getRankingReviewerDetailById(id);

    if (!reviewer) return null;

    return {
        id,
        reviewerName: reviewer.name,
        reviewerHandle: reviewer.handle,
        avatar: reviewer.avatar,
        lastSeen: '16:37',
        messages: [
            { id: 'm1', from: 'them', text: 'Chào bạn, cảm ơn vì đã follow mình nha.', time: '16:31' },
            { id: 'm2', from: 'me', text: 'Mình rất thích mấy bài review bún bò của bạn.', time: '16:33' },
            { id: 'm3', from: 'them', text: 'Dễ thương quá. Nếu cần mình gợi ý thêm vài quán ổn ở Hoàn Kiếm nhé.', time: '16:35' },
        ],
    };
}
