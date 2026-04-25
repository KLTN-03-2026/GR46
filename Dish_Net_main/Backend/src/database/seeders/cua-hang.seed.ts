import { CuaHangEntity } from "../../Api/Admin/entities/cua-hang.entity";
import type { SeederContext } from "./context";

export async function seedCuaHang(context: SeederContext) {
  const repo = context.dataSource.getRepository(CuaHangEntity);

  const storeByEmail: Array<{
    email: string;
    ten: string;
    slug: string;
    mo_ta: string;
    dia_chi: string;
    khu_vuc: string;
    lat: number;
    lng: number;
  }> = [
    {
      email: "store@dishnet.vn",
      ten: "Nét Huế - Hàng Bông",
      slug: "net-hue-hang-bong",
      mo_ta: "Hương vị Huế chính hiệu giữa lòng Đà Nẵng. Chuyên bún bò, bún hải sản, bún bò giò heo.",
      dia_chi: "40 Nguyễn Như Hạnh, Hòa Khánh, Liên Chiểu, Đà Nẵng",
      khu_vuc: "Đà Nẵng",
      lat: 16.0544,
      lng: 108.2022,
    },
    {
      email: "multi@dishnet.vn",
      ten: "Quán Cơm Bình Dân",
      slug: "quan-com-binh-dan",
      mo_ta: "Cơm bình dân ngon miệng, phục vụ nhanh chóng. Thực đơn đa dạng món Việt.",
      dia_chi: "123 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
      khu_vuc: "Đà Nẵng",
      lat: 16.0544,
      lng: 108.2022,
    },
  ];

  await repo.upsert(
    storeByEmail.map((s) => ({
      id_chu_so_huu: context.userByEmail.get(s.email)?.id ?? 0,
      ten_cua_hang: s.ten,
      slug: s.slug,
      mo_ta: s.mo_ta,
      anh_dai_dien: null,
      so_dien_thoai_lien_he: "0909000000",
      dia_chi_kinh_doanh: s.dia_chi,
      khu_vuc: s.khu_vuc,
      vi_do: s.lat,
      kinh_do: s.lng,
      gio_mo_cua: "07:00:00",
      gio_dong_cua: "21:00:00",
      tu_nhan_giao_hang: true,
      phi_van_chuyen_mac_dinh: 15000,
      trang_thai_hoat_dong: "hoat_dong",
      diem_danh_gia: 4.6,
      tong_don_hang: 0,
      tong_luot_xem: 0,
      tong_luot_thich: 0,
    })),
    ["slug"],
  );

  const stores = await repo.find();
  context.storeByEmail = new Map(stores.map((s) => {
    const user = [...context.userByEmail.values()].find((u) => u.id === s.id_chu_so_huu);
    return [user?.email ?? "", s.id];
  }));
}
