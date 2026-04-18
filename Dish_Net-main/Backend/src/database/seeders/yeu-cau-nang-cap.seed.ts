import { YeuCauNangCapEntity } from "../../Api/Admin/entities/yeu-cau-nang-cap.entity";
import { buildRequestKey, getUserId, type SeederContext } from "./context";

export async function seedYeuCauNangCap(context: SeederContext) {
  const repo = context.dataSource.getRepository(YeuCauNangCapEntity);

  const demoUserIds = [
    getUserId(context, "user@dishnet.vn"),
    getUserId(context, "creator@dishnet.vn"),
    getUserId(context, "multi@dishnet.vn"),
    getUserId(context, "locked@dishnet.vn"),
  ].filter((id): id is number => typeof id === "number");

  const existingRequests =
    demoUserIds.length > 0
      ? await repo.find({
          where: demoUserIds.map((id) => ({ id_nguoi_gui: id })),
        })
      : [];

  if (existingRequests.length > 0) {
    await repo.delete(existingRequests.map((item) => item.id));
  }

  const requests = [
    {
      id_nguoi_gui: getUserId(context, "user@dishnet.vn"),
      loai_yeu_cau: "mo_cua_hang",
      trang_thai: "cho_duyet",
      thoi_gian_gui: new Date("2026-04-09T09:30:00"),
      ly_do_yeu_cau:
        "Quán cơm nhà nấu giao nhanh, phục vụ bữa trưa văn phòng và gia đình.",
      so_cccd: "079203001234",
      ten_cua_hang_de_xuat: "Bếp Nhà Mây",
      so_dien_thoai_lien_he: "0909000111",
      dia_chi_kinh_doanh: "12 Trần Phú, Hải Châu, Đà Nẵng",
      danh_muc_kinh_doanh: "Cơm văn phòng",
      gio_mo_cua: "08:00:00",
      gio_dong_cua: "20:00:00",
      id_admin_xu_ly: null,
      ly_do_tu_choi: null,
      thoi_gian_xu_ly: null,
    },
    {
      id_nguoi_gui: getUserId(context, "creator@dishnet.vn"),
      loai_yeu_cau: "kiem_tien_noi_dung",
      trang_thai: "cho_duyet",
      thoi_gian_gui: new Date("2026-04-08T14:15:00"),
      ly_do_yeu_cau:
        "Muốn tham gia chương trình kiếm tiền từ nội dung về ẩm thực.",
      ten_kenh: "Khoa Pug TV",
      mo_ta_kenh:
        "Review món ăn, chia sẻ trải nghiệm quán ngon và gợi ý địa điểm ăn uống.",
      tong_bai_dang: 128,
      tong_nguoi_theo_doi: 45200,
      id_admin_xu_ly: null,
      ly_do_tu_choi: null,
      thoi_gian_xu_ly: null,
    },
    {
      id_nguoi_gui: getUserId(context, "multi@dishnet.vn"),
      loai_yeu_cau: "kiem_tien_noi_dung",
      trang_thai: "da_duyet",
      thoi_gian_gui: new Date("2026-04-02T11:20:00"),
      ly_do_yeu_cau: "Muốn mở thêm nguồn thu cho nội dung review cửa hàng.",
      ten_kenh: "Vừa Review Vừa Bán Đồ Ăn",
      mo_ta_kenh:
        "Nội dung về quán ăn gia đình, công thức nấu ăn và review cửa hàng.",
      tong_bai_dang: 86,
      tong_nguoi_theo_doi: 18400,
      id_admin_xu_ly: getUserId(context, "admin@dishnet.vn") ?? null,
      ly_do_tu_choi: null,
      thoi_gian_xu_ly: new Date("2026-04-03T08:45:00"),
    },
    {
      id_nguoi_gui: getUserId(context, "locked@dishnet.vn"),
      loai_yeu_cau: "mo_cua_hang",
      trang_thai: "da_tu_choi",
      thoi_gian_gui: new Date("2026-03-25T16:00:00"),
      ly_do_yeu_cau: "Quán ăn gia đình với thực đơn theo ngày.",
      so_cccd: "079203009999",
      ten_cua_hang_de_xuat: "Quán Ăn Chưa Hoàn Chỉnh",
      so_dien_thoai_lien_he: "0900000000",
      dia_chi_kinh_doanh: "99 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng",
      danh_muc_kinh_doanh: "Cơm gia đình",
      gio_mo_cua: "09:00:00",
      gio_dong_cua: "21:00:00",
      id_admin_xu_ly: getUserId(context, "admin@dishnet.vn") ?? null,
      ly_do_tu_choi:
        "Thông tin cửa hàng chưa đầy đủ và số điện thoại liên hệ không hợp lệ.",
      thoi_gian_xu_ly: new Date("2026-03-26T09:10:00"),
    },
  ].filter(
    (item) => item.id_nguoi_gui !== undefined,
  ) as Partial<YeuCauNangCapEntity>[];

  const insertedRequests = await repo.save(requests);
  context.requestByKey = new Map(
    insertedRequests.map((item) => [
      buildRequestKey(item.id_nguoi_gui, item.loai_yeu_cau, item.trang_thai),
      item,
    ]),
  );

  return {
    requestIds: insertedRequests.map((item) => item.id),
  };
}
