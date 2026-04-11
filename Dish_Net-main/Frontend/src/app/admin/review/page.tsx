'use client';

import { useState } from 'react';
import AdminTable, { Column } from '@/components/Admin/AdminTable';
import Pagination from '@/components/Admin/Pagination';
import ViewButton from '@/components/Admin/ViewButton';

type ReviewRequest = {
    stt: number;
    name: string;
    email: string;
    type: string;
    date: string;
    status: string;
};

const mockRequests: ReviewRequest[] = [
    { stt: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Kiếm tiền từ nội dung', date: '22/02/2026, 10:05 SA', status: 'Chờ duyệt' },
    { stt: 2, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Mở cửa hàng', date: '22/02/2026, 10:05 SA', status: 'Chờ duyệt' },
    { stt: 3, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Mở cửa hàng', date: '22/02/2026, 10:05 SA', status: 'Đã duyệt' },
    { stt: 4, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Kiếm tiền từ nội dung', date: '22/02/2026, 10:05 SA', status: 'Đã từ chối' },
    { stt: 5, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Mở cửa hàng', date: '22/02/2026, 10:05 SA', status: 'Chờ duyệt' },
    { stt: 6, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Mở cửa hàng', date: '22/02/2026, 10:05 SA', status: 'Đã duyệt' },
    { stt: 7, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Mở cửa hàng', date: '22/02/2026, 10:05 SA', status: 'Chờ duyệt' },
    { stt: 8, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Kiếm tiền từ nội dung', date: '22/02/2026, 10:05 SA', status: 'Đã từ chối' },
    { stt: 9, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Kiếm tiền từ nội dung', date: '22/02/2026, 10:05 SA', status: 'Chờ duyệt' },
    { stt: 10, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Kiếm tiền từ nội dung', date: '22/02/2026, 10:05 SA', status: 'Đã duyệt' },
];

const statusOptions = ['Trạng thái', 'Chờ duyệt', 'Đã duyệt', 'Đã từ chối'];
const typeOptions = ['Loại yêu cầu', 'Kiếm tiền từ nội dung', 'Mở cửa hàng'];
const dateFilters = [
    { key: 'today', label: 'Hôm nay' },
    { key: '7days', label: '7 ngày' },
    { key: '30days', label: '30 ngày' },
    { key: 'custom', label: 'Tùy chọn' },
];

const getStatusStyle = (status: string) => {
    switch (status) {
        case 'Chờ duyệt': return 'text-orange-500 border-orange-400 bg-orange-50';
        case 'Đã duyệt': return 'text-green-600 border-green-500 bg-green-50';
        case 'Đã từ chối': return 'text-red-500 border-red-400 bg-red-50';
        default: return 'text-gray-600 border-gray-300 bg-gray-50';
    }
};

const ITEMS_PER_PAGE = 10;

export default function ReviewPage() {
    const [activeDateFilter, setActiveDateFilter] = useState('today');
    const [selectedStatus, setSelectedStatus] = useState('Trạng thái');
    const [selectedType, setSelectedType] = useState('Loại yêu cầu');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredRequests = mockRequests.filter((r) => {
        const statusMatch = selectedStatus === 'Trạng thái' || r.status === selectedStatus;
        const typeMatch = selectedType === 'Loại yêu cầu' || r.type === selectedType;
        const searchMatch = !searchQuery ||
            r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.email.toLowerCase().includes(searchQuery.toLowerCase());
        return statusMatch && typeMatch && searchMatch;
    });

    const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
    const paginatedRequests = filteredRequests.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const columns: Column<ReviewRequest>[] = [
        {
            key: 'stt',
            label: 'STT',
            render: (row) => <span className="font-semibold text-black">{row.stt}</span>,
        },
        {
            key: 'name',
            label: 'Người dùng',
            render: (row) => <span className="text-gray-700">{row.name}</span>,
        },
        {
            key: 'email',
            label: 'Email',
            render: (row) => <span className="text-gray-700">{row.email}</span>,
        },
        {
            key: 'type',
            label: 'Loại yêu cầu',
            render: (row) => <span className="text-gray-700">{row.type}</span>,
        },
        {
            key: 'date',
            label: 'Thời gian yêu cầu',
            align: 'center',
            render: (row) => <span className="text-gray-500 whitespace-nowrap">{row.date}</span>,
        },
        {
            key: 'status',
            label: 'Trạng thái',
            align: 'center',
            render: (row) => (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(row.status)}`}>
                    {row.status}
                </span>
            ),
        },
        {
            key: 'action',
            label: '',
            align: 'center',
            render: (row) => (
                <ViewButton href={`/admin/review/${row.stt}?status=${encodeURIComponent(row.status)}`} />
            ),
        },
    ];

    return (
        <div className="p-6 space-y-5">
            {/* Page Title */}
            <h1 className="text-xl font-bold text-black tracking-wide">KIỂM DUYỆT YÊU CẦU</h1>

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
                        placeholder="Tìm kiếm tên, email"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2.5 text-sm outline-none focus:border-green-500 transition-colors shadow-sm"
                    />
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                </div>

                {/* Loại yêu cầu dropdown */}
                <div className="relative">
                    <select
                        value={selectedType}
                        onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                        className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:border-green-button cursor-pointer"
                    >
                        {typeOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>

                {/* Trạng thái dropdown */}
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
                data={paginatedRequests}
                rowKey={(row) => row.stt}
                emptyMessage="Không có yêu cầu nào phù hợp với bộ lọc đã chọn."
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
