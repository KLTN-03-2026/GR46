'use client';

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
    cancelReasonOptions,
    orderTabs,
    refundReasonOptions,
    stageLabels,
    type OrderTabKey,
    type UserOrder,
    type UserOrdersByTab,
} from '@/features/orders/data';
import { userCommerceApi } from '@/shared/userCommerceApi';
import { useToast } from '@/shared/toast';

const validOrderTabs: OrderTabKey[] = ['placed', 'purchased', 'cancelled', 'returned', 'review'];

function resolveTab(searchParam: string | null): OrderTabKey {
    return validOrderTabs.includes(searchParam as OrderTabKey) ? (searchParam as OrderTabKey) : 'placed';
}

function canCancelOrder(order: UserOrder) {
    return order.statusLabel === 'Chờ xác nhận';
}

function formatCurrency(value: number) {
    return `${value.toLocaleString('vi-VN')}đ`;
}

function formatDateTime(value?: string | null) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleString('vi-VN');
}

function formatTime(value?: string | null) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

function mapTrangThaiSangStage(status?: string): UserOrder['activeStage'] {
    if (!status) return undefined;
    if (status === 'cho_xac_nhan') return 'ordered';
    if (status === 'da_xac_nhan' || status === 'dang_chuan_bi') return 'preparing';
    if (status === 'dang_giao') return 'delivering';
    if (status === 'da_giao' || status === 'da_hoan_tien') return 'delivered';
    return undefined;
}

function Icon({ label, tone }: { label: string; tone?: 'green' | 'blue' | 'gray' }) {
    const styles = {
        green: 'bg-[#eef6eb] text-[#2f6f25]',
        blue: 'bg-[#eef3ff] text-[#1d71e8]',
        gray: 'bg-[#f3f5f4] text-[#5a635a]',
    };
    return <span className={`flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold ${styles[tone ?? 'green']}`}>{label}</span>;
}

function ActionModal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
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

function RefundModal({
    onClose,
    onConfirm,
    error,
}: {
    onClose: () => void;
    onConfirm: (reason: string, bankInfo: string) => void;
    error?: string | null;
}) {
    const [reason, setReason] = useState(refundReasonOptions[0]);
    const [bankInfo, setBankInfo] = useState('');
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
            <div className="mt-4">
                <label className="mb-2 block text-[14px] font-medium text-black">
                    Tài khoản ngân hàng nhận hoàn tiền
                </label>
                <input
                    value={bankInfo}
                    onChange={(event) => setBankInfo(event.target.value)}
                    placeholder="Ví dụ: VCB - 123456789 - NGUYEN VAN A"
                    className="h-[44px] w-full rounded-[12px] border border-[#e8edf1] px-4 text-[14px] text-black outline-none"
                />
                {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
            </div>
            <div className="mt-6 flex justify-center">
                <button
                    type="button"
                    onClick={() => onConfirm(reason, bankInfo.trim())}
                    className="rounded-[10px] bg-[#299a2e] px-10 py-3 text-[16px] font-bold text-white"
                >
                    Gửi yêu cầu
                </button>
            </div>
        </ActionModal>
    );
}

function ReviewModal({
    order,
    onClose,
    onConfirm,
}: {
    order: UserOrder;
    onClose: () => void;
    onConfirm: (payload: {
        rating: number;
        content: string;
        isAnonymous: boolean;
        attachments: string[];
    }) => void;
}) {
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [attachments, setAttachments] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = () => {
        const normalizedContent = content.trim();
        if (!rating) {
            setError('Vui lòng chọn số sao đánh giá.');
            return;
        }
        if (!normalizedContent) {
            setError('Vui lòng nhập nội dung đánh giá.');
            return;
        }
        setError(null);
        onConfirm({
            rating,
            content: normalizedContent,
            isAnonymous,
            attachments: attachments.map(
                (file) =>
                    `https://cdn.dishnet.local/reviews/${encodeURIComponent(file.name)}`,
            ),
        });
    };

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
                <label className="mt-3 flex h-[62px] w-full cursor-pointer items-center justify-center rounded-[16px] border border-[#cfcfcf] bg-[#ececec] text-[14px] font-medium text-black">
                    {attachments.length > 0
                        ? `Đã chọn ${attachments.length} tệp`
                        : 'Chọn ảnh / video'}
                    <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                        onChange={(event) =>
                            setAttachments(
                                event.target.files ? Array.from(event.target.files) : [],
                            )
                        }
                    />
                </label>

                <label className="mt-4 flex items-center gap-3 text-[14px] text-[#3d3d3d]">
                    <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(event) => setIsAnonymous(event.target.checked)}
                        className="h-4 w-4 rounded-full border border-[#bdbdbd]"
                    />
                    Đăng ẩn danh
                </label>
                {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="rounded-[14px] bg-[#299a2e] px-14 py-3 text-[16px] font-bold text-white"
                >
                    Gửi
                </button>
            </div>
        </ActionModal>
    );
}

function ListCard({ order, activeTab, onDetail, onCancel, onRefund, onReview, onReorder, onQuickRate }: { order: UserOrder; activeTab: OrderTabKey; onDetail: () => void; onCancel: () => void; onRefund: () => void; onReview: () => void; onReorder: () => void; onQuickRate: (rating: number) => void }) {
    return (
        <article className="rounded-[18px] bg-white px-6 py-5 shadow-[0_8px_22px_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-3"><Icon label="CH" /><h3 className="text-[20px] font-semibold text-black">{order.storeName}</h3></div>
                <p className="text-[15px] text-[#494949]">
                    {order.timeLabel} {activeTab === 'returned' && order.refundStatus ? order.refundStatus : order.statusLabel}
                </p>
            </div>
            <div className="mt-5 grid grid-cols-[84px_minmax(0,1fr)_150px] items-center gap-5">
                <img src={order.image} alt={order.itemName} className="h-[72px] w-[72px] rounded-[16px] object-cover" />
                <div><div className="text-[17px] text-black">{order.itemName}</div><div className="mt-1 text-[16px] font-semibold text-black">x{order.quantity}</div></div>
                <div className="text-right"><div className="text-[16px] text-black">{order.unitPrice}</div><div className="mt-3 text-[16px] text-black">Tổng: <span className="ml-3">{order.totalPrice}</span></div></div>
            </div>
            {activeTab === 'purchased' && order.canReview ? (
                <div className="mt-4 flex items-center justify-end gap-2">
                    <span className="mr-2 text-[13px] text-[#5f6f60]">Đánh giá nhanh:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => onQuickRate(star)}
                            className="text-[22px] leading-none text-[#f6b600] transition hover:scale-110"
                            aria-label={`Đánh giá ${star} sao`}
                        >
                            ★
                        </button>
                    ))}
                </div>
            ) : null}
            <div className="mt-5 flex justify-end gap-4">
                <button type="button" onClick={onDetail} className="min-w-[190px] rounded-full border border-[#d7d7d7] bg-white px-6 py-2.5 text-[15px] font-semibold text-black">Xem chi tiết đơn</button>
                {activeTab === 'review' ? <button type="button" onClick={onReview} className="min-w-[160px] rounded-full bg-[#ff2f18] px-6 py-2.5 text-[14px] font-semibold text-white">{order.canReview ? 'Thêm đánh giá' : 'Xem / sửa đánh giá'}</button> : null}
                {activeTab === 'purchased' && order.canReview ? <button type="button" onClick={onReview} className="min-w-[160px] rounded-full bg-[#ff2f18] px-6 py-2.5 text-[14px] font-semibold text-white">Viết đánh giá</button> : null}
                {activeTab === 'purchased' && order.canRefund ? <button type="button" onClick={onRefund} className="min-w-[160px] rounded-full border border-[#d7d7d7] bg-[#f7f7f7] px-6 py-2.5 text-[14px] font-semibold text-black">Yêu cầu hoàn tiền</button> : null}
                {activeTab === 'cancelled' || activeTab === 'returned' ? <button type="button" onClick={onReorder} className="min-w-[140px] rounded-full border border-[#44aa4b] bg-[#e7f3e4] px-6 py-2.5 text-[14px] font-semibold text-[#2d992f]">Mua lại</button> : null}
                {activeTab === 'placed' ? <button type="button" onClick={onCancel} disabled={!canCancelOrder(order)} className={`min-w-[160px] rounded-full border px-6 py-2.5 text-[14px] font-semibold ${canCancelOrder(order) ? 'border-[#d7d7d7] bg-white text-[#4a4a4a]' : 'cursor-not-allowed border-[#d7d7d7] bg-[#f1f1f1] text-[#a8a8a8]'}`}>Hủy đơn hàng</button> : null}
            </div>
        </article>
    );
}
function DetailCard({
    order,
    onBack,
    onCancel,
    onRefund,
    onReview,
    onReorder,
}: {
    order: UserOrder;
    onBack: () => void;
    onCancel: () => void;
    onRefund: () => void;
    onReview: () => void;
    onReorder: () => void;
}) {
    const stageIndex = stageLabels.findIndex((stage) => stage.key === order.activeStage);

    return (
        <div className="rounded-[20px] bg-white px-7 py-6 shadow-[0_8px_22px_rgba(0,0,0,0.03)]">
            <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-3 text-[18px] text-black"
            >
                <span className="text-[28px]">←</span>
                <span className="font-medium">Đơn Hàng : {order.storeName}</span>
            </button>

            {stageIndex >= 0 && !order.refundStatus && order.statusLabel !== 'Đã hủy' ? (
                <div className="mx-auto mt-8 max-w-[620px]">
                    <div className="relative flex items-center justify-between">
                        <div className="absolute left-[34px] right-[34px] top-5 h-[6px] rounded-full bg-[#ececec]" />
                        <div
                            className="absolute left-[34px] top-5 h-[6px] rounded-full bg-[#64d8e6]"
                            style={{ width: `${Math.max(0, stageIndex) * 33.33}%` }}
                        />
                        {stageLabels.map((stage, index) => (
                            <div
                                key={stage.key}
                                className="relative z-10 flex w-[132px] flex-col items-center text-center"
                            >
                                <div
                                    className={`flex h-[40px] w-[40px] items-center justify-center rounded-full border-[3px] text-[13px] font-bold ${
                                        index === stageIndex
                                            ? 'border-[#2dc6cf] bg-[#2dc6cf] text-white'
                                            : index < stageIndex
                                              ? 'border-[#d6f5f7] bg-[#d6f5f7] text-[#63d3dd]'
                                              : 'border-[#ececec] bg-white text-[#a5a5a5]'
                                    }`}
                                >
                                    {index === stageIndex ? 'GH' : '•'}
                                </div>
                                <div
                                    className={`mt-3 text-[14px] leading-[1.25] ${
                                        index <= stageIndex
                                            ? 'text-[#54cdd9]'
                                            : 'text-[#b5b5b5]'
                                    }`}
                                >
                                    {stage.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}

            <div className="mt-8 border-t border-[#dbdbdb] pt-6">
                <div className="flex items-start gap-3">
                    <Icon label="ĐC" tone="blue" />
                    <div>
                        <div className="text-[18px] font-bold text-black">
                            {order.customerName}{' '}
                            <span className="font-semibold text-[#b8b8b8]">
                                {order.customerPhone}
                            </span>
                        </div>
                        <div className="mt-2 text-[16px] text-black">{order.customerAddress}</div>
                    </div>
                </div>
            </div>

            <div className="mt-7 border-t border-[#dbdbdb] pt-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-[18px] font-semibold text-black">
                        <Icon label="CH" />
                        <span>{order.storeName}</span>
                    </div>
                    {order.canRefund ? (
                        <button
                            type="button"
                            onClick={onRefund}
                            className="rounded-full border border-[#d7d7d7] bg-[#f7f7f7] px-8 py-2.5 text-[15px] font-semibold text-black"
                        >
                            Yêu cầu hoàn tiền
                        </button>
                    ) : null}
                </div>

                <div className="mt-4 space-y-4 border-b border-[#dbdbdb] pb-4">
                    {(order.items && order.items.length > 0
                        ? order.items
                        : [
                              {
                                  name: order.itemName,
                                  image: order.image,
                                  quantity: order.quantity,
                                  unitPrice: order.unitPrice,
                                  lineTotal: order.totalPrice,
                              },
                          ]
                    ).map((item, index) => (
                        <div
                            key={`${item.name}-${index}`}
                            className="grid grid-cols-[94px_minmax(0,1fr)_150px] items-center gap-5"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-[76px] w-[76px] rounded-[16px] object-cover"
                            />
                            <div>
                                <div className="text-[17px] text-black">{item.name}</div>
                                <div className="mt-1 text-[16px] font-semibold text-black">
                                    x{item.quantity}
                                </div>
                                {item.note ? (
                                    <div className="mt-1 text-[13px] text-[#6b7280]">
                                        Ghi chú: {item.note}
                                    </div>
                                ) : null}
                            </div>
                            <div className="text-right text-[16px] text-black">
                                {item.unitPrice}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end border-b border-[#dbdbdb] py-3 text-[16px] text-black">
                    <span>Tổng:</span>
                    <span className="ml-10">{order.totalPrice}</span>
                </div>

                <div className="space-y-5 pt-5 text-[16px] text-black">
                    <div className="flex items-center justify-between">
                        <span>Số đơn hàng</span>
                        <div className="flex items-center gap-3">
                            <span>{order.orderNumber}</span>
                            <Icon label="ID" tone="gray" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Phương thức thanh toán</span>
                        <span>{order.paymentMethod}</span>
                    </div>
                    {order.orderedAt ? (
                        <div className="flex items-center justify-between">
                            <span>Ngày đặt đơn</span>
                            <span>{order.orderedAt}</span>
                        </div>
                    ) : null}
                    {order.paidAt ? (
                        <div className="flex items-center justify-between">
                            <span>Thời gian thanh toán</span>
                            <span>{order.paidAt}</span>
                        </div>
                    ) : null}
                    {order.deliveredAt ? (
                        <div className="flex items-center justify-between">
                            <span>Ngày giao hàng</span>
                            <span>{order.deliveredAt}</span>
                        </div>
                    ) : null}
                    {order.cancelledBy ? (
                        <div className="flex items-center justify-between">
                            <span>{order.refundReason ? 'Người yêu cầu' : 'Người yêu cầu hủy'}</span>
                            <span>{order.cancelledBy}</span>
                        </div>
                    ) : null}
                    {order.cancelledAt ? (
                        <div className="flex items-center justify-between">
                            <span>{order.refundReason ? 'Thời gian gửi yêu cầu' : 'Thời gian yêu cầu hủy'}</span>
                            <span>{order.cancelledAt}</span>
                        </div>
                    ) : null}
                    {order.cancelledReason ? (
                        <div className="flex items-center justify-between">
                            <span>Lý do hủy</span>
                            <span>{order.cancelledReason}</span>
                        </div>
                    ) : null}
                    {order.refundReason ? (
                        <div className="flex items-center justify-between">
                            <span>Lý do trả hàng / hoàn tiền</span>
                            <span>{order.refundReason}</span>
                        </div>
                    ) : null}
                    {order.refundBankInfo ? (
                        <div className="flex items-center justify-between">
                            <span>Tài khoản nhận hoàn tiền</span>
                            <span>{order.refundBankInfo}</span>
                        </div>
                    ) : null}
                    {order.refundStatus ? (
                        <div className="flex items-center justify-between">
                            <span>Trạng thái hoàn tiền</span>
                            <span>{order.refundStatus}</span>
                        </div>
                    ) : null}
                    {order.refundAmount ? (
                        <div className="flex items-center justify-between">
                            <span>Tổng số tiền hoàn</span>
                            <span>{order.refundAmount}</span>
                        </div>
                    ) : null}
                </div>
            </div>

            {order.myReview ? (
                <div className="mt-6 rounded-[14px] border border-[#e7ece7] bg-[#f8fbf8] px-5 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="text-[16px] font-semibold text-black">Đánh giá của bạn</div>
                        <div className="text-[20px] leading-none text-[#f6b600]">
                            {'★'.repeat(Math.max(0, Math.min(5, order.myReview.rating)))}
                            <span className="text-[#d0d5d0]">
                                {'★'.repeat(Math.max(0, 5 - Math.max(0, Math.min(5, order.myReview.rating))))}
                            </span>
                        </div>
                    </div>
                    {order.myReview.createdAt ? (
                        <p className="mt-1 text-[12px] text-[#6b7280]">{order.myReview.createdAt}</p>
                    ) : null}
                    <p className="mt-3 text-[14px] text-black">{order.myReview.content}</p>
                    {order.myReview.isAnonymous ? (
                        <p className="mt-2 text-[12px] text-[#6b7280]">Đăng ẩn danh</p>
                    ) : null}
                    {order.myReview.attachments && order.myReview.attachments.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {order.myReview.attachments.map((url, index) => (
                                <a
                                    key={`${url}-${index}`}
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-[8px] border border-[#dfe5df] bg-white px-3 py-1 text-[12px] text-[#2f6f25]"
                                >
                                    Tệp {index + 1}
                                </a>
                            ))}
                        </div>
                    ) : null}
                </div>
            ) : null}

            <div className="mt-8 flex justify-center gap-6">
                <button
                    type="button"
                    onClick={onReorder}
                    className="min-w-[180px] rounded-[12px] bg-[#e5e5e5] px-8 py-4 text-[17px] font-semibold text-black"
                >
                    Mua lại
                </button>
                {order.canReview ? (
                    <button
                        type="button"
                        onClick={onReview}
                        className="min-w-[200px] rounded-[12px] bg-[#ff2f18] px-8 py-4 text-[17px] font-semibold text-white"
                    >
                        Viết đánh giá
                    </button>
                ) : null}
                {canCancelOrder(order) ? (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="min-w-[200px] rounded-[12px] border border-[#d7d7d7] bg-white px-8 py-4 text-[17px] font-semibold text-black"
                    >
                        Hủy đơn hàng
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default function UserOrdersPageClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const toast = useToast();
    const activeTab = resolveTab(searchParams.get('menu'));
    const paymentNotice = searchParams.get('payment');
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [ordersByTab, setOrdersByTab] = useState<UserOrdersByTab>({
        placed: [],
        purchased: [],
        cancelled: [],
        returned: [],
        review: [],
    });
    const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
    const [refundOrderId, setRefundOrderId] = useState<string | null>(null);
    const [reviewOrderId, setReviewOrderId] = useState<string | null>(null);
    const [detailOrder, setDetailOrder] = useState<UserOrder | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);

    useEffect(() => {
        if (refundOrderId) {
            setActionError(null);
        }
    }, [refundOrderId]);

    const navigateToTab = (tab: OrderTabKey) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('menu', tab);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        setSelectedOrderId(null);
        setDetailOrder(null);
        setActionError(null);
    };

    const mapListOrder = useCallback((item: any): UserOrder => {
        const statusDb = String(item?.trang_thai_db ?? '');
        const tongTien = Number(item?.tong_tien_don_hang ?? 0);
        const soLuong = Number(item?.so_luong_mon ?? 0);
        const trangThaiHoanTien = item?.trang_thai_hoan_tien;
        const statusLabel =
            trangThaiHoanTien === 'da_hoan_tien'
                ? 'Đã hoàn tiền'
                : trangThaiHoanTien === 'chua_hoan_tien'
                  ? 'Chưa hoàn tiền'
                  : String(item?.trang_thai_don_hang ?? '');
        return {
            id: String(item?.ma_don_hang ?? item?.id ?? ''),
            storeName: String(item?.ten_cua_hang ?? 'Cửa hàng'),
            itemName: String(item?.ten_mon ?? 'Món ăn'),
            quantity: soLuong,
            image: String(item?.hinh_anh_mon ?? 'https://i.pravatar.cc/200'),
            unitPrice: formatCurrency(Math.round(tongTien / Math.max(soLuong, 1))),
            totalPrice: formatCurrency(tongTien),
            timeLabel: formatTime(item?.thoi_gian_dat),
            statusLabel,
            orderNumber: String(item?.ma_don_hang ?? ''),
            paymentMethod: 'VNPAY',
            customerName: '',
            customerPhone: '',
            customerAddress: '',
            activeStage: mapTrangThaiSangStage(statusDb),
            orderedAt: formatDateTime(item?.thoi_gian_dat),
            deliveredAt: formatDateTime(item?.thoi_gian_giao),
            canRefund: Boolean(item?.co_the_hoan_tien),
            canReview: Boolean(item?.co_the_danh_gia),
            received: Boolean(item?.da_danh_gia),
            refundStatus:
                trangThaiHoanTien === 'da_hoan_tien'
                    ? 'Đã hoàn tiền'
                    : trangThaiHoanTien === 'chua_hoan_tien'
                      ? 'Chưa hoàn tiền'
                      : undefined,
            refundAmount:
                item?.so_tien_hoan_tien != null
                    ? formatCurrency(Number(item.so_tien_hoan_tien))
                    : undefined,
        };
    }, []);

    const mapDetailOrder = useCallback((item: any): UserOrder => {
        const monList = Array.isArray(item?.danh_sach_mon) ? item.danh_sach_mon : [];
        const lichSu = Array.isArray(item?.lich_su) ? item.lich_su : [];
        const firstMon = monList[0] ?? {};
        const monItems = monList.map((mon: any) => {
            const donGia = Number(mon?.don_gia ?? 0);
            const soLuong = Number(mon?.so_luong ?? 0);
            const thanhTien = Number(mon?.thanh_tien ?? donGia * soLuong);
            return {
                name: String(mon?.ten_mon ?? 'Món ăn'),
                image: String(mon?.hinh_anh ?? 'https://i.pravatar.cc/200'),
                quantity: soLuong,
                unitPrice: formatCurrency(donGia),
                lineTotal: formatCurrency(thanhTien),
                note: mon?.ghi_chu ? String(mon.ghi_chu) : undefined,
            };
        });
        const tongSoLuong = monList.reduce(
            (sum: number, mon: any) => sum + Number(mon?.so_luong ?? 0),
            0,
        );
        const tongThanhToan = Number(item?.tong_tien?.tong_thanh_toan ?? 0);
        const statusDb = String(item?.trang_thai_db ?? '');
        const payment = item?.thanh_toan;
        const lyDoTraHangRaw = String(item?.ly_do_tra_hang ?? '');
        const [lyDoTraHang, thongTinTaiKhoanHoanTien] = lyDoTraHangRaw
            ? lyDoTraHangRaw.split('| Tai khoan hoan tien:').map((part) => part.trim())
            : ['', ''];
        const yeuCauTraHang = [...lichSu]
            .reverse()
            .find((log: any) => log?.trang_thai_den === 'tra_hang');
        const nguoiHuyMap: Record<string, string> = {
            nguoi_mua: 'Người mua',
            cua_hang: 'Cửa hàng',
            he_thong: 'Hệ thống',
        };

        return {
            id: String(item?.ma_don_hang ?? ''),
            storeName: String(item?.thong_tin_cua_hang?.ten_cua_hang ?? 'Cửa hàng'),
            itemName: String(firstMon?.ten_mon ?? 'Món ăn'),
            quantity: tongSoLuong,
            image: String(firstMon?.hinh_anh ?? 'https://i.pravatar.cc/200'),
            unitPrice: formatCurrency(Number(firstMon?.don_gia ?? 0)),
            totalPrice: formatCurrency(tongThanhToan),
            timeLabel: formatTime(item?.thoi_gian_dat),
            statusLabel: String(item?.trang_thai_don_hang ?? ''),
            orderNumber: String(item?.ma_don_hang ?? ''),
            paymentMethod: String(payment?.phuong_thuc ?? 'vnpay').toUpperCase(),
            customerName: String(item?.thong_tin_nguoi_nhan?.ten_hien_thi ?? ''),
            customerPhone: String(item?.thong_tin_nguoi_nhan?.so_dien_thoai ?? ''),
            customerAddress: String(item?.thong_tin_nguoi_nhan?.dia_chi_giao ?? ''),
            activeStage: mapTrangThaiSangStage(statusDb),
            cancelledReason: item?.ly_do_huy ?? undefined,
            orderedAt: formatDateTime(item?.thoi_gian_dat),
            paidAt: formatDateTime(payment?.thoi_gian_thanh_toan),
            deliveredAt: formatDateTime(item?.thoi_gian_giao),
            canRefund: statusDb === 'da_giao',
            canReview: statusDb === 'da_giao' && !item?.danh_gia_cua_toi,
            received: Boolean(item?.danh_gia_cua_toi),
            cancelledAt:
                formatDateTime(item?.thoi_gian_huy) ||
                formatDateTime(yeuCauTraHang?.thoi_gian_cap_nhat) ||
                undefined,
            cancelledBy:
                (item?.nguoi_huy
                    ? nguoiHuyMap[String(item.nguoi_huy)] ?? String(item.nguoi_huy)
                    : undefined) || (lyDoTraHang ? 'Người mua' : undefined),
            refundStatus:
                payment?.trang_thai === 'da_hoan_tien'
                    ? 'Đã hoàn tiền'
                    : statusDb === 'tra_hang'
                      ? 'Chưa hoàn tiền'
                      : undefined,
            refundAmount:
                payment?.so_tien_hoan_tien != null
                    ? formatCurrency(Number(payment.so_tien_hoan_tien))
                    : undefined,
            refundReason: lyDoTraHang || undefined,
            refundBankInfo: thongTinTaiKhoanHoanTien || undefined,
            items: monItems,
            myReview: item?.danh_gia_cua_toi
                ? {
                      rating: Number(item.danh_gia_cua_toi.so_sao ?? 0),
                      content: String(item.danh_gia_cua_toi.noi_dung ?? ''),
                      isAnonymous: Boolean(item.danh_gia_cua_toi.an_danh),
                      createdAt: formatDateTime(item.danh_gia_cua_toi.ngay_tao),
                      attachments: Array.isArray(item.danh_gia_cua_toi.tep_dinh_kem)
                          ? item.danh_gia_cua_toi.tep_dinh_kem
                          : [],
                  }
                : undefined,
        };
    }, []);

    const loadOrders = useCallback(async () => {
        setIsLoading(true);
        setLoadError(null);
        try {
            const tabs: OrderTabKey[] = ['placed', 'purchased', 'cancelled', 'returned', 'review'];
            const entries = await Promise.all(
                tabs.map(async (tab) => {
                    const payload: any = await userCommerceApi.layDanhSachDonHang({ tab });
                    const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
                    return [tab, rows.map(mapListOrder)] as const;
                }),
            );

            setOrdersByTab({
                placed: entries.find(([key]) => key === 'placed')?.[1] ?? [],
                purchased: entries.find(([key]) => key === 'purchased')?.[1] ?? [],
                cancelled: entries.find(([key]) => key === 'cancelled')?.[1] ?? [],
                returned: entries.find(([key]) => key === 'returned')?.[1] ?? [],
                review: entries.find(([key]) => key === 'review')?.[1] ?? [],
            });
        } catch (error) {
            setLoadError(
                error instanceof Error ? error.message : 'Không tải được danh sách đơn hàng',
            );
        } finally {
            setIsLoading(false);
        }
    }, [mapListOrder]);

    useEffect(() => {
        void loadOrders();
    }, [loadOrders]);

    const activeOrders = useMemo(() => ordersByTab[activeTab], [activeTab, ordersByTab]);
    const selectedOrder = detailOrder ?? activeOrders.find((order) => order.id === selectedOrderId) ?? null;
    const cancellingOrder = ordersByTab.placed.find((order) => order.id === cancellingOrderId) ?? null;
    const refundOrder = ordersByTab.purchased.find((order) => order.id === refundOrderId) ?? null;
    const reviewOrder =
        [...ordersByTab.purchased, ...ordersByTab.review].find(
            (order) => order.id === reviewOrderId,
        ) ?? null;

    useEffect(() => {
        if (!selectedOrderId) {
            setDetailOrder(null);
            return;
        }
        const run = async () => {
            try {
                const payload: any = await userCommerceApi.layChiTietDonHang(selectedOrderId);
                setDetailOrder(mapDetailOrder(payload));
            } catch {
                setDetailOrder(null);
            }
        };
        void run();
    }, [selectedOrderId, mapDetailOrder]);

    const handleCancel = async (reason: string) => {
        if (!cancellingOrder) return;
        try {
            setActionError(null);
            await userCommerceApi.huyDonHang(cancellingOrder.id, reason);
            setCancellingOrderId(null);
            await loadOrders();
            navigateToTab('cancelled');
        } catch (error) {
            setActionError(error instanceof Error ? error.message : 'Không hủy được đơn hàng');
        }
    };

    const handleRefund = async (reason: string, bankInfo: string) => {
        if (!refundOrder) return;
        if (!bankInfo.trim()) {
            const message = 'Vui lòng nhập tài khoản ngân hàng nhận hoàn tiền.';
            setActionError(message);
            toast.error(message);
            return;
        }
        try {
            setActionError(null);
            await userCommerceApi.yeuCauHoanTien(refundOrder.id, {
                ly_do: reason,
                thong_tin_tai_khoan_hoan_tien: bankInfo.trim(),
            });
            setRefundOrderId(null);
            toast.success('Đã gửi yêu cầu hoàn tiền.');
            await loadOrders();
            navigateToTab('returned');
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Không gửi được yêu cầu hoàn tiền';
            setActionError(message);
            toast.error(message);
        }
    };

    const handleReview = async (payload: {
        rating: number;
        content: string;
        isAnonymous: boolean;
        attachments: string[];
    }) => {
        if (!reviewOrder) return;
        try {
            setActionError(null);
            await userCommerceApi.danhGiaDonHang(reviewOrder.id, {
                so_sao: payload.rating,
                noi_dung: payload.content,
                an_danh: payload.isAnonymous,
                tep_dinh_kem: payload.attachments,
            });
            setReviewOrderId(null);
            await loadOrders();
        } catch (error) {
            setActionError(
                error instanceof Error ? error.message : 'Không gửi được đánh giá',
            );
        }
    };

    const handleQuickRating = async (order: UserOrder, rating: number) => {
        if (!order.canReview) return;
        try {
            setActionError(null);
            await userCommerceApi.danhGiaDonHang(order.id, {
                so_sao: rating,
                noi_dung: `Đánh giá nhanh ${rating} sao`,
                an_danh: false,
                tep_dinh_kem: [],
            });
            await loadOrders();
        } catch (error) {
            setActionError(
                error instanceof Error ? error.message : 'Không gửi được đánh giá nhanh',
            );
        }
    };

    const handleReorder = async (order: UserOrder) => {
        try {
            setActionError(null);
            await userCommerceApi.muaLaiDonHang(order.id);
            router.push('/checkout');
        } catch (error) {
            setActionError(error instanceof Error ? error.message : 'Không thể mua lại đơn');
        }
    };

    const content = isLoading ? (
        <div className="flex min-h-[520px] items-center justify-center rounded-[20px] bg-white px-7 text-center shadow-[0_8px_22px_rgba(0,0,0,0.03)]">
            <p className="text-[16px] text-[#5f6f60]">Đang tải dữ liệu đơn hàng...</p>
        </div>
    ) : loadError ? (
        <div className="flex min-h-[520px] items-center justify-center rounded-[20px] bg-white px-7 text-center shadow-[0_8px_22px_rgba(0,0,0,0.03)]">
            <p className="text-[16px] text-red-500">{loadError}</p>
        </div>
    ) : selectedOrder ? (
        <DetailCard
            order={selectedOrder}
            onBack={() => setSelectedOrderId(null)}
            onCancel={() => setCancellingOrderId(selectedOrder.id)}
            onRefund={() => setRefundOrderId(selectedOrder.id)}
            onReview={() => setReviewOrderId(selectedOrder.id)}
            onReorder={() => void handleReorder(selectedOrder)}
        />
    ) : activeOrders.length === 0 ? (
        <div className="flex min-h-[520px] items-center justify-center rounded-[20px] bg-white px-7 text-center shadow-[0_8px_22px_rgba(0,0,0,0.03)]"><div><div className="mx-auto flex h-[96px] w-[96px] items-center justify-center rounded-[24px] bg-[#eef7ff] text-[28px] font-bold text-[#1d71e8]">ĐH</div><h2 className="mt-8 text-[22px] font-bold text-black">Bạn chưa có đơn hàng nào</h2><p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-[1.55] text-[#5f6f60]">Các đơn đang chuẩn bị, đang giao hoặc lịch sử đơn sẽ hiển thị tại đây để bạn theo dõi dễ hơn.</p></div></div>
    ) : (
        <div className="space-y-5">{activeOrders.map((order) => <ListCard key={order.id} order={order} activeTab={activeTab} onDetail={() => setSelectedOrderId(order.id)} onCancel={() => setCancellingOrderId(order.id)} onRefund={() => setRefundOrderId(order.id)} onReview={() => setReviewOrderId(order.id)} onReorder={() => void handleReorder(order)} onQuickRate={(rating) => void handleQuickRating(order, rating)} />)}</div>
    );

    return (
        <div className="bg-[#f4f4f3] py-7">
            {paymentNotice === 'success' ? (
                <section className="mx-auto mb-4 w-full max-w-[1320px] px-5">
                    <div className="rounded-[12px] border border-[#bce3be] bg-[#edf9ec] px-4 py-3 text-[14px] font-medium text-[#2f6f25]">
                        Thanh toán thành công. Đơn hàng của bạn đã được tạo.
                    </div>
                </section>
            ) : null}
            <section className="mx-auto grid w-full max-w-[1320px] gap-5 px-5 xl:grid-cols-[300px_minmax(0,1fr)]">
                <aside className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.03)]"><div className="border-b border-[#e2ece0] px-7 py-7 text-[21px] font-bold text-black">Đơn Hàng</div><div>{orderTabs.map((tab) => <button key={tab.key} type="button" onClick={() => navigateToTab(tab.key)} className={`flex w-full items-center border-b border-[#e2ece0] px-7 py-5 text-left text-[16px] transition ${activeTab === tab.key ? 'bg-[#edf9ec] font-bold text-[#2f6f25]' : 'text-black hover:bg-[#fafcf9]'}`}>{tab.label}</button>)}</div></aside>
            <div>{content}</div>
            </section>
            {actionError && !refundOrder ? (
                <section className="mx-auto mt-4 w-full max-w-[1320px] px-5">
                    <p className="text-sm text-red-500">{actionError}</p>
                </section>
            ) : null}
            {cancellingOrder ? <CancelModal onClose={() => setCancellingOrderId(null)} onConfirm={handleCancel} /> : null}
            {refundOrder ? (
                <RefundModal
                    onClose={() => setRefundOrderId(null)}
                    onConfirm={handleRefund}
                    error={actionError}
                />
            ) : null}
            {reviewOrder ? <ReviewModal order={reviewOrder} onClose={() => setReviewOrderId(null)} onConfirm={handleReview} /> : null}
        </div>
    );
}
