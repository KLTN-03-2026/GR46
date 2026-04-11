'use client';

import { use, useState } from 'react';
import Link from 'next/link';

const lockReasons = [
    'Vi phạm nội dung / cộng đồng',
    'Hoạt động bất thường',
    'Gian lận / lừa đảo',
    'Vi phạm giao dịch / đơn hàng',
    'Lý do quản trị',
    'Khác',
];

export default function AccountDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [showLockModal, setShowLockModal] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');
    const [isLocked, setIsLocked] = useState(false);

    const type = id.startsWith('B') ? 'Người dùng' : id.startsWith('C') ? 'Nhà sáng tạo' : 'Cửa hàng';
    const status = isLocked ? 'Khóa' : 'Hoạt động';

    const handleLock = () => setShowLockModal(true);
    const handleConfirmLock = () => {
        if (selectedReason) {
            setIsLocked(true);
            setShowLockModal(false);
            setSelectedReason('');
        }
    };

    const statusBadge = (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${status === 'Hoạt động' ? 'text-green-600 border-green-600 bg-green-50' : 'text-red-500 border-red-500 bg-red-50'}`}>
            {status === 'Khóa' ? 'Bị khóa' : status}
        </span>
    );

    const typeBadge = (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${type === 'Người dùng' ? 'text-green-600 border-green-600 bg-green-50' :
            type === 'Nhà sáng tạo' ? 'text-orange-500 border-orange-500 bg-orange-50' :
                'text-blue-500 border-blue-500 bg-blue-50'
            }`}>
            {type}
        </span>
    );

    return (
        <div className="min-h-full bg-gray-50 p-6 pb-20">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/admin/accounts" className="hover:opacity-70 transition-opacity">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </Link>
                    <h1 className="text-xl font-bold text-black">Chi tiết tài khoản</h1>
                </div>

                {/* Main Card Wrapper */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8 min-h-[75vh]">
                    {/* Layout based on type */}
                    {type === 'Người dùng' && (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">THÔNG TIN NGƯỜI DÙNG</h2>
                                <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col md:flex-row gap-8 items-start relative shadow-sm">
                                    <div className="flex gap-4 w-full md:w-1/2">
                                        <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 overflow-hidden">
                                            <span className="text-orange-600 font-bold text-xs">Avatar</span>
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <p><span className="w-32 inline-block">Tên người dùng</span>: <span className="font-semibold text-black">Nguyễn Văn A</span></p>
                                            <p><span className="w-32 inline-block">Sđt</span>: 012*****02</p>
                                            <p><span className="w-32 inline-block">Email</span>: nguyenvana@gmail.com</p>
                                            <p><span className="w-32 inline-block">Địa chỉ</span>: 40 Nguyễn Như Hạnh, Hòa Khánh, ĐN</p>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-100 md:pl-8 pt-4 md:pt-0 space-y-2 text-sm text-gray-700">
                                        <p><span className="w-28 inline-block">ID tài khoản</span>: {id}</p>
                                        <p><span className="w-28 inline-block">Ngày đăng ký</span>: 22/02/2024, 10:05 SA</p>
                                        <div className="flex items-center gap-2 pt-1">
                                            <span className="w-28 inline-block">Loại tài khoản</span>: {typeBadge} {statusBadge}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">THỐNG KÊ HOẠT ĐỘNG</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-green-50 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                                        <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
                                            <span className="w-5 h-5 bg-green-500 rounded-full inline-block"></span> Số đơn hàng đã đặt
                                        </p>
                                        <p className="text-3xl font-bold text-black">20</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                                        <p className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1">
                                            <span className="w-5 h-5 bg-purple-500 rounded-lg inline-block"></span> Số bài đăng
                                        </p>
                                        <p className="text-3xl font-bold text-black">10</p>
                                    </div>
                                    <div className="bg-orange-50 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                                        <p className="text-xs font-semibold text-orange-700 mb-2 flex items-center gap-1">
                                            <span className="w-5 h-5 bg-orange-500 rounded-full inline-block"></span> Số lượt thích
                                        </p>
                                        <p className="text-3xl font-bold text-black">500</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                                        <p className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1">
                                            <span className="w-5 h-5 bg-blue-500 rounded-lg inline-block"></span> Số bình luận
                                        </p>
                                        <p className="text-3xl font-bold text-black">100</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">LỊCH SỬ VI PHẠM</h2>
                                <div className="bg-white rounded-2xl border border-gray-100 p-5 h-32 shadow-sm text-sm text-gray-400">
                                    05/03/2026 - Bị báo cáo spam nội dung<br />
                                    12/02/2026 - Khiếu nại đơn hàng
                                </div>
                            </div>
                        </div>
                    )}

                    {type === 'Nhà sáng tạo' && (
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Left Column */}
                            <div className="flex-1 space-y-6">
                                <div className="space-y-3">
                                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">THÔNG TIN NGƯỜI DÙNG</h2>
                                    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex gap-4 relative shadow-sm">
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            {typeBadge} {statusBadge}
                                        </div>
                                        <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100"></div>
                                        <div className="space-y-2 text-sm text-gray-700 mt-1">
                                            <p><span className="w-32 inline-block">Tên người dùng</span>: <span className="font-semibold text-black">Nguyễn Văn A</span></p>
                                            <p><span className="w-32 inline-block">Sđt</span>: 012*****02</p>
                                            <p><span className="w-32 inline-block">Email</span>: nguyenvana@gmail.com</p>
                                            <p><span className="w-32 inline-block">Địa chỉ</span>: 40 Nguyễn Như Hạnh, Hòa Khánh, ĐN</p>
                                            <p><span className="w-32 inline-block">ID tài khoản</span>: {id}</p>
                                            <p><span className="w-32 inline-block">Ngày đăng ký</span>: 22/02/2024, 10:05 SA</p>
                                            <div className="flex items-center gap-2">
                                                <span className="w-32 inline-block">Loại tài khoản</span>: {typeBadge} {statusBadge}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">THÔNG TIN KÊNH</h2>
                                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-2 text-sm text-gray-700">
                                        <p>Tên : Nguyễn Văn A</p>
                                        <p>Ngày nâng cấp tài khoản : 22/12/2024, 10:05 SA</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Video nổi bật</h2>
                                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col md:flex-row gap-4">
                                        <div className="flex flex-1 gap-3 border border-gray-100 rounded-xl p-2">
                                            <div className="w-32 h-20 bg-gray-200 rounded-lg shrink-0"></div>
                                            <div className="flex flex-col justify-center">
                                                <p className="font-bold text-black text-sm">Review đồ ăn <span className="text-gray-400 font-normal text-xs">22/08/2025</span></p>
                                                <p className="text-xs text-gray-500">1,1Tr lượt xem</p>
                                                <p className="text-xs text-blue-500 bg-gray-50 px-2 py-0.5 rounded truncate w-32 mt-1">https://coccoc.com...</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 gap-3 border border-gray-100 rounded-xl p-2">
                                            <div className="w-32 h-20 bg-gray-200 rounded-lg shrink-0"></div>
                                            <div className="flex flex-col justify-center">
                                                <p className="font-bold text-black text-sm">Review đồ ăn <span className="text-gray-400 font-normal text-xs">22/08/2025</span></p>
                                                <p className="text-xs text-gray-500">1,1Tr lượt xem</p>
                                                <p className="text-xs text-blue-500 bg-gray-50 px-2 py-0.5 rounded truncate w-32 mt-1">https://coccoc.com...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="w-full lg:w-72 space-y-4">
                                <div className="bg-green-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs font-semibold text-green-700 mb-1 flex items-center gap-1">Số đơn hàng đã đặt</p>
                                    <p className="text-3xl font-bold text-black">320</p>
                                </div>
                                <div className="bg-purple-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs font-semibold text-purple-700 mb-1 flex items-center gap-1">Số bài đăng</p>
                                    <p className="text-3xl font-bold text-black">120</p>
                                </div>
                                <div className="bg-orange-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs font-semibold text-orange-700 mb-1 flex items-center gap-1">Số lượt thích</p>
                                    <p className="text-3xl font-bold text-black">4,3k</p>
                                </div>
                                <div className="bg-blue-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs font-semibold text-blue-700 mb-1 flex items-center gap-1">Số lượt xem</p>
                                    <p className="text-3xl font-bold text-black">6,8k</p>
                                </div>

                                <div className="mt-6 pt-6">
                                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">THỐNG KÊ THU NHẬP</h2>
                                    <div className="bg-green-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm h-32">
                                        <p className="text-2xl font-bold text-black mb-1">30,000,000đ</p>
                                        <p className="text-xs text-gray-600">Tổng thu nhập kiếm được</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {type === 'Cửa hàng' && (
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Left Column */}
                            <div className="flex-1 space-y-6">
                                <div className="space-y-3">
                                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">THÔNG TIN NGƯỜI DÙNG</h2>
                                    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex gap-4 relative shadow-sm">
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            {typeBadge} {statusBadge}
                                        </div>
                                        <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100"></div>
                                        <div className="space-y-2 text-sm text-gray-700 mt-1">
                                            <p><span className="w-32 inline-block">Tên người dùng</span>: <span className="font-semibold text-black">Nguyễn Văn A</span></p>
                                            <p><span className="w-32 inline-block">Sđt</span>: 012*****02</p>
                                            <p><span className="w-32 inline-block">Email</span>: nguyenvana@gmail.com</p>
                                            <p><span className="w-32 inline-block">Địa chỉ</span>: 40 Nguyễn Như Hạnh, Hòa Khánh, ĐN</p>
                                            <p><span className="w-32 inline-block">ID tài khoản</span>: {id}</p>
                                            <p><span className="w-32 inline-block">Ngày đăng ký</span>: 22/02/2024, 10:05 SA</p>
                                            <div className="flex items-center gap-2">
                                                <span className="w-32 inline-block">Loại tài khoản</span>: {typeBadge} {statusBadge}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">THÔNG TIN CỬA HÀNG</h2>
                                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-2 text-sm text-gray-700">
                                        <p>Tên cửa hàng : Nét Huế - hàng bông</p>
                                        <p>Địa chỉ : 40 Nguyễn Như Hạnh, Hòa Khánh, ĐN</p>
                                        <p>Loại ẩm thực : Bún - Món Huế</p>
                                        <p>Giờ mở cửa : 07:00 - 22:00</p>
                                        <p>Ngày nâng cấp tài khoản : 22/12/2024, 10:05 SA</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-green-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                        <p className="text-xs font-semibold text-green-700 mb-1">Số đơn hàng</p>
                                        <p className="text-2xl font-bold text-black">500</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                        <p className="text-xs font-semibold text-purple-700 mb-1">Số món ở menu</p>
                                        <p className="text-2xl font-bold text-black">30</p>
                                    </div>
                                    <div className="bg-orange-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                        <p className="text-xs font-semibold text-orange-700 mb-1">Đánh giá</p>
                                        <p className="text-2xl font-bold text-black">4.6/5.0 ★</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="w-full lg:w-72 space-y-4">
                                <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
                                    <h2 className="text-sm font-bold text-gray-800 mb-2">Lịch sử vi phạm</h2>
                                    <p className="text-sm text-gray-400">chưa có vi phạm</p>
                                </div>

                                <div className="bg-orange-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs font-semibold text-orange-700 mb-1">Số lượt thích</p>
                                    <p className="text-3xl font-bold text-black">4,3k</p>
                                </div>
                                <div className="bg-blue-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs font-semibold text-blue-700 mb-1">Số lượt xem</p>
                                    <p className="text-3xl font-bold text-black">6,8k</p>
                                </div>

                                <div className="mt-6 pt-2">
                                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">THỐNG KÊ THU NHẬP</h2>
                                    <div className="bg-green-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm h-32">
                                        <p className="text-2xl font-bold text-black mb-1">30,000,000đ</p>
                                        <p className="text-xs text-gray-600">Tổng thu nhập kiếm được</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Lock Action aligned center bottom */}
                    <div className="flex justify-center pt-8 border-t border-gray-100">
                        {!isLocked ? (
                            <button
                                onClick={handleLock}
                                className="px-8 py-3 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors shadow-sm cursor-pointer"
                            >
                                Khóa tài khoản
                            </button>
                        ) : (
                            <div className="px-8 py-3 rounded-xl bg-red-100 text-red-600 text-sm font-bold opacity-70 cursor-not-allowed">
                                Đã khóa tài khoản
                            </div>
                        )}
                    </div>
                </div>

                {/* Lock Reason Modal */}
                {showLockModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5 mx-4">
                            <h3 className="text-lg font-bold text-black">Lý do khóa tài khoản</h3>
                            <div className="space-y-3">
                                {lockReasons.map((reason) => (
                                    <label
                                        key={reason}
                                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedReason === reason ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <input type="radio" name="lockReason" value={reason} checked={selectedReason === reason} onChange={() => setSelectedReason(reason)} className="w-4 h-4 accent-red-600" />
                                        <span className="text-sm text-black">{reason}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => { setShowLockModal(false); setSelectedReason(''); }} className="flex-1 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">Hủy</button>
                                <button
                                    onClick={handleConfirmLock}
                                    className={`flex-1 px-5 py-3 rounded-xl text-sm font-bold text-white transition-colors cursor-pointer ${selectedReason ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'}`}
                                    disabled={!selectedReason}
                                >Khóa</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
