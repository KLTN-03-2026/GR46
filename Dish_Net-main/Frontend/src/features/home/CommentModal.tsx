'use client';
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { figmaFallbackAssets } from '@/shared/assets/figmaFallback';

const modalAssets = {
    storeImage: figmaFallbackAssets.storeImage,
    reviewerAvatarA: figmaFallbackAssets.reviewerAvatarA,
    reviewerAvatarB: figmaFallbackAssets.reviewerAvatarB,
    reviewFoodA: figmaFallbackAssets.feedDishImage,
    reviewFoodB: figmaFallbackAssets.menuItemImage,
} as const;

type CommentTab = 'all' | 'positive' | 'latest';

const commentTabs: Array<{ id: CommentTab; label: string }> = [
    { id: 'all', label: 'Tất cả' },
    { id: 'positive', label: 'Tích cực' },
    { id: 'latest', label: 'Mới nhất' },
];

const commentItems = [
    {
        id: 'comment-1',
        author: '@vy.fooodieee',
        avatar: modalAssets.reviewerAvatarA,
        rating: '4.8',
        date: '22 thg 02, 2026',
        tone: 'positive' as const,
        title: 'Nước dùng đậm, topping đầy đặn',
        body: 'Mình ăn ở đây vài lần và lần này vẫn ổn định. Nước dùng thơm mùi sả, bò mềm và phần chả khá đầy. Không gian hơi đông giờ trưa nhưng phục vụ vẫn nhanh.',
        image: modalAssets.reviewFoodA,
        likes: 18,
        replies: 4,
        replyItems: [
            {
                id: 'comment-1-reply-1',
                author: '@dishnet.team',
                avatar: modalAssets.reviewerAvatarB,
                date: '22 thg 02, 2026',
                body: 'Cảm ơn bạn đã chia sẻ trải nghiệm rất chi tiết. Bên mình đã note lại phản hồi về khung giờ trưa để tối ưu phục vụ tốt hơn.',
            },
            {
                id: 'comment-1-reply-2',
                author: '@linh.eats',
                avatar: modalAssets.reviewerAvatarA,
                date: '23 thg 02, 2026',
                body: 'Mình cũng thích phần nước dùng ở đây, vị khá cân bằng và không bị ngấy.',
            },
        ],
    },
    {
        id: 'comment-2',
        author: '@hoanganh.review',
        avatar: modalAssets.reviewerAvatarB,
        rating: '4.6',
        date: '19 thg 02, 2026',
        tone: 'positive' as const,
        title: 'Hợp cho bữa trưa văn phòng',
        body: 'Bún bò ở đây vị thanh hơn kiểu Huế đậm cay nhưng khá dễ ăn. Mình thích phần rau và topping sạch sẽ, giá hơi nhỉnh nhưng tương xứng vị trí khu trung tâm.',
        image: modalAssets.reviewFoodB,
        likes: 11,
        replies: 2,
        replyItems: [
            {
                id: 'comment-2-reply-1',
                author: '@minh.foodtrip',
                avatar: modalAssets.reviewerAvatarB,
                date: '19 thg 02, 2026',
                body: 'Chuẩn, quán này hợp dân văn phòng vì lên món nhanh và không gian gọn.',
            },
        ],
    },
    {
        id: 'comment-3',
        author: '@lamfoodnotes',
        avatar: modalAssets.reviewerAvatarA,
        rating: '4.7',
        date: '15 thg 02, 2026',
        tone: 'latest' as const,
        title: 'Quán gọn gàng, lên món nhanh',
        body: 'Mình gọi một tô đầy đủ và chờ chưa tới 10 phút. Bàn ghế sạch, nhân viên hướng dẫn chỗ ngồi nhanh. Nếu thích vị cay hơn thì nên xin thêm sa tế.',
        image: modalAssets.reviewFoodA,
        likes: 7,
        replies: 1,
        replyItems: [
            {
                id: 'comment-3-reply-1',
                author: '@hoangquan',
                avatar: modalAssets.reviewerAvatarB,
                date: '16 thg 02, 2026',
                body: 'Cảm ơn tip sa tế, mình thử rồi và hợp vị hơn hẳn.',
            },
        ],
    },
];

function StarRating({ value }: { value: string }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full bg-[#fff4e6] px-3 py-1.5 text-sm font-semibold text-[#b8691b]">
            <span className="text-base leading-none">★</span>
            {value}
        </div>
    );
}

export default function CommentModal({
    isOpen,
    onClose,
    storeName = 'Nét Huế - Hàng Bông',
    startComposerOpen = false,
}: {
    isOpen: boolean;
    onClose: () => void;
    storeName?: string;
    startComposerOpen?: boolean;
}) {
    const [activeTab, setActiveTab] = useState<CommentTab>('all');
    const [draftComment, setDraftComment] = useState('');
    const [isComposerOpen, setIsComposerOpen] = useState(startComposerOpen);
    const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

    const handleClose = useCallback(() => {
        setIsComposerOpen(false);
        setDraftComment('');
        setExpandedReplies({});
        setReplyingTo(null);
        setReplyDrafts({});
        onClose();
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handleClose();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleClose]);

    const visibleComments = useMemo(() => {
        if (activeTab === 'all') return commentItems;
        if (activeTab === 'positive') return commentItems.filter((item) => item.tone === 'positive');
        return [...commentItems].sort((left, right) => right.date.localeCompare(left.date));
    }, [activeTab]);

    const toggleReplies = (commentId: string) => {
        setExpandedReplies((current) => ({
            ...current,
            [commentId]: !current[commentId],
        }));
    };

    const toggleReplyComposer = (commentId: string) => {
        setReplyingTo((current) => (current === commentId ? null : commentId));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/58 px-4 py-6" onClick={handleClose}>
            <div
                className="relative flex h-[min(86vh,860px)] w-full max-w-[1460px] items-stretch overflow-hidden rounded-[20px] bg-[#fbfbfa] shadow-[0_28px_90px_rgba(0,0,0,0.28)]"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={handleClose}
                    className="absolute right-5 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full text-[30px] leading-none text-[#1f1f1f] transition hover:bg-black/5"
                    aria-label="Đóng bình luận"
                >
                    ×
                </button>

                <aside className="flex h-full w-full max-w-[380px] shrink-0 flex-col overflow-hidden border-r border-[#e7e7e1] bg-white">
                    <div className="border-b border-[#ecece7] px-6 pb-5 pt-7">
                        <img
                            src={modalAssets.storeImage}
                            alt={storeName}
                            className="h-[238px] w-full rounded-[16px] object-cover"
                        />

                        <div className="mt-5 flex items-start gap-4">
                            <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full bg-[#f38b3c] text-[26px] font-bold text-white shadow-[0_10px_18px_rgba(243,139,60,0.28)]">
                                4.8
                            </div>
                            <div className="min-w-0 pt-1">
                                <h2 className="text-[29px] font-semibold leading-[1.08] text-[#292929]">
                                    {storeName}
                                </h2>
                                <p className="mt-2 text-sm leading-7 text-[#7b7b73]">
                                    128 bình luận, 312 lượt đánh giá và nhiều bài review nổi bật từ cộng đồng.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsComposerOpen((current) => !current)}
                            className="mt-6 inline-flex w-full items-center justify-center rounded-[12px] bg-[#1f86ff] px-5 py-3.5 text-[18px] font-semibold text-white transition hover:bg-[#1274ea]"
                        >
                            {isComposerOpen ? 'Ẩn viết bình luận' : 'Viết bình luận'}
                        </button>
                    </div>

                    <div className="flex-1 overflow-hidden p-6" style={{ paddingTop: '5px' }}>
                        <div className="rounded-[16px] bg-[#f7f8f4] p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8e9488]">
                                Tóm tắt
                            </p>
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <div className="rounded-[14px] bg-white p-4">
                                    <p className="text-xs text-[#7f8579]">Độ hài lòng</p>
                                    <p className="mt-2 text-2xl font-bold text-[#2d6c1b]">96%</p>
                                </div>
                                <div className="rounded-[14px] bg-white p-4">
                                    <p className="text-xs text-[#7f8579]">Phục vụ</p>
                                    <p className="mt-2 text-2xl font-bold text-[#2e2e2e]">Nhanh</p>
                                </div>
                                <div className="rounded-[14px] bg-white p-4">
                                    <p className="text-xs text-[#7f8579]">Món nổi bật</p>
                                    <p className="mt-2 text-lg font-bold text-[#2e2e2e]">Bún bò</p>
                                </div>
                                <div className="rounded-[14px] bg-white p-4">
                                    <p className="text-xs text-[#7f8579]">Giá tham khảo</p>
                                    <p className="mt-2 text-lg font-bold text-[#2e2e2e]">55k-95k</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#f8f8f5]">
                    <div className="border-b border-[#e8e8e2] bg-white px-8 pb-5 pt-6 pr-20">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9aa091]">
                                    Cộng đồng DishNet
                                </p>
                                <h3 className="mt-2 text-[28px] font-semibold text-[#2e2e2c]">
                                    Bình luận về {storeName}
                                </h3>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                {commentTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                                            activeTab === tab.id
                                                ? 'bg-[#275d18] text-white'
                                                : 'bg-[#eff2ea] text-[#6f776b] hover:bg-[#e6ebe0]'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {isComposerOpen && (
                            <div className="mt-5 rounded-[16px] border border-[#e2e5dc] bg-[#f7f8f4] p-4">
                                <div className="flex gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#275d18] text-sm font-bold text-white">
                                        N
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <textarea
                                            value={draftComment}
                                            onChange={(event) => setDraftComment(event.target.value)}
                                            rows={2}
                                            placeholder="Chia sẻ cảm nhận của bạn về món ăn, không gian và trải nghiệm tại quán..."
                                            className="w-full resize-none border-none bg-transparent text-[15px] leading-6 text-[#40443d] placeholder:text-[#98a08f] focus:outline-none"
                                        />
                                        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#e3e6de] pt-3">
                                            <div className="flex items-center gap-3 text-sm text-[#7a8275]">
                                                <button type="button" className="rounded-full bg-white px-3 py-1.5 transition hover:bg-[#f0f3eb]">
                                                    + Ảnh
                                                </button>
                                                <button type="button" className="rounded-full bg-white px-3 py-1.5 transition hover:bg-[#f0f3eb]">
                                                    Gắn thẻ món
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                className="rounded-full bg-[#1f86ff] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#1274ea]"
                                            >
                                                Đăng bình luận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto px-8 py-6">
                        <div className="space-y-5">
                            {visibleComments.map((comment) => (
                                <article
                                    key={comment.id}
                                    className="rounded-[18px] border border-[#e6e7df] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div className="flex min-w-0 items-start gap-4">
                                            <img
                                                src={comment.avatar}
                                                alt={comment.author}
                                                className="h-14 w-14 rounded-full object-cover"
                                            />
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <h4 className="text-lg font-semibold text-[#252525]">
                                                        {comment.author}
                                                    </h4>
                                                    <StarRating value={comment.rating} />
                                                </div>
                                                <p className="mt-1 text-sm text-[#8a8f85]">{comment.date}</p>
                                                <h5 className="mt-3 text-[18px] font-semibold text-[#2e2f2c]">
                                                    {comment.title}
                                                </h5>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => toggleReplyComposer(comment.id)}
                                            className="rounded-full bg-[#f4f6ef] px-4 py-2 text-sm font-medium text-[#6f776b] transition hover:bg-[#ecefe7]"
                                        >
                                            {replyingTo === comment.id ? 'Ẩn phản hồi' : 'Phản hồi'}
                                        </button>
                                    </div>

                                    <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_180px]">
                                        <p className="text-[15px] leading-7 text-[#444840]">
                                            {comment.body}
                                        </p>
                                        <img
                                            src={comment.image}
                                            alt={comment.title}
                                            className="h-[124px] w-full rounded-[14px] object-cover"
                                        />
                                    </div>

                                    <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#edf0e7] pt-4 text-sm text-[#7a8174]">
                                        <button type="button" className="rounded-full bg-[#f7f8f4] px-4 py-2 transition hover:bg-[#eef2ea]">
                                            Hữu ích · {comment.likes}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => toggleReplies(comment.id)}
                                            className="rounded-full bg-[#f7f8f4] px-4 py-2 transition hover:bg-[#eef2ea]"
                                        >
                                            Trả lời · {comment.replies}
                                        </button>
                                    </div>

                                    {replyingTo === comment.id && (
                                        <div className="mt-4 rounded-[16px] bg-[#f7f8f4] p-4">
                                            <div className="flex gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#275d18] text-sm font-bold text-white">
                                                    N
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <textarea
                                                        value={replyDrafts[comment.id] ?? ''}
                                                        onChange={(event) =>
                                                            setReplyDrafts((current) => ({
                                                                ...current,
                                                                [comment.id]: event.target.value,
                                                            }))
                                                        }
                                                        rows={2}
                                                        placeholder={`Phản hồi ${comment.author}...`}
                                                        className="w-full resize-none rounded-[12px] border border-[#e1e5dc] bg-white px-4 py-3 text-[14px] leading-6 text-[#40443d] placeholder:text-[#98a08f] focus:outline-none"
                                                    />
                                                    <div className="mt-3 flex justify-end gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setReplyingTo(null);
                                                                setReplyDrafts((current) => ({ ...current, [comment.id]: '' }));
                                                            }}
                                                            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#6f776b] transition hover:bg-[#f0f3eb]"
                                                        >
                                                            Hủy
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="rounded-full bg-[#1f86ff] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1274ea]"
                                                        >
                                                            Gửi phản hồi
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {expandedReplies[comment.id] && comment.replyItems.length > 0 && (
                                        <div className="mt-4 space-y-3 border-t border-[#edf0e7] pt-4">
                                            {comment.replyItems.map((reply) => (
                                                <article
                                                    key={reply.id}
                                                    className="ml-4 rounded-[16px] border border-[#e8ece2] bg-[#fafbf8] p-4"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <img
                                                            src={reply.avatar}
                                                            alt={reply.author}
                                                            className="h-10 w-10 rounded-full object-cover"
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex flex-wrap items-center gap-3">
                                                                <h6 className="text-sm font-semibold text-[#252525]">
                                                                    {reply.author}
                                                                </h6>
                                                                <span className="text-xs text-[#8a8f85]">
                                                                    {reply.date}
                                                                </span>
                                                            </div>
                                                            <p className="mt-2 text-[14px] leading-6 text-[#50544c]">
                                                                {reply.body}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
