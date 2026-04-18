'use client';

import { useMemo, useState } from 'react';

/* ═══════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════ */
type OrderStatus = 'Đã giao' | 'Đã hủy' | 'Trả hàng' | 'Đang giao hàng';

interface RevenueOrder {
    code: string;
    customer: string;
    value: string;
    discount: string;
    discountPercent: string;
    fee: string;
    date: string;
    status: OrderStatus;
    income: string;
}

const ORDER_STATUS_FILTER = ['Tất cả', 'Đã giao', 'Đã hủy', 'Trả hàng', 'Đang giao hàng'] as const;
const TIME_FILTER = ['Mới đây nhất', 'Cũ nhất'] as const;

const STATUS_COLORS: Record<OrderStatus, string> = {
    'Đã giao': 'text-[#2e7d32]',
    'Đã hủy': 'text-[#d32f2f]',
    'Trả hàng': 'text-[#d32f2f]',
    'Đang giao hàng': 'text-[#1976d2]',
};

const REVENUE_ORDERS: RevenueOrder[] = [
    { code: 'QA001', customer: 'Nguyen A', value: '120.000đ', discount: '-20.000đ', discountPercent: '-15%', fee: '', date: '22/02/2026 05:00 CH', status: 'Đã giao', income: '85.000đ' },
    { code: 'QA002', customer: 'Nguyen B', value: '150.000đ', discount: '-10.000đ', discountPercent: '-15%', fee: '', date: '22/02/2026 05:00 CH', status: 'Đã hủy', income: '0đ' },
    { code: 'QA003', customer: 'Nguyen C', value: '220.000đ', discount: '-5.000đ', discountPercent: '-15%', fee: '', date: '22/02/2026 05:00 CH', status: 'Trả hàng', income: '0đ' },
    { code: 'QA004', customer: 'Nguyen D', value: '520.000đ', discount: '-50.000đ', discountPercent: '-15%', fee: '', date: '22/02/2026 05:00 CH', status: 'Đang giao hàng', income: 'Tạm tính: 399.500đ' },
    { code: 'QA004', customer: 'Nguyen D', value: '520.000đ', discount: '-50.000đ', discountPercent: '-15%', fee: '', date: '22/02/2026 05:00 CH', status: 'Đang giao hàng', income: 'Tạm tính: 399.500đ' },
];

/* chart data points (30 days) */
const CHART_DATA = [220, 225, 230, 228, 240, 235, 245, 250, 248, 255, 260, 265, 258, 270, 275, 272, 280, 285, 290, 295, 300, 305, 310, 315, 310, 320, 330, 340, 350, 370];
const CHART_LABELS = ['0.0', '', '12', '', '14', '', '16', '', '18', '', '20', '', '23', '', '25', '', '14', '', '16', '', '18', '', '20', '', '26', '', '', '', '', ''];

/* donut data */
const DONUT_ITEMS = [
    { name: 'Bún bò Huế số 1', color: '#2e7d32', percent: 40 },
    { name: 'Bún bò Huế số 2', color: '#66bb6a', percent: 25 },
    { name: 'Bún bò Huế số 3', color: '#f0a050', percent: 15 },
    { name: 'Món khác', color: '#e0e0e0', percent: 20 },
];

/* ═══════════════════════════════════════════
   SIMPLE LINE CHART (SVG)
   ═══════════════════════════════════════════ */
function RevenueLineChart() {
    const W = 680;
    const H = 220;
    const PAD = { t: 20, r: 30, b: 30, l: 45 };
    const innerW = W - PAD.l - PAD.r;
    const innerH = H - PAD.t - PAD.b;

    const minV = Math.min(...CHART_DATA) - 10;
    const maxV = Math.max(...CHART_DATA) + 10;

    const points = CHART_DATA.map((v, i) => {
        const x = PAD.l + (i / (CHART_DATA.length - 1)) * innerW;
        const y = PAD.t + innerH - ((v - minV) / (maxV - minV)) * innerH;
        return { x, y, v };
    });

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const areaD = `${pathD} L${points[points.length - 1].x},${H - PAD.b} L${points[0].x},${H - PAD.b} Z`;

    // Y-axis labels
    const yLabels = [220, 310, maxV].map((v) => ({
        label: `${Math.round(v)}K`,
        y: PAD.t + innerH - ((v - minV) / (maxV - minV)) * innerH,
    }));

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            {yLabels.map((yl) => (
                <g key={yl.label}>
                    <line x1={PAD.l} y1={yl.y} x2={W - PAD.r} y2={yl.y} stroke="#f0f0f0" strokeWidth="1" />
                    <text x={PAD.l - 8} y={yl.y + 4} textAnchor="end" className="fill-[#999] text-[10px]">{yl.label}</text>
                </g>
            ))}

            {/* Area fill */}
            <path d={areaD} fill="url(#areaGrad)" opacity="0.3" />
            <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2e7d32" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#2e7d32" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Line */}
            <path d={pathD} fill="none" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Last point highlight */}
            <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="6" fill="#2e7d32" />
            <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="3" fill="white" />
            <text x={points[points.length - 1].x} y={points[points.length - 1].y - 12} textAnchor="middle" className="fill-[#2e7d32] text-[11px] font-bold">
                370K
            </text>

            {/* X-axis labels */}
            {CHART_LABELS.map((label, i) => label ? (
                <text
                    key={i}
                    x={PAD.l + (i / (CHART_DATA.length - 1)) * innerW}
                    y={H - 8}
                    textAnchor="middle"
                    className="fill-[#999] text-[9px]"
                >
                    {label}
                </text>
            ) : null)}
        </svg>
    );
}

/* ═══════════════════════════════════════════
   DONUT CHART (CSS)
   ═══════════════════════════════════════════ */
function DonutChart() {
    const segments = DONUT_ITEMS.reduce<Array<(typeof DONUT_ITEMS)[number] & { start: number; end: number }>>((allSegments, item) => {
        const previousEnd = allSegments[allSegments.length - 1]?.end ?? 0;
        return [...allSegments, { ...item, start: previousEnd, end: previousEnd + item.percent }];
    }, []);

    const conicGradient = segments.map((s) => `${s.color} ${s.start}% ${s.end}%`).join(', ');

    return (
        <div className="flex items-center gap-5">
            <div className="relative h-[130px] w-[130px] shrink-0">
                <div
                    className="h-full w-full rounded-full"
                    style={{ background: `conic-gradient(${conicGradient})` }}
                />
                <div className="absolute inset-[20%] flex items-center justify-center rounded-full bg-white text-[18px] font-bold text-[#2e7d32]">
                    80%
                </div>
            </div>
            <div className="space-y-2">
                {DONUT_ITEMS.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-[12px]">
                        <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-black">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   SUMMARY CARDS
   ═══════════════════════════════════════════ */
const SUMMARY_CARDS = [
    { label: 'Hôm nay', value: '5.800.000Đ', change: '+12% so với hôm qua', changeColor: 'text-[#2e7d32]' },
    { label: 'Thực nhận', value: '4.460.000Đ', change: '+14% so với hôm qua', changeColor: 'text-[#2e7d32]' },
    { label: 'Tổng đơn hàng', value: '215 đơn', change: '+8% so với hôm qua', changeColor: 'text-[#2e7d32]' },
    { label: 'Tỷ lệ hủy/ hoàn', value: '12,6 %', change: '+3% so với hôm qua', changeColor: 'text-[#2e7d32]' },
];

/* ═══════════════════════════════════════════
   REVENUE TAB COMPONENT
   ═══════════════════════════════════════════ */
export default function RevenueTab() {
    const [statusFilter, setStatusFilter] = useState<string>(ORDER_STATUS_FILTER[0]);
    const [searchText, setSearchText] = useState('');
    const [timeDropdown, setTimeDropdown] = useState(false);
    const [statusDropdown, setStatusDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredOrders = useMemo(() => {
        return REVENUE_ORDERS.filter((o) => {
            if (statusFilter !== 'Tất cả' && o.status !== statusFilter) return false;
            if (searchText && !o.code.toLowerCase().includes(searchText.toLowerCase()) && !o.customer.toLowerCase().includes(searchText.toLowerCase())) return false;
            return true;
        });
    }, [statusFilter, searchText]);

    return (
        <div>
            <h1 className="text-[22px] font-bold uppercase text-black">QUẢN LÝ DOANH THU</h1>

            {/* ── ① Summary Cards ── */}
            <div className="mt-5 grid grid-cols-4 gap-4">
                {SUMMARY_CARDS.map((card) => (
                    <div key={card.label} className="rounded-[12px] bg-white p-5 shadow-sm">
                        <p className="text-[13px] text-[#888]">{card.label}</p>
                        <p className="mt-2 text-[24px] font-bold text-black">{card.value}</p>
                        <p className={`mt-1 text-[12px] ${card.changeColor}`}>{card.change}</p>
                    </div>
                ))}
            </div>

            {/* ── Charts Row ── */}
            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
                {/* Line chart */}
                <div className="rounded-[12px] bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[15px] font-bold text-black">Thống kê doanh thu 30 ngày qua</h3>
                        <button className="text-[16px] text-[#999] transition hover:text-black">🔄</button>
                    </div>
                    <div className="mt-3">
                        <RevenueLineChart />
                    </div>
                </div>

                {/* Donut chart */}
                <div className="rounded-[12px] bg-white p-5 shadow-sm">
                    <h3 className="text-[15px] font-bold text-black">Doanh thu theo món</h3>
                    <div className="mt-5">
                        <DonutChart />
                    </div>
                </div>
            </div>

            {/* ── ② Orders Table ── */}
            <div className="mt-5 rounded-[12px] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[15px] font-bold text-black">Doanh thu theo trạng thái đơn</h3>
                    <div className="flex items-center gap-3">
                        {/* ② Time filter */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => { setTimeDropdown(!timeDropdown); setStatusDropdown(false); }}
                                className="flex items-center gap-1 rounded-[8px] border border-[#ddd] bg-white px-3 py-1.5 text-[13px] text-black"
                            >
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

                        {/* ③ Status filter */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => { setStatusDropdown(!statusDropdown); setTimeDropdown(false); }}
                                className="flex items-center gap-1 rounded-[8px] border border-[#ddd] bg-white px-3 py-1.5 text-[13px] text-black"
                            >
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

                        {/* ④ Search */}
                        <div className="flex items-center gap-2 rounded-[8px] border border-[#ddd] bg-white px-3 py-1.5">
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Tìm kiếm"
                                className="w-24 bg-transparent text-[13px] text-black outline-none placeholder:text-[#999]"
                            />
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
                            {filteredOrders.map((order, idx) => (
                                <tr key={`${order.code}-${idx}`} className="border-b border-[#f0f0f0]">
                                    <td className="px-2 py-3 font-medium text-black">{order.code}</td>
                                    <td className="px-2 py-3 text-black">{order.customer}</td>
                                    <td className="px-2 py-3 text-[#f0a050]">{order.value}</td>
                                    <td className="px-2 py-3 text-[#d32f2f]">{order.discount}</td>
                                    <td className="px-2 py-3 text-black">{order.discountPercent}</td>
                                    <td className="px-2 py-3 text-black">{order.date}</td>
                                    <td className={`px-2 py-3 font-semibold ${STATUS_COLORS[order.status]}`}>{order.status}</td>
                                    <td className="px-2 py-3 text-black">{order.income}</td>
                                    <td className="px-2 py-3">
                                        {/* ⑤ */}
                                        <button
                                            type="button"
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

                {/* Pagination */}
                <div className="mt-5 flex items-center justify-center gap-1">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] text-[#999] transition hover:bg-[#f0f0f0]">‹</button>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
                        <button
                            key={p}
                            type="button"
                            onClick={() => setCurrentPage(p)}
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition ${
                                currentPage === p
                                    ? 'bg-[#2e7d32] font-bold text-white'
                                    : 'text-[#555] hover:bg-[#f0f0f0]'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] text-[#999] transition hover:bg-[#f0f0f0]">›</button>
                </div>
            </div>
        </div>
    );
}
