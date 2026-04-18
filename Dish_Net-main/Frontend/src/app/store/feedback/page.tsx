import StoreSidebar from '@/app/store/_components/StoreSidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DishNet - Quản lý phản hồi',
    description: 'Quản lý phản hồi cửa hàng trên DishNet',
};

export default function StoreFeedbackPage() {
    return (
        <div className="min-h-screen bg-[#f4f4f3] py-6">
            <div className="mx-auto flex w-full max-w-[1440px] gap-6 px-6">
                <StoreSidebar />
                <main className="min-w-0 flex-1">
                    <div className="flex min-h-[400px] items-center justify-center rounded-[16px] bg-white shadow-sm">
                        <p className="text-[18px] text-[#999]">Quản lý phản hồi — Đang phát triển...</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
