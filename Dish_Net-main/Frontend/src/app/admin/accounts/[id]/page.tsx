'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { adminAccountApi, ChiTietTaiKhoan } from '@/shared/adminAccountApi';

const OTHER_LOCK_REASON = 'Khác';
const lockReasons = [
    'Vi phạm nội dung / cộng đồng',
    'Hoạt động bất thường',
    'Gian lận / lừa đảo',
    'Vi phạm giao dịch / đơn hàng',
    'Lý do quản trị',
    'Khác',
];

const loaiLabel: Record<string, string> = {
    nguoi_dung: 'Người dùng',
    nha_sang_tao: 'Nhà sáng tạo',
    chu_cua_hang: 'Cửa hàng',
};

function getErrorMessage(error: unknown, fallback: string) {
    return error instanceof Error ? error.message : fallback;
}

export default function AccountDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [account, setAccount] = useState<ChiTietTaiKhoan | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showLockModal, setShowLockModal] = useState(false);
    const [showUnlockModal, setShowUnlockModal] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');
    const [customReason, setCustomReason] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await adminAccountApi.layChiTiet(Number(id));
                setAccount(data);
            } catch (error: unknown) {
                setError(getErrorMessage(error, 'Không thể tải thông tin tài khoản'));
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const finalReason = selectedReason === OTHER_LOCK_REASON ? customReason.trim() : selectedReason;

    const handleConfirmLock = async () => {
        if (!account || !finalReason) return;
        setActionLoading(true);
        setActionError('');
        try {
            await adminAccountApi.khoaTaiKhoan(account.id, finalReason);
            setAccount({ ...account, trang_thai_tai_khoan: 'bi_khoa', ly_do_khoa_hien_tai: finalReason });
            setShowLockModal(false);
            setSelectedReason('');
            setCustomReason('');
        } catch (error: unknown) {
            setActionError(getErrorMessage(error, 'Không thể khóa tài khoản'));
        } finally {
            setActionLoading(false);
        }
    };

    const handleConfirmUnlock = async () => {
        if (!account) return;
        setActionLoading(true);
        setActionError('');
        try {
            await adminAccountApi.moKhoaTaiKhoan(account.id);
            setAccount({ ...account, trang_thai_tai_khoan: 'hoat_dong', ly_do_khoa_hien_tai: null });
            setShowUnlockModal(false);
        } catch (error: unknown) {
            setActionError(getErrorMessage(error, 'Không thể mở khóa tài khoản'));
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !account) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-600 font-medium">{error || 'Không tìm thấy tài khoản'}</p>
                    <Link href="/admin/accounts" className="text-sm text-blue-500 mt-2 inline-block hover:underline">← Quay lại danh sách</Link>
                </div>
            </div>
        );
    }

    const type = account.loai_tai_khoan;
    const isLocked = account.trang_thai_tai_khoan === 'bi_khoa';
    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const statusBadge = (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${!isLocked ? 'text-green-600 border-green-600 bg-green-50' : 'text-red-500 border-red-500 bg-red-50'}`}>
            {isLocked ? 'Bị khóa' : 'Hoạt động'}
        </span>
    );

    const typeBadge = (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${type === 'nguoi_dung' ? 'text-green-600 border-green-600 bg-green-50' :
            type === 'nha_sang_tao' ? 'text-orange-500 border-orange-500 bg-orange-50' :
                type === 'chu_cua_hang' ? 'text-blue-500 border-blue-500 bg-blue-50' :
                    'text-gray-600 border-gray-300 bg-gray-50'
            }`}>
            {loaiLabel[type] || type}
        </span>
    );

    const maskPhone = (phone: string | null) => {
        if (!phone) return '—';
        if (phone.length <= 5) return phone;
        return phone.slice(0, 3) + '*'.repeat(phone.length - 5) + phone.slice(-2);
    };

    return (
        <div className="min-h-full bg-gray-50 p-6 pb-20">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/admin/accounts" className="hover:opacity-70 transition-opacity">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </Link>
                    <h1 className="text-xl font-bold text-black">Chi tiết tài khoản</h1>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8 min-h-[60vh]">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">THÔNG TIN NGƯỜI DÙNG</h2>
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col md:flex-row gap-8 items-start relative shadow-sm">
                                <div className="flex gap-4 w-full md:w-1/2">
                                    <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 overflow-hidden">
                                        {account.anh_dai_dien ? (
                                            <img src={account.anh_dai_dien} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-orange-600 font-bold text-xs">{account.ten_hien_thi.slice(0, 2)}</span>
                                        )}
                                    </div>
                                    <div className="space-y-2 text-sm text-gray-700">
                                        <p><span className="w-32 inline-block">Tên người dùng</span>: <span className="font-semibold text-black">{account.ten_hien_thi}</span></p>
                                        <p><span className="w-32 inline-block">Sđt</span>: {maskPhone(account.so_dien_thoai)}</p>
                                        <p><span className="w-32 inline-block">Email</span>: {account.email}</p>
                                        <p><span className="w-32 inline-block">Địa chỉ</span>: {account.dia_chi || account.khu_vuc || '—'}</p>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-100 md:pl-8 pt-4 md:pt-0 space-y-2 text-sm text-gray-700">
                                    <p><span className="w-28 inline-block">ID tài khoản</span>: {account.id}</p>
                                    <p><span className="w-28 inline-block">Tên đăng nhập</span>: {account.ten_dang_nhap}</p>
                                    <p><span className="w-28 inline-block">Ngày đăng ký</span>: {formatDate(account.ngay_tao)}</p>
                                    <p><span className="w-28 inline-block">Đăng nhập cuối</span>: {formatDate(account.lan_dang_nhap_cuoi)}</p>
                                    <div className="flex items-center gap-2 pt-1">
                                        <span className="w-28 inline-block">Loại tài khoản</span>: {typeBadge} {statusBadge}
                                    </div>
                                    {isLocked && account.ly_do_khoa_hien_tai && (
                                        <p className="text-red-500"><span className="w-28 inline-block">Lý do khóa</span>: {account.ly_do_khoa_hien_tai}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">THÔNG TIN BỔ SUNG</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-green-50 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
                                        <span className="w-5 h-5 bg-green-500 rounded-full inline-block"></span> Điểm uy tín
                                    </p>
                                    <p className="text-3xl font-bold text-black">{Number(account.diem_uy_tin).toFixed(1)}</p>
                                </div>
                                <div className="bg-purple-50 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1">
                                        <span className="w-5 h-5 bg-purple-500 rounded-lg inline-block"></span> Nguồn đăng ký
                                    </p>
                                    <p className="text-lg font-bold text-black capitalize">{account.nguon_dang_ky}</p>
                                </div>
                                <div className="bg-orange-50 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs font-semibold text-orange-700 mb-2 flex items-center gap-1">
                                        <span className="w-5 h-5 bg-orange-500 rounded-full inline-block"></span> Email xác thực
                                    </p>
                                    <p className="text-lg font-bold text-black">{account.thoi_gian_xac_thuc_email ? '✓' : '✗'}</p>
                                </div>
                                <div className="bg-blue-50 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1">
                                        <span className="w-5 h-5 bg-blue-500 rounded-lg inline-block"></span> Giới tính
                                    </p>
                                    <p className="text-lg font-bold text-black">{account.gioi_tinh || '—'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center pt-8 border-t border-gray-100">
                        {!isLocked ? (
                            <button
                                onClick={() => setShowLockModal(true)}
                                className="px-8 py-3 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors shadow-sm cursor-pointer"
                            >
                                Khóa tài khoản
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowUnlockModal(true)}
                                className="px-8 py-3 rounded-xl bg-green-500 text-white text-sm font-bold hover:bg-green-600 transition-colors shadow-sm cursor-pointer"
                            >
                                Mở khóa tài khoản
                            </button>
                        )}
                    </div>
                </div>

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
                        {actionError && <p className="text-sm font-medium text-red-600">{actionError}</p>}
                        <div className="flex gap-3 pt-2">
                            <button onClick={() => { setShowLockModal(false); setSelectedReason(''); setCustomReason(''); setActionError(''); }} className="flex-1 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">Hủy</button>
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
                        <p className="text-sm text-gray-600">Bạn có chắc muốn mở khóa tài khoản <strong>{account.ten_hien_thi}</strong>? Người dùng sẽ có thể đăng nhập và sử dụng hệ thống bình thường.</p>
                        {actionError && <p className="text-sm font-medium text-red-600">{actionError}</p>}
                        <div className="flex gap-3 pt-2">
                            <button onClick={() => { setShowUnlockModal(false); setActionError(''); }} className="flex-1 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">Hủy</button>
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
        </div>
    );
}
