'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, type ReactNode, useMemo, useState } from 'react';
import { authApi } from '@/shared/authApi';

type RegisterForm = {
    email: string;
    phone: string;
    displayName: string;
    province: string;
    password: string;
    confirmPassword: string;
};

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;
const PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
const VIETNAM_PROVINCES = [
    'An Giang', 'Bà Rịa - Vũng Tàu', 'Bạc Liêu', 'Bắc Giang', 'Bắc Kạn', 'Bắc Ninh',
    'Bến Tre', 'Bình Dương', 'Bình Định', 'Bình Phước', 'Bình Thuận', 'Cà Mau',
    'Cao Bằng', 'Cần Thơ', 'Đà Nẵng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai',
    'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Nội', 'Hà Tĩnh', 'Hải Dương',
    'Hải Phòng', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên', 'Khánh Hòa', 'Kiên Giang',
    'Kon Tum', 'Lai Châu', 'Lạng Sơn', 'Lào Cai', 'Lâm Đồng', 'Long An', 'Nam Định',
    'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên', 'Quảng Bình',
    'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La',
    'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang',
    'TP. Hồ Chí Minh', 'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái',
];

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
    const paths: Record<string, ReactNode> = {
        mail: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
        phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
        user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
        map: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
        lock: <><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    };
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {paths[type]}
        </svg>
    );
}

function AuthField({
    id, icon, placeholder, type, value, onChange, error, trailing,
}: {
    id: string; icon: ReactNode; placeholder: string; type: string; value: string;
    onChange: (value: string) => void; error?: string; trailing?: ReactNode;
}) {
    return (
        <div>
            <div className={`flex h-[46px] items-center rounded-[6px] border bg-white px-3 transition ${error ? 'border-[#ff6b6b] bg-[#fff8f8]' : 'border-[#dfe3e8] focus-within:border-[#61AF5E] focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.12)]'}`}>
                <span className={`mr-2 shrink-0 ${error ? 'text-[#ff6b6b]' : 'text-[#b4bbc4]'}`}>{icon}</span>
                <input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder}
                    className="h-full flex-1 border-none bg-transparent text-[14px] text-[#1f2937] placeholder:text-[#b8bfc8] focus:outline-none" />
                {trailing ? <div className={`ml-2 shrink-0 ${error ? 'text-[#ff6b6b]' : 'text-[#c0c6ce]'}`}>{trailing}</div> : null}
            </div>
            <FieldError message={error} />
        </div>
    );
}

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState<RegisterForm>({
        email: '', phone: '', displayName: '', province: '', password: '', confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    const errors = useMemo(() => ({
        email: !form.email.trim()
            ? 'Vui lòng điền vào mục này.'
            : !EMAIL_REGEX.test(form.email.trim())
                ? 'Email không đúng định dạng.'
                : '',
        phone: !form.phone.trim()
            ? 'Vui lòng điền vào mục này.'
            : !PHONE_REGEX.test(form.phone.trim())
                ? 'Số điện thoại không hợp lệ (VD: 09xxxxxxxx hoặc +849xxxxxxxx).'
                : '',
        displayName: form.displayName.trim() ? '' : 'Vui lòng điền vào mục này.',
        province: form.province.trim() ? '' : 'Vui lòng chọn tỉnh / thành.',
        password: form.password.trim() ? '' : 'Vui lòng điền vào mục này.',
        confirmPassword: !form.confirmPassword.trim()
            ? 'Vui lòng điền vào mục này.'
            : form.confirmPassword !== form.password ? 'Mật khẩu xác nhận chưa khớp.' : '',
    }), [form]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        setServerError('');
        if (Object.values(errors).some(Boolean)) return;

        setLoading(true);
        try {
            await authApi.dangKy({
                email: form.email,
                so_dien_thoai: form.phone,
                ten_hien_thi: form.displayName,
                khu_vuc: form.province,
                mat_khau: form.password,
                xac_nhan_mat_khau: form.confirmPassword,
            });
            sessionStorage.setItem('register_email', form.email);
            router.push('/register/verify');
        } catch (err: unknown) {
            setServerError(err instanceof Error ? err.message : 'Đăng ký thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full flex-1 items-center justify-center px-4 py-5 sm:py-8">
            <div className="w-full max-w-[430px] rounded-[18px] bg-white px-5 py-7 shadow-[0_10px_32px_rgba(0,0,0,0.08)] sm:px-7">
                <h1 className="mb-5 text-center text-[22px] font-bold text-[#111827]">Đăng Ký</h1>

                {serverError && (
                    <div className="mb-4 rounded-lg bg-[#fff2f0] border border-[#ffccc7] px-4 py-3 text-[14px] text-[#cf1322]">
                        {serverError}
                    </div>
                )}

                <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
                    <AuthField id="email" icon={<InputIcon type="mail" />} placeholder="Email" type="email"
                        value={form.email} onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
                        error={submitted ? errors.email : ''} />
                    <AuthField id="phone" icon={<InputIcon type="phone" />} placeholder="Số điện thoại" type="tel"
                        value={form.phone} onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
                        error={submitted ? errors.phone : ''} />
                    <AuthField id="displayName" icon={<InputIcon type="user" />} placeholder="Tên hiển thị" type="text"
                        value={form.displayName} onChange={(value) => setForm((prev) => ({ ...prev, displayName: value }))}
                        error={submitted ? errors.displayName : ''} />
                    <div>
                        <div className={`flex h-[46px] items-center rounded-[6px] border bg-white px-3 transition ${submitted && errors.province ? 'border-[#ff6b6b] bg-[#fff8f8]' : 'border-[#dfe3e8] focus-within:border-[#61AF5E] focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.12)]'}`}>
                            <span className={`mr-2 shrink-0 ${submitted && errors.province ? 'text-[#ff6b6b]' : 'text-[#b4bbc4]'}`}>
                                <InputIcon type="map" />
                            </span>
                            <select
                                id="province"
                                value={form.province}
                                onChange={(event) => setForm((prev) => ({ ...prev, province: event.target.value }))}
                                className="h-full w-full border-none bg-transparent text-[14px] text-[#1f2937] focus:outline-none"
                            >
                                <option value="" className="text-[#b8bfc8]">Chọn tỉnh / thành</option>
                                {VIETNAM_PROVINCES.map((province) => (
                                    <option key={province} value={province}>
                                        {province}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <FieldError message={submitted ? errors.province : ''} />
                    </div>
                    <AuthField id="password" icon={<InputIcon type="lock" />} placeholder="Mật khẩu"
                        type={showPassword ? 'text' : 'password'} value={form.password}
                        onChange={(value) => setForm((prev) => ({ ...prev, password: value }))}
                        error={submitted ? errors.password : ''}
                        trailing={<button type="button" onClick={() => setShowPassword((prev) => !prev)}
                            className="cursor-pointer transition hover:text-[#285E19]"><EyeIcon open={showPassword} /></button>} />
                    <AuthField id="confirmPassword" icon={<InputIcon type="lock" />} placeholder="Xác nhận mật khẩu"
                        type={showConfirmPassword ? 'text' : 'password'} value={form.confirmPassword}
                        onChange={(value) => setForm((prev) => ({ ...prev, confirmPassword: value }))}
                        error={submitted ? errors.confirmPassword : ''}
                        trailing={<button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="cursor-pointer transition hover:text-[#285E19]"><EyeIcon open={showConfirmPassword} /></button>} />

                    <div className="pt-1 text-center text-[13px] text-[#9aa1a9]">
                        Đã có tài khoản?{' '}
                        <Link href="/login" className="font-medium text-[#3b82f6] transition hover:text-[#285E19]">Đăng nhập</Link>
                    </div>

                    <button type="submit" disabled={loading}
                        className="mt-3 h-[46px] w-full rounded-[6px] bg-[#61AF5E] text-[15px] font-bold uppercase tracking-[0.04em] text-white transition hover:bg-[#4e9a4b] disabled:opacity-60"
                        id="register-submit-btn">
                        {loading ? 'Đang xử lý...' : 'Đăng Ký'}
                    </button>
                </form>
            </div>
        </div>
    );
}
