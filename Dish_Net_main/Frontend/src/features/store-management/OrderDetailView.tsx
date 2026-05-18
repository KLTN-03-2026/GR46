'use client';
/* eslint-disable @next/next/no-img-element */

/* ═══════════════════════════════════════════
   SHARED ORDER DETAIL TYPES
   ═══════════════════════════════════════════ */
export interface OrderDetailData {
    code: string;
    customer: string;
    customerPhone: string;
    date: string;
    deliveryDate?: string;
    status: string;
    statusLabel?: string;
    items: { name: string; qty: number; price: string; image: string }[];
    subtotal: string;
    shippingFee: string;
    discountAmount: string;
    totalValue: string;
    netIncome: string;
    timeline: { label: string; time: string; done: boolean }[];
    review?: { rating: number; date: string; text: string };
}

const STATUS_BG_MAP: Record<string, string> = {
    'Đã giao': 'bg-[#2e7d32] text-white',
    'Hoàn thành': 'bg-[#2e7d32] text-white',
    'Đã hủy': 'bg-[#d32f2f] text-white',
    'Trả hàng': 'bg-[#f0a050] text-white',
    'Đang giao hàng': 'bg-[#1976d2] text-white',
    'Đang giao': 'bg-[#1976d2] text-white',
    'Đang chuẩn bị': 'bg-[#f0a050] text-white',
    'Chờ xác nhận': 'bg-[#d32f2f] text-white',
};

function getStatusBg(status: string): string {
    return STATUS_BG_MAP[status] || 'bg-[#888] text-white';
}

/* ═══════════════════════════════════════════
   ORDER DETAIL VIEW COMPONENT
   ═══════════════════════════════════════════ */
export default function OrderDetailView({ order, onBack }: { order: OrderDetailData; onBack: () => void }) {
    const displayStatus = order.statusLabel || (order.status === 'Đã giao' ? 'Hoàn thành' : order.status);

    return (
        <div>
            {/* Back + Title */}
            <div className="flex items-center gap-3">
                <button type="button" onClick={onBack} className="text-[22px] text-[#555] transition hover:text-black">←</button>
                <h2 className="text-[20px] font-bold text-black">Chi tiết đơn {order.code}</h2>
            </div>

            {/* Main content */}
            <div className="mt-5 rounded-[16px] bg-white p-6 shadow-sm">
                {/* Header: Mã đơn + Badge */}
                <div className="flex items-center gap-4">
                    <span className="text-[16px] font-bold text-black">Mã đơn : {order.code}</span>
                    <span className={`rounded-full px-5 py-1.5 text-[13px] font-bold ${getStatusBg(displayStatus)}`}>
                        {displayStatus}
                    </span>
                </div>

                <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_340px]">
                    {/* LEFT: Order info */}
                    <div className="rounded-[12px] border border-[#e8e8e8] p-5">
                        {/* Customer info */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8e8e8] text-[14px]">🍽️</div>
                                <div>
                                    <p className="text-[15px] font-semibold text-black">{order.customer}</p>
                                    <p className="flex items-center gap-1 text-[13px] text-[#2e7d32]">📞 {order.customerPhone}</p>
                                </div>
                            </div>
                            <span className={`rounded-[6px] px-3 py-1 text-[12px] font-semibold ${getStatusBg(order.status)}`}>
                                {order.status}
                            </span>
                        </div>

                        {/* Timestamps */}
                        <div className="mt-4 border-t border-[#f0f0f0] pt-3 text-[13px] text-[#555]">
                            <p>Thời gian đặt : {order.date}</p>
                            {order.deliveryDate && <p>Thời gian giao : {order.deliveryDate}</p>}
                        </div>

                        {/* Items */}
                        <div className="mt-4 border-t border-[#f0f0f0] pt-3">
                            <p className="text-[14px] font-bold text-black">Chi tiết đơn hàng</p>
                            <div className="mt-3 space-y-3">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <img src={item.image} alt={item.name} className="h-9 w-9 rounded-[6px] object-cover" />
                                        <div className="flex-1">
                                            <span className="text-[13px] text-black">{item.name}</span>
                                            <p className="text-[12px] text-[#999]">x{item.qty}</p>
                                        </div>
                                        <span className="text-[13px] text-black">{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="mt-4 space-y-2 border-t border-[#f0f0f0] pt-3 text-[13px]">
                            <div className="flex justify-between"><span className="text-[#555]">Tạm tính</span><span className="text-black">{order.subtotal}</span></div>
                            <div className="flex justify-between"><span className="text-[#555]">Phí vận chuyển</span><span className="text-black">{order.shippingFee}</span></div>
                            <div className="flex justify-between"><span className="text-[#555]">Giảm giá</span><span className="text-black">{order.discountAmount}</span></div>
                            <div className="flex justify-between font-medium"><span className="text-[#555]">Tổng giá trị đơn</span><span className="text-black">{order.totalValue}</span></div>
                            <div className="flex justify-between rounded-[8px] bg-[#f6faf4] px-3 py-2">
                                <span className="font-bold text-[#2e7d32]">Thu nhập thực nhận</span>
                                <span className="text-[16px] font-bold text-[#d32f2f]">{order.netIncome}</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Timeline */}
                    <div className="rounded-[16px] border border-[#e8e8e8] bg-white p-5 shadow-sm">
                        <h3 className="text-[14px] font-bold uppercase tracking-wide text-[#666]">Trạng thái đơn hàng</h3>
                        <div className="relative mt-5 pl-8">
                            {/* vertical line */}
                            <div className="absolute bottom-3 left-[13px] top-3 w-[2px] bg-gradient-to-b from-[#2e7d32] via-[#a5d6a7] to-[#e0e0e0]" />
                            <div className="space-y-6">
                                {order.timeline.map((step, i) => {
                                    const isActive = !step.done && order.timeline[i - 1]?.done;
                                    return (
                                        <div key={i} className="relative flex items-start gap-3">
                                            {/* dot */}
                                            <div className={`absolute left-[-22px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 transition-all
                                                ${step.done
                                                    ? 'border-[#2e7d32] bg-[#2e7d32]'
                                                    : isActive
                                                        ? 'border-[#2e7d32] bg-white shadow-[0_0_0_4px_rgba(46,125,50,0.15)]'
                                                        : 'border-[#ddd] bg-[#f5f5f5]'
                                                }`}
                                            >
                                                {step.done ? (
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                ) : isActive ? (
                                                    <span className="h-2 w-2 rounded-full bg-[#2e7d32]" />
                                                ) : null}
                                            </div>
                                            {/* content */}
                                            <div className="flex-1 min-w-0 pl-2">
                                                <div className="flex flex-wrap items-center justify-between gap-1">
                                                    <span className={`text-[13px] font-semibold leading-tight
                                                        ${step.done ? 'text-[#1a1a1a]' : isActive ? 'text-[#2e7d32]' : 'text-[#bbb]'}`}>
                                                        {step.label}
                                                    </span>
                                                    {isActive && (
                                                        <span className="rounded-full bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-bold text-[#2e7d32]">Hiện tại</span>
                                                    )}
                                                </div>
                                                {step.time ? (
                                                    <span className="mt-0.5 block text-[11px] text-[#999]">{step.time}</span>
                                                ) : (
                                                    <span className="mt-0.5 block text-[11px] text-[#ccc]">—</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review */}
            {order.review && (
                <div className="mt-5 rounded-[16px] bg-white p-6 shadow-sm">
                    <h3 className="text-[15px] font-bold text-black">Đánh giá của khách hàng</h3>
                    <div className="mt-4 flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8e8e8] text-[14px]">🍽️</div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <span className="text-[14px] font-semibold text-black">{order.customer}</span>
                                <span className="text-[11px] text-[#999]">{order.review.date}</span>
                            </div>
                            <p className="flex items-center gap-1 text-[12px] text-[#2e7d32]">📞 {order.customerPhone}</p>
                            <div className="mt-2 flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className={`text-[18px] ${i < order.review!.rating ? 'text-[#f0a050]' : 'text-[#ddd]'}`}>★</span>
                                ))}
                            </div>
                            <div className="mt-3 rounded-[10px] bg-[#f8f8f8] px-4 py-3 text-[13px] text-[#555]">
                                {order.review.text}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
