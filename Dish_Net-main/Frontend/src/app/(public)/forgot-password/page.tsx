'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, type KeyboardEvent, type ReactNode, useEffect, useMemo, useState } from 'react';

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

function AuthField({
    icon,
    placeholder,
    type,
    value,
    onChange,
    error,
    trailing,
    id,
}: {
    icon: ReactNode;
    placeholder: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    trailing?: ReactNode;
    id: string;
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

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (step === 2 && countdown > 0) {
            const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [step, countdown]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const errors = useMemo(
        () => ({
            email: email.trim() ? '' : 'Vui lòng điền vào mục này.',
            otp: otp.join('').length === 6 ? '' : 'Vui lòng nhập đầy đủ mã xác nhận.',
            newPassword: newPassword.trim() ? '' : 'Vui lòng điền vào mục này.',
            confirmPassword: !confirmPassword.trim()
                ? 'Vui lòng điền vào mục này.'
                : confirmPassword !== newPassword
                    ? 'Mật khẩu xác nhận chưa khớp.'
                    : '',
        }),
        [confirmPassword, email, newPassword, otp],
    );

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const nextOtp = [...otp];
        nextOtp[index] = value.slice(-1);
        setOtp(nextOtp);

        if (value && index < 5) {
            const next = document.getElementById(`otp-${index + 1}`);
            next?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && !otp[index] && index > 0) {
            const prev = document.getElementById(`otp-${index - 1}`);
            prev?.focus();
        }
    };

    const handleStep1 = (event: FormEvent) => {
        event.preventDefault();
        setSubmitted(true);

        if (errors.email) return;

        setCountdown(60);
        setSubmitted(false);
        setStep(2);
    };

    const handleStep2 = (event: FormEvent) => {
        event.preventDefault();
        setSubmitted(true);

        if (errors.otp) return;

        setSubmitted(false);
        setStep(3);
    };

    const handleStep3 = (event: FormEvent) => {
        event.preventDefault();
        setSubmitted(true);

        if (errors.newPassword || errors.confirmPassword) return;

        setShowSuccessModal(true);
    };

    return (
        <>
            <div className="flex w-full flex-1 items-center justify-center px-4 py-5 sm:py-8">
                <div className="w-full max-w-[430px] rounded-[18px] bg-white px-5 py-7 shadow-[0_10px_32px_rgba(0,0,0,0.08)] sm:px-7">
                    {step === 1 && (
                        <>
                            <h1 className="mb-5 text-center text-[22px] font-bold text-[#111827]">Quên Mật Khẩu</h1>
                            <form onSubmit={handleStep1} className="flex flex-col gap-3" noValidate>
                                <AuthField
                                    id="forgot-email"
                                    icon={<MailIcon />}
                                    placeholder="Nhập email của bạn"
                                    type="email"
                                    value={email}
                                    onChange={setEmail}
                                    error={submitted ? errors.email : ''}
                                />

                                <div className="text-right">
                                    <Link href="/register" className="text-[14px] text-[#3b82f6] transition hover:text-[#285E19]">
                                        Bạn chưa có tài khoản ?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-2 h-[46px] w-full rounded-[6px] bg-[#61AF5E] text-[15px] font-bold uppercase tracking-[0.04em] text-white transition hover:bg-[#4e9a4b]"
                                >
                                    Gửi
                                </button>
                            </form>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h1 className="mb-3 text-center text-[22px] font-bold text-[#111827]">Quên Mật Khẩu</h1>
                            <form onSubmit={handleStep2} className="flex flex-col items-center" noValidate>
                                <p className="mb-4 text-[14px] font-medium text-[#8a8f98]">Mã xác nhận</p>

                                <div className="flex gap-2">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(event) => handleOtpChange(index, event.target.value)}
                                            onKeyDown={(event) => handleOtpKeyDown(index, event)}
                                            className={`h-12 w-10 rounded-[8px] border text-center text-lg font-bold outline-none transition sm:w-11 ${
                                                submitted && errors.otp
                                                    ? 'border-[#ff6b6b] bg-[#fff8f8] text-[#ff4d4f]'
                                                    : 'border-[#dfe3e8] focus:border-[#61AF5E] focus:shadow-[0_0_0_3px_rgba(97,175,94,0.12)]'
                                            }`}
                                        />
                                    ))}
                                </div>

                                <div className="w-full">
                                    <FieldError message={submitted ? errors.otp : ''} />
                                </div>

                                <p className="mb-6 mt-2 text-center text-[13px] text-[#9aa1a9]">
                                    Mã xác nhận chỉ có hiệu lực trong vòng 01 tiếng.{' '}
                                    <span className="font-bold text-[#285E19]">{formatTime(countdown)}</span>
                                </p>

                                <button
                                    type="submit"
                                    className="h-[46px] w-full rounded-[6px] bg-[#61AF5E] text-[15px] font-bold uppercase tracking-[0.04em] text-white transition hover:bg-[#4e9a4b]"
                                >
                                    Gửi
                                </button>
                            </form>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h1 className="mb-5 text-center text-[22px] font-bold text-[#111827]">Quên Mật Khẩu</h1>
                            <form onSubmit={handleStep3} className="flex flex-col gap-3" noValidate>
                                <AuthField
                                    id="new-password"
                                    icon={<LockIcon />}
                                    placeholder="Mật khẩu mới"
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={setNewPassword}
                                    error={submitted ? errors.newPassword : ''}
                                    trailing={
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword((prev) => !prev)}
                                            className="cursor-pointer transition hover:text-[#285E19]"
                                            aria-label={showNewPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                        >
                                            <EyeIcon open={showNewPassword} />
                                        </button>
                                    }
                                />

                                <AuthField
                                    id="confirm-password"
                                    icon={<LockIcon />}
                                    placeholder="Xác nhận mật khẩu mới"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={setConfirmPassword}
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

                                <button
                                    type="submit"
                                    className="mt-2 h-[46px] w-full rounded-[6px] bg-[#61AF5E] text-[15px] font-bold uppercase tracking-[0.04em] text-white transition hover:bg-[#4e9a4b]"
                                >
                                    Đặt Lại
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>

            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="mx-4 w-full max-w-md rounded-xl bg-white p-10 text-center shadow-2xl">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-button/10">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#61AF5E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                        </div>
                        <h2 className="mb-6 text-xl font-bold text-green-primary">BẠN ĐÃ ĐỔI MẬT KHẨU THÀNH CÔNG</h2>
                        <button
                            onClick={() => router.push('/login')}
                            className="w-full rounded-lg bg-green-button py-3 text-lg font-bold tracking-wider text-white transition hover:bg-green-hover"
                        >
                            Đăng Nhập
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
