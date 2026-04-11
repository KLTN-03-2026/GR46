'use client';

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    clearCartSelection,
    formatCurrency,
    getMockCartUpdatedEventName,
    getCartSubtotal,
    getSelectedItemCount,
    readMockCart,
    toggleGroupSelection,
    toggleItemSelection,
    toggleSelectAll,
    type MockCart,
    updateItemQuantity,
    writeMockCart,
} from '@/components/Cart/mockCart';

type CartModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

function Checkbox({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onChange}
            className={`flex h-7 w-7 items-center justify-center rounded-[7px] border transition ${
                checked ? 'border-[#10b981] bg-[#f0fdf4] text-[#10b981]' : 'border-[#cfcfcf] bg-white text-transparent'
            }`}
        >
            ✓
        </button>
    );
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
    const router = useRouter();
    const [cart, setCart] = useState<MockCart>(() => readMockCart());

    useEffect(() => {
        const handleCartUpdated = () => {
            setCart(readMockCart());
        };

        window.addEventListener(getMockCartUpdatedEventName(), handleCartUpdated);

        if (!isOpen) {
            return () => window.removeEventListener(getMockCartUpdatedEventName(), handleCartUpdated);
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener(getMockCartUpdatedEventName(), handleCartUpdated);
        };
    }, [isOpen]);

    const selectedCount = useMemo(() => getSelectedItemCount(cart), [cart]);
    const subtotal = useMemo(() => getCartSubtotal(cart), [cart]);
    const allSelected = cart.groups.length > 0 && cart.groups.every((group) => group.selected);

    const commitCart = (nextCart: MockCart) => {
        setCart(nextCart);
        writeMockCart(nextCart);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[90] bg-black/45" onClick={onClose}>
            <div
                className="absolute right-0 top-0 flex h-full w-full max-w-[860px] flex-col overflow-hidden bg-[#f4f4f3] shadow-[-20px_0_60px_rgba(0,0,0,0.18)]"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-[#e6e6e6] bg-white px-10 py-7">
                    <h2 className="text-[28px] font-bold text-black">Giỏ hàng của tôi ({selectedCount})</h2>
                    <div className="flex items-center gap-6">
                        <button
                            type="button"
                            onClick={() => commitCart(clearCartSelection(cart))}
                            className="text-[18px] font-semibold text-[#ff3b18] transition hover:opacity-75"
                        >
                            Xóa tất cả
                        </button>
                        <button type="button" onClick={onClose} className="text-[44px] leading-none text-black">
                            ×
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-8 py-6">
                    <div className="space-y-4">
                        {cart.groups.map((group) => (
                            <section key={group.id} className="rounded-[24px] bg-white px-7 py-5 shadow-[0_8px_22px_rgba(0,0,0,0.04)]">
                                <div className="flex items-center gap-4 border-b border-[#ededed] pb-4">
                                    <Checkbox checked={group.selected} onChange={() => commitCart(toggleGroupSelection(cart, group.id))} />
                                    <div className="flex items-center gap-3 text-[20px] font-semibold text-[#1f1f1f]">
                                        <span>🏪</span>
                                        <span>{group.name}</span>
                                    </div>
                                </div>

                                <div className="divide-y divide-[#ededed]">
                                    {group.items.map((item) => (
                                        <article key={item.id} className="flex items-center gap-5 py-5">
                                            <Checkbox checked={item.selected} onChange={() => commitCart(toggleItemSelection(cart, group.id, item.id))} />
                                            <img src={item.image} alt={item.name} className="h-[86px] w-[86px] rounded-[16px] object-cover" />
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="truncate text-[18px] font-medium text-black">{item.name}</h3>
                                                    <button type="button" className="text-[#8d98a8] transition hover:text-black">
                                                        ✎
                                                    </button>
                                                </div>
                                                <p className="mt-2 text-[16px] font-semibold text-[#ff3b18]">{formatCurrency(item.price)}</p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => commitCart(updateItemQuantity(cart, group.id, item.id, -1))}
                                                    className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#fef1eb] text-[22px] text-[#8e6d63]"
                                                >
                                                    -
                                                </button>
                                                <span className="min-w-4 text-center text-[18px]">{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => commitCart(updateItemQuantity(cart, group.id, item.id, 1))}
                                                    className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#e2231a] text-[22px] text-white"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>

                <div className="border-t border-[#e4e4e4] bg-white px-8 py-5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Checkbox checked={allSelected} onChange={() => commitCart(toggleSelectAll(cart))} />
                            <span className="text-[18px] text-[#1f1f1f]">Tất cả</span>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="text-[18px] text-[#2f2f2f]">
                                Tổng tiền: <span className="ml-3 text-[22px] font-bold text-[#ff3b18]">{formatCurrency(subtotal)}</span>
                            </div>
                            <button
                                type="button"
                                disabled={selectedCount === 0}
                                onClick={() => {
                                    onClose();
                                    router.push('/checkout');
                                }}
                                className="rounded-[12px] bg-[#e2231a] px-7 py-3 text-[18px] font-bold text-white transition hover:bg-[#cb1f17] disabled:cursor-not-allowed disabled:bg-[#efb2ae]"
                            >
                                Thanh toán ({selectedCount})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
