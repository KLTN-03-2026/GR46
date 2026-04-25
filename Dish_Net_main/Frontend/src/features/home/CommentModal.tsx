'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from 'react';

import { useAuth } from '@/shared/AuthContext';
import { figmaFallbackAssets } from '@/shared/assets/figmaFallback';
import { userContentApi } from '@/shared/userContentApi';

type CommentTab = 'all' | 'positive' | 'latest';

type CommentRow = {
  id: number;
  parentId: number | null;
  content: string;
  likes: number;
  createdAt: string;
  authorName: string;
  authorAvatar: string | null;
  taggedDish: string | null;
  imageUrls: string[];
};

type ComposerImage = {
  previewUrl: string;
  payloadUrl: string;
};

const modalAssets = {
  storeImage: figmaFallbackAssets.storeImage,
  reviewerAvatarA: figmaFallbackAssets.reviewerAvatarA,
  reviewerAvatarB: figmaFallbackAssets.reviewerAvatarB,
  reviewFoodA: figmaFallbackAssets.feedDishImage,
  reviewFoodB: figmaFallbackAssets.menuItemImage,
} as const;

const commentTabs: Array<{ id: CommentTab; label: string }> = [
  { id: 'all', label: 'Tất cả' },
  { id: 'positive', label: 'Tích cực' },
  { id: 'latest', label: 'Mới nhất' },
];

function formatDateTime(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function StarRating({ value }: { value: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[#fff4e6] px-3 py-1.5 text-sm font-semibold text-[#b8691b]">
      <span className="text-base leading-none">★</span>
      {value}
    </div>
  );
}

function shortTitle(content: string) {
  const clean = content.trim();
  if (!clean) return 'Bình luận từ cộng đồng';
  if (clean.length <= 52) return clean;
  return `${clean.slice(0, 52)}...`;
}

function parseCommentMeta(raw: string): {
  content: string;
  taggedDish: string | null;
  imageUrls: string[];
} {
  const lines = raw.split('\n');
  let taggedDish: string | null = null;
  let imageUrls: string[] = [];
  const contentLines: string[] = [];

  lines.forEach((line) => {
    if (line.startsWith('[dish_tag]:')) {
      const value = line.replace('[dish_tag]:', '').trim();
      taggedDish = value || null;
      return;
    }
    if (line.startsWith('[images]:')) {
      const value = line.replace('[images]:', '').trim();
      imageUrls = value
        ? value
            .split('|')
            .map((item) => item.trim())
            .filter(Boolean)
        : [];
      return;
    }
    contentLines.push(line);
  });

  return {
    content: contentLines
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim(),
    taggedDish,
    imageUrls,
  };
}

function isPositiveComment(content: string, likes: number) {
  const normalized = content.toLowerCase();
  const positiveWords = ['ngon', 'tốt', 'hài lòng', 'ổn', 'nhanh', 'sạch'];
  const negativeWords = ['tệ', 'dở', 'chậm', 'nguội', 'hôi', 'không hài lòng'];
  const positiveHit = positiveWords.some((word) => normalized.includes(word));
  const negativeHit = negativeWords.some((word) => normalized.includes(word));
  if (negativeHit && !positiveHit) return false;
  return positiveHit || likes >= 3;
}

function resolveMediaUrl(input: string) {
  const value = input.trim();
  if (!value) return '';
  if (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('data:') ||
    value.startsWith('blob:')
  ) {
    return value;
  }
  const base =
    process.env.NEXT_PUBLIC_APP_ORIGIN ??
    (typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:4000');
  if (value.startsWith('/')) return `${base}${value}`;
  return `${base}/${value}`;
}

export default function CommentModal({
  isOpen,
  onClose,
  storeName = 'Nét Huế - Hàng Bông',
  startComposerOpen = false,
  postId,
  onCommentPosted,
}: {
  isOpen: boolean;
  onClose: () => void;
  storeName?: string;
  startComposerOpen?: boolean;
  postId?: number | null;
  onCommentPosted?: (postId: number) => void;
}) {
  const { dangNhap } = useAuth();
  const [activeTab, setActiveTab] = useState<CommentTab>('all');
  const [draftComment, setDraftComment] = useState('');
  const [isComposerOpen, setIsComposerOpen] = useState(startComposerOpen);
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [expandedReplies, setExpandedReplies] = useState<Record<number, boolean>>({});
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [composerImages, setComposerImages] = useState<ComposerImage[]>([]);
  const [dishQuery, setDishQuery] = useState('');
  const [dishSuggestions, setDishSuggestions] = useState<string[]>([]);
  const [selectedDishTag, setSelectedDishTag] = useState<string>('');

  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ''));
      reader.onerror = () => reject(new Error('Không đọc được ảnh'));
      reader.readAsDataURL(file);
    });

  const clearComposerImages = useCallback(() => {
    setComposerImages((current) => {
      current.forEach((item) => {
        if (item.previewUrl.startsWith('blob:')) URL.revokeObjectURL(item.previewUrl);
      });
      return [];
    });
  }, []);

  const handleComposerImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    setIsUploadingImages(true);
    try {
      const nextItems = await Promise.all(
        files.map(async (file) => {
          const previewUrl = URL.createObjectURL(file);
          try {
            const uploaded = await userContentApi.uploadAnhDaiDien(file);
            const payloadUrl = resolveMediaUrl(String(uploaded?.url ?? ''));
            if (!payloadUrl) throw new Error('upload_empty');
            return { previewUrl, payloadUrl };
          } catch {
            return {
              previewUrl,
              payloadUrl: await readFileAsDataUrl(file),
            };
          }
        }),
      );
      setComposerImages((current) => [...current, ...nextItems].slice(0, 4));
    } finally {
      setIsUploadingImages(false);
    }
    input.value = '';
  };

  const removeComposerImage = (targetPreviewUrl: string) => {
    if (targetPreviewUrl.startsWith('blob:')) URL.revokeObjectURL(targetPreviewUrl);
    setComposerImages((current) =>
      current.filter((item) => item.previewUrl !== targetPreviewUrl),
    );
  };

  const loadComments = useCallback(async () => {
    if (!postId) {
      setComments([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const payload = await userContentApi.layBinhLuanBaiViet(postId, {
        trang: 1,
        so_luong: 100,
      });
      const normalizedPayload = (payload ?? {}) as { du_lieu?: unknown[] };
      const rows = Array.isArray(normalizedPayload.du_lieu)
        ? normalizedPayload.du_lieu
        : [];
      setComments(
        rows.map((row) => {
          const item = (row ?? {}) as Record<string, unknown>;
          const nguoiBinhLuan = (item.nguoi_binh_luan ?? {}) as Record<string, unknown>;
          const parsed = parseCommentMeta(String(item.noi_dung ?? ''));
          return {
            id: Number(item.id ?? 0),
            parentId: item.id_binh_luan_cha != null ? Number(item.id_binh_luan_cha) : null,
            content: parsed.content,
            likes: Number(item.tong_luot_thich ?? 0),
            createdAt: String(item.ngay_tao ?? ''),
            authorName: String(nguoiBinhLuan.ten_hien_thi ?? 'Người dùng'),
            authorAvatar: resolveMediaUrl(
              String((nguoiBinhLuan.anh_dai_dien as string | null) ?? ''),
            ) || null,
            taggedDish: parsed.taggedDish,
            imageUrls: parsed.imageUrls.map(resolveMediaUrl).filter(Boolean),
          };
        }),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không tải được bình luận');
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (!isOpen) return;
    void loadComments();
  }, [isOpen, loadComments]);

  useEffect(() => {
    if (!isOpen) return;
    setIsComposerOpen(startComposerOpen);
  }, [isOpen, startComposerOpen]);

  const handleClose = useCallback(() => {
    setIsComposerOpen(false);
    setDraftComment('');
    setReplyingTo(null);
    setExpandedReplies({});
    setReplyDrafts({});
    clearComposerImages();
    setDishQuery('');
    setDishSuggestions([]);
    setSelectedDishTag('');
    setError(null);
    onClose();
  }, [clearComposerImages, onClose]);

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

  const grouped = useMemo(() => {
    const rootComments = comments.filter((item) => item.parentId == null);
    const childMap = new Map<number, CommentRow[]>();
    comments
      .filter((item) => item.parentId != null)
      .forEach((item) => {
        const key = Number(item.parentId);
        const current = childMap.get(key) ?? [];
        current.push(item);
        childMap.set(key, current);
      });

    if (activeTab === 'latest') {
      rootComments.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (activeTab === 'positive') {
      const filtered = rootComments.filter((item) =>
        isPositiveComment(item.content, item.likes),
      );
      rootComments.splice(0, rootComments.length, ...filtered);
      rootComments.sort((a, b) => b.likes - a.likes);
    }

    return { rootComments, childMap };
  }, [activeTab, comments]);

  const handleSubmit = async (parentId?: number) => {
    const content = (parentId ? replyDrafts[parentId] : draftComment).trim();
    if (!content || !postId) return;

    if (!dangNhap) {
      setError('Bạn cần đăng nhập để bình luận.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const payloadContent =
        parentId == null
          ? [
              content,
              selectedDishTag ? `[dish_tag]: ${selectedDishTag}` : '',
              composerImages.length
                ? `[images]: ${composerImages
                    .map((item) => item.payloadUrl)
                    .join('|')}`
                : '',
            ]
              .filter(Boolean)
              .join('\n')
          : content;
      await userContentApi.taoBinhLuan(postId, {
        noi_dung: payloadContent,
        id_binh_luan_cha: parentId,
      });
      onCommentPosted?.(postId);
      if (parentId) {
        setReplyDrafts((current) => ({ ...current, [parentId]: '' }));
        setReplyingTo(null);
      } else {
        setDraftComment('');
        setIsComposerOpen(false);
        clearComposerImages();
        setDishQuery('');
        setDishSuggestions([]);
        setSelectedDishTag('');
      }
      await loadComments();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không gửi được bình luận');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(
    () => () => {
      composerImages.forEach((url) => {
        if (url.previewUrl.startsWith('blob:')) URL.revokeObjectURL(url.previewUrl);
      });
    },
    [composerImages],
  );

  const toggleReplies = (id: number) => {
    setExpandedReplies((current) => ({ ...current, [id]: !current[id] }));
  };

  useEffect(() => {
    if (!isOpen || !isComposerOpen || !dishQuery.trim()) {
      setDishSuggestions([]);
      return;
    }
    let active = true;
    const timer = setTimeout(() => {
      userContentApi
        .timKiem({
          tu_khoa: dishQuery.trim(),
          loai: 'mon_an',
          trang: 1,
          so_luong: 8,
        })
        .then((payload: unknown) => {
          if (!active) return;
          const normalized = (payload ?? {}) as {
            ket_qua?: { mon_an?: { du_lieu?: unknown[] } };
          };
          const rows = Array.isArray(normalized.ket_qua?.mon_an?.du_lieu)
            ? normalized.ket_qua?.mon_an?.du_lieu
            : [];
          const names = rows
            .map((row) => String((row as Record<string, unknown>)?.ten_mon ?? '').trim())
            .filter(Boolean);
          setDishSuggestions([...new Set(names)].slice(0, 8));
        })
        .catch(() => {
          if (active) setDishSuggestions([]);
        });
    }, 250);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [dishQuery, isComposerOpen, isOpen]);

  if (!isOpen) return null;

  const averageRating = grouped.rootComments.length > 0 ? '4.8' : '0.0';
  const sentiment =
    grouped.rootComments.length > 0
      ? Math.min(99, 84 + Math.round(grouped.rootComments.length / 2))
      : 0;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/58 px-4 py-6"
      onClick={handleClose}
    >
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
                {averageRating}
              </div>
              <div className="min-w-0 pt-1">
                <h2 className="text-[29px] font-semibold leading-[1.08] text-[#292929]">
                  {storeName}
                </h2>
                <p className="mt-2 text-sm leading-7 text-[#7b7b73]">
                  {grouped.rootComments.length} bình luận từ cộng đồng DishNet.
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
                  <p className="mt-2 text-2xl font-bold text-[#2d6c1b]">{sentiment}%</p>
                </div>
                <div className="rounded-[14px] bg-white p-4">
                  <p className="text-xs text-[#7f8579]">Phục vụ</p>
                  <p className="mt-2 text-2xl font-bold text-[#2e2e2e]">Nhanh</p>
                </div>
                <div className="rounded-[14px] bg-white p-4">
                  <p className="text-xs text-[#7f8579]">Món nổi bật</p>
                  <p className="mt-2 text-lg font-bold text-[#2e2e2e]">Best seller</p>
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

            {isComposerOpen ? (
              <div className="mt-5 rounded-[16px] border border-[#e2e5dc] bg-[#f7f8f4] p-4">
                {!dangNhap ? (
                  <p className="text-sm text-[#6f7786]">
                    Bạn cần đăng nhập để bình luận.{' '}
                    <Link href="/login" className="font-semibold text-[#2f8f22] underline">
                      Đi đến đăng nhập
                    </Link>
                  </p>
                ) : (
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
                          <label className="cursor-pointer rounded-full bg-white px-3 py-1.5 transition hover:bg-[#f0f3eb]">
                            {isUploadingImages ? 'Đang tải ảnh...' : '+ Ảnh'}
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleComposerImageChange}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              if (dishQuery.trim()) {
                                setSelectedDishTag(dishQuery.trim());
                              }
                            }}
                            className="rounded-full bg-white px-3 py-1.5 transition hover:bg-[#f0f3eb]"
                          >
                            Gắn thẻ món
                          </button>
                        </div>
                        <button
                          type="button"
                          disabled={
                            isSubmitting || isUploadingImages || !draftComment.trim() || !postId
                          }
                          onClick={() => void handleSubmit()}
                          className="rounded-full bg-[#1f86ff] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#1274ea] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isSubmitting ? 'Đang gửi...' : 'Đăng bình luận'}
                        </button>
                      </div>
                      <div className="mt-3 space-y-2">
                        <input
                          value={dishQuery}
                          onChange={(event) => setDishQuery(event.target.value)}
                          placeholder="Tìm và gắn thẻ món ăn..."
                          className="w-full rounded-[12px] border border-[#dfe3d7] bg-white px-3 py-2 text-sm text-[#3f443b] placeholder:text-[#9ba292] focus:outline-none"
                        />
                        {dishSuggestions.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {dishSuggestions.map((dish) => (
                              <button
                                key={dish}
                                type="button"
                                onClick={() => {
                                  setSelectedDishTag(dish);
                                  setDishQuery(dish);
                                }}
                                className="rounded-full border border-[#dfe4d7] bg-white px-3 py-1 text-xs font-medium text-[#4a5145] transition hover:bg-[#f2f5ed]"
                              >
                                {dish}
                              </button>
                            ))}
                          </div>
                        ) : null}
                        {selectedDishTag ? (
                          <p className="text-xs text-[#5f6a56]">
                            Đã gắn thẻ món: <span className="font-semibold">{selectedDishTag}</span>
                          </p>
                        ) : null}
                        {composerImages.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {composerImages.map((item) => (
                              <div key={item.previewUrl} className="relative">
                                <img
                                  src={item.previewUrl}
                                  alt="Ảnh bình luận"
                                  className="h-14 w-14 rounded-[10px] object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeComposerImage(item.previewUrl)}
                                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black/70 text-[10px] text-white"
                                  aria-label="Xóa ảnh"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-8 py-6">
            {!postId ? (
              <div className="rounded-[14px] border border-[#e5e7eb] bg-white px-5 py-4 text-[14px] text-[#6b7280]">
                Chưa có bài viết nguồn để tải bình luận.
              </div>
            ) : isLoading ? (
              <div className="rounded-[14px] border border-[#e5e7eb] bg-white px-5 py-4 text-[14px] text-[#6b7280]">
                Đang tải bình luận...
              </div>
            ) : grouped.rootComments.length === 0 ? (
              <div className="rounded-[14px] border border-[#e5e7eb] bg-white px-5 py-4 text-[14px] text-[#6b7280]">
                Chưa có bình luận nào cho bài viết này.
              </div>
            ) : (
              <div className="space-y-5">
                {grouped.rootComments.map((comment, index) => {
                  const replies = grouped.childMap.get(comment.id) ?? [];
                  const bodyText = comment.content
                    .replace(/\n{3,}/g, '\n\n')
                    .trim();
                  const normalizedBody = bodyText || 'Bình luận từ cộng đồng.';
                  const titleText = shortTitle(normalizedBody);
                  const showTitle =
                    normalizedBody.length > 72 && titleText !== normalizedBody;
                  return (
                    <article
                      key={comment.id}
                      className="rounded-[18px] border border-[#e6e7df] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex min-w-0 items-start gap-4">
                          <img
                            src={comment.authorAvatar || `https://i.pravatar.cc/120?img=${(index % 10) + 10}`}
                            alt={comment.authorName}
                            className="h-14 w-14 rounded-full object-cover"
                          />
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                              <h4 className="text-lg font-semibold text-[#252525]">
                                {comment.authorName}
                              </h4>
                              <StarRating value={comment.likes > 10 ? '4.8' : comment.likes > 4 ? '4.6' : '4.4'} />
                            </div>
                            <p className="mt-1 text-sm text-[#8a8f85]">{formatDateTime(comment.createdAt)}</p>
                            {showTitle ? (
                              <h5 className="mt-3 text-[18px] font-semibold text-[#2e2f2c]">
                                {titleText}
                              </h5>
                            ) : null}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setReplyingTo((current) => (current === comment.id ? null : comment.id))}
                          className="rounded-full bg-[#f4f6ef] px-4 py-2 text-sm font-medium text-[#6f776b] transition hover:bg-[#ecefe7]"
                        >
                          {replyingTo === comment.id ? 'Ẩn phản hồi' : 'Phản hồi'}
                        </button>
                      </div>

                      {comment.taggedDish ? (
                        <div className="mt-4">
                          <span className="inline-flex rounded-full bg-[#f3f6ee] px-3 py-1 text-xs font-semibold text-[#4f5e42]">
                            #{comment.taggedDish}
                          </span>
                        </div>
                      ) : null}

                      {comment.imageUrls.filter((url) => url && !url.startsWith('blob:')).length > 0 ? (
                        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_180px]">
                          <p className="text-[15px] leading-7 text-[#444840]">
                            {normalizedBody}
                          </p>
                          <img
                            src={comment.imageUrls.find((url) => url && !url.startsWith('blob:'))}
                            alt={comment.authorName}
                            className="h-[124px] w-full rounded-[14px] object-cover"
                          />
                        </div>
                      ) : (
                        <div className="mt-4">
                          <p className="text-[15px] leading-7 text-[#444840]">
                            {normalizedBody}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#edf0e7] pt-4 text-sm text-[#7a8174]">
                        <button type="button" className="rounded-full bg-[#f7f8f4] px-4 py-2 transition hover:bg-[#eef2ea]">
                          Hữu ích · {comment.likes}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleReplies(comment.id)}
                          className="rounded-full bg-[#f7f8f4] px-4 py-2 transition hover:bg-[#eef2ea]"
                        >
                          Trả lời · {replies.length}
                        </button>
                      </div>

                      {replyingTo === comment.id ? (
                        <div className="mt-4 rounded-[16px] bg-[#f7f8f4] p-4">
                          {!dangNhap ? (
                            <p className="text-sm text-[#6f7786]">
                              Bạn cần đăng nhập để phản hồi.{' '}
                              <Link href="/login" className="font-semibold text-[#2f8f22] underline">
                                Đi đến đăng nhập
                              </Link>
                            </p>
                          ) : (
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
                                  placeholder={`Phản hồi ${comment.authorName}...`}
                                  className="w-full resize-none rounded-[12px] border border-[#e1e5dc] bg-white px-4 py-3 text-[14px] leading-6 text-[#40443d] placeholder:text-[#98a08f] focus:outline-none"
                                />
                                <div className="mt-3 flex justify-end gap-3">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setReplyingTo(null);
                                      setReplyDrafts((current) => ({
                                        ...current,
                                        [comment.id]: '',
                                      }));
                                    }}
                                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#6f776b] transition hover:bg-[#f0f3eb]"
                                  >
                                    Hủy
                                  </button>
                                  <button
                                    type="button"
                                    disabled={isSubmitting || !(replyDrafts[comment.id] ?? '').trim()}
                                    onClick={() => void handleSubmit(comment.id)}
                                    className="rounded-full bg-[#1f86ff] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1274ea] disabled:cursor-not-allowed disabled:opacity-60"
                                  >
                                    {isSubmitting ? 'Đang gửi...' : 'Gửi phản hồi'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : null}

                      {expandedReplies[comment.id] && replies.length > 0 ? (
                        <div className="mt-4 space-y-3 border-t border-[#edf0e7] pt-4">
                          {replies.map((reply, replyIndex) => (
                            <article
                              key={reply.id}
                              className="ml-4 rounded-[16px] border border-[#e8ece2] bg-[#fafbf8] p-4"
                            >
                              <div className="flex items-start gap-3">
                                <img
                                  src={reply.authorAvatar || `https://i.pravatar.cc/120?img=${(replyIndex % 10) + 30}`}
                                  alt={reply.authorName}
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-3">
                                    <h6 className="text-sm font-semibold text-[#252525]">
                                      {reply.authorName}
                                    </h6>
                                    <span className="text-xs text-[#8a8f85]">
                                      {formatDateTime(reply.createdAt)}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-[14px] leading-6 text-[#50544c]">
                                    {reply.content}
                                  </p>
                                </div>
                              </div>
                            </article>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            )}

            {error ? (
              <p className="mt-4 text-sm text-red-500">{error}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
