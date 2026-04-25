'use client';

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { emitUserCartRefreshEvent } from '@/shared/cartEvents';
import { userCommerceApi } from '@/shared/userCommerceApi';

type CartItem = {
    id: number;
    name: string;
    note?: string | null;
    price: number;
    image: string;
    quantity: number;
    selected: boolean;
};

type CartGroup = {
    id: number;
    name: string;
    selected: boolean;
    items: CartItem[];
};

type CartModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

function formatCurrency(value: number) {
    return `${value.toLocaleString('vi-VN')}đ`;
}

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
    const [groups, setGroups] = useState<CartGroup[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadCart = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const payload: any = await userCommerceApi.layGioHang();
            const mappedGroups: CartGroup[] = Array.isArray(payload?.groups)
                ? payload.groups.map((group: any) => {
                    const items: CartItem[] = Array.isArray(group?.items)
                        ? group.items.map((item: any) => ({
                            id: Number(item.id),
                            name: String(item.ten_mon ?? 'Món ăn'),
                            note: item.ghi_chu ?? null,
                            price: Number(item.gia ?? 0),
                            image:
                                String(item.hinh_anh ?? '').trim() ||
                                'https://i.pravatar.cc/200',
                            quantity: Number(item.so_luong ?? 1),
                            selected: Boolean(item.duoc_chon),
                        }))
                        : [];
                    return {
                        id: Number(group.id_cua_hang),
                        name: String(group.ten_cua_hang ?? 'Cửa hàng'),
                        selected: items.length > 0 && items.every((item) => item.selected),
                        items,
                    };
                })
                : [];
            setGroups(mappedGroups);
            emitUserCartRefreshEvent();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Không tải được giỏ hàng');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isOpen) return;
        void loadCart();
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    const selectedCount = useMemo(
        () =>
            groups.reduce(
                (sum, group) =>
                    sum +
                    group.items.reduce(
                        (acc, item) => acc + (item.selected ? item.quantity : 0),
                        0,
                    ),
                0,
            ),
        [groups],
    );
    const subtotal = useMemo(
        () =>
            groups.reduce(
                (sum, group) =>
                    sum +
                    group.items.reduce(
                        (acc, item) =>
                            acc + (item.selected ? item.price * item.quantity : 0),
                        0,
                    ),
                0,
            ),
        [groups],
    );
    const allSelected =
        groups.length > 0 && groups.every((group) => group.items.every((item) => item.selected));

    const updateItem = async (
        itemId: number,
        body: { so_luong?: number; duoc_chon?: boolean },
    ) => {
        await userCommerceApi.capNhatGioHang(itemId, body);
        await loadCart();
    };

    const toggleGroupSelection = async (group: CartGroup) => {
        const nextSelected = !group.selected;
        await Promise.all(
            group.items.map((item) =>
                userCommerceApi.capNhatGioHang(item.id, { duoc_chon: nextSelected }),
            ),
        );
        await loadCart();
    };

    const toggleSelectAll = async () => {
        const nextSelected = !allSelected;
        const allItems = groups.flatMap((group) => group.items);
        await Promise.all(
            allItems.map((item) =>
                userCommerceApi.capNhatGioHang(item.id, { duoc_chon: nextSelected }),
            ),
        );
        await loadCart();
    };

    const clearCart = async () => {
        await userCommerceApi.xoaTatCaGioHang();
        await loadCart();
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
                            onClick={() => void clearCart()}
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
                    {isLoading ? (
                        <p className="py-10 text-center text-sm text-gray-500">Đang tải giỏ hàng...</p>
                    ) : error ? (
                        <p className="py-10 text-center text-sm text-red-500">{error}</p>
                    ) : (
                        <div className="space-y-4">
                            {groups.map((group) => (
                                <section key={group.id} className="rounded-[24px] bg-white px-7 py-5 shadow-[0_8px_22px_rgba(0,0,0,0.04)]">
                                    <div className="flex items-center gap-4 border-b border-[#ededed] pb-4">
                                        <Checkbox checked={group.selected} onChange={() => void toggleGroupSelection(group)} />
                                        <div className="flex items-center gap-3 text-[20px] font-semibold text-[#1f1f1f]">
                                            <span>🏪</span>
                                            <span>{group.name}</span>
                                        </div>
                                    </div>

                                    <div className="divide-y divide-[#ededed]">
                                        {group.items.map((item) => (
                                            <article key={item.id} className="flex items-center gap-5 py-5">
                                                <Checkbox checked={item.selected} onChange={() => void updateItem(item.id, { duoc_chon: !item.selected })} />
                                                <img src={item.image} alt={item.name} className="h-[86px] w-[86px] rounded-[16px] object-cover" />
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="truncate text-[18px] font-medium text-black">{item.name}</h3>
                                                    </div>
                                                    <p className="mt-2 text-[16px] font-semibold text-[#ff3b18]">{formatCurrency(item.price)}</p>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => void updateItem(item.id, { so_luong: Math.max(1, item.quantity - 1) })}
                                                        className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#fef1eb] text-[22px] text-[#8e6d63]"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="min-w-4 text-center text-[18px]">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => void updateItem(item.id, { so_luong: item.quantity + 1 })}
                                                        className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#e2231a] text-[22px] text-white"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={async () => {
                                                        await userCommerceApi.xoaItemGioHang(item.id);
                                                        await loadCart();
                                                    }}
                                                    className="ml-2 rounded-[8px] p-2 text-[#8f8f8f] transition hover:bg-[#f4f4f4] hover:text-[#444]"
                                                    aria-label="Xóa món"
                                                >
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M5 7h14M9 7V5h6v2m-7 3v7m4-7v7m4-7v7M7 7l1 12h8l1-12" />
                                                    </svg>
                                                </button>
                                            </article>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}
                </div>

                <div className="border-t border-[#e4e4e4] bg-white px-8 py-5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Checkbox checked={allSelected} onChange={() => void toggleSelectAll()} />
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
