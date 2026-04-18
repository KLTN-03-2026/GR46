import { Suspense } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata = {
    title: "DishNet - Trợ giúp và hỗ trợ",
    description: "Trợ giúp và hỗ trợ - Gửi yêu cầu, liên hệ đội ngũ DishNet",
};

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Suspense fallback={null}>
                <Header />
            </Suspense>
            <main className="flex-1 flex flex-col bg-bg-light">{children}</main>
            <Footer />
        </>
    );
}
