import StoreSidebar from '@/app/store/_components/StoreSidebar';
import PromotionsTab from '@/features/store-management/PromotionsTab';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DishNet - Khuyến mãi',
    description: 'Quản lý khuyến mãi cửa hàng trên DishNet',
};

export default function StorePromotionPage() {
    return (
        <div className="min-h-screen bg-[#f4f4f3] py-6">
            <div className="mx-auto flex w-full max-w-[1440px] gap-6 px-6">
                <StoreSidebar />
                <main className="min-w-0 flex-1">
                    <PromotionsTab />
                </main>
            </div>
        </div>
    );
}
