import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class GuiTinNhanDto {
  @IsString()
  @MaxLength(2000)
  noi_dung: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  id_phien?: number;
}

export class TaoPhienDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  tieu_de?: string;
}
