'use client';

import { useState } from 'react';
import AdminTable, { Column } from '@/components/Admin/AdminTable';
import Pagination from '@/components/Admin/Pagination';
import ViewButton from '@/components/Admin/ViewButton';

type Account = {
    id: string;
    name: string;
    email: string;
    type: string;
    date: string;
    status: string;
};

const initialAccounts: Account[] = [
    { id: 'B01', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Người dùng', date: '22/02/2024, 10:05 SA', status: 'Hoạt động' },
    { id: 'C02', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Nhà sáng tạo', date: '22/02/2024, 10:05 SA', status: 'Hoạt động' },
    { id: 'O03', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Cửa hàng', date: '22/02/2024, 10:05 SA', status: 'Hoạt động' },
    { id: 'B04', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Người dùng', date: '22/02/2024, 10:05 SA', status: 'Hoạt động' },
    { id: 'B05', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Người dùng', date: '22/02/2024, 10:05 SA', status: 'Khóa' },
    { id: 'O01', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Cửa hàng', date: '22/02/2024, 10:05 SA', status: 'Hoạt động' },
    { id: 'O02', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Cửa hàng', date: '22/02/2024, 10:05 SA', status: 'Hoạt động' },
    { id: 'O07', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Cửa hàng', date: '22/02/2024, 10:05 SA', status: 'Hoạt động' },
    { id: 'C08', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Nhà sáng tạo', date: '22/02/2024, 10:05 SA', status: 'Hoạt động' },
    { id: 'C09', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', type: 'Nhà sáng tạo', date: '22/02/2024, 10:05 SA', status: 'Hoạt động' },
];

const statusOptions = ['Trạng thái', 'Hoạt động', 'Khóa'];
const typeOptions = ['Loại tài khoản', 'Người dùng', 'Nhà sáng tạo', 'Cửa hàng'];

const lockReasons = [
    'Vi phạm nội dung / cộng đồng',
    'Hoạt động bất thường',
    'Gian lận / lừa đảo',
    'Vi phạm giao dịch / đơn hàng',
    'Lý do quản trị',
    'Khác',
];

const getTypeBadgeStyle = (type: string) => {
    switch (type) {
        case 'Người dùng': return 'text-green-600 border-green-500 bg-green-50';
        case 'Nhà sáng tạo': return 'text-orange-500 border-orange-400 bg-orange-50';
        case 'Cửa hàng': return 'text-blue-500 border-blue-400 bg-blue-50';
        default: return 'text-gray-600 border-gray-300 bg-gray-50';
    }
};

const getStatusBadgeStyle = (status: string) => {
    switch (status) {
        case 'Hoạt động': return 'text-green-600 border-green-500 bg-green-50';
        case 'Khóa': return 'text-red-500 border-red-400 bg-red-50';
        default: return 'text-gray-600 border-gray-300 bg-gray-50';
    }
};

const ITEMS_PER_PAGE = 10;

export default function AccountsPage() {
    const [accounts, setAccounts] = useState(initialAccounts);
    const [selectedStatus, setSelectedStatus] = useState('Trạng thái');
    const [selectedType, setSelectedType] = useState('Loại tài khoản');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Lock Modal State
    const [showLockModal, setShowLockModal] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState('');
    const [selectedReason, setSelectedReason] = useState('');

    const openLockModal = (id: string) => {
        setSelectedAccountId(id);
        setShowLockModal(true);
    };

    const handleConfirmLock = () => {
        if (selectedAccountId && selectedReason) {
            setAccounts(accounts.map((acc) =>
                acc.id === selectedAccountId ? { ...acc, status: 'Khóa' } : acc
            ));
            setShowLockModal(false);
            setSelectedAccountId('');
            setSelectedReason('');
        }
    };

    const filteredAccounts = accounts.filter((a) => {
        const statusMatch = selectedStatus === 'Trạng thái' || a.status === selectedStatus;
        const typeMatch = selectedType === 'Loại tài khoản' || a.type === selectedType;
        const searchMatch = !searchQuery ||
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.id.toLowerCase().includes(searchQuery.toLowerCase());
        return statusMatch && typeMatch && searchMatch;
    });

    const totalPages = Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE);
    const paginatedAccounts = filteredAccounts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const columns: Column<Account>[] = [
        {
            key: 'id',
            label: 'ID',
            render: (row) => <span className="font-semibold text-black">{row.id}</span>,
        },
        {
            key: 'name',
            label: 'Tên người dùng',
            render: (row) => <span className="text-gray-700">{row.name}</span>,
        },
        {
            key: 'email',
            label: 'Email',
            render: (row) => <span className="text-gray-700">{row.email}</span>,
        },
        {
            key: 'type',
            label: 'Loại tài khoản',
            align: 'center',
            render: (row) => (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getTypeBadgeStyle(row.type)}`}>
                    {row.type}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Trạng thái',
            align: 'center',
            render: (row) => (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeStyle(row.status)}`}>
                    {row.status === 'Khóa' ? 'Bị khóa' : row.status}
                </span>
            ),
        },
        {
            key: 'date',
            label: 'Ngày tạo',
            align: 'center',
            render: (row) => <span className="text-[#0088FF] font-medium whitespace-nowrap">{row.date}</span>,
        },
        {
            key: 'action',
            label: '',
            align: 'center',
            render: (row) => (
                <div className="flex items-center justify-center gap-2">
                    <ViewButton href={`/admin/accounts/${row.id}`} />
                    {row.status === 'Hoạt động' && (
                        <button
                            onClick={() => openLockModal(row.id)}
                            className="px-4 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors cursor-pointer"
                        >
                            Khóa
                        </button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 space-y-5">
            <h1 className="text-xl font-bold text-black tracking-wide">QUẢN LÝ TÀI KHOẢN</h1>

            {/* Filter Row - all on same line */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1" />

                {/* Tìm kiếm */}
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Tìm kiếm tên, email, ID"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2.5 text-sm outline-none focus:border-green-500 transition-colors shadow-sm"
                    />
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                </div>

                {/* Loại tài khoản dropdown */}
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
                data={paginatedAccounts}
                rowKey={(row, i) => `${row.id}-${i}`}
                emptyMessage="Không có tài khoản nào phù hợp."
            >
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </AdminTable>

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
                            <button onClick={() => { setShowLockModal(false); setSelectedReason(''); setSelectedAccountId(''); }} className="flex-1 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">Hủy</button>
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
    );
}
