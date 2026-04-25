'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import UserQuickActions from '@/components/UserQuickActions/UserQuickActions';

export default function PublicLayoutClient({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isMessagesRoute = pathname.startsWith('/messages');

    if (isMessagesRoute) {
        return (
            <div className="grid h-dvh grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
                <Suspense fallback={null}>
                    <Header />
                </Suspense>
                <main className="min-h-0 overflow-hidden">{children}</main>
            </div>
        );
    }

    return (
        <>
            <Suspense fallback={null}>
                <Header />
            </Suspense>
            <main className="flex flex-1 flex-col">{children}</main>
            <UserQuickActions />
            <Footer />
        </>
    );
}
