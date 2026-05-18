'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function LoginRequiredModal({
    isOpen,
    onClose,
    title = 'Đăng nhập để tiếp tục nhé',
    returnUrl,
}: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    returnUrl?: string;
}) {
    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const loginHref = returnUrl
        ? `/login?redirect=${encodeURIComponent(returnUrl)}`
        : '/login';

    return (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/45 px-4" onClick={onClose}>
            <div className="relative w-full max-w-[460px] rounded-[18px] bg-white px-6 pb-6 pt-7 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:max-w-[520px] sm:px-8 sm:pb-8 sm:pt-9"
                onClick={(event) => event.stopPropagation()}>
                <button type="button" onClick={onClose}
                    className="absolute right-4 top-3 text-[34px] leading-none text-black transition hover:opacity-65 sm:right-5 sm:top-4 sm:text-[38px]"
                    aria-label="Đóng đăng nhập bắt buộc">×</button>
                <div className="flex flex-col items-center gap-2 pb-2 pt-1">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f0faf0] text-4xl">
                        🔐
                    </div>
                    <h2 className="mx-auto max-w-[320px] text-center text-[26px] font-bold leading-tight text-[#172554] sm:max-w-[360px] sm:text-[30px]">
                        {title}
                    </h2>
                    <p className="text-center text-sm text-[#6b7280]">
                        Đăng nhập để theo dõi reviewer, đặt món và tương tác với cộng đồng DishNet.
                    </p>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:mt-7">
                    <Link
                        href={loginHref}
                        className="inline-flex w-full items-center justify-center rounded-full bg-[#275d18] px-7 py-3.5 text-[16px] font-bold text-white transition hover:bg-[#1e4a12]"
                    >
                        Đăng nhập
                    </Link>
                    <Link
                        href={`/register${returnUrl ? `?redirect=${encodeURIComponent(returnUrl)}` : ''}`}
                        className="inline-flex w-full items-center justify-center rounded-full border border-[#d1d5db] px-7 py-3.5 text-[16px] font-medium text-[#374151] transition hover:bg-[#f9fafb]"
                    >
                        Tạo tài khoản mới
                    </Link>
                </div>
            </div>
        </div>
    );
}
