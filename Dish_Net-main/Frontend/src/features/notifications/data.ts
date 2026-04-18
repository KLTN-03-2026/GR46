export type NotificationItem = {
    id: string;
    avatar: string;
    type: 'like' | 'support' | 'follow' | 'comment';
    message: string;
    time: string;
};

export const notificationItems: NotificationItem[] = [
    {
        id: 'notification-1',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        type: 'like',
        message: 'Chichi và 2 người khác đã thích bài viết của bạn',
        time: '4 giờ trước',
    },
    {
        id: 'notification-2',
        avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80',
        type: 'support',
        message: 'Phản hồi về yêu cầu hỗ trợ của bạn. Xem ngay',
        time: '3 giờ trước',
    },
    {
        id: 'notification-3',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        type: 'follow',
        message: 'Choco đã theo dõi bạn',
        time: '2 giờ trước',
    },
    {
        id: 'notification-4',
        avatar: 'https://images.unsplash.com/photo-1542204625-de293a2f8ff2?auto=format&fit=crop&w=200&q=80',
        type: 'support',
        message: 'Phản hồi về yêu cầu hỗ trợ của bạn. Xem ngay',
        time: '3 giờ trước',
    },
    {
        id: 'notification-5',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        type: 'comment',
        message: 'Choco đã bình luận về bài viết của bạn',
        time: '2 tuần',
    },
    {
        id: 'notification-6',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        type: 'comment',
        message: 'Choco đã bình luận về bài viết của bạn',
        time: '2 tuần',
    },
];
