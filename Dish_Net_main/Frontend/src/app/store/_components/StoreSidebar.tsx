'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type StoreTab = 'overview' | 'revenue' | 'menu' | 'orders' | 'feedback' | 'promotions';

const SIDEBAR_ITEMS: { key: StoreTab; label: string; href: string }[] = [
    { key: 'overview', label: 'Tổng quan', href: '/store' },
    { key: 'revenue', label: 'Quản lý doanh thu', href: '/store/revenue' },
    { key: 'menu', label: 'Quản lý menu', href: '/store/menu' },
    { key: 'orders', label: 'Đơn đặt hàng', href: '/store/orders' },
    { key: 'feedback', label: 'Quản lý phản hồi', href: '/store/feedback' },
    { key: 'promotions', label: 'Khuyến mãi', href: '/store/promotion' },
];

export default function StoreSidebar() {
    const pathname = usePathname();

    const isActive = (href: string, key: StoreTab): boolean => {
        if (key === 'overview') return pathname === '/store' || pathname === '/store/';
        return pathname.startsWith(href);
    };

    return (
        <aside className="w-[200px] shrink-0">
            <nav className="space-y-1">
                {SIDEBAR_ITEMS.map((item) => (
                    <Link
                        key={item.key}
                        href={item.href}
                        className={`relative flex w-full items-center rounded-r-[8px] px-4 py-2.5 text-left text-[14px] transition ${
                            isActive(item.href, item.key)
                                ? 'border-l-[3px] border-[#2e7d32] bg-transparent font-bold text-[#2e7d32]'
                                : 'border-l-[3px] border-transparent font-medium text-[#999] hover:text-black'
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
