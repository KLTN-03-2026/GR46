'use client';
/* eslint-disable @next/next/no-img-element */

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useAuth } from '@/shared/AuthContext';
import { useToast } from '@/shared/toast';
import { userContentApi } from '@/shared/userContentApi';

import {
  getReviewerContentPage,
  type RankingReviewerDetailData,
  type ReviewerProfilePost,
  type ReviewerVideo,
} from './data';

type ProfileTab = 'posts' | 'videos' | 'reposts';
type PostDetail = {
  noi_dung?: string;
  ngay_dang?: string;
  tep_dinh_kem?: string[];
  nguoi_dang?: {
    ten_hien_thi?: string;
  };
};
type UserRelationState = {
  dang_theo_doi?: boolean;
  da_chan?: boolean;
};

function PostDetailModal({
  postId,
  onClose,
}: {
  postId: number | null;
  onClose: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<PostDetail | null>(null);

  useEffect(() => {
    if (!postId) return;

    let mounted = true;
    userContentApi
      .layChiTietBaiViet(postId)
      .then((payload) => {
        if (!mounted) return;
        setDetail((payload ?? {}) as PostDetail);
        setError(null);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : 'Không thể tải chi tiết bài viết');
        setDetail(null);
      });

    return () => {
      mounted = false;
    };
  }, [postId]);

  if (!postId) return null;

  const images = Array.isArray(detail?.tep_dinh_kem) ? detail.tep_dinh_kem : [];
  const author = detail?.nguoi_dang?.ten_hien_thi || 'Người dùng';
  const createdAt = detail?.ngay_dang
    ? new Date(detail.ngay_dang).toLocaleString('vi-VN')
    : '';

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-4" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-[920px] overflow-auto rounded-[20px] bg-white p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[24px] font-bold text-black">Chi tiết bài viết</h3>
          <button type="button" onClick={onClose} className="text-[34px] leading-none text-[#444]">
            ×
          </button>
        </div>

        {!detail && !error ? <p className="mt-5 text-[#666]">Đang tải...</p> : null}
        {error ? <p className="mt-5 text-red-600">{error}</p> : null}

        {!error && detail ? (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-[#5f5f5f]">
              <b>{author}</b>{createdAt ? ` · ${createdAt}` : ''}
            </p>
            <p className="whitespace-pre-wrap text-[16px] leading-7 text-[#2f2f2f]">
              {String(detail?.noi_dung ?? '')}
            </p>
            {images.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {images.map((image: string, index: number) => (
                  <img
                    key={`${postId}-detail-${index}`}
                    src={image}
                    alt={`Ảnh bài viết ${index + 1}`}
                    className="h-[220px] w-full rounded-[12px] object-cover"
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ProfilePostCard({
  post,
  onOpenDetail,
}: {
  post: ReviewerProfilePost;
  onOpenDetail: (postId: number) => void;
}) {
  return (
    <article className="border-t border-[#d6d6d6] px-5 py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-bold text-[#1a1a1a]">Bài viết</span>
          <span className="text-[11px] text-[#7a7a7a]">{post.date}</span>
        </div>
        <button
          type="button"
          onClick={() => onOpenDetail(Number(post.id))}
          className="rounded-full border border-[#d9d9d9] px-3 py-1 text-xs font-semibold text-[#2f2f2f] hover:bg-[#f5f5f5]"
        >
          Xem chi tiết
        </button>
      </div>
      <div className="mt-3 space-y-2.5 text-[12px] leading-7 text-[#3d3d3d]"><p>{post.content}</p></div>
      {post.images.length > 0 ? (
        <div className="mt-3 grid max-w-[500px] grid-cols-2 gap-3">
          {post.images.map((image, index) => (
            <img key={`${post.id}-${index}`} src={image} alt="" className="h-[148px] w-full rounded-[10px] object-cover" />
          ))}
        </div>
      ) : null}
      <div className="mt-3 flex flex-wrap items-center gap-5 text-[13px] text-[#505050]">
        <span>♡ {post.likes}</span>
        <span>◔ {post.comments}</span>
        <span>↺ {post.shares}</span>
      </div>
    </article>
  );
}

function VideoCard({ item }: { item: ReviewerVideo }) {
  return (
    <article className="group relative overflow-hidden rounded-[14px]">
      <img src={item.image} alt="" className="h-[220px] w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[14px] font-semibold text-white"><span>▷</span><span>{item.views}</span></div>
    </article>
  );
}

export default function RankingReviewerDetailPageClient({ reviewer }: { reviewer: RankingReviewerDetailData }) {
  const router = useRouter();
  const toast = useToast();
  const { dangNhap } = useAuth();

  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [interaction, setInteraction] = useState<UserRelationState | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [activePostDetailId, setActivePostDetailId] = useState<number | null>(null);

  const [posts, setPosts] = useState<ReviewerProfilePost[]>(reviewer.posts);
  const [videos, setVideos] = useState<ReviewerVideo[]>(reviewer.videos);
  const [postPaging, setPostPaging] = useState(reviewer.postPaging);
  const [videoPaging, setVideoPaging] = useState(reviewer.videoPaging);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const requireLogin = useCallback(() => {
    if (dangNhap) return true;
    toast.warning('Bạn cần đăng nhập trước khi thực hiện thao tác này.');
    const redirect = encodeURIComponent(`/ranking/reviewer/${reviewer.id}`);
    router.push(`/login?redirect=${redirect}`);
    return false;
  }, [dangNhap, router, reviewer.id, toast]);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        const payload = (await userContentApi.layTrangThaiTuongTacNguoiDung(Number(reviewer.id))) as UserRelationState;
        if (mounted) {
          setInteraction({
            dang_theo_doi: Boolean(payload?.dang_theo_doi),
            da_chan: Boolean(payload?.da_chan),
          });
        }
      } catch {
        if (mounted) setInteraction(null);
      }
    };
    void run();
    return () => {
      mounted = false;
    };
  }, [reviewer.id]);

  const canLoadMore =
    activeTab === 'posts'
      ? postPaging.trang < postPaging.tongTrang
      : activeTab === 'videos'
        ? videoPaging.trang < videoPaging.tongTrang
        : false;

  const loadMore = useCallback(async () => {
    if (loadingMore || !canLoadMore) return;
    setLoadingMore(true);
    try {
      const idNguoiDung = Number(reviewer.id);
      if (activeTab === 'posts') {
        const nextPage = postPaging.trang + 1;
        const page = await getReviewerContentPage(idNguoiDung, 'bai_viet', nextPage, postPaging.soLuong);
        setPosts((current) => [...current, ...(page.items as ReviewerProfilePost[])]);
        setPostPaging(page.paging);
      } else if (activeTab === 'videos') {
        const nextPage = videoPaging.trang + 1;
        const page = await getReviewerContentPage(idNguoiDung, 'video', nextPage, videoPaging.soLuong);
        setVideos((current) => [...current, ...(page.items as ReviewerVideo[])]);
        setVideoPaging(page.paging);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Không thể tải thêm dữ liệu');
    } finally {
      setLoadingMore(false);
    }
  }, [activeTab, canLoadMore, loadingMore, postPaging, reviewer.id, toast, videoPaging]);

  useEffect(() => {
    if (!canLoadMore || !loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void loadMore();
        }
      },
      { rootMargin: '250px 0px' },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [canLoadMore, loadMore]);

  const visiblePosts = useMemo(() => posts, [posts]);
  const visibleVideos = useMemo(() => videos, [videos]);

  const handleToggleFollow = async () => {
    if (!requireLogin()) return;
    try {
      const payload = (await userContentApi.toggleTheoDoiNguoiDung(Number(reviewer.id))) as UserRelationState;
      setInteraction((prev) => ({ ...(prev || {}), dang_theo_doi: Boolean(payload?.dang_theo_doi) } as UserRelationState));
      setActionMsg(Boolean(payload?.dang_theo_doi) ? 'Đã theo dõi người dùng' : 'Đã bỏ theo dõi người dùng');
    } catch (e) {
      setActionMsg(e instanceof Error ? e.message : 'Không thể theo dõi');
    }
  };

  const handleMessage = async () => {
    if (!requireLogin()) return;
    try {
      await userContentApi.batDauTroChuyen(Number(reviewer.id));
      router.push(`/messages/${reviewer.id}`);
    } catch (e) {
      setActionMsg(e instanceof Error ? e.message : 'Không thể bắt đầu cuộc trò chuyện');
    }
  };

  const handleBlock = async () => {
    if (!requireLogin()) return;
    try {
      const payload = (await userContentApi.toggleChanNguoiDung(Number(reviewer.id))) as UserRelationState;
      setInteraction((prev) => ({ ...(prev || {}), da_chan: Boolean(payload?.da_chan) } as UserRelationState));
      setActionMsg(Boolean(payload?.da_chan) ? 'Đã chặn người dùng' : 'Đã bỏ chặn người dùng');
    } catch (e) {
      setActionMsg(e instanceof Error ? e.message : 'Không thể chặn người dùng');
    } finally {
      setMenuOpen(false);
    }
  };

  const handleReport = async () => {
    if (!requireLogin()) return;
    const reason = window.prompt('Nhập lý do báo cáo');
    if (!reason?.trim()) return;
    try {
      await userContentApi.baoCaoNguoiDung(Number(reviewer.id), {
        loai_vi_pham: 'noi_dung_vi_pham',
        noi_dung_bao_cao: reason.trim(),
      });
      setActionMsg('Đã gửi báo cáo');
    } catch (e) {
      setActionMsg(e instanceof Error ? e.message : 'Không thể báo cáo');
    } finally {
      setMenuOpen(false);
    }
  };

  return (
    <div className="bg-[#f1f1ee] py-5">
      <section className="mx-auto w-full max-w-[1080px] overflow-hidden rounded-[22px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
        <div className="px-7 pb-4 pt-5">
          <div className="grid gap-5 lg:grid-cols-[170px_minmax(0,1fr)]">
            <div className="flex justify-center lg:justify-start">
              <div className="flex h-[158px] w-[158px] items-center justify-center rounded-full bg-[#f6f1ca] p-4">
                <img src={reviewer.avatar} alt={reviewer.name} className="h-[112px] w-[112px] rounded-full object-cover" />
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-[30px] font-bold text-black">{reviewer.name}</h1>
                  <p className="mt-1.5 text-[18px] text-[#4a4a4a]">@{reviewer.handle}</p>
                  {reviewer.bio ? <p className="mt-2 text-[15px] text-[#5b5b5b]">{reviewer.bio}</p> : null}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#fde8bf] px-5 py-3 text-[18px] font-bold text-[#211d11]">⭐ TOP REVIEWER</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2 text-[16px] text-[#242424]">
                <span><b>{reviewer.postsCount}</b> bài viết</span>
                <span><b>{reviewer.followers}</b> người theo dõi</span>
                <span>Đang theo dõi <b>{reviewer.following}</b> người dùng</span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => void handleToggleFollow()} className="min-w-[180px] rounded-[12px] bg-black px-5 py-2.5 text-[16px] font-bold text-white">
                  {interaction?.dang_theo_doi ? 'Đang theo dõi' : 'Theo dõi'}
                </button>
                <button type="button" onClick={() => void handleMessage()} className="min-w-[156px] rounded-[12px] bg-[#edf2ed] px-5 py-2.5 text-center text-[16px] font-bold text-[#161616]">Nhắn tin</button>
                <div className="relative">
                  <button type="button" onClick={() => setMenuOpen((v) => !v)} className="rounded-[10px] bg-[#f3f3f3] px-3.5 py-2.5 text-[16px]">•••</button>
                  {menuOpen ? (
                    <div className="absolute right-0 z-20 mt-2 w-[190px] rounded border bg-white p-1 shadow">
                      <button type="button" onClick={() => void handleReport()} className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-[#f6f6f6]">Báo cáo tài khoản</button>
                      <button type="button" onClick={() => void handleBlock()} className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-[#f6f6f6]">{interaction?.da_chan ? 'Bỏ chặn tài khoản' : 'Chặn tài khoản'}</button>
                    </div>
                  ) : null}
                </div>
              </div>
              {actionMsg ? <p className="mt-3 text-sm text-[#2f8f22]">{actionMsg}</p> : null}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-b border-[#bcbcbc]">
            <div className="flex flex-wrap items-center gap-5">
              <button type="button" onClick={() => setActiveTab('posts')} className={`border-b-2 px-2 pb-3 text-[15px] font-bold transition ${activeTab === 'posts' ? 'border-black text-black' : 'border-transparent text-[#6d6d6d]'}`}>▦ Bài viết</button>
              <button type="button" onClick={() => setActiveTab('videos')} className={`border-b-2 px-2 pb-3 text-[15px] font-bold transition ${activeTab === 'videos' ? 'border-black text-black' : 'border-transparent text-[#6d6d6d]'}`}>◉ Video</button>
              <button type="button" onClick={() => setActiveTab('reposts')} className={`border-b-2 px-2 pb-3 text-[15px] font-bold transition ${activeTab === 'reposts' ? 'border-black text-black' : 'border-transparent text-[#6d6d6d]'}`}>⇅ Bài đăng lại</button>
            </div>
          </div>
        </div>

        {activeTab === 'posts' ? (
          <div>
            {visiblePosts.map((post) => (
              <ProfilePostCard key={post.id} post={post} onOpenDetail={setActivePostDetailId} />
            ))}
          </div>
        ) : null}
        {activeTab === 'videos' ? (
          <div className="px-6 pb-6 pt-5">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {visibleVideos.map((video) => <VideoCard key={video.id} item={video} />)}
            </div>
          </div>
        ) : null}
        {activeTab === 'reposts' ? <div className="px-6 py-12 text-center text-[15px] text-[#787878]">Chưa có bài đăng lại nào được hiển thị.</div> : null}

        {(activeTab === 'posts' || activeTab === 'videos') && canLoadMore ? (
          <div ref={loadMoreRef} className="px-6 pb-6 pt-2 text-center text-sm text-[#6f6f6f]">
            {loadingMore ? 'Đang tải thêm...' : 'Kéo xuống để xem thêm'}
          </div>
        ) : null}
      </section>

      <PostDetailModal key={activePostDetailId ?? 0} postId={activePostDetailId} onClose={() => setActivePostDetailId(null)} />
    </div>
  );
}
