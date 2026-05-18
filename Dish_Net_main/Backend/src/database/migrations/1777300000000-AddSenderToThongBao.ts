import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSenderToThongBao1777300000000 implements MigrationInterface {
  name = 'AddSenderToThongBao1777300000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE thong_bao ADD COLUMN id_nguoi_gui BIGINT UNSIGNED NULL DEFAULT NULL AFTER id_nguoi_nhan`,
    );
    await queryRunner.query(
      `ALTER TABLE thong_bao ADD CONSTRAINT FK_thong_bao_nguoi_gui FOREIGN KEY (id_nguoi_gui) REFERENCES nguoi_dung(id) ON DELETE SET NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE thong_bao DROP FOREIGN KEY FK_thong_bao_nguoi_gui`,
    );
    await queryRunner.query(
      `ALTER TABLE thong_bao DROP COLUMN id_nguoi_gui`,
    );
  }
}
