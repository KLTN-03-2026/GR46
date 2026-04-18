import { TepDinhKemEntity } from "../../Api/Admin/entities/tep-dinh-kem.entity";
import { buildRequestKey, getUserId, type SeederContext } from "./context";

export async function seedTepDinhKem(context: SeederContext) {
  const repo = context.dataSource.getRepository(TepDinhKemEntity);
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

  const attachments = [
    ycMoCuaHangChoDuyet
      ? {
          loai_doi_tuong: "yeu_cau_nang_cap",
          id_doi_tuong: ycMoCuaHangChoDuyet.id,
          loai_tep: "hinh_anh",
          duong_dan_tep:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
          thu_tu_hien_thi: 1,
          ghi_chu: "Ảnh mặt tiền cửa hàng dự kiến",
        }
      : null,
    ycCreatorChoDuyet
      ? {
          loai_doi_tuong: "yeu_cau_nang_cap",
          id_doi_tuong: ycCreatorChoDuyet.id,
          loai_tep: "video",
          duong_dan_tep: "https://example.com/video/bun-bo-sieu-cay",
          thu_tu_hien_thi: 1,
          ghi_chu: "Review bún bò siêu cay tại Đà Nẵng",
        }
      : null,
    ycCreatorChoDuyet
      ? {
          loai_doi_tuong: "yeu_cau_nang_cap",
          id_doi_tuong: ycCreatorChoDuyet.id,
          loai_tep: "video",
          duong_dan_tep: "https://example.com/video/top-5-com-tam",
          thu_tu_hien_thi: 2,
          ghi_chu: "Top 5 quán cơm tấm đáng thử",
        }
      : null,
    ycCreatorDaDuyet
      ? {
          loai_doi_tuong: "yeu_cau_nang_cap",
          id_doi_tuong: ycCreatorDaDuyet.id,
          loai_tep: "video",
          duong_dan_tep: "https://example.com/video/mot-ngay-ban-bun-bo",
          thu_tu_hien_thi: 1,
          ghi_chu: "Một ngày bán bún bò và review quán xóm nhỏ",
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  if (attachments.length > 0) {
    await repo.save(attachments);
  }
}
