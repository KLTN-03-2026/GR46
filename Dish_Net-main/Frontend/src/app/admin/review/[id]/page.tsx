'use client';

import { Suspense, use, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const rejectReasons = [
    'Nội dung không phù hợp',
    'Thông tin không chính xác',
    'Tài khoản có dấu hiệu vi phạm',
    'Nội dung đăng tải chưa đáp ứng tiêu chuẩn của nền tảng',
    'Loại hình kinh doanh không phù hợp với nền tảng',
    'Khác',
];

export default function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={null}>
            <ReviewDetailInner params={params} />
        </Suspense>
    );
}

function ReviewDetailInner({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const searchParams = useSearchParams();
    const statusParam = searchParams.get('status') || 'Chờ duyệt';

    const [currentStatus, setCurrentStatus] = useState(statusParam);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');

    // Mock data matching Figma
    const request = {
        id,
        user: {
            name: 'Nguyễn Văn A',
            phone: '012*****02',
            email: 'nguyenvana@gmail.com',
        },
        type: 'Kiếm tiền từ nội dung',
        date: '22/02/2026, 10:05 SA',
        requestInfo: {
            label: 'Thông tin nâng cấp tài khoản kiếm tiền',
            details: [
                { key: 'Loại yêu cầu', value: 'Kiếm tiền từ nội dung' },
                { key: 'Ngày gửi', value: '22/02/2026, 10:05 SA' },
                { key: 'Lý do', value: 'Muốn kiếm thêm thu nhập từ việc chia sẻ nội dung về ẩm thực' },
            ],
        },
        reviewHistory: [
            { date: '22/02/2026, 10:05 SA', action: 'Gửi yêu cầu', by: 'Nguyễn Văn A' },
        ],
        videos: [
            { title: 'Review đồ ăn', date: '22/08/2025', views: '1,1Tr lượt xem', url: 'https://coccoc.com/search?query' },
            { title: 'Review đồ ăn', date: '22/08/2025', views: '1,1Tr lượt xem', url: 'https://coccoc.com/search?query' },
        ],
    };

    const handleApprove = () => {
        setCurrentStatus('Đã duyệt');
    };

    const handleReject = () => {
        setShowRejectModal(true);
    };

    const handleConfirmReject = () => {
        if (selectedReason) {
            setCurrentStatus('Đã từ chối');
            setShowRejectModal(false);
            setSelectedReason('');
        }
    };

    const getStatusBadge = () => {
        switch (currentStatus) {
            case 'Chờ duyệt': return <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-600">Chờ duyệt</span>;
            case 'Đã duyệt': return <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-600">Đã Phê duyệt</span>;
            case 'Đã từ chối': return <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-600">Đã từ chối</span>;
            default: return null;
        }
    };

    return (
        <div className="p-6 space-y-5">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/review"
                    className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-black border border-gray-100"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </Link>
                <h1 className="text-xl font-bold text-black">Chi tiết đơn yêu cầu</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Thông tin người dùng */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-base font-bold text-black pb-4 border-b border-gray-100 mb-4">Thông tin người dùng</h2>
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shrink-0">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <div className="flex-1 space-y-1.5">
                                <p className="font-bold text-black text-base">{request.user.name}</p>
                                <p className="text-sm text-gray-500">{request.user.phone}</p>
                                <p className="text-sm text-gray-500">{request.user.email}</p>
                            </div>
                            <button className="px-4 py-2 rounded-xl bg-green-button text-white text-sm font-medium hover:bg-green-hover transition-colors cursor-pointer">
                                Gọi ngay
                            </button>
                        </div>
                    </div>

                    {/* Thông tin yêu cầu */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-base font-bold text-black pb-4 border-b border-gray-100 mb-4">Thông tin yêu cầu</h2>
                        <div className="space-y-3">
                            {request.requestInfo.details.map((d, i) => (
                                <div key={i} className="flex gap-3 text-sm">
                                    <span className="text-gray-400 w-28 shrink-0">{d.key}:</span>
                                    <span className="text-black font-medium">{d.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Lịch sử kiểm duyệt */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-base font-bold text-black pb-4 border-b border-gray-100 mb-4">Lịch sử kiểm duyệt</h2>
                        <div className="space-y-3">
                            {request.reviewHistory.map((h, i) => (
                                <div key={i} className="flex gap-3 text-sm">
                                    <span className="text-gray-400 w-44 shrink-0">{h.date}</span>
                                    <span className="text-black font-medium">{h.action}</span>
                                    <span className="text-gray-500">— {h.by}</span>
                                </div>
                            ))}
                            {currentStatus === 'Đã duyệt' && (
                                <div className="flex gap-3 text-sm">
                                    <span className="text-gray-400 w-44 shrink-0">22/02/2026, 11:00 SA</span>
                                    <span className="text-green-600 font-medium">Đã phê duyệt</span>
                                    <span className="text-gray-500">— Admin</span>
                                </div>
                            )}
                            {currentStatus === 'Đã từ chối' && (
                                <div className="flex gap-3 text-sm">
                                    <span className="text-gray-400 w-44 shrink-0">22/02/2026, 11:00 SA</span>
                                    <span className="text-red-600 font-medium">Đã từ chối</span>
                                    <span className="text-gray-500">— Admin</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                    {/* Thông tin nâng cấp tài khoản kiếm tiền */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-base font-bold text-black pb-4 border-b border-gray-100 mb-4">{request.requestInfo.label}</h2>
                        <div className="space-y-2 text-sm">
                            <p className="text-gray-500">Trạng thái:</p>
                            <div className="mb-3">{getStatusBadge()}</div>
                        </div>
                    </div>

                    {/* Video nổi bật */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-base font-bold text-black pb-4 border-b border-gray-100 mb-4">Video nổi bật</h2>
                        <div className="space-y-4">
                            {request.videos.map((v, i) => (
                                <div key={i} className="rounded-xl border border-gray-100 overflow-hidden">
                                    <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    </div>
                                    <div className="p-3 space-y-1">
                                        <p className="font-semibold text-black text-sm">{v.title}</p>
                                        <p className="text-xs text-gray-400">{v.date}</p>
                                        <p className="text-xs text-gray-400">{v.views}</p>
                                        <p className="text-xs text-blue-500 truncate">{v.url}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {currentStatus === 'Chờ duyệt' && (
                        <div className="flex gap-3">
                            <button
                                onClick={handleApprove}
                                className="flex-1 px-5 py-3 rounded-xl bg-green-button text-white text-sm font-bold hover:bg-green-hover transition-colors cursor-pointer"
                            >
                                Phê duyệt
                            </button>
                            <button
                                onClick={handleReject}
                                className="flex-1 px-5 py-3 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors cursor-pointer"
                            >
                                Từ chối
                            </button>
                        </div>
                    )}

                    {currentStatus === 'Đã duyệt' && (
                        <div className="flex">
                            <div className="flex-1 px-5 py-3 rounded-xl bg-green-100 text-green-600 text-sm font-bold text-center">
                                Đã Phê duyệt
                            </div>
                        </div>
                    )}

                    {currentStatus === 'Đã từ chối' && (
                        <div className="flex">
                            <div className="flex-1 px-5 py-3 rounded-xl bg-red-100 text-red-600 text-sm font-bold text-center">
                                Đã từ chối
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Reject Reason Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5 mx-4">
                        <h3 className="text-lg font-bold text-black">Lý do từ chối phê duyệt</h3>

                        <div className="space-y-3">
                            {rejectReasons.map((reason) => (
                                <label
                                    key={reason}
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedReason === reason
                                            ? 'border-green-button bg-green-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="rejectReason"
                                        value={reason}
                                        checked={selectedReason === reason}
                                        onChange={() => setSelectedReason(reason)}
                                        className="w-4 h-4 accent-green-600"
                                    />
                                    <span className="text-sm text-black">{reason}</span>
                                </label>
                            ))}
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => { setShowRejectModal(false); setSelectedReason(''); }}
                                className="flex-1 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleConfirmReject}
                                className={`flex-1 px-5 py-3 rounded-xl text-sm font-bold text-white transition-colors cursor-pointer ${selectedReason ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                                disabled={!selectedReason}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
