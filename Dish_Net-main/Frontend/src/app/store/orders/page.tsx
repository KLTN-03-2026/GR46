import StoreSidebar from '@/app/store/_components/StoreSidebar';
import OrdersTab from '@/features/store-management/OrdersTab';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DishNet - Đơn đặt hàng',
    description: 'Quản lý đơn đặt hàng cửa hàng trên DishNet',
};

export default function StoreOrdersPage() {
    return (
        <div className="min-h-screen bg-[#f4f4f3] py-6">
            <div className="mx-auto flex w-full max-w-[1440px] gap-6 px-6">
                <StoreSidebar />
                <main className="min-w-0 flex-1">
                    <OrdersTab />
                </main>
            </div>
        </div>
    );
}
