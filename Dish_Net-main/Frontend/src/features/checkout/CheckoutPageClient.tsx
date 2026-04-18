'use client';

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
    formatCurrency,
    getCartDiscount,
    readMockCart,
    type MockCart,
    type MockCartGroup,
    type MockCartItem,
    writeMockCart,
} from '@/components/Cart/mockCart';
import { homePageMockData } from '@/features/home/data';
import { prependPlacedOrders, type UserOrder } from '@/features/orders/data';

const SHIPPING_FEE_PER_STORE = 31000;

function ChevronLeftIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
            <path
                d="M15 5 8 12l7 7"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
            />
        </svg>
    );
}

function PencilIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path
                d="M4 20h4l10-10-4-4L4 16v4Zm9.5-13.5 4 4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.9"
            />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path
                d="M5 7h14M9 7V5h6v2m-7 3v7m4-7v7m4-7v7M7 7l1 12h8l1-12"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
            />
        </svg>
    );
}

function WalletIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path
                d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19v14H6.5A2.5 2.5 0 0 1 4 16.5v-9Zm0 0h12.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
            />
            <circle cx="15.5" cy="12" r="1.2" fill="currentColor" />
        </svg>
    );
}

function TicketIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path
                d="M7 6h10a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8a2 2 0 0 1 2-2Zm4 0v12"
                fill="none"
                stroke="currentColor"
                strokeDasharray="2 2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
            />
        </svg>
    );
}

function SelectChevronIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-[#6b7280]">
            <path
                d="m7 10 5 5 5-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-[#374151]">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.1" />
            <path d="m20 20-3.5-3.5" fill="none" stroke="currentColor" strokeWidth="2.1" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
        </svg>
    );
}

type CheckoutStoreGroup = MockCartGroup & {
    itemCount: number;
    subtotal: number;
    shipping: number;
    total: number;
};

type CheckoutMenuState = {
    groupId: string;
    groupName: string;
};

function parseMenuPrice(price: string) {
    const numericValue = Number(price.replace(/[^\d]/g, ''));
    return Number.isNaN(numericValue) ? 0 : numericValue;
}

function formatOrderTime(date: Date) {
    return new Intl.DateTimeFormat('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(date);
}

function formatOrderDateTime(date: Date) {
    const dateLabel = new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
    return `${dateLabel} ${formatOrderTime(date)}`;
}

function getGroupItemLabel(items: MockCartItem[]) {
    if (items.length === 0) return 'Đơn hàng mới';
    if (items.length === 1) return items[0].name;
    return `${items[0].name} và ${items.length - 1} món khác`;
}

function removeSelectedItemsFromCart(cart: MockCart) {
    return {
        groups: cart.groups
            .map((group) => {
                const items = group.items.filter((item) => !item.selected);

                return {
                    ...group,
                    items,
                    selected: items.length > 0 && items.every((item) => item.selected),
                };
            })
            .filter((group) => group.items.length > 0),
    };
}

function OrderItemRow({ item }: { item: MockCartItem }) {
    return (
        <article className="flex items-center gap-4 py-4">
            <img src={item.image} alt={item.name} className="h-[54px] w-[54px] rounded-[12px] object-cover" />
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[15px] text-black">
                    <h3 className="truncate font-medium">{item.name}</h3>
                    <button type="button" className="text-[#95a0b0] transition hover:text-[#5f6d82]" aria-label="Sửa món">
                        <PencilIcon />
                    </button>
                </div>
                <p className="mt-1 text-[14px] text-black">x{item.quantity}</p>
            </div>
            <button type="button" className="text-[#6b7280] transition hover:text-[#374151]" aria-label="Xóa món">
                <TrashIcon />
            </button>
            <div className="min-w-[88px] text-right text-[15px] font-medium text-black">{formatCurrency(item.price * item.quantity)}</div>
        </article>
    );
}

function OrderItemsCard({
    group,
    onOpenMenu,
}: {
    group: CheckoutStoreGroup;
    onOpenMenu: () => void;
}) {
    return (
        <section className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ececec] px-6 py-4">
                <div>
                    <h2 className="text-[18px] font-bold text-black">{group.name}</h2>
                    <p className="mt-1 text-[13px] text-[#68707c]">{group.itemCount} món đang chọn</p>
                </div>
                <div className="text-right text-[14px] text-[#4b5563]">
                    <div>Tạm tính: {formatCurrency(group.subtotal)}</div>
                    <div className="mt-1 font-semibold text-black">Tổng quán: {formatCurrency(group.total)}</div>
                </div>
            </div>

            <div className="divide-y divide-[#eeeeee] px-5">
                {group.items.map((item) => (
                    <OrderItemRow key={item.id} item={item} />
                ))}
            </div>

            <div className="border-t border-[#ececec] px-6 py-4 text-center">
                <button type="button" onClick={onOpenMenu} className="text-[16px] font-bold text-[#2185d5] transition hover:text-[#176ab1]">
                    Thêm món
                </button>
            </div>
        </section>
    );
}

function PaymentStoreCard({ group }: { group: CheckoutStoreGroup }) {
    return (
        <section className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <div className="border-b border-[#ececec] px-5 py-4 text-[17px] font-bold text-black">{group.name}</div>
            <div className="space-y-3 px-5 py-4 text-[15px] text-[#2d2d2d]">
                <div className="flex items-center justify-between gap-4">
                    <span>Tạm tính</span>
                    <span>{formatCurrency(group.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <span>Phí vận chuyển</span>
                    <span>{formatCurrency(group.shipping)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <span>Giảm giá</span>
                    <span>{formatCurrency(0)}</span>
                </div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-[#ececec] px-5 py-4">
                <span className="font-bold text-black">Tổng quán</span>
                <span className="text-[18px] font-bold text-black">{formatCurrency(group.total)}</span>
            </div>
        </section>
    );
}

function MenuModal({
    activeGroupName,
    activeCategoryId,
    menuQuery,
    onCategoryChange,
    onQueryChange,
    onAddItem,
    onClose,
}: {
    activeGroupName: string;
    activeCategoryId: string;
    menuQuery: string;
    onCategoryChange: (categoryId: string) => void;
    onQueryChange: (value: string) => void;
    onAddItem: (itemId: string) => void;
    onClose: () => void;
}) {
    const filteredMenuItems = homePageMockData.menu.items.filter((item) => {
        const matchesCategory = !activeCategoryId || item.categoryId === activeCategoryId;
        const matchesQuery = !menuQuery || item.name.toLowerCase().includes(menuQuery.toLowerCase());
        return matchesCategory && matchesQuery;
    });

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 py-6" onClick={onClose}>
            <div
                className="relative flex h-[min(84vh,760px)] w-full max-w-[1120px] overflow-hidden rounded-[22px] bg-white shadow-[0_22px_64px_rgba(0,0,0,0.18)]"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#111827] shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition hover:bg-[#f8fafc]"
                    aria-label="Đóng thực đơn"
                >
                    <CloseIcon />
                </button>

                <aside className="w-[210px] shrink-0 border-r border-[#ececec] px-6 py-10">
                    <h2 className="mb-1 text-[22px] font-bold text-[#ef3124]">{homePageMockData.menu.title}</h2>
                    <p className="mb-6 text-[12px] text-[#7e8797]">Thêm món cho đơn của {activeGroupName}</p>
                    <div className="space-y-3">
                        {homePageMockData.menu.categories.map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => onCategoryChange(category.id)}
                                className={`block rounded-[7px] px-3 py-1.5 text-left text-[14px] uppercase transition ${
                                    activeCategoryId === category.id ? 'bg-[#a4a8ae] font-bold text-white' : 'text-[#7e8797] hover:text-[#4e5560]'
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </aside>

                <div className="relative flex min-w-0 flex-1 flex-col px-6 pb-6 pt-6">
                    <div className="mr-12 flex h-[56px] items-center gap-3 rounded-[10px] border border-[#ededed] px-4">
                        <SearchIcon />
                        <input
                            value={menuQuery}
                            onChange={(event) => onQueryChange(event.target.value)}
                            placeholder="Tìm món"
                            className="w-full border-none text-[15px] text-[#6b7280] placeholder:text-[#9ca3af] focus:outline-none"
                        />
                    </div>

                    <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-3">
                        {homePageMockData.menu.categories
                            .filter((category) => !activeCategoryId || category.id === activeCategoryId)
                            .map((category) => {
                                const categoryItems = filteredMenuItems.filter((item) => item.categoryId === category.id);

                                if (categoryItems.length === 0) return null;

                                return (
                                    <section key={category.id} className="mb-5">
                                        <h3 className="mb-3 text-[15px] font-medium uppercase text-[#8b929c]">{category.label}</h3>
                                        <div>
                                            {categoryItems.map((item) => (
                                                <article
                                                    key={item.id}
                                                    className="grid grid-cols-[64px_minmax(0,1fr)_108px_40px] items-center gap-4 border-b border-[#f0f0f0] py-2.5"
                                                >
                                                    <img src={item.image} alt={item.name} className="h-[50px] w-[50px] rounded-[4px] object-cover" />
                                                    <div className="min-w-0">
                                                        <h4 className="truncate text-[16px] font-bold text-[#3b3b3b]">{item.name}</h4>
                                                        <p className="mt-0.5 line-clamp-2 text-[11px] text-[#6d6d6d]">{item.note}</p>
                                                    </div>
                                                    <div className="text-right text-[14px] font-bold text-[#2aa8f4]">{item.price}</div>
                                                    <button
                                                        type="button"
                                                        onClick={() => onAddItem(item.id)}
                                                        className="flex h-[28px] w-[28px] items-center justify-center rounded-[7px] bg-[#ff5a2c] text-[22px] leading-none text-white transition hover:bg-[#ef4b1d]"
                                                    >
                                                        +
                                                    </button>
                                                </article>
                                            ))}
                                        </div>
                                    </section>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPageClient() {
    const router = useRouter();
    const [cart, setCart] = useState<MockCart>(() => readMockCart());
    const [recipientName, setRecipientName] = useState('Vy');
    const [phone, setPhone] = useState('0123610243');
    const [address, setAddress] = useState('Clb Đà Nẵng, 143 Nguyễn Du, P.Bến Thành');
    const [driverNote, setDriverNote] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('VNPAY-QR');
    const [promoCode, setPromoCode] = useState('');
    const [menuState, setMenuState] = useState<CheckoutMenuState | null>(null);
    const [activeMenuCategory, setActiveMenuCategory] = useState(homePageMockData.menu.categories[0]?.id ?? '');
    const [menuQuery, setMenuQuery] = useState('');

    const selectedGroups = useMemo<CheckoutStoreGroup[]>(
        () =>
            cart.groups
                .map((group) => {
                    const items = group.items.filter((item) => item.selected);
                    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
                    const shipping = items.length > 0 ? SHIPPING_FEE_PER_STORE : 0;

                    return {
                        ...group,
                        items,
                        itemCount,
                        subtotal,
                        shipping,
                        total: subtotal + shipping,
                    };
                })
                .filter((group) => group.items.length > 0),
        [cart],
    );

    const subtotal = useMemo(() => selectedGroups.reduce((sum, group) => sum + group.subtotal, 0), [selectedGroups]);
    const shipping = useMemo(() => selectedGroups.reduce((sum, group) => sum + group.shipping, 0), [selectedGroups]);
    const discount = getCartDiscount();
    const total = subtotal + shipping - discount;

    const commitCart = (nextCart: MockCart) => {
        setCart(nextCart);
        writeMockCart(nextCart);
    };

    const handleAddMenuItem = (itemId: string) => {
        if (!menuState) return;

        const menuItem = homePageMockData.menu.items.find((item) => item.id === itemId);
        if (!menuItem) return;

        const nextCart = {
            groups: cart.groups.map((group) => {
                if (group.id !== menuState.groupId) return group;

                const existingItem = group.items.find((item) => item.id === menuItem.id);
                const items = existingItem
                    ? group.items.map((item) =>
                          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1, selected: true } : item,
                      )
                    : [
                          ...group.items,
                          {
                              id: menuItem.id,
                              name: menuItem.name,
                              price: parseMenuPrice(menuItem.price),
                              image: menuItem.image,
                              quantity: 1,
                              selected: true,
                          },
                      ];

                return {
                    ...group,
                    selected: true,
                    items,
                };
            }),
        };

        commitCart(nextCart);
    };

    const handlePlaceOrder = () => {
        if (selectedGroups.length === 0) return;

        const orderTimestamp = new Date();
        const newOrders: UserOrder[] = selectedGroups.map((group, index) => ({
            id: `placed-${Date.now()}-${index}`,
            storeName: group.name,
            itemName: getGroupItemLabel(group.items),
            quantity: group.itemCount,
            image: group.items[0]?.image ?? homePageMockData.orderPreview.image,
            unitPrice: formatCurrency(group.subtotal),
            totalPrice: formatCurrency(group.total),
            timeLabel: formatOrderTime(orderTimestamp),
            statusLabel: 'Chờ xác nhận',
            orderNumber: `${Date.now()}${index + 1}`,
            paymentMethod,
            customerName: recipientName,
            customerPhone: phone,
            customerAddress: address,
            activeStage: 'ordered',
            orderedAt: formatOrderDateTime(orderTimestamp),
            paidAt: formatOrderDateTime(orderTimestamp),
        }));

        prependPlacedOrders(newOrders);

        const nextCart = removeSelectedItemsFromCart(cart);
        commitCart(nextCart);
        router.push('/user/orders?menu=placed');
    };

    return (
        <>
            <div className="bg-[#f2f2f1]">
                <section className="mx-auto w-full max-w-[1160px] px-5 pb-14 pt-6 lg:px-8">
                    <div className="mb-6 flex items-center gap-3">
                        <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-full text-black transition hover:bg-white" aria-label="Quay lại trang chủ">
                            <ChevronLeftIcon />
                        </Link>
                        <h1 className="text-[28px] font-bold leading-none text-black lg:text-[30px]">Thanh toán</h1>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_320px]">
                        <div className="space-y-6">
                            <section className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                                <div className="border-b border-[#ececec] px-6 py-4 text-center text-[18px] font-bold text-black">
                                    Xác nhận thông tin giao hàng
                                </div>
                                <div className="space-y-4 px-6 py-5">
                                    <label className="block">
                                        <div className="mb-2 text-[13px] font-semibold text-[#a8adb7]">Tên người nhận</div>
                                        <input
                                            value={recipientName}
                                            onChange={(event) => setRecipientName(event.target.value)}
                                            className="h-[42px] w-full rounded-[10px] border border-[#e3e6eb] px-4 text-[14px] text-black outline-none transition focus:border-[#cfd6df]"
                                        />
                                    </label>
                                    <label className="block">
                                        <div className="mb-2 text-[13px] font-semibold text-[#a8adb7]">Số điện thoại</div>
                                        <input
                                            value={phone}
                                            onChange={(event) => setPhone(event.target.value)}
                                            className="h-[42px] w-full rounded-[10px] border border-[#e3e6eb] px-4 text-[14px] text-black outline-none transition focus:border-[#cfd6df]"
                                        />
                                    </label>
                                    <label className="block">
                                        <div className="mb-2 text-[13px] font-semibold text-[#a8adb7]">Địa chỉ</div>
                                        <input
                                            value={address}
                                            onChange={(event) => setAddress(event.target.value)}
                                            className="h-[42px] w-full rounded-[10px] border border-[#e3e6eb] px-4 text-[14px] text-black outline-none transition focus:border-[#cfd6df]"
                                        />
                                    </label>
                                    <label className="block">
                                        <div className="mb-2 text-[13px] font-semibold text-[#a8adb7]">Ghi chú cho tài xế</div>
                                        <input
                                            value={driverNote}
                                            onChange={(event) => setDriverNote(event.target.value)}
                                            placeholder="VD: Bác tài vui lòng gọi trước khi giao"
                                            className="h-[42px] w-full rounded-[10px] border border-[#e3e6eb] px-4 text-[14px] text-black outline-none transition placeholder:text-[#c8ccd3] focus:border-[#cfd6df]"
                                        />
                                    </label>
                                </div>
                            </section>

                            {selectedGroups.map((group) => (
                                <OrderItemsCard
                                    key={group.id}
                                    group={group}
                                    onOpenMenu={() => {
                                        setMenuState({ groupId: group.id, groupName: group.name });
                                        setActiveMenuCategory(homePageMockData.menu.categories[0]?.id ?? '');
                                        setMenuQuery('');
                                    }}
                                />
                            ))}
                        </div>

                        <aside className="space-y-6">
                            <section className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                                <div className="border-b border-[#ececec] px-5 py-4 text-[18px] font-bold leading-snug text-black">
                                    Hình thức thanh toán & ưu đãi
                                </div>
                                <div className="space-y-4 px-5 py-5">
                                    <div className="relative">
                                        <select
                                            value={paymentMethod}
                                            onChange={(event) => setPaymentMethod(event.target.value)}
                                            className="h-[46px] w-full appearance-none rounded-[10px] border border-[#d8dde4] bg-white pl-10 pr-10 text-[14px] text-[#495467] outline-none"
                                        >
                                            <option>VNPAY-QR</option>
                                            <option>Tiền mặt</option>
                                            <option>Ví điện tử</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#7d8898]">
                                            <WalletIcon />
                                        </div>
                                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                                            <SelectChevronIcon />
                                        </div>
                                    </div>

                                    <div className="rounded-[12px] border border-[#d8dde4] px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="text-[#6b7280]">
                                                <TicketIcon />
                                            </div>
                                            <input
                                                value={promoCode}
                                                onChange={(event) => setPromoCode(event.target.value)}
                                                placeholder="Nhập mã khuyến mãi"
                                                className="min-w-0 flex-1 text-[14px] text-black outline-none placeholder:text-[#a7afb9]"
                                            />
                                            <button type="button" className="text-[14px] font-bold text-[#2563eb] transition hover:text-[#1d4ed8]">
                                                Chọn mã
                                            </button>
                                        </div>
                                        <p className="mt-3 text-[12px] leading-5 text-[#7b8593]">Bạn có thể áp dụng nhiều mã giảm giá một lúc</p>
                                    </div>
                                </div>
                            </section>

                            {selectedGroups.map((group) => (
                                <PaymentStoreCard key={`payment-${group.id}`} group={group} />
                            ))}

                            <section className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                                <div className="border-b border-[#ececec] px-5 py-4 text-[18px] font-bold text-black">Tổng thanh toán</div>
                                <div className="space-y-3 px-5 py-4 text-[15px] text-[#2d2d2d]">
                                    <div className="flex items-center justify-between gap-4">
                                        <span>Tạm tính</span>
                                        <span>{formatCurrency(subtotal)}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <span>Phí vận chuyển</span>
                                        <span>{formatCurrency(shipping)}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <span>Giảm giá</span>
                                        <span>{formatCurrency(discount)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-4 border-t border-[#ececec] px-5 py-4">
                                    <span className="text-[18px] font-bold text-black">Tổng cộng</span>
                                    <span className="text-[19px] font-bold text-[#ef2018]">{formatCurrency(total)}</span>
                                </div>
                                <div className="px-5 pb-5">
                                    <button
                                        type="button"
                                        onClick={handlePlaceOrder}
                                        disabled={selectedGroups.length === 0}
                                        className="w-full rounded-[12px] bg-[#ef2018] py-3 text-[16px] font-bold text-white transition hover:bg-[#d91e17] disabled:cursor-not-allowed disabled:bg-[#e9a7a2]"
                                    >
                                        ĐẶT ĐƠN
                                    </button>
                                </div>
                            </section>
                        </aside>
                    </div>
                </section>
            </div>

            {menuState ? (
                <MenuModal
                    activeGroupName={menuState.groupName}
                    activeCategoryId={activeMenuCategory}
                    menuQuery={menuQuery}
                    onCategoryChange={setActiveMenuCategory}
                    onQueryChange={setMenuQuery}
                    onAddItem={handleAddMenuItem}
                    onClose={() => setMenuState(null)}
                />
            ) : null}
        </>
    );
}
