import { DataSource } from "typeorm";
import { NguoiDungEntity } from "../../Api/Auth/entities/nguoi-dung.entity";
import { YeuCauNangCapEntity } from "../../Api/Admin/entities/yeu-cau-nang-cap.entity";
import { BaoCaoEntity } from "../../Api/Admin/entities/bao-cao.entity";

export type SeederContext = {
  dataSource: DataSource;
  userByEmail: Map<string, NguoiDungEntity>;
  requestByKey: Map<string, YeuCauNangCapEntity>;
  reportByCode: Map<string, BaoCaoEntity>;
  objectIds: Map<string, number>;
  storeByEmail: Map<string, number>;
  categoryByKey: Map<string, number>;
};

export function createSeederContext(dataSource: DataSource): SeederContext {
  return {
    dataSource,
    userByEmail: new Map(),
    requestByKey: new Map(),
    reportByCode: new Map(),
    objectIds: new Map(),
    storeByEmail: new Map(),
    categoryByKey: new Map(),
  };
}

export function getUserId(context: SeederContext, email: string) {
  const rawId = context.userByEmail.get(email)?.id;
  if (rawId === null || rawId === undefined) {
    return undefined;
  }

  const id = Number(rawId);
  return Number.isFinite(id) ? id : undefined;
}

export function buildRequestKey(
  userId: number | undefined,
  loaiYeuCau: string,
  trangThai: string,
) {
  return `${userId ?? "unknown"}:${loaiYeuCau}:${trangThai}`;
}
