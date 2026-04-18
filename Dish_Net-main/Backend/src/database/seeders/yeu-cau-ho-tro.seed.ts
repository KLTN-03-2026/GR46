import { YeuCauHoTroEntity } from "../../Api/Admin/entities/yeu-cau-ho-tro.entity";
import { getUserId, type SeederContext } from "./context";

export async function seedYeuCauHoTro(context: SeederContext) {
  const repo = context.dataSource.getRepository(YeuCauHoTroEntity);

  const supportCodes = ["HT001", "HT002", "HT003", "HT004", "HT005"];
  await repo
    .createQueryBuilder()
    .delete()
    .where("ma_yeu_cau IN (:...codes)", { codes: supportCodes })
    .execute();

  await repo.save([
    {
      ma_yeu_cau: "HT001",
      id_nguoi_gui: getUserId(context, "user@dishnet.vn")!,
      chu_de: "Đơn hàng bị lỗi / bị hủy",
      noi_dung_yeu_cau:
        "Tôi vừa thanh toán thành công nhưng đơn hàng bị hủy ngay sau đó. Nhờ hệ thống kiểm tra giúp nguyên nhân và hỗ trợ hoàn tiền.",
      trang_thai: "chua_phan_hoi",
      id_admin_phan_hoi: null,
      noi_dung_phan_hoi: null,
      thoi_gian_gui: new Date("2026-04-08T10:15:00"),
      thoi_gian_phan_hoi: null,
    },
    {
      ma_yeu_cau: "HT002",
      id_nguoi_gui: getUserId(context, "creator@dishnet.vn")!,
      chu_de: "Không nhận được hoa hồng",
      noi_dung_yeu_cau:
        "Tôi đã có đơn phát sinh từ link giới thiệu nhưng doanh thu và hoa hồng chưa được cập nhật trên hệ thống kiếm tiền.",
      trang_thai: "chua_phan_hoi",
      id_admin_phan_hoi: null,
      noi_dung_phan_hoi: null,
      thoi_gian_gui: new Date("2026-04-07T14:40:00"),
      thoi_gian_phan_hoi: null,
    },
    {
      ma_yeu_cau: "HT003",
      id_nguoi_gui: getUserId(context, "store@dishnet.vn")!,
      chu_de: "Không hiển thị menu",
      noi_dung_yeu_cau:
        "Menu quán đã cập nhật từ hôm qua nhưng khách vẫn không nhìn thấy các món mới trên ứng dụng.",
      trang_thai: "da_phan_hoi",
      id_admin_phan_hoi: getUserId(context, "admin@dishnet.vn")!,
      noi_dung_phan_hoi:
        "DishNet đã đồng bộ lại dữ liệu cửa hàng. Menu mới của bạn hiện đã hiển thị bình thường, vui lòng kiểm tra lại sau khi làm mới ứng dụng.",
      thoi_gian_gui: new Date("2026-04-06T09:05:00"),
      thoi_gian_phan_hoi: new Date("2026-04-06T11:20:00"),
    },
    {
      ma_yeu_cau: "HT004",
      id_nguoi_gui: getUserId(context, "multi@dishnet.vn")!,
      chu_de: "Sai doanh thu",
      noi_dung_yeu_cau:
        "Tôi thấy doanh thu creator hôm nay thấp hơn số đơn thực tế. Nhờ kiểm tra giúp phần tổng hợp báo cáo.",
      trang_thai: "da_phan_hoi",
      id_admin_phan_hoi: getUserId(context, "admin@dishnet.vn")!,
      noi_dung_phan_hoi:
        "Chúng tôi đã rà lại dữ liệu và cập nhật báo cáo doanh thu. Số liệu hiện đã khớp với đơn hàng hoàn tất trong ngày.",
      thoi_gian_gui: new Date("2026-04-05T16:00:00"),
      thoi_gian_phan_hoi: new Date("2026-04-05T17:10:00"),
    },
    {
      ma_yeu_cau: "HT005",
      id_nguoi_gui: getUserId(context, "locked@dishnet.vn")!,
      chu_de: "Không đặt được món",
      noi_dung_yeu_cau:
        "Tôi chọn món và thêm vào giỏ hàng được nhưng khi bấm đặt món thì hệ thống báo lỗi không xác định.",
      trang_thai: "chua_phan_hoi",
      id_admin_phan_hoi: null,
      noi_dung_phan_hoi: null,
      thoi_gian_gui: new Date("2026-04-04T19:25:00"),
      thoi_gian_phan_hoi: null,
    },
  ]);
}
