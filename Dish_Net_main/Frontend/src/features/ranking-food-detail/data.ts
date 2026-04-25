import { userContentApi } from '@/shared/userContentApi';

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

function starText(value: number) {
  const rounded = Math.round(value);
  return `${'★'.repeat(Math.max(0, Math.min(5, rounded)))}${'☆'.repeat(Math.max(0, 5 - rounded))}`;
}

export async function getRankingFoodDetailById(id: string): Promise<RankingFoodDetailData | null> {
  const idMonAn = Number(id);
  if (!Number.isFinite(idMonAn) || idMonAn <= 0) return null;

  const payload: any = await userContentApi.layDanhGiaMonAn(idMonAn, { trang: 1, so_luong: 40 });
  if (!payload?.mon_an) return null;

  const rankingPayload: any = await userContentApi.layBangXepHangChiTiet({
    tab: 'mon_an',
    tu_khoa: String(payload.mon_an.ten_mon ?? ''),
    trang: 1,
    so_luong: 50,
  });
  const rankingRows = Array.isArray(rankingPayload?.du_lieu)
    ? rankingPayload.du_lieu
    : [];
  const rankingItem =
    rankingRows.find((item: any) => Number(item?.id) === idMonAn) || null;

  const monSearchPayload: any = await userContentApi.timKiem({
    tu_khoa: String(payload.mon_an.ten_mon ?? ''),
    loai: 'mon_an',
    trang: 1,
    so_luong: 50,
  });
  const monRows = Array.isArray(monSearchPayload?.ket_qua?.mon_an?.du_lieu)
    ? monSearchPayload.ket_qua.mon_an.du_lieu
    : [];
  const monItem =
    monRows.find((item: any) => Number(item?.id) === Number(payload.mon_an.id)) ||
    monRows[0] ||
    null;
  const storeId =
    monItem?.id_cua_hang != null ? Number(monItem.id_cua_hang) : null;

  const storeNameFromRanking = String(rankingItem?.ten_cua_hang ?? '').trim();

  const storePayload: any = storeNameFromRanking
    ? await userContentApi.timKiem({
        tu_khoa: storeNameFromRanking,
        loai: 'cua_hang',
        trang: 1,
        so_luong: 50,
      })
    : null;
  const storeRows = Array.isArray(storePayload?.ket_qua?.cua_hang?.du_lieu)
    ? storePayload.ket_qua.cua_hang.du_lieu
    : [];
  const store =
    (storeId != null
      ? storeRows.find((item: any) => Number(item?.id) === storeId)
      : null) ||
    storeRows[0] ||
    null;

  const reviews = (Array.isArray(payload?.du_lieu) ? payload.du_lieu : []).map((item: any) => ({
    id: String(item.id),
    author: item.ten_nguoi_danh_gia || 'Người dùng',
    date: item.ngay_danh_gia ? new Date(item.ngay_danh_gia).toLocaleDateString('vi-VN') : '',
    avatar: item.anh_nguoi_danh_gia || 'https://i.pravatar.cc/80',
    heroImage: (Array.isArray(item.tep_dinh_kem) ? item.tep_dinh_kem[0] : null) || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    gallery: Array.isArray(item.tep_dinh_kem) ? item.tep_dinh_kem : [],
    excerpt: String(item.noi_dung || ''),
    tags: ['Ngon', 'Nên thử', 'Đậm vị'],
    stats: {
      likes: String(item.tong_luot_thich ?? 0),
      comments: '0',
      shares: '0',
      sends: '0',
    },
  }));

  const comments = reviews.map((review: FoodReviewCard) => ({
    id: review.id,
    author: review.author,
    source: 'DishNet',
    date: review.date,
    rating: starText(
      Number(
        (Array.isArray(payload?.du_lieu)
          ? payload.du_lieu.find((item: any) => String(item?.id) === review.id)?.so_sao
          : 0) || 0,
      ),
    ),
    title: 'Đánh giá món ăn',
    body: review.excerpt,
    gallery: review.gallery,
  }));

  const resolvedScore = Number(
    rankingItem?.diem_danh_gia ??
      monItem?.diem_danh_gia ??
      payload?.thong_ke?.diem_trung_binh ??
      0,
  );

  return {
    id: String(payload.mon_an.id),
    title: payload.mon_an.ten_mon || 'Món ăn',
    storeName: store?.ten_cua_hang || rankingItem?.ten_cua_hang || 'Cửa hàng',
    coverImage: payload.mon_an.hinh_anh || reviews[0]?.heroImage || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    address: store?.dia_chi || store?.khu_vuc || '',
    hours: '',
    priceRange:
      monItem?.gia_ban != null
        ? `${Number(monItem.gia_ban).toLocaleString('vi-VN')}đ`
        : '',
    score: resolvedScore.toFixed(1),
    reviews,
    comments,
  };
}
