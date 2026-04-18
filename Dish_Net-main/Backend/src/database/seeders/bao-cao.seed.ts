import { BaoCaoEntity } from "../../Api/Admin/entities/bao-cao.entity";
import { NhatKyHeThongEntity } from "../../Api/Admin/entities/nhat-ky-he-thong.entity";
import { TepDinhKemEntity } from "../../Api/Admin/entities/tep-dinh-kem.entity";
import { getUserId, type SeederContext } from "./context";

export async function seedBaoCao(context: SeederContext) {
  const baoCaoRepo = context.dataSource.getRepository(BaoCaoEntity);
  const tepRepo = context.dataSource.getRepository(TepDinhKemEntity);
  const nhatKyRepo = context.dataSource.getRepository(NhatKyHeThongEntity);

  const reportCodes = ["BC001", "BC002", "BC003", "BC004"];
  const existingReports = await baoCaoRepo.find({
    where: reportCodes.map((code) => ({ ma_bao_cao: code })),
  });
  const existingIds = existingReports.map((item) => item.id);

  if (existingIds.length > 0) {
    await tepRepo
      .createQueryBuilder()
      .delete()
      .where("loai_doi_tuong = :loai AND id_doi_tuong IN (:...ids)", {
        loai: "bao_cao",
        ids: existingIds,
      })
      .execute();
    await nhatKyRepo
      .createQueryBuilder()
      .delete()
      .where("loai_doi_tuong = :loai AND id_doi_tuong IN (:...ids)", {
        loai: "bao_cao",
        ids: existingIds,
      })
      .execute();
    await baoCaoRepo.delete(existingIds);
  }

  const reports = await baoCaoRepo.save([
    {
      ma_bao_cao: "BC001",
      id_nguoi_bao_cao: getUserId(context, "user@dishnet.vn")!,
      loai_doi_tuong_bi_bao_cao: "bai_viet",
      id_doi_tuong_bi_bao_cao: context.objectIds.get("bai_viet_seed")!,
      id_nguoi_vi_pham: getUserId(context, "creator@dishnet.vn")!,
      loai_vi_pham: "Nội dung sai sự thật",
      noi_dung_bao_cao:
        "Video quảng cáo giảm giá nhưng thực tế không đúng như mô tả trong bài đăng.",
      bang_chung_text:
        "Người dùng cung cấp ảnh chụp menu thực tế và video màn hình nội dung bị báo cáo.",
      trang_thai: "cho_xu_ly",
      muc_do_vi_pham: null,
      ket_qua_xu_ly: null,
      hanh_dong_ap_dung: null,
      gui_canh_bao: false,
      id_admin_xu_ly: null,
      thoi_gian_bao_cao: new Date("2026-04-09T09:30:00"),
      thoi_gian_xu_ly: null,
    },
    {
      ma_bao_cao: "BC002",
      id_nguoi_bao_cao: getUserId(context, "locked@dishnet.vn")!,
      loai_doi_tuong_bi_bao_cao: "binh_luan",
      id_doi_tuong_bi_bao_cao: context.objectIds.get("binh_luan_seed")!,
      id_nguoi_vi_pham: getUserId(context, "multi@dishnet.vn")!,
      loai_vi_pham: "Spam",
      noi_dung_bao_cao:
        "Tài khoản này liên tục đăng nội dung spam và kéo tương tác không liên quan.",
      bang_chung_text:
        "Nhiều bài viết lặp nội dung trong cùng ngày, ảnh chụp màn hình đã đính kèm.",
      trang_thai: "cho_xu_ly",
      muc_do_vi_pham: null,
      ket_qua_xu_ly: null,
      hanh_dong_ap_dung: null,
      gui_canh_bao: false,
      id_admin_xu_ly: null,
      thoi_gian_bao_cao: new Date("2026-04-08T14:10:00"),
      thoi_gian_xu_ly: null,
    },
    {
      ma_bao_cao: "BC003",
      id_nguoi_bao_cao: getUserId(context, "creator@dishnet.vn")!,
      loai_doi_tuong_bi_bao_cao: "cua_hang",
      id_doi_tuong_bi_bao_cao: context.objectIds.get("cua_hang_seed")!,
      id_nguoi_vi_pham: getUserId(context, "store@dishnet.vn")!,
      loai_vi_pham: "Khiếu nại dịch vụ",
      noi_dung_bao_cao:
        "Cửa hàng xác nhận khuyến mãi nhưng từ chối áp dụng khi khách đến nhận món.",
      bang_chung_text:
        "Có ảnh chụp tin nhắn xác nhận khuyến mãi và hóa đơn thanh toán thực tế.",
      trang_thai: "da_xu_ly",
      muc_do_vi_pham: "trung_binh",
      ket_qua_xu_ly: "Gửi cảnh cáo",
      hanh_dong_ap_dung: JSON.stringify([
        "Gửi cảnh báo tài khoản",
        "Gửi thông báo cho tài khoản vi phạm",
      ]),
      gui_canh_bao: true,
      id_admin_xu_ly: getUserId(context, "admin@dishnet.vn")!,
      thoi_gian_bao_cao: new Date("2026-04-07T08:20:00"),
      thoi_gian_xu_ly: new Date("2026-04-07T10:45:00"),
    },
    {
      ma_bao_cao: "BC004",
      id_nguoi_bao_cao: getUserId(context, "store@dishnet.vn")!,
      loai_doi_tuong_bi_bao_cao: "mon_an",
      id_doi_tuong_bi_bao_cao: context.objectIds.get("mon_an_seed")!,
      id_nguoi_vi_pham: getUserId(context, "user@dishnet.vn")!,
      loai_vi_pham: "Thông tin sai lệch",
      noi_dung_bao_cao:
        "Người dùng đăng khiếu nại sai sự thật về món ăn và gây ảnh hưởng đến uy tín cửa hàng.",
      bang_chung_text:
        "Đã đính kèm ảnh món ăn thực tế và lịch sử đơn hàng để đối chiếu.",
      trang_thai: "da_xu_ly",
      muc_do_vi_pham: "nhe",
      ket_qua_xu_ly: "Từ chối báo cáo",
      hanh_dong_ap_dung: JSON.stringify([
        "Gửi thông báo cho tài khoản vi phạm",
      ]),
      gui_canh_bao: true,
      id_admin_xu_ly: getUserId(context, "admin@dishnet.vn")!,
      thoi_gian_bao_cao: new Date("2026-04-06T16:15:00"),
      thoi_gian_xu_ly: new Date("2026-04-06T18:00:00"),
    },
  ]);

  context.reportByCode = new Map(
    reports.map((item) => [item.ma_bao_cao, item]),
  );

  const attachments = [
    {
      loai_doi_tuong: "bao_cao",
      id_doi_tuong: context.reportByCode.get("BC001")!.id,
      loai_tep: "hinh_anh",
      duong_dan_tep:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",
      thu_tu_hien_thi: 1,
      ghi_chu: "Ảnh chụp menu thực tế",
    },
    {
      loai_doi_tuong: "bao_cao",
      id_doi_tuong: context.reportByCode.get("BC001")!.id,
      loai_tep: "video",
      duong_dan_tep: "https://example.com/evidence/report-bc001",
      thu_tu_hien_thi: 2,
      ghi_chu: "Video màn hình bài đăng bị báo cáo",
    },
    {
      loai_doi_tuong: "bao_cao",
      id_doi_tuong: context.reportByCode.get("BC002")!.id,
      loai_tep: "hinh_anh",
      duong_dan_tep:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      thu_tu_hien_thi: 1,
      ghi_chu: "Ảnh chụp chuỗi bài viết spam",
    },
  ];
  await tepRepo.save(attachments);

  await nhatKyRepo.save([
    {
      id_nguoi_thuc_hien: getUserId(context, "user@dishnet.vn")!,
      loai_doi_tuong: "bao_cao",
      id_doi_tuong: context.reportByCode.get("BC001")!.id,
      hanh_dong: "gui_bao_cao",
      noi_dung: "Người dùng gửi báo cáo nội dung sai sự thật",
      du_lieu_cu: null,
      du_lieu_moi: { trang_thai: "cho_xu_ly" },
      dia_chi_ip: null,
    },
    {
      id_nguoi_thuc_hien: getUserId(context, "locked@dishnet.vn")!,
      loai_doi_tuong: "bao_cao",
      id_doi_tuong: context.reportByCode.get("BC002")!.id,
      hanh_dong: "gui_bao_cao",
      noi_dung: "Người dùng gửi báo cáo spam",
      du_lieu_cu: null,
      du_lieu_moi: { trang_thai: "cho_xu_ly" },
      dia_chi_ip: null,
    },
    {
      id_nguoi_thuc_hien: getUserId(context, "creator@dishnet.vn")!,
      loai_doi_tuong: "bao_cao",
      id_doi_tuong: context.reportByCode.get("BC003")!.id,
      hanh_dong: "gui_bao_cao",
      noi_dung: "Người dùng gửi khiếu nại dịch vụ cửa hàng",
      du_lieu_cu: null,
      du_lieu_moi: { trang_thai: "cho_xu_ly" },
      dia_chi_ip: null,
    },
    {
      id_nguoi_thuc_hien: getUserId(context, "admin@dishnet.vn")!,
      loai_doi_tuong: "bao_cao",
      id_doi_tuong: context.reportByCode.get("BC003")!.id,
      hanh_dong: "xu_ly_bao_cao",
      noi_dung: "Ket qua: Gửi cảnh cáo",
      du_lieu_cu: { trang_thai: "cho_xu_ly" },
      du_lieu_moi: { trang_thai: "da_xu_ly", muc_do_vi_pham: "trung_binh" },
      dia_chi_ip: null,
    },
    {
      id_nguoi_thuc_hien: getUserId(context, "store@dishnet.vn")!,
      loai_doi_tuong: "bao_cao",
      id_doi_tuong: context.reportByCode.get("BC004")!.id,
      hanh_dong: "gui_bao_cao",
      noi_dung: "Cửa hàng gửi báo cáo thông tin sai lệch",
      du_lieu_cu: null,
      du_lieu_moi: { trang_thai: "cho_xu_ly" },
      dia_chi_ip: null,
    },
    {
      id_nguoi_thuc_hien: getUserId(context, "admin@dishnet.vn")!,
      loai_doi_tuong: "bao_cao",
      id_doi_tuong: context.reportByCode.get("BC004")!.id,
      hanh_dong: "xu_ly_bao_cao",
      noi_dung: "Ket qua: Từ chối báo cáo",
      du_lieu_cu: { trang_thai: "cho_xu_ly" },
      du_lieu_moi: { trang_thai: "da_xu_ly", muc_do_vi_pham: "nhe" },
      dia_chi_ip: null,
    },
  ]);
}
