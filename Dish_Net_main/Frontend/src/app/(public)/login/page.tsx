'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, type ReactNode, useMemo, useRef, useState } from 'react';
import { useAuth } from '@/shared/AuthContext';
import { authApi } from '@/shared/authApi';

declare global {
    interface Window {
        google?: {
            accounts?: {
                id?: {
                    initialize: (config: {
                        client_id: string;
                        callback: (response: { credential?: string }) => void;
                        use_fedcm_for_prompt?: boolean;
                        auto_select?: boolean;
                    }) => void;
                    prompt: (listener?: (notification: {
                        isNotDisplayed?: () => boolean;
                        isSkippedMoment?: () => boolean;
                        getNotDisplayedReason?: () => string;
                        getSkippedReason?: () => string;
                    }) => void) => void;
                    renderButton: (
                        parent: HTMLElement,
                        options: {
                            theme?: 'outline' | 'filled_blue' | 'filled_black';
                            size?: 'large' | 'medium' | 'small';
                            text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
                            shape?: 'rectangular' | 'pill' | 'circle' | 'square';
                            width?: number;
                        }
                    ) => void;
                    cancel?: () => void;
                };
            };
        };
    }
}

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

function getErrorMessage(error: unknown, fallback: string) {
    return error instanceof Error ? error.message : fallback;
}

function AuthField({
    icon, type, placeholder, value, onChange, error, trailing, id,
}: {
    icon: ReactNode; type: string; placeholder: string; value: string;
    onChange: (value: string) => void; error?: string; trailing?: ReactNode; id: string;
}) {
    return (
        <div>
            <div className={`flex h-[48px] items-center rounded-[6px] border bg-white px-3 transition ${error ? 'border-[#ff6b6b] bg-[#fff8f8]' : 'border-[#d8dde3] focus-within:border-[#61AF5E] focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.12)]'}`}>
                <span className={`mr-2 shrink-0 ${error ? 'text-[#ff6b6b]' : 'text-[#a7adb4]'}`}>{icon}</span>
                <input
                    id={id} type={type} placeholder={placeholder} value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="h-full flex-1 border-none bg-transparent text-[15px] text-[#1f2937] placeholder:text-[#b8bfc8] focus:outline-none"
                />
                {trailing ? <div className={`ml-2 shrink-0 ${error ? 'text-[#ff6b6b]' : 'text-[#8b95a1]'}`}>{trailing}</div> : null}
            </div>
            <FieldError message={error} />
        </div>
    );
}

const vaiTroConfig: Record<string, { title: string; subtitle: string; description: string; gradient: string }> = {
    nguoi_dung: {
        title: 'Tài khoản người dùng',
        subtitle: 'Người dùng',
        description: 'Xem bảng tin, khám phá quán, theo dõi review và trải nghiệm mua hàng.',
        gradient: 'from-green-300 to-green-500',
    },
    chu_cua_hang: {
        title: 'Tài khoản cửa hàng',
        subtitle: 'Chủ cửa hàng',
        description: 'Quản lý cửa hàng, menu, đơn hàng và doanh thu.',
        gradient: 'from-orange-300 to-red-400',
    },
    nha_sang_tao: {
        title: 'Tài khoản nhà sáng tạo',
        subtitle: 'Nhà sáng tạo',
        description: 'Tạo nội dung, kiếm tiền từ bài viết và review.',
        gradient: 'from-blue-300 to-blue-500',
    },
};

function LoginPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect');
    const { capNhatNguoiDung } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [chonVaiTro, setChonVaiTro] = useState<{ email: string; danhSach: string[] } | null>(null);
    const [selectedVaiTro, setSelectedVaiTro] = useState('');
    const googleButtonRef = useRef<HTMLDivElement | null>(null);
    const isGoogleInitializedRef = useRef(false);

    const errors = useMemo(() => ({
        email: form.email.trim() ? '' : 'Vui lòng điền vào mục này.',
        password: form.password.trim() ? '' : 'Vui lòng điền vào mục này.',
    }), [form]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        setServerError('');
        if (errors.email || errors.password) return;

        setLoading(true);
        try {
            const res = await authApi.dangNhap({
                tai_khoan: form.email.trim(),
                mat_khau: form.password,
                luu_dang_nhap: rememberMe,
            });

            if (res.can_chon_vai_tro && res.danh_sach_vai_tro) {
                setChonVaiTro({ email: res.email!, danhSach: res.danh_sach_vai_tro });
                setSelectedVaiTro(res.danh_sach_vai_tro[0]);
                return;
            }

            if (res.nguoi_dung) {
                capNhatNguoiDung({
                    ...res.nguoi_dung,
                    vai_tro: res.vai_tro!,
                });
                const defaultRoute = res.vai_tro === 'admin' ? '/admin' : res.vai_tro === 'chu_cua_hang' ? '/store' : '/';
                router.push(redirectTo || defaultRoute);
            }
        } catch (err: unknown) {
            setServerError(getErrorMessage(err, 'Đăng nhập thất bại'));
        } finally {
            setLoading(false);
        }
    };

    const handleChonVaiTro = async () => {
        if (!chonVaiTro) return;
        setLoading(true);
        try {
            const res = await authApi.chonVaiTro({
                email: chonVaiTro.email,
                vai_tro: selectedVaiTro,
                luu_dang_nhap: rememberMe,
            });
            capNhatNguoiDung({ ...res.nguoi_dung, vai_tro: res.vai_tro });
            setChonVaiTro(null);
            const defaultRoute = res.vai_tro === 'admin' ? '/admin' : res.vai_tro === 'chu_cua_hang' ? '/store' : '/';
            router.push(redirectTo || defaultRoute);
        } catch (err: unknown) {
            setServerError(getErrorMessage(err, 'Chọn vai trò thất bại'));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async (credential: string) => {
        setLoading(true);
        setServerError('');
        try {
            const res = await authApi.dangNhapGoogle({
                credential,
                luu_dang_nhap: rememberMe,
            });
            capNhatNguoiDung({ ...res.nguoi_dung, vai_tro: res.vai_tro });
            const defaultRoute = res.vai_tro === 'admin' ? '/admin' : res.vai_tro === 'chu_cua_hang' ? '/store' : '/';
            router.push(redirectTo || defaultRoute);
        } catch (err: unknown) {
            setServerError(getErrorMessage(err, 'Đăng nhập Google thất bại'));
        } finally {
            setLoading(false);
        }
    };

    const initGoogleSignIn = () => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        if (!clientId) {
            setServerError('Thiếu cấu hình Google Client ID');
            return;
        }
        const gsi = window.google?.accounts?.id;
        if (!gsi) {
            setServerError('Google Sign-In chưa sẵn sàng, vui lòng thử lại');
            return;
        }
        if (isGoogleInitializedRef.current) return;
        isGoogleInitializedRef.current = true;
        gsi.initialize({
            client_id: clientId,
            // Use classic popup flow from rendered Google button to avoid FedCM prompt issues.
            use_fedcm_for_prompt: false,
            auto_select: false,
            callback: (response) => {
                if (!response?.credential) {
                    setServerError('Không nhận được thông tin xác thực Google');
                    return;
                }
                void handleGoogleLogin(response.credential);
            },
        });
        if (googleButtonRef.current) {
            googleButtonRef.current.innerHTML = '';
            gsi.renderButton(googleButtonRef.current, {
                theme: 'filled_blue',
                size: 'large',
                text: 'signin_with',
                shape: 'rectangular',
                width: 360,
            });
        }
    };

    return (
        <>
            <div className="flex w-full flex-1 items-center justify-center px-4 py-6 sm:py-10">
                <div className="w-full max-w-[520px] rounded-[18px] bg-white px-6 py-8 shadow-[0_10px_32px_rgba(0,0,0,0.08)] sm:px-10">
                    <h1 className="mb-6 text-center text-[22px] font-bold text-[#111827] sm:text-[24px]">Đăng Nhập</h1>

                    {serverError && (
                        <div className="mb-4 rounded-lg bg-[#fff2f0] border border-[#ffccc7] px-4 py-3 text-[14px] text-[#cf1322]">
                            {serverError}
                        </div>
                    )}

                    <form className="flex flex-col" onSubmit={handleSubmit} noValidate>
                        <div className="space-y-4">
                            <AuthField
                                id="login-email" icon={<MailIcon />} type="text"
                                placeholder="Tên đăng nhập hoặc Email" value={form.email}
                                onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
                                error={submitted ? errors.email : ''}
                            />
                            <AuthField
                                id="login-password" icon={<LockIcon />}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Mật khẩu" value={form.password}
                                onChange={(value) => setForm((prev) => ({ ...prev, password: value }))}
                                error={submitted ? errors.password : ''}
                                trailing={
                                    <button type="button" onClick={() => setShowPassword((prev) => !prev)}
                                        className="cursor-pointer transition hover:text-[#285E19]"
                                        aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                                        <EyeIcon open={showPassword} />
                                    </button>
                                }
                            />
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                            <label className="flex items-center gap-2 text-[14px] text-[#7b8087]">
                                <input type="checkbox" checked={rememberMe}
                                    onChange={(event) => setRememberMe(event.target.checked)}
                                    className="h-4 w-4 accent-[#61AF5E]" />
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

                        <button type="submit" disabled={loading}
                            className="mt-4 h-[46px] w-full rounded-[6px] bg-[#61AF5E] text-[16px] font-bold uppercase tracking-[0.04em] text-white transition hover:bg-[#4e9a4b] disabled:opacity-60"
                            id="login-submit-btn">
                            {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
                        </button>

                        <p className="mt-4 text-center text-[13px] text-[#8a8f98]">Hoặc đăng nhập bằng</p>

                        <div className="mt-3 flex justify-center">
                            <div ref={googleButtonRef} />
                        </div>
                    </form>
                </div>
            </div>
            <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={initGoogleSignIn} />

            {chonVaiTro && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                        <h2 className="mb-2 text-center text-xl font-bold text-black">Chọn vai trò đăng nhập</h2>
                        <p className="mb-6 text-center text-sm leading-6 text-[#6b7280]">
                            Tài khoản của bạn có nhiều vai trò. Vui lòng chọn vai trò bạn muốn sử dụng.
                        </p>
                        <div className="mb-6 h-px bg-gray-200" />

                        <div className="space-y-3">
                            {chonVaiTro.danhSach.map((vaiTro) => {
                                const config = vaiTroConfig[vaiTro] || { title: vaiTro, subtitle: '', description: '', gradient: 'from-gray-300 to-gray-500' };
                                return (
                                    <button key={vaiTro} onClick={() => setSelectedVaiTro(vaiTro)}
                                        className={`w-full rounded-2xl border-2 p-4 text-left transition ${
                                            selectedVaiTro === vaiTro
                                                ? 'border-green-button bg-green-button/5 shadow-[0_10px_30px_rgba(97,175,94,0.15)]'
                                                : 'border-transparent hover:border-green-button hover:bg-green-button/5'
                                        }`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${config.gradient} text-white text-xl font-bold`}>
                                                {config.subtitle[0]}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-lg font-bold text-black">{config.title}</p>
                                                <p className="mt-1 text-sm leading-6 text-[#6b7280]">{config.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <button onClick={handleChonVaiTro} disabled={loading}
                            className="mt-6 w-full rounded-xl bg-green-button py-4 text-base font-bold tracking-wide text-white transition hover:bg-green-hover disabled:opacity-60">
                            {loading ? 'Đang xử lý...' : 'TIẾP TỤC'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={null}>
            <LoginPageContent />
        </Suspense>
    );
}
