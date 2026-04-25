import { userContentApi } from '@/shared/userContentApi';

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
  bio: string;
  trustScore: string;
  postsCount: string;
  followers: string;
  following: string;
  posts: ReviewerProfilePost[];
  videos: ReviewerVideo[];
  yeuCauDangNhapDeTuongTac: string[];
  postPaging: {
    trang: number;
    tongTrang: number;
    tongSo: number;
    soLuong: number;
  };
  videoPaging: {
    trang: number;
    tongTrang: number;
    tongSo: number;
    soLuong: number;
  };
};

type ReviewerContentTab = 'bai_viet' | 'video';
type ReviewerContentPaging = {
  trang: number;
  tongTrang: number;
  tongSo: number;
  soLuong: number;
};

export async function getReviewerContentPage(
  idNguoiDung: number,
  tab: ReviewerContentTab,
  trang: number,
  soLuong = 20,
): Promise<{ items: ReviewerProfilePost[] | ReviewerVideo[]; paging: ReviewerContentPaging }> {
  const payload = (await userContentApi.layNoiDungTrangCaNhan(idNguoiDung, {
    tab,
    trang,
    so_luong: soLuong,
  })) as Record<string, unknown>;

  const rows = Array.isArray(payload?.du_lieu) ? (payload.du_lieu as Record<string, unknown>[]) : [];
  const paging = {
    trang: Number(payload?.trang ?? trang),
    tongTrang: Number(payload?.tong_trang ?? 1),
    tongSo: Number(payload?.tong_so ?? rows.length),
    soLuong: Number(payload?.so_luong ?? soLuong),
  };

  if (tab === 'video') {
    const items: ReviewerVideo[] = rows.map((item) => ({
      id: String(item.id),
      image:
        (Array.isArray(item.tep_dinh_kem) ? String(item.tep_dinh_kem[0] ?? '') : '') ||
        'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80',
      views: String(item.tong_luot_thich ?? 0),
    }));
    return { items, paging };
  }

  const items: ReviewerProfilePost[] = rows.map((item) => ({
    id: String(item.id),
    date: item.ngay_dang ? new Date(item.ngay_dang).toLocaleDateString('vi-VN') : '',
    content: String(item.noi_dung ?? ''),
    images: Array.isArray(item.tep_dinh_kem) ? item.tep_dinh_kem.map((value) => String(value)) : [],
    likes: String(item.tong_luot_thich ?? 0),
    comments: String(item.tong_luot_binh_luan ?? 0),
    shares: String(item.tong_luot_chia_se ?? 0),
    sends: '0',
  }));
  return { items, paging };
}

export async function getRankingReviewerDetailById(id: string): Promise<RankingReviewerDetailData | null> {
  const idNguoiDung = Number(id);
  if (!Number.isFinite(idNguoiDung) || idNguoiDung <= 0) return null;

  const [profilePayload, postPage, videoPage] = await Promise.all([
    userContentApi.layThongTinTrangCaNhan(idNguoiDung) as Promise<Record<string, unknown>>,
    getReviewerContentPage(idNguoiDung, 'bai_viet', 1, 20),
    getReviewerContentPage(idNguoiDung, 'video', 1, 20),
  ]);

  const info = (profilePayload?.thong_tin_co_ban ?? null) as Record<string, unknown> | null;
  if (!info) return null;

  return {
    id: String(info.id),
    name: String(info.ten_hien_thi ?? 'Người dùng'),
    handle: String(info.ten_tai_khoan ?? `user-${String(info.id ?? '')}`),
    avatar: String(info.anh_dai_dien ?? 'https://i.pravatar.cc/180'),
    bio: String(info.mo_ta_ca_nhan ?? ''),
    trustScore: '0',
    postsCount: String(info.so_bai_viet ?? (postPage.items as ReviewerProfilePost[]).length),
    followers: String(info.so_nguoi_theo_doi ?? 0),
    following: String(info.so_nguoi_dang_theo_doi ?? 0),
    posts: postPage.items as ReviewerProfilePost[],
    videos: videoPage.items as ReviewerVideo[],
    yeuCauDangNhapDeTuongTac: Array.isArray(profilePayload?.yeu_cau_dang_nhap_de_tuong_tac)
      ? profilePayload.yeu_cau_dang_nhap_de_tuong_tac.map((item) => String(item))
      : [],
    postPaging: postPage.paging,
    videoPaging: videoPage.paging,
  };
}

export type ReviewerConversation = {
  id: string;
  reviewerName: string;
  reviewerHandle: string;
  avatar: string;
  lastSeen: string;
  messages: Array<{ id: string; from: 'me' | 'them'; text: string; time: string }>;
};

export async function getReviewerConversationById(id: string): Promise<ReviewerConversation | null> {
  const reviewer = await getRankingReviewerDetailById(id);
  if (!reviewer) return null;

  return {
    id,
    reviewerName: reviewer.name,
    reviewerHandle: reviewer.handle,
    avatar: reviewer.avatar,
    lastSeen: '',
    messages: [],
  };
}
