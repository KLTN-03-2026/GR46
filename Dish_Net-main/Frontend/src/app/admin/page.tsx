'use client';

import { useState } from 'react';

const statCards = [
    { label: 'Tổng người dùng', value: '3,540', sub: '+10 hôm nay', color: 'bg-blue-500', icon: 'users' },
    { label: 'Tổng cửa hàng', value: '150', sub: '+10 hôm nay', color: 'bg-orange-500', icon: 'store' },
    { label: 'Tổng đơn hàng hôm nay', value: '1,120', sub: '+10% so với hôm qua', color: 'bg-green-500', icon: 'orders' },
    { label: 'Doanh thu hôm nay', value: '60.000.000 đ', sub: '', color: 'bg-red-500', icon: 'revenue' },
];

const topStores = [
    { name: 'Nét Huế - Hàng Bông', orders: '1000 đơn' },
    { name: 'Cơm tấm ba Ghiên', orders: '900 đơn' },
    { name: 'Trà sữa Koi', orders: '800 đơn' },
];

const topFoods = [
    { name: 'Bún bò Huế', orders: '3000 đơn' },
    { name: 'Cơm tấm', orders: '1,800 đơn' },
    { name: 'Trà sữa trân châu', orders: '1,500 đơn' },
];

const recentActivities = [
    { text: 'Nguyễn Văn A đặt đơn #QA1023 – 145.000đ', time: '1 phút trước' },
    { text: 'Quán Nét Huế tạo mã khuyến mãi 20%', time: '2 phút trước' },
    { text: 'Trần Thị B đăng ký tài khoản mới', time: '5 phút trước' },
    { text: 'Đơn #QA1020 đã giao thành công', time: '8 phút trước' },
];

const chartDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const chartValues = [65, 80, 45, 90, 70, 55, 85];

const monthlyRevenue = [
    { month: 'T1', value: 40 }, { month: 'T2', value: 55 }, { month: 'T3', value: 65 },
    { month: 'T4', value: 50 }, { month: 'T5', value: 80 }, { month: 'T6', value: 70 },
    { month: 'T7', value: 90 }, { month: 'T8', value: 75 }, { month: 'T9', value: 60 },
    { month: 'T10', value: 85 }, { month: 'T11', value: 65 }, { month: 'T12', value: 95 },
];

const statIcons: Record<string, React.ReactNode> = {
    users: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    store: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <rect width="20" height="5" x="2" y="7" rx="1" />
        </svg>
    ),
    orders: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
        </svg>
    ),
    revenue: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    ),
};

export default function AdminDashboard() {
    const [activeFilter, setActiveFilter] = useState('today');
    const filters = [
        { key: 'today', label: 'Hôm nay' },
        { key: '7days', label: '7 ngày' },
        { key: '30days', label: '30 ngày' },
        { key: 'custom', label: 'Tùy chọn' },
    ];

    return (
        <div className="p-6">
            {/* Header Bar */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-black">Thống kê</h1>
                <div className="flex items-center gap-4">
                    {/* Time Filters */}
                    <div className="flex bg-white rounded-2xl p-1 shadow-sm">
                        {filters.map((f, i) => (
                            <button
                                key={f.key}
                                onClick={() => setActiveFilter(f.key)}
                                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${activeFilter === f.key
                                    ? 'bg-green-button text-white shadow-md'
                                    : 'text-gray-500 hover:text-black'
                                    } ${i < filters.length - 1 ? 'border-r border-gray-100' : ''}`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
                {statCards.map((card) => (
                    <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center text-white`}>
                                {statIcons[card.icon]}
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">{card.label}</p>
                        <p className="text-2xl font-bold text-black mb-1">{card.value}</p>
                        {card.sub && <p className="text-xs text-green-500 font-medium">{card.sub}</p>}
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
                {/* Đơn hàng theo ngày */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h3 className="text-base font-bold text-black mb-4">Số đơn hàng theo ngày</h3>
                    <div className="flex items-end justify-between gap-2 h-40">
                        {chartDays.map((day, i) => (
                            <div key={day} className="flex flex-col items-center flex-1 gap-1">
                                <div
                                    className="w-full bg-green-button/80 rounded-t-md transition-all duration-500 hover:bg-green-button"
                                    style={{ height: `${chartValues[i]}%` }}
                                />
                                <span className="text-xs text-gray-400">{day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Doanh thu theo tháng */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h3 className="text-base font-bold text-black mb-4">Doanh thu theo tháng</h3>
                    <div className="flex items-end justify-between gap-1 h-40">
                        {monthlyRevenue.map((m) => (
                            <div key={m.month} className="flex flex-col items-center flex-1 gap-1">
                                <div
                                    className="w-full bg-blue-500/80 rounded-t-md transition-all duration-500 hover:bg-blue-500"
                                    style={{ height: `${m.value}%` }}
                                />
                                <span className="text-[10px] text-gray-400">{m.month}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row: Rankings + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Top cửa hàng */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold text-black">Top cửa hàng</h3>
                        <button className="text-sm text-blue-link hover:underline cursor-pointer">Xem tất cả &gt;</button>
                    </div>
                    <div className="flex flex-col">
                        {topStores.map((store, i) => (
                            <div key={store.name} className={`flex items-center gap-3 py-3 ${i < topStores.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0">
                                    {i + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-black">{store.name}</p>
                                    <p className="text-xs text-gray-400">{store.orders}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top món ăn */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold text-black">Top món ăn</h3>
                        <button className="text-sm text-blue-link hover:underline cursor-pointer">Xem tất cả &gt;</button>
                    </div>
                    <div className="flex flex-col">
                        {topFoods.map((food, i) => (
                            <div key={food.name} className={`flex items-center gap-3 py-3 ${i < topFoods.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0">
                                    {i + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-black">{food.name}</p>
                                    <p className="text-xs text-gray-400">{food.orders}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Yêu cầu nâng cấp + Hoạt động gần đây */}
                <div className="flex flex-col gap-5">
                    {/* Yêu cầu nâng cấp tài khoản */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <h3 className="text-base font-bold text-black mb-4">Yêu cầu nâng cấp tài khoản</h3>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-600">Nâng cấp tài khoản kiếm tiền</span>
                                <span className="text-sm font-bold text-black">8</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600">Đăng ký cửa hàng</span>
                                <span className="text-sm font-bold text-black">10</span>
                            </div>
                        </div>
                        <button className="text-sm text-green-button font-medium mt-3 hover:underline cursor-pointer">Xử lý ngay &gt;</button>
                    </div>

                    {/* Hoạt động gần đây */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-bold text-black">Hoạt động gần đây</h3>
                            <button className="text-sm text-blue-link hover:underline cursor-pointer">Xem tất cả &gt;</button>
                        </div>
                        <div className="flex flex-col">
                            {recentActivities.map((act, i) => (
                                <div key={i} className={`py-2.5 ${i < recentActivities.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                    <p className="text-sm text-black">{act.text}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{act.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
