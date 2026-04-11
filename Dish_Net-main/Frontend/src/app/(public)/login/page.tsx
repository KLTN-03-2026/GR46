'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, type ReactNode, useMemo, useState } from 'react';

import { mockAccounts, type MockAccountType, writeMockSession } from '@/components/Auth/mockSession';

const accountOptions: Array<{
    type: MockAccountType;
    title: string;
    subtitle: string;
    description: string;
    gradient: string;
    previewLabel: string;
}> = [
    {
        type: 'user',
        title: 'Đi Ăn Thôi',
        subtitle: 'Tài khoản người dùng',
        description: 'Dùng để xem bảng tin, khám phá quán, theo dõi review và trải nghiệm luồng mua hàng.',
        gradient: 'from-green-300 to-green-500',
        previewLabel: 'UX cho user',
    },
    {
        type: 'store',
        title: 'Nét Huế - Hàng Bông',
        subtitle: 'Tài khoản cửa hàng',
        description: 'Dùng để xem giao diện phía cửa hàng trong app, vào trang cửa hàng mẫu và kiểm tra các màn public theo ngữ cảnh chủ quán.',
        gradient: 'from-orange-300 to-red-400',
        previewLabel: 'UX cho cửa hàng',
    },
];

type LoginFields = {
    email: string;
    password: string;
};

function EyeIcon({ open }: { open: boolean }) {
    return open ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );
}

function FieldError({ message }: { message?: string }) {
    if (!message) return null;

    return <p className="mt-2 text-[13px] font-medium text-[#ff4d4f]">{message}</p>;
}

function AuthField({
    icon,
    type,
    placeholder,
    value,
    onChange,
    error,
    trailing,
    id,
}: {
    icon: ReactNode;
    type: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    trailing?: ReactNode;
    id: string;
}) {
    return (
        <div>
            <div className={`flex h-[48px] items-center rounded-[6px] border bg-white px-3 transition ${error ? 'border-[#ff6b6b] bg-[#fff8f8]' : 'border-[#d8dde3] focus-within:border-[#61AF5E] focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.12)]'}`}>
                <span className={`mr-2 shrink-0 ${error ? 'text-[#ff6b6b]' : 'text-[#a7adb4]'}`}>{icon}</span>
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="h-full flex-1 border-none bg-transparent text-[15px] text-[#1f2937] placeholder:text-[#b8bfc8] focus:outline-none"
                />
                {trailing ? <div className={`ml-2 shrink-0 ${error ? 'text-[#ff6b6b]' : 'text-[#8b95a1]'}`}>{trailing}</div> : null}
            </div>
            <FieldError message={error} />
        </div>
    );
}

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState<LoginFields>({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
    const [selectedAccountType, setSelectedAccountType] = useState<MockAccountType>('user');
    const [submitted, setSubmitted] = useState(false);

    const errors = useMemo(
        () => ({
            email: form.email.trim() ? '' : 'Vui lòng điền vào mục này.',
            password: form.password.trim() ? '' : 'Vui lòng điền vào mục này.',
        }),
        [form],
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);

        if (errors.email || errors.password) return;

        setShowAccountSwitcher(true);
    };

    const loginAs = (accountType: MockAccountType) => {
        writeMockSession(mockAccounts[accountType]);
        setShowAccountSwitcher(false);
        router.push(accountType === 'store' ? '/store' : '/');
    };

    return (
        <>
            <div className="flex w-full flex-1 items-center justify-center px-4 py-6 sm:py-10">
                <div className="w-full max-w-[520px] rounded-[18px] bg-white px-6 py-8 shadow-[0_10px_32px_rgba(0,0,0,0.08)] sm:px-10">
                    <h1 className="mb-6 text-center text-[22px] font-bold text-[#111827] sm:text-[24px]">Đăng Nhập</h1>

                    <form className="flex flex-col" onSubmit={handleSubmit} noValidate>
                        <div className="space-y-4">
                            <AuthField
                                id="login-email"
                                icon={<MailIcon />}
                                type="text"
                                placeholder="Tên đăng nhập hoặc Email"
                                value={form.email}
                                onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
                                error={submitted ? errors.email : ''}
                            />

                            <AuthField
                                id="login-password"
                                icon={<LockIcon />}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Mật khẩu"
                                value={form.password}
                                onChange={(value) => setForm((prev) => ({ ...prev, password: value }))}
                                error={submitted ? errors.password : ''}
                                trailing={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="cursor-pointer transition hover:text-[#285E19]"
                                        aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                    >
                                        <EyeIcon open={showPassword} />
                                    </button>
                                }
                            />
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                            <label className="flex items-center gap-2 text-[14px] text-[#7b8087]">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(event) => setRememberMe(event.target.checked)}
                                    className="h-4 w-4 accent-[#61AF5E]"
                                />
                                Lưu thông tin đăng nhập
                            </label>
                            <Link href="/forgot-password" className="text-[14px] font-medium text-[#3b82f6] transition hover:text-[#285E19]">
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <div className="mt-2 text-right">
                            <Link href="/register" className="text-[14px] text-[#3b82f6] transition hover:text-[#285E19]">
                                Bạn chưa có tài khoản ?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 h-[46px] w-full rounded-[6px] bg-[#61AF5E] text-[16px] font-bold uppercase tracking-[0.04em] text-white transition hover:bg-[#4e9a4b]"
                            id="login-submit-btn"
                        >
                            Đăng Nhập
                        </button>

                        <p className="mt-4 text-center text-[13px] text-[#8a8f98]">Hoặc đăng nhập bằng</p>

                        <button
                            type="button"
                            className="mt-3 h-[44px] w-full rounded-[6px] bg-[#ef3b2d] text-[15px] font-bold text-white transition hover:bg-[#dc2f21]"
                        >
                            Google
                        </button>
                    </form>
                </div>
            </div>

            {showAccountSwitcher && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                        <h2 className="mb-2 text-center text-xl font-bold text-black">Chọn kiểu tài khoản để fake đăng nhập</h2>
                        <p className="mb-6 text-center text-sm leading-6 text-[#6b7280]">
                            Bạn có thể vào thử ngay cả luồng người dùng lẫn luồng cửa hàng để kiểm tra UI/UX.
                        </p>
                        <div className="mb-6 h-px bg-gray-200" />

                        <div className="space-y-3">
                            {accountOptions.map((account) => (
                                <button
                                    key={account.type}
                                    onClick={() => setSelectedAccountType(account.type)}
                                    className={`w-full rounded-2xl border-2 p-4 text-left transition ${
                                        selectedAccountType === account.type
                                            ? 'border-green-button bg-green-button/5 shadow-[0_10px_30px_rgba(97,175,94,0.15)]'
                                            : 'border-transparent hover:border-green-button hover:bg-green-button/5'
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${account.gradient} text-white`}>
                                            {account.type === 'user' ? (
                                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            ) : (
                                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                                    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                                                    <rect width="20" height="5" x="2" y="7" rx="1" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-lg font-bold text-black">{account.title}</p>
                                                    <p className="text-sm font-medium text-[#6b7280]">{account.subtitle}</p>
                                                </div>
                                                <span className="rounded-full bg-[#f3f7f2] px-3 py-1 text-xs font-bold text-[#2f7d32]">
                                                    {account.previewLabel}
                                                </span>
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-[#6b7280]">{account.description}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => loginAs(selectedAccountType)}
                            className="mt-6 w-full rounded-xl bg-green-button py-4 text-base font-bold tracking-wide text-white transition hover:bg-green-hover"
                        >
                            VÀO VỚI {selectedAccountType === 'store' ? 'TÀI KHOẢN CỬA HÀNG' : 'TÀI KHOẢN NGƯỜI DÙNG'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
