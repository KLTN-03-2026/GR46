import { KhuyenMaiEntity } from "../../Api/Admin/entities/khuyen-mai.entity";
import type { SeederContext } from "./context";

function atTime(date: Date, hours: number, minutes: number, seconds = 0) {
  const next = new Date(date);
  next.setHours(hours, minutes, seconds, 0);
  return next;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export async function seedKhuyenMai(context: SeederContext) {
  const repo = context.dataSource.getRepository(KhuyenMaiEntity);
  const now = new Date();
  const todayStart = atTime(now, 0, 0, 0);
  const todayEnd = atTime(now, 23, 59, 59);

  const systemPromoCodes = [
    "HETHONG20",
    "FREESHIPDN",
    "NEW50K",
    "PAUSE15",
    "WEEKEND30",
    "SAVE10MAX",
    "LUNCH25K",
    "NIGHTOWL12",
    "FESTIVAL50",
    "SHIP0WEEK",
  ];

  const storePromoCodes = [
    "NETBUN25",
    "NEHUE15",
    "NETHS20",
    "QUANCOM10",
    "NETCOMBO35",
    "NEBUNCHA10",
    "QUANCOM15K",
    "COMTRUAFS",
  ];

  await repo
    .createQueryBuilder()
    .delete()
    .where("ma_khuyen_mai IN (:...codes)", {
      codes: [...systemPromoCodes, ...storePromoCodes],
    })
    .execute();

  await repo.save([
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Giam 20% toan he thong",
      ma_khuyen_mai: "HETHONG20",
      loai_khuyen_mai: "phan_tram",
      gia_tri_khuyen_mai: 20,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 50000,
      so_luot_toi_da: null,
      so_luot_da_dung: 315,
      thoi_gian_bat_dau: addDays(todayStart, -7),
      thoi_gian_ket_thuc: addDays(todayEnd, 7),
      trang_thai: "dang_dien_ra",
      mo_ta: "Don toi thieu 50.000d",
    },
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Mien phi van chuyen toan san",
      ma_khuyen_mai: "FREESHIPDN",
      loai_khuyen_mai: "mien_phi_van_chuyen",
      gia_tri_khuyen_mai: 0,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 80000,
      so_luot_toi_da: null,
      so_luot_da_dung: 124,
      thoi_gian_bat_dau: addDays(todayStart, -3),
      thoi_gian_ket_thuc: addDays(todayEnd, 3),
      trang_thai: "dang_dien_ra",
      mo_ta: "Don toi thieu 80.000d",
    },
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Uu dai khach hang moi 50k",
      ma_khuyen_mai: "NEW50K",
      loai_khuyen_mai: "so_tien",
      gia_tri_khuyen_mai: 50000,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 150000,
      so_luot_toi_da: null,
      so_luot_da_dung: 0,
      thoi_gian_bat_dau: addDays(todayStart, 1),
      thoi_gian_ket_thuc: addDays(todayEnd, 10),
      trang_thai: "sap_dien_ra",
      mo_ta: "Don toi thieu 150.000d",
    },
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Giam 15% cuoi tuan",
      ma_khuyen_mai: "PAUSE15",
      loai_khuyen_mai: "phan_tram",
      gia_tri_khuyen_mai: 15,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 100000,
      so_luot_toi_da: null,
      so_luot_da_dung: 48,
      thoi_gian_bat_dau: addDays(todayStart, -2),
      thoi_gian_ket_thuc: addDays(todayEnd, 5),
      trang_thai: "tam_dung",
      mo_ta: "Don toi thieu 100.000d",
    },
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Flash sale giam 30k",
      ma_khuyen_mai: "WEEKEND30",
      loai_khuyen_mai: "so_tien",
      gia_tri_khuyen_mai: 30000,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 120000,
      so_luot_toi_da: null,
      so_luot_da_dung: 402,
      thoi_gian_bat_dau: addDays(todayStart, -10),
      thoi_gian_ket_thuc: addDays(todayEnd, -5),
      trang_thai: "da_ket_thuc",
      mo_ta: "Don toi thieu 120.000d",
    },
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Giam 10% hoa don lon",
      ma_khuyen_mai: "SAVE10MAX",
      loai_khuyen_mai: "phan_tram",
      gia_tri_khuyen_mai: 10,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 300000,
      so_luot_toi_da: null,
      so_luot_da_dung: 510,
      thoi_gian_bat_dau: addDays(todayStart, -5),
      thoi_gian_ket_thuc: addDays(todayEnd, 14),
      trang_thai: "dang_dien_ra",
      mo_ta: "Don toi thieu 300.000d",
    },
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Giam 25k khung gio bua trua",
      ma_khuyen_mai: "LUNCH25K",
      loai_khuyen_mai: "so_tien",
      gia_tri_khuyen_mai: 25000,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 99000,
      so_luot_toi_da: 500,
      so_luot_da_dung: 121,
      thoi_gian_bat_dau: addDays(todayStart, -1),
      thoi_gian_ket_thuc: addDays(todayEnd, 6),
      trang_thai: "dang_dien_ra",
      mo_ta: "Ap dung gio trua cho don tu 99.000d",
    },
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Dem khuya giam 12%",
      ma_khuyen_mai: "NIGHTOWL12",
      loai_khuyen_mai: "phan_tram",
      gia_tri_khuyen_mai: 12,
      gia_tri_toi_da: 30000,
      don_hang_toi_thieu: 120000,
      so_luot_toi_da: 200,
      so_luot_da_dung: 64,
      thoi_gian_bat_dau: addDays(todayStart, 2),
      thoi_gian_ket_thuc: addDays(todayEnd, 12),
      trang_thai: "sap_dien_ra",
      mo_ta: "Giam 12% toi da 30.000d cho don dem",
    },
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Le hoi am thuc giam 50k",
      ma_khuyen_mai: "FESTIVAL50",
      loai_khuyen_mai: "so_tien",
      gia_tri_khuyen_mai: 50000,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 200000,
      so_luot_toi_da: 300,
      so_luot_da_dung: 0,
      thoi_gian_bat_dau: addDays(todayStart, 5),
      thoi_gian_ket_thuc: addDays(todayEnd, 18),
      trang_thai: "sap_dien_ra",
      mo_ta: "Su kien le hoi am thuc, giam 50.000d",
    },
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Mien phi ship cuoi tuan",
      ma_khuyen_mai: "SHIP0WEEK",
      loai_khuyen_mai: "mien_phi_van_chuyen",
      gia_tri_khuyen_mai: 0,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 60000,
      so_luot_toi_da: 800,
      so_luot_da_dung: 233,
      thoi_gian_bat_dau: addDays(todayStart, -14),
      thoi_gian_ket_thuc: addDays(todayEnd, -7),
      trang_thai: "da_ket_thuc",
      mo_ta: "Chuong trinh mien phi van chuyen cuoi tuan",
    },
  ]);

  const storeId1 = context.storeByEmail.get("store@dishnet.vn");
  const storeId2 = context.storeByEmail.get("multi@dishnet.vn");
  const seededStoreIds = [storeId1, storeId2].filter(
    (id): id is number => typeof id === "number" && Number.isFinite(id),
  );

  if (seededStoreIds.length > 0) {
    await repo
      .createQueryBuilder()
      .delete()
      .where("pham_vi_ap_dung = :scope", { scope: "cua_hang" })
      .andWhere("id_cua_hang IN (:...storeIds)", { storeIds: seededStoreIds })
      .execute();
  }

  if (storeId1) {
    await repo.save([
      {
        pham_vi_ap_dung: "cua_hang",
        id_cua_hang: storeId1,
        ten_khuyen_mai: "Giam 25% Bun Bo Hue",
        ma_khuyen_mai: "NETBUN25",
        loai_khuyen_mai: "phan_tram",
        gia_tri_khuyen_mai: 25,
        gia_tri_toi_da: 20000,
        don_hang_toi_thieu: 40000,
        so_luot_toi_da: 100,
        so_luot_da_dung: 42,
        thoi_gian_bat_dau: addDays(todayStart, -7),
        thoi_gian_ket_thuc: addDays(todayEnd, 10),
        trang_thai: "dang_dien_ra",
        mo_ta: "Giam 25% toi da 20.000d cho don tu 40.000d",
      },
      {
        pham_vi_ap_dung: "cua_hang",
        id_cua_hang: storeId1,
        ten_khuyen_mai: "Mien phi van chuyen Net Hue",
        ma_khuyen_mai: "NEHUE15",
        loai_khuyen_mai: "mien_phi_van_chuyen",
        gia_tri_khuyen_mai: 0,
        gia_tri_toi_da: null,
        don_hang_toi_thieu: 80000,
        so_luot_toi_da: 50,
        so_luot_da_dung: 15,
        thoi_gian_bat_dau: addDays(todayStart, -2),
        thoi_gian_ket_thuc: addDays(todayEnd, 4),
        trang_thai: "dang_dien_ra",
        mo_ta: "Mien phi ship cho don tu 80.000d",
      },
      {
        pham_vi_ap_dung: "cua_hang",
        id_cua_hang: storeId1,
        ten_khuyen_mai: "Giam 20k Hai San",
        ma_khuyen_mai: "NETHS20",
        loai_khuyen_mai: "so_tien",
        gia_tri_khuyen_mai: 20000,
        gia_tri_toi_da: null,
        don_hang_toi_thieu: 60000,
        so_luot_toi_da: 30,
        so_luot_da_dung: 8,
        thoi_gian_bat_dau: addDays(todayStart, 1),
        thoi_gian_ket_thuc: addDays(todayEnd, 7),
        trang_thai: "sap_dien_ra",
        mo_ta: "Giam 20.000d cho don hai san tu 60.000d",
      },
      {
        pham_vi_ap_dung: "cua_hang",
        id_cua_hang: storeId1,
        ten_khuyen_mai: "Combo 2 to giam 35k",
        ma_khuyen_mai: "NETCOMBO35",
        loai_khuyen_mai: "so_tien",
        gia_tri_khuyen_mai: 35000,
        gia_tri_toi_da: null,
        don_hang_toi_thieu: 120000,
        so_luot_toi_da: 80,
        so_luot_da_dung: 19,
        thoi_gian_bat_dau: addDays(todayStart, -1),
        thoi_gian_ket_thuc: addDays(todayEnd, 5),
        trang_thai: "dang_dien_ra",
        mo_ta: "Giam 35.000d cho combo 2 to tro len",
      },
      {
        pham_vi_ap_dung: "cua_hang",
        id_cua_hang: storeId1,
        ten_khuyen_mai: "Bun cha giam 10%",
        ma_khuyen_mai: "NEBUNCHA10",
        loai_khuyen_mai: "phan_tram",
        gia_tri_khuyen_mai: 10,
        gia_tri_toi_da: 12000,
        don_hang_toi_thieu: 45000,
        so_luot_toi_da: 60,
        so_luot_da_dung: 0,
        thoi_gian_bat_dau: addDays(todayStart, 3),
        thoi_gian_ket_thuc: addDays(todayEnd, 9),
        trang_thai: "sap_dien_ra",
        mo_ta: "Giam 10% toi da 12.000d cho mon bun cha",
      },
    ]);
  }

  if (storeId2) {
    await repo.save([
      {
        pham_vi_ap_dung: "cua_hang",
        id_cua_hang: storeId2,
        ten_khuyen_mai: "Giam 10% Com Binh Dan",
        ma_khuyen_mai: "QUANCOM10",
        loai_khuyen_mai: "phan_tram",
        gia_tri_khuyen_mai: 10,
        gia_tri_toi_da: 15000,
        don_hang_toi_thieu: 30000,
        so_luot_toi_da: 200,
        so_luot_da_dung: 67,
        thoi_gian_bat_dau: addDays(todayStart, -5),
        thoi_gian_ket_thuc: addDays(todayEnd, 10),
        trang_thai: "dang_dien_ra",
        mo_ta: "Giam 10% toi da 15.000d cho don tu 30.000d",
      },
      {
        pham_vi_ap_dung: "cua_hang",
        id_cua_hang: storeId2,
        ten_khuyen_mai: "Com trua giam 15k",
        ma_khuyen_mai: "QUANCOM15K",
        loai_khuyen_mai: "so_tien",
        gia_tri_khuyen_mai: 15000,
        gia_tri_toi_da: null,
        don_hang_toi_thieu: 70000,
        so_luot_toi_da: 120,
        so_luot_da_dung: 36,
        thoi_gian_bat_dau: addDays(todayStart, -3),
        thoi_gian_ket_thuc: addDays(todayEnd, 8),
        trang_thai: "dang_dien_ra",
        mo_ta: "Giam 15.000d cho don com trua tu 70.000d",
      },
      {
        pham_vi_ap_dung: "cua_hang",
        id_cua_hang: storeId2,
        ten_khuyen_mai: "Free ship gio trua",
        ma_khuyen_mai: "COMTRUAFS",
        loai_khuyen_mai: "mien_phi_van_chuyen",
        gia_tri_khuyen_mai: 0,
        gia_tri_toi_da: null,
        don_hang_toi_thieu: 50000,
        so_luot_toi_da: 90,
        so_luot_da_dung: 11,
        thoi_gian_bat_dau: addDays(todayStart, 2),
        thoi_gian_ket_thuc: addDays(todayEnd, 11),
        trang_thai: "sap_dien_ra",
        mo_ta: "Mien phi van chuyen cho don gio trua",
      },
    ]);
  }
}
