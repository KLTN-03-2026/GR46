'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, type ReactNode, useMemo, useState } from 'react';

type RegisterForm = {
    email: string;
    phone: string;
    displayName: string;
    address: string;
    password: string;
    confirmPassword: string;
};

function FieldError({ message }: { message?: string }) {
    if (!message) return null;

    return <p className="mt-2 text-[13px] font-medium text-[#ff4d4f]">{message}</p>;
}

function EyeIcon({ open }: { open: boolean }) {
    return open ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function InputIcon({ type }: { type: 'mail' | 'phone' | 'user' | 'map' | 'lock' }) {
    if (type === 'mail') {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
        );
    }

    if (type === 'phone') {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
        );
    }

    if (type === 'user') {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        );
    }

    if (type === 'map') {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        );
    }

    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );
}

function AuthField({
    id,
    icon,
    placeholder,
    type,
    value,
    onChange,
    error,
    trailing,
}: {
    id: string;
    icon: ReactNode;
    placeholder: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    trailing?: ReactNode;
}) {
    return (
        <div>
            <div className={`flex h-[46px] items-center rounded-[6px] border bg-white px-3 transition ${error ? 'border-[#ff6b6b] bg-[#fff8f8]' : 'border-[#dfe3e8] focus-within:border-[#61AF5E] focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.12)]'}`}>
                <span className={`mr-2 shrink-0 ${error ? 'text-[#ff6b6b]' : 'text-[#b4bbc4]'}`}>{icon}</span>
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    className="h-full flex-1 border-none bg-transparent text-[14px] text-[#1f2937] placeholder:text-[#b8bfc8] focus:outline-none"
                />
                {trailing ? <div className={`ml-2 shrink-0 ${error ? 'text-[#ff6b6b]' : 'text-[#c0c6ce]'}`}>{trailing}</div> : null}
            </div>
            <FieldError message={error} />
        </div>
    );
}

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState<RegisterForm>({
        email: '',
        phone: '',
        displayName: '',
        address: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const errors = useMemo(
        () => ({
            email: form.email.trim() ? '' : 'Vui lòng điền vào mục này.',
            phone: form.phone.trim() ? '' : 'Vui lòng điền vào mục này.',
            displayName: form.displayName.trim() ? '' : 'Vui lòng điền vào mục này.',
            address: form.address.trim() ? '' : 'Vui lòng điền vào mục này.',
            password: form.password.trim() ? '' : 'Vui lòng điền vào mục này.',
            confirmPassword: !form.confirmPassword.trim()
                ? 'Vui lòng điền vào mục này.'
                : form.confirmPassword !== form.password
                    ? 'Mật khẩu xác nhận chưa khớp.'
                    : '',
        }),
        [form],
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);

        if (Object.values(errors).some(Boolean)) return;

        router.push('/register/verify');
    };

    return (
        <div className="flex w-full flex-1 items-center justify-center px-4 py-5 sm:py-8">
            <div className="w-full max-w-[430px] rounded-[18px] bg-white px-5 py-7 shadow-[0_10px_32px_rgba(0,0,0,0.08)] sm:px-7">
                <h1 className="mb-5 text-center text-[22px] font-bold text-[#111827]">Đăng Ký</h1>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
                    <AuthField
                        id="email"
                        icon={<InputIcon type="mail" />}
                        placeholder="Email"
                        type="email"
                        value={form.email}
                        onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
                        error={submitted ? errors.email : ''}
                    />

                    <AuthField
                        id="phone"
                        icon={<InputIcon type="phone" />}
                        placeholder="Số điện thoại"
                        type="tel"
                        value={form.phone}
                        onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
                        error={submitted ? errors.phone : ''}
                    />

                    <AuthField
                        id="displayName"
                        icon={<InputIcon type="user" />}
                        placeholder="Tên hiển thị"
                        type="text"
                        value={form.displayName}
                        onChange={(value) => setForm((prev) => ({ ...prev, displayName: value }))}
                        error={submitted ? errors.displayName : ''}
                    />

                    <AuthField
                        id="address"
                        icon={<InputIcon type="map" />}
                        placeholder="Khu vực / Địa chỉ"
                        type="text"
                        value={form.address}
                        onChange={(value) => setForm((prev) => ({ ...prev, address: value }))}
                        error={submitted ? errors.address : ''}
                    />

                    <AuthField
                        id="password"
                        icon={<InputIcon type="lock" />}
                        placeholder="Mật khẩu"
                        type={showPassword ? 'text' : 'password'}
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

                    <AuthField
                        id="confirmPassword"
                        icon={<InputIcon type="lock" />}
                        placeholder="Xác nhận mật khẩu"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={form.confirmPassword}
                        onChange={(value) => setForm((prev) => ({ ...prev, confirmPassword: value }))}
                        error={submitted ? errors.confirmPassword : ''}
                        trailing={
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="cursor-pointer transition hover:text-[#285E19]"
                                aria-label={showConfirmPassword ? 'Ẩn xác nhận mật khẩu' : 'Hiện xác nhận mật khẩu'}
                            >
                                <EyeIcon open={showConfirmPassword} />
                            </button>
                        }
                    />

                    <div className="pt-1 text-center text-[13px] text-[#9aa1a9]">
                        Đã có tài khoản?{' '}
                        <Link href="/login" className="font-medium text-[#3b82f6] transition hover:text-[#285E19]">
                            Đăng nhập
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="mt-3 h-[46px] w-full rounded-[6px] bg-[#61AF5E] text-[15px] font-bold uppercase tracking-[0.04em] text-white transition hover:bg-[#4e9a4b]"
                        id="register-submit-btn"
                    >
                        Đăng Ký
                    </button>
                </form>
            </div>
        </div>
    );
}
