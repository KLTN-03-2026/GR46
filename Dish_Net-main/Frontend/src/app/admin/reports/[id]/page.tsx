'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';

// ─── Mock data ────────────────────────────────────────────────────────────────
const allActions = [
    'Gỡ video',
    'Gửi cảnh cáo tài khoản',
    'Khóa tài khoản 3 ngày',
    'Khóa tài khoản vĩnh viễn',
    'Gửi thông báo cho tài khoản/vpm',
];

const resolutionOptions = ['Gỡ video', 'Gửi cảnh cáo', 'Từ chối báo cáo', 'Khóa tài khoản'];
const violationOptions = ['Nhẹ', 'Trung bình', 'Nặng'];
const statusOptions = ['Chờ xử lý', 'Đã xử lý'];

interface DetailReport {
    id: string;
    code: string;
    reporterCode: string;
    reporterName: string;
    reportedContent: string;
    reportType: string;
    submitTime: string;
    contentTitle: string;
    contentAuthor: string;
    contentDescription: string;
    violationLevel: string;
    resolution: string;
    checkedActions: string[];
    status: string;
    evidence: string;
    activityLog: { time: string; actor?: string; tag?: string; note?: string }[];
}

const mockDetail: Record<string, DetailReport> = {
    '1': {
        id: '1',
        code: '#QA0034',
        reporterCode: 'RP20321',
        reporterName: 'Nguyễn Văn A',
        reportedContent: 'Báo cáo Video "Review giảm 50% toàn quán"',
        reportType: 'Nội dung sai sự thật',
        submitTime: '04/03/2026 10:30',
        contentTitle: 'Voucher giảm 50% toàn quán',
        contentAuthor: 'Thảo Anh',
        contentDescription: 'Video quảng cáo \'voucher giảm giá nhưng thực tế không đúng.',
        violationLevel: 'Trung bình',
        resolution: 'Gỡ video',
        checkedActions: ['Gỡ video', 'Gửi cảnh cáo tài khoản', 'Gửi thông báo cho tài khoản/vpm'],
        status: 'Chờ xử lý',
        evidence: 'Video quảng cáo giảm giá sai sự thật so với giá thực tế.\nĐã gỡ video và gửi cảnh cáo cho creator.',
        activityLog: [
            { time: '04/03/2026 10:20', actor: 'Nguyễn Văn A', tag: 'BÁO CÁO CÁT GAO' },
            { time: '04/03/2026 11:00', note: 'Báo cáo nội thất' },
        ],
    },
    '2': {
        id: '2',
        code: '#QA0034',
        reporterCode: 'RP20321',
        reporterName: 'Nguyễn Văn A',
        reportedContent: 'Báo cáo Video "Review giảm 50% toàn quán"',
        reportType: 'Nội dung sai sự thật',
        submitTime: '04/03/2026 10:30',
        contentTitle: 'Voucher giảm 50% toàn quán',
        contentAuthor: 'Thảo Anh',
        contentDescription: 'Video quảng cáo \'voucher giảm giá nhưng thực tế không đúng.',
        violationLevel: 'Trung bình',
        resolution: 'Gỡ video',
        checkedActions: ['Gỡ video', 'Gửi cảnh cáo tài khoản'],
        status: 'Đã xử lý',
        evidence: 'Video quảng cáo giảm giá sai sự thật so với giá thực tế.\nĐã gỡ video và gửi cảnh cáo cho creator.',
        activityLog: [
            { time: '04/03/2026 10:20', actor: 'Nguyễn Văn A', tag: 'BÁO CÁO CÁT GAO' },
            { time: '04/03/2026 11:00', note: 'Báo cáo nội thất' },
        ],
    },
    '3': {
        id: '3',
        code: '#QA0035',
        reporterCode: 'RP20322',
        reporterName: 'Trần Thị B',
        reportedContent: 'Báo cáo tài khoản spam',
        reportType: 'Spam',
        submitTime: '04/03/2026 09:15',
        contentTitle: 'Nội dung spam',
        contentAuthor: 'Unknown',
        contentDescription: 'Tài khoản liên tục đăng nội dung spam.',
        violationLevel: 'Nhẹ',
        resolution: 'Gửi cảnh cáo',
        checkedActions: ['Gửi cảnh cáo tài khoản'],
        status: 'Chờ xử lý',
        evidence: 'Tài khoản spam liên tục các bài viết không liên quan.',
        activityLog: [
            { time: '04/03/2026 09:20', actor: 'Trần Thị B', tag: 'BÁO CÁO SPAM' },
        ],
    },
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const report = mockDetail[id];

    const isReadOnly = report?.status === 'Đã xử lý';

    const [resolution, setResolution] = useState(report?.resolution || resolutionOptions[0]);
    const [violationLevel, setViolationLevel] = useState(report?.violationLevel || violationOptions[0]);
    const [checkedActions, setCheckedActions] = useState<string[]>(report?.checkedActions || []);
    const [status, setStatus] = useState(report?.status || 'Chờ xử lý');
    const [saved, setSaved] = useState(false);

    if (!report) {
        return (
            <div className="p-6">
                <p className="text-gray-500">Không tìm thấy báo cáo.</p>
            </div>
        );
    }

    const toggleAction = (action: string) => {
        setCheckedActions(prev =>
            prev.includes(action) ? prev.filter(a => a !== action) : [...prev, action]
        );
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="p-6 space-y-5">
            {/* Back header */}
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

            {/* Two-column layout */}
            <div className="flex gap-5 items-start">

                {/* ── Left Column ───────────────────────────────────── */}
                <div className="flex-1 space-y-5">

                    {/* Thông tin báo cáo */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
                        <h2 className="font-bold text-gray-900 mb-3">Thông tin báo cáo</h2>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                                </svg>
                            </div>
                            <span className="font-semibold text-gray-800">{report.reporterCode}</span>
                        </div>
                        <InfoRow label="Mã báo cáo" value={report.reporterName} />
                        <InfoRow label="Người báo cáo" value={report.reportedContent} />
                        <InfoRow label="Loại báo cáo" value={report.reportType} />
                        <InfoRow label="Thời gian gửi" value={report.submitTime} />
                    </div>

                    {/* Nội dung bị báo cáo */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                        <h2 className="font-bold text-gray-900">Nội dung bị báo cáo</h2>
                        <div className="flex gap-4">
                            {/* Thumbnail */}
                            <div className="w-[120px] h-[90px] rounded-xl bg-gradient-to-br from-green-300 to-green-500 overflow-hidden relative shrink-0 flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                    </div>
                                </div>
                                <span className="absolute bottom-1 right-2 text-white text-[10px] font-bold">2K</span>
                            </div>
                            {/* Info */}
                            <div className="flex-1 space-y-1.5">
                                <p className="font-semibold text-gray-900 text-sm">{report.contentTitle}</p>
                                <div className="flex items-center gap-1 text-gray-400">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                    <span className="text-xs text-gray-500">{report.contentAuthor}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">💬 1</span>
                                    <span className="flex items-center gap-1">👍 1.2K</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                        <span className="text-white text-[9px] font-bold">T</span>
                                    </div>
                                    <span className="text-xs text-gray-600">{report.contentAuthor}</span>
                                </div>
                                <p className="text-xs text-gray-500">{report.contentDescription}</p>
                            </div>
                        </div>
                    </div>

                    {/* Bằng chứng */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                        <h2 className="font-bold text-gray-900">Bằng chứng</h2>
                        <div className="flex gap-4">
                            {/* Evidence thumbnails */}
                            <div className="flex gap-2 shrink-0">
                                {[1, 2].map(i => (
                                    <div key={i} className="w-[80px] h-[70px] rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                                <div className="w-[80px] h-[70px] rounded-xl bg-gray-50 border border-gray-200 flex flex-col items-center justify-end p-1">
                                    <span className="text-[9px] text-gray-400 text-center">voucher seam.ung 3 MB</span>
                                </div>
                            </div>
                            {/* Evidence text */}
                            <div className="flex-1 space-y-2">
                                <p className="text-sm text-gray-600">{report.evidence}</p>
                                {isReadOnly ? (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center shrink-0">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                        </div>
                                        Gửi thông báo cho tài/Khởi ư phạm
                                    </div>
                                ) : (
                                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 accent-green-600 cursor-pointer" defaultChecked />
                                        Gửi thông báo cho tài/Khởi ư phạm
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right Column ─────────────────────────────────── */}
                <div className="w-[300px] shrink-0 space-y-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
                        <h2 className="font-bold text-gray-900">Xử lý báo cáo</h2>

                        {/* Kết quả xử lý */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Kết quả xử lý</label>
                            {isReadOnly ? (
                                <input value={resolution} readOnly className="w-full bg-gray-100 border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none" />
                            ) : (
                                <div className="relative">
                                    <select value={resolution} onChange={e => setResolution(e.target.value)}
                                        className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm text-gray-700 focus:outline-none focus:border-green-500 cursor-pointer">
                                        {resolutionOptions.map(o => <option key={o}>{o}</option>)}
                                    </select>
                                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            )}
                        </div>

                        {/* Mức độ vi phạm */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mức độ vi phạm</label>
                            {isReadOnly ? (
                                <input value={violationLevel} readOnly className="w-full bg-gray-100 border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none" />
                            ) : (
                                <div className="relative">
                                    <select value={violationLevel} onChange={e => setViolationLevel(e.target.value)}
                                        className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm text-gray-700 focus:outline-none focus:border-green-500 cursor-pointer">
                                        {violationOptions.map(o => <option key={o}>{o}</option>)}
                                    </select>
                                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            )}
                        </div>

                        {/* Hành động áp dụng */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hành động áp dụng</label>
                            <div className="space-y-2">
                                {isReadOnly ? (
                                    checkedActions.map(action => (
                                        <p key={action} className="text-sm text-gray-700 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                            {action}
                                        </p>
                                    ))
                                ) : (
                                    allActions.map(action => (
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

                        {/* Trạng thái */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Trạng thái</label>
                            {isReadOnly ? (
                                <input value={status} readOnly className="w-full bg-gray-100 border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none" />
                            ) : (
                                <div className="relative">
                                    <select value={status} onChange={e => setStatus(e.target.value)}
                                        className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm text-gray-700 focus:outline-none focus:border-green-500 cursor-pointer">
                                        {statusOptions.map(o => <option key={o}>{o}</option>)}
                                    </select>
                                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            )}
                        </div>

                        {/* Action buttons (only for editable mode) */}
                        {!isReadOnly && (
                            <div className="space-y-2 pt-1">
                                <button
                                    onClick={handleSave}
                                    className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition-colors cursor-pointer"
                                >
                                    {saved ? '✓ Đã lưu' : 'Lưu kết quả xử lý'}
                                </button>
                                <div className="flex gap-2">
                                    <button className="flex-1 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors cursor-pointer">
                                        Bỏ qua báo cáo
                                    </button>
                                    <button className="flex-1 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-semibold transition-colors cursor-pointer">
                                        Đóng báo cáo
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Hoạt động xử lý */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <h3 className="font-bold text-gray-900 mb-4">Hoạt động xử lý</h3>
                        <div className="space-y-3">
                            {report.activityLog.map((log, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${i === 0 ? 'bg-orange-400' : 'bg-blue-400'}`} />
                                        {i < report.activityLog.length - 1 && (
                                            <div className="w-px flex-1 bg-gray-200 my-1" />
                                        )}
                                    </div>
                                    <div className="flex-1 pb-2">
                                        <p className="text-xs text-gray-500">{log.time}</p>
                                        {log.actor && <p className="text-sm font-medium text-gray-800">{log.actor}</p>}
                                        {log.tag && (
                                            <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded">
                                                {log.tag}
                                            </span>
                                        )}
                                        {log.note && <p className="text-xs text-gray-500 mt-0.5">{log.note}</p>}
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

// ─── Helper ──────────────────────────────────────────────────────────────────
function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <p className="text-sm text-gray-600">
            <span className="text-gray-500">{label} : </span>
            <span className="text-gray-800">{value}</span>
        </p>
    );
}
