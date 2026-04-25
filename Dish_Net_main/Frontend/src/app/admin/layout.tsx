import Sidebar from "@/components/Admin/Sidebar";
import AdminHeader from "@/components/Admin/AdminHeader";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <AdminHeader />
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 bg-admin-bg overflow-y-auto w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
