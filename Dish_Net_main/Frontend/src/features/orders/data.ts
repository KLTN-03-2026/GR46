export type OrderTabKey = 'placed' | 'purchased' | 'cancelled' | 'returned' | 'review';
export type OrderStageKey = 'ordered' | 'preparing' | 'delivering' | 'delivered';
export type UserOrdersByTab = Record<OrderTabKey, UserOrder[]>;

export type UserOrder = {
    id: string;
    storeName: string;
    itemName: string;
    quantity: number;
    image: string;
    unitPrice: string;
    totalPrice: string;
    timeLabel: string;
    statusLabel: string;
    orderNumber: string;
    paymentMethod: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    activeStage?: OrderStageKey;
    cancelledReason?: string;
    orderedAt?: string;
    paidAt?: string;
    deliveredAt?: string;
    quickRating?: number;
    canRefund?: boolean;
    canReview?: boolean;
    received?: boolean;
    cancelledAt?: string;
    cancelledBy?: string;
    refundStatus?: string;
    refundReason?: string;
    refundAmount?: string;
    refundBankInfo?: string;
    items?: Array<{
        name: string;
        image: string;
        quantity: number;
        unitPrice: string;
        lineTotal: string;
        note?: string;
    }>;
    myReview?: {
        rating: number;
        content: string;
        isAnonymous: boolean;
        createdAt?: string;
        attachments?: string[];
    };
};

export const orderTabs: Array<{ key: OrderTabKey; label: string }> = [
    { key: 'placed', label: 'Đã đặt' },
    { key: 'purchased', label: 'Đã mua' },
    { key: 'cancelled', label: 'Đã hủy' },
    { key: 'returned', label: 'Trả hàng' },
    { key: 'review', label: 'Đánh giá' },
];

export const stageLabels: Array<{ key: OrderStageKey; label: string }> = [
    { key: 'ordered', label: 'Đã đặt hàng' },
    { key: 'preparing', label: 'Bếp đang chuẩn bị' },
    { key: 'delivering', label: 'Đang trên đường giao' },
    { key: 'delivered', label: 'Đã giao đơn hàng' },
];

export const cancelReasonOptions = [
    'Thay đổi ý định / không muốn mua nữa',
    'Muốn đổi món / đặt lại đơn khác',
    'Thời gian giao quá lâu',
    'Đặt nhầm đơn',
    'Giá cao / phí ship cao hơn dự kiến',
    'Nhập sai địa chỉ giao hàng',
];

export const refundReasonOptions = [
    'Món bị thiếu / giao sai',
    'Món không giống mô tả',
    'Thức ăn bị hỏng / có mùi lạ',
    'Quán tự hủy nhưng vẫn trừ tiền',
    'Không liên hệ được nhưng tự hủy đơn',
    'Shipper làm đổ món / hư món',
];
