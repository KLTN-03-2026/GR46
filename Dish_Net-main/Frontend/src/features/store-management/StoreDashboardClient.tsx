import StoreSidebar from '@/app/store/_components/StoreSidebar';

export default function StoreDashboardClient() {
    return (
        <div className="min-h-screen bg-[#f4f4f3] py-6">
            <div className="mx-auto flex w-full max-w-[1440px] gap-6 px-6">
                <StoreSidebar />
                <main className="min-w-0 flex-1" />
            </div>
        </div>
    );
}
