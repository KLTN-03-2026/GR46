'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import CommentModal from '@/features/home/CommentModal';
import { userContentApi } from '@/shared/userContentApi';
import { userCommerceApi } from '@/shared/userCommerceApi';
import { useAuth } from '@/shared/AuthContext';

import type {
    EarningsItem,
    EarningsItemStatus,
    ProfilePost,
    EarningsProfile,
    UserProfile,
    WithdrawalAccount,
    WithdrawalStatus,
} from '@/features/profile/data';

type ProfileTab = 'posts' | 'videos' | 'reposts' | 'revenue' | 'withdrawals';
type SortMode = 'latest' | 'oldest';
type EarningsFilter = 'all' | EarningsItemStatus;
type WithdrawalFilter = 'all' | WithdrawalStatus;

function GridIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-current">
            <path d="M3 3h5v5H3V3Zm0 9h5v5H3v-5Zm9-9h5v5h-5V3Zm0 9h5v5h-5v-5Z" />
        </svg>
    );
}

function VideoIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
            <rect x="3.25" y="4.25" width="13.5" height="11.5" rx="2.25" />
            <path d="m8 7 5 3-5 3V7Z" fill="currentColor" stroke="none" />
        </svg>
    );
}

function RepostIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6h7l-1.8-2" />
            <path d="M14 14H7l1.8 2" />
            <path d="M13 6l2 2.2L13 10.5" />
            <path d="M7 14l-2-2.2L7 9.5" />
        </svg>
    );
}

function ShareIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="5" cy="10" r="2" />
            <circle cx="14.5" cy="5" r="2" />
            <circle cx="14.5" cy="15" r="2" />
            <path d="m6.8 9 5.6-3" />
            <path d="m6.8 11 5.6 3" />
        </svg>
    );
}

function WalletIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16.5 6H5a1.75 1.75 0 0 1 0-3.5h11.5" />
            <path d="M3 6.5h13.5v7.75A1.75 1.75 0 0 1 14.75 16H4.75A1.75 1.75 0 0 1 3 14.25V6.5Z" />
            <circle cx="12.8" cy="10.8" r="1.1" fill="currentColor" stroke="none" />
        </svg>
    );
}

function HistoryIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 10a6.5 6.5 0 1 0 2.3-5" />
            <path d="M3.5 3.5v4h4" />
            <path d="M10 6.4v4l2.8 1.7" />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4.5 w-4.5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="9" r="5.5" />
            <path d="m13.5 13.5 3 3" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round">
            <path d="M5 5 15 15" />
            <path d="M15 5 5 15" />
        </svg>
    );
}

function MoreIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 fill-current">
            <circle cx="4" cy="10" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="16" cy="10" r="1.5" />
        </svg>
    );
}

function SearchImageIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="14" height="14" rx="2.5" />
            <circle cx="7.25" cy="7.25" r="1.2" />
            <path d="m17 13-3.5-3.5a1.8 1.8 0 0 0-2.55 0L3 17" />
        </svg>
    );
}

type Follower = {
    id: number;
    ten_hien_thi: string;
    ten_dang_nhap: string;
    anh_dai_dien: string | null;
};

function FollowersModal({ onClose, profileId, isOwner }: { onClose: () => void; profileId: number; isOwner: boolean }) {
    const [keyword, setKeyword] = useState('');
    const [followers, setFollowers] = useState<Follower[]>([]);
    const [loading, setLoading] = useState(true);
    const [confirmTarget, setConfirmTarget] = useState<Follower | null>(null);
    const [removing, setRemoving] = useState(false);

    const load = async (kw?: string) => {
        setLoading(true);
        try {
            const res = (await userContentApi.layDanhSachNguoiTheoDoi(kw, profileId)) as Follower[];
            setFollowers(Array.isArray(res) ? res : []);
        } catch {
            setFollowers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { void load(); }, []);

    const handleSearch = (value: string) => {
        setKeyword(value);
        void load(value || undefined);
    };

    const handleRemove = async () => {
        if (!confirmTarget || removing) return;
        setRemoving(true);
        try {
            await userContentApi.xoaNguoiTheoDoi(confirmTarget.id);
            setFollowers((current) => current.filter((f) => f.id !== confirmTarget.id));
            setConfirmTarget(null);
        } finally {
            setRemoving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
            <div
                className="relative w-full max-w-[500px] overflow-hidden rounded-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-[#efefef] px-6 py-5">
                    <h2 className="text-[20px] font-bold text-black">Người theo dõi</h2>
                    <button type="button" onClick={onClose} className="text-[30px] leading-none text-[#888] transition hover:text-black">×</button>
                </div>

                <div className="px-6 py-4">
                    <label className="flex items-center gap-2 rounded-full bg-[#f3f3f3] px-4 py-2.5">
                        <SearchIcon />
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Tìm kiếm"
                            className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#aaa]"
                        />
                    </label>
                </div>

                <div className="max-h-[420px] overflow-y-auto px-4 pb-5">
                    {loading ? (
                        <p className="py-8 text-center text-sm text-[#888]">Đang tải...</p>
                    ) : followers.length === 0 ? (
                        <p className="py-8 text-center text-sm text-[#888]">Chưa có người theo dõi nào.</p>
                    ) : (
                        <div className="space-y-1">
                            {followers.map((f) => (
                                <div key={f.id} className="flex items-center gap-3 rounded-[12px] px-2 py-3 transition hover:bg-[#fafafa]">
                                    {f.anh_dai_dien
                                        ? <img src={f.anh_dai_dien} alt={f.ten_hien_thi} className="h-12 w-12 shrink-0 rounded-full object-cover" />
                                        : <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e5e7eb] text-lg">👤</div>
                                    }
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[16px] font-semibold text-[#1f2937]">{f.ten_hien_thi}</p>
                                        <p className="text-sm text-[#9ca3af]">@{f.ten_dang_nhap}</p>
                                    </div>
                                    {isOwner && (
                                        <button
                                            type="button"
                                            onClick={() => setConfirmTarget(f)}
                                            className="shrink-0 rounded-[10px] border border-[#e5e7eb] bg-white px-4 py-1.5 text-[14px] font-semibold text-[#374151] transition hover:bg-[#f9fafb]"
                                        >
                                            Xóa
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {confirmTarget ? (
                <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4" onClick={() => setConfirmTarget(null)}>
                    <div
                        className="w-full max-w-[360px] overflow-hidden rounded-[24px] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col items-center px-6 pt-8 pb-2">
                            {confirmTarget.anh_dai_dien
                                ? <img src={confirmTarget.anh_dai_dien} alt={confirmTarget.ten_hien_thi} className="h-20 w-20 rounded-full object-cover" />
                                : <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e5e7eb] text-3xl">👤</div>
                            }
                            <h3 className="mt-4 text-[20px] font-bold text-black">Xóa người theo dõi?</h3>
                            <p className="mt-2 text-center text-sm text-[#6b7280]">
                                DishNet sẽ không thông báo cho <strong>{confirmTarget.ten_hien_thi}</strong> rằng bạn đã xóa họ khỏi danh sách người theo dõi.
                            </p>
                        </div>
                        <div className="mt-4 divide-y divide-[#f0f0f0] border-t border-[#f0f0f0]">
                            <button
                                type="button"
                                onClick={() => void handleRemove()}
                                disabled={removing}
                                className="w-full py-4 text-[16px] font-semibold text-[#ef4444] transition hover:bg-[#fff5f5]"
                            >
                                {removing ? 'Đang xóa...' : 'Xóa'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setConfirmTarget(null)}
                                className="w-full py-4 text-[16px] text-[#374151] transition hover:bg-[#fafafa]"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function FollowingModal({ onClose }: { onClose: () => void }) {
    const [keyword, setKeyword] = useState('');
    const [following, setFollowing] = useState<Follower[]>([]);
    const [loading, setLoading] = useState(true);
    const [confirmTarget, setConfirmTarget] = useState<Follower | null>(null);
    const [unfollowing, setUnfollowing] = useState(false);

    const load = async (kw?: string) => {
        setLoading(true);
        try {
            const res = (await userContentApi.layDanhSachDangTheoDoi(kw)) as Follower[];
            setFollowing(Array.isArray(res) ? res : []);
        } catch {
            setFollowing([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { void load(); }, []);

    const handleSearch = (value: string) => {
        setKeyword(value);
        void load(value || undefined);
    };

    const handleUnfollow = async () => {
        if (!confirmTarget || unfollowing) return;
        setUnfollowing(true);
        try {
            await userContentApi.toggleTheoDoiNguoiDung(confirmTarget.id);
            setFollowing((current) => current.filter((f) => f.id !== confirmTarget.id));
            setConfirmTarget(null);
        } finally {
            setUnfollowing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
            <div
                className="relative w-full max-w-[500px] overflow-hidden rounded-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-[#efefef] px-6 py-5">
                    <h2 className="text-[20px] font-bold text-black">Đang theo dõi</h2>
                    <button type="button" onClick={onClose} className="text-[30px] leading-none text-[#888] transition hover:text-black">×</button>
                </div>

                <div className="px-6 py-4">
                    <label className="flex items-center gap-2 rounded-full bg-[#f3f3f3] px-4 py-2.5">
                        <SearchIcon />
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Tìm kiếm"
                            className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#aaa]"
                        />
                    </label>
                </div>

                <div className="max-h-[420px] overflow-y-auto px-4 pb-5">
                    {loading ? (
                        <p className="py-8 text-center text-sm text-[#888]">Đang tải...</p>
                    ) : following.length === 0 ? (
                        <p className="py-8 text-center text-sm text-[#888]">Chưa theo dõi ai.</p>
                    ) : (
                        <div className="space-y-1">
                            {following.map((f) => (
                                <div key={f.id} className="flex items-center gap-3 rounded-[12px] px-2 py-3 transition hover:bg-[#fafafa]">
                                    {f.anh_dai_dien
                                        ? <img src={f.anh_dai_dien} alt={f.ten_hien_thi} className="h-12 w-12 shrink-0 rounded-full object-cover" />
                                        : <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e5e7eb] text-lg">👤</div>
                                    }
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[16px] font-semibold text-[#1f2937]">{f.ten_dang_nhap}</p>
                                        <p className="text-sm text-[#9ca3af]">{f.ten_hien_thi}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setConfirmTarget(f)}
                                        className="shrink-0 rounded-[10px] border border-[#e5e7eb] bg-white px-4 py-1.5 text-[14px] font-semibold text-[#374151] transition hover:bg-[#f9fafb]"
                                    >
                                        Đang theo dõi
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {confirmTarget ? (
                <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4" onClick={() => setConfirmTarget(null)}>
                    <div
                        className="w-full max-w-[360px] overflow-hidden rounded-[24px] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col items-center px-6 pt-8 pb-6">
                            {confirmTarget.anh_dai_dien
                                ? <img src={confirmTarget.anh_dai_dien} alt={confirmTarget.ten_hien_thi} className="h-20 w-20 rounded-full object-cover" />
                                : <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e5e7eb] text-3xl">👤</div>
                            }
                            <p className="mt-5 text-center text-[16px] text-[#1f2937]">
                                Bỏ theo dõi @{confirmTarget.ten_dang_nhap}?
                            </p>
                        </div>
                        <div className="divide-y divide-[#f0f0f0] border-t border-[#f0f0f0]">
                            <button
                                type="button"
                                onClick={() => void handleUnfollow()}
                                disabled={unfollowing}
                                className="w-full py-4 text-[16px] font-bold text-[#ef4444] transition hover:bg-[#fff5f5]"
                            >
                                {unfollowing ? 'Đang xử lý...' : 'Bỏ theo dõi'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setConfirmTarget(null)}
                                className="w-full py-4 text-[16px] text-[#374151] transition hover:bg-[#fafafa]"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function RevenuePostDetailModal({
    postId,
    onClose,
}: {
    postId: number | null;
    onClose: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [detail, setDetail] = useState<{
        title: string;
        author: string;
        createdAt: string;
        content: string;
        mediaUrls: string[];
    } | null>(null);

    useEffect(() => {
        if (!postId) return;
        let active = true;
        setLoading(true);
        setError(null);
        setDetail(null);

        userContentApi
            .layChiTietBaiViet(postId)
            .then((payload: unknown) => {
                if (!active) return;
                const data = (payload ?? {}) as Record<string, unknown>;
                const author = (data.thong_tin_nguoi_dang ?? {}) as Record<string, unknown>;
                const media = Array.isArray(data.tep_dinh_kem) ? data.tep_dinh_kem : [];
                const mediaUrls = media
                    .map((item) => {
                        if (typeof item === 'string') return item;
                        if (item && typeof item === 'object' && 'url' in item) {
                            const url = (item as { url?: unknown }).url;
                            return typeof url === 'string' ? url : null;
                        }
                        return null;
                    })
                    .filter((item): item is string => typeof item === 'string');

                setDetail({
                    title: String(data.noi_dung ?? 'Bài viết'),
                    author: String(author.ten_hien_thi ?? 'Người dùng'),
                    createdAt: data.ngay_dang
                        ? new Date(String(data.ngay_dang)).toLocaleString('vi-VN')
                        : '',
                    content: String(data.noi_dung ?? ''),
                    mediaUrls,
                });
            })
            .catch((e) => {
                if (!active) return;
                setError(e instanceof Error ? e.message : 'Không tải được chi tiết bài viết');
            })
            .finally(() => {
                if (!active) return;
                setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [postId]);

    if (!postId) return null;

    return (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
            <div className="w-full max-w-[760px] rounded-[16px] bg-white p-5 shadow-[0_18px_40px_rgba(0,0,0,0.2)]" onClick={(event) => event.stopPropagation()}>
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-[22px] font-bold text-black">Chi tiết bài viết</h3>
                    <button type="button" onClick={onClose} className="text-[34px] leading-none text-[#555]">×</button>
                </div>

                {loading ? <p className="text-[14px] text-[#666]">Đang tải...</p> : null}
                {error ? <p className="text-[14px] text-red-500">{error}</p> : null}
                {!loading && !error && detail ? (
                    <div className="space-y-3">
                        <p className="text-[14px] text-[#666]">
                            <strong className="text-black">{detail.author}</strong>
                            {detail.createdAt ? ` • ${detail.createdAt}` : ''}
                        </p>
                        <p className="whitespace-pre-wrap text-[16px] text-black">{detail.content || detail.title}</p>
                        {detail.mediaUrls.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3">
                                {detail.mediaUrls.map((url) => (
                                    <img key={url} src={url} alt="" className="h-[180px] w-full rounded-[10px] object-cover" />
                                ))}
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function Badge({ children, tone = 'yellow' }: { children: ReactNode; tone?: 'yellow' | 'pink' }) {
    const toneClass = tone === 'yellow'
        ? 'bg-[#faedc8] text-[#202020]'
        : 'bg-[#ffd8d0] text-[#202020]';

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-[12px] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.02em] ${toneClass}`}>
            {children}
        </span>
    );
}

function CreatePostModal({
    profile,
    onClose,
    onSubmit,
    initialData,
}: {
    profile: UserProfile;
    onClose: () => void;
    onSubmit: (payload: {
        content: string;
        mediaUrls: string[];
        monetize: boolean;
        dishLink: string;
        visibility: 'cong_khai' | 'ban_be';
    }) => Promise<void>;
    initialData?: {
        content: string;
        mediaUrls: string[];
        monetize: boolean;
        dishLink: string;
        visibility: 'cong_khai' | 'ban_be';
    };
}) {
    const { nguoiDung } = useAuth();
    // Nhà sáng tạo (đã duyệt) và chủ cửa hàng đều được gắn link đặt món
    const canAttachLink = Boolean(
        nguoiDung?.la_nha_sang_tao ||
        nguoiDung?.trang_thai_kiem_tien_noi_dung === 'da_duyet' ||
        nguoiDung?.la_chu_cua_hang,
    );
    const [isOrderLink, setIsOrderLink] = useState(Boolean(initialData?.monetize));
    const [content, setContent] = useState(initialData?.content ?? '');
    const [mediaUrls, setMediaUrls] = useState<string[]>(initialData?.mediaUrls ?? []);
    const [dishLink, setDishLink] = useState(initialData?.dishLink ?? '');
    const [visibility, setVisibility] = useState<'cong_khai' | 'ban_be'>(
        initialData?.visibility ?? 'cong_khai',
    );
    const [isUploadingMedia, setIsUploadingMedia] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const canSubmit =
        (content.trim().length > 0 || mediaUrls.length > 0) &&
        !isSubmitting &&
        !isUploadingMedia;

    const handleSubmit = async () => {
        if (!canSubmit) return;
        try {
            setIsSubmitting(true);
            await onSubmit({
                content: content.trim(),
                mediaUrls,
                monetize: canAttachLink && isOrderLink,
                dishLink: canAttachLink && isOrderLink ? dishLink.trim() : '',
                visibility,
            });
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePickMedia = () => {
        fileInputRef.current?.click();
    };

    const handleMediaChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        if (files.length === 0) return;
        setIsUploadingMedia(true);
        try {
            const uploaded = await Promise.all(
                files.map((file) => userContentApi.uploadTepBaiViet(file)),
            );
            setMediaUrls((current) => [...current, ...uploaded.map((item) => item.url)]);
        } finally {
            setIsUploadingMedia(false);
            event.target.value = '';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-center bg-black/40 px-4 pt-[10vh] backdrop-blur-sm">
            <div className="h-fit w-full max-w-[500px] rounded-[12px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                <div className="flex items-center justify-between border-b border-[#e5e5e5] px-5 py-4">
                    <button onClick={onClose} className="text-[15px] font-medium text-[#666] transition hover:text-black">
                        Hủy
                    </button>
                    <h2 className="text-[18px] font-bold text-black">Tạo bài viết</h2>
                    <div className="w-[30px]" />
                </div>

                <div className="p-5">
                    <div className="flex gap-3">
                        <img src={profile.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-black">{profile.handle}</span>
                                <div className="flex items-center gap-1 rounded bg-[#e4e6eb] px-2 py-0.5 text-[12px] font-medium text-[#050505]">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                    <select
                                        value={visibility}
                                        onChange={(event) =>
                                            setVisibility(event.target.value as 'cong_khai' | 'ban_be')
                                        }
                                        className="bg-transparent outline-none"
                                    >
                                        <option value="cong_khai">Công khai</option>
                                        <option value="ban_be">Bạn bè</option>
                                    </select>
                                </div>
                            </div>

                            <textarea
                                placeholder="Có gì mới?"
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                                className="mt-2 w-full resize-none bg-transparent text-[16px] outline-none placeholder:text-[#8a8d91]"
                                rows={3}
                                autoFocus
                            />

                            <div className="mt-2 flex items-center gap-4 text-[#65676b]">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*,video/*"
                                    className="hidden"
                                    onChange={(event) => void handleMediaChange(event)}
                                />
                                <button type="button" onClick={handlePickMedia} className="transition hover:text-black">
                                    <SearchImageIcon />
                                </button>
                                {isUploadingMedia ? <span className="text-[12px] text-[#8a8d91]">Đang tải tệp...</span> : null}
                            </div>

                            {mediaUrls.length > 0 ? (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {mediaUrls.map((url) => (
                                        <button
                                            key={url}
                                            type="button"
                                            onClick={() => setMediaUrls((current) => current.filter((item) => item !== url))}
                                            className="max-w-[220px] truncate rounded-full bg-[#f1f3f5] px-3 py-1 text-[12px] text-[#4b4f56]"
                                            title="Bấm để bỏ tệp"
                                        >
                                            {url.split('/').pop()} ×
                                        </button>
                                    ))}
                                </div>
                            ) : null}

                            {content.trim().length === 0 && mediaUrls.length === 0 ? (
                                <p className="mt-3 text-[12px] text-[#8a8d91]">Vui lòng nhập nội dung hoặc thêm phương tiện</p>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-5 pt-8">
                    {canAttachLink ? (
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-[#1a6e14]">Đặt món</span>
                            <button
                                type="button"
                                onClick={() => setIsOrderLink(!isOrderLink)}
                                className={`relative flex h-[22px] w-10 items-center rounded-full transition-colors ${isOrderLink ? 'bg-[#1a6e14]' : 'bg-[#8a8d91]'}`}
                            >
                                <span className={`inline-block h-[18px] w-[18px] rounded-full bg-white shadow transition-transform ${isOrderLink ? 'translate-x-5' : 'translate-x-0.5'}`} />
                            </button>
                            <input
                                type="text"
                                placeholder="Link món"
                                value={dishLink}
                                onChange={(event) => setDishLink(event.target.value)}
                                className="h-[34px] w-[180px] rounded-[6px] border border-[#ced0d4] px-3 text-[14px] outline-none transition focus:border-[#1a6e14]"
                                disabled={!isOrderLink}
                                style={{ opacity: isOrderLink ? 1 : 0.6 }}
                            />
                        </div>
                    ) : (
                        <div />
                    )}

                    <button
                        type="button"
                        onClick={() => void handleSubmit()}
                        disabled={!canSubmit}
                        className={`rounded-[8px] border px-6 py-1.5 font-bold transition ${
                            canSubmit
                                ? 'border-[#2f8e2a] bg-[#2f8e2a] text-white hover:bg-[#277823]'
                                : 'border-[#f0f0f0] text-[#bcc0c4]'
                        }`}
                    >
                        {isSubmitting ? 'Đang đăng...' : 'Đăng'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function CreatePostBox({ profile, onClick }: { profile: UserProfile; onClick: () => void }) {
    return (
        <div className="border-t border-[#d9d9d9] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
                <img src={profile.avatar} alt={profile.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                <button
                    type="button"
                    onClick={onClick}
                    className="flex h-11 flex-1 items-center rounded-full border border-[#d8d8d8] px-4 text-left text-[14px] text-[#9b9b9b] transition hover:bg-[#fafafa]"
                >
                    Có gì mới
                </button>
                <button
                    type="button"
                    onClick={onClick}
                    className="rounded-full bg-[#111111] px-4 py-2 text-[14px] font-bold text-white transition hover:bg-[#2c2c2c]"
                >
                    Đăng
                </button>
            </div>
        </div>
    );
}

function PostMenu({
    isOpen,
    onToggle,
    onClose,
    onEdit,
    onDelete,
}: {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <div className="relative">
            <button
                type="button"
                onClick={onToggle}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#696969] transition hover:bg-[#f3f3f3]"
                aria-label="Tùy chọn bài viết"
            >
                <MoreIcon />
            </button>
            {isOpen ? (
                <div className="absolute right-0 top-[calc(100%+6px)] z-10 w-[132px] rounded-[10px] border border-[#ebebeb] bg-white py-1 shadow-[0_16px_32px_rgba(0,0,0,0.12)]">
                    <button type="button" onClick={onEdit} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#222] transition hover:bg-[#f7f7f7]">
                        <span>📝</span>
                        <span>Chỉnh sửa</span>
                    </button>
                    <button type="button" onClick={onDelete} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#222] transition hover:bg-[#f7f7f7]">
                        <span>🗑️</span>
                        <span>Xóa bài viết</span>
                    </button>
                </div>
            ) : null}
        </div>
    );
}

const REPORT_REASONS: Array<{ value: string; label: string }> = [
    { value: 'duoi_18_tuoi', label: 'Vấn đề liên quan đến người dưới 18 tuổi' },
    { value: 'bat_nat_quay_roi', label: 'Bắt nạt, quấy rối hoặc lăng mạ/lạm dụng/ngược đãi' },
    { value: 'tu_tu_tu_hai', label: 'Tự tử hoặc tự hại bản thân' },
    { value: 'bao_luc_thu_ghet', label: 'Nội dung mang tính bạo lực, thù ghét hoặc gây phiền toái' },
    { value: 'hang_hoa_han_che', label: 'Bán hoặc quảng bá mặt hàng bị hạn chế' },
    { value: 'noi_dung_nguoi_lon', label: 'Nội dung người lớn' },
    { value: 'thong_tin_sai_su_that', label: 'Thông tin sai sự thật, lừa đảo hoặc gian lận' },
    { value: 'so_huu_tri_tue', label: 'Quyền sở hữu trí tuệ' },
    { value: 'khong_muon_xem', label: 'Tôi không muốn xem nội dung này' },
];

function ReportPostModal({ isOpen, isSubmitting, onClose, onPickReason }: {
    isOpen: boolean; isSubmitting: boolean; onClose: () => void;
    onPickReason: (reason: { value: string; label: string }) => void;
}) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/50 px-4 py-6" onClick={onClose}>
            <div className="w-full max-w-[760px] overflow-hidden rounded-[18px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.24)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
                    <h3 className="text-[42px] font-bold text-black">Báo cáo</h3>
                    <button type="button" onClick={onClose} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef1f5] text-[34px] leading-none text-[#59606b]" aria-label="Đóng">×</button>
                </div>
                <div className="border-b border-[#eceff1] px-6 py-5">
                    <p className="text-[18px] font-semibold text-[#111827]">Tại sao bạn báo cáo bài viết này?</p>
                    <p className="mt-2 text-[15px] leading-7 text-[#6b7280]">Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy tìm ngay sự giúp đỡ trước khi báo cáo với DishNet.</p>
                </div>
                <div className="max-h-[56vh] overflow-y-auto px-2 py-2">
                    {REPORT_REASONS.map((reason) => (
                        <button key={reason.value} type="button" onClick={() => onPickReason(reason)} disabled={isSubmitting}
                            className="w-full border-b border-[#f1f3f5] px-5 py-4 text-left transition hover:bg-[#f8fafc] disabled:cursor-not-allowed">
                            <p className="text-[17px] font-semibold text-[#111827]">{reason.label}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ReportDoneModal({ isOpen, authorName, onClose }: { isOpen: boolean; authorName: string; onClose: () => void }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[96] flex items-center justify-center bg-black/50 px-4 py-6" onClick={onClose}>
            <div className="w-full max-w-[660px] overflow-hidden rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.22)]" onClick={(e) => e.stopPropagation()}>
                <div className="px-6 py-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f5e9] text-[#2f8f22]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m5 12 4 4 10-10" /></svg>
                    </div>
                    <p className="text-[34px] font-bold leading-tight text-[#111827]">Cảm ơn bạn đã cho chúng tôi biết.</p>
                    <p className="mx-auto mt-2 max-w-[560px] text-[15px] leading-7 text-[#6b7280]">Chúng tôi sử dụng ý kiến đóng góp của bạn để giúp hệ thống biết được khi có nội dung vi phạm.</p>
                </div>
                <div className="border-t border-[#eceff1] px-6 py-5">
                    <p className="mb-4 text-[20px] font-bold text-[#111827]">Các bước khác bạn có thể thực hiện</p>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 px-1 py-1">
                            <svg className="mt-1 shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.8-3.1 4.6-4.6 8-4.6s6.2 1.5 8 4.6"/></svg>
                            <p className="text-[18px] font-semibold text-[#111827]">Chặn {authorName}</p>
                        </div>
                        <div className="flex items-start gap-3 px-1 py-1">
                            <svg className="mt-1 shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.72 3h16.92a2 2 0 0 0 1.72-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
                            <div><p className="text-[18px] font-semibold text-[#111827]">Báo cáo với quản trị viên</p><p className="text-[14px] text-[#6b7280]">Thông báo cho quản trị viên về bài viết này.</p></div>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} className="mt-5 w-full rounded-[12px] bg-[#111827] py-3 text-[16px] font-semibold text-white transition hover:opacity-90">Đóng</button>
                </div>
            </div>
        </div>
    );
}

function PostCard({
    post,
    profile,
    canShare = true,
    canEditPost = true,
    onLike,
    onComment,
    onShare,
    onReport,
    onOpenDishLink,
    onEditPost,
    onDeletePost,
}: {
    post: UserProfile['posts'][number];
    profile: UserProfile;
    canShare?: boolean;
    canEditPost?: boolean;
    onLike: () => void;
    onComment: () => void;
    onShare: () => void;
    onReport: () => void;
    onOpenDishLink: () => void;
    onEditPost: () => void;
    onDeletePost: () => void;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isRepost = post.type === 'repost' || Boolean(post.sharedPost);
    const shareDisabled = isRepost || !canShare;
    const isVideoUrl = (url: string) => /\.(mp4|mov|avi|mkv)(\?|#|$)/i.test(url);

    return (
        <article className="border-t border-[#d9d9d9] px-4 py-5 sm:px-6">
            <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-4 sm:grid-cols-[44px_minmax(0,1fr)]">
                <div className="flex flex-col items-center">
                    <img src={profile.avatar} alt={profile.name} className="h-10 w-10 rounded-full object-cover" />
                    <div className="mt-3 h-full w-px bg-[#ececec]" />
                </div>

                <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="text-[16px] font-bold text-black">@{profile.handle}</span>
                                <span className="text-[11px] text-[#8c8c8c]">{post.date}</span>
                            </div>
                        </div>
                        {canEditPost ? (
                            <PostMenu
                                isOpen={isMenuOpen}
                                onToggle={() => setIsMenuOpen((current) => !current)}
                                onClose={() => setIsMenuOpen(false)}
                                onEdit={() => {
                                    setIsMenuOpen(false);
                                    onEditPost();
                                }}
                                onDelete={() => {
                                    setIsMenuOpen(false);
                                    onDeletePost();
                                }}
                            />
                        ) : null}
                    </div>

                    <div className="mt-3 space-y-2 text-[13px] leading-7 text-[#535353]">
                        <p className="whitespace-pre-wrap">{post.content}</p>
                    </div>

                    {isRepost && post.sharedPost ? (
                        <div className="mt-4 rounded-[14px] border border-dashed border-[#dfe6d8] bg-[#f8fbf7] p-4">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-[13px] font-semibold text-[#285e19]">{post.sharedPost.author}</p>
                                <p className="text-[11px] text-[#7d7d7d]">{post.sharedPost.date}</p>
                            </div>
                            <p className="mt-2 whitespace-pre-wrap text-[13px] leading-6 text-[#444]">{post.sharedPost.content}</p>
                            {post.sharedPost.images.length > 0 ? (
                                <div className="mt-4 grid max-w-[424px] grid-cols-2 gap-3">
                                    {post.sharedPost.images.slice(0, 2).map((image, index) => (
                                        <img
                                            key={`${post.id}-shared-${index}`}
                                            src={image}
                                            alt=""
                                            className="h-[154px] w-full rounded-[10px] object-cover sm:h-[168px]"
                                        />
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    ) : post.images.length > 0 ? (
                        <div className="mt-4 grid max-w-[424px] grid-cols-2 gap-3">
                            {post.images.slice(0, 2).map((image, index) => (
                                isVideoUrl(image) ? (
                                    <video
                                        key={`${post.id}-${index}`}
                                        src={image}
                                        controls
                                        className="h-[154px] w-full rounded-[10px] object-cover sm:h-[168px]"
                                    />
                                ) : (
                                    <img
                                        key={`${post.id}-${index}`}
                                        src={image}
                                        alt=""
                                        className="h-[154px] w-full rounded-[10px] object-cover sm:h-[168px]"
                                    />
                                )
                            ))}
                        </div>
                    ) : null}

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[#5b5b5b]">
                        <button type="button" onClick={onLike} className="flex items-center gap-1.5 transition hover:text-[#e53935]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                            {post.likes}
                        </button>
                        <button type="button" onClick={onComment} className="flex items-center gap-1.5 transition hover:text-[#285e19]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            {post.comments}
                        </button>
                        <button
                            type="button"
                            onClick={onShare}
                            disabled={shareDisabled}
                            title={isRepost ? 'Không thể chia sẻ lại một bài đăng lại' : !canShare ? 'Không thể chia sẻ bài viết của chính mình' : undefined}
                            className={`flex items-center gap-1.5 transition ${shareDisabled ? 'cursor-not-allowed text-[#b5b5b5]' : 'hover:text-[#285e19]'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                            {post.shares}
                        </button>
                        {!canEditPost && (
                        <button type="button" onClick={onReport} className="flex items-center gap-1.5 transition hover:text-[#c62828]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                            Báo cáo
                        </button>
                        )}
                        {post.dishLink ? (
                            <button
                                type="button"
                                onClick={onOpenDishLink}
                                className="ml-auto rounded-full bg-[#2f8e2a] px-5 py-1.5 text-[12px] font-bold text-white transition hover:bg-[#277823]"
                            >
                                Đặt món
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </article>
    );
}

function VideoCard({ item, onClick }: { item: UserProfile['videos'][number]; onClick?: () => void }) {
    const url = String(item.image ?? '');
    const isVideoFile = /\.(mp4|mov|avi|mkv|webm)(\?|#|$)/i.test(url);
    return (
        <article
            className="group relative cursor-pointer overflow-hidden rounded-[12px]"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); }}
        >
            {isVideoFile ? (
                <video
                    src={url}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-[210px] w-full bg-black object-cover transition duration-300 group-hover:scale-[1.03]"
                />
            ) : (
                <img src={url} alt="" className="h-[210px] w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {item.pinned ? (
                <span className="absolute left-3 top-3 rounded-[8px] bg-[#ff3356] px-3 py-1 text-[12px] font-bold text-white">Đã ghim</span>
            ) : null}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[15px] font-semibold text-white">
                <span>▷</span>
                <span>{item.views}</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white text-2xl">▶</div>
            </div>
        </article>
    );
}

function VideoLightbox({ url, postId, onClose, onViewCounted }: { url: string; postId: string; onClose: () => void; onViewCounted?: () => void }) {
    const isVideoFile = /\.(mp4|mov|avi|mkv|webm)(\?|#|$)/i.test(url);

    useEffect(() => {
        const id = Number(postId);
        if (!Number.isFinite(id) || id <= 0) return;
        void userContentApi.layChiTietBaiViet(id).then(() => {
            onViewCounted?.();
        }).catch(() => { /* bỏ qua lỗi xác thực */ });
    }, [postId, onViewCounted]);

    return (
        <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-3xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white text-3xl leading-none hover:opacity-70"
                    aria-label="Đóng"
                >
                    ×
                </button>
                {isVideoFile ? (
                    <video
                        src={url}
                        controls
                        autoPlay
                        playsInline
                        className="max-h-[80vh] w-full rounded-[12px] bg-black"
                    />
                ) : (
                    <img src={url} alt="" className="max-h-[80vh] w-full rounded-[12px] object-contain" />
                )}
            </div>
        </div>
    );
}

function EarningsStatusBadge({ status }: { status: EarningsItemStatus }) {
    const styles = {
        earning: 'bg-[#48bf97] text-white',
        low: 'bg-[#fff0d8] text-[#b77915]',
        high: 'bg-[#e7f5ed] text-[#228152]',
    } as const;

    const labels = {
        earning: 'Đang kiếm tiền',
        low: 'Hiệu quả thấp',
        high: 'Hiệu quả cao',
    } as const;

    return <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-[12px] font-bold ${styles[status]}`}>{labels[status]}</span>;
}

function WithdrawalStatusBadge({ status }: { status: WithdrawalStatus }) {
    const styles = {
        completed: 'bg-[#eef9f3] text-[#26895f]',
        processing: 'bg-[#eef2ff] text-[#6673a4]',
        rejected: 'bg-[#fff0ef] text-[#d7564e]',
    } as const;

    const labels = {
        completed: 'Đã hoàn thành',
        processing: 'Đang xử lý',
        rejected: 'Bị từ chối',
    } as const;

    return (
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold ${styles[status]}`}>
            <span className="text-[10px]">●</span>
            {labels[status]}
        </span>
    );
}

function OverviewMetric({
    label,
    value,
    delta,
    tone = 'green',
}: {
    label: string;
    value: string;
    delta: string;
    tone?: 'green' | 'red' | 'orange';
}) {
    const toneClass = tone === 'red' ? 'text-[#d83e31]' : tone === 'orange' ? 'text-[#e59a19]' : 'text-[#299537]';

    return (
        <div className="space-y-2">
            <p className="text-[14px] font-medium text-[#242424]">{label}</p>
            <p className={`text-[20px] font-bold sm:text-[24px] ${toneClass}`}>{value}</p>
            <p className="text-[12px] text-[#707070]">{delta}</p>
        </div>
    );
}

function TurnOffMonetizationModal({
    isSubmitting,
    onClose,
    onConfirm,
}: {
    isSubmitting: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) {
    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
            <div
                className="relative w-full max-w-[420px] rounded-[20px] bg-white p-7 text-center shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    aria-label="Đóng"
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#6b7280] transition hover:bg-[#f3f4f6] disabled:opacity-50"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff4e6]">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                </div>

                <h2 className="text-[20px] font-bold text-[#111827]">Tắt kiếm tiền?</h2>
                <p className="mt-3 text-[14px] leading-6 text-[#6b7280]">
                    Khi tắt kiếm tiền, bài viết này sẽ không còn hiển thị link món và bạn sẽ không nhận được doanh thu từ bài viết.
                </p>

                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 h-[44px] rounded-[10px] border border-[#d1d5db] text-[14px] font-semibold text-[#374151] transition hover:bg-[#f9fafb] disabled:opacity-60"
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className="flex-1 h-[44px] rounded-[10px] bg-[#dc2626] text-[14px] font-bold text-white transition hover:bg-[#b91c1c] disabled:opacity-60"
                    >
                        {isSubmitting ? 'Đang xử lý...' : 'Tắt kiếm tiền'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function EarningsCard({
    item,
    isMenuOpen,
    onToggleMenu,
    onCloseMenu,
    onOpenPost,
    onEdit,
    onTurnOffMonetization,
}: {
    item: EarningsItem;
    isMenuOpen: boolean;
    onToggleMenu: () => void;
    onCloseMenu: () => void;
    onOpenPost: (postId: string) => void;
    onEdit: (postId: string) => void;
    onTurnOffMonetization: (postId: string) => void;
}) {
    return (
        <article className="rounded-[14px] border border-[#dcd6cb] bg-white px-4 py-4 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col gap-4 sm:flex-row">
                <img src={item.image} alt={item.title} className="h-[132px] w-full rounded-[12px] object-cover sm:w-[180px]" />

                <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-[18px] font-semibold text-black">{item.title}</h3>
                        </div>

                        <div className="flex items-center gap-2">
                            <EarningsStatusBadge status={item.status} />
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={onToggleMenu}
                                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#333] transition hover:bg-[#f5f5f5]"
                                >
                                    <MoreIcon />
                                </button>
                                {isMenuOpen ? (
                                    <div className="absolute right-0 top-[calc(100%+6px)] z-10 w-[170px] rounded-[10px] border border-[#ebebeb] bg-white py-1 shadow-[0_16px_32px_rgba(0,0,0,0.12)]">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onCloseMenu();
                                                onEdit(item.id);
                                            }}
                                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#222] transition hover:bg-[#f7f7f7]"
                                        >
                                            <span>✎</span>
                                            <span>Chỉnh sửa</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onCloseMenu();
                                                onTurnOffMonetization(item.id);
                                            }}
                                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#c62828] transition hover:bg-[#fff5f5]"
                                        >
                                            <span>⌁</span>
                                            <span>Tắt kiếm tiền</span>
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-[#2b2b2b]">
                        <span>▶ <strong>{item.views}</strong> lượt xem</span>
                        <span><strong>{item.interactions}</strong> lượt tương tác</span>
                        <span>💸 <strong>{item.revenue}</strong></span>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 border-t border-[#ece7de] pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[13px] text-[#4d4d4d]">Ngày đăng : {item.publishedAt}</p>
                        <button
                            type="button"
                            onClick={() => onOpenPost(item.id)}
                            className="inline-flex h-10 items-center justify-center rounded-[10px] border border-[#202020] px-5 text-[13px] font-semibold text-[#202020] transition hover:bg-[#f8f8f8]"
                        >
                            Xem bài viết
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

function WithdrawModal({
    accounts,
    summary,
    amount,
    selectedAccountId,
    errorMessage,
    isSubmitting,
    onAmountChange,
    onAccountChange,
    onConfirm,
    onClose,
}: {
    accounts: WithdrawalAccount[];
    summary: EarningsProfile['withdrawSummary'];
    amount: string;
    selectedAccountId: string;
    errorMessage: string | null;
    isSubmitting: boolean;
    onAmountChange: (value: string) => void;
    onAccountChange: (value: string) => void;
    onConfirm: () => void;
    onClose: () => void;
}) {
    const selectedAccount = accounts.find((account) => account.id === selectedAccountId) ?? accounts[0];

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
            <div className="w-full max-w-[620px] rounded-[20px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="flex items-center justify-between border-b border-[#ededed] px-5 py-4">
                    <h2 className="w-full text-center text-[22px] font-bold text-[#222]">Rút tiền</h2>
                    <button type="button" onClick={onClose} className="rounded-[10px] bg-[#f5f5f7] p-2 text-[#7f8492] transition hover:text-black">
                        <CloseIcon />
                    </button>
                </div>

                <div className="space-y-5 px-5 py-5 sm:px-6">
                    <div className="grid gap-3 rounded-[16px] bg-[linear-gradient(135deg,#f8fff6_0%,#f5f8ff_100%)] p-3 sm:grid-cols-3">
                        <div className="rounded-[12px] bg-white/70 px-3 py-3">
                            <p className="text-[14px] font-bold text-[#37956e]">{summary.availableBalance}</p>
                            <p className="mt-1 text-[12px] text-[#6b6b6b]">Số dư khả dụng</p>
                        </div>
                        <div className="rounded-[12px] bg-white/70 px-3 py-3">
                            <p className="text-[14px] font-bold text-[#6f768f]">{summary.processingAmount}</p>
                            <p className="mt-1 text-[12px] text-[#6b6b6b]">Đang xử lý</p>
                        </div>
                        <div className="rounded-[12px] bg-white/70 px-3 py-3">
                            <p className="text-[14px] font-bold text-[#3a8a63]">{summary.totalWithdrawn}</p>
                            <p className="mt-1 text-[12px] text-[#6b6b6b]">Tổng đã rút</p>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-[16px] font-semibold text-[#242424]">Số tiền rút</label>
                        <div className="flex items-center rounded-[12px] border border-[#ddd7cd] px-4">
                            <input
                                type="text"
                                value={amount}
                                onChange={(event) => onAmountChange(event.target.value)}
                                className="h-12 w-full bg-transparent text-[18px] font-semibold text-[#2f2f2f] outline-none"
                            />
                            <span className="text-[16px] font-semibold text-[#6f7280]">đ</span>
                        </div>
                        <p className="mt-2 text-[13px] text-[#7b7b7b]">Số tiền tối thiểu có thể rút: 100,000đ</p>
                    </div>

                    <div>
                        <label className="mb-2 block text-[16px] font-semibold text-[#242424]">Tài khoản ngân hàng liên kết</label>
                        <select
                            value={selectedAccount.id}
                            onChange={(event) => onAccountChange(event.target.value)}
                            className="h-12 w-full rounded-[12px] border border-[#ddd7cd] bg-white px-4 text-[15px] text-[#2f2f2f] outline-none"
                        >
                            {accounts.map((account) => (
                                <option key={account.id} value={account.id}>
                                    {account.provider} {account.accountNumber}
                                </option>
                            ))}
                        </select>
                        <div className="mt-3 flex h-12 items-center justify-between rounded-[12px] border border-[#ddd7cd] px-4 text-[15px] text-[#2f2f2f]">
                            <span>{selectedAccount.accountName}</span>
                            <span className="text-[#8a8a8a]">✎</span>
                        </div>
                    </div>

                    <div className="rounded-[14px] bg-[#f3f7ff] px-4 py-3 text-[13px] leading-6 text-[#6a748d]">
                        <p>Số tiền tối thiểu để rút là 100,000đ.</p>
                        <p>Thời gian xử lý có thể mất từ 1 - 3 ngày làm việc.</p>
                    </div>

                    {errorMessage ? (
                        <div className="rounded-[12px] border border-[#f5c2c2] bg-[#fdecec] px-4 py-3 text-[13px] font-medium text-[#b42318]">
                            {errorMessage}
                        </div>
                    ) : null}

                    <div className="grid gap-3 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isSubmitting}
                            className="h-11 rounded-[12px] bg-[linear-gradient(90deg,#2ea57d_0%,#56c194_100%)] text-[16px] font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? 'Đang gửi…' : 'Xác nhận'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="h-11 rounded-[12px] border border-[#d6d1c8] bg-white text-[16px] font-semibold text-[#303030] transition hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WithdrawSuccessModal({ onClose, onViewHistory }: { onClose: () => void; onViewHistory: () => void }) {
    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
            <div className="w-full max-w-[620px] rounded-[20px] bg-white px-6 py-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="flex justify-end">
                    <button type="button" onClick={onClose} className="rounded-[10px] bg-[#f5f5f7] p-2 text-[#7f8492] transition hover:text-black">
                        <CloseIcon />
                    </button>
                </div>
                <h3 className="mt-2 text-[28px] font-bold text-[#2e6f25] sm:text-[40px]">Bạn đã rút tiền thành công</h3>
                <button
                    type="button"
                    onClick={onViewHistory}
                    className="mt-8 inline-flex h-11 items-center justify-center rounded-[12px] border border-[#1e1e1e] px-6 text-[15px] font-semibold text-[#202020] transition hover:bg-[#f8f8f8]"
                >
                    Xem lịch sử rút tiền
                </button>
            </div>
        </div>
    );
}

function EarningsPanel({
    earnings,
    filter,
    searchValue,
    openMenuId,
    onOpenPost,
    onFilterChange,
    onSearchChange,
    onToggleMenu,
    onCloseMenu,
    onEdit,
    onTurnOffMonetization,
}: {
    earnings: EarningsProfile;
    filter: EarningsFilter;
    searchValue: string;
    openMenuId: string | null;
    onOpenPost: (postId: string) => void;
    onFilterChange: (value: EarningsFilter) => void;
    onSearchChange: (value: string) => void;
    onToggleMenu: (value: string) => void;
    onCloseMenu: () => void;
    onEdit: (postId: string) => void;
    onTurnOffMonetization: (postId: string) => void;
}) {
    const items = earnings.items.filter((item) => {
        const matchedFilter = filter === 'all' ? true : item.status === filter;
        const matchedSearch = item.title.toLowerCase().includes(searchValue.toLowerCase());
        return matchedFilter && matchedSearch;
    });

    return (
        <div className="border-t border-[#d9d9d9] px-4 pb-6 pt-4 sm:px-6">
            <div className="grid gap-4 rounded-[16px] border border-[#ebe7de] bg-[#fffefd] p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.2fr]">
                <OverviewMetric label="Hôm nay" value={earnings.todayRevenue} delta={earnings.todayRevenueDelta} />
                <OverviewMetric label="Tổng bài kiếm tiền" value={earnings.totalMonetizedPosts} delta={earnings.totalMonetizedPostsDelta} tone="red" />
                <OverviewMetric label="Tỷ lệ nhấn link món" value={earnings.linkClickRate} delta={earnings.linkClickRateDelta} tone="orange" />
                <div className="space-y-2 border-t border-[#ece6db] pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
                    <p className="text-[18px] font-bold uppercase text-[#141414]">Tổng doanh thu</p>
                    <p className="text-[28px] font-bold text-[#299537] sm:text-[34px]">{earnings.totalRevenue}</p>
                </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                    {([
                        { key: 'all' as const, label: 'Tất cả' },
                        { key: 'earning' as const, label: 'Đang kiếm tiền' },
                        { key: 'low' as const, label: 'Hiệu quả thấp' },
                        { key: 'high' as const, label: 'Hiệu quả cao' },
                    ]).map((item) => (
                        <button
                            key={item.key}
                            type="button"
                            onClick={() => onFilterChange(item.key)}
                            className={`rounded-[10px] px-4 py-2 text-[13px] font-semibold transition ${
                                filter === item.key
                                    ? 'bg-black text-white'
                                    : 'border border-[#d1cbc1] bg-white text-[#2c2c2c] hover:bg-[#faf9f6]'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <label className="flex h-10 items-center gap-2 rounded-full border border-[#d4cec3] bg-white px-4 text-[#6f6f6f] lg:w-[240px]">
                    <SearchIcon />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Tìm kiếm"
                        className="w-full bg-transparent text-[13px] outline-none placeholder:text-[#9a9a9a]"
                    />
                </label>
            </div>

            <div className="mt-5 space-y-4">
                {items.map((item) => (
                    <EarningsCard
                        key={item.id}
                        item={item}
                        isMenuOpen={openMenuId === item.id}
                        onToggleMenu={() => onToggleMenu(item.id)}
                        onCloseMenu={onCloseMenu}
                        onOpenPost={onOpenPost}
                        onEdit={onEdit}
                        onTurnOffMonetization={onTurnOffMonetization}
                    />
                ))}
            </div>
        </div>
    );
}

function WithdrawalHistoryPanel({
    earnings,
    filter,
    searchValue,
    onFilterChange,
    onSearchChange,
}: {
    earnings: EarningsProfile;
    filter: WithdrawalFilter;
    searchValue: string;
    onFilterChange: (value: WithdrawalFilter) => void;
    onSearchChange: (value: string) => void;
}) {
    const rows = earnings.withdrawalHistory.filter((item) => {
        const matchedFilter = filter === 'all' ? true : item.status === filter;
        const matchedSearch = item.method.toLowerCase().includes(searchValue.toLowerCase());
        return matchedFilter && matchedSearch;
    });

    return (
        <div className="border-t border-[#d9d9d9] px-4 pb-6 pt-4 sm:px-6">
            <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[14px] bg-[linear-gradient(135deg,#f7fff4_0%,#f4fbf8_100%)] px-4 py-4">
                    <p className="text-[20px] font-bold text-[#37956e]">{earnings.withdrawSummary.availableBalance}</p>
                    <p className="mt-1 text-[13px] text-[#6b6b6b]">Số dư khả dụng</p>
                </div>
                <div className="rounded-[14px] bg-[linear-gradient(135deg,#f4f6ff_0%,#f8fbff_100%)] px-4 py-4">
                    <p className="text-[20px] font-bold text-[#6f768f]">{earnings.withdrawSummary.processingAmount}</p>
                    <p className="mt-1 text-[13px] text-[#6b6b6b]">Đang xử lý</p>
                </div>
                <div className="rounded-[14px] bg-[linear-gradient(135deg,#f7fff4_0%,#f4fbf8_100%)] px-4 py-4">
                    <p className="text-[20px] font-bold text-[#37956e]">{earnings.withdrawSummary.totalWithdrawn}</p>
                    <p className="mt-1 text-[13px] text-[#6b6b6b]">Tổng đã rút</p>
                </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                    {([
                        { key: 'all' as const, label: 'Tất cả' },
                        { key: 'completed' as const, label: 'Đã hoàn thành' },
                        { key: 'processing' as const, label: 'Đang xử lý' },
                        { key: 'rejected' as const, label: 'Bị từ chối' },
                    ]).map((item) => (
                        <button
                            key={item.key}
                            type="button"
                            onClick={() => onFilterChange(item.key)}
                            className={`rounded-[10px] px-4 py-2 text-[13px] font-semibold transition ${
                                filter === item.key
                                    ? 'bg-[#303030] text-white'
                                    : 'border border-[#d1cbc1] bg-white text-[#2c2c2c] hover:bg-[#faf9f6]'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <label className="flex h-10 items-center gap-2 rounded-full border border-[#d4cec3] bg-white px-4 text-[#6f6f6f] lg:w-[320px]">
                    <SearchIcon />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Tìm kiếm theo số tài khoản..."
                        className="w-full bg-transparent text-[13px] outline-none placeholder:text-[#9a9a9a]"
                    />
                </label>
            </div>

            <div className="mt-5 overflow-hidden rounded-[14px] border border-[#ebe7de]">
                <div className="hidden grid-cols-[1fr_1fr_1.3fr_1fr] border-b border-[#ebe7de] bg-[#fcfcfb] px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.02em] text-[#777] md:grid">
                    <span>Ngày</span>
                    <span>Số tiền</span>
                    <span>Phương thức</span>
                    <span className="text-right">Trạng thái</span>
                </div>

                {rows.map((item) => (
                    <div key={item.id} className="grid gap-2 border-b border-[#f0ece5] px-4 py-4 text-[13px] text-[#2d2d2d] last:border-b-0 md:grid-cols-[1fr_1fr_1.3fr_1fr] md:items-center">
                        <span className="text-[#717171]">{item.date}</span>
                        <span className="font-semibold">{item.amount}</span>
                        <span>{item.method}</span>
                        <div className="md:flex md:justify-end">
                            <WithdrawalStatusBadge status={item.status} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#f0f0f3] text-[#737373]">‹</button>
                <span className="flex h-8 min-w-[34px] items-center justify-center rounded-[8px] border border-[#d9d5ce] bg-white text-[13px] font-semibold text-[#2f2f2f]">1</span>
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#f0f0f3] text-[#737373]">›</button>
            </div>
        </div>
    );
}

export default function ProfilePageClient({
    profile,
    editHref = '/user/profile/edit',
    editLabel = 'Chỉnh sửa trang cá nhân',
    canEdit = true,
}: {
    profile: UserProfile;
    editHref?: string;
    editLabel?: string;
    canEdit?: boolean;
}) {
    const hasEarnings = canEdit && Boolean(profile.isMonetized && profile.earnings);
    const { nguoiDung, dangNhap } = useAuth();
    const [earnings, setEarnings] = useState(profile.earnings);
    const [isFollowingTarget, setIsFollowingTarget] = useState<boolean>(
        Boolean(profile.isFollowingByMe),
    );
    const [followersCount, setFollowersCount] = useState(Number(profile.followers?.replace(/\D/g, '') || 0));
    const [isFollowProcessing, setIsFollowProcessing] = useState(false);
    const [isOpeningChat, setIsOpeningChat] = useState(false);

    useEffect(() => {
        const profileId = Number(profile.id);
        if (!profileId) return;
        let active = true;
        const sync = () => {
            void userContentApi.layThongTinTrangCaNhan(profileId).then((res: any) => {
                if (!active) return;
                if (res?.so_nguoi_theo_doi != null) setFollowersCount(Number(res.so_nguoi_theo_doi));
            }).catch(() => {});
        };
        const id = window.setInterval(sync, 30_000);
        return () => { active = false; window.clearInterval(id); };
    }, [profile.id]);

    const handleToggleFollow = async () => {
        if (!dangNhap) {
            setActionMessage('Vui lòng đăng nhập để theo dõi người dùng.');
            return;
        }
        const targetId = Number(profile.id);
        if (!Number.isFinite(targetId) || targetId <= 0) return;
        setIsFollowProcessing(true);
        try {
            const res = (await userContentApi.toggleTheoDoiNguoiDung(targetId)) as {
                dang_theo_doi?: boolean;
            };
            const nowFollowing = Boolean(res?.dang_theo_doi);
            setIsFollowingTarget(nowFollowing);
            setFollowersCount((c) => Math.max(0, c + (nowFollowing ? 1 : -1)));
        } catch (err) {
            setActionMessage(
                err instanceof Error ? err.message : 'Không thể cập nhật theo dõi',
            );
        } finally {
            setIsFollowProcessing(false);
        }
    };

    const handleOpenChat = async () => {
        if (!dangNhap) {
            setActionMessage('Vui lòng đăng nhập để nhắn tin.');
            return;
        }
        const targetId = Number(profile.id);
        if (!Number.isFinite(targetId) || targetId <= 0) return;
        if (nguoiDung && Number(nguoiDung.id) === targetId) return;
        setIsOpeningChat(true);
        try {
            await userCommerceApi.batDauTroChuyen(targetId);
            window.location.href = '/messages';
        } catch (err) {
            setActionMessage(
                err instanceof Error ? err.message : 'Không thể bắt đầu trò chuyện',
            );
            setIsOpeningChat(false);
        }
    };

    const [activeTab, setActiveTab] = useState<ProfileTab>(hasEarnings ? 'revenue' : 'posts');
    const [sortMode, setSortMode] = useState<SortMode>('latest');
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
    const [earningsFilter, setEarningsFilter] = useState<EarningsFilter>('all');
    const [withdrawalFilter, setWithdrawalFilter] = useState<WithdrawalFilter>('all');
    const [earningsSearch, setEarningsSearch] = useState('');
    const [withdrawalSearch, setWithdrawalSearch] = useState('');
    const [openEarningMenuId, setOpenEarningMenuId] = useState<string | null>(null);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isWithdrawSuccessOpen, setIsWithdrawSuccessOpen] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('1,000,000');
    const [selectedWithdrawAccountId, setSelectedWithdrawAccountId] = useState(profile.earnings?.withdrawalAccounts[0]?.id ?? '');
    const [withdrawError, setWithdrawError] = useState<string | null>(null);
    const [isSubmittingWithdraw, setIsSubmittingWithdraw] = useState(false);
    const [posts, setPosts] = useState(profile.posts);
    const [videos, setVideos] = useState(profile.videos);
    const [postsCount, setPostsCount] = useState<number>(() => {
        const initial = Number(profile.postsCount);
        return Number.isFinite(initial) ? initial : profile.posts.length;
    });
    const [editingPost, setEditingPost] = useState<UserProfile['posts'][number] | null>(null);
    const [reposts, setReposts] = useState(profile.reposts ?? []);
    const [actionMessage, setActionMessage] = useState<string | null>(null);
    const [deletingPost, setDeletingPost] = useState<{ id: number; type: 'post' | 'repost' } | null>(null);

    const handleDeletePostConfirm = () => {
        if (!deletingPost) return;
        const { id, type } = deletingPost;
        setDeletingPost(null);
        void userContentApi
            .xoaBaiViet(id)
            .then(() => {
                if (type === 'post') {
                    setPosts((current) => current.filter((item) => Number(item.id) !== id));
                    setPostsCount((current) => Math.max(0, current - 1));
                } else {
                    setReposts((current) => current.filter((item) => Number(item.id) !== id));
                }
                setActionMessage('Đã xóa bài viết');
            })
            .catch((e) => setActionMessage(e instanceof Error ? e.message : 'Không thể xóa bài viết'));
    };
    const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [activeRevenuePostId, setActiveRevenuePostId] = useState<number | null>(null);
    const [turnOffMonetizationPostId, setTurnOffMonetizationPostId] = useState<string | null>(null);
    const [isTurnOffMonetizationSubmitting, setIsTurnOffMonetizationSubmitting] = useState(false);
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
    const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
    const [copyDone, setCopyDone] = useState(false);
    const [activeVideo, setActiveVideo] = useState<{ id: string; url: string } | null>(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isReportDoneModalOpen, setIsReportDoneModalOpen] = useState(false);
    const [reportTargetId, setReportTargetId] = useState<number | null>(null);
    const [reportTargetAuthor, setReportTargetAuthor] = useState('người dùng này');
    const [isSubmittingReport, setIsSubmittingReport] = useState(false);

    useEffect(() => {
        if (!isSharePopupOpen) return;
        const close = () => setIsSharePopupOpen(false);
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, [isSharePopupOpen]);

    const visiblePosts = sortMode === 'latest' ? posts : [...posts].reverse();
    const visibleReposts = sortMode === 'latest' ? reposts : [...reposts].reverse();
    const visibleVideos = videos;

    const tabs = [
        { key: 'posts' as const, label: 'Bài viết', icon: <GridIcon /> },
        { key: 'videos' as const, label: 'Video', icon: <VideoIcon /> },
        { key: 'reposts' as const, label: 'Bài đăng lại', icon: <RepostIcon /> },
        ...(hasEarnings
            ? [
                  { key: 'revenue' as const, label: 'Doanh thu', icon: <WalletIcon /> },
                  { key: 'withdrawals' as const, label: 'Lịch sử rút tiền', icon: <HistoryIcon /> },
              ]
            : []),
    ];

    const showSortControls = activeTab === 'posts' || activeTab === 'videos' || activeTab === 'reposts';

    const handleWithdrawConfirm = async () => {
        if (isSubmittingWithdraw) return;
        const amountNumber = Number(String(withdrawAmount).replace(/[^\d]/g, ''));
        const accountId = Number(selectedWithdrawAccountId);
        const availableBalance = Number(
            String(earnings?.withdrawSummary.availableBalance ?? '0').replace(/[^\d]/g, ''),
        );

        if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
            setWithdrawError('Vui lòng nhập số tiền hợp lệ');
            return;
        }
        if (amountNumber < 100000) {
            setWithdrawError('Số tiền tối thiểu để rút là 100,000đ');
            return;
        }
        if (availableBalance > 0 && amountNumber > availableBalance) {
            setWithdrawError('Số dư không đủ để thực hiện yêu cầu này');
            return;
        }
        if (!Number.isFinite(accountId) || accountId <= 0) {
            setWithdrawError('Vui lòng chọn tài khoản nhận tiền hợp lệ');
            return;
        }

        setWithdrawError(null);
        setIsSubmittingWithdraw(true);
        try {
            await userCommerceApi.taoYeuCauRutTien({
                id_tai_khoan_rut_tien: accountId,
                so_tien: amountNumber,
            });
            setIsWithdrawModalOpen(false);
            setIsWithdrawSuccessOpen(true);
            setActionMessage('Đã gửi yêu cầu rút tiền');
        } catch (e) {
            setWithdrawError(e instanceof Error ? e.message : 'Không thể gửi yêu cầu rút tiền');
        } finally {
            setIsSubmittingWithdraw(false);
        }
    };

    const handleOpenWithdrawalHistory = () => {
        setIsWithdrawSuccessOpen(false);
        setActiveTab('withdrawals');
    };

    const patchPostMetric = (
        postId: number,
        field: 'likes' | 'comments' | 'shares',
        nextValue?: number,
        delta = 0,
    ) => {
        setPosts((current) =>
            current.map((post) => {
                if (Number(post.id) !== postId) return post;
                const currentValue = Number.parseInt(String(post[field] ?? '0'), 10) || 0;
                const resolved =
                    Number.isFinite(nextValue as number) && nextValue != null
                        ? Math.max(0, Number(nextValue))
                        : Math.max(0, currentValue + delta);
                return { ...post, [field]: String(resolved) };
            }),
        );
    };

    const handleCreatePost = async ({
        content,
        mediaUrls,
        monetize,
        dishLink,
        visibility,
    }: {
        content: string;
        mediaUrls: string[];
        monetize: boolean;
        dishLink: string;
        visibility: 'cong_khai' | 'ban_be';
    }) => {
        if (editingPost) {
            const id = Number(editingPost.id);
            if (!Number.isFinite(id)) return;
            const updated = await userContentApi.capNhatBaiViet(id, {
                noi_dung: content || undefined,
                tep_dinh_kem: mediaUrls,
                muc_do_hien_thi: visibility,
                bat_kiem_tien: monetize,
                link_mon_an: dishLink ? dishLink : undefined,
            });
            setPosts((current) =>
                current.map((item) =>
                    Number(item.id) === id
                        ? {
                            ...item,
                            content: updated.noi_dung ?? '',
                            images: updated.tep_dinh_kem?.map((media) => media.url) ?? [],
                            type: updated.loai_bai_viet === 'video' ? 'video' : 'bai_viet',
                            visibility: updated.muc_do_hien_thi === 'ban_be' ? 'ban_be' : 'cong_khai',
                            monetized: Boolean(updated.bat_kiem_tien),
                            dishLink: updated.link_mon_an ?? null,
                        }
                        : item,
                ),
            );
            setEditingPost(null);
            setActionMessage('Đã cập nhật bài viết');
            return;
        }

        const created = await userContentApi.taoBaiViet({
            noi_dung: content || undefined,
            tep_dinh_kem: mediaUrls,
            muc_do_hien_thi: visibility,
            bat_kiem_tien: monetize,
            link_mon_an: dishLink ? dishLink : undefined,
        });
        const isVideo = created.loai_bai_viet === 'video';
        const mediaUrlList = created.tep_dinh_kem?.map((item) => item.url) ?? [];

        if (isVideo) {
            const newVideo: UserProfile['videos'][number] = {
                id: String(created.id),
                image: mediaUrlList[0] ?? '',
                views: String(created.tong_luot_thich ?? 0),
            };
            setVideos((current) => [newVideo, ...current]);
            setPostsCount((current) => current + 1);
            setActiveTab('videos');
            setActionMessage('Đã đăng video');
            return;
        }

        const newPost: ProfilePost = {
            id: String(created.id),
            date: created.ngay_dang
                ? new Date(created.ngay_dang).toLocaleDateString('vi-VN')
                : new Date().toLocaleDateString('vi-VN'),
            content: created.noi_dung ?? '',
            images: mediaUrlList,
            likes: String(created.tong_luot_thich ?? 0),
            comments: String(created.tong_luot_binh_luan ?? 0),
            shares: String(created.tong_luot_chia_se ?? 0),
            sends: '0',
            type: 'bai_viet',
            visibility: created.muc_do_hien_thi === 'ban_be' ? 'ban_be' : 'cong_khai',
            monetized: Boolean(created.bat_kiem_tien),
            dishLink: created.link_mon_an ?? null,
        };
        setPosts((current) => [newPost, ...current]);
        setPostsCount((current) => current + 1);
        setActionMessage('Đã đăng bài viết');
    };

    const handleOpenEarningPost = (postId: string) => {
        const id = Number(postId);
        if (!Number.isFinite(id)) return;
        setActiveRevenuePostId(id);
    };

    const handleEditEarningPost = (postId: string) => {
        const post = posts.find((item) => String(item.id) === String(postId));
        if (!post) {
            setActionMessage('Không tìm thấy bài viết để chỉnh sửa');
            return;
        }
        setEditingPost(post);
        setIsCreatePostModalOpen(true);
    };

    const handleConfirmTurnOffMonetization = async () => {
        const postId = turnOffMonetizationPostId;
        if (!postId) return;
        const id = Number(postId);
        if (!Number.isFinite(id)) {
            setTurnOffMonetizationPostId(null);
            return;
        }
        setIsTurnOffMonetizationSubmitting(true);
        try {
            const updated = await userContentApi.capNhatBaiViet(id, {
                bat_kiem_tien: false,
            });
            setPosts((current) =>
                current.map((item) =>
                    Number(item.id) === id
                        ? {
                            ...item,
                            monetized: Boolean(updated.bat_kiem_tien),
                            dishLink: updated.link_mon_an ?? null,
                        }
                        : item,
                ),
            );
            setEarnings((current) =>
                current
                    ? {
                        ...current,
                        items: current.items.filter((item) => String(item.id) !== String(postId)),
                    }
                    : current,
            );
            setActionMessage('Đã tắt kiếm tiền cho bài viết');
            setTurnOffMonetizationPostId(null);
        } catch (error) {
            setActionMessage(error instanceof Error ? error.message : 'Không thể tắt kiếm tiền');
        } finally {
            setIsTurnOffMonetizationSubmitting(false);
        }
    };

    return (
        <div className="bg-[#f3f3f1] px-4 py-7 sm:px-6 lg:py-8">
            <section className="mx-auto w-full max-w-[820px] overflow-hidden rounded-[18px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)] xl:max-w-[880px]">
                <div className="px-4 pb-3 pt-5 sm:px-6">
                    {actionMessage ? (
                        <div className="mb-3 rounded-[10px] bg-[#eaf8eb] px-4 py-3 text-sm text-[#285e19]">
                            {actionMessage}
                        </div>
                    ) : null}
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
                        <div className="mx-auto flex h-[132px] w-[132px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f6f1ca] sm:mx-0">
                            <img src={profile.avatar} alt={profile.name} className="h-[132px] w-[132px] object-cover" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0">
                                        <h1 className="text-[20px] font-bold leading-none text-black sm:text-[22px]">{profile.name}</h1>
                                        <p className="mt-3 text-[14px] text-[#535353]">{profile.handle}</p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        {profile.isTopReviewer && profile.showBadge ? (
                                            <Badge tone="yellow">
                                                <span className="text-[#f5b400]">★</span>
                                                <span>Top 10 Reviewer</span>
                                            </Badge>
                                        ) : null}
                                        {profile.showTrustScore ? (
                                            <Badge tone="pink">
                                                <span>Độ uy tín</span>
                                                <span className="text-[#f50b0b]">{profile.trustScore}</span>
                                            </Badge>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[14px] text-[#222]">
                                    <span><strong className="font-semibold">{postsCount}</strong> bài viết</span>
                                    <button
                                        type="button"
                                        onClick={() => setIsFollowersModalOpen(true)}
                                        className="transition hover:underline"
                                    >
                                        <strong className="font-semibold">{followersCount.toLocaleString('vi-VN')}</strong> người theo dõi
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsFollowingModalOpen(true)}
                                        className="transition hover:underline"
                                    >
                                        Đang theo dõi <strong className="font-semibold">{profile.following}</strong> người dùng
                                    </button>
                                </div>

                                <div className="flex items-center gap-3">
                                    {canEdit ? (
                                        <Link
                                            href={editHref}
                                            id="btn-edit-profile"
                                            className="flex h-10 flex-1 items-center justify-center rounded-[10px] bg-black px-4 text-[14px] font-bold text-white transition hover:bg-[#262626]"
                                        >
                                            {editLabel}
                                        </Link>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                onClick={handleToggleFollow}
                                                disabled={isFollowProcessing}
                                                className={`flex h-10 flex-1 items-center justify-center rounded-[10px] px-4 text-[14px] font-bold transition disabled:cursor-wait disabled:opacity-60 ${
                                                    isFollowingTarget
                                                        ? 'border border-[#258f22] bg-[#e8f4e7] text-[#1f771d] hover:bg-[#dcf0db]'
                                                        : 'bg-[#2e7d32] text-white hover:bg-[#256b28]'
                                                }`}
                                            >
                                                {isFollowProcessing
                                                    ? 'Đang xử lý…'
                                                    : isFollowingTarget
                                                        ? 'Đang theo dõi'
                                                        : 'Follow +'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleOpenChat}
                                                disabled={isOpeningChat}
                                                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[10px] border border-[#1f89cf] bg-white px-4 text-[14px] font-bold text-[#1f89cf] transition hover:bg-[#eaf4fb] disabled:cursor-wait disabled:opacity-60"
                                            >
                                                {isOpeningChat ? 'Đang mở…' : '💬 Nhắn tin'}
                                            </button>
                                        </>
                                    )}
                                    {hasEarnings ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setWithdrawError(null);
                                                setIsWithdrawModalOpen(true);
                                            }}
                                            className="flex h-10 flex-1 items-center justify-center rounded-[10px] bg-[#1f89cf] px-4 text-[14px] font-bold text-white transition hover:bg-[#1777b5]"
                                        >
                                            Rút tiền
                                        </button>
                                    ) : null}
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => { setIsSharePopupOpen((c) => !c); setCopyDone(false); }}
                                            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#d9d9d9] text-[#484848] transition hover:bg-[#f7f7f7]"
                                            aria-label="Chia sẻ trang cá nhân"
                                        >
                                            <ShareIcon />
                                        </button>
                                        {isSharePopupOpen ? (
                                            <div
                                                className="absolute right-0 top-[calc(100%+8px)] z-20 w-[220px] overflow-hidden rounded-[14px] border border-[#e5e7eb] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.14)]"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        void navigator.clipboard.writeText(window.location.href).then(() => {
                                                            setCopyDone(true);
                                                            setTimeout(() => { setIsSharePopupOpen(false); setCopyDone(false); }, 1500);
                                                        });
                                                    }}
                                                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-[14px] text-[#1f2937] transition hover:bg-[#f9fafb]"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                                    {copyDone ? 'Đã sao chép!' : 'Sao chép liên kết'}
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 border-b border-[#d7d7d7] pt-1 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex flex-wrap items-center gap-5">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setActiveTab(tab.key)}
                                    id={`tab-${tab.key}`}
                                    className={`flex items-center gap-1.5 border-b-2 pb-3 text-[14px] font-semibold transition ${
                                        activeTab === tab.key ? 'border-black text-black' : 'border-transparent text-[#7a7a7a]'
                                    }`}
                                >
                                    <span className="text-[13px]">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {showSortControls ? (
                            <div className="mb-3 flex items-center gap-1.5">
                                <button
                                    type="button"
                                    onClick={() => setSortMode('latest')}
                                    className={`rounded-[6px] px-2.5 py-1.5 text-[11px] font-semibold transition ${
                                        sortMode === 'latest' ? 'border border-[#d8d8d8] bg-white text-[#202020]' : 'bg-[#f2f2f2] text-[#8d8d8d]'
                                    }`}
                                >
                                    Mới nhất
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSortMode('oldest')}
                                    className={`rounded-[6px] px-2.5 py-1.5 text-[11px] font-semibold transition ${
                                        sortMode === 'oldest' ? 'border border-[#d8d8d8] bg-white text-[#202020]' : 'bg-[#f2f2f2] text-[#8d8d8d]'
                                    }`}
                                >
                                    Cũ nhất
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>

                {activeTab === 'posts' && canEdit ? (
                    <CreatePostBox profile={profile} onClick={() => {
                        setEditingPost(null);
                        setIsCreatePostModalOpen(true);
                    }} />
                ) : null}

                {activeTab === 'posts' ? (
                    <div>
                        {visiblePosts.length > 0 ? (
                            visiblePosts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    profile={profile}
                                    canShare={!canEdit}
                                    canEditPost={canEdit}
                                    onLike={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        void userContentApi
                                            .toggleThichBaiViet(id)
                                            .then((res: unknown) => {
                                                const data = (res ?? {}) as {
                                                    da_tuong_tac?: boolean;
                                                    tong_luot?: number;
                                                };
                                                patchPostMetric(id, 'likes', data.tong_luot);
                                                setActionMessage(
                                                    data.da_tuong_tac
                                                        ? 'Đã thích bài viết'
                                                        : 'Đã bỏ thích bài viết',
                                                );
                                            })
                                            .catch((e) =>
                                                setActionMessage(
                                                    e instanceof Error
                                                        ? e.message
                                                        : 'Không thể thích bài viết',
                                                ),
                                            );
                                    }}
                                    onComment={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        setActiveCommentPostId(id);
                                        setIsCommentModalOpen(true);
                                    }}
                                    onShare={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        if ((post.type ?? 'bai_viet') === 'repost') {
                                            setActionMessage('Không thể chia sẻ lại một bài đăng lại');
                                            return;
                                        }
                                        void userContentApi
                                            .chiaSeBaiViet(id)
                                            .then((res: unknown) => {
                                                const data = (res ?? {}) as {
                                                    tong_luot_chia_se?: number;
                                                };
                                                patchPostMetric(
                                                    id,
                                                    'shares',
                                                    data.tong_luot_chia_se,
                                                );
                                                setActionMessage('Đã chia sẻ bài viết');
                                            })
                                            .catch((e) =>
                                                setActionMessage(
                                                    e instanceof Error
                                                        ? e.message
                                                        : 'Không thể chia sẻ bài viết',
                                                ),
                                            );
                                    }}
                                    onReport={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        setReportTargetId(id);
                                        setReportTargetAuthor(profile.name);
                                        setIsReportModalOpen(true);
                                    }}
                                    onOpenDishLink={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        void userContentApi
                                            .nhanLinkMonBaiViet(id)
                                            .then((res) => {
                                                if (res?.url) {
                                                    window.open(res.url, '_blank', 'noopener,noreferrer');
                                                }
                                            })
                                            .catch((e) =>
                                                setActionMessage(
                                                    e instanceof Error ? e.message : 'Không thể mở link món',
                                                ),
                                            );
                                    }}
                                    onEditPost={() => {
                                        setEditingPost(post);
                                        setIsCreatePostModalOpen(true);
                                    }}
                                    onDeletePost={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        setDeletingPost({ id, type: 'post' });
                                    }}
                                />
                            ))
                        ) : (
                            <div className="border-t border-[#d9d9d9] px-4 py-12 text-center text-[14px] text-[#787878] sm:px-6">
                                Chưa có bài viết nào để hiển thị.
                            </div>
                        )}
                    </div>
                ) : null}

                {activeTab === 'videos' ? (
                    <div className="border-t border-[#d9d9d9] px-4 pb-5 pt-4 sm:px-6">
                        {visibleVideos.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {visibleVideos.map((video) => (
                                    <VideoCard key={video.id} item={video} onClick={() => setActiveVideo({ id: video.id, url: String(video.image ?? '') })} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-center text-[14px] text-[#787878]">
                                Chưa có video nào để hiển thị.
                            </div>
                        )}
                    </div>
                ) : null}

                {activeTab === 'reposts' ? (
                    <div>
                        {visibleReposts.length > 0 ? (
                            visibleReposts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    profile={profile}
                                    canShare={!canEdit}
                                    canEditPost={canEdit}
                                    onLike={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        void userContentApi
                                            .toggleThichBaiViet(id)
                                            .then((res: unknown) => {
                                                const data = (res ?? {}) as {
                                                    da_tuong_tac?: boolean;
                                                    tong_luot?: number;
                                                };
                                                setReposts((current) =>
                                                    current.map((item) =>
                                                        Number(item.id) === id
                                                            ? {
                                                                ...item,
                                                                likes: String(data.tong_luot ?? Number(item.likes)),
                                                            }
                                                            : item,
                                                    ),
                                                );
                                                setActionMessage(
                                                    data.da_tuong_tac
                                                        ? 'Đã thích bài viết'
                                                        : 'Đã bỏ thích bài viết',
                                                );
                                            })
                                            .catch((e) =>
                                                setActionMessage(
                                                    e instanceof Error
                                                        ? e.message
                                                        : 'Không thể thích bài viết',
                                                ),
                                            );
                                    }}
                                    onComment={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        setActiveCommentPostId(id);
                                        setIsCommentModalOpen(true);
                                    }}
                                    onShare={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        if ((post.type ?? 'bai_viet') === 'repost') {
                                            setActionMessage('Không thể chia sẻ lại một bài đăng lại');
                                            return;
                                        }
                                        void userContentApi
                                            .chiaSeBaiViet(id)
                                            .then((res: unknown) => {
                                                const data = (res ?? {}) as {
                                                    tong_luot_chia_se?: number;
                                                };
                                                setReposts((current) =>
                                                    current.map((item) =>
                                                        Number(item.id) === id
                                                            ? {
                                                                ...item,
                                                                shares: String(data.tong_luot_chia_se ?? Number(item.shares)),
                                                            }
                                                            : item,
                                                    ),
                                                );
                                                setActionMessage('Đã chia sẻ bài viết');
                                            })
                                            .catch((e) =>
                                                setActionMessage(
                                                    e instanceof Error
                                                        ? e.message
                                                        : 'Không thể chia sẻ bài viết',
                                                ),
                                            );
                                    }}
                                    onReport={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        setReportTargetId(id);
                                        setReportTargetAuthor(profile.name);
                                        setIsReportModalOpen(true);
                                    }}
                                    onOpenDishLink={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        void userContentApi
                                            .nhanLinkMonBaiViet(id)
                                            .then((res) => {
                                                if (res?.url) {
                                                    window.open(res.url, '_blank', 'noopener,noreferrer');
                                                }
                                            })
                                            .catch((e) =>
                                                setActionMessage(
                                                    e instanceof Error ? e.message : 'Không thể mở link món',
                                                ),
                                            );
                                    }}
                                    onEditPost={() => {
                                        setEditingPost(post);
                                        setIsCreatePostModalOpen(true);
                                    }}
                                    onDeletePost={() => {
                                        const id = Number(post.id);
                                        if (!Number.isFinite(id)) return;
                                        setDeletingPost({ id, type: 'repost' });
                                    }}
                                />
                            ))
                        ) : (
                            <div className="border-t border-[#d9d9d9] px-4 py-12 text-center text-[14px] text-[#787878] sm:px-6">
                                Chưa có bài đăng lại nào được hiển thị.
                            </div>
                        )}
                    </div>
                ) : null}

                {activeTab === 'revenue' && earnings ? (
                    <EarningsPanel
                        earnings={earnings}
                        filter={earningsFilter}
                        searchValue={earningsSearch}
                        openMenuId={openEarningMenuId}
                        onOpenPost={handleOpenEarningPost}
                        onFilterChange={setEarningsFilter}
                        onSearchChange={setEarningsSearch}
                        onToggleMenu={(value) => setOpenEarningMenuId((current) => current === value ? null : value)}
                        onCloseMenu={() => setOpenEarningMenuId(null)}
                        onEdit={handleEditEarningPost}
                        onTurnOffMonetization={(postId) => setTurnOffMonetizationPostId(postId)}
                    />
                ) : null}

                {activeTab === 'withdrawals' && earnings ? (
                    <WithdrawalHistoryPanel
                        earnings={earnings}
                        filter={withdrawalFilter}
                        searchValue={withdrawalSearch}
                        onFilterChange={setWithdrawalFilter}
                        onSearchChange={setWithdrawalSearch}
                    />
                ) : null}
            </section>

                {deletingPost && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={() => setDeletingPost(null)}>
                        <div className="w-full max-w-[380px] rounded-[16px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
                            <p className="text-[15px] font-semibold text-black">Xóa bài viết?</p>
                            <p className="mt-1 text-[13px] text-[#666]">Bài viết sẽ bị xóa vĩnh viễn và không thể khôi phục.</p>
                            <div className="mt-5 flex justify-end gap-3">
                                <button type="button" onClick={() => setDeletingPost(null)} className="rounded-[10px] border border-[#ddd] bg-white px-5 py-2 text-[13px] font-semibold text-black hover:bg-gray-50">Hủy</button>
                                <button type="button" onClick={handleDeletePostConfirm} className="rounded-[10px] bg-[#d32f2f] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#b71c1c]">Xóa</button>
                            </div>
                        </div>
                    </div>
                )}
                {isCreatePostModalOpen && canEdit ? (
                    <CreatePostModal
                        profile={profile}
                        onClose={() => {
                            setIsCreatePostModalOpen(false);
                            setEditingPost(null);
                        }}
                        onSubmit={handleCreatePost}
                        initialData={
                            editingPost
                                ? {
                                    content: editingPost.content,
                                    mediaUrls: editingPost.images ?? [],
                                    monetize: Boolean(editingPost.monetized),
                                    dishLink: editingPost.dishLink ?? '',
                                    visibility: editingPost.visibility ?? 'cong_khai',
                                }
                                : undefined
                        }
                    />
                ) : null}

                <CommentModal
                    isOpen={isCommentModalOpen}
                    onClose={() => {
                        setIsCommentModalOpen(false);
                        setActiveCommentPostId(null);
                    }}
                    storeName={profile.name}
                    coverImage={profile.avatar ?? null}
                    postId={activeCommentPostId}
                    onCommentPosted={(postId) => {
                        patchPostMetric(postId, 'comments', undefined, 1);
                    }}
                />

            {isWithdrawModalOpen && earnings ? (
                <WithdrawModal
                    accounts={earnings.withdrawalAccounts}
                    summary={earnings.withdrawSummary}
                    amount={withdrawAmount}
                    selectedAccountId={selectedWithdrawAccountId}
                    errorMessage={withdrawError}
                    isSubmitting={isSubmittingWithdraw}
                    onAmountChange={(value) => {
                        setWithdrawAmount(value);
                        if (withdrawError) setWithdrawError(null);
                    }}
                    onAccountChange={(value) => {
                        setSelectedWithdrawAccountId(value);
                        if (withdrawError) setWithdrawError(null);
                    }}
                    onConfirm={handleWithdrawConfirm}
                    onClose={() => {
                        setIsWithdrawModalOpen(false);
                        setWithdrawError(null);
                    }}
                />
            ) : null}

            {isWithdrawSuccessOpen ? (
                <WithdrawSuccessModal
                    onClose={() => setIsWithdrawSuccessOpen(false)}
                    onViewHistory={handleOpenWithdrawalHistory}
                />
            ) : null}

            <RevenuePostDetailModal
                postId={activeRevenuePostId}
                onClose={() => setActiveRevenuePostId(null)}
            />

            {turnOffMonetizationPostId ? (
                <TurnOffMonetizationModal
                    isSubmitting={isTurnOffMonetizationSubmitting}
                    onClose={() => {
                        if (!isTurnOffMonetizationSubmitting) setTurnOffMonetizationPostId(null);
                    }}
                    onConfirm={() => void handleConfirmTurnOffMonetization()}
                />
            ) : null}

            {isFollowersModalOpen ? (
                <FollowersModal
                    onClose={() => setIsFollowersModalOpen(false)}
                    profileId={Number(profile.id)}
                    isOwner={canEdit}
                />
            ) : null}

            {isFollowingModalOpen ? (
                <FollowingModal onClose={() => setIsFollowingModalOpen(false)} />
            ) : null}

            <ReportPostModal
                isOpen={isReportModalOpen}
                isSubmitting={isSubmittingReport}
                onClose={() => { setIsReportModalOpen(false); setReportTargetId(null); }}
                onPickReason={(reason) => {
                    if (reportTargetId == null || isSubmittingReport) return;
                    setIsSubmittingReport(true);
                    void userContentApi
                        .baoCaoBaiViet(reportTargetId, {
                            loai_vi_pham: reason.value,
                            noi_dung_bao_cao: reason.label,
                        })
                        .then(() => {
                            setIsReportModalOpen(false);
                            setIsReportDoneModalOpen(true);
                        })
                        .catch((e) => setActionMessage(e instanceof Error ? e.message : 'Không thể báo cáo bài viết'))
                        .finally(() => setIsSubmittingReport(false));
                }}
            />

            <ReportDoneModal
                isOpen={isReportDoneModalOpen}
                authorName={reportTargetAuthor}
                onClose={() => { setIsReportDoneModalOpen(false); setReportTargetId(null); }}
            />

            {activeVideo ? (
                <VideoLightbox
                    url={activeVideo.url}
                    postId={activeVideo.id}
                    onClose={() => setActiveVideo(null)}
                    onViewCounted={() => {
                        setVideos((prev) =>
                            prev.map((v) =>
                                v.id === activeVideo.id
                                    ? { ...v, views: String(Number(v.views) + 1) }
                                    : v,
                            ),
                        );
                    }}
                />
            ) : null}
        </div>
    );
}
