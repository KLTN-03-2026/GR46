import { BaiVietEntity } from "../../Api/Admin/entities/bai-viet.entity";
import { BinhLuanEntity } from "../../Api/Admin/entities/binh-luan.entity";
import { CuaHangEntity } from "../../Api/Admin/entities/cua-hang.entity";
import { MonAnEntity } from "../../Api/Admin/entities/mon-an.entity";
import { getUserId, type SeederContext } from "./context";

export async function seedNoiDungBaoCao(context: SeederContext) {
  const cuaHangRepo = context.dataSource.getRepository(CuaHangEntity);
  const monAnRepo = context.dataSource.getRepository(MonAnEntity);
  const baiVietRepo = context.dataSource.getRepository(BaiVietEntity);
  const binhLuanRepo = context.dataSource.getRepository(BinhLuanEntity);

  await cuaHangRepo.upsert(
    [
      {
        id: 601,
        id_chu_so_huu: getUserId(context, "store@dishnet.vn")!,
        ten_cua_hang: "Nét Huế - Hàng Bông",
        slug: "net-hue-hang-bong-seed",
        mo_ta:
          "Cửa hàng chuyên món Huế với các chương trình giảm giá theo tuần.",
        anh_dai_dien:
          "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=640&q=80",
        dia_chi_kinh_doanh: "12 Hàng Bông, Hoàn Kiếm, Hà Nội",
        trang_thai_hoat_dong: "hoat_dong",
      },
    ],
    ["id"],
  );

  await cuaHangRepo.update(601, {
    anh_dai_dien:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=640&q=80",
  });

  await monAnRepo.upsert(
    [
      {
        id: 701,
        id_cua_hang: 601,
        ma_mon: "BB001",
        ten_mon: "Bún bò đặc biệt",
        mo_ta: "Tô bún bò topping đầy đủ, nước dùng đậm vị.",
        hinh_anh_dai_dien:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=640&q=80",
        gia_ban: 59000,
        trang_thai_ban: "dang_ban",
      },
    ],
    ["id"],
  );

  await baiVietRepo.upsert(
    [
      {
        id: 801,
        id_nguoi_dang: getUserId(context, "creator@dishnet.vn")!,
        id_cua_hang: 601,
        loai_bai_viet: "video",
        noi_dung:
          "Voucher giảm 50% toàn quán nhưng thực tế chỉ áp dụng cho một số món nhất định.",
        trang_thai_duyet: "hien_thi",
        tong_luot_xem: 1200,
        ngay_dang: new Date("2026-04-08T08:00:00"),
      },
    ],
    ["id"],
  );

  await binhLuanRepo.upsert(
    [
      {
        id: 901,
        id_bai_viet: 801,
        id_nguoi_binh_luan: getUserId(context, "multi@dishnet.vn")!,
        noi_dung:
          "Bài này lặp lại quá nhiều lần, nhìn như spam và gây khó chịu trên feed.",
        trang_thai: "hien_thi",
        ngay_tao: new Date("2026-04-08T09:00:00"),
      },
    ],
    ["id"],
  );

  context.objectIds.set("cua_hang_seed", 601);
  context.objectIds.set("mon_an_seed", 701);
  context.objectIds.set("bai_viet_seed", 801);
  context.objectIds.set("binh_luan_seed", 901);
}
