export type MockCartItem = {
    id: string;
    name: string;
    note?: string;
    price: number;
    image: string;
    quantity: number;
    selected: boolean;
};

export type MockCartGroup = {
    id: string;
    name: string;
    selected: boolean;
    items: MockCartItem[];
};

export type MockCart = {
    groups: MockCartGroup[];
};

const mockCartStorageKey = 'dishnet_mock_cart';
const cartUpdatedEvent = 'dishnet:mock-cart-updated';

const defaultCart: MockCart = {
    groups: [
        {
            id: 'net-hue',
            name: 'Nét Huế - Hàng Bông',
            selected: true,
            items: [
                {
                    id: 'bun-bo-1',
                    name: 'Bún bò Huế số 1',
                    price: 56000,
                    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=240&q=80',
                    quantity: 1,
                    selected: true,
                },
                {
                    id: 'bun-bo-2',
                    name: 'Bún bò Huế số 2',
                    price: 56000,
                    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=240&q=80',
                    quantity: 1,
                    selected: true,
                },
            ],
        },
        {
            id: 'nuoc',
            name: 'Nước',
            selected: false,
            items: [
                {
                    id: 'nuoc-1',
                    name: 'Nước số 1',
                    price: 56000,
                    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=240&q=80',
                    quantity: 1,
                    selected: false,
                },
                {
                    id: 'nuoc-2',
                    name: 'Nước số 2',
                    price: 56000,
                    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=240&q=80',
                    quantity: 1,
                    selected: false,
                },
            ],
        },
    ],
};

function cloneCart(cart: MockCart): MockCart {
    return JSON.parse(JSON.stringify(cart)) as MockCart;
}

function normalizeCart(cart: MockCart): MockCart {
    const fallback = getDefaultMockCart();

    return {
        groups: cart.groups.map((group) => {
            const fallbackGroup = fallback.groups.find((item) => item.id === group.id);

            return {
                ...group,
                name: fallbackGroup?.name ?? group.name,
                items: group.items.map((item) => {
                    const fallbackItem = fallbackGroup?.items.find((candidate) => candidate.id === item.id);

                    return {
                        ...item,
                        name: fallbackItem?.name ?? item.name,
                        image: fallbackItem?.image ?? item.image,
                    };
                }),
            };
        }),
    };
}

function emitCartUpdated() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(cartUpdatedEvent));
    }
}

export function getMockCartUpdatedEventName() {
    return cartUpdatedEvent;
}

export function formatCurrency(value: number) {
    return `${value.toLocaleString('vi-VN')}đ`;
}

export function getDefaultMockCart() {
    return cloneCart(defaultCart);
}

export function readMockCart(): MockCart {
    if (typeof window === 'undefined') {
        return getDefaultMockCart();
    }

    const savedCart = window.localStorage.getItem(mockCartStorageKey);
    if (!savedCart) {
        return getDefaultMockCart();
    }

    try {
        return normalizeCart(JSON.parse(savedCart) as MockCart);
    } catch {
        window.localStorage.removeItem(mockCartStorageKey);
        return getDefaultMockCart();
    }
}

export function writeMockCart(cart: MockCart) {
    window.localStorage.setItem(mockCartStorageKey, JSON.stringify(cart));
    emitCartUpdated();
}

export function ensureMockCart() {
    const cart = readMockCart();
    writeMockCart(cart);
    return cart;
}

export function toggleGroupSelection(cart: MockCart, groupId: string) {
    return {
        groups: cart.groups.map((group) => {
            if (group.id !== groupId) return group;

            const nextSelected = !group.selected;

            return {
                ...group,
                selected: nextSelected,
                items: group.items.map((item) => ({ ...item, selected: nextSelected })),
            };
        }),
    };
}

export function toggleItemSelection(cart: MockCart, groupId: string, itemId: string) {
    return {
        groups: cart.groups.map((group) => {
            if (group.id !== groupId) return group;

            const items = group.items.map((item) =>
                item.id === itemId ? { ...item, selected: !item.selected } : item,
            );

            return {
                ...group,
                items,
                selected: items.every((item) => item.selected),
            };
        }),
    };
}

export function updateItemQuantity(cart: MockCart, groupId: string, itemId: string, delta: number) {
    return {
        groups: cart.groups.map((group) => {
            if (group.id !== groupId) return group;

            return {
                ...group,
                items: group.items.map((item) =>
                    item.id === itemId
                        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                        : item,
                ),
            };
        }),
    };
}

export function toggleSelectAll(cart: MockCart) {
    const shouldSelectAll = !cart.groups.every((group) => group.selected);

    return {
        groups: cart.groups.map((group) => ({
            ...group,
            selected: shouldSelectAll,
            items: group.items.map((item) => ({ ...item, selected: shouldSelectAll })),
        })),
    };
}

export function clearCartSelection(cart: MockCart) {
    return {
        groups: cart.groups.map((group) => ({
            ...group,
            selected: false,
            items: group.items.map((item) => ({ ...item, selected: false })),
        })),
    };
}

export function getSelectedItemCount(cart: MockCart) {
    return cart.groups.reduce(
        (total, group) => total + group.items.reduce((groupTotal, item) => groupTotal + (item.selected ? item.quantity : 0), 0),
        0,
    );
}

export function getCartSubtotal(cart: MockCart) {
    return cart.groups.reduce(
        (total, group) => total + group.items.reduce((groupTotal, item) => groupTotal + (item.selected ? item.price * item.quantity : 0), 0),
        0,
    );
}

export function getCartShipping(cart: MockCart) {
    return getSelectedItemCount(cart) > 0 ? 31000 : 0;
}

export function getCartDiscount() {
    return 0;
}

export function getCartTotal(cart: MockCart) {
    return getCartSubtotal(cart) + getCartShipping(cart) - getCartDiscount();
}
