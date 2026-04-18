'use client';

import { useEffect, useState, useCallback } from 'react';
import AdminTable, { Column } from '@/components/Admin/AdminTable';
import Pagination from '@/components/Admin/Pagination';
import ViewButton from '@/components/Admin/ViewButton';
import { adminAccountApi, TaiKhoanItem } from '@/shared/adminAccountApi';
import { useToast } from '@/components/Admin/Toast';

const statusOptions = ['Trạng thái', 'Hoạt động', 'Bị khóa'];
const typeOptions = ['Loại tài khoản', 'Người dùng', 'Nhà sáng tạo', 'Cửa hàng'];
const OTHER_LOCK_REASON = 'Khác';

const lockReasons = [
    'Vi phạm nội dung / cộng đồng',
    'Hoạt động bất thường',
    'Gian lận / lừa đảo',
    'Vi phạm giao dịch / đơn hàng',
    'Lý do quản trị',
    'Khác',
];

const loaiMap: Record<string, string> = {
    'Người dùng': 'nguoi_dung',
    'Nhà sáng tạo': 'nha_sang_tao',
    'Cửa hàng': 'chu_cua_hang',
};

const loaiLabel: Record<string, string> = {
    nguoi_dung: 'Người dùng',
    nha_sang_tao: 'Nhà sáng tạo',
    chu_cua_hang: 'Cửa hàng',
};

function getErrorMessage(error: unknown, fallback: string) {
    return error instanceof Error ? error.message : fallback;
}

const getTypeBadgeStyle = (type: string) => {
    switch (type) {
        case 'nguoi_dung': return 'text-green-600 border-green-500 bg-green-50';
        case 'nha_sang_tao': return 'text-orange-500 border-orange-400 bg-orange-50';
        case 'chu_cua_hang': return 'text-blue-500 border-blue-400 bg-blue-50';
        default: return 'text-gray-600 border-gray-300 bg-gray-50';
    }
};

const getStatusBadgeStyle = (status: string) => {
    switch (status) {
        case 'hoat_dong': return 'text-green-600 border-green-500 bg-green-50';
        case 'bi_khoa': return 'text-red-500 border-red-400 bg-red-50';
        default: return 'text-gray-600 border-gray-300 bg-gray-50';
    }
};

const ITEMS_PER_PAGE = 10;

export default function AccountsPage() {
    const toast = useToast();
    const [accounts, setAccounts] = useState<TaiKhoanItem[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState('Trạng thái');
    const [selectedType, setSelectedType] = useState('Loại tài khoản');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const [showLockModal, setShowLockModal] = useState(false);
    const [showUnlockModal, setShowUnlockModal] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
    const [selectedReason, setSelectedReason] = useState('');
    const [customReason, setCustomReason] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    const fetchAccounts = useCallback(async () => {
        setLoading(true);
        try {
            const trangThaiParam = selectedStatus === 'Hoạt động' ? 'hoat_dong' : selectedStatus === 'Bị khóa' ? 'bi_khoa' : undefined;
            const loaiParam = loaiMap[selectedType] || undefined;

            const res = await adminAccountApi.layDanhSach({
                tim_kiem: searchQuery || undefined,
                loai_tai_khoan: loaiParam,
                trang_thai: trangThaiParam,
                trang: currentPage,
                so_luong: ITEMS_PER_PAGE,
            });
            const visibleAccounts = res.du_lieu.filter((item) => item.loai_tai_khoan !== 'admin');
            setAccounts(visibleAccounts);
            setTotalPages(res.tong_trang || 1);
        } catch {
            setAccounts([]);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, selectedStatus, selectedType, currentPage]);

    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);

    const finalReason = selectedReason === OTHER_LOCK_REASON ? customReason.trim() : selectedReason;

    const handleConfirmLock = async () => {
        if (!selectedAccountId || !finalReason) return;
        setActionLoading(true);
        try {
            await adminAccountApi.khoaTaiKhoan(selectedAccountId, finalReason);
            setShowLockModal(false);
            setSelectedAccountId(null);
            setSelectedReason('');
            setCustomReason('');
            toast.success('Đã khóa tài khoản thành công');
            await fetchAccounts();
        } catch (error: unknown) {
            toast.error(getErrorMessage(error, 'Không thể khóa tài khoản'));
        } finally {
            setActionLoading(false);
        }
    };

    const handleConfirmUnlock = async () => {
        if (!selectedAccountId) return;
        setActionLoading(true);
        try {
            await adminAccountApi.moKhoaTaiKhoan(selectedAccountId);
            setShowUnlockModal(false);
            setSelectedAccountId(null);
            toast.success('Đã mở khóa tài khoản thành công');
            await fetchAccounts();
        } catch (error: unknown) {
            toast.error(getErrorMessage(error, 'Không thể mở khóa tài khoản'));
        } finally {
            setActionLoading(false);
        }
    };

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const columns: Column<TaiKhoanItem>[] = [
        {
            key: 'id',
            label: 'ID',
            render: (row) => <span className="font-semibold text-black">{row.id}</span>,
        },
        {
            key: 'name',
            label: 'Tên người dùng',
            render: (row) => <span className="text-gray-700">{row.ten_hien_thi}</span>,
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
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getTypeBadgeStyle(row.loai_tai_khoan)}`}>
                    {loaiLabel[row.loai_tai_khoan] || row.loai_tai_khoan}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Trạng thái',
            align: 'center',
            render: (row) => (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeStyle(row.trang_thai)}`}>
                    {row.trang_thai === 'bi_khoa' ? 'Bị khóa' : row.trang_thai === 'hoat_dong' ? 'Hoạt động' : row.trang_thai}
                </span>
            ),
        },
        {
            key: 'date',
            label: 'Ngày tạo',
            align: 'center',
            render: (row) => <span className="text-[#0088FF] font-medium whitespace-nowrap">{formatDate(row.ngay_tao)}</span>,
        },
        {
            key: 'action',
            label: '',
            align: 'center',
            render: (row) => (
                <div className="flex items-center justify-center gap-2">
                    <ViewButton href={`/admin/accounts/${row.id}`} />
                    {row.loai_tai_khoan !== 'admin' && row.trang_thai === 'hoat_dong' && (
                        <button
                            onClick={() => {
                                setSelectedAccountId(row.id);
                                setSelectedReason('');
                                setCustomReason('');
                                setShowLockModal(true);
                            }}
                            className="px-4 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors cursor-pointer"
                        >
                            Khóa
                        </button>
                    )}
                    {row.loai_tai_khoan !== 'admin' && row.trang_thai === 'bi_khoa' && (
                        <button
                            onClick={() => {
                                setSelectedAccountId(row.id);
                                setShowUnlockModal(true);
                            }}
                            className="px-4 py-1.5 rounded-md bg-green-500 hover:bg-green-600 text-white text-xs font-medium transition-colors cursor-pointer"
                        >
                            Mở khóa
                        </button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 space-y-5">
            <h1 className="text-xl font-bold text-black tracking-wide">QUẢN LÝ TÀI KHOẢN</h1>

            <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1" />

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

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <AdminTable
                    columns={columns}
                    data={accounts}
                    rowKey={(row) => String(row.id)}
                    emptyMessage="Không có tài khoản nào phù hợp."
                >
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </AdminTable>
            )}

            {showLockModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5 mx-4">
                        <h3 className="text-lg font-bold text-black">Lý do khóa tài khoản</h3>
                        <div className="space-y-3">
                            {lockReasons.map((reason) => (
                                <label
                                    key={reason}
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedReason === reason ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <input type="radio" name="lockReason" value={reason} checked={selectedReason === reason} onChange={() => setSelectedReason(reason)} className="w-4 h-4 accent-red-600" />
                                    <span className="text-sm text-black">{reason}</span>
                                </label>
                            ))}
                            {selectedReason === OTHER_LOCK_REASON && (
                                <textarea
                                    value={customReason}
                                    onChange={(event) => setCustomReason(event.target.value)}
                                    placeholder="Nhập lý do khóa tài khoản"
                                    rows={3}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-red-400"
                                />
                            )}
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button onClick={() => { setShowLockModal(false); setSelectedReason(''); setCustomReason(''); setSelectedAccountId(null); }} className="flex-1 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">Hủy</button>
                            <button
                                onClick={handleConfirmLock}
                                className={`flex-1 px-5 py-3 rounded-xl text-sm font-bold text-white transition-colors cursor-pointer ${finalReason && !actionLoading ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'}`}
                                disabled={!finalReason || actionLoading}
                            >{actionLoading ? 'Đang xử lý...' : 'Khóa'}</button>
                        </div>
                    </div>
                </div>
            )}

            {showUnlockModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5 mx-4">
                        <h3 className="text-lg font-bold text-black">Xác nhận mở khóa tài khoản</h3>
                        <p className="text-sm text-gray-600">Bạn có chắc muốn mở khóa tài khoản này? Người dùng sẽ có thể đăng nhập và sử dụng hệ thống bình thường.</p>
                        <div className="flex gap-3 pt-2">
                            <button onClick={() => { setShowUnlockModal(false); setSelectedAccountId(null); }} className="flex-1 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">Hủy</button>
                            <button
                                onClick={handleConfirmUnlock}
                                className={`flex-1 px-5 py-3 rounded-xl text-sm font-bold text-white transition-colors cursor-pointer ${!actionLoading ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'}`}
                                disabled={actionLoading}
                            >{actionLoading ? 'Đang xử lý...' : 'Mở khóa'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
