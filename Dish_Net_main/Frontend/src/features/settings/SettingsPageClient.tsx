'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react';

import type { UserProfile } from '@/features/profile/data';
import OpenStoreFlow from '@/features/settings/OpenStoreFlow';
import { useToast } from '@/shared/toast';
import { authApi } from '@/shared/authApi';
import { userCommerceApi } from '@/shared/userCommerceApi';
import { userContentApi } from '@/shared/userContentApi';

type SettingsTab = 'personal' | 'password' | 'professional' | 'block';

const SIDEBAR_ITEMS: { key: SettingsTab; label: string }[] = [
    { key: 'personal', label: 'Thông tin cá nhân' },
    { key: 'password', label: 'Mật khẩu và bảo mật' },
    { key: 'professional', label: 'Chế độ chuyên nghiệp' },
    { key: 'block', label: 'Quản lý chặn' },
];

function normalizeGender(value: string): 'nam' | 'nu' | 'khac' {
    const normalized = value.trim().toLowerCase();
    if (['nam', 'male'].includes(normalized)) return 'nam';
    if (['nu', 'nữ', 'female'].includes(normalized)) return 'nu';
    return 'khac';
}

function parseBirthdateToIso(value: string): string | undefined {
    const input = value.trim();
    if (!input) return undefined;

    const slashMatch = input.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (slashMatch) {
        const [, dd, mm, yyyy] = slashMatch;
        return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
    }

    const date = new Date(input);
    if (Number.isNaN(date.getTime())) return undefined;
    const yyyy = date.getFullYear();
    const mm = `${date.getMonth() + 1}`.padStart(2, '0');
    const dd = `${date.getDate()}`.padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

/* ═══════════════════════════════════════════
   TAB 1 – Thông tin cá nhân
   ═══════════════════════════════════════════ */
function PersonalInfoTab({ profile }: { profile: UserProfile }) {
    const [name, setName] = useState(profile.handle);
    const [gender, setGender] = useState(profile.gender);
    const [birthday, setBirthday] = useState(profile.birthday);
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phone);
    const [address, setAddress] = useState(profile.address);
    const [showBadge, setShowBadge] = useState(profile.showBadge);
    const [showTrustScore, setShowTrustScore] = useState(profile.showTrustScore);
    const [isPrivate, setIsPrivate] = useState(profile.isPrivate);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const handleReset = () => {
        setName(profile.handle);
        setGender(profile.gender);
        setBirthday(profile.birthday);
        setEmail(profile.email);
        setPhone(profile.phone);
        setAddress(profile.address);
        setShowBadge(profile.showBadge);
        setShowTrustScore(profile.showTrustScore);
        setIsPrivate(profile.isPrivate);
        setSaveError(null);
        setSaveSuccess(null);
    };

    const handleSave = async () => {
        if (isSaving) return;
        if (!name.trim()) {
            setSaveError('Tên tài khoản là bắt buộc.');
            setSaveSuccess(null);
            return;
        }

        setIsSaving(true);
        setSaveError(null);
        setSaveSuccess(null);
        try {
            await userContentApi.chinhSuaTrangCaNhan({
                ten_dang_nhap: name.trim(),
                ten_hien_thi: name.trim(),
                gioi_tinh: normalizeGender(gender),
                ngay_sinh: parseBirthdateToIso(birthday),
                so_dien_thoai: phone.trim() || undefined,
                dia_chi: address.trim() || undefined,
                cho_hien_thi_huy_hieu: showBadge,
                cho_hien_thi_diem_uy_tin: showTrustScore,
                la_tai_khoan_rieng_tu: isPrivate,
            });
            setSaveSuccess('Đã lưu thông tin cá nhân.');
        } catch (error) {
            setSaveError(
                error instanceof Error ? error.message : 'Không lưu được thông tin cá nhân',
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <h2 className="text-[22px] font-bold text-black">Chỉnh sửa trang cá nhân</h2>

            {/* Avatar row */}
            <div className="mt-6 flex items-center justify-between rounded-[14px] border border-[#e8e5dc] bg-[#fdfcf8] px-6 py-5">
                <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-14 w-14 rounded-full object-cover"
                />
                <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="rounded-[8px] bg-[#333] px-6 py-2.5 text-[14px] font-bold text-white transition hover:bg-[#555]"
                    id="btn-change-avatar-settings"
                >
                    Đổi ảnh
                </button>
                <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" />
            </div>

            {/* Form fields */}
            <div className="mt-5 space-y-4">
                {/* Tên tài khoản */}
                <div className="flex items-center gap-3 rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tên tài khoản"
                        className="flex-1 bg-transparent text-[16px] text-black outline-none placeholder:text-[#999]"
                        id="settings-input-name"
                    />
                </div>

                {/* Giới tính */}
                <div className="flex items-center gap-3 rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5">
                    <input
                        type="text"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        placeholder="Giới tính"
                        className="flex-1 bg-transparent text-center text-[16px] text-black outline-none placeholder:text-[#999]"
                        id="settings-input-gender"
                    />
                </div>

                {/* Ngày sinh */}
                <div className="flex items-center gap-3 rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5">
                    <input
                        type="text"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        placeholder="dd/mm/yyyy"
                        className="flex-1 bg-transparent text-center text-[16px] text-black outline-none placeholder:text-[#999]"
                        id="settings-input-birthday"
                    />
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="flex-1 bg-transparent text-[16px] text-black outline-none placeholder:text-[#999]"
                        id="settings-input-email"
                    />
                </div>

                {/* Số điện thoại */}
                <div className="flex items-center gap-3 rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Số điện thoại"
                        className="flex-1 bg-transparent text-[16px] text-black outline-none placeholder:text-[#999]"
                        id="settings-input-phone"
                    />
                </div>

                {/* Địa chỉ */}
                <div className="flex items-center gap-3 rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Địa chỉ"
                        className="flex-1 bg-transparent text-[16px] text-black outline-none placeholder:text-[#999]"
                        id="settings-input-address"
                    />
                </div>
            </div>

            {/* Hiển thị huy hiệu */}
            <h3 className="mt-8 text-[16px] font-semibold text-black">Hiển thị huy hiệu</h3>
            <div className="mt-3 space-y-3">
                <div className="flex items-center justify-between rounded-[10px] border border-[#e0ddd6] bg-white px-5 py-3.5">
                    <span className="text-[15px] text-black">Hiển thị huy hiệu</span>
                    <ToggleSwitch checked={showBadge} onChange={setShowBadge} id="toggle-badge-settings" />
                </div>
                <div className="flex items-center justify-between rounded-[10px] border border-[#e0ddd6] bg-white px-5 py-3.5">
                    <span className="text-[15px] text-black">Hiển thị độ uy tín</span>
                    <ToggleSwitch checked={showTrustScore} onChange={setShowTrustScore} id="toggle-trust-settings" />
                </div>
            </div>

            {/* Chế độ tài khoản riêng tư */}
            <div className="mt-6 flex items-center justify-between">
                <span className="text-[16px] font-semibold text-black">Chế độ tài khoản riêng tư</span>
                <ToggleSwitch checked={isPrivate} onChange={setIsPrivate} id="toggle-private-settings" />
            </div>

            {/* Action buttons */}
            <div className="mt-10 flex items-center justify-center gap-4">
                <button
                    type="button"
                    onClick={handleReset}
                    className="min-w-[120px] rounded-[8px] border border-[#ccc] bg-white px-8 py-2.5 text-[15px] font-semibold text-black transition hover:bg-gray-50"
                    id="btn-cancel-settings"
                >
                    Hủy
                </button>
                <button
                    type="button"
                    onClick={() => void handleSave()}
                    disabled={isSaving}
                    className="min-w-[120px] rounded-[8px] border border-[#2f8f27] bg-[#2f8f27] px-8 py-2.5 text-[15px] font-semibold text-white transition hover:bg-[#256f1e] disabled:cursor-not-allowed disabled:opacity-60"
                    id="btn-save-settings"
                >
                    {isSaving ? 'Đang lưu...' : 'Lưu'}
                </button>
            </div>
            {saveError ? <p className="mt-3 text-center text-sm text-red-500">{saveError}</p> : null}
            {saveSuccess ? <p className="mt-3 text-center text-sm text-[#2f8f27]">{saveSuccess}</p> : null}
            <p className="mt-2 text-center text-xs text-[#8a8a8a]">
                Email hiện chỉ hiển thị; số điện thoại và địa chỉ sẽ được cập nhật vào hồ sơ tài khoản.
            </p>
        </div>
    );
}

/* ═══════════════════════════════════════════
   TAB 2 – Mật khẩu và bảo mật
   ═══════════════════════════════════════════ */
function PasswordTab() {
    const toast = useToast();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [logoutOthers, setLogoutOthers] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChangePassword = async () => {
        if (isSubmitting) return;
        if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
            setMessage('Vui lòng nhập đầy đủ thông tin mật khẩu.');
            return;
        }
        if (newPassword.length < 6) {
            setMessage('Mật khẩu mới phải có ít nhất 6 ký tự.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage('Mật khẩu mới và xác nhận mật khẩu chưa khớp.');
            return;
        }

        setIsSubmitting(true);
        setMessage(null);
        try {
            const payload = await authApi.doiMatKhau({
                mat_khau_hien_tai: currentPassword,
                mat_khau_moi: newPassword,
                xac_nhan_mat_khau: confirmPassword,
                dang_xuat_thiet_bi_khac: logoutOthers,
            });
            toast.success(payload?.message || 'Đổi mật khẩu thành công');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setMessage('Đổi mật khẩu thành công.');
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Đổi mật khẩu thất bại';
            toast.error(msg);
            setMessage(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2 className="text-[22px] font-bold text-black">Đổi mật khẩu</h2>
            <p className="mt-2 text-[14px] leading-6 text-[#555]">
                Mật khẩu của bạn phải có tối thiểu 6 ký tự, đồng thời bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%).
            </p>

            <div className="mt-6 space-y-4">
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Mật khẩu hiện tại (Ngày cập nhật: 17/12/2023)"
                    className="w-full rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5 text-[15px] text-black outline-none transition placeholder:text-[#999] focus:border-green-primary"
                    id="settings-current-password"
                />
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mật khẩu mới"
                    className="w-full rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5 text-[15px] text-black outline-none transition placeholder:text-[#999] focus:border-green-primary"
                    id="settings-new-password"
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5 text-[15px] text-black outline-none transition placeholder:text-[#999] focus:border-green-primary"
                    id="settings-confirm-password"
                />
            </div>

            <button type="button" className="mt-4 text-[14px] font-semibold text-[#2e7d32] transition hover:underline">
                Bạn quên mật khẩu ư?
            </button>

            <div className="mt-4 flex items-start gap-3">
                <button
                    type="button"
                    onClick={() => setLogoutOthers(!logoutOthers)}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border transition ${
                        logoutOthers
                            ? 'border-[#2e7d32] bg-[#2e7d32] text-white'
                            : 'border-[#999] bg-white'
                    }`}
                    id="checkbox-logout-others"
                >
                    {logoutOthers && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    )}
                </button>
                <p className="text-[13px] leading-5 text-black">
                    <strong>Đăng xuất khỏi các thiết bị khác.</strong> Hãy chọn mục này nếu người khác từng dùng tài khoản của bạn.
                </p>
            </div>

            <button
                type="button"
                onClick={() => void handleChangePassword()}
                disabled={isSubmitting}
                className="mt-8 w-full rounded-[10px] bg-[#2e7d32] py-3.5 text-[16px] font-bold text-white transition hover:bg-[#256b28] disabled:cursor-not-allowed disabled:opacity-60"
                id="btn-change-password"
            >
                {isSubmitting ? 'Đang xử lý...' : 'Đổi mật khẩu'}
            </button>
            {message ? <p className="mt-3 text-center text-sm text-[#666]">{message}</p> : null}
        </div>
    );
}

/* ═══════════════════════════════════════════
   TAB 3 – Chế độ chuyên nghiệp
   ═══════════════════════════════════════════ */
type ProfessionalStep = 'menu' | 'earn-form' | 'pending' | 'store-form';
type ProfessionalRequestStatus = 'cho_duyet' | 'da_duyet' | 'da_tu_choi';
type ProfessionalRequestType = 'kiem_tien_noi_dung' | 'mo_cua_hang';

type ProfessionalRequestItem = {
    id: number;
    loai_yeu_cau: ProfessionalRequestType;
    trang_thai: ProfessionalRequestStatus;
    ly_do_tu_choi?: string | null;
};

function getRequestStatusLabel(status?: ProfessionalRequestStatus) {
    if (status === 'cho_duyet') return 'Đang chờ duyệt';
    if (status === 'da_duyet') return 'Đã duyệt';
    if (status === 'da_tu_choi') return 'Đã từ chối';
    return null;
}

function ProfessionalTab({ profile }: { profile: UserProfile }) {
    const [step, setStep] = useState<ProfessionalStep>('menu');
    const [name, setName] = useState(profile.handle);
    const [gender, setGender] = useState(profile.gender);
    const [birthday, setBirthday] = useState(profile.birthday);
    const [bank, setBank] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phone);
    const [address, setAddress] = useState(profile.address);
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [pendingRequestLabel, setPendingRequestLabel] = useState<string | null>(null);
    const [requestsLoading, setRequestsLoading] = useState(true);
    const [requestLoadError, setRequestLoadError] = useState<string | null>(null);
    const [latestEarnRequest, setLatestEarnRequest] = useState<ProfessionalRequestItem | null>(null);
    const [latestStoreRequest, setLatestStoreRequest] = useState<ProfessionalRequestItem | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadProfessionalRequests = async () => {
            setRequestsLoading(true);
            setRequestLoadError(null);
            try {
                const data = (await userCommerceApi.layYeuCauChuyenNghiep()) as {
                    du_lieu?: ProfessionalRequestItem[];
                };
                const list: ProfessionalRequestItem[] = Array.isArray(data?.du_lieu)
                    ? data.du_lieu
                    : [];

                if (!isMounted) return;

                setLatestEarnRequest(
                    list.find((item) => item.loai_yeu_cau === 'kiem_tien_noi_dung') ?? null,
                );
                setLatestStoreRequest(
                    list.find((item) => item.loai_yeu_cau === 'mo_cua_hang') ?? null,
                );
            } catch (error) {
                if (!isMounted) return;
                setRequestLoadError(
                    error instanceof Error
                        ? error.message
                        : 'Không tải được trạng thái đăng ký chuyên nghiệp',
                );
            } finally {
                if (isMounted) {
                    setRequestsLoading(false);
                }
            }
        };

        void loadProfessionalRequests();
        return () => {
            isMounted = false;
        };
    }, []);

    /* ── Step 1: Menu ── */
    if (step === 'menu') {
        const earnStatusLabel = getRequestStatusLabel(latestEarnRequest?.trang_thai);
        const storeStatusLabel = getRequestStatusLabel(latestStoreRequest?.trang_thai);

        return (
            <div>
                <p className="text-[16px] text-black">Bạn muốn mở chế độ chuyên nghiệp để :</p>

                <div className="mt-6 overflow-hidden rounded-[12px] border border-[#e0ddd6] bg-white">
                    <button
                        type="button"
                        onClick={() => {
                            if (latestEarnRequest?.trang_thai === 'cho_duyet') {
                                setPendingRequestLabel('Kiếm tiền từ nội dung');
                                setStep('pending');
                                return;
                            }
                            setStep('earn-form');
                        }}
                        className="flex w-full items-center justify-between border-b border-[#e0ddd6] px-5 py-4 text-left text-[15px] text-black transition hover:bg-[#fafaf8]"
                        id="btn-earn-content"
                    >
                        <span>
                            Kiếm tiền từ nội dung
                            {earnStatusLabel ? (
                                <span className="ml-2 text-[12px] font-semibold text-[#2e7d32]">
                                    ({earnStatusLabel})
                                </span>
                            ) : null}
                        </span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => setStep('store-form')}
                        className="flex w-full items-center justify-between px-5 py-4 text-left text-[15px] text-black transition hover:bg-[#fafaf8]"
                        id="btn-open-store"
                    >
                        <span>
                            Mở cửa hàng
                            {storeStatusLabel ? (
                                <span className="ml-2 text-[12px] font-semibold text-[#2e7d32]">
                                    ({storeStatusLabel})
                                </span>
                            ) : null}
                        </span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
                {requestsLoading ? (
                    <p className="mt-3 text-sm text-[#888]">Đang tải trạng thái yêu cầu...</p>
                ) : null}
                {requestLoadError ? (
                    <p className="mt-3 text-sm text-red-500">{requestLoadError}</p>
                ) : null}
            </div>
        );
    }

    /* ── Store form ── */
    if (step === 'store-form') {
        return (
            <OpenStoreFlow
                profile={profile}
                onBack={() => setStep('menu')}
                existingRequestStatus={latestStoreRequest?.trang_thai}
                existingRejectReason={latestStoreRequest?.ly_do_tu_choi ?? null}
            />
        );
    }

    /* ── Pending (earn) ── */
    if (step === 'pending') {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-center text-[22px] font-light uppercase leading-10 tracking-wide text-[#c4c4c4]">
                    ĐƠN {pendingRequestLabel ? `(${pendingRequestLabel}) ` : ''}CỦA BẠN ĐANG ĐƯỢC CHỜ PHÊ DUYỆT<br />VUI LÒNG CHỜ.
                </p>
            </div>
        );
    }

    /* ── Step 2: Earn form ── */
    return (
        <div>
            <h2 className="text-[22px] font-bold text-black">Thông tin cơ bản</h2>
            {latestEarnRequest?.trang_thai === 'da_tu_choi' && latestEarnRequest.ly_do_tu_choi ? (
                <p className="mt-3 rounded-[8px] border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                    Lý do từ chối gần nhất: {latestEarnRequest.ly_do_tu_choi}
                </p>
            ) : null}

            <div className="mt-6 space-y-4">
                {/* Tên tài khoản */}
                <div className="flex items-center gap-3 rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tên tài khoản"
                        className="flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-[#999]"
                        id="pro-input-name"
                    />
                </div>

                {/* Giới tính + Ngày sinh */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5">
                        <input
                            type="text"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            placeholder="Giới tính"
                            className="w-full bg-transparent text-center text-[15px] text-black outline-none placeholder:text-[#999]"
                            id="pro-input-gender"
                        />
                    </div>
                    <div className="rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5">
                        <input
                            type="text"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            placeholder="dd/mm/yyyy"
                            className="w-full bg-transparent text-center text-[15px] text-black outline-none placeholder:text-[#999]"
                            id="pro-input-birthday"
                        />
                    </div>
                </div>

                {/* Chọn ngân hàng */}
                <div className="rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5">
                    <input
                        type="text"
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                        placeholder="Chọn ngân hàng"
                        className="w-full bg-transparent text-center text-[15px] text-black outline-none placeholder:text-[#999]"
                        id="pro-input-bank"
                    />
                </div>

                {/* Số tài khoản ngân hàng */}
                <div className="rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5">
                    <input
                        type="text"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        placeholder="Số tài khoản ngân hàng"
                        className="w-full bg-transparent text-center text-[15px] text-black outline-none placeholder:text-[#999]"
                        id="pro-input-bank-account"
                    />
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-[#999]"
                        id="pro-input-email"
                    />
                </div>

                {/* Số điện thoại */}
                <div className="flex items-center gap-3 rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Số điện thoại"
                        className="flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-[#999]"
                        id="pro-input-phone"
                    />
                </div>

                {/* Địa chỉ */}
                <div className="flex items-center gap-3 rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Địa chỉ"
                        className="flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-[#999]"
                        id="pro-input-address"
                    />
                </div>
            </div>

            {/* Mô tả */}
            <h3 className="mt-8 text-[18px] font-bold text-black">Mô tả</h3>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder=""
                rows={5}
                className="mt-3 w-full resize-none rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3.5 text-[15px] text-black outline-none transition placeholder:text-[#999] focus:border-green-primary"
                id="pro-textarea-description"
            />

            {/* Gửi */}
            <div className="mt-6 flex justify-center">
                <button
                    type="button"
                    onClick={async () => {
                        if (isSubmitting) return;
                        if (
                            !name.trim() ||
                            !birthday.trim() ||
                            !bank.trim() ||
                            !bankAccount.trim() ||
                            !email.trim() ||
                            !phone.trim() ||
                            !address.trim()
                        ) {
                            setSubmitError('Vui lòng nhập đầy đủ thông tin bắt buộc.');
                            return;
                        }

                        setSubmitError(null);
                        setIsSubmitting(true);
                        try {
                            await userCommerceApi.dangKyKiemTienNoiDung({
                                ten_tai_khoan: name.trim(),
                                gioi_tinh: gender.trim() || undefined,
                                ngay_sinh: birthday.trim(),
                                ngan_hang: bank.trim(),
                                so_tai_khoan_ngan_hang: bankAccount.trim(),
                                email: email.trim(),
                                so_dien_thoai: phone.trim(),
                                dia_chi: address.trim(),
                                mo_ta: description.trim() || undefined,
                            });
                            setPendingRequestLabel('Kiếm tiền từ nội dung');
                            setStep('pending');
                        } catch (error) {
                            setSubmitError(
                                error instanceof Error
                                    ? error.message
                                    : 'Không gửi được đăng ký kiếm tiền từ nội dung',
                            );
                        } finally {
                            setIsSubmitting(false);
                        }
                    }}
                    className="min-w-[160px] rounded-[10px] bg-[#2e7d32] px-10 py-3 text-[16px] font-bold text-white transition hover:bg-[#256b28]"
                    id="btn-submit-professional"
                >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                </button>
            </div>
            {submitError ? (
                <p className="mt-3 text-center text-sm text-red-500">{submitError}</p>
            ) : null}
        </div>
    );
}

/* ═══════════════════════════════════════════
   TAB 4 – Quản lý chặn
   ═══════════════════════════════════════════ */
const BLOCK_SECTIONS = [
    {
        title: 'Danh Sách hạn chế',
        modalTitle: 'Danh Sách hạn chế',
        addLabel: 'Thêm vào danh sách hạn chế',
        body: 'Khi bạn thêm trang cá nhân của ai đó vào Danh sách hạn chế thì trên DishNet, họ sẽ không nhìn thấy các bài viết mà bạn chỉ chia sẻ với Bạn bè. Họ có thể vẫn nhìn thấy nội dung bạn chia sẻ Công khai hoặc trên trang cá nhân của một người bạn chung, cũng như các bài viết có gắn thẻ trang cá nhân của họ. DishNet không thông báo cho bạn bè của bạn khi bạn thêm họ vào Danh sách hạn chế.',
        hasModal: true,
        mode: 'unsupported',
    },
    {
        title: 'Chặn trang cá nhân và Cửa hàng',
        modalTitle: 'Danh Sách chặn',
        addLabel: 'Thêm vào danh sách chặn',
        body: 'Sau khi bạn chặn một trang cá nhân/ cửa hàng, các bạn không thể tương tác với trang cá nhân, bài viết, bình luận hoặc tin nhắn của nhau nữa. Điều này không áp dụng với ứng dụng, game hoặc nhóm mà cả hai cùng tham gia. Nếu bạn đang kết nối với trang cá nhân/ cửa hàng đó thì khi bạn chặn, hệ thống sẽ hủy kết bạn, bỏ thích và bỏ theo dõi Trang/trang cá nhân đó.',
        hasModal: true,
        mode: 'block',
    },
    {
        title: 'Biệt danh bị chặn',
        modalTitle: '',
        addLabel: '',
        body: 'Họ không thể gắn thẻ bạn hay tương tác với nội dung của bạn. Trong một số trường hợp, họ có thể vẫn xem được nội dung của bạn. Thao tác chặn có thể không ngăn được mọi hoạt động tương tác hoặc giao tiếp.',
        hasModal: false,
    },
    {
        title: 'Chặn tin nhắn',
        modalTitle: 'Chặn tin nhắn',
        addLabel: 'Thêm vào danh sách chặn',
        body: 'Nếu bạn chặn trang cá nhân của ai đó trên DishNet, họ cũng sẽ không thể liên hệ với bạn trong tin nhắn. Nếu bạn không chặn trang cá nhân DishNet của ai đó và bất kỳ trang cá nhân nào khác họ có khả năng tạo, họ sẽ có thể đăng bài lên dòng thời gian của bạn, gắn thẻ bạn và bình luận về bài viết hoặc bình luận của bạn.',
        hasModal: true,
        mode: 'block',
    },
];

type BlockCandidate = {
    id: number;
    name: string;
    handle: string;
    avatar: string;
    area: string;
    da_chan: boolean;
};

function BlockManagementTab() {
    const [modalSection, setModalSection] = useState<string | null>(null);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<BlockCandidate[]>([]);
    const [knownBlocked, setKnownBlocked] = useState<Record<number, BlockCandidate>>({});
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const [processingIds, setProcessingIds] = useState<Record<number, boolean>>({});

    const currentSection = BLOCK_SECTIONS.find((s) => s.title === modalSection);
    const isBlockSection = currentSection?.mode === 'block';
    const currentBlocked = Object.values(knownBlocked)
        .filter((user) => user.da_chan)
        .sort((a, b) => a.name.localeCompare(b.name, 'vi'));

    useEffect(() => {
        if (!currentSection || !isBlockSection) {
            setSearchResults([]);
            setSearchError(null);
            setIsSearching(false);
            return;
        }

        const query = searchText.trim();
        if (!query) {
            setSearchResults([]);
            setSearchError(null);
            setIsSearching(false);
            return;
        }

        let cancelled = false;
        const timer = window.setTimeout(() => {
            void (async () => {
                setIsSearching(true);
                setSearchError(null);
                try {
                    const payload: any = await userContentApi.timKiem({
                        tu_khoa: query,
                        loai: 'nguoi_dung',
                        trang: 1,
                        so_luong: 20,
                    });
                    const rows: any[] = Array.isArray(payload?.ket_qua?.nguoi_dung?.du_lieu)
                        ? payload.ket_qua.nguoi_dung.du_lieu
                        : [];

                    const withStatus = await Promise.all(
                        rows.map(async (item) => {
                            const id = Number(item?.id);
                            if (!Number.isFinite(id) || id <= 0) return null;
                            try {
                                const status: any = await userContentApi.layTrangThaiTuongTacNguoiDung(id);
                                return {
                                    id,
                                    name: String(item?.ten_hien_thi ?? 'Người dùng'),
                                    handle: String(item?.ten_dang_nhap ?? ''),
                                    avatar: String(item?.anh_dai_dien ?? ''),
                                    area: String(item?.khu_vuc ?? ''),
                                    da_chan: Boolean(status?.da_chan),
                                } satisfies BlockCandidate;
                            } catch {
                                return {
                                    id,
                                    name: String(item?.ten_hien_thi ?? 'Người dùng'),
                                    handle: String(item?.ten_dang_nhap ?? ''),
                                    avatar: String(item?.anh_dai_dien ?? ''),
                                    area: String(item?.khu_vuc ?? ''),
                                    da_chan: false,
                                } satisfies BlockCandidate;
                            }
                        }),
                    );

                    if (cancelled) return;
                    const normalized = withStatus.filter((item): item is BlockCandidate => Boolean(item));
                    setSearchResults(normalized);
                    setKnownBlocked((prev) => {
                        const next = { ...prev };
                        normalized.forEach((item) => {
                            if (item.da_chan) {
                                next[item.id] = item;
                            } else if (next[item.id]) {
                                next[item.id] = { ...next[item.id], ...item, da_chan: false };
                            }
                        });
                        return next;
                    });
                } catch (error) {
                    if (cancelled) return;
                    setSearchResults([]);
                    setSearchError(
                        error instanceof Error
                            ? error.message
                            : 'Không tìm kiếm được người dùng để chặn/bỏ chặn',
                    );
                } finally {
                    if (!cancelled) {
                        setIsSearching(false);
                    }
                }
            })();
        }, 350);

        return () => {
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [currentSection, isBlockSection, searchText]);

    const handleToggleBlock = async (user: BlockCandidate) => {
        if (!isBlockSection) return;
        setProcessingIds((prev) => ({ ...prev, [user.id]: true }));
        setSearchError(null);
        try {
            const payload: any = await userContentApi.toggleChanNguoiDung(user.id);
            const daChan = Boolean(payload?.da_chan);
            setSearchResults((prev) =>
                prev.map((item) => (item.id === user.id ? { ...item, da_chan: daChan } : item)),
            );
            setKnownBlocked((prev) => {
                const next = { ...prev };
                if (daChan) {
                    next[user.id] = { ...user, da_chan: true };
                } else {
                    next[user.id] = { ...user, da_chan: false };
                }
                return next;
            });
        } catch (error) {
            setSearchError(
                error instanceof Error ? error.message : 'Không cập nhật trạng thái chặn',
            );
        } finally {
            setProcessingIds((prev) => ({ ...prev, [user.id]: false }));
        }
    };

    const openModal = (title: string) => {
        setModalSection(title);
        setSearchText('');
        setSearchError(null);
    };

    const closeModal = () => {
        setModalSection(null);
        setSearchText('');
        setSearchResults([]);
        setSearchError(null);
        setIsSearching(false);
    };

    return (
        <div>
            <h2 className="text-[22px] font-bold text-black">Quản lý chặn</h2>

            <div className="mt-6 space-y-6">
                {BLOCK_SECTIONS.map((section) => (
                    <div key={section.title} className="border-b border-[#e8e5dc] pb-6 last:border-b-0">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <h3 className="text-[16px] font-bold text-black">{section.title}</h3>
                                <p className="mt-2 text-[13px] leading-6 text-[#555]">{section.body}</p>
                            </div>
                            {section.hasModal && (
                                <button
                                    type="button"
                                    onClick={() => openModal(section.title)}
                                    className="shrink-0 rounded-[8px] border border-[#333] bg-white px-5 py-2 text-[14px] font-semibold text-black transition hover:bg-gray-100"
                                >
                                    Chỉnh sửa
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Modal ── */}
            {currentSection && currentSection.hasModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={closeModal}>
                    <div className="relative w-full max-w-[520px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4">
                            <h3 className="flex-1 text-center text-[16px] font-bold text-black">{currentSection.modalTitle}</h3>
                            <button type="button" onClick={closeModal} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">
                                ×
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-6 pb-6">
                            {/* Description */}
                            <p className="text-[13px] leading-6 text-[#555]">{currentSection.body}</p>
                            {!isBlockSection ? (
                                <p className="mt-4 rounded-[8px] border border-[#e8e5dc] bg-[#f8faf8] px-3 py-2 text-[13px] text-[#666]">
                                    Mục này hiện chưa có endpoint API riêng, nên hệ thống không hiển thị dữ liệu giả.
                                </p>
                            ) : (
                                <>
                                    {/* Add button */}
                                    <button type="button" className="mt-4 flex items-center gap-3 px-1 py-2">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2e7d32] text-[16px] font-bold text-white">+</span>
                                        <span className="text-[14px] font-semibold text-[#2e7d32]">{currentSection.addLabel}</span>
                                    </button>

                                    {/* Search */}
                                    <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-[#e0ddd6] bg-white px-3 py-2.5">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                                        <input
                                            type="text"
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                            placeholder="Nhập tên tài khoản / cửa hàng"
                                            className="flex-1 bg-transparent text-[14px] text-black outline-none placeholder:text-[#999]"
                                            id="block-search"
                                        />
                                    </div>

                                    {isSearching ? (
                                        <p className="mt-2 text-[12px] text-[#888]">Đang tìm kiếm...</p>
                                    ) : null}
                                    {searchError ? (
                                        <p className="mt-2 text-[12px] text-red-500">{searchError}</p>
                                    ) : null}

                                    {/* Search results (API) */}
                                    {searchText && searchResults.length > 0 && (
                                        <div className="mt-2 max-h-[220px] overflow-y-auto rounded-[10px] border border-[#e0ddd6] bg-[#fdfcf8]">
                                            {searchResults.map((user) => (
                                                <div key={user.id} className="flex items-center justify-between px-4 py-2.5 transition hover:bg-[#f6faf4]">
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        {user.avatar ? (
                                                            <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                                                        ) : (
                                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8e8e8] text-[13px] text-[#888]">👤</div>
                                                        )}
                                                        <div className="min-w-0">
                                                            <p className="truncate text-[14px] font-medium text-black">{user.name}</p>
                                                            <p className="truncate text-[12px] text-[#777]">
                                                                {user.handle ? `@${user.handle}` : 'Người dùng'}
                                                                {user.area ? ` • ${user.area}` : ''}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => void handleToggleBlock(user)}
                                                        disabled={Boolean(processingIds[user.id])}
                                                        className="rounded-[6px] border border-[#ddd] bg-white px-4 py-1.5 text-[13px] font-semibold text-black transition hover:bg-[#f0f0f0] disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        {processingIds[user.id]
                                                            ? 'Đang xử lý...'
                                                            : user.da_chan
                                                                ? 'Bỏ chặn'
                                                                : 'Chặn'}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Blocked list from API actions */}
                                    <div className="mt-3 max-h-[240px] overflow-y-auto">
                                        {currentBlocked.map((user) => (
                                            <div key={user.id} className="flex items-center justify-between rounded-[8px] px-2 py-2.5 transition hover:bg-[#f6faf4]">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    {user.avatar ? (
                                                        <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                                                    ) : (
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8e8e8] text-[14px] text-[#888]">👤</div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <span className="block truncate text-[14px] font-medium text-black">{user.name}</span>
                                                        <span className="block truncate text-[12px] text-[#777]">{user.handle ? `@${user.handle}` : 'Người dùng'}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => void handleToggleBlock(user)}
                                                    disabled={Boolean(processingIds[user.id])}
                                                    className="rounded-[6px] border border-[#ddd] bg-white px-4 py-1.5 text-[13px] font-semibold text-black transition hover:bg-[#f0f0f0] disabled:cursor-not-allowed disabled:opacity-60"
                                                >
                                                    Gỡ
                                                </button>
                                            </div>
                                        ))}
                                        {currentBlocked.length === 0 && (
                                            <p className="py-4 text-center text-[13px] text-[#999]">
                                                Chưa có dữ liệu chặn. Hãy tìm kiếm tài khoản để chặn/bỏ chặn.
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   TOGGLE SWITCH (reusable)
   ═══════════════════════════════════════════ */
function ToggleSwitch({
    checked,
    onChange,
    id,
}: {
    checked: boolean;
    onChange: (value: boolean) => void;
    id?: string;
}) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative h-[26px] w-[46px] rounded-full transition-colors ${
                checked ? 'bg-[#2e7d32]' : 'bg-[#ccc]'
            }`}
            id={id}
        >
            <span
                className={`absolute top-[3px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    checked ? 'left-[23px]' : 'left-[3px]'
                }`}
            />
        </button>
    );
}

/* ═══════════════════════════════════════════
   MAIN SETTINGS PAGE
   ═══════════════════════════════════════════ */
export default function SettingsPageClient({ profile }: { profile: UserProfile }) {
    const [activeTab, setActiveTab] = useState<SettingsTab>('personal');

    return (
        <div className="bg-[#f1f2f1] py-8">
            <div className="mx-auto flex w-full max-w-[1100px] gap-0 overflow-hidden rounded-[20px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
                {/* ── Sidebar ── */}
                <aside className="w-[260px] shrink-0 border-r border-[#ececec] bg-white py-8">
                    <h1 className="px-6 text-[22px] font-bold text-black">Cài đặt</h1>

                    <nav className="mt-6 space-y-0">
                        {SIDEBAR_ITEMS.map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                onClick={() => setActiveTab(item.key)}
                                className={`relative flex w-full items-center px-6 py-3.5 text-left text-[15px] transition ${
                                    activeTab === item.key
                                        ? 'bg-[#f6faf4] font-bold text-[#2e7d32]'
                                        : 'font-medium text-[#333] hover:bg-[#fafafa]'
                                }`}
                                id={`settings-tab-${item.key}`}
                            >
                                {activeTab === item.key && (
                                    <span className="absolute left-0 top-0 h-full w-[4px] rounded-r-[3px] bg-[#2e7d32]" />
                                )}
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* ── Content ── */}
                <main className="min-h-[600px] flex-1 px-10 py-8">
                    {activeTab === 'personal' && <PersonalInfoTab profile={profile} />}
                    {activeTab === 'password' && <PasswordTab />}
                    {activeTab === 'professional' && <ProfessionalTab profile={profile} />}
                    {activeTab === 'block' && <BlockManagementTab />}
                </main>
            </div>
        </div>
    );
}
