'use client';

import { use } from 'react';
import Link from 'next/link';

const allSteps = [
    'Đã đặt hàng',
    'Đã xác nhận đơn hàng',
    'Đang chuẩn bị đơn hàng',
    'Đang giao',
    'Hoàn thành',
];

const stepTimes: Record<string, string> = {
    'Đã đặt hàng': '10:02 SA',
    'Đã xác nhận đơn hàng': '10:03 SA',
    'Đang chuẩn bị đơn hàng': '10:04 SA',
    'Đang giao': '10:30 SA',
    'Hoàn thành': '10:45 SA',
};

// Map order status to which step index is currently active
function getActiveStepIndex(status: string): number {
    switch (status) {
        case 'Chờ xác nhận': return 0;
        case 'Đang chuẩn bị': return 2;
        case 'Đang giao': return 3;
        case 'Đã giao':
        case 'Hoàn thành': return 4;
        default: return 0;
    }
}

function getStatusBadgeStyle(status: string) {
    switch (status) {
        case 'Đang giao': return 'text-green-600 border-green-500 bg-green-50';
        case 'Đang chuẩn bị': return 'text-gray-700 border-gray-400 bg-gray-50';
        case 'Chờ xác nhận': return 'text-green-600 border-green-500 bg-green-50';
        case 'Hoàn thành':
        case 'Đã giao': return 'text-white border-green-500 bg-green-500';
        default: return 'text-gray-600 border-gray-300 bg-gray-50';
    }
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    // Determine status based on route param for demo purposes
    const statusMap: Record<string, string> = {
        'QA2031': 'Đang giao',
        'QA2032': 'Đã giao',
        'QA2033': 'Chờ xác nhận',
        'QA2034': 'Trả hàng',
        'QA2035': 'Đã hủy',
        'QA2036': 'Đang chuẩn bị',
        'QA2037': 'Đã giao',
        'QA2038': 'Đang giao',
        'QA2039': 'Đã giao',
        'QA2040': 'Chờ xác nhận',
    };

    const status = statusMap[id] || 'Đang giao';
    const displayStatus = status === 'Đã giao' ? 'Hoàn thành' : status;
    const activeStepIndex = getActiveStepIndex(status);
    const isCompleted = status === 'Đã giao' || status === 'Hoàn thành';

    const order = {
        id: 'QA001',
        items: [
            { name: 'Bún bò Huế số 1', qty: 'x1', price: '56.000đ' },
            { name: 'Bún bò Huế số 2', qty: 'x1', price: '56.000đ' },
        ],
        subtotal: '112.000đ',
        shippingFee: '31.000đ',
        discount: '0đ',
        total: '143.000đ',
        income: '100.000đ',
    };

    return (
        <div className="p-6 max-w-[1250px] mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Link href="/admin/orders" className="hover:opacity-70 transition-opacity">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </Link>
                <h1 className="text-xl font-bold text-black">Chi tiết đơn {order.id}</h1>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8 min-h-[75vh]">
                {/* Order ID + Status Badge */}
                <div className="flex items-center gap-4">
                    <span className="text-base font-bold text-black">Mã đơn : {order.id}</span>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getStatusBadgeStyle(displayStatus)}`}>
                        {displayStatus}
                    </span>
                </div>

                {/* Two-column layout: Left (Customer + Items) | Right (Status Timeline) */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column */}
                    <div className="flex-1 space-y-4">
                        {/* Customer Info Card */}
                        <div className="border border-gray-100 rounded-xl p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 overflow-hidden shrink-0">
                                        <span className="text-[10px] font-bold text-orange-500">Av</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-black">Nguyễn Văn A</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <span className="w-3 h-3 bg-green-400 rounded-full inline-block"></span>
                                            012*****02
                                        </p>
                                    </div>
                                </div>
                                {isCompleted && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium border text-green-600 border-green-500 bg-green-50">Đã giao</span>
                                )}
                                <button className="px-4 py-1.5 rounded-lg border border-green-500 text-green-600 text-xs font-semibold hover:bg-green-50 transition-colors">
                                    Gọi ngay
                                </button>
                            </div>

                            <div className="text-sm text-gray-600 space-y-1 pl-1">
                                <p>Thời gian đặt : 22/02/2026 05:00 CH</p>
                                {isCompleted && <p>Thời gian giao : 22/02/2026 05:30 CH</p>}
                                <p>Địa chỉ nhận : 40 Nguyễn Như Hạnh,...</p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-3">
                            <p className="font-bold text-sm text-black">Chi tiết đơn hàng</p>
                            {order.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                                        <span className="text-lg">🍜</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm text-black">{item.name}</p>
                                        <p className="text-xs text-gray-400">{item.qty}</p>
                                    </div>
                                    <p className="font-semibold text-sm text-black">{item.price}</p>
                                </div>
                            ))}
                        </div>

                        {/* Subtotals */}
                        <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Tạm tính</span>
                                <span>{order.subtotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Phí vận chuyển</span>
                                <span>{order.shippingFee}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Giảm giá</span>
                                <span>{order.discount}</span>
                            </div>
                            <div className="flex justify-between font-bold text-black border-t border-gray-100 pt-2">
                                <span>Tổng giá trị đơn</span>
                                <span>{order.total}</span>
                            </div>
                        </div>

                        {/* Income highlight */}
                        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center justify-between">
                            <span className="text-sm font-semibold text-green-700">Thu nhập thực nhận</span>
                            <span className="text-lg font-bold text-red-500">{order.income}</span>
                        </div>
                    </div>

                    {/* Right Column - Status Timeline */}
                    <div className="w-full lg:w-80 border border-gray-100 rounded-xl p-5">
                        <h3 className="font-bold text-base text-black mb-5">Trạng thái đơn hàng</h3>
                        <div className="space-y-5">
                            {allSteps.map((step, i) => {
                                const isActive = i <= activeStepIndex;
                                return (
                                    <div key={step} className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isActive ? 'bg-green-500' : 'bg-gray-200'}`}>
                                            {isActive && (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 6 9 17l-5-5" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={`flex-1 text-sm ${isActive ? 'font-semibold text-black' : 'text-gray-400'}`}>{step}</span>
                                        {isActive && (
                                            <span className="text-sm text-gray-500">{stepTimes[step]}</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Review - Only visible for completed orders */}
            {isCompleted && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                    <h3 className="font-bold text-base text-black">Đánh giá của khách hàng</h3>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 shrink-0">
                            <span className="text-[10px] font-bold text-orange-500">Av</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-bold text-sm text-black">Nguyễn Văn A</p>
                                <span className="text-xs text-gray-400">22/02/2026 07:00 CH</span>
                            </div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="w-3 h-3 bg-green-400 rounded-full inline-block"></span>
                                012*****02
                            </p>
                        </div>
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4].map(s => (
                                <svg key={s} width="20" height="20" viewBox="0 0 24 24" fill="#FFC107" stroke="#FFC107" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                            ))}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#E0E0E0" stroke="#E0E0E0" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-700">Nước dùng ngon, đậm vị, nhất định sẽ mua lại</p>
                    </div>
                </div>
            )}
        </div>
    );
}
