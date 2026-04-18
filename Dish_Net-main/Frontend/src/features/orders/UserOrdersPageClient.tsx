'use client';

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
    cancelReasonOptions,
    getDefaultUserOrdersByTab,
    orderTabs,
    readStoredUserOrdersByTab,
    refundReasonOptions,
    stageLabels,
    type OrderTabKey,
    type UserOrder,
    type UserOrdersByTab,
    writeStoredUserOrdersByTab,
} from '@/features/orders/data';

const validOrderTabs: OrderTabKey[] = ['placed', 'purchased', 'cancelled', 'returned', 'review'];

function resolveTab(searchParam: string | null): OrderTabKey {
    return validOrderTabs.includes(searchParam as OrderTabKey) ? (searchParam as OrderTabKey) : 'placed';
}

function canCancelOrder(order: UserOrder) {
    return order.statusLabel === 'Chờ xác nhận';
}

function Icon({ label, tone }: { label: string; tone?: 'green' | 'blue' | 'gray' }) {
    const styles = {
        green: 'bg-[#eef6eb] text-[#2f6f25]',
        blue: 'bg-[#eef3ff] text-[#1d71e8]',
        gray: 'bg-[#f3f5f4] text-[#5a635a]',
    };
    return <span className={`flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold ${styles[tone ?? 'green']}`}>{label}</span>;
}

function ActionModal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 px-4" onClick={onClose}>
            <div className="w-full max-w-[760px] rounded-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.16)]" onClick={(event) => event.stopPropagation()}>
                <div className="flex items-center justify-between border-b border-[#e9ecef] px-8 py-5">
                    <h2 className="mx-auto text-[22px] font-bold uppercase text-black">{title}</h2>
                    <button type="button" onClick={onClose} className="text-[36px] leading-none text-[#3d3d3d]">×</button>
                </div>
                <div className="px-8 py-5">{children}</div>
            </div>
        </div>
    );
}

function CancelModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: (reason: string) => void }) {
    const [reason, setReason] = useState(cancelReasonOptions[0]);
    return (
        <ActionModal title="Bạn muốn hủy đơn hàng này?" onClose={onClose}>
            <div className="space-y-3">
                {cancelReasonOptions.map((item) => (
                    <button key={item} type="button" onClick={() => setReason(item)} className="flex w-full items-center justify-between rounded-[14px] border border-[#e8edf1] px-4 py-3 text-left text-[15px] text-black">
                        <span>{item}</span>
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${reason === item ? 'border-[#2f6f25] text-[#2f6f25]' : 'border-[#bababa] text-transparent'}`}>●</span>
                    </button>
                ))}
            </div>
            <div className="mt-6 flex justify-center">
                <button type="button" onClick={() => onConfirm(reason)} className="rounded-[10px] bg-[#299a2e] px-10 py-3 text-[16px] font-bold text-white">Xác nhận hủy</button>
            </div>
        </ActionModal>
    );
}

function RefundModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: (reason: string) => void }) {
    const [reason, setReason] = useState(refundReasonOptions[0]);
    return (
        <ActionModal title="Yêu cầu hoàn tiền" onClose={onClose}>
            <div className="space-y-3">
                {refundReasonOptions.map((item) => (
                    <button key={item} type="button" onClick={() => setReason(item)} className="flex w-full items-center justify-between rounded-[14px] border border-[#e8edf1] px-4 py-3 text-left text-[15px] text-black">
                        <span>{item}</span>
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${reason === item ? 'border-[#2f6f25] text-[#2f6f25]' : 'border-[#bababa] text-transparent'}`}>●</span>
                    </button>
                ))}
            </div>
            <div className="mt-6 flex justify-center">
                <button type="button" onClick={() => onConfirm(reason)} className="rounded-[10px] bg-[#299a2e] px-10 py-3 text-[16px] font-bold text-white">Gửi yêu cầu</button>
            </div>
        </ActionModal>
    );
}

function ReviewModal({ order, onClose, onConfirm }: { order: UserOrder; onClose: () => void; onConfirm: (rating: number) => void }) {
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    return (
        <ActionModal title="Viết đánh giá" onClose={onClose}>
            <div className="border-b border-[#e9ecef] pb-4">
                <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <Icon label="CH" />
                        <div className="min-w-0">
                            <div className="text-[18px] font-semibold text-black">{order.storeName}</div>
                            <div className="mt-3 flex items-center gap-3">
                                <img src={order.image} alt={order.itemName} className="h-[54px] w-[54px] rounded-[12px] object-cover" />
                                <div className="text-[15px] text-black">{order.itemName}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 pt-1 text-[22px]">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button" onClick={() => setRating(star)} className={`${star <= rating ? 'text-[#f6b600]' : 'text-[#4b4b4b]'} transition`}>
                                ★
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <div className="text-[16px] font-medium text-black">Chia sẻ suy nghĩ của bạn</div>
                <div className="mt-3 rounded-[4px] border border-[#e1e1e1]">
                    <textarea
                        value={content}
                        onChange={(event) => setContent(event.target.value.slice(0, 300))}
                        placeholder="Bạn có thích món ăn này không ?"
                        className="h-[102px] w-full resize-none px-4 py-4 text-[14px] text-black outline-none placeholder:text-[#c9c9c9]"
                    />
                    <div className="px-4 pb-2 text-right text-[13px] text-[#c4c4c4]">{content.length}/300</div>
                </div>

                <div className="mt-4 text-[16px] font-medium text-black">Thêm ảnh hoặc video</div>
                <button type="button" className="mt-3 flex h-[62px] w-full items-center justify-center rounded-[16px] border border-[#cfcfcf] bg-[#ececec] text-[24px] text-black">
                    📷
                </button>

                <label className="mt-4 flex items-center gap-3 text-[14px] text-[#3d3d3d]">
                    <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(event) => setIsAnonymous(event.target.checked)}
                        className="h-4 w-4 rounded-full border border-[#bdbdbd]"
                    />
                    Đăng ẩn danh
                </label>
            </div>

            <div className="mt-6 flex justify-center">
                <button type="button" onClick={() => onConfirm(rating || 5)} className="rounded-[14px] bg-[#299a2e] px-14 py-3 text-[16px] font-bold text-white">Gửi</button>
            </div>
        </ActionModal>
    );
}

function ListCard({ order, activeTab, onDetail, onCancel, onRefund, onReview }: { order: UserOrder; activeTab: OrderTabKey; onDetail: () => void; onCancel: () => void; onRefund: () => void; onReview: () => void }) {
    return (
        <article className="rounded-[18px] bg-white px-6 py-5 shadow-[0_8px_22px_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-3"><Icon label="CH" /><h3 className="text-[20px] font-semibold text-black">{order.storeName}</h3></div>
                <p className="text-[15px] text-[#494949]">{order.timeLabel} {order.statusLabel}</p>
            </div>
            <div className="mt-5 grid grid-cols-[84px_minmax(0,1fr)_150px] items-center gap-5">
                <img src={order.image} alt={order.itemName} className="h-[72px] w-[72px] rounded-[16px] object-cover" />
                <div><div className="text-[17px] text-black">{order.itemName}</div><div className="mt-1 text-[16px] font-semibold text-black">x{order.quantity}</div></div>
                <div className="text-right"><div className="text-[16px] text-black">{order.unitPrice}</div><div className="mt-3 text-[16px] text-black">Tổng: <span className="ml-3">{order.totalPrice}</span></div></div>
            </div>
            <div className="mt-5 flex justify-end gap-4">
                <button type="button" onClick={onDetail} className="min-w-[190px] rounded-full border border-[#d7d7d7] bg-white px-6 py-2.5 text-[15px] font-semibold text-black">Xem chi tiết đơn</button>
                {activeTab === 'review' ? <button type="button" onClick={onReview} className="min-w-[160px] rounded-full bg-[#ff2f18] px-6 py-2.5 text-[14px] font-semibold text-white">{order.canReview ? 'Thêm đánh giá' : 'Xem / sửa đánh giá'}</button> : null}
                {activeTab === 'purchased' ? <button type="button" onClick={order.canReview ? onReview : onRefund} className={`min-w-[160px] rounded-full px-6 py-2.5 text-[14px] font-semibold ${order.canReview ? 'bg-[#ff2f18] text-white' : 'border border-[#d7d7d7] bg-[#f7f7f7] text-black'}`}>{order.canReview ? 'Viết đánh giá' : 'Yêu cầu hoàn tiền'}</button> : null}
                {activeTab === 'cancelled' || activeTab === 'returned' ? <button type="button" className="min-w-[140px] rounded-full border border-[#44aa4b] bg-[#e7f3e4] px-6 py-2.5 text-[14px] font-semibold text-[#2d992f]">Mua lại</button> : null}
                {activeTab === 'placed' ? <button type="button" onClick={onCancel} disabled={!canCancelOrder(order)} className={`min-w-[160px] rounded-full border px-6 py-2.5 text-[14px] font-semibold ${canCancelOrder(order) ? 'border-[#d7d7d7] bg-white text-[#4a4a4a]' : 'cursor-not-allowed border-[#d7d7d7] bg-[#f1f1f1] text-[#a8a8a8]'}`}>Hủy đơn hàng</button> : null}
            </div>
        </article>
    );
}
function DetailCard({ order, onBack, onCancel, onRefund, onReview }: { order: UserOrder; onBack: () => void; onCancel: () => void; onRefund: () => void; onReview: () => void }) {
    const stageIndex = stageLabels.findIndex((stage) => stage.key === order.activeStage);
    return (
        <div className="rounded-[20px] bg-white px-7 py-6 shadow-[0_8px_22px_rgba(0,0,0,0.03)]">
            <button type="button" onClick={onBack} className="flex items-center gap-3 text-[18px] text-black"><span className="text-[28px]">←</span><span className="font-medium">Đơn Hàng : {order.storeName}</span></button>
            {stageIndex >= 0 && !order.refundStatus && order.statusLabel !== 'Đã hủy' ? <div className="mx-auto mt-8 max-w-[620px]"><div className="relative flex items-center justify-between"><div className="absolute left-[34px] right-[34px] top-5 h-[6px] rounded-full bg-[#ececec]" /><div className="absolute left-[34px] top-5 h-[6px] rounded-full bg-[#64d8e6]" style={{ width: `${Math.max(0, stageIndex) * 33.33}%` }} />{stageLabels.map((stage, index) => <div key={stage.key} className="relative z-10 flex w-[132px] flex-col items-center text-center"><div className={`flex h-[40px] w-[40px] items-center justify-center rounded-full border-[3px] text-[13px] font-bold ${index === stageIndex ? 'border-[#2dc6cf] bg-[#2dc6cf] text-white' : index < stageIndex ? 'border-[#d6f5f7] bg-[#d6f5f7] text-[#63d3dd]' : 'border-[#ececec] bg-white text-[#a5a5a5]'}`}>{index === stageIndex ? 'GH' : '•'}</div><div className={`mt-3 text-[14px] leading-[1.25] ${index <= stageIndex ? 'text-[#54cdd9]' : 'text-[#b5b5b5]'}`}>{stage.label}</div></div>)}</div></div> : null}
            <div className="mt-8 border-t border-[#dbdbdb] pt-6"><div className="flex items-start gap-3"><Icon label="ĐC" tone="blue" /><div><div className="text-[18px] font-bold text-black">{order.customerName} <span className="font-semibold text-[#b8b8b8]">{order.customerPhone}</span></div><div className="mt-2 text-[16px] text-black">{order.customerAddress}</div></div></div></div>
            <div className="mt-7 border-t border-[#dbdbdb] pt-5"><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3 text-[18px] font-semibold text-black"><Icon label="CH" /><span>{order.storeName}</span></div>{order.canRefund ? <button type="button" onClick={onRefund} className="rounded-full border border-[#d7d7d7] bg-[#f7f7f7] px-8 py-2.5 text-[15px] font-semibold text-black">Yêu cầu hoàn tiền</button> : null}</div><div className="mt-4 grid grid-cols-[94px_minmax(0,1fr)_150px] items-center gap-5 border-b border-[#dbdbdb] pb-4"><img src={order.image} alt={order.itemName} className="h-[76px] w-[76px] rounded-[16px] object-cover" /><div><div className="text-[17px] text-black">{order.itemName}</div><div className="mt-1 text-[16px] font-semibold text-black">x{order.quantity}</div></div><div className="text-right text-[16px] text-black">{order.unitPrice}</div></div><div className="flex justify-end border-b border-[#dbdbdb] py-3 text-[16px] text-black"><span>Tổng:</span><span className="ml-10">{order.totalPrice}</span></div><div className="space-y-5 pt-5 text-[16px] text-black"><div className="flex items-center justify-between"><span>Số đơn hàng</span><div className="flex items-center gap-3"><span>{order.orderNumber}</span><Icon label="ID" tone="gray" /></div></div><div className="flex items-center justify-between"><span>Phương thức thanh toán</span><span>{order.paymentMethod}</span></div>{order.orderedAt ? <div className="flex items-center justify-between"><span>Ngày đặt đơn</span><span>{order.orderedAt}</span></div> : null}{order.paidAt ? <div className="flex items-center justify-between"><span>Thời gian thanh toán</span><span>{order.paidAt}</span></div> : null}{order.deliveredAt ? <div className="flex items-center justify-between"><span>Ngày giao hàng</span><span>{order.deliveredAt}</span></div> : null}{order.cancelledBy ? <div className="flex items-center justify-between"><span>Yêu cầu bởi</span><span>{order.cancelledBy}</span></div> : null}{order.cancelledAt ? <div className="flex items-center justify-between"><span>Yêu cầu vào</span><span>{order.cancelledAt}</span></div> : null}{order.cancelledReason ? <div className="flex items-center justify-between"><span>Lý do</span><span>{order.cancelledReason}</span></div> : null}{order.refundReason ? <div className="flex items-center justify-between"><span>Lý do trả hàng / hoàn tiền</span><span>{order.refundReason}</span></div> : null}{order.refundStatus ? <div className="flex items-center justify-between"><span>Tổng tiền hoàn</span><span>{order.refundStatus}</span></div> : null}</div></div>
            <div className="mt-8 flex justify-center gap-6"><button type="button" className="min-w-[180px] rounded-[12px] bg-[#e5e5e5] px-8 py-4 text-[17px] font-semibold text-black">Mua lại</button>{order.canReview ? <button type="button" onClick={onReview} className="min-w-[200px] rounded-[12px] bg-[#ff2f18] px-8 py-4 text-[17px] font-semibold text-white">Viết đánh giá</button> : null}{canCancelOrder(order) ? <button type="button" onClick={onCancel} className="min-w-[200px] rounded-[12px] border border-[#d7d7d7] bg-white px-8 py-4 text-[17px] font-semibold text-black">Hủy đơn hàng</button> : null}</div>
        </div>
    );
}

export default function UserOrdersPageClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeTab = resolveTab(searchParams.get('menu'));
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [ordersByTab, setOrdersByTab] = useState<UserOrdersByTab>(() => readStoredUserOrdersByTab());
    const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
    const [refundOrderId, setRefundOrderId] = useState<string | null>(null);
    const [reviewOrderId, setReviewOrderId] = useState<string | null>(null);

    const navigateToTab = (tab: OrderTabKey) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('menu', tab);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        setSelectedOrderId(null);
    };

    const activeOrders = useMemo(() => (activeTab === 'review' ? ordersByTab.purchased : ordersByTab[activeTab]), [activeTab, ordersByTab]);
    const selectedOrder = activeOrders.find((order) => order.id === selectedOrderId) ?? null;
    const cancellingOrder = ordersByTab.placed.find((order) => order.id === cancellingOrderId) ?? null;
    const refundOrder = ordersByTab.purchased.find((order) => order.id === refundOrderId) ?? null;
    const reviewOrder = ordersByTab.purchased.find((order) => order.id === reviewOrderId) ?? null;

    const handleCancel = (reason: string) => {
        if (!cancellingOrder) return;
        setOrdersByTab((current) => {
            const nextOrders = {
                ...current,
                placed: current.placed.filter((order) => order.id !== cancellingOrder.id),
                cancelled: [{ ...cancellingOrder, statusLabel: 'Đã hủy', cancelledReason: reason, cancelledBy: 'Người mua', cancelledAt: '27 - 03 - 2026 07:35 CH', refundStatus: 'Đã xử lý hoàn tiền' }, ...current.cancelled],
            };
            writeStoredUserOrdersByTab(nextOrders);
            return nextOrders;
        });
        setCancellingOrderId(null);
        navigateToTab('cancelled');
    };

    const handleRefund = (reason: string) => {
        if (!refundOrder) return;
        setOrdersByTab((current) => {
            const nextOrders = {
                ...current,
                purchased: current.purchased.filter((order) => order.id !== refundOrder.id),
                returned: [{ ...refundOrder, statusLabel: 'Chưa hoàn tiền', refundStatus: 'Chưa hoàn tiền', refundReason: reason, cancelledBy: 'Người mua', cancelledAt: '27 - 03 - 2026 07:35 CH', canRefund: false }, ...current.returned],
            };
            writeStoredUserOrdersByTab(nextOrders);
            return nextOrders;
        });
        setRefundOrderId(null);
        navigateToTab('returned');
    };

    const handleReview = (rating: number) => {
        if (!reviewOrder) return;
        setOrdersByTab((current) => {
            const nextOrders = {
                ...current,
                purchased: current.purchased.map((order) => order.id === reviewOrder.id ? { ...order, canReview: false, received: true, quickRating: rating } : order),
            };
            writeStoredUserOrdersByTab(nextOrders);
            return nextOrders;
        });
        setReviewOrderId(null);
    };

    useEffect(() => {
        const fallbackOrders = getDefaultUserOrdersByTab();
        if (ordersByTab.placed.length === 0 && ordersByTab.purchased.length === 0 && ordersByTab.cancelled.length === 0 && ordersByTab.returned.length === 0) {
            writeStoredUserOrdersByTab(fallbackOrders);
        }
    }, [ordersByTab]);

    const content = selectedOrder ? <DetailCard order={selectedOrder} onBack={() => setSelectedOrderId(null)} onCancel={() => setCancellingOrderId(selectedOrder.id)} onRefund={() => setRefundOrderId(selectedOrder.id)} onReview={() => setReviewOrderId(selectedOrder.id)} /> : activeOrders.length === 0 ? <div className="flex min-h-[520px] items-center justify-center rounded-[20px] bg-white px-7 text-center shadow-[0_8px_22px_rgba(0,0,0,0.03)]"><div><div className="mx-auto flex h-[96px] w-[96px] items-center justify-center rounded-[24px] bg-[#eef7ff] text-[28px] font-bold text-[#1d71e8]">ĐH</div><h2 className="mt-8 text-[22px] font-bold text-black">Bạn chưa có đơn hàng nào</h2><p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-[1.55] text-[#5f6f60]">Các đơn đang chuẩn bị, đang giao hoặc lịch sử đơn sẽ hiển thị tại đây để bạn theo dõi dễ hơn.</p></div></div> : <div className="space-y-5">{activeOrders.map((order) => <ListCard key={order.id} order={order} activeTab={activeTab} onDetail={() => setSelectedOrderId(order.id)} onCancel={() => setCancellingOrderId(order.id)} onRefund={() => setRefundOrderId(order.id)} onReview={() => setReviewOrderId(order.id)} />)}</div>;

    return (
        <div className="bg-[#f4f4f3] py-7">
            <section className="mx-auto grid w-full max-w-[1320px] gap-5 px-5 xl:grid-cols-[300px_minmax(0,1fr)]">
                <aside className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.03)]"><div className="border-b border-[#e2ece0] px-7 py-7 text-[21px] font-bold text-black">Đơn Hàng</div><div>{orderTabs.map((tab) => <button key={tab.key} type="button" onClick={() => navigateToTab(tab.key)} className={`flex w-full items-center border-b border-[#e2ece0] px-7 py-5 text-left text-[16px] transition ${activeTab === tab.key ? 'bg-[#edf9ec] font-bold text-[#2f6f25]' : 'text-black hover:bg-[#fafcf9]'}`}>{tab.label}</button>)}</div></aside>
                <div>{content}</div>
            </section>
            {cancellingOrder ? <CancelModal onClose={() => setCancellingOrderId(null)} onConfirm={handleCancel} /> : null}
            {refundOrder ? <RefundModal onClose={() => setRefundOrderId(null)} onConfirm={handleRefund} /> : null}
            {reviewOrder ? <ReviewModal order={reviewOrder} onClose={() => setReviewOrderId(null)} onConfirm={handleReview} /> : null}
        </div>
    );
}
