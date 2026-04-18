'use client';
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from 'react';
import OrderDetailView from './OrderDetailView';
import type { OrderDetailData } from './OrderDetailView';

/* ═══════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════ */
const MOCK_STORE = {
    name: 'Nét Huế - Hàng Bông',
    categories: 'Nhà Hàng · Món Huế · Gia đình, Hội nhóm',
    avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop',
    rating: 4.8,
    address: '198 Hàng Bông, P. Hàng Bông, Q. Quận Hoàn Kiếm, Hà Nội',
    hours: '07:00 - 22:00',
    todayRevenue: '1Tr',
    todayOrders: 50,
    todayCancelled: 10,
};

const ORDER_STATS = {
    completed: 75.3,
    cancelled: 5.9,
    returned: 15.9,
    refund: 2,
};

const TOP_ITEMS = [
    { rank: 1, name: 'Bún bò huế số 1', sold: 200, image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=80&h=80&fit=crop' },
    { rank: 2, name: 'Bún bò huế số 2', sold: 150, image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=80&h=80&fit=crop' },
];

type OrderStatus = 'Đã giao' | 'Đã hủy' | 'Trả hàng' | 'Đang giao hàng';

interface OrderRow {
    id: string;
    code: string;
    customer: string;
    customerPhone: string;
    value: string;
    discount: string;
    discountPercent: string;
    fee: string;
    date: string;
    deliveryDate: string;
    status: OrderStatus;
    income: string;
    items: { name: string; qty: number; price: string; image: string }[];
    subtotal: string;
    shippingFee: string;
    discountAmount: string;
    totalValue: string;
    netIncome: string;
    timeline: { label: string; time: string; done: boolean }[];
    review?: { rating: number; date: string; text: string };
}

const ORDER_STATUS_FILTER = ['Tất cả', 'Đã giao', 'Đã hủy', 'Trả hàng', 'Đang giao hàng'] as const;
const TIME_FILTER = ['Mới đây nhất', 'Cũ nhất'] as const;

const MOCK_ORDERS: OrderRow[] = [
    {
        id: '1', code: 'QA001', customer: 'Nguyễn Văn A', customerPhone: '012*****02',
        value: '120.000đ', discount: '-20.000đ', discountPercent: '-15%', fee: '',
        date: '22/02/2026 05:00 CH', deliveryDate: '22/02/2026 05:30 CH',
        status: 'Đã giao', income: '85.000đ',
        items: [
            { name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=60&h=60&fit=crop' },
            { name: 'Bún bò Huế số 2', qty: 1, price: '56.000đ', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=60&h=60&fit=crop' },
        ],
        subtotal: '112.000đ', shippingFee: '31.000đ', discountAmount: '0đ', totalValue: '143.000đ', netIncome: '100.000đ',
        timeline: [
            { label: 'Đã đặt hàng', time: '10:02 SA', done: true },
            { label: 'Đã xác nhận đơn hàng', time: '10:03 SA', done: true },
            { label: 'Đang chuẩn bị đơn hàng', time: '10:04 SA', done: true },
            { label: 'Đang giao', time: '10:30 SA', done: true },
            { label: 'Hoàn thành', time: '10:45 SA', done: true },
        ],
        review: { rating: 5, date: '22/02/2026 07:00 CH', text: 'Nước dùng ngon, đậm vị, nhất định sẽ mua lại' },
    },
    {
        id: '2', code: 'QA002', customer: 'Nguyễn B', customerPhone: '098*****15',
        value: '150.000đ', discount: '-10.000đ', discountPercent: '-15%', fee: '',
        date: '22/02/2026 05:00 CH', deliveryDate: '',
        status: 'Đã hủy', income: '0đ',
        items: [{ name: 'Bún bò Huế số 1', qty: 2, price: '56.000đ', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=60&h=60&fit=crop' }],
        subtotal: '112.000đ', shippingFee: '20.000đ', discountAmount: '-10.000đ', totalValue: '122.000đ', netIncome: '0đ',
        timeline: [
            { label: 'Đã đặt hàng', time: '10:02 SA', done: true },
            { label: 'Đã xác nhận đơn hàng', time: '10:03 SA', done: true },
            { label: 'Đã hủy', time: '10:05 SA', done: true },
        ],
    },
    {
        id: '3', code: 'QA003', customer: 'Nguyễn C', customerPhone: '091*****88',
        value: '220.000đ', discount: '-5.000đ', discountPercent: '-15%', fee: '',
        date: '22/02/2026 05:00 CH', deliveryDate: '',
        status: 'Trả hàng', income: '0đ',
        items: [{ name: 'Bún bò Huế số 2', qty: 3, price: '56.000đ', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=60&h=60&fit=crop' }],
        subtotal: '168.000đ', shippingFee: '25.000đ', discountAmount: '-5.000đ', totalValue: '188.000đ', netIncome: '0đ',
        timeline: [
            { label: 'Đã đặt hàng', time: '10:02 SA', done: true },
            { label: 'Đã xác nhận đơn hàng', time: '10:03 SA', done: true },
            { label: 'Đang giao', time: '10:30 SA', done: true },
            { label: 'Trả hàng', time: '11:00 SA', done: true },
        ],
    },
    {
        id: '4', code: 'QA004', customer: 'Nguyễn D', customerPhone: '070*****99',
        value: '520.000đ', discount: '-50.000đ', discountPercent: '-15%', fee: '',
        date: '22/02/2026 05:00 CH', deliveryDate: '',
        status: 'Đang giao hàng', income: 'Tạm tính: 399.500đ',
        items: [
            { name: 'Bún bò Huế số 1', qty: 3, price: '56.000đ', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=60&h=60&fit=crop' },
            { name: 'Bún bò Huế số 2', qty: 2, price: '56.000đ', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=60&h=60&fit=crop' },
        ],
        subtotal: '280.000đ', shippingFee: '35.000đ', discountAmount: '-50.000đ', totalValue: '265.000đ', netIncome: 'Tạm tính: 399.500đ',
        timeline: [
            { label: 'Đã đặt hàng', time: '10:02 SA', done: true },
            { label: 'Đã xác nhận đơn hàng', time: '10:03 SA', done: true },
            { label: 'Đang chuẩn bị đơn hàng', time: '10:04 SA', done: true },
            { label: 'Đang giao', time: '10:30 SA', done: true },
            { label: 'Hoàn thành', time: '', done: false },
        ],
    },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
    'Đã giao': 'text-[#2e7d32]',
    'Đã hủy': 'text-[#d32f2f]',
    'Trả hàng': 'text-[#d32f2f]',
    'Đang giao hàng': 'text-[#1976d2]',
};

/* ═══════════════════════════════════════════
   OVERVIEW TAB
   ═══════════════════════════════════════════ */
export default function OverviewTab() {
    const [acceptingOrders, setAcceptingOrders] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>(ORDER_STATUS_FILTER[0]);
    const [searchText, setSearchText] = useState('');
    const [timeDropdown, setTimeDropdown] = useState(false);
    const [statusDropdown, setStatusDropdown] = useState(false);
    const [selectedOrderCode, setSelectedOrderCode] = useState<string | null>(null);

    const selectedOrderRow = selectedOrderCode ? MOCK_ORDERS.find((o) => o.code === selectedOrderCode) ?? null : null;

    const selectedOrderDetail: OrderDetailData | null = selectedOrderRow ? {
        code: selectedOrderRow.code,
        customer: selectedOrderRow.customer,
        customerPhone: selectedOrderRow.customerPhone,
        date: selectedOrderRow.date,
        deliveryDate: selectedOrderRow.deliveryDate || undefined,
        status: selectedOrderRow.status,
        items: selectedOrderRow.items,
        subtotal: selectedOrderRow.subtotal,
        shippingFee: selectedOrderRow.shippingFee,
        discountAmount: selectedOrderRow.discountAmount,
        totalValue: selectedOrderRow.totalValue,
        netIncome: selectedOrderRow.netIncome,
        timeline: selectedOrderRow.timeline,
        review: selectedOrderRow.review,
    } : null;

    const filteredOrders = useMemo(() => {
        return MOCK_ORDERS.filter((o) => {
            if (statusFilter !== 'Tất cả' && o.status !== statusFilter) return false;
            if (searchText && !o.code.toLowerCase().includes(searchText.toLowerCase()) && !o.customer.toLowerCase().includes(searchText.toLowerCase())) return false;
            return true;
        });
    }, [statusFilter, searchText]);

    if (selectedOrderDetail) {
        return <OrderDetailView order={selectedOrderDetail} onBack={() => setSelectedOrderCode(null)} />;
    }

    return (
        <div>
            {/* ── Toggle nhận đơn ── */}
            <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-full bg-[#2e7d32] px-4 py-2 text-[14px] font-semibold text-white">
                    <span>Đang nhận đơn</span>
                    <button
                        type="button"
                        onClick={() => setAcceptingOrders(!acceptingOrders)}
                        className={`relative h-[24px] w-[42px] rounded-full transition-colors ${acceptingOrders ? 'bg-white' : 'bg-[#a5d6a7]'}`}
                    >
                        <span className={`absolute top-[3px] h-[18px] w-[18px] rounded-full transition-transform ${acceptingOrders ? 'left-[21px] bg-[#2e7d32]' : 'left-[3px] bg-white'}`} />
                    </button>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#ddd] bg-white px-4 py-2 text-[14px] text-black">
                    <span>🏪</span>
                    <span className="font-medium">Cửa hàng {MOCK_STORE.name}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                </div>
            </div>

            {/* ── Store Info Card ── */}
            <div className="rounded-[16px] bg-white p-6 shadow-sm">
                <div className="flex gap-6">
                    <img src={MOCK_STORE.avatar} alt={MOCK_STORE.name} className="h-[140px] w-[200px] rounded-[12px] object-cover" />
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-[22px] font-bold text-black">{MOCK_STORE.name}</h2>
                                <p className="mt-1 text-[14px] text-[#888]">{MOCK_STORE.categories}</p>
                            </div>
                            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[10px] bg-[#f6faf4] text-[18px] font-bold text-[#2e7d32]">
                                {MOCK_STORE.rating}
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-8">
                            <span className="text-[15px] font-semibold text-[#f0a050]">Hôm nay</span>
                            <div className="text-center">
                                <p className="text-[20px] font-bold text-black">{MOCK_STORE.todayRevenue}</p>
                                <p className="text-[12px] text-[#888]">Doanh thu</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[20px] font-bold text-black">{MOCK_STORE.todayOrders}</p>
                                <p className="text-[12px] text-[#888]">Đơn hàng</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[20px] font-bold text-black">{MOCK_STORE.todayCancelled}</p>
                                <p className="text-[12px] text-[#888]">Đơn hủy</p>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-[13px] text-[#555]">
                            <span>📍</span><span>{MOCK_STORE.address}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[13px] text-[#2e7d32]">
                            <span>⏰</span><span>Đang mở cửa {MOCK_STORE.hours}</span>
                            <button className="text-[#999]">✏️</button>
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex gap-3">
                    <button className="rounded-[10px] bg-[#d32f2f] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c]">Đổi ảnh đại diện</button>
                    <button className="flex items-center gap-2 rounded-[10px] border border-[#ddd] bg-white px-5 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50">
                        <span className="text-[16px]">⊕</span> Thêm món
                    </button>
                    <button className="rounded-[10px] bg-[#2e7d32] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#256b28]">🏷️ Tạo khuyến mãi</button>
                    <button className="rounded-[10px] bg-[#d32f2f] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c]">⏸ Tạm nghỉ bán</button>
                </div>
            </div>

            {/* ── Quản lý đơn hàng + Top món ── */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-[16px] bg-white p-5 shadow-sm">
                    <h3 className="text-[16px] font-bold text-black">Quản lý đơn hàng</h3>
                    <div className="mt-4 grid grid-cols-4 gap-3 text-center">
                        <div><p className="text-[22px] font-bold text-black">{ORDER_STATS.completed} %</p><p className="text-[12px] text-[#2e7d32]">Hoàn thành</p><div className="mx-auto mt-1 h-1 w-8 rounded bg-[#2e7d32]" /></div>
                        <div><p className="text-[22px] font-bold text-black">{ORDER_STATS.cancelled} %</p><p className="text-[12px] text-[#f0a050]">Hủy đơn</p><div className="mx-auto mt-1 h-1 w-8 rounded bg-[#f0a050]" /></div>
                        <div><p className="text-[22px] font-bold text-black">{ORDER_STATS.returned} %</p><p className="text-[12px] text-[#42a5f5]">Giao trễ</p><div className="mx-auto mt-1 h-1 w-8 rounded bg-[#42a5f5]" /></div>
                        <div><p className="text-[22px] font-bold text-black">{ORDER_STATS.refund} %</p><p className="text-[12px] text-[#888]">Ơn</p><div className="mx-auto mt-1 h-1 w-8 rounded bg-[#888]" /></div>
                    </div>
                    <p className="mt-4 text-[11px] text-[#999]">Số liệu tham khảo · ~7% hoàn thành · ~2% hủy đơn.</p>
                </div>
                <div className="rounded-[16px] bg-white p-5 shadow-sm">
                    <h3 className="text-[16px] font-bold text-black">Top món bán chạy hôm nay</h3>
                    <div className="mt-4 space-y-3">
                        {TOP_ITEMS.map((item) => (
                            <div key={item.rank} className="flex items-center gap-4">
                                <span className="text-[18px] font-bold text-[#f0a050]">{item.rank}</span>
                                <img src={item.image} alt={item.name} className="h-10 w-10 rounded-[8px] object-cover" />
                                <span className="flex-1 text-[14px] text-black">{item.name}</span>
                                <span className="text-[14px] font-semibold text-[#2e7d32]">{item.sold} Lượt bán</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Đơn hàng trong hôm nay ── */}
            <div className="mt-6 rounded-[16px] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[16px] font-bold uppercase text-black">ĐƠN HÀNG TRONG HÔM NAY</h3>
                    <div className="flex items-center gap-3">
                        {/* Time filter */}
                        <div className="relative">
                            <button type="button" onClick={() => { setTimeDropdown(!timeDropdown); setStatusDropdown(false); }} className="flex items-center gap-1 rounded-[8px] border border-[#ddd] bg-white px-3 py-1.5 text-[13px] text-black">
                                <span>Theo thời gian</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                            </button>
                            {timeDropdown && (
                                <div className="absolute right-0 top-[calc(100%+4px)] z-10 w-[160px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                                    {TIME_FILTER.map((t) => (
                                        <button key={t} type="button" onClick={() => setTimeDropdown(false)} className="block w-full px-3 py-2 text-left text-[13px] text-black transition hover:bg-[#f6faf4]">{t}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Status filter */}
                        <div className="relative">
                            <button type="button" onClick={() => { setStatusDropdown(!statusDropdown); setTimeDropdown(false); }} className="flex items-center gap-1 rounded-[8px] border border-[#ddd] bg-white px-3 py-1.5 text-[13px] text-black">
                                <span>Trạng thái đơn</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                            </button>
                            {statusDropdown && (
                                <div className="absolute right-0 top-[calc(100%+4px)] z-10 w-[180px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                                    {ORDER_STATUS_FILTER.map((s) => (
                                        <button key={s} type="button" onClick={() => { setStatusFilter(s); setStatusDropdown(false); }} className={`block w-full px-3 py-2 text-left text-[13px] transition hover:bg-[#f6faf4] ${statusFilter === s ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>{s}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Search */}
                        <div className="flex items-center gap-2 rounded-[8px] border border-[#ddd] bg-white px-3 py-1.5">
                            <span className="text-[13px] text-[#999]">Tìm kiếm</span>
                            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} className="w-24 bg-transparent text-[13px] text-black outline-none" />
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-[13px]">
                        <thead>
                            <tr className="border-b border-[#e8e8e8] text-left text-[#888]">
                                <th className="px-2 py-3 font-medium">Mã đơn</th>
                                <th className="px-2 py-3 font-medium">Tên khách</th>
                                <th className="px-2 py-3 font-medium">Giá trị đơn hàng</th>
                                <th className="px-2 py-3 font-medium">Giảm giá</th>
                                <th className="px-2 py-3 font-medium">Phí</th>
                                <th className="px-2 py-3 font-medium">Giờ đặt</th>
                                <th className="px-2 py-3 font-medium">Trạng thái đơn hàng</th>
                                <th className="px-2 py-3 font-medium">Thu nhập đơn</th>
                                <th className="px-2 py-3 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="border-b border-[#f0f0f0]">
                                    <td className="px-2 py-3 font-medium text-black">{order.code}</td>
                                    <td className="px-2 py-3 text-black">{order.customer}</td>
                                    <td className="px-2 py-3 text-[#f0a050]">{order.value}</td>
                                    <td className="px-2 py-3 text-[#d32f2f]">{order.discount}</td>
                                    <td className="px-2 py-3 text-black">{order.discountPercent}</td>
                                    <td className="px-2 py-3 text-black">{order.date}</td>
                                    <td className={`px-2 py-3 font-medium ${STATUS_COLORS[order.status]}`}>{order.status}</td>
                                    <td className="px-2 py-3 text-black">{order.income}</td>
                                    <td className="px-2 py-3">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedOrderCode(order.code)}
                                            className="rounded-[6px] bg-[#2e7d32] px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-[#256b28]"
                                        >
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#2e7d32]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ddd]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ddd]" />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[#e8e8e8] pt-4">
                    <span className="text-[15px] font-bold text-black">Tổng thu nhập hôm nay</span>
                    <span className="text-[22px] font-bold text-[#d32f2f]">2.000.000Đ</span>
                </div>
            </div>
        </div>
    );
}
