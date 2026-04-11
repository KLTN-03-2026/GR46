'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function LoginRequiredModal({
    isOpen,
    onClose,
    title = 'Đăng nhập để tiếp tục nhé',
}: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}) {
    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/45 px-4" onClick={onClose}>
            <div
                className="relative w-full max-w-[460px] rounded-[18px] bg-white px-6 pb-6 pt-7 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:max-w-[520px] sm:px-8 sm:pb-8 sm:pt-9"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-3 text-[34px] leading-none text-black transition hover:opacity-65 sm:right-5 sm:top-4 sm:text-[38px]"
                    aria-label="Đóng đăng nhập bắt buộc"
                >
                    ×
                </button>

                <h2 className="mx-auto max-w-[320px] text-center text-[28px] font-bold leading-tight text-[#172554] sm:max-w-[360px] sm:text-[34px]">
                    {title}
                </h2>

                <div className="mt-7 flex justify-center sm:mt-8">
                    <Link
                        href="/login"
                        className="inline-flex min-w-[170px] items-center justify-center rounded-full border border-[#cfd5df] px-7 py-3 text-[16px] font-bold text-[#1f2937] transition hover:bg-[#f8fafc] sm:min-w-[190px] sm:px-8 sm:text-[17px]"
                    >
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
}
