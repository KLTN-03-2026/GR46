'use client';

import { useState } from 'react';
import AdminTable, { Column } from '@/components/Admin/AdminTable';
import Pagination from '@/components/Admin/Pagination';
import ViewButton from '@/components/Admin/ViewButton';

type AccountType = 'Người dùng' | 'Nhà sáng tạo' | 'Cửa hàng';
type SupportStatus = 'Đã phản hồi' | 'Chưa phản hồi';

interface SupportRequest {
    id: string;
    sender: string;
    accountType: AccountType;
    topic: string;
    status: SupportStatus;
    time: string;
    content: string;
    phone: string;
    response?: string;
}

const mockData: SupportRequest[] = [
    { id: 'SP001', sender: 'Nguyễn Văn A', accountType: 'Người dùng', topic: 'Thanh toán', status: 'Đã phản hồi', time: '22/02/2026', content: 'Đơn hàng của tôi chưa được giao', phone: '01235412561', response: 'Yêu cầu hoàn tiền của bạn đã được xử lý thành công.\nSố tiền 143.000đ sẽ được hoàn về ví trong vòng 24h.\n\nNếu sau thời gian trên bạn chưa nhận được tiền, vui lòng liên hệ lại.' },
    { id: 'SP002', sender: 'Nguyễn Văn A', accountType: 'Nhà sáng tạo', topic: 'Quên mật khẩu tài khoản', status: 'Chưa phản hồi', time: '22/02/2026', content: 'Tôi quên mật khẩu và không thể đăng nhập', phone: '01235412561' },
    { id: 'SP003', sender: 'Nguyễn Văn A', accountType: 'Cửa hàng', topic: 'Không hiển thị menu', status: 'Đã phản hồi', time: '22/02/2026', content: 'Menu quán tôi không hiển thị trên app', phone: '01235412561', response: 'Chúng tôi đã cập nhật lại hệ thống, menu của bạn đã hiển thị bình thường.' },
    { id: 'SP004', sender: 'Nguyễn Văn A', accountType: 'Người dùng', topic: 'Bị lỗi khi đăng video', status: 'Chưa phản hồi', time: '22/02/2026', content: 'App bị crash khi tôi tải video lên', phone: '01235412561' },
    { id: 'SP005', sender: 'Nguyễn Văn A', accountType: 'Người dùng', topic: 'Cần hỗ trợ đổi số điện thoại', status: 'Đã phản hồi', time: '22/02/2026', content: 'Tôi muốn đổi số điện thoại gắn với tài khoản', phone: '01235412561', response: 'Vui lòng cung cấp số CCCD để chúng tôi xác minh và hỗ trợ đổi số.' },
    { id: 'SP006', sender: 'Nguyễn Văn A', accountType: 'Người dùng', topic: 'Không nhận được mã freeship', status: 'Chưa phản hồi', time: '22/02/2026', content: 'Tôi là thành viên mới nhưng không thấy mã freeship', phone: '01235412561' },
    { id: 'SP007', sender: 'Nguyễn Văn A', accountType: 'Nhà sáng tạo', topic: 'Cần hỗ trợ đổi số điện thoại', status: 'Đã phản hồi', time: '22/02/2026', content: 'Tôi mất sim cần đổi số điện thoại cũ', phone: '01235412561', response: 'Khách hàng vui lòng gửi ảnh 2 mặt CCCD vào email hỗ trợ.' },
    { id: 'SP008', sender: 'Nguyễn Văn A', accountType: 'Cửa hàng', topic: 'Cần hỗ trợ đổi số điện thoại', status: 'Chưa phản hồi', time: '22/02/2026', content: 'Chủ cửa hàng muốn đổi số đt liên hệ', phone: '01235412561' },
    { id: 'SP009', sender: 'Nguyễn Văn A', accountType: 'Người dùng', topic: 'Không hiển thị menu', status: 'Chưa phản hồi', time: '22/02/2026', content: 'Tôi vào quán nhưng không thấy mục đồ uống', phone: '01235412561' },
    { id: 'SP0010', sender: 'Nguyễn Văn A', accountType: 'Người dùng', topic: 'Cần hỗ trợ đổi số điện thoại', status: 'Đã phản hồi', time: '22/02/2026', content: 'Tôi muốn cập nhật số đt mới', phone: '01235412561', response: 'Đã cập nhật số điện thoại thành công.' },
];

const ITEMS_PER_PAGE = 10;
const accountTypeOptions = ['Tất cả', 'Người dùng', 'Nhà sáng tạo', 'Cửa hàng'];
const statusOptions = ['Tất cả', 'Đã phản hồi', 'Chưa phản hồi'];

const getAccountTypeBadge = (type: AccountType) => {
    switch (type) {
        case 'Người dùng': return 'bg-green-100 text-green-700 border border-green-300';
        case 'Nhà sáng tạo': return 'bg-orange-100 text-orange-600 border border-orange-300';
        case 'Cửa hàng': return 'bg-blue-100 text-blue-600 border border-blue-300';
        default: return 'bg-gray-100 text-gray-500';
    }
};

const getStatusBadge = (status: SupportStatus) => {
    return status === 'Đã phản hồi'
        ? 'bg-green-100 text-green-700 border border-green-300'
        : 'bg-orange-100 text-orange-600 border border-orange-300';
};

export default function SupportPage() {
    const [requests, setRequests] = useState<SupportRequest[]>(mockData);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('Tất cả');
    const [selectedStatus, setSelectedStatus] = useState('Tất cả');
    const [currentPage, setCurrentPage] = useState(1);

    const [viewingRequest, setViewingRequest] = useState<SupportRequest | null>(null);
    const [responseText, setResponseText] = useState('');

    const filteredRequests = requests.filter((req) => {
        const typeMatch = selectedType === 'Tất cả' || req.accountType === selectedType;
        const statusMatch = selectedStatus === 'Tất cả' || req.status === selectedStatus;
        const searchMatch = !searchQuery ||
            req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.topic.toLowerCase().includes(searchQuery.toLowerCase());
        return typeMatch && statusMatch && searchMatch;
    });

    const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
    const paginatedRequests = filteredRequests.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const openModal = (req: SupportRequest) => {
        setViewingRequest(req);
        setResponseText(req.response || '');
    };

    const closeModal = () => {
        setViewingRequest(null);
        setResponseText('');
    };

    const handleSendResponse = () => {
        if (!viewingRequest || !responseText.trim()) return;
        setRequests(requests.map((r) =>
            r.id === viewingRequest.id ? { ...r, status: 'Đã phản hồi', response: responseText } : r
        ));
        closeModal();
    };

    const columns: Column<SupportRequest>[] = [
        {
            key: 'id',
            label: 'Mã yêu cầu',
            className: 'font-medium text-gray-900 w-28',
        },
        {
            key: 'sender',
            label: 'Người gửi',
        },
        {
            key: 'accountType',
            label: 'Loại tài khoản',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAccountTypeBadge(row.accountType)}`}>
                    {row.accountType}
                </span>
            ),
        },
        {
            key: 'topic',
            label: 'Chủ đề',
        },
        {
            key: 'status',
            label: 'Trạng thái',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(row.status)}`}>
                    {row.status}
                </span>
            ),
        },
        {
            key: 'time',
            label: 'Thời gian',
            render: (row) => (
                <span className="text-blue-500 font-medium">{row.time}</span>
            ),
        },
        {
            key: 'actions',
            label: '',
            align: 'center',
            render: (row) =>
                row.status === 'Đã phản hồi' ? (
                    /* Dùng ViewButton component — luôn green, đồng bộ với các page khác */
                    <ViewButton onClick={() => openModal(row)} label="Xem" />
                ) : (
                    <button
                        onClick={() => openModal(row)}
                        className="px-4 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                        Phản hồi
                    </button>
                ),
        },
    ];

    return (
        <div className="p-6 space-y-5">
            {/* Header */}
            <h1 className="text-xl font-bold text-black tracking-wide">QUẢN LÝ YÊU CẦU HỖ TRỢ</h1>

            {/* Filter Row — search trái, dropdowns phải */}
            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder="Tìm kiếm tên mã, code khuyến mãi"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full bg-white border border-gray-200 rounded-2xl pl-4 pr-10 py-2.5 text-sm outline-none focus:border-green-500 transition-colors shadow-sm"
                    />
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                </div>

                <div className="ml-auto flex gap-3">
                    {/* Loại tài khoản */}
                    <div className="relative">
                        <select
                            value={selectedType}
                            onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none cursor-pointer min-w-[140px]"
                        >
                            {accountTypeOptions.map((s) => (
                                <option key={s} value={s}>{s === 'Tất cả' ? 'Loại tài khoản' : s}</option>
                            ))}
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>

                    {/* Trạng thái */}
                    <div className="relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none cursor-pointer min-w-[120px]"
                        >
                            {statusOptions.map((s) => (
                                <option key={s} value={s}>{s === 'Tất cả' ? 'Trạng thái' : s}</option>
                            ))}
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                </div>
            </div>

            {/* Table */}
            <AdminTable columns={columns} data={paginatedRequests} rowKey={(row) => row.id}>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </AdminTable>

            {/* Modal */}
            {viewingRequest && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 relative">
                        {/* Modal Header */}
                        <div className="px-7 pt-6 pb-0">
                            <div className="flex items-start justify-between mb-1">
                                <h3 className="text-lg font-bold text-black">
                                    {viewingRequest.status === 'Chưa phản hồi' ? 'Phản hồi' : 'Thông tin phản hồi'}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer mt-0.5"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 6 6 18" /><path d="M6 6 18 18" />
                                    </svg>
                                </button>
                            </div>
                            {/* Date dưới title, canh phải */}
                            <p className="text-right text-xs text-gray-400 mb-4">24 - 02 -2026</p>
                        </div>

                        {/* Modal Body */}
                        <div className="px-7 pb-6 space-y-4">
                            {/* Row 1: Thông tin yêu cầu + Trạng thái */}
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-1.5">Thông tin yêu cầu</label>
                                    <input
                                        value={viewingRequest.topic}
                                        readOnly
                                        className="w-full bg-gray-100 border border-gray-200 text-gray-600 rounded-xl px-4 py-2.5 text-sm outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-1.5">Trạng thái</label>
                                    <span className={`px-4 py-2 rounded-lg text-xs font-semibold inline-block ${getStatusBadge(viewingRequest.status)}`}>
                                        {viewingRequest.status}
                                    </span>
                                </div>
                            </div>

                            {/* Nội dung chi tiết */}
                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="text-sm font-semibold text-black">Nội dung chi tiết</label>
                                    <span className="text-xs text-gray-400">{viewingRequest.content.length}/1000</span>
                                </div>
                                <textarea
                                    value={viewingRequest.content}
                                    readOnly
                                    rows={2}
                                    className="w-full bg-gray-100 border border-gray-200 text-gray-600 rounded-xl px-4 py-3 text-sm outline-none resize-none"
                                />
                            </div>

                            {/* Tệp đính kèm + Thông tin liên hệ */}
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-1.5">Tệp đính kèm</label>
                                    <div className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 flex items-center gap-2 cursor-pointer shadow-sm">
                                        {/* Image icon giống thiết kế */}
                                        <div className="w-6 h-6 rounded flex items-center justify-center shrink-0 bg-gradient-to-tr from-teal-400 to-teal-500">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-400">Chọn tệp</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-1.5">Thông tin liên hệ</label>
                                    <input
                                        value={viewingRequest.phone}
                                        readOnly
                                        className="w-full bg-gray-100 border border-gray-200 text-gray-600 rounded-xl px-4 py-2.5 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            {/* Kết quả xử lý */}
                            <div>
                                <label className="block text-sm font-semibold text-black mb-1.5">Kết quả xử lý</label>
                                {viewingRequest.status === 'Chưa phản hồi' ? (
                                    <textarea
                                        value={responseText}
                                        onChange={(e) => setResponseText(e.target.value)}
                                        rows={4}
                                        placeholder="Nhập nội dung phản hồi..."
                                        className="w-full bg-white border border-gray-200 focus:border-green-500 text-gray-700 rounded-xl px-4 py-3 text-sm outline-none resize-none shadow-sm placeholder:text-gray-300"
                                    />
                                ) : (
                                    <textarea
                                        value={viewingRequest.response || ''}
                                        readOnly
                                        rows={4}
                                        className="w-full bg-gray-100 border border-gray-200 text-gray-600 rounded-xl px-4 py-3 text-sm outline-none resize-none"
                                    />
                                )}
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-center pt-1">
                                {viewingRequest.status === 'Chưa phản hồi' ? (
                                    <button
                                        onClick={handleSendResponse}
                                        disabled={!responseText.trim()}
                                        className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors cursor-pointer"
                                    >
                                        Gửi phản hồi
                                    </button>
                                ) : (
                                    <button
                                        onClick={closeModal}
                                        className="w-full py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-colors cursor-pointer"
                                    >
                                        Quay lại
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
