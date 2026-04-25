import { figmaFallbackAssets } from '@/shared/assets/figmaFallback';
import { userContentApi } from '@/shared/userContentApi';

export type ExploreCategory = {
  id: string;
  title: string;
  image: string;
};

export type ExploreStoreCard = {
  id: string;
  categoryId: string;
  title: string;
  address: string;
  meta: string;
  status: string;
  image: string;
  rating?: string;
  distance?: string;
  featuredItem?: string;
  price?: string;
};

export type ExplorePageData = {
  categories: ExploreCategory[];
  nearby: ExploreStoreCard[];
  recommendations: ExploreStoreCard[];
  topReviewerPicks: ExploreStoreCard[];
};

const imgFallbacks = [
  figmaFallbackAssets.storeImage,
  figmaFallbackAssets.menuItemImage,
  figmaFallbackAssets.feedDishImage,
  figmaFallbackAssets.heroBanner,
  figmaFallbackAssets.dishCollage,
] as const;

function formatPrice(v?: number) {
  if (!v && v !== 0) return undefined;
  return `${v.toLocaleString('vi-VN')}đ`;
}

function pickImage(v?: string | null, idx = 0) {
  return v || imgFallbacks[idx % imgFallbacks.length];
}

export async function getExplorePageData(query?: { dia_chi_giao?: string; khu_vuc?: string }) {
  const payload: any = await userContentApi.layTrangKhamPha({
    dia_chi_giao: query?.dia_chi_giao,
    khu_vuc: query?.khu_vuc,
  });

  const categories = Array.isArray(payload?.bo_suu_tap_theo_danh_muc)
    ? payload.bo_suu_tap_theo_danh_muc.map((item: any, index: number) => ({
        id: String(item.id_danh_muc),
        title: String(item.ten_danh_muc ?? 'Danh mục'),
        image: pickImage(item.mon_an?.[0]?.hinh_anh, index),
      }))
    : [];

  const nearby = Array.isArray(payload?.quan_an_gan_ban)
    ? payload.quan_an_gan_ban.map((item: any, index: number) => ({
        id: String(item.id),
        categoryId: 'nearby',
        title: String(item.ten_quan ?? 'Cửa hàng'),
        address: String(item.dia_chi ?? ''),
        meta: `★ ${Number(item.diem_danh_gia || 0).toFixed(1)}`,
        status: 'PROMO',
        image: pickImage(item.hinh_anh_mon, index),
        rating: `${Number(item.diem_danh_gia || 0).toFixed(1)}`,
      }))
    : [];

  const recommendations = Array.isArray(payload?.mon_goi_y_cho_ban)
    ? payload.mon_goi_y_cho_ban.map((item: any, index: number) => ({
        id: String(item.id_cua_hang ?? item.id ?? index + 1),
        categoryId: 'goi-y',
        title: String(item.ten_mon ?? 'Món gợi ý'),
        address: 'Món gợi ý cho bạn',
        meta: `★ ${Number(item.diem_danh_gia || 0).toFixed(1)}`,
        status: 'PROMO',
        image: pickImage(item.hinh_anh, index + 1),
        rating: `${Number(item.diem_danh_gia || 0).toFixed(1)}`,
        featuredItem: item.ten_mon,
        price: formatPrice(Number(item.gia_ban || 0)),
      }))
    : [];

  const topReviewerPicks = (Array.isArray(payload?.bo_suu_tap_theo_danh_muc) ? payload.bo_suu_tap_theo_danh_muc : [])
    .flatMap((cat: any) =>
      (Array.isArray(cat?.mon_an) ? cat.mon_an : []).map((dish: any, index: number) => ({
        id: String(dish.id_cua_hang ?? dish.id ?? index + 1),
        categoryId: String(cat.id_danh_muc),
        title: String(dish.ten_mon ?? 'Món ăn'),
        address: String(cat.ten_danh_muc ?? 'Danh mục'),
        meta: `★ ${Number(dish.diem_danh_gia || 0).toFixed(1)}`,
        status: 'PROMO',
        image: pickImage(dish.hinh_anh, index + 2),
        rating: `${Number(dish.diem_danh_gia || 0).toFixed(1)}`,
        featuredItem: dish.ten_mon,
        price: formatPrice(Number(dish.gia_ban || 0)),
      })),
    )
    .slice(0, 12);

  return {
    categories,
    nearby,
    recommendations,
    topReviewerPicks,
  } as ExplorePageData;
}
