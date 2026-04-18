'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useRef, useState } from 'react';

import type { UserProfile } from '@/features/profile/data';

function Toggle({
    checked,
    onToggle,
    id,
}: {
    checked: boolean;
    onToggle: () => void;
    id?: string;
}) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className={`relative h-7 w-12 rounded-full transition-colors ${checked ? 'bg-[#2f8f22]' : 'bg-[#737b87]'}`}
            id={id}
        >
            <span
                className={`absolute top-[2px] h-[24px] w-[24px] rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}
            />
        </button>
    );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <label className="text-[14px] font-bold text-[#4b4f56] sm:text-[15px]">
            {children}
        </label>
    );
}

function RowField({
    label,
    children,
}: {
    label: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="grid gap-2 border-b border-[#ececec] py-4 sm:grid-cols-[110px_minmax(0,1fr)] sm:items-start sm:gap-4">
            <div className="pt-2">
                {typeof label === 'string' ? <FieldLabel>{label}</FieldLabel> : label}
            </div>
            <div>{children}</div>
        </div>
    );
}

export default function EditProfilePageClient({
    profile,
    backHref = '/user/profile',
}: {
    profile: UserProfile;
    backHref?: string;
}) {
    const [accountName, setAccountName] = useState(profile.handle || profile.name);
    const [gender, setGender] = useState(profile.gender);
    const [birthday, setBirthday] = useState(profile.birthday);
    const [bio, setBio] = useState('');
    const [showGender, setShowGender] = useState(false);
    const [showBirthday, setShowBirthday] = useState(false);
    const [showBadge, setShowBadge] = useState(profile.showBadge);
    const [showTrustScore, setShowTrustScore] = useState(profile.showTrustScore);
    const [isPrivate, setIsPrivate] = useState(profile.isPrivate);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const avatarInputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        setIsSaving(true);
        window.setTimeout(() => {
            setIsSaving(false);
            setSaved(true);
            window.setTimeout(() => setSaved(false), 1800);
        }, 800);
    };

    const remainingBio = Math.max(0, 80 - bio.length);

    return (
        <div className="min-h-screen bg-[#f3f4f2] px-4 py-6 sm:px-6 sm:py-8">
            <section className="mx-auto w-full max-w-[680px] overflow-hidden rounded-[24px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between border-b border-[#ededed] px-5 py-5 sm:px-8">
                    <h1 className="text-[22px] font-bold text-[#1d1d1d] sm:text-[24px]">Sửa trang cá nhân</h1>
                    <Link
                        href={backHref}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#666] transition hover:bg-[#f4f4f4]"
                        id="btn-back-profile"
                        aria-label="Đóng"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                            <path d="M6 6 18 18" />
                            <path d="M18 6 6 18" />
                        </svg>
                    </Link>
                </div>

                <div className="px-5 py-5 sm:px-8 sm:py-6">
                    <div className="rounded-[16px] bg-[#f6f8fb] px-4 py-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-[16px] bg-[#f6f1ca]">
                                <img src={profile.avatar} alt={profile.name} className="h-[44px] w-[44px] rounded-[12px] object-cover" />
                            </div>
                            <button
                                type="button"
                                onClick={() => avatarInputRef.current?.click()}
                                className="rounded-[10px] bg-[#2f8f22] px-5 py-2.5 text-[14px] font-bold text-white transition hover:bg-[#27771d]"
                                id="btn-change-avatar"
                            >
                                Đổi ảnh
                            </button>
                            <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" id="input-avatar" />
                        </div>
                    </div>

                    <div className="mt-7">
                        <RowField label="Tên tài khoản">
                            <input
                                type="text"
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                                className="h-12 w-full rounded-[10px] border border-[#e1e5ea] bg-[#fafbfc] px-4 text-[15px] text-[#1d1d1d] outline-none transition focus:border-[#2f8f22] focus:bg-white"
                                id="input-name"
                            />
                        </RowField>

                        <RowField label="Giới tính">
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="h-12 flex-1 rounded-[10px] border border-[#e1e5ea] bg-white px-4 text-[15px] text-[#1d1d1d] outline-none transition focus:border-[#2f8f22]"
                                    id="input-gender"
                                />
                                <Toggle checked={showGender} onToggle={() => setShowGender((current) => !current)} id="toggle-gender" />
                            </div>
                        </RowField>

                        <RowField label="Ngày sinh">
                            <div className="flex items-center gap-3">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                        placeholder="dd/mm/yyyy"
                                        className="h-12 w-full rounded-[10px] border border-[#e1e5ea] bg-white px-4 pr-11 text-[15px] text-[#1d1d1d] outline-none transition focus:border-[#2f8f22]"
                                        id="input-birthday"
                                    />
                                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#666]">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                    </span>
                                </div>
                                <Toggle checked={showBirthday} onToggle={() => setShowBirthday((current) => !current)} id="toggle-birthday" />
                            </div>
                        </RowField>

                        <RowField label="Tiểu sử">
                            <div>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value.slice(0, 80))}
                                    placeholder="Tiểu sử"
                                    rows={4}
                                    className="w-full resize-none rounded-[10px] border border-[#e1e5ea] bg-[#fafbfc] px-4 py-3 text-[15px] text-[#1d1d1d] outline-none transition focus:border-[#2f8f22] focus:bg-white"
                                    id="input-bio"
                                />
                                <div className="mt-1 text-[12px] text-[#8e939c]">
                                    {80 - remainingBio}/80
                                </div>
                            </div>
                        </RowField>

                        <div className="py-5">
                            <FieldLabel>Hiển thị huy hiệu</FieldLabel>

                            <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between rounded-[14px] border border-[#e8ebef] bg-white px-4 py-4">
                                    <span className="text-[14px] text-[#1f2328] sm:text-[15px]">Hiển thị huy hiệu</span>
                                    <Toggle checked={showBadge} onToggle={() => setShowBadge((current) => !current)} id="toggle-badge" />
                                </div>

                                <div className="flex items-center justify-between rounded-[14px] border border-[#e8ebef] bg-white px-4 py-4">
                                    <span className="text-[14px] text-[#1f2328] sm:text-[15px]">Hiển thị độ uy tín</span>
                                    <Toggle checked={showTrustScore} onToggle={() => setShowTrustScore((current) => !current)} id="toggle-trust" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 py-2">
                            <span className="inline-flex rounded-[4px] bg-[#ffab1f] px-2 py-1 text-[14px] font-bold text-black">
                                Chế độ tài khoản riêng tư
                            </span>
                            <Toggle checked={isPrivate} onToggle={() => setIsPrivate((current) => !current)} id="toggle-private" />
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-3">
                            <Link
                                href={backHref}
                                className="flex h-12 min-w-[82px] items-center justify-center rounded-[8px] border border-[#e3e3e3] bg-white px-5 text-[15px] font-semibold text-[#4b4f56] transition hover:bg-[#f7f7f7]"
                            >
                                Hủy
                            </Link>
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={isSaving}
                                className={`flex h-12 min-w-[82px] items-center justify-center rounded-[8px] px-5 text-[15px] font-semibold transition ${
                                    saved
                                        ? 'bg-[#e9f7e7] text-[#2f8f22]'
                                        : 'bg-[#ebebeb] text-[#a1a1a1] hover:bg-[#e1e1e1]'
                                } disabled:cursor-not-allowed`}
                                id="btn-save-profile"
                            >
                                {isSaving ? 'Đang lưu...' : saved ? 'Đã lưu' : 'Lưu'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
