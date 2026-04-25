import { NhatKyHeThongEntity } from "../../Api/Admin/entities/nhat-ky-he-thong.entity";
import { buildRequestKey, getUserId, type SeederContext } from "./context";

export async function seedNhatKyHeThong(context: SeederContext) {
  const repo = context.dataSource.getRepository(NhatKyHeThongEntity);
  const requestIds = Array.from(context.requestByKey.values()).map(
    (item) => item.id,
  );

  if (requestIds.length > 0) {
    await repo
      .createQueryBuilder()
      .delete()
      .where("loai_doi_tuong = :loai AND id_doi_tuong IN (:...ids)", {
        loai: "yeu_cau_nang_cap",
        ids: requestIds,
      })
      .execute();
  }

  const adminId = getUserId(context, "admin@dishnet.vn") ?? null;
  const ycMoCuaHangChoDuyet = context.requestByKey.get(
    buildRequestKey(
      getUserId(context, "user@dishnet.vn"),
      "mo_cua_hang",
      "cho_duyet",
    ),
  );
  const ycCreatorChoDuyet = context.requestByKey.get(
    buildRequestKey(
      getUserId(context, "creator@dishnet.vn"),
      "kiem_tien_noi_dung",
      "cho_duyet",
    ),
  );
  const ycCreatorDaDuyet = context.requestByKey.get(
    buildRequestKey(
      getUserId(context, "multi@dishnet.vn"),
      "kiem_tien_noi_dung",
      "da_duyet",
    ),
  );
  const ycMoCuaHangTuChoi = context.requestByKey.get(
    buildRequestKey(
      getUserId(context, "locked@dishnet.vn"),
      "mo_cua_hang",
      "da_tu_choi",
    ),
  );

  const logs = [
    ycMoCuaHangChoDuyet
      ? {
          id_nguoi_thuc_hien: getUserId(context, "user@dishnet.vn") ?? null,
          loai_doi_tuong: "yeu_cau_nang_cap",
          id_doi_tuong: ycMoCuaHangChoDuyet.id,
          hanh_dong: "gui_yeu_cau",
          noi_dung: "Gửi yêu cầu mở cửa hàng",
          du_lieu_cu: null,
          du_lieu_moi: { trang_thai: "cho_duyet" },
          dia_chi_ip: null,
        }
      : null,
    ycCreatorChoDuyet
      ? {
          id_nguoi_thuc_hien: getUserId(context, "creator@dishnet.vn") ?? null,
          loai_doi_tuong: "yeu_cau_nang_cap",
          id_doi_tuong: ycCreatorChoDuyet.id,
          hanh_dong: "gui_yeu_cau",
          noi_dung: "Gửi yêu cầu kiếm tiền từ nội dung",
          du_lieu_cu: null,
          du_lieu_moi: { trang_thai: "cho_duyet" },
          dia_chi_ip: null,
        }
      : null,
    ycCreatorDaDuyet
      ? {
          id_nguoi_thuc_hien: getUserId(context, "multi@dishnet.vn") ?? null,
          loai_doi_tuong: "yeu_cau_nang_cap",
          id_doi_tuong: ycCreatorDaDuyet.id,
          hanh_dong: "gui_yeu_cau",
          noi_dung: "Gửi yêu cầu kiếm tiền từ nội dung",
          du_lieu_cu: null,
          du_lieu_moi: { trang_thai: "cho_duyet" },
          dia_chi_ip: null,
        }
      : null,
    ycCreatorDaDuyet
      ? {
          id_nguoi_thuc_hien: adminId,
          loai_doi_tuong: "yeu_cau_nang_cap",
          id_doi_tuong: ycCreatorDaDuyet.id,
          hanh_dong: "phe_duyet",
          noi_dung: "Đủ điều kiện tham gia chương trình kiếm tiền từ nội dung",
          du_lieu_cu: { trang_thai: "cho_duyet" },
          du_lieu_moi: { trang_thai: "da_duyet" },
          dia_chi_ip: null,
        }
      : null,
    ycMoCuaHangTuChoi
      ? {
          id_nguoi_thuc_hien: getUserId(context, "locked@dishnet.vn") ?? null,
          loai_doi_tuong: "yeu_cau_nang_cap",
          id_doi_tuong: ycMoCuaHangTuChoi.id,
          hanh_dong: "gui_yeu_cau",
          noi_dung: "Gửi yêu cầu mở cửa hàng",
          du_lieu_cu: null,
          du_lieu_moi: { trang_thai: "cho_duyet" },
          dia_chi_ip: null,
        }
      : null,
    ycMoCuaHangTuChoi
      ? {
          id_nguoi_thuc_hien: adminId,
          loai_doi_tuong: "yeu_cau_nang_cap",
          id_doi_tuong: ycMoCuaHangTuChoi.id,
          hanh_dong: "tu_choi",
          noi_dung:
            "Thông tin cửa hàng chưa đầy đủ và số điện thoại liên hệ không hợp lệ.",
          du_lieu_cu: { trang_thai: "cho_duyet" },
          du_lieu_moi: { trang_thai: "da_tu_choi" },
          dia_chi_ip: null,
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  if (logs.length > 0) {
    await repo.save(logs);
  }
}
