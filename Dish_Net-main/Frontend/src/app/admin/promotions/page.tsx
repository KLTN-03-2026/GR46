'use client';

import { useState } from 'react';
import Pagination from '@/components/Admin/Pagination';

type Promotion = {
    id: number;
    name: string;
    code: string;
    type: 'percent' | 'amount' | 'freeship';
    value: number;
    description: string;
    usedCount: number;
    totalCount: number;
    startDate: string;
    endDate: string;
    status: 'Đang diễn ra' | 'Sắp diễn ra' | 'Đã kết thúc' | 'Tạm dừng';
    minOrder: string;
};

const mockPromotions: Promotion[] = [
    { id: 1, name: 'Giảm 20%', code: 'FOOD20', type: 'percent', value: 20, description: 'Áp dụng đơn từ 5k', usedCount: 315, totalCount: 1000, startDate: '01/03', endDate: '10/03/2026', status: 'Đang diễn ra', minOrder: '5k' },
    { id: 2, name: 'Freeship Toàn Sàn', code: 'SHIP0', type: 'freeship', value: 0, description: 'Giảm chi phí vận chuyển: 100k', usedCount: 0, totalCount: 0, startDate: '10/31', endDate: '10/03/2026', status: 'Sắp diễn ra', minOrder: '25k' },
    { id: 3, name: 'Ưu đãi khách hàng mới', code: 'HELLO50K', type: 'amount', value: 50000, description: 'Thành toán đơn: 100k', usedCount: 97, totalCount: 100, startDate: '02/3', endDate: '10/9/2026', status: 'Đang diễn ra', minOrder: '100k' },
    { id: 4, name: 'Giảm 25k Trà sữa House', code: 'MILK25', type: 'amount', value: 25000, description: 'Áp dụng đơn từ 9m 30k', usedCount: 691, totalCount: 1000, startDate: '02/5', endDate: '10/03/2026', status: 'Đang diễn ra', minOrder: '30k' },
    { id: 5, name: 'Giảm 15k Gà Rán VietChic', code: 'CHU15K', type: 'amount', value: 15000, description: 'Áp dụng đơn từ bfon 60k', usedCount: 199, totalCount: 500, startDate: '11/03', endDate: '20/03/2026', status: 'Đang diễn ra', minOrder: '60k' },
    { id: 6, name: 'Flash Sale 11k', code: 'HOT50', type: 'amount', value: 11000, description: 'Đơn chip trop + en to 10k', usedCount: 0, totalCount: 0, startDate: '05/05.', endDate: '06/03/2026', status: 'Sắp diễn ra', minOrder: '10k' },
    { id: 7, name: 'Flash Sale 11k', code: 'HOT50', type: 'amount', value: 11000, description: 'Đơn dùng tôn đo 30k', usedCount: 0, totalCount: 200, startDate: '02/13', endDate: '10/03/2026', status: 'Đang diễn ra', minOrder: '30k' },
    { id: 8, name: 'Giảm 50% món hot', code: 'HOT50', type: 'percent', value: 50, description: 'Áp dụng đơn từ 5kr 30k', usedCount: 996, totalCount: 200, startDate: '05/3', endDate: '10/63/2026', status: 'Đã kết thúc', minOrder: '30k' },
    { id: 9, name: 'Giảm tối đa 50k', code: 'GOGIHOT', type: 'amount', value: 50000, description: 'Giảm tùy đơn máx: 50k', usedCount: 50, totalCount: 500, startDate: '03/3', endDate: '06/08/2026', status: 'Đang diễn ra', minOrder: '50k' },
];

const statusOptions = ['Tất cả', 'Đang diễn ra', 'Sắp diễn ra', 'Đã kết thúc', 'Tạm dừng'];
const typeOptions = ['Tất cả', 'Giảm theo %', 'Giảm số tiền', 'Miễn phí vận chuyển'];
const sortOptions = ['Mới nhất', 'Sắp hết hạn', 'Hiệu quả cao nhất', 'Giảm giá cao nhất'];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Đang diễn ra': return { bg: 'bg-green-50', border: 'border-green-200', title: 'text-green-700', topBg: 'bg-green-100' };
        case 'Sắp diễn ra': return { bg: 'bg-white', border: 'border-gray-200', title: 'text-gray-800', topBg: 'bg-gray-50' };
        case 'Đã kết thúc': return { bg: 'bg-red-50', border: 'border-red-200', title: 'text-red-600', topBg: 'bg-red-100' };
        case 'Tạm dừng': return { bg: 'bg-orange-50', border: 'border-orange-200', title: 'text-orange-600', topBg: 'bg-orange-100' };
        default: return { bg: 'bg-white', border: 'border-gray-200', title: 'text-gray-800', topBg: 'bg-gray-50' };
    }
};

const ITEMS_PER_PAGE = 9;

const emptyForm = {
    name: '', code: '', status: 'Sắp diễn ra' as Promotion['status'], type: 'percent' as Promotion['type'],
    value: 0, minOrder: '', totalCount: 0, startDate: '', endDate: '',
};

export default function PromotionsPage() {
    const [promotions, setPromotions] = useState(mockPromotions);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('Tất cả');
    const [selectedType, setSelectedType] = useState('Tất cả');
    const [sortBy, setSortBy] = useState('Mới nhất');
    const [currentPage, setCurrentPage] = useState(1);

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
    const [deletingPromo, setDeletingPromo] = useState<Promotion | null>(null);
    const [formData, setFormData] = useState(emptyForm);

    const filteredPromotions = promotions.filter((p) => {
        const statusMatch = selectedStatus === 'Tất cả' || p.status === selectedStatus;
        const typeMatch = selectedType === 'Tất cả' ||
            (selectedType === 'Giảm theo %' && p.type === 'percent') ||
            (selectedType === 'Giảm số tiền' && p.type === 'amount') ||
            (selectedType === 'Miễn phí vận chuyển' && p.type === 'freeship');
        const searchMatch = !searchQuery ||
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.code.toLowerCase().includes(searchQuery.toLowerCase());
        return statusMatch && typeMatch && searchMatch;
    });

    const totalPages = Math.ceil(filteredPromotions.length / ITEMS_PER_PAGE);
    const paginatedPromotions = filteredPromotions.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const openAdd = () => {
        setFormData(emptyForm);
        setShowAddModal(true);
    };

    const openEdit = (promo: Promotion) => {
        setEditingPromo(promo);
        setFormData({
            name: promo.name, code: promo.code, status: promo.status, type: promo.type,
            value: promo.value, minOrder: promo.minOrder, totalCount: promo.totalCount,
            startDate: promo.startDate, endDate: promo.endDate,
        });
        setShowEditModal(true);
    };

    const openDelete = (promo: Promotion) => {
        setDeletingPromo(promo);
        setShowDeleteModal(true);
    };

    const handleAdd = () => {
        setPromotions((current) => {
            const nextId = current.reduce((maxId, promo) => Math.max(maxId, promo.id), 0) + 1;
            const newPromo: Promotion = {
                id: nextId, name: formData.name, code: formData.code, status: formData.status,
                type: formData.type, value: formData.value, description: `Áp dụng đơn từ ${formData.minOrder}`,
                usedCount: 0, totalCount: formData.totalCount, startDate: formData.startDate,
                endDate: formData.endDate, minOrder: formData.minOrder,
            };
            return [newPromo, ...current];
        });
        setShowAddModal(false);
        setFormData(emptyForm);
    };

    const handleEdit = () => {
        if (!editingPromo) return;
        setPromotions(promotions.map((p) => p.id === editingPromo.id ? {
            ...p, name: formData.name, code: formData.code, status: formData.status,
            type: formData.type, value: formData.value, minOrder: formData.minOrder,
            totalCount: formData.totalCount, startDate: formData.startDate, endDate: formData.endDate,
            description: `Áp dụng đơn từ ${formData.minOrder}`,
        } : p));
        setShowEditModal(false);
        setEditingPromo(null);
    };

    const handleDelete = () => {
        if (!deletingPromo) return;
        setPromotions(promotions.filter((p) => p.id !== deletingPromo.id));
        setShowDeleteModal(false);
        setDeletingPromo(null);
    };

    const togglePause = (id: number) => {
        setPromotions(promotions.map((p) => p.id === id ? {
            ...p, status: p.status === 'Tạm dừng' ? 'Đang diễn ra' : 'Tạm dừng' as Promotion['status']
        } : p));
    };

    // Reusable form modal content
    const renderFormModal = (title: string, submitLabel: string, onSubmit: () => void, onClose: () => void) => (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 mx-4 space-y-6 relative">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black">{title}</h3>
                    <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="M6 6 18 18" /></svg>
                    </button>
                </div>

                <div className="border border-gray-200 rounded-xl p-6 space-y-5">
                    {/* Row 1 - Name & Code */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Tên chương trình</label>
                            <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Tên chương trình" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Mã khuyến mãi</label>
                            <input value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                placeholder="Mã code" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500 bg-gray-50" />
                        </div>
                    </div>

                    {/* Trạng thái */}
                    <div>
                        <label className="text-sm font-bold text-black mb-2 block">Trạng thái</label>
                        <div className="flex flex-wrap gap-5">
                            {(['Sắp diễn ra', 'Đang diễn ra', 'Tạm Dừng', 'Đã kết thúc'] as const).map((s) => (
                                <label key={s} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                    <input type="radio" name="formStatus" checked={formData.status === (s === 'Tạm Dừng' ? 'Tạm dừng' : s)}
                                        onChange={() => setFormData({ ...formData, status: (s === 'Tạm Dừng' ? 'Tạm dừng' : s) as Promotion['status'] })}
                                        className="w-4 h-4 accent-green-600" />
                                    {s}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Loại khuyến mãi */}
                    <div>
                        <label className="text-sm font-bold text-black mb-2 block">Loại khuyến mãi</label>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer w-40 shrink-0">
                                    <input type="radio" name="formType" checked={formData.type === 'percent'}
                                        onChange={() => setFormData({ ...formData, type: 'percent' })} className="w-4 h-4 accent-green-600" />
                                    Giảm theo %
                                </label>
                                <div className="flex-1 relative">
                                    <input type="number" value={formData.type === 'percent' ? formData.value || '' : ''}
                                        onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                                        disabled={formData.type !== 'percent'}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-300" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">%</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer w-40 shrink-0">
                                    <input type="radio" name="formType" checked={formData.type === 'amount'}
                                        onChange={() => setFormData({ ...formData, type: 'amount' })} className="w-4 h-4 accent-green-600" />
                                    Giảm theo số tiền
                                </label>
                                <input type="number" value={formData.type === 'amount' ? formData.value || '' : ''}
                                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                                    disabled={formData.type !== 'amount'}
                                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-300" />
                            </div>
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                <input type="radio" name="formType" checked={formData.type === 'freeship'}
                                    onChange={() => setFormData({ ...formData, type: 'freeship', value: 0 })} className="w-4 h-4 accent-green-600" />
                                FreeShip
                            </label>
                        </div>
                    </div>

                    {/* Điều kiện áp dụng */}
                    <div>
                        <label className="text-sm font-bold text-black mb-2 block">Điều kiện áp dụng</label>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 w-40 shrink-0">Đơn tối thiểu</span>
                                <div className="flex-1 relative">
                                    <input value={formData.minOrder} onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">Đ</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 w-40 shrink-0">Số lượt sử dụng</span>
                                <input type="number" value={formData.totalCount || ''} onChange={(e) => setFormData({ ...formData, totalCount: Number(e.target.value) })}
                                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500" />
                            </div>
                        </div>
                    </div>

                    {/* Thời gian */}
                    <div>
                        <label className="text-sm font-bold text-black mb-2 block">Thời gian</label>
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Ngày bắt đầu :</span>
                                <input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500 cursor-pointer" />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Ngày kết thúc :</span>
                                <input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 pt-2">
                    <button onClick={onClose}
                        className="px-8 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer min-w-[120px]">
                        Hủy
                    </button>
                    <button onClick={onSubmit}
                        className="px-8 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-bold transition-colors cursor-pointer min-w-[120px]">
                        {submitLabel}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-black tracking-wide">QUẢN LÝ KHUYẾN MÃI</h1>
                <button onClick={openAdd}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-bold transition-colors shadow-sm cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
                    Thêm khuyến mãi
                </button>
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 min-w-[250px] max-w-md">
                    <input type="text" placeholder="Tìm kiếm tên mã, code khuyến mãi" value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2.5 text-sm outline-none focus:border-green-500 transition-colors shadow-sm" />
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                </div>

                {/* Status dropdown */}
                <div className="relative">
                    <select value={selectedStatus} onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                        className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:border-green-button cursor-pointer">
                        {statusOptions.map((s) => <option key={s} value={s}>{s === 'Tất cả' ? 'Trạng thái mã' : s}</option>)}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>

                {/* Type dropdown */}
                <div className="relative">
                    <select value={selectedType} onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                        className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:border-green-button cursor-pointer">
                        {typeOptions.map((s) => <option key={s} value={s}>{s === 'Tất cả' ? 'Loại khuyến mãi' : s}</option>)}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>

                {/* Sort dropdown */}
                <div className="relative">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:border-green-button cursor-pointer">
                        {sortOptions.map((s) => <option key={s} value={s}>{s === 'Mới nhất' ? 'Sắp xếp' : s}</option>)}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
            </div>

            {/* Promotion Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginatedPromotions.length > 0 ? paginatedPromotions.map((promo) => {
                    const color = getStatusColor(promo.status);
                    return (
                        <div key={promo.id} className={`rounded-2xl border ${color.border} ${color.bg} overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
                            {/* Top colored strip with name */}
                            <div className={`px-5 py-3 ${color.topBg}`}>
                                <div className="flex items-center justify-between">
                                    <h3 className={`text-base font-bold ${color.title}`}>
                                        {promo.status === 'Đang diễn ra' || promo.status === 'Đã kết thúc' ? '⚡ ' : ''}{promo.name}
                                    </h3>
                                    {promo.status === 'Sắp diễn ra' && (
                                        <span className="text-xs text-orange-500 font-medium flex items-center gap-1">
                                            ⏰ Sắp tới
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="px-5 py-4 space-y-2">
                                <p className="text-sm font-semibold text-black flex items-center gap-1.5">
                                    <span className="w-4 h-4 rounded bg-gray-200 inline-flex items-center justify-center text-[8px]">🎫</span>
                                    {promo.code}
                                </p>
                                <p className="text-xs text-gray-500">{promo.description}</p>
                                {promo.totalCount > 0 && (
                                    <p className="text-xs text-gray-500">Đã dùng : {promo.usedCount} / {promo.totalCount}</p>
                                )}
                                <p className="text-xs text-gray-500">Thời gian: {promo.startDate} - {promo.endDate}</p>
                            </div>

                            {/* Footer Buttons */}
                            <div className="px-5 py-3 flex items-center gap-2 border-t border-gray-100/60">
                                {promo.status !== 'Đã kết thúc' ? (
                                    <>
                                        <button onClick={() => openEdit(promo)}
                                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                                            Sửa
                                        </button>
                                        <button onClick={() => togglePause(promo.id)}
                                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                                            {promo.status === 'Tạm dừng' ? 'Tiếp tục' : 'Tạm dừng'}
                                        </button>
                                        <div className="flex-1" />
                                        <button onClick={() => openDelete(promo)}
                                            className="px-4 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-medium transition-colors cursor-pointer">
                                            Xóa
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span className="px-3 py-1.5 rounded-lg bg-gray-100 text-xs font-medium text-gray-500">Đã kết thúc</span>
                                        <div className="flex-1" />
                                        <button onClick={() => openDelete(promo)}
                                            className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors cursor-pointer">
                                            Xóa
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                }) : (
                    <div className="col-span-full py-20 text-center text-gray-400 text-sm">
                        Không có khuyến mãi nào phù hợp với bộ lọc đã chọn.
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>

            {/* Add Modal */}
            {showAddModal && renderFormModal('Thêm mã khuyến mãi', 'Thêm', handleAdd, () => setShowAddModal(false))}

            {/* Edit Modal */}
            {showEditModal && renderFormModal('Sửa thông tin khuyến mãi', 'Lưu thay đổi', handleEdit, () => { setShowEditModal(false); setEditingPromo(null); })}

            {/* Delete Modal */}
            {showDeleteModal && deletingPromo && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 mx-4 space-y-5 relative">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-black">Xóa khuyến mãi</h3>
                            <button onClick={() => { setShowDeleteModal(false); setDeletingPromo(null); }}
                                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="M6 6 18 18" /></svg>
                            </button>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-5 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                                    <span className="text-lg">🎫</span>
                                </div>
                                <div>
                                    <p className="font-bold text-black">{deletingPromo.name}</p>
                                    <p className="text-sm text-gray-500">Mã : {deletingPromo.code}</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500 space-y-1 pt-2">
                                <div className="flex justify-between">
                                    <span>Áp dụng cho đơn từ {deletingPromo.minOrder}</span>
                                    <span>Thời gian bắt đầu : {deletingPromo.startDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Đã dùng : {deletingPromo.usedCount}/{deletingPromo.totalCount}</span>
                                    <span>Thời gian kết thúc : {deletingPromo.endDate}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 pt-2">
                            <button onClick={() => { setShowDeleteModal(false); setDeletingPromo(null); }}
                                className="px-8 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer min-w-[120px]">
                                Hủy
                            </button>
                            <button onClick={handleDelete}
                                className="px-8 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors cursor-pointer min-w-[120px]">
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
