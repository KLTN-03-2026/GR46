'use client';
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/Admin/Pagination';

export type ReportStatus = 'Chờ xử lý' | 'Đã xử lý';

export interface Report {
    id: string;
    code: string;
    reporterName: string;
    reportTime: string;
    reportContent: string;
    // Reported content info
    contentTitle: string;
    contentDate: string;
    contentViews: string;
    contentUrl: string;
    contentThumbnail: string;
    contentAuthor: string;
    contentDescription: string;
    status: ReportStatus;
    // For detail page
    reporterCode: string;
    reportType: string;
    submitTime: string;
    violationLevel: string;
    resolution: string;
    actions: string[];
    evidence: string;
    activityLog: { time: string; actor?: string; tag?: string; note?: string }[];
}

const mockReports: Report[] = [
    {
        id: '1',
        code: '#QA0034',
        reporterName: 'Nguyễn Văn A',
        reportTime: '04/03/2026 10:02 SA',
        reportContent: 'Video quảng cáo giảm giá nhưng thực tế không đúng',
        contentTitle: 'Review đồ ăn',
        contentDate: '22/08/2025',
        contentViews: '1.1Tr lượt xem',
        contentUrl: 'https://coccoc.com/search?query',
        contentThumbnail: '',
        contentAuthor: 'Thảo Anh',
        contentDescription: 'Video quảng cáo giảm giá nhưng thực tế không đúng.',
        status: 'Chờ xử lý',
        reporterCode: 'RP20321',
        reportType: 'Nội dung sai sự thật',
        submitTime: '04/03/2026 10:30',
        violationLevel: 'Trung bình',
        resolution: 'Gỡ video',
        actions: ['Gỡ video', 'Gửi cảnh cáo tài khoản', 'Gửi thông báo cho tài khoản/vpm'],
        evidence: 'Video quảng cáo giảm giá sai sự thật so với giá thực tế.\nĐã gỡ video và gửi cảnh cáo cho creator.',
        activityLog: [
            { time: '04/03/2026 10:20', actor: 'Nguyễn Văn A', tag: 'BÁO CÁO CÁT GAO' },
            { time: '04/03/2026 11:00', note: 'Báo cáo nội thất' },
        ],
    },
    {
        id: '2',
        code: '#QA0034',
        reporterName: 'Nguyễn Văn A',
        reportTime: '04/03/2026 10:02 SA',
        reportContent: 'Video quảng cáo giảm giá nhưng thực tế không đúng',
        contentTitle: 'Review đồ ăn',
        contentDate: '22/08/2025',
        contentViews: '1.1Tr lượt xem',
        contentUrl: 'https://coccoc.com/search?query',
        contentThumbnail: '',
        contentAuthor: 'Thảo Anh',
        contentDescription: 'Video quảng cáo giảm giá nhưng thực tế không đúng.',
        status: 'Đã xử lý',
        reporterCode: 'RP20321',
        reportType: 'Nội dung sai sự thật',
        submitTime: '04/03/2026 10:30',
        violationLevel: 'Trung bình',
        resolution: 'Gỡ video',
        actions: ['Gỡ video', 'Gửi cảnh cáo tài khoản'],
        evidence: 'Video quảng cáo giảm giá sai sự thật so với giá thực tế.\nĐã gỡ video và gửi cảnh cáo cho creator.',
        activityLog: [
            { time: '04/03/2026 10:20', actor: 'Nguyễn Văn A', tag: 'BÁO CÁO CÁT GAO' },
            { time: '04/03/2026 11:00', note: 'Báo cáo nội thất' },
        ],
    },
    {
        id: '3',
        code: '#QA0034',
        reporterName: 'Nguyễn Văn A',
        reportTime: '04/03/2026 10:02 SA',
        reportContent: 'Video quảng cáo giảm giá nhưng thực tế không đúng',
        contentTitle: 'Review đồ ăn',
        contentDate: '22/08/2025',
        contentViews: '1.1Tr lượt xem',
        contentUrl: 'https://coccoc.com/search?query',
        contentThumbnail: '',
        contentAuthor: 'Thảo Anh',
        contentDescription: 'Video quảng cáo giảm giá nhưng thực tế không đúng.',
        status: 'Chờ xử lý',
        reporterCode: 'RP20322',
        reportType: 'Spam',
        submitTime: '04/03/2026 09:15',
        violationLevel: 'Nhẹ',
        resolution: 'Gửi cảnh cáo',
        actions: ['Gửi cảnh cáo tài khoản'],
        evidence: 'Tài khoản liên tục đăng nội dung spam.',
        activityLog: [
            { time: '04/03/2026 09:20', actor: 'Trần Thị B', tag: 'BÁO CÁO SPAM' },
        ],
    },
];

const ITEMS_PER_PAGE = 5;

export default function ReportsPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = mockReports.filter(r =>
        !searchQuery ||
        r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.reportContent.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div className="p-6 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-black tracking-wide">QUẢN LÝ BÁO CÁO/ KHIẾU NẠI</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm tên mã, code khuyến mãi"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="bg-white border border-gray-200 rounded-2xl pl-4 pr-10 py-2.5 text-sm outline-none focus:border-green-500 transition-colors shadow-sm w-72"
                    />
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                </div>
            </div>

            {/* Cards */}
            <div className="space-y-4">
                {paginated.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center text-gray-400 text-sm shadow-sm border border-gray-100">
                        Không có báo cáo nào phù hợp.
                    </div>
                ) : paginated.map((report) => (
                    <div key={report.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Card Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <span className="font-bold text-gray-900 text-base">Mã báo cáo : {report.code}</span>
                            <span className={`px-4 py-1.5 rounded-lg text-xs font-semibold border ${report.status === 'Đã xử lý'
                                ? 'bg-green-50 text-green-600 border-green-300'
                                : 'bg-orange-50 text-orange-500 border-orange-300'
                                }`}>
                                {report.status}
                            </span>
                        </div>

                        {/* Card Body */}
                        <div className="px-6 py-4 flex gap-6">
                            {/* Left: reporter info */}
                            <div className="flex-1 space-y-2">
                                <p className="font-semibold text-gray-900">{report.reporterName}</p>
                                <p className="text-sm text-gray-500">
                                    Thời gian báo cáo &nbsp;&nbsp;&nbsp;
                                    <span className="text-gray-700 font-medium">{report.reportTime}</span>
                                </p>
                                <p className="text-sm text-gray-500">Nội dung báo cáo</p>
                                <div className="bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-500 max-w-sm">
                                    {report.reportContent}
                                </div>
                            </div>

                            {/* Right: reported content info + action */}
                            <div className="flex flex-col items-end justify-between gap-3 min-w-[260px]">
                                <div className="flex gap-3 w-full justify-end">
                                    {/* Thumbnail placeholder */}
                                    <div className="w-[90px] h-[70px] rounded-xl bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center shrink-0 overflow-hidden">
                                        {report.contentThumbnail ? (
                                            <img src={report.contentThumbnail} alt="thumb" className="w-full h-full object-cover" />
                                        ) : (
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polygon points="5 3 19 12 5 21 5 3" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <p className="font-semibold text-gray-900 text-sm">{report.contentTitle}</p>
                                        <p className="text-xs text-gray-400">{report.contentDate}</p>
                                        <p className="text-xs text-gray-400">{report.contentViews}</p>
                                        <p className="text-xs text-blue-500 truncate max-w-[160px]">{report.contentUrl}</p>
                                    </div>
                                </div>

                                {/* Action button */}
                                {report.status === 'Đã xử lý' ? (
                                    <button
                                        onClick={() => router.push(`/admin/reports/${report.id}`)}
                                        className="w-full py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors cursor-pointer"
                                    >
                                        Xem chi tiết báo cáo
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => router.push(`/admin/reports/${report.id}`)}
                                        className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors cursor-pointer"
                                    >
                                        Xử lý
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
}
