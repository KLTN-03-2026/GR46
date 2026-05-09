import { userContentApi } from '@/shared/userContentApi';

export type RankingTab = 'stores' | 'reviewers' | 'foods';

export type RankingRowItem = {
  id: string;
  rank: number;
  name: string;
  secondaryName?: string;
  secondaryHref?: string;
  logo?: string;
  secondaryLogo?: string;
  score: string;
  metric: string;
  secondaryMetric?: string;
  finalMetric?: string;
  trend?: 'up' | 'down' | 'neutral';
  href?: string;
};

export type RankingTabConfig = {
  label: string;
  filters: string[];
  columns: {
    primary: string;
    secondary?: string;
    score: string;
    metric: string;
    secondaryMetric?: string;
    finalMetric?: string;
  };
  rows: RankingRowItem[];
};

export type RankingPageData = Record<RankingTab, RankingTabConfig>;
export type RankingFilterQuery = {
  so_don_hang_tu?: number;
  diem_danh_gia_tu?: number;
  trang_thai?: 'hoat_dong' | 'tam_dung' | 'cho_duyet';
  ty_le_huy_toi_da?: number;
};

const EMPTY: RankingPageData = {
  stores: {
    label: 'Cửa hàng',
    filters: ['Số đơn hàng', 'Đánh giá', 'Trạng thái', 'Tỷ lệ hủy'],
    columns: { primary: 'Cửa hàng', score: 'Đánh giá', metric: 'Số đơn hàng', finalMetric: 'Tỉ lệ hủy' },
    rows: [],
  },
  reviewers: {
    label: 'Reviewer',
    filters: ['Số đơn hàng', 'Đánh giá', 'Trạng thái', 'Tỷ lệ hủy'],
    columns: { primary: 'Food Reviewer', score: 'Độ tin cậy', metric: 'Lượt xem', secondaryMetric: 'Lượt thích', finalMetric: 'Lượt bình luận' },
    rows: [],
  },
  foods: {
    label: 'Món ăn',
    filters: ['Số đơn hàng', 'Đánh giá', 'Trạng thái', 'Tỷ lệ hủy'],
    columns: { primary: 'Món ăn', secondary: 'Cửa hàng', score: 'Đánh giá', metric: 'Đã bán' },
    rows: [],
  },
};

function tabToApiTab(tab: RankingTab): 'cua_hang' | 'reviewer' | 'mon_an' {
  if (tab === 'reviewers') return 'reviewer';
  if (tab === 'foods') return 'mon_an';
  return 'cua_hang';
}

function scoreText(value: number) {
  return `${value.toFixed(1)} ★`;
}

export async function getRankingData(
  tab: RankingTab,
  tuKhoa?: string,
  filters?: RankingFilterQuery,
): Promise<RankingPageData> {
  const data = structuredClone(EMPTY) as RankingPageData;
  const payload: any = await userContentApi.layBangXepHangChiTiet({
    tab: tabToApiTab(tab),
    tu_khoa: tuKhoa || undefined,
    so_don_hang_tu: filters?.so_don_hang_tu,
    diem_danh_gia_tu: filters?.diem_danh_gia_tu,
    trang_thai: filters?.trang_thai,
    ty_le_huy_toi_da: filters?.ty_le_huy_toi_da,
    trang: 1,
    so_luong: 10,
  });

  const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];

  if (tab === 'stores') {
    data.stores.rows = rows.map((item: any) => ({
      id: String(item.id),
      rank: Number(item.xep_hang || 0),
      name: item.ten_cua_hang,
      score: scoreText(Number(item.diem_danh_gia || 0)),
      metric: `${item.so_don_hang || 0}`,
      finalMetric: `${Number(item.ty_le_huy_don || 0).toFixed(2)}%`,
      href: `/explore/store/${item.id}`,
    }));
  }

  if (tab === 'reviewers') {
    data.reviewers.rows = rows.map((item: any) => ({
      id: String(item.id),
      rank: Number(item.xep_hang || 0),
      name: item.ten_reviewer,
      score: scoreText(Number(item.do_tin_cay || 0)),
      metric: `${item.luot_xem || 0}`,
      secondaryMetric: `${item.luot_thich || 0}`,
      finalMetric: `${item.luot_binh_luan || 0}`,
      href: `/ranking/reviewer/${item.id}`,
    }));
  }

  if (tab === 'foods') {
    data.foods.rows = rows.map((item: any) => ({
      id: String(item.id),
      rank: Number(item.xep_hang || 0),
      name: item.ten_mon_an,
      secondaryName: item.ten_cua_hang,
      score: scoreText(Number(item.diem_danh_gia || 0)),
      metric: `${item.so_luong_da_ban || 0}`,
      href: `/ranking/food/${item.id}`,
    }));
  }

  return data;
}
