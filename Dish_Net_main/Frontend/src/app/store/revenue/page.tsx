import StoreSidebar from '@/app/store/_components/StoreSidebar';
import RevenueTab from '@/features/store-management/RevenueTab';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DishNet - Quản lý doanh thu',
    description: 'Quản lý doanh thu cửa hàng trên DishNet',
};

export default function StoreRevenuePage() {
    return (
        <div className="min-h-screen bg-[#f4f4f3] py-6">
            <div className="mx-auto flex w-full max-w-[1440px] gap-6 px-6">
                <StoreSidebar />
                <main className="min-w-0 flex-1">
                    <RevenueTab />
                </main>
            </div>
        </div>
    );
}
