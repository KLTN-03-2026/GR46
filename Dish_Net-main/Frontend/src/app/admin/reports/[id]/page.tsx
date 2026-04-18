'use client';

import { use, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminReportApi, ChiTietBaoCaoResponse } from '@/shared/adminReportApi';
import { useToast } from '@/components/Admin/Toast';

const allActions = [
  'Gỡ nội dung vi phạm',
  'Gửi cảnh báo tài khoản',
  'Khóa tài khoản tạm thời',
  'Khóa tài khoản vĩnh viễn',
];

const resolutionOptions = ['Gỡ nội dung vi phạm', 'Gửi cảnh cáo', 'Từ chối báo cáo', 'Khóa tài khoản'];
const violationOptions = ['nhe', 'trung_binh', 'nang'];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function humanizeViolationLevel(value: string) {
  switch (value) {
    case 'nhe':
      return 'Nhẹ';
    case 'trung_binh':
      return 'Trung bình';
    case 'nang':
      return 'Nặng';
    default:
      return value;
  }
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const toast = useToast();
  const [report, setReport] = useState<ChiTietBaoCaoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [resolution, setResolution] = useState(resolutionOptions[0]);
  const [violationLevel, setViolationLevel] = useState(violationOptions[0]);
  const [checkedActions, setCheckedActions] = useState<string[]>([]);
  const [sendWarning, setSendWarning] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await adminReportApi.layChiTiet(Number(id));
        setReport(data);
        setResolution(data.ket_qua_xu_ly.ket_qua_xu_ly || resolutionOptions[0]);
        setViolationLevel(data.ket_qua_xu_ly.muc_do_vi_pham || violationOptions[0]);
        setCheckedActions(data.ket_qua_xu_ly.hanh_dong_ap_dung);
        setSendWarning(data.ket_qua_xu_ly.gui_canh_bao);
      } catch (fetchError: unknown) {
        toast.error(getErrorMessage(fetchError, 'Không thể tải chi tiết báo cáo'));
      } finally {
        setLoading(false);
      }
    };

    void fetchDetail();
  }, [id, toast]);

  const isReadOnly = report?.thong_tin_bao_cao.trang_thai === 'da_xu_ly';
  const statusLabel = useMemo(
    () => (report?.thong_tin_bao_cao.trang_thai === 'da_xu_ly' ? 'Đã xử lý' : 'Chờ xử lý'),
    [report],
  );

  const toggleAction = (action: string) => {
    setCheckedActions((prev) =>
      prev.includes(action) ? prev.filter((item) => item !== action) : [...prev, action],
    );
  };

  const handleSave = async () => {
    if (!report) return;

    setSaving(true);
    try {
      await adminReportApi.xuLy(report.id, {
        ket_qua_xu_ly: resolution,
        muc_do_vi_pham: violationLevel,
        hanh_dong_ap_dung: checkedActions,
        gui_canh_bao: sendWarning,
      });
      const refreshed = await adminReportApi.layChiTiet(report.id);
      setReport(refreshed);
      toast.success('Đã lưu kết quả xử lý');
    } catch (saveError: unknown) {
      toast.error(getErrorMessage(saveError, 'Không thể lưu kết quả xử lý'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
      </div>
    );
  }

  if (error && !report) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="font-medium text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-black tracking-wide">XỬ LÝ BÁO CÁO</h1>
      </div>

      <div className="flex gap-5 items-start">
        <div className="flex-1 space-y-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
            <h2 className="font-bold text-gray-900 mb-3">Thông tin người báo cáo</h2>
            <InfoRow label="Mã báo cáo" value={report.ma_bao_cao} />
            <InfoRow label="Người báo cáo" value={report.thong_tin_nguoi_bao_cao.ten_nguoi_dung} />
            <InfoRow label="Email" value={report.thong_tin_nguoi_bao_cao.email} />
            <InfoRow label="Số điện thoại" value={report.thong_tin_nguoi_bao_cao.so_dien_thoai || '—'} />
            <InfoRow label="Thời gian gửi" value={formatDate(report.thong_tin_bao_cao.thoi_gian_bao_cao)} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900">Nội dung báo cáo</h2>
            <InfoRow label="Loại báo cáo" value={report.thong_tin_bao_cao.loai_vi_pham} />
            <div className="rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-700">
              {report.thong_tin_bao_cao.noi_dung_bao_cao}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900">Nội dung bị báo cáo</h2>
            <InfoRow label="Loại đối tượng" value={report.noi_dung_bi_bao_cao.loai_doi_tuong} />
            <InfoRow label="Đối tượng bị báo cáo" value={report.noi_dung_bi_bao_cao.tieu_de} />
            <InfoRow label="Tài khoản liên quan" value={report.noi_dung_bi_bao_cao.tac_gia} />
            <div className="rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-700">
              {report.noi_dung_bi_bao_cao.mo_ta}
            </div>
            {report.noi_dung_bi_bao_cao.url ? (
              <a href={report.noi_dung_bi_bao_cao.url} target="_blank" rel="noreferrer" className="text-sm text-blue-500">
                {report.noi_dung_bi_bao_cao.url}
              </a>
            ) : null}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900">Bằng chứng đính kèm</h2>
            {report.bang_chung.noi_dung_text ? (
              <div className="rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-700">
                {report.bang_chung.noi_dung_text}
              </div>
            ) : null}
            {report.bang_chung.tep_dinh_kem.length > 0 ? (
              <div className="space-y-2">
                {report.bang_chung.tep_dinh_kem.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {attachment.ghi_chu || attachment.url}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Chưa có tệp đính kèm.</p>
            )}
          </div>
        </div>

        <div className="w-[320px] shrink-0 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h2 className="font-bold text-gray-900">Xử lý báo cáo</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kết quả xử lý</label>
              {isReadOnly ? (
                <input value={report.ket_qua_xu_ly.ket_qua_xu_ly || '—'} readOnly className="w-full bg-gray-100 border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none" />
              ) : (
                <div className="relative">
                  <select value={resolution} onChange={e => setResolution(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm text-gray-700 focus:outline-none focus:border-green-500 cursor-pointer">
                    {resolutionOptions.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mức độ vi phạm</label>
              {isReadOnly ? (
                <input value={humanizeViolationLevel(report.ket_qua_xu_ly.muc_do_vi_pham || '—')} readOnly className="w-full bg-gray-100 border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none" />
              ) : (
                <div className="relative">
                  <select value={violationLevel} onChange={e => setViolationLevel(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm text-gray-700 focus:outline-none focus:border-green-500 cursor-pointer">
                    {violationOptions.map((o) => <option key={o} value={o}>{humanizeViolationLevel(o)}</option>)}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hành động áp dụng</label>
              <div className="space-y-2">
                {isReadOnly ? (
                  report.ket_qua_xu_ly.hanh_dong_ap_dung.map((action) => (
                    <p key={action} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                      {action}
                    </p>
                  ))
                ) : (
                  allActions.map((action) => (
                    <label key={action} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checkedActions.includes(action)}
                        onChange={() => toggleAction(action)}
                        className="w-4 h-4 accent-green-600 cursor-pointer"
                      />
                      {action}
                    </label>
                  ))
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Trạng thái</label>
              <input value={statusLabel} readOnly className="w-full bg-gray-100 border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none" />
            </div>

            <div className="pt-1">
              {isReadOnly ? (
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" checked={report.ket_qua_xu_ly.gui_canh_bao} readOnly className="w-4 h-4 accent-green-600" />
                  Gửi thông báo cho tài khoản vi phạm
                </label>
              ) : (
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" checked={sendWarning} onChange={(e) => setSendWarning(e.target.checked)} className="w-4 h-4 accent-green-600 cursor-pointer" />
                  Gửi thông báo cho tài khoản vi phạm
                </label>
              )}
            </div>

            {!isReadOnly ? (
              <button
                onClick={() => void handleSave()}
                disabled={saving || checkedActions.length === 0}
                className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white text-sm font-bold transition-colors cursor-pointer"
              >
                {saving ? 'Đang lưu...' : 'Lưu kết quả xử lý'}
              </button>
            ) : null}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Lịch sử xử lý</h3>
            <div className="space-y-3">
              {report.lich_su_xu_ly.map((log, i) => (
                <div key={log.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${i === 0 ? 'bg-orange-400' : 'bg-blue-400'}`} />
                    {i < report.lich_su_xu_ly.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-xs text-gray-500">{formatDate(log.thoi_gian)}</p>
                    <p className="text-sm font-medium text-gray-800">{log.nguoi_thuc_hien}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{log.noi_dung || log.hanh_dong}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm text-gray-600">
      <span className="text-gray-500">{label}: </span>
      <span className="text-gray-800">{value}</span>
    </p>
  );
}
