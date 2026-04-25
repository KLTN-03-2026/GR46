import { MonAnEntity } from "../../Api/Admin/entities/mon-an.entity";
import { ToppingEntity } from "../../Api/Admin/entities/topping.entity";
import type { SeederContext } from "./context";

export async function seedMonAn(context: SeederContext) {
  const foodRepo = context.dataSource.getRepository(MonAnEntity);
  const toppingRepo = context.dataSource.getRepository(ToppingEntity);

  const storeByEmail = context.storeByEmail;
  const categoryByKey = context.categoryByKey;

  const getCatId = (email: string, catName: string) =>
    categoryByKey.get(`${storeByEmail.get(email)}-${catName}`) ?? null;

  const storeByEmail2 = context.storeByEmail;
  const storeByEmail3 = context.storeByEmail;

  const foods: Array<{
    storeEmail: string;
    ma: string;
    ten: string;
    mo_ta: string;
    hinh: string;
    gia: number;
    gia_goc: number | null;
    trang_thai: string;
    so_luong_da_ban: number;
    diem: number;
    tong_danh_gia: number;
    toppings: Array<{ ten: string; gia: number }>;
  }> = [
    {
      storeEmail: "store@dishnet.vn",
      ma: "BBH01",
      ten: "Bún Bò Huế Số 1 Đặc Biệt",
      mo_ta: "Bún bò Huế với tais, nạm, gân, giò heo, nước dùng đậm vị, chua cay vừa phải",
      hinh: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&h=200&fit=crop",
      gia: 56000,
      gia_goc: null,
      trang_thai: "dang_ban",
      so_luong_da_ban: 500,
      diem: 4.8,
      tong_danh_gia: 120,
      toppings: [
        { ten: "Thêm chả", gia: 15000 },
        { ten: "Thêm thịt bò", gia: 15000 },
        { ten: "Thêm giò heo", gia: 10000 },
      ],
    },
    {
      storeEmail: "store@dishnet.vn",
      ma: "BBH02",
      ten: "Bún Bò Huế Số 2",
      mo_ta: "Bún bò Huế với nạm, gân, chả con bò, vị đậm đà",
      hinh: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=200&h=200&fit=crop",
      gia: 56000,
      gia_goc: null,
      trang_thai: "dang_ban",
      so_luong_da_ban: 400,
      diem: 4.7,
      tong_danh_gia: 95,
      toppings: [
        { ten: "Thêm chả", gia: 15000 },
      ],
    },
    {
      storeEmail: "store@dishnet.vn",
      ma: "BBH03",
      ten: "Bún Bò Huế Số 3",
      mo_ta: "Bún bò Huế truyền thống, vị cay nhẹ, phù hợp mọi lứa tuổi",
      hinh: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&h=200&fit=crop",
      gia: 48000,
      gia_goc: null,
      trang_thai: "het_mon",
      so_luong_da_ban: 300,
      diem: 4.6,
      tong_danh_gia: 78,
      toppings: [],
    },
    {
      storeEmail: "store@dishnet.vn",
      ma: "BBH04",
      ten: "Bún Bò Huế Số 4",
      mo_ta: "Bún bò Huế giò heo đặc biệt, nhiều giò heo hơn",
      hinh: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=200&h=200&fit=crop",
      gia: 60000,
      gia_goc: null,
      trang_thai: "tam_ngung_ban",
      so_luong_da_ban: 200,
      diem: 4.5,
      tong_danh_gia: 45,
      toppings: [
        { ten: "Thêm giò heo", gia: 10000 },
        { ten: "Thêm thịt bò", gia: 15000 },
      ],
    },
    {
      storeEmail: "store@dishnet.vn",
      ma: "BBH05",
      ten: "Bún Hải Sản Đặc Biệt",
      mo_ta: "Bún tươi với đầu cá, tôm, mực, nước dùng ngọt thanh",
      hinh: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=200&h=200&fit=crop",
      gia: 68000,
      gia_goc: null,
      trang_thai: "dang_ban",
      so_luong_da_ban: 250,
      diem: 4.9,
      tong_danh_gia: 88,
      toppings: [
        { ten: "Thêm tôm", gia: 20000 },
        { ten: "Thêm mực", gia: 18000 },
      ],
    },
    {
      storeEmail: "store@dishnet.vn",
      ma: "BBH06",
      ten: "Bún Mắm Thái",
      mo_ta: "Bún mắm Thái chua cay, hải sản tươi sống",
      hinh: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=200&h=200&fit=crop",
      gia: 55000,
      gia_goc: null,
      trang_thai: "dang_ban",
      so_luong_da_ban: 180,
      diem: 4.4,
      tong_danh_gia: 42,
      toppings: [
        { ten: "Thêm cá", gia: 15000 },
      ],
    },
    {
      storeEmail: "store@dishnet.vn",
      ma: "BBH07",
      ten: "Nước Ngọt Các Loại",
      mo_ta: "Coca, Sprite, Pepsi, nước suối các loại",
      hinh: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
      gia: 16000,
      gia_goc: null,
      trang_thai: "het_mon",
      so_luong_da_ban: 50,
      diem: 3.8,
      tong_danh_gia: 10,
      toppings: [],
    },
    {
      storeEmail: "store@dishnet.vn",
      ma: "BBH08",
      ten: "Trà Đá",
      mo_ta: "Trà đá mát lạnh giải khát",
      hinh: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
      gia: 8000,
      gia_goc: null,
      trang_thai: "dang_ban",
      so_luong_da_ban: 1000,
      diem: 4.2,
      tong_danh_gia: 200,
      toppings: [],
    },
    {
      storeEmail: "multi@dishnet.vn",
      ma: "CB01",
      ten: "Cơm Gà Chiên Nước Mắm",
      mo_ta: "Cơm trắng với gà chiên giòn, rưới nước mắm chua ngọt",
      hinh: "https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop",
      gia: 45000,
      gia_goc: null,
      trang_thai: "dang_ban",
      so_luong_da_ban: 350,
      diem: 4.6,
      tong_danh_gia: 90,
      toppings: [
        { ten: "Thêm gà", gia: 20000 },
        { ten: "Thêm cơm", gia: 8000 },
      ],
    },
    {
      storeEmail: "multi@dishnet.vn",
      ma: "CB02",
      ten: "Cơm Sườn Bì Chả",
      mo_ta: "Cơm gáo với sườn nướng, bì chả, điểm tô hành phi",
      hinh: "https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop",
      gia: 40000,
      gia_goc: null,
      trang_thai: "dang_ban",
      so_luong_da_ban: 280,
      diem: 4.5,
      tong_danh_gia: 72,
      toppings: [
        { ten: "Thêm sườn", gia: 15000 },
      ],
    },
  ];

  await foodRepo
    .createQueryBuilder()
    .delete()
    .where("id_cua_hang IN (:...ids)", {
      ids: [...storeByEmail.values()],
    })
    .execute();

  const savedFoods: Array<{ id: number; storeEmail: string; ma: string }> = [];

  for (const f of foods) {
    const storeId = storeByEmail.get(f.storeEmail);
    if (!storeId) continue;

    const catId = getCatId(f.storeEmail, f.ma.startsWith("BBH") ? "Bún bò" : "Cơm truyền thống");

    const saved = await foodRepo.save({
      id_cua_hang: storeId,
      id_danh_muc: catId,
      ma_mon: f.ma,
      ten_mon: f.ten,
      mo_ta: f.mo_ta,
      hinh_anh_dai_dien: f.hinh,
      gia_ban: f.gia,
      gia_goc: f.gia_goc,
      trang_thai_ban: f.trang_thai,
      so_luong_da_ban: f.so_luong_da_ban,
      diem_danh_gia: f.diem,
      tong_danh_gia: f.tong_danh_gia,
      la_mon_noi_bat: f.so_luong_da_ban >= 300 ? true : false,
    });

    savedFoods.push({ id: saved.id, storeEmail: f.storeEmail, ma: f.ma });

    for (const t of f.toppings) {
      await toppingRepo.save({
        id_mon_an: saved.id,
        ten_topping: t.ten,
        gia: t.gia,
        trang_thai: "hieu_luc",
      });
    }
  }

  context.objectIds.set("foods", savedFoods.length);
}
