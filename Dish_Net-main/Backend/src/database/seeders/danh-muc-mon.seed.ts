import { DanhMucMonEntity } from "../../Api/Admin/entities/danh-muc-mon.entity";
import type { SeederContext } from "./context";

export async function seedDanhMucMon(context: SeederContext) {
  const repo = context.dataSource.getRepository(DanhMucMonEntity);

  const storeCategories: Array<{
    storeEmail: string;
    categories: Array<{ key: string; name: string; order: number }>;
  }> = [
    {
      storeEmail: "store@dishnet.vn",
      categories: [
        { key: "bun_bo", name: "Bún bò", order: 1 },
        { key: "bun_hai_san", name: "Bún hải sản", order: 2 },
        { key: "bun_mam", name: "Bún mắm", order: 3 },
        { key: "com", name: "Cơm", order: 4 },
        { key: "do_uong", name: "Đồ uống", order: 5 },
        { key: "do_them", name: "Đồ thêm", order: 6 },
      ],
    },
    {
      storeEmail: "multi@dishnet.vn",
      categories: [
        { key: "com_trad", name: "Cơm truyền thống", order: 1 },
        { key: "bun_pho", name: "Bún phở", order: 2 },
        { key: "do_uong", name: "Đồ uống", order: 3 },
        { key: "do_them", name: "Đồ thêm", order: 4 },
      ],
    },
  ];

  await repo
    .createQueryBuilder()
    .delete()
    .where("id_cua_hang IS NOT NULL")
    .execute();

  for (const storeCat of storeCategories) {
    const storeId = context.storeByEmail.get(storeCat.storeEmail);
    if (!storeId) continue;

    for (const cat of storeCat.categories) {
      await repo.upsert(
        {
          id_cua_hang: storeId,
          id_danh_muc_cha: null,
          ten_danh_muc: cat.name,
          thu_tu_hien_thi: cat.order,
          trang_thai: "hieu_luc",
        },
        ["id_cua_hang", "ten_danh_muc"],
      );
    }
  }

  const allCats = await repo.find();
  context.categoryByKey = new Map(
    allCats.map((c) => [`${c.id_cua_hang}-${c.ten_danh_muc}`, c.id]),
  );
}
