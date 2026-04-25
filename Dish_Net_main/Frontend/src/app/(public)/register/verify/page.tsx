'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, type KeyboardEvent, useEffect, useState } from 'react';
import { authApi } from '@/shared/authApi';

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="mt-2 text-[13px] font-medium text-[#ff4d4f]">{message}</p>;
}

export default function RegisterVerifyPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [countdown, setCountdown] = useState(60);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        const savedEmail = sessionStorage.getItem('register_email');
        if (!savedEmail) {
            router.replace('/register');
            return;
        }
        setEmail(savedEmail);
    }, [router]);

    useEffect(() => {
        if (countdown > 0 && !showSuccessModal) {
            const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [countdown, showSuccessModal]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const otpError = otp.join('').length === 6 ? '' : 'Vui lòng nhập đầy đủ mã xác nhận.';

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const nextOtp = [...otp];
        nextOtp[index] = value.slice(-1);
        setOtp(nextOtp);
        if (value && index < 5) {
            document.getElementById(`reg-otp-${index + 1}`)?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`reg-otp-${index - 1}`)?.focus();
        }
    };

    const handleResend = async () => {
        try {
            await authApi.guiLaiOtp({ email, loai_xac_thuc: 'dang_ky' });
            setCountdown(60);
        } catch {}
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setSubmitted(true);
        setServerError('');
        if (otpError) return;

        setLoading(true);
        try {
            await authApi.xacNhanDangKy({ email, ma_otp: otp.join('') });
            sessionStorage.removeItem('register_email');
            setShowSuccessModal(true);
        } catch (err: any) {
            setServerError(err.message || 'Xác nhận thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex w-full flex-1 items-center justify-center px-4 py-5 sm:py-8">
                <div className="w-full max-w-[430px] rounded-[18px] bg-white px-5 py-7 shadow-[0_10px_32px_rgba(0,0,0,0.08)] sm:px-7">
                    <h1 className="mb-3 text-center text-[22px] font-bold text-[#111827]">Đăng Ký</h1>

                    {serverError && (
                        <div className="mb-4 rounded-lg bg-[#fff2f0] border border-[#ffccc7] px-4 py-3 text-[14px] text-[#cf1322]">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col items-center" noValidate>
                        <p className="mb-4 text-[14px] font-medium text-[#8a8f98]">Mã xác nhận</p>

                        <div className="flex gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index} id={`reg-otp-${index}`} type="text" inputMode="numeric" maxLength={1}
                                    value={digit} onChange={(event) => handleOtpChange(index, event.target.value)}
                                    onKeyDown={(event) => handleOtpKeyDown(index, event)}
                                    className={`h-12 w-10 rounded-[8px] border text-center text-lg font-bold outline-none transition sm:w-11 ${
                                        submitted && otpError
                                            ? 'border-[#ff6b6b] bg-[#fff8f8] text-[#ff4d4f]'
                                            : 'border-[#dfe3e8] focus:border-[#61AF5E] focus:shadow-[0_0_0_3px_rgba(97,175,94,0.12)]'
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="w-full">
                            <FieldError message={submitted ? otpError : ''} />
                        </div>

                        <p className="mb-6 mt-2 text-center text-[13px] text-[#9aa1a9]">
                            Mã xác nhận chỉ có hiệu lực trong vòng 01 tiếng.{' '}
                            <span className="font-bold text-[#285E19]">{formatTime(countdown)}</span>
                            {countdown === 0 && (
                                <button type="button" onClick={handleResend} className="ml-2 font-bold text-[#3b82f6] hover:underline">
                                    Gửi lại
                                </button>
                            )}
                        </p>

                        <button type="submit" disabled={loading}
                            className="h-[46px] w-full rounded-[6px] bg-[#61AF5E] text-[15px] font-bold uppercase tracking-[0.04em] text-white transition hover:bg-[#4e9a4b] disabled:opacity-60">
                            {loading ? 'Đang xử lý...' : 'Gửi'}
                        </button>
                    </form>
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
                        <h2 className="mb-6 text-xl font-bold text-green-primary">BẠN ĐÃ TẠO TÀI KHOẢN THÀNH CÔNG</h2>
                        <button onClick={() => router.push('/login')}
                            className="w-full rounded-lg bg-green-button py-3 text-lg font-bold tracking-wider text-white transition hover:bg-green-hover">
                            Đăng Nhập
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
