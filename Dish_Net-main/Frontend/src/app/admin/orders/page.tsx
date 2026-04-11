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

const mockOrders: Order[] = [
    { id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Đã giao', date: '22/02/2026, 10:05 SA' },
    { id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Chờ xác nhận', date: '22/02/2026, 10:05 SA' },
    { id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Đã hủy', date: '22/02/2026, 10:05 SA' },
    { id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Đang chuẩn bị', date: '22/02/2026, 10:05 SA' },
    { id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Trả hàng', date: '22/02/2026, 10:05 SA' },
    { id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Đang giao', date: '22/02/2026, 10:05 SA' },
    { id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Đã giao', date: '22/02/2026, 10:05 SA' },
    { id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Đã giao', date: '22/02/2026, 10:05 SA' },
    { id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Đã giao', date: '22/02/2026, 10:05 SA' },
    { id: 'QA2031', store: 'Nét Huế', customer: 'Nguyễn Văn A', total: '56.000đ', status: 'Đã giao', date: '22/02/2026, 10:05 SA' },
];

const stores = ['Tất cả cửa hàng', 'Nét Huế', 'Cơm tấm ba Ghiên', 'Trà sữa Koi', 'Bún bò Huế'];
const statusOptions = ['Trạng thái đơn', 'Chờ xác nhận', 'Đang chuẩn bị', 'Đang giao', 'Đã giao', 'Trả hàng', 'Đã hủy'];
const dateFilters = [
    { key: 'today', label: 'Hôm nay' },
    { key: '7days', label: '7 ngày' },
    { key: '30days', label: '30 ngày' },
    { key: 'custom', label: 'Tùy chọn' },
];

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

export default function OrderManagementPage() {
    const [activeDateFilter, setActiveDateFilter] = useState('today');
    const [selectedStore, setSelectedStore] = useState('Tất cả cửa hàng');
    const [selectedStatus, setSelectedStatus] = useState('Trạng thái đơn');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredOrders = mockOrders.filter((o) => {
        const storeMatch = selectedStore === 'Tất cả cửa hàng' || o.store === selectedStore;
        const statusMatch = selectedStatus === 'Trạng thái đơn' || o.status === selectedStatus;
        const searchMatch = !searchQuery ||
            o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.customer.toLowerCase().includes(searchQuery.toLowerCase());
        return storeMatch && statusMatch && searchMatch;
    });

    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const columns: Column<Order>[] = [
        {
            key: 'id',
            label: 'Mã đơn',
            render: (row) => <span className="font-semibold text-black">{row.id}</span>,
        },
        {
            key: 'store',
            label: 'Cửa hàng',
            render: (row) => (
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <span className="text-xs">🍜</span>
                    </div>
                    <span className="text-gray-700">{row.store}</span>
                </div>
            ),
        },
        {
            key: 'customer',
            label: 'Khách hàng',
            render: (row) => <span className="text-gray-700">{row.customer}</span>,
        },
        {
            key: 'total',
            label: 'Tổng tiền đơn',
            align: 'center',
            render: (row) => <span className="font-semibold text-green-600">{row.total}</span>,
        },
        {
            key: 'status',
            label: 'Trạng thái đơn',
            align: 'center',
            render: (row) => (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(row.status)}`}>
                    {row.status}
                </span>
            ),
        },
        {
            key: 'date',
            label: 'Thời gian đặt',
            align: 'center',
            render: (row) => <span className="text-gray-500 whitespace-nowrap">{row.date}</span>,
        },
        {
            key: 'action',
            label: '',
            align: 'center',
            render: (row) => <ViewButton href={`/admin/orders/${row.id}`} />,
        },
    ];

    return (
        <div className="p-6 space-y-5">
            {/* Page Title */}
            <h1 className="text-xl font-bold text-black tracking-wide">QUẢN LÝ ĐƠN HÀNG HỆ THỐNG</h1>

            {/* Filter Row - all on same line */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Date filter pills */}
                <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
                    {dateFilters.map((f, i) => (
                        <button
                            key={f.key}
                            onClick={() => setActiveDateFilter(f.key)}
                            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${activeDateFilter === f.key
                                ? 'bg-green-button text-white shadow'
                                : 'text-gray-500 hover:text-black'
                                } ${i < dateFilters.length - 1 ? 'border-r border-gray-100' : ''}`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="flex-1" />

                {/* Tìm kiếm */}
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Tìm kiếm mã đơn, khách hàng"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2.5 text-sm outline-none focus:border-green-500 transition-colors shadow-sm"
                    />
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                </div>

                {/* Store dropdown */}
                <div className="relative">
                    <select
                        value={selectedStore}
                        onChange={(e) => { setSelectedStore(e.target.value); setCurrentPage(1); }}
                        className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:border-green-button cursor-pointer"
                    >
                        {stores.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>

                {/* Status dropdown */}
                <div className="relative">
                    <select
                        value={selectedStatus}
                        onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                        className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:border-green-button cursor-pointer"
                    >
                        {statusOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
            </div>

            {/* Table + Pagination */}
            <AdminTable
                columns={columns}
                data={paginatedOrders}
                rowKey={(row, i) => `${row.id}-${i}`}
                emptyMessage="Không có đơn hàng nào phù hợp với bộ lọc đã chọn."
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
