import { figmaFallbackAssets } from '@/shared/assets/figmaFallback';
import { userContentApi } from '@/shared/userContentApi';

export type StoreDetailMenuTopping = {
    id: string;
    ten_topping: string;
    gia: number;
};

export type StoreDetailMenuItem = {
    id: string;
    categoryId: string;
    name: string;
    note: string;
    price: string;
    image: string;
    toppings: StoreDetailMenuTopping[];
};

export type StoreDetailMenuCategory = {
    id: string;
    label: string;
};

export type StoreDetailReviewCard = {
    id: string;
    userId?: string;
    avatar?: string;
    author: string;
    date: string;
    excerpt: string;
    heroImage: string;
    gallery: string[];
};

export type StoreDetailComment = {
    id: string;
    userId?: string;
    avatar?: string;
    author: string;
    source: string;
    date: string;
    rating: string;
    title: string;
    body: string;
    gallery?: string[];
};

export type StoreDetailData = {
    id: string;
    ownerId: number | null;
    title: string;
    subtitle: string;
    coverImage: string;
    views: string;
    address: string;
    hours: string;
    priceRange: string;
    score: string;
    soldCount: string;
    reviewCount: string;
    commentCount: string;
    menuCategories: StoreDetailMenuCategory[];
    menuItems: StoreDetailMenuItem[];
    reviewCards: StoreDetailReviewCard[];
    communityImages: string[];
    comments: StoreDetailComment[];
};

function normalizeText(value: string) {
    return value
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .trim();
}

function formatCurrency(value: number) {
    return `${value.toLocaleString('vi-VN')}đ`;
}

function formatDate(value: string) {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('vi-VN');
}

export async function getStoreDetailById(id: string): Promise<StoreDetailData | null> {
    const storeId = Number(id);
    if (!Number.isFinite(storeId) || storeId <= 0) {
        return null;
    }

    let storeDetail: any = null;
    try {
        storeDetail = await userContentApi.layChiTietCuaHang(storeId);
    } catch {
        return null;
    }

    const fallbackImage =
        storeDetail?.anh_dai_dien || figmaFallbackAssets.storeImage || figmaFallbackAssets.feedDishImage;

    const cuaHangPayload: any = await userContentApi.timKiem({
        tu_khoa: String(storeDetail?.ten_cua_hang ?? ''),
        loai: 'cua_hang',
        so_luong: 20,
        trang: 1,
    });

    const cuaHangRows = Array.isArray(cuaHangPayload?.ket_qua?.cua_hang?.du_lieu)
        ? cuaHangPayload.ket_qua.cua_hang.du_lieu
        : [];

    const numericId = Number(id);
    let matchedStore =
        cuaHangRows.find((item: any) => Number(item?.id) === numericId) ||
        cuaHangRows.find((item: any) =>
            normalizeText(String(item?.ten_cua_hang ?? '')) ===
            normalizeText(String(storeDetail?.ten_cua_hang ?? '')),
        ) ||
        storeDetail ||
        null;

    let resolvedStoreId =
        matchedStore?.id != null ? Number(matchedStore.id) : null;

    const monPayload: any = await userContentApi.timKiem({
        tu_khoa: String(matchedStore?.ten_cua_hang ?? storeDetail?.ten_cua_hang ?? ''),
        loai: 'mon_an',
        so_luong: 80,
        trang: 1,
    });

    const monRowsRaw = Array.isArray(monPayload?.ket_qua?.mon_an?.du_lieu)
        ? monPayload.ket_qua.mon_an.du_lieu
        : [];

    if (resolvedStoreId == null && Number.isFinite(numericId)) {
        const hasAsStoreId = monRowsRaw.some((item: any) => Number(item?.id_cua_hang) === numericId);
        if (hasAsStoreId) {
            resolvedStoreId = numericId;
        }
    }

    if (resolvedStoreId == null && Number.isFinite(numericId)) {
        const matchedDish = monRowsRaw.find((item: any) => Number(item?.id) === numericId);
        if (matchedDish?.id_cua_hang != null) {
            resolvedStoreId = Number(matchedDish.id_cua_hang);
        }
    }

    if (!matchedStore && storeDetail?.ten_cua_hang) {
        const fallbackStorePayload: any = await userContentApi.timKiem({
            tu_khoa: String(storeDetail.ten_cua_hang),
            loai: 'cua_hang',
            so_luong: 20,
            trang: 1,
        });
        const fallbackStoreRows = Array.isArray(fallbackStorePayload?.ket_qua?.cua_hang?.du_lieu)
            ? fallbackStorePayload.ket_qua.cua_hang.du_lieu
            : [];
        matchedStore =
            fallbackStoreRows.find(
                (item: any) => resolvedStoreId != null && Number(item?.id) === resolvedStoreId,
            ) ||
            fallbackStoreRows.find(
                (item: any) =>
                    normalizeText(String(item?.ten_cua_hang ?? '')) ===
                    normalizeText(String(storeDetail?.ten_cua_hang ?? '')),
            ) ||
            matchedStore;
    }

    const monRows =
        resolvedStoreId != null
            ? monRowsRaw.filter((item: any) => Number(item?.id_cua_hang) === resolvedStoreId)
            : monRowsRaw;

    const menuCategories: StoreDetailMenuCategory[] = [
        {
            id: 'menu',
            label: 'Món ăn',
        },
    ];

    const menuItems: StoreDetailMenuItem[] = monRows.slice(0, 24).map((item: any) => ({
        id: String(item.id),
        categoryId: 'menu',
        name: String(item.ten_mon ?? 'Món ăn'),
        note: String(item.mo_ta ?? ''),
        price: formatCurrency(Number(item.gia_ban ?? 0)),
        image: String(item.hinh_anh ?? fallbackImage),
        toppings: Array.isArray(item.toppings)
            ? item.toppings
                  .filter((tp: any) => tp && (tp.trang_thai == null || tp.trang_thai === 'hieu_luc'))
                  .map((tp: any) => ({
                      id: String(tp.id ?? ''),
                      ten_topping: String(tp.ten_topping ?? ''),
                      gia: Number(tp.gia ?? 0),
                  }))
            : [],
    }));

    const dishIds = Array.from(
        new Set<number>(
            monRows
                .slice(0, 4)
                .map((item: any) => Number(item.id))
                .filter((x: number) => Number.isFinite(x) && x > 0),
        ),
    );
    const [reviewPayloads, baiVietPayload] = await Promise.all([
        Promise.all(
            dishIds.map((dishId) =>
                userContentApi.layDanhGiaMonAn(dishId, { trang: 1, so_luong: 6 }).catch(() => null),
            ),
        ),
        resolvedStoreId != null
            ? userContentApi.layBaiVietCuaHang(resolvedStoreId, { so_luong: 10 }).catch(() => null)
            : Promise.resolve(null),
    ]);

    const reviewCards: StoreDetailReviewCard[] = [];
    const comments: StoreDetailComment[] = [];

    // Bài viết review từ các TikToker/blogger gắn với cửa hàng này
    const baiVietRows = Array.isArray((baiVietPayload as any)?.du_lieu)
        ? (baiVietPayload as any).du_lieu
        : [];
    baiVietRows.forEach((post: any) => {
        const gallery = Array.isArray(post?.tep_dinh_kem) ? post.tep_dinh_kem : [];
        const heroImage = gallery[0] || fallbackImage;
        const postId = `bv-${post.id}`;
        const authorId = post.thong_tin_nguoi_dang?.id
            ? String(post.thong_tin_nguoi_dang.id)
            : undefined;
        const avatar = post.thong_tin_nguoi_dang?.anh_dai_dien ?? undefined;
        const author = String(post.thong_tin_nguoi_dang?.ten_hien_thi ?? 'Reviewer');

        reviewCards.push({
            id: postId,
            userId: authorId,
            avatar,
            author,
            date: formatDate(String(post?.ngay_dang ?? '')),
            excerpt: String(post?.noi_dung ?? ''),
            heroImage,
            gallery: gallery.length > 0 ? gallery : [heroImage],
        });

        comments.push({
            id: postId,
            userId: authorId,
            avatar,
            author,
            source: 'Bảng Tin',
            date: formatDate(String(post?.ngay_dang ?? '')),
            rating: post.so_sao != null ? `${Number(post.so_sao)}/5` : '',
            title: 'Bài viết review',
            body: String(post?.noi_dung ?? ''),
            gallery,
        });
    });

    reviewPayloads.forEach((payload, payloadIndex) => {
        const monInfo = payload?.mon_an;
        const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
        rows.forEach((review: any, reviewIndex: number) => {
            const gallery = Array.isArray(review?.tep_dinh_kem)
                ? review.tep_dinh_kem
                : [];
            const heroImage =
                gallery[0] ||
                monInfo?.hinh_anh ||
                monRows[payloadIndex]?.hinh_anh ||
                fallbackImage;

            const reviewUserId = review?.id_nguoi_dung ? String(review.id_nguoi_dung) : undefined;
            const reviewAvatar = review?.anh_nguoi_danh_gia ? String(review.anh_nguoi_danh_gia) : undefined;

            reviewCards.push({
                id: String(review?.id ?? `${payloadIndex}-${reviewIndex}`),
                userId: reviewUserId,
                avatar: reviewAvatar,
                author: String(review?.ten_nguoi_danh_gia ?? 'Người dùng'),
                date: formatDate(String(review?.ngay_danh_gia ?? '')),
                excerpt: String(review?.noi_dung ?? ''),
                heroImage,
                gallery: gallery.length > 0 ? gallery : [heroImage],
            });

            comments.push({
                id: String(review?.id ?? `${payloadIndex}-${reviewIndex}`),
                userId: reviewUserId,
                avatar: reviewAvatar,
                author: String(review?.ten_nguoi_danh_gia ?? 'Người dùng'),
                source: String(monInfo?.ten_mon ?? 'DishNet'),
                date: formatDate(String(review?.ngay_danh_gia ?? '')),
                rating: `${Number(review?.so_sao ?? 0)}/5`,
                title: 'Đánh giá món ăn',
                body: String(review?.noi_dung ?? ''),
                gallery,
            });
        });
    });

    const prices = monRows
        .map((item: any) => Number(item?.gia_ban ?? 0))
        .filter((item: number) => Number.isFinite(item) && item > 0);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

    const soldCount = monRows.reduce(
        (sum: number, item: any) => sum + Number(item?.so_luong_da_ban ?? 0),
        0,
    );

    const coverImage =
        matchedStore?.anh_dai_dien ||
        menuItems[0]?.image ||
        fallbackImage;

    return {
        id: String(resolvedStoreId ?? storeId),
        ownerId:
            storeDetail?.id_chu_so_huu != null ? Number(storeDetail.id_chu_so_huu) : null,
        title: String(matchedStore?.ten_cua_hang ?? storeDetail?.ten_cua_hang ?? 'Cửa hàng'),
        subtitle: 'Cửa hàng trên DishNet',
        coverImage,
        views: `${Number(matchedStore?.tong_luot_xem ?? storeDetail?.tong_luot_xem ?? 0).toLocaleString('vi-VN')} lượt xem`,
        address: String(matchedStore?.dia_chi ?? storeDetail?.dia_chi ?? ''),
        hours:
            storeDetail?.gio_mo_cua && storeDetail?.gio_dong_cua
                ? `${String(storeDetail.gio_mo_cua).slice(0, 5)} - ${String(storeDetail.gio_dong_cua).slice(0, 5)}`
                : '',
        priceRange:
            minPrice > 0 && maxPrice > 0
                ? `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`
                : '',
        score: (() => {
            const ratings: number[] = [
                ...baiVietRows
                    .map((post: any) => Number(post?.so_sao))
                    .filter((n: number) => Number.isFinite(n) && n > 0),
                ...reviewPayloads.flatMap((payload) =>
                    (Array.isArray(payload?.du_lieu) ? payload.du_lieu : [])
                        .map((review: any) => Number(review?.so_sao))
                        .filter((n: number) => Number.isFinite(n) && n > 0),
                ),
            ];
            if (ratings.length > 0) {
                return (ratings.reduce((sum, n) => sum + n, 0) / ratings.length).toFixed(1);
            }
            return Number(matchedStore?.diem_danh_gia ?? storeDetail?.diem_danh_gia ?? 0).toFixed(1);
        })(),
        soldCount: soldCount.toLocaleString('vi-VN'),
        reviewCount: String(reviewCards.length),
        commentCount: String(comments.length),
        menuCategories,
        menuItems,
        reviewCards: reviewCards.slice(0, 8),
        communityImages: (() => {
            const isImage = (url: string) => /\.(jpe?g|png|gif|webp|avif)(\?|$)/i.test(url);
            const seen = new Set<string>();
            const imgs: string[] = [];
            const collect = (files: string[]) => {
                files.filter(isImage).forEach((url) => { if (!seen.has(url)) { seen.add(url); imgs.push(url); } });
            };
            baiVietRows.forEach((post: any) => collect(Array.isArray(post?.tep_dinh_kem) ? post.tep_dinh_kem : []));
            reviewPayloads.forEach((payload) => {
                (Array.isArray(payload?.du_lieu) ? payload.du_lieu : []).forEach((review: any) =>
                    collect(Array.isArray(review?.tep_dinh_kem) ? review.tep_dinh_kem : [])
                );
            });
            return imgs.length > 0 ? imgs.slice(0, 12) : menuItems.slice(0, 8).map((item) => item.image);
        })(),
        comments: comments.slice(0, 12),
    };
}
