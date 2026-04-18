import StoreSidebar from '@/app/store/_components/StoreSidebar';
import OverviewTab from '@/features/store-management/OverviewTab';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DishNet - Tổng quan cửa hàng',
    description: 'Tổng quan quản lý cửa hàng trên DishNet',
};

export default function StoreOverviewPage() {
    return (
        <div className="min-h-screen bg-[#f4f4f3] py-6">
            <div className="mx-auto flex w-full max-w-[1440px] gap-6 px-6">
                <StoreSidebar />
                <main className="min-w-0 flex-1">
                    <OverviewTab />
                </main>
            </div>
        </div>
    );
}
