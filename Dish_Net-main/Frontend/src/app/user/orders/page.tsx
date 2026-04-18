import { Suspense } from 'react';

import UserOrdersPageClient from '@/features/orders/UserOrdersPageClient';

export const metadata = {
    title: 'DishNet - Đơn hàng',
    description: 'Theo dõi trạng thái đơn hàng của bạn trên DishNet',
};

export default function UserOrdersPage() {
    return (
        <Suspense fallback={null}>
            <UserOrdersPageClient />
        </Suspense>
    );
}
