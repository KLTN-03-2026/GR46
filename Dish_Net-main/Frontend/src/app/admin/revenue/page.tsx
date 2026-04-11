'use client';

import { useState } from 'react';
import AdminTable, { Column } from '@/components/Admin/AdminTable';
import Pagination from '@/components/Admin/Pagination';
import ViewButton from '@/components/Admin/ViewButton';

type Order = {
    id: string;
    store: string;
    customer: string;
    total: string;
    status: string;
    date: string;
};

const topStores = [
    { name: 'Nét Huế - Hàng Bông', revenue: '1000 đơn', avatar: '🍜' },
    { name: 'Cơm tấm ba Ghiên', revenue: '900 đơn', avatar: '🍛' },
    { name: 'Trà sữa Koi', revenue: '800 đơn', avatar: '🧋' },
];

const topCreators = [
    { name: 'Nguyễn Văn a', revenue: '120,000,000đ', avatar: '🧑' },
    { name: 'Nguyễn Văn a', revenue: '110,000,000đ', avatar: '🧑' },
    { name: 'Nguyễn Văn a', revenue: '100,000,000đ', avatar: '🧑' },
];

const mockOrders: Order[] = [
    { id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Đã giao', date: '22/02/2026, 10:05 SA' },
    { id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Chờ xác nhận', date: '22/02/2026, 10:05 SA' },
    { id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Đã hủy', date: '22/02/2026, 10:05 SA' },
    { id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Đang chuẩn bị', date: '22/02/2026, 10:05 SA' },
];

for (let i = 0; i < 6; i++) {
    mockOrders.push({ id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Đang chuẩn bị', date: '22/02/2026, 10:05 SA' });
}

const getStatusStyle = (status: string) => {
    switch (status) {
        case 'Chờ xác nhận': return 'text-orange-500 border-orange-400 bg-orange-50';
        case 'Đang chuẩn bị': return 'text-blue-500 border-blue-400 bg-blue-50';
        case 'Đang giao': return 'text-blue-600 border-blue-500 bg-blue-50';
        case 'Đã giao': return 'text-green-600 border-green-500 bg-green-50';
        case 'Trả hàng': return 'text-orange-600 border-orange-500 bg-orange-50';
        case 'Đã hủy': return 'text-red-500 border-red-400 bg-red-50';
        default: return 'text-gray-600 border-gray-300 bg-gray-50';
    }
};

const ITEMS_PER_PAGE = 10;

export default function RevenuePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStore, setSelectedStore] = useState('Tất cả cửa hàng');
    const [selectedStatus, setSelectedStatus] = useState('Trạng thái đơn');

    const filteredOrders = mockOrders.filter(() => true); // Placeholder filter
    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
    const paginatedOrders = filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const columns: Column<Order>[] = [
        { key: 'id', label: 'Mã đơn', render: (row) => <span className="font-semibold text-black">{row.id}</span> },
        {
            key: 'store', label: 'Cửa hàng', render: (row) => (
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 text-xs">🍜</div>
                    <span className="text-gray-700">{row.store}</span>
                </div>
            )
        },
        { key: 'customer', label: 'Khách hàng', render: (row) => <span className="text-gray-700">{row.customer}</span> },
        { key: 'total', label: 'Tổng tiền đơn', align: 'center', render: (row) => <span className="font-semibold text-[#FF9800]">{row.total}</span> },
        {
            key: 'status', label: 'Trạng thái đơn', align: 'center', render: (row) => (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(row.status)}`}>{row.status}</span>
            )
        },
        { key: 'date', label: 'Thời gian đặt', align: 'center', render: (row) => <span className="text-[#0088FF] text-xs font-medium whitespace-nowrap">{row.date}</span> },
        { key: 'action', label: '', align: 'center', render: (row) => <ViewButton href={`/admin/orders/${row.id}`} variant="blue" /> },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-black tracking-wide">QUẢN LÝ DOANH THU</h1>
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2.5 text-sm outline-none focus:border-green-500 transition-colors shadow-sm"
                    />
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-[#E8F5E9] rounded-2xl p-6 shadow-sm relative overflow-hidden">
                    <p className="text-sm font-semibold text-black mb-2">Tổng doanh thu hệ thống</p>
                    <p className="text-[28px] font-bold text-[#4CAF50]">450,000,000đ</p>
                    <button className="absolute top-4 right-4 text-[#4CAF50] hover:opacity-80 transition-opacity">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                    </button>
                    <div className="absolute bottom-4 right-5 text-4xl opacity-90 leading-none">
                        📈💰
                    </div>
                </div>
                <div className="bg-[#E3F2FD] rounded-2xl p-6 shadow-sm flex flex-col justify-center">
                    <p className="text-sm font-semibold text-black mb-2">Doanh thu hôm nay</p>
                    <p className="text-[28px] font-bold text-[#2196F3]">60.000.000 đ</p>
                </div>
                <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-center">
                    <p className="text-sm font-semibold text-black mb-2">Tổng số đơn hàng</p>
                    <p className="text-[28px] font-bold text-black">32.890</p>
                </div>
            </div>

            {/* Line Chart Component Mock */}
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base font-bold text-black uppercase tracking-wide">BIỂU ĐỒ DOANH THU</h3>
                    <button className="text-[#0088FF] hover:opacity-80 transition-opacity">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                    </button>
                </div>
                {/* Visual Chart Mock */}
                <div className="w-full h-56 bg-gray-50/50 rounded-xl border border-gray-100 relative pt-4 pr-12 pb-8 pl-12 flex flex-col justify-between">
                    {[450, 350, 300, 250, 120].map((val, idx) => (
                        <div key={idx} className="flex items-center absolute w-full left-0 right-0 px-12" style={{ top: `${(idx * 20) + 10}%` }}>
                            <span className="text-[10px] text-gray-400 absolute left-2 w-8 text-right font-medium">{val}M</span>
                            <div className="w-full border-b border-dashed border-gray-200"></div>
                        </div>
                    ))}
                    {/* SVG Line representation */}
                    <svg className="absolute inset-0 w-full h-full pb-8 pt-4 px-12 z-10" preserveAspectRatio="none">
                        <path d="M0,150 Q100,120 200,90 T400,80 T600,70 T800,20" fill="none" stroke="#A5D6A7" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                        <path d="M0,150 Q100,120 200,90 T400,80 T600,70 T800,20 L800,200 L0,200 Z" fill="rgba(165,214,167,0.2)" vectorEffect="non-scaling-stroke" />
                        <circle cx="0" cy="150" r="4" fill="#4CAF50" vectorEffect="non-scaling-stroke" />
                        <circle cx="20%" cy="120" r="4" fill="#4CAF50" vectorEffect="non-scaling-stroke" />
                        <circle cx="40%" cy="90" r="4" fill="#4CAF50" vectorEffect="non-scaling-stroke" />
                        <circle cx="60%" cy="80" r="4" fill="#4CAF50" vectorEffect="non-scaling-stroke" />
                        <circle cx="80%" cy="70" r="4" fill="#4CAF50" vectorEffect="non-scaling-stroke" />
                        <circle cx="100%" cy="20" r="4" fill="#4CAF50" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <div className="absolute right-12 top-[10%] bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs font-bold z-20 shadow-sm translate-x-1/2 -translate-y-full mt-2">
                        480.5M
                    </div>
                    {/* X-axis labels */}
                    <div className="absolute bottom-2 left-12 right-12 flex justify-between text-[10px] text-gray-400 font-medium">
                        <span>21/04</span><span>22/04</span><span>22/04</span><span>23/04</span><span>24/04</span><span>25/04</span><span>26/04</span><span>26/04</span><span className="text-black font-bold">27/04</span><span>22/04</span>
                    </div>
                </div>
            </div>

            {/* Row 3: Pie Chart and Top Rankings */}
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                {/* Pie Chart */}
                <div className="w-full lg:w-1/2 xl:w-[45%] bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
                    <h3 className="text-base font-bold text-black uppercase tracking-wide mb-6">DOANH THU THEO NGUỒN</h3>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        {/* Mock Donut SVG */}
                        <div className="relative w-48 h-48 mb-6 shrink-0">
                            <svg viewBox="0 0 36 36" className="w-full h-full">
                                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#FFF" strokeWidth="6" />
                                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#FFCA28" strokeWidth="6" strokeDasharray="40 60" strokeDashoffset="25" />
                                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#4DB6AC" strokeWidth="6" strokeDasharray="25 75" strokeDashoffset="-15" />
                                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#29B6F6" strokeWidth="6" strokeDasharray="35 65" strokeDashoffset="-40" />
                            </svg>
                            <span className="absolute top-[25%] left-[20%] text-[10px] font-bold text-white z-10">40%</span>
                            <span className="absolute bottom-[20%] left-[45%] text-[10px] font-bold text-white z-10">25%</span>
                            <span className="absolute top-[40%] right-[15%] text-[10px] font-bold text-white z-10">35%</span>
                            <div className="absolute inset-0 rounded-full border-[6px] border-white pointer-events-none mix-blend-overlay"></div>
                        </div>

                        {/* Legend */}
                        <div className="w-full space-y-3 px-4">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-gray-600 font-medium">
                                    <span className="w-3 h-3 rounded-sm bg-[#4DB6AC]"></span> Video review
                                </div>
                                <span className="font-bold text-black">40%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-gray-600 font-medium">
                                    <span className="w-3 h-3 rounded-sm bg-[#29B6F6]"></span> Tìm kiếm món ăn
                                </div>
                                <span className="font-bold text-black">35%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-gray-600 font-medium">
                                    <span className="w-3 h-3 rounded-sm bg-[#FFCA28]"></span> Khuyến mãi
                                </div>
                                <span className="font-bold text-black">25%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Lists */}
                <div className="w-full lg:w-1/2 xl:w-[55%] flex flex-col gap-6">
                    {/* Top Stores */}
                    <div className="bg-white border text-gray-800 rounded-2xl p-6 shadow-sm flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-bold text-black">Top cửa hàng doanh thu cao</h3>
                            <button className="text-[13px] text-[#0088FF] hover:underline cursor-pointer font-medium">Xem tất cả &gt;</button>
                        </div>
                        <div className="flex flex-col gap-1">
                            {topStores.map((store, i) => (
                                <div key={store.name + i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">{store.avatar}</div>
                                        <p className="text-[15px] font-medium text-black">{store.name}</p>
                                    </div>
                                    <p className="text-[15px] font-medium text-black">{store.revenue}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Top Creators */}
                    <div className="bg-white border text-gray-800 rounded-2xl p-6 shadow-sm flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-bold text-black">Top nhà sáng tạo doanh thu cao</h3>
                            <button className="text-[13px] text-[#0088FF] hover:underline cursor-pointer font-medium">Xem tất cả &gt;</button>
                        </div>
                        <div className="flex flex-col gap-1">
                            {topCreators.map((creator, i) => (
                                <div key={creator.name + i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">{creator.avatar}</div>
                                        <p className="text-[15px] font-medium text-black">{creator.name}</p>
                                    </div>
                                    <p className="text-[15px] font-medium text-black">{creator.revenue}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Table Filters (Aligned right) */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <div className="relative">
                    <select
                        value={selectedStore}
                        onChange={(e) => { setSelectedStore(e.target.value); setCurrentPage(1); }}
                        className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-[13px] font-medium text-gray-700 shadow-sm focus:outline-none focus:border-green-button cursor-pointer"
                    >
                        <option value="Tất cả cửa hàng">Tất cả cửa hàng</option>
                    </select>
                    <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
                <div className="relative">
                    <select
                        value={selectedStatus}
                        onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                        className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-[13px] font-medium text-gray-700 shadow-sm focus:outline-none focus:border-green-button cursor-pointer"
                    >
                        <option value="Trạng thái đơn">Trạng thái đơn</option>
                    </select>
                    <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
            </div>

            {/* Bottom Table */}
            <AdminTable
                columns={columns}
                data={paginatedOrders}
                rowKey={(row, i) => `${row.id}-${i}`}
                emptyMessage="Không có đơn hàng nào."
            >
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </AdminTable>
        </div>
    );
}
