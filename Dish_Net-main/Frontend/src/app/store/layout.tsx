import { Suspense } from "react";
import Header from "@/components/Header/Header";

export const metadata = {
    title: "DishNet - Quản lý cửa hàng",
    description: "Bảng điều khiển quản lý cửa hàng trên DishNet",
};

export default function StoreLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Suspense fallback={null}>
                <Header />
            </Suspense>
            <main className="flex-1 flex flex-col bg-[#f4f4f3]">{children}</main>
        </>
    );
}
