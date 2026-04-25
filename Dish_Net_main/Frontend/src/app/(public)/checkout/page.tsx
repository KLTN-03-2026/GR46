import { Suspense } from 'react';
import CheckoutPageClient from '@/features/checkout/CheckoutPageClient';

export default function CheckoutPage() {
    return (
        <Suspense fallback={null}>
            <CheckoutPageClient />
        </Suspense>
    );
}
