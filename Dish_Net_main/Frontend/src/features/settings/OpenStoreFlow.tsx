'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState } from 'react';

import type { UserProfile } from '@/features/profile/data';
import { userCommerceApi } from '@/shared/userCommerceApi';
import ExploreAddressMap from '@/features/explore/ExploreAddressMap';

type StoreStep = 'form' | 'contract' | 'payment' | 'pending';
type StoreRequestStatus = 'cho_duyet' | 'da_duyet' | 'da_tu_choi';

const CATEGORY_OPTIONS = [
    'Đồ chay',
    'Đồ uống',
    'Đồ mặn',
    'Đồ ăn nhanh',
    'Ăn vặt',
    'Bánh & Tráng miệng',
    'Lẩu & Nướng',
    'Cơm',
    'Bún & Phở',
    'Hải sản',
];

const STORE_ACTIVATION_BANK_INFO = {
    accountNumber:
        process.env.NEXT_PUBLIC_STORE_ACTIVATION_ACCOUNT_NUMBER?.trim() ||
        '190368668688',
    bankName:
        process.env.NEXT_PUBLIC_STORE_ACTIVATION_BANK_NAME?.trim() || 'Techcombank',
    accountHolder:
        process.env.NEXT_PUBLIC_STORE_ACTIVATION_ACCOUNT_HOLDER?.trim() || 'CONG TY TNHH DISHNET',
    transferContentPrefix:
        process.env.NEXT_PUBLIC_STORE_ACTIVATION_TRANSFER_PREFIX?.trim() || 'MOQUAN',
};

/* ═══════════════════════════════════════════
   HELPER: Label Field
   ═══════════════════════════════════════════ */
type FieldFilter = 'none' | 'digits' | 'letters';

function applyFilter(value: string, filter: FieldFilter, maxLength?: number): string {
    let v = value;
    if (filter === 'digits') v = v.replace(/\D/g, '');
    if (filter === 'letters') {
        // Cho phép chữ Việt (có dấu), khoảng trắng, dấu chấm để viết tên đệm rút gọn (vd: Nguyễn V. A)
        v = v.replace(/[^a-zA-ZÀ-ỹà-ỹĂ-ỹÂ-ỹÊ-ỹÔ-ỹƠ-ỹƯ-ỹĐđ\s.]/g, '');
    }
    if (maxLength != null && v.length > maxLength) v = v.slice(0, maxLength);
    return v;
}

function LabelField({
    label,
    value,
    onChange,
    placeholder,
    id,
    iconRight,
    error,
    filter = 'none',
    maxLength,
    inputMode,
    type = 'text',
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    id: string;
    iconRight?: 'pin';
    error?: string;
    filter?: FieldFilter;
    maxLength?: number;
    inputMode?: 'text' | 'numeric' | 'tel';
    type?: 'text' | 'tel';
}) {
    return (
        <div className="flex items-start gap-4">
            <span className="mt-3 w-[140px] shrink-0 text-[15px] text-[#333]">{label}</span>
            <div className="flex flex-1 flex-col">
                <div
                    className={`flex items-center rounded-[10px] border bg-white px-4 py-3 transition ${
                        error ? 'border-[#ef4444]' : 'border-[#e0ddd6]'
                    }`}
                >
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(applyFilter(e.target.value, filter, maxLength))}
                        onKeyDown={(e) => {
                            if (filter !== 'digits') return;
                            if (
                                e.key.length === 1 &&
                                !/[0-9]/.test(e.key) &&
                                !e.ctrlKey &&
                                !e.metaKey
                            ) {
                                e.preventDefault();
                            }
                        }}
                        onPaste={(e) => {
                            if (filter === 'none') return;
                            const text = e.clipboardData.getData('text');
                            const cleaned = applyFilter(text, filter, maxLength);
                            if (cleaned !== text) {
                                e.preventDefault();
                                onChange(applyFilter(value + cleaned, filter, maxLength));
                            }
                        }}
                        placeholder={placeholder}
                        inputMode={inputMode}
                        maxLength={maxLength}
                        className="flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-[#999]"
                        id={id}
                    />
                    {iconRight === 'pin' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    )}
                </div>
                {error ? (
                    <p className="mt-1 text-[12px] text-[#ef4444]">{error}</p>
                ) : null}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   HELPER: Term Checkbox
   ═══════════════════════════════════════════ */
function TermCheckbox({
    checked,
    onChange,
    bold,
    text,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    bold: string;
    text: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition ${
                    checked ? 'bg-[#2e7d32] text-white' : 'border-2 border-[#ccc] bg-white'
                }`}
            >
                {checked && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
            </button>
            <p className="text-[13px] leading-5 text-[#333]">
                <strong>{bold}</strong> {text}
            </p>
        </div>
    );
}

/* ═══════════════════════════════════════════
   CONTRACT CLAUSES
   ═══════════════════════════════════════════ */
const CONTRACT_CLAUSES = [
    {
        title: 'ĐIỀU 1: NỘI DUNG DỊCH VỤ',
        body: '1.1. Bên A cấp quyền cho Bên B sử dụng các tính năng nâng cao thuộc "Chế độ chuyên nghiệp" trên nền tảng DishNet, bao gồm: Đăng tải thực đơn, tiếp nhận đơn hàng trực tuyến, và sử dụng công cụ quản lý doanh thu. 1.2. Bên B được quyền tự vận hành gian hàng và kinh doanh các mặt hàng ăn uống phù hợp với quy định của pháp luật.',
    },
    {
        title: 'ĐIỀU 2: PHÍ DỊCH VỤ VÀ PHƯƠNG THỨC THANH TOÁN',
        body: '2.1. Phí kích hoạt: Bên B đồng ý thanh toán cho Bên A khoản phí một lần là 5.000.000 VNĐ (Năm triệu đồng chẵn). 2.2. Tính chất phí: Đây là phí bản quyền sử dụng tính năng và hỗ trợ kỹ thuật ban đầu. Khoản phí này sẽ không được hoàn trả dưới bất kỳ hình thức nào sau khi Bên B đã kích hoạt thành công tài khoản chuyên nghiệp.',
    },
    {
        title: 'ĐIỀU 3: QUY ĐỊNH ĐẶC THÙ VỀ VẬN CHUYỂN',
        body: '3.1. Cơ chế vận hành: Bên B xác nhận hiểu rõ rằng nền tảng DishNet KHÔNG cung cấp nhân sự giao hàng (Shipper). 3.2. Trách nhiệm của Bên B: Bên B hoàn toàn chủ động trong việc bố trí nhân sự hoặc đối tác thứ ba để thực hiện việc giao hàng đến tay người mua. 3.3. Chi phí vận chuyển: Bên B có quyền thiết lập mức phí vận chuyển hiển thị trên hệ thống. Mọi tranh chấp về phí giao hàng hoặc sự cố trong quá trình vận chuyển (chậm trễ, hư hỏng thực phẩm) thuộc trách nhiệm giải quyết của Bên B.',
    },
    {
        title: 'ĐIỀU 4: CAM KẾT VỀ CHẤT LƯỢNG VÀ PHÁP LÝ',
        body: '4.1. Bên B cam kết các thông tin đăng ký là chính xác và chịu trách nhiệm hoàn toàn về tính an toàn vệ sinh thực phẩm của các món ăn cung cấp cho khách hàng. 4.2. Bên B cam kết không sử dụng nền tảng DishNet để thực hiện các hành vi vi phạm pháp luật hoặc lừa đảo khách hàng.',
    },
    {
        title: 'ĐIỀU 5: ĐIỀU KHOẢN THI HÀNH',
        body: '5.1. Thỏa thuận này có giá trị kể từ thời điểm Bên B xác nhận đồng ý trên giao diện web và hoàn tất giao dịch thanh toán phí dịch vụ. 5.2. Mọi thông báo giữa hai bên sẽ được thực hiện qua địa chỉ email hoặc số điện thoại đã đăng ký trên hệ thống.',
    },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT: OpenStoreFlow
   ═══════════════════════════════════════════════════════════════ */
export default function OpenStoreFlow({
    profile,
    onBack = () => undefined,
    existingRequestStatus,
    existingRejectReason,
}: {
    profile: UserProfile;
    onBack?: () => void;
    existingRequestStatus?: StoreRequestStatus | null;
    existingRejectReason?: string | null;
}) {
    const [step, setStep] = useState<StoreStep>(
        existingRequestStatus === 'cho_duyet' ? 'pending' : 'form',
    );

    /* ── Form state ── */
    const [ownerName, setOwnerName] = useState('');
    const [cccd, setCccd] = useState('');
    const [storePhone, setStorePhone] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [storeName, setStoreName] = useState('');
    const [storeContactPhone, setStoreContactPhone] = useState('');
    const [category, setCategory] = useState('');
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [hoursFrom, setHoursFrom] = useState('');
    const [hoursTo, setHoursTo] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [termShipping, setTermShipping] = useState(false);
    const [termFee, setTermFee] = useState(false);
    const [termQuality, setTermQuality] = useState(false);
    const [cccdVerified, setCccdVerified] = useState(false);
    const [cccdFiles, setCccdFiles] = useState<File[]>([]);
    const [menuFiles, setMenuFiles] = useState<File[]>([]);
    const [paymentProofFiles, setPaymentProofFiles] = useState<File[]>([]);
    const [menuImages, setMenuImages] = useState<string[]>([]);
    const [agreedContract, setAgreedContract] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{
        ownerName?: string;
        cccd?: string;
        storePhone?: string;
        storeAddress?: string;
        storeName?: string;
        storeContactPhone?: string;
        category?: string;
        hoursFrom?: string;
        hoursTo?: string;
        businessAddress?: string;
        cccdFiles?: string;
        menuFiles?: string;
    }>({});

    const clearFieldError = (key: keyof typeof fieldErrors) => {
        setFieldErrors((prev) => {
            if (!prev[key]) return prev;
            const next = { ...prev };
            delete next[key];
            return next;
        });
    };

    const validateOpenStoreForm = () => {
        const next: typeof fieldErrors = {};

        // Chủ sở hữu: chỉ chữ + space, 3-50
        const ownerVal = ownerName.trim();
        if (!ownerVal) next.ownerName = 'Vui lòng nhập họ tên chủ sở hữu.';
        else if (ownerVal.length < 3 || ownerVal.length > 50)
            next.ownerName = 'Họ tên phải từ 3-50 ký tự.';
        else if (!/^[a-zA-ZÀ-ỹà-ỹĂ-ỹÂ-ỹÊ-ỹÔ-ỹƠ-ỹƯ-ỹĐđ\s.]+$/.test(ownerVal))
            next.ownerName = 'Họ tên chỉ được chứa chữ cái và khoảng trắng.';

        // CCCD: 12 số
        if (!cccd.trim()) next.cccd = 'Vui lòng nhập số CCCD.';
        else if (!/^\d{12}$/.test(cccd.trim()))
            next.cccd = 'CCCD phải đúng 12 chữ số.';

        // SĐT cá nhân
        if (!storePhone.trim()) next.storePhone = 'Vui lòng nhập số điện thoại.';
        else if (!/^0\d{9}$/.test(storePhone.trim()))
            next.storePhone = 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.';

        // Địa chỉ cá nhân
        const addr = storeAddress.trim();
        if (!addr) next.storeAddress = 'Vui lòng nhập địa chỉ.';
        else if (addr.length < 3 || addr.length > 100)
            next.storeAddress = 'Địa chỉ phải từ 3-100 ký tự.';

        // Tên cửa hàng
        const sName = storeName.trim();
        if (!sName) next.storeName = 'Vui lòng nhập tên cửa hàng.';
        else if (sName.length < 3 || sName.length > 50)
            next.storeName = 'Tên cửa hàng phải từ 3-50 ký tự.';

        // SĐT cửa hàng
        if (!storeContactPhone.trim())
            next.storeContactPhone = 'Vui lòng nhập số điện thoại liên hệ.';
        else if (!/^0\d{9}$/.test(storeContactPhone.trim()))
            next.storeContactPhone = 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.';

        // Danh mục
        if (!category.trim()) next.category = 'Vui lòng chọn hoặc nhập danh mục.';

        // Giờ
        const reHour = /^([01]\d|2[0-3]):[0-5]\d$/;
        if (!hoursFrom.trim()) next.hoursFrom = 'Chọn giờ mở cửa.';
        else if (!reHour.test(hoursFrom.trim())) next.hoursFrom = 'Giờ không hợp lệ (00:00-23:59).';
        if (!hoursTo.trim()) next.hoursTo = 'Chọn giờ đóng cửa.';
        else if (!reHour.test(hoursTo.trim())) next.hoursTo = 'Giờ không hợp lệ (00:00-23:59).';
        if (reHour.test(hoursFrom.trim()) && reHour.test(hoursTo.trim()) && hoursFrom.trim() === hoursTo.trim())
            next.hoursTo = 'Giờ đóng phải khác giờ mở.';

        // Địa chỉ kinh doanh
        const bizAddr = businessAddress.trim();
        if (!bizAddr) next.businessAddress = 'Vui lòng nhập địa chỉ kinh doanh.';
        else if (bizAddr.length < 3 || bizAddr.length > 100)
            next.businessAddress = 'Địa chỉ phải từ 3-100 ký tự.';

        // Đính kèm
        if (cccdFiles.length < 2)
            next.cccdFiles = 'Vui lòng tải đủ ảnh CCCD mặt trước và mặt sau (2 ảnh).';
        if (menuFiles.length < 5)
            next.menuFiles = 'Vui lòng tải lên ít nhất 5 ảnh menu/món ăn.';

        return next;
    };

    const copyText = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
        } catch {
            // no-op: tránh làm gián đoạn luồng đăng ký nếu clipboard bị chặn.
        }
    };

    useEffect(() => {
        if (existingRequestStatus === 'cho_duyet') {
            setStep('pending');
        }
    }, [existingRequestStatus]);

    const menuInputRef = useRef<HTMLInputElement>(null);
    const cccdInputRef = useRef<HTMLInputElement>(null);
    const paymentProofRef = useRef<HTMLInputElement>(null);

    const handleMenuImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const selectedFiles = Array.from(files);
        const urls = selectedFiles.map((f) => URL.createObjectURL(f));
        setMenuFiles((prev) => [...prev, ...selectedFiles]);
        setMenuImages((prev) => [...prev, ...urls]);
    };

    const uploadStoreFiles = async (
        files: File[],
        loai: 'cccd' | 'menu' | 'payment',
    ): Promise<string[]> =>
        Promise.all(
            files.map(async (file) => {
                const uploaded = await userCommerceApi.uploadTepMoCuaHang(file, loai);
                return uploaded.url;
            }),
        );

    const todayStr = (() => {
        const d = new Date();
        return `ngày ${String(d.getDate()).padStart(2, '0')} tháng ${String(d.getMonth() + 1).padStart(2, '0')} năm ${d.getFullYear()}`;
    })();

    /* ══════════════════════════════════════════
       STEP 1: STORE FORM
       ══════════════════════════════════════════ */
    if (step === 'form') {
        return (
            <div>
                {/* ── Thông tin cơ bản ── */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#555] transition hover:bg-[#f4f4f4]"
                        aria-label="Quay lại"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    <h2 className="text-[22px] font-bold text-black">Thông tin cơ bản</h2>
                </div>
                {existingRequestStatus === 'da_tu_choi' && existingRejectReason ? (
                    <p className="mt-3 rounded-[8px] border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                        Lý do từ chối gần nhất: {existingRejectReason}
                    </p>
                ) : null}
                <div className="mt-5 space-y-4">
                    <LabelField
                        label="Chủ sở hữu"
                        value={ownerName}
                        onChange={(v) => { setOwnerName(v); clearFieldError('ownerName'); }}
                        placeholder="Họ và tên theo CCCD"
                        id="store-owner"
                        filter="letters"
                        maxLength={50}
                        error={fieldErrors.ownerName}
                    />
                    <LabelField
                        label="Số CCCD"
                        value={cccd}
                        onChange={(v) => { setCccd(v); clearFieldError('cccd'); }}
                        placeholder="12 chữ số trên CCCD"
                        id="store-cccd"
                        filter="digits"
                        maxLength={12}
                        inputMode="numeric"
                        type="tel"
                        error={fieldErrors.cccd}
                    />
                    <LabelField
                        label="Số điện thoại"
                        value={storePhone}
                        onChange={(v) => { setStorePhone(v); clearFieldError('storePhone'); }}
                        placeholder="Ví dụ: 0901234567"
                        id="store-phone"
                        filter="digits"
                        maxLength={10}
                        inputMode="numeric"
                        type="tel"
                        error={fieldErrors.storePhone}
                    />
                    <LabelField
                        label="Địa chỉ"
                        value={storeAddress}
                        onChange={(v) => { setStoreAddress(v); clearFieldError('storeAddress'); }}
                        placeholder="Số nhà, Tên đường, Quận/Huyện, Thành phố"
                        id="store-address"
                        iconRight="pin"
                        maxLength={100}
                        error={fieldErrors.storeAddress}
                    />
                    <div className="flex items-start gap-4">
                        <span className="hidden w-[140px] shrink-0 text-[15px] text-[#333] sm:block" />
                        <div className="flex-1">
                            <ExploreAddressMap
                                address={storeAddress}
                                onAddressChange={(next) => { setStoreAddress(next); clearFieldError('storeAddress'); }}
                            />
                        </div>
                    </div>
                </div>

                {/* ── Thông tin cửa hàng ── */}
                <h2 className="mt-8 text-[22px] font-bold text-black">Thông tin cửa hàng</h2>
                <div className="mt-5 space-y-4">
                    <LabelField
                        label="Tên cửa hàng"
                        value={storeName}
                        onChange={(v) => { setStoreName(v); clearFieldError('storeName'); }}
                        placeholder="Ví dụ : Mimi Foood"
                        id="store-name"
                        maxLength={50}
                        error={fieldErrors.storeName}
                    />
                    <LabelField
                        label="Số điện thoại liên hệ"
                        value={storeContactPhone}
                        onChange={(v) => { setStoreContactPhone(v); clearFieldError('storeContactPhone'); }}
                        placeholder="Ví dụ: 0901234567"
                        id="store-contact"
                        filter="digits"
                        maxLength={10}
                        inputMode="numeric"
                        type="tel"
                        error={fieldErrors.storeContactPhone}
                    />

                    {/* Danh mục – nhập trực tiếp hoặc chọn dropdown */}
                    <div className="flex items-center gap-4">
                        <span className="w-[140px] shrink-0 text-[15px] text-[#333]">Danh mục</span>
                        <div className="relative flex-1">
                            <div className={`flex items-center rounded-[10px] border bg-white px-4 py-3 ${fieldErrors.category ? 'border-[#ef4444]' : 'border-[#e0ddd6]'}`}>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => { setCategory(e.target.value); clearFieldError('category'); }}
                                    placeholder="Thể loại món"
                                    className="flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-[#999]"
                                    id="store-category"
                                />
                                <button
                                    type="button"
                                    onClick={() => setCategoryOpen(!categoryOpen)}
                                    className="ml-2 text-[#999] transition hover:text-black"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>
                            </div>
                            {categoryOpen && (
                                <div className="absolute left-0 top-[calc(100%+4px)] z-20 max-h-[240px] w-full overflow-y-auto rounded-[10px] border border-[#e0ddd6] bg-white shadow-lg">
                                    {CATEGORY_OPTIONS.map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => {
                                                setCategory((prev) => (prev ? `${prev}, ${opt}` : opt));
                                                setCategoryOpen(false);
                                                clearFieldError('category');
                                            }}
                                            className="block w-full px-4 py-2.5 text-left text-[14px] text-black transition hover:bg-[#f6faf4]"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {fieldErrors.category ? (
                                <p className="mt-1 text-[12px] text-[#ef4444]">{fieldErrors.category}</p>
                            ) : null}
                        </div>
                    </div>

                    {/* Giờ hoạt động */}
                    <div className="flex items-start gap-4">
                        <span className="mt-3 w-[140px] shrink-0 text-[15px] text-[#333]">Giờ hoạt động</span>
                        <div className="flex flex-1 flex-col">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-1 flex-col">
                                    <input
                                        type="time"
                                        value={hoursFrom}
                                        onChange={(e) => { setHoursFrom(e.target.value); clearFieldError('hoursFrom'); }}
                                        className={`w-full rounded-[10px] border bg-white px-4 py-3 text-center text-[15px] text-black outline-none ${fieldErrors.hoursFrom ? 'border-[#ef4444]' : 'border-[#e0ddd6]'}`}
                                        id="store-hours-from"
                                    />
                                </div>
                                <span className="text-[#999]">—</span>
                                <div className="flex flex-1 flex-col">
                                    <input
                                        type="time"
                                        value={hoursTo}
                                        onChange={(e) => { setHoursTo(e.target.value); clearFieldError('hoursTo'); }}
                                        className={`w-full rounded-[10px] border bg-white px-4 py-3 text-center text-[15px] text-black outline-none ${fieldErrors.hoursTo ? 'border-[#ef4444]' : 'border-[#e0ddd6]'}`}
                                        id="store-hours-to"
                                    />
                                </div>
                            </div>
                            {fieldErrors.hoursFrom || fieldErrors.hoursTo ? (
                                <p className="mt-1 text-[12px] text-[#ef4444]">
                                    {fieldErrors.hoursFrom || fieldErrors.hoursTo}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <LabelField
                        label="Địa chỉ kinh doanh"
                        value={businessAddress}
                        onChange={(v) => { setBusinessAddress(v); clearFieldError('businessAddress'); }}
                        placeholder="Số nhà, Tên đường, Quận/Huyện, Thành phố"
                        id="store-biz-address"
                        iconRight="pin"
                        maxLength={100}
                        error={fieldErrors.businessAddress}
                    />
                </div>

                {/* ── Điều khoản về Vận chuyển & Phí ── */}
                <h2 className="mt-8 text-[18px] font-bold text-black">Điều khoản về Vận chuyển &amp; Phí</h2>
                <div className="mt-4 space-y-3">
                    <TermCheckbox checked={termShipping} onChange={setTermShipping} bold="Tự chủ vận chuyển:" text="Tôi xác nhận cửa hàng tự điều phối Shipper. Nền tảng không chịu trách nhiệm giao hàng." />
                    <TermCheckbox checked={termFee} onChange={setTermFee} bold="Phí kích hoạt:" text="Tôi đồng ý thanh toán mức phí 5.000.000 VNĐ để duy trì gian hàng và hưởng các đặc quyền Pro." />
                    <TermCheckbox checked={termQuality} onChange={setTermQuality} bold="Cam kết chất lượng:" text="Đảm bảo món ăn đúng hình ảnh, sạch sẽ và chịu trách nhiệm nếu có khiếu nại về giao nhận." />
                </div>

                {/* ── Đính kèm ── */}
                <h2 className="mt-8 text-[18px] font-bold text-black">Đính kèm</h2>
                <div className="mt-4 space-y-3">
                    {/* CCCD */}
                    <div className={`rounded-[12px] border bg-[#fdfcf8] px-5 py-4 ${fieldErrors.cccdFiles ? 'border-[#ef4444]' : 'border-[#e0ddd6]'}`}>
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#dbeafe] text-[22px]">🪪</div>
                            <div className="flex-1">
                                <p className="text-[15px] font-semibold text-black">Căn cước công dân</p>
                                <p className="text-[13px] text-[#999]">
                                    Cần chụp mặt trước và mặt sau ({cccdFiles.length}/2 ảnh)
                                </p>
                            </div>
                            {cccdFiles.length >= 2 ? (
                                <span className="rounded-[8px] bg-[#2e7d32] px-4 py-2 text-[13px] font-bold text-white">Đã xác minh</span>
                            ) : null}
                            <button
                                type="button"
                                onClick={() => cccdInputRef.current?.click()}
                                className="rounded-[8px] bg-[#333] px-4 py-2 text-[13px] font-bold text-white transition hover:bg-[#555]"
                            >
                                {cccdFiles.length === 0 ? 'Chọn ảnh' : 'Tải thêm'}
                            </button>
                            <input
                                ref={cccdInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(event) => {
                                    const files = event.target.files;
                                    if (!files) return;
                                    const selectedFiles = Array.from(files);
                                    setCccdFiles((prev) => {
                                        const merged = [...prev, ...selectedFiles].slice(0, 2);
                                        setCccdVerified(merged.length >= 2);
                                        return merged;
                                    });
                                    clearFieldError('cccdFiles');
                                    if (event.target) event.target.value = '';
                                }}
                            />
                        </div>
                        {cccdFiles.length > 0 && (
                            <div className="mt-3 grid grid-cols-4 gap-2">
                                {cccdFiles.map((file, i) => (
                                    <div key={`${file.name}-${i}`} className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`CCCD ${i + 1}`}
                                            className="h-20 w-full rounded-[8px] object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCccdFiles((prev) => {
                                                    const next = prev.filter((_, idx) => idx !== i);
                                                    setCccdVerified(next.length >= 2);
                                                    return next;
                                                });
                                            }}
                                            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d32f2f] text-[12px] leading-none text-white"
                                            aria-label="Xóa ảnh"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {fieldErrors.cccdFiles ? (
                            <p className="mt-2 text-[12px] text-[#ef4444]">{fieldErrors.cccdFiles}</p>
                        ) : null}
                    </div>

                    {/* Ảnh Menu */}
                    <div className={`rounded-[12px] border bg-[#fdfcf8] px-5 py-4 ${fieldErrors.menuFiles ? 'border-[#ef4444]' : 'border-[#e0ddd6]'}`}>
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#fef3c7] text-[22px]">🍽️</div>
                            <div className="flex-1">
                                <p className="text-[15px] font-semibold text-black">Ảnh Menu/Món ăn tiêu biểu</p>
                                <p className="text-[13px] text-[#999]">Ít nhất 5 ảnh ({menuFiles.length} đã chọn)</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => menuInputRef.current?.click()}
                                className="rounded-[8px] bg-[#333] px-4 py-2 text-[13px] font-bold text-white transition hover:bg-[#555]"
                            >
                                Chọn ảnh
                            </button>
                            <input
                                ref={menuInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(e) => { handleMenuImageChange(e); clearFieldError('menuFiles'); }}
                            />
                        </div>
                        {menuImages.length > 0 && (
                            <div className="mt-3 grid grid-cols-5 gap-2">
                                {menuImages.map((src, i) => (
                                    <img key={i} src={src} alt="" className="h-16 w-full rounded-[8px] object-cover" />
                                ))}
                                <button
                                    type="button"
                                    onClick={() => menuInputRef.current?.click()}
                                    className="flex h-16 items-center justify-center rounded-[8px] bg-[#f0f0f0] text-[22px] text-[#999] transition hover:bg-[#e8e8e8]"
                                >
                                    +
                                </button>
                            </div>
                        )}
                        {fieldErrors.menuFiles ? (
                            <p className="mt-2 text-[12px] text-[#ef4444]">{fieldErrors.menuFiles}</p>
                        ) : null}
                    </div>
                </div>

                {/* ── Gửi ── */}
                <div className="mt-8 flex justify-center">
                    <button
                        type="button"
                        onClick={() => {
                            const errs = validateOpenStoreForm();
                            if (Object.keys(errs).length > 0) {
                                setFieldErrors(errs);
                                setFormError('Vui lòng kiểm tra lại các trường đang báo lỗi.');
                                // Cuộn lên field lỗi đầu tiên
                                const firstKey = Object.keys(errs)[0];
                                const map: Record<string, string> = {
                                    ownerName: 'store-owner',
                                    cccd: 'store-cccd',
                                    storePhone: 'store-phone',
                                    storeAddress: 'store-address',
                                    storeName: 'store-name',
                                    storeContactPhone: 'store-contact',
                                    category: 'store-category',
                                    hoursFrom: 'store-hours-from',
                                    hoursTo: 'store-hours-to',
                                    businessAddress: 'store-biz-address',
                                };
                                const elId = map[firstKey];
                                if (elId) document.getElementById(elId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                return;
                            }
                            if (!termShipping || !termFee || !termQuality) {
                                setFormError('Vui lòng xác nhận đầy đủ các điều khoản.');
                                return;
                            }
                            setFieldErrors({});
                            setFormError(null);
                            setStep('contract');
                        }}
                        className="min-w-[160px] rounded-[10px] bg-[#2e7d32] px-10 py-3 text-[16px] font-bold text-white transition hover:bg-[#256b28]"
                        id="btn-submit-store"
                    >
                        Gửi
                    </button>
                </div>
                {formError ? (
                    <p className="mt-3 text-center text-sm text-red-500">{formError}</p>
                ) : null}
            </div>
        );
    }

    /* ══════════════════════════════════════════
       STEP 2: CONTRACT MODAL
       ══════════════════════════════════════════ */
    if (step === 'contract') {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-8 backdrop-blur-sm">
                <div className="relative flex h-[min(90vh,900px)] w-full max-w-[700px] flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                    {/* Close */}
                    <button
                        type="button"
                        onClick={() => setStep('form')}
                        className="absolute right-4 top-3 z-10 text-[28px] text-[#888] transition hover:text-black"
                    >
                        ×
                    </button>

                    {/* Scrollable contract body */}
                    <div className="flex-1 overflow-y-auto px-8 py-8">
                        <h2 className="text-center text-[20px] font-bold uppercase text-black">
                            THỎA THUẬN CUNG CẤP VÀ SỬ DỤNG
                            <br />
                            DỊCH VỤ NỀN TẢNG
                        </h2>
                        <p className="mt-2 text-center text-[13px] italic text-[#666]">
                            (V/v: Kích hoạt Chế độ chuyên nghiệp và Mở gian hàng trên DishNet)
                        </p>

                        <ul className="mt-4 list-disc space-y-1 pl-6 text-[13px] leading-6 text-[#333]">
                            <li>Căn cứ Bộ luật Dân sự số 91/2015/QH13 được Quốc hội thông qua ngày 24/11/2015;</li>
                            <li>Căn cứ Luật Thương mại số 36/2005/QH14 được Quốc hội thông qua ngày 14/06/2005;</li>
                            <li>Căn cứ vào điều khoản sử dụng chung của nền tảng DishNet và nhu cầu thực tế của hai bên.</li>
                        </ul>

                        <p className="mt-4 text-[13px] leading-6 text-[#333]">
                            Hôm nay, {todayStr}, tại hệ thống DishNet, chúng tôi gồm có:
                        </p>

                        {/* BÊN A */}
                        <div className="mt-4 text-[13px] leading-7 text-[#333]">
                            <p className="font-bold">BÊN A: NỀN TẢNG THƯƠNG MẠI ĐIỆN TỬ DISHNET (Bên cung cấp dịch vụ)</p>
                            <ul className="list-disc pl-6">
                                <li>Đại diện: Lê Văn Cường.</li>
                                <li>Địa chỉ: 40/10 Nguyễn Như Hạnh, Phường Hòa Khánh, Thành phố Đà Nẵng.</li>
                                <li>Email hỗ trợ: support@dishnet.com</li>
                            </ul>
                        </div>

                        {/* BÊN B – auto-fill from form */}
                        <div className="mt-4 text-[13px] leading-7 text-[#333]">
                            <p className="font-bold">BÊN B: CHỦ GIAN HÀNG (Bên sử dụng dịch vụ)</p>
                            <ul className="list-disc pl-6">
                                <li>Họ và tên: {ownerName || '...'}</li>
                                <li>Số CCCD/CMND: {cccd || '...'} Ngày cấp: .......... Tại: ..........</li>
                                <li>Tên cửa hàng trên hệ thống: {storeName || '...'}</li>
                                <li>Địa chỉ kinh doanh: {businessAddress || '...'}</li>
                                <li>Số điện thoại liên hệ: {storeContactPhone || '...'}</li>
                            </ul>
                        </div>

                        <p className="mt-4 text-[13px] leading-6 text-[#333]">
                            Sau khi thảo luận, hai bên thống nhất ký kết Thỏa thuận này với các điều khoản sau:
                        </p>

                        {/* Clauses */}
                        {CONTRACT_CLAUSES.map((clause) => (
                            <div key={clause.title} className="mt-4">
                                <p className="text-[13px] font-bold uppercase text-black">{clause.title}</p>
                                <p className="mt-1 text-[13px] leading-6 text-[#333]">{clause.body}</p>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-[#e8e8e8] bg-white px-8 py-5">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setAgreedContract(!agreedContract)}
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition ${
                                    agreedContract ? 'bg-[#2e7d32] text-white' : 'border-2 border-[#999] bg-white'
                                }`}
                            >
                                {agreedContract && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </button>
                            <span className="text-[14px] text-black">Tôi đã đọc và đồng ý</span>
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={() => setStep('form')}
                                className="min-w-[120px] rounded-[8px] bg-[#f0a050] px-8 py-2.5 text-[15px] font-bold text-white transition hover:bg-[#e09040]"
                            >
                                Quay lại
                            </button>
                            <button
                                type="button"
                                onClick={() => agreedContract && setStep('payment')}
                                disabled={!agreedContract}
                                className={`min-w-[120px] rounded-[8px] px-8 py-2.5 text-[15px] font-bold text-white transition ${
                                    agreedContract ? 'bg-[#2e7d32] hover:bg-[#256b28]' : 'cursor-not-allowed bg-[#ccc]'
                                }`}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* ══════════════════════════════════════════
       STEP 3: PAYMENT
       ══════════════════════════════════════════ */
    if (step === 'payment') {
        return (
            <div className="-mx-10 -my-8">
                {/* Header */}
                <div className="flex items-center gap-4 border-b border-[#e8e8e8] px-10 py-6">
                    <button type="button" onClick={() => setStep('contract')} className="text-[22px] text-[#555] transition hover:text-black">
                        ←
                    </button>
                    <h1 className="text-[24px] font-bold text-black">Thanh toán mở cửa hàng</h1>
                </div>

                <div className="grid gap-6 px-10 py-8 lg:grid-cols-[1fr_320px]">
                    {/* Left – Info */}
                    <div className="rounded-[12px] border border-[#e0ddd6] bg-white p-6">
                        <h3 className="border-b border-[#e8e8e8] pb-3 text-center text-[14px] font-bold uppercase tracking-wide text-[#333]">
                            THÔNG TIN GÓI DỊCH VỤ &amp; PHÁP LÝ
                        </h3>
                        <div className="mt-4 space-y-2 text-[13px] leading-6 text-[#333]">
                            <p>
                                <strong>Chủ sở hữu :</strong> {ownerName || '...'}
                            </p>
                            <p>
                                <strong>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> {profile.email}
                            </p>

                            <p className="mt-4 font-bold">Chi tiết quyền lợi (Khớp Điều 1 hợp đồng):</p>
                            <ul className="list-disc pl-6">
                                <li>Mở gian hàng kinh doanh đồ ăn.</li>
                                <li>Sử dụng bộ công cụ quản lý đơn hàng &amp; doanh thu.</li>
                                <li>Tự thiết lập biểu phí vận chuyển riêng.</li>
                            </ul>

                            <p className="mt-4 font-bold">Lưu ý vận chuyển (Khớp Điều 3 hợp đồng):</p>
                            <ul className="list-disc pl-6">
                                <li>DishNet không cung cấp Shipper. Chủ quán tự điều phối nhân sự giao hàng.</li>
                            </ul>

                            <p className="mt-4 font-bold">Tổng thanh toán (Khớp Điều 2 hợp đồng):</p>
                            <ul className="list-disc pl-6">
                                <li>Phí kích hoạt: 5.000.000 VNĐ.</li>
                                <li>Thời hạn: Vĩnh viễn.</li>
                                <li>Ghi chú: Phí không hoàn lại sau khi kích hoạt. Phí sẽ được hoàn lại nếu đơn mở cửa hàng của bạn không phê duyệt.</li>
                            </ul>

                            <p className="mt-4 font-bold">Hỗ trợ khẩn cấp:</p>
                            <ul className="list-disc pl-6">
                                <li>Hotline: 0126541021.</li>
                                <li>Email liên hệ : support@dishnet.com</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right – QR */}
                    <div className="rounded-[12px] border border-[#e0ddd6] bg-white p-5">
                        <h3 className="text-center text-[15px] font-bold text-black">Mã Thanh Toán</h3>
                        <div className="mt-4 flex flex-col items-center">
                            <div className="flex h-[200px] w-[200px] items-center justify-center rounded-[12px] border-2 border-dashed border-[#d0d0d0] bg-[#f8f6ff]">
                                <div className="text-center">
                                    <p className="text-[12px] font-bold text-[#6366f1]">TPBank VietQR</p>
                                    <div className="mx-auto mt-2 grid h-[120px] w-[120px] grid-cols-8 gap-px">
                                        {Array.from({ length: 64 }).map((_, i) => (
                                            <div key={i} className={`${[0,1,2,5,6,7,8,9,14,15,16,21,23,24,25,30,31,32,33,40,41,42,47,48,49,54,55,56,57,58,61,62,63].includes(i) ? 'bg-black' : 'bg-white'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="mt-3 text-[12px] text-[#888]">Số tiền</p>
                            <p className="text-[18px] font-bold text-[#2e7d32]">5,000,000 VNĐ</p>
                        </div>

                        <div className="mt-5 space-y-2 text-[12px] text-[#555]">
                            <h4 className="font-bold text-black">Thông tin chuyển khoản thủ công</h4>
                            <p className="flex items-center justify-between">
                                <span>• Số tài khoản: {STORE_ACTIVATION_BANK_INFO.accountNumber}</span>
                                <button
                                    type="button"
                                    onClick={() => void copyText(STORE_ACTIVATION_BANK_INFO.accountNumber)}
                                    className="text-[#999] hover:text-black"
                                >
                                    📋
                                </button>
                            </p>
                            <p className="flex items-center justify-between">
                                <span>• Ngân hàng: {STORE_ACTIVATION_BANK_INFO.bankName}</span>
                                <button
                                    type="button"
                                    onClick={() => void copyText(STORE_ACTIVATION_BANK_INFO.bankName)}
                                    className="text-[#999] hover:text-black"
                                >
                                    📋
                                </button>
                            </p>
                            <p>• Chủ tài khoản: {STORE_ACTIVATION_BANK_INFO.accountHolder}</p>
                            <p className="flex items-center justify-between">
                                <span>
                                    • Nội dung chuyển khoản: {STORE_ACTIVATION_BANK_INFO.transferContentPrefix}_{profile.handle}.
                                </span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        void copyText(
                                            `${STORE_ACTIVATION_BANK_INFO.transferContentPrefix}_${profile.handle}`,
                                        )
                                    }
                                    className="text-[#999] hover:text-black"
                                >
                                    📋
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Upload proof + Submit */}
                <div className="border-t border-[#e8e8e8] px-10 py-6">
                    <div className="rounded-[12px] border border-[#e0ddd6] bg-[#fdfcf8] px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[15px] font-semibold text-black">Tải lên minh chứng đã thanh toán</p>
                                <p className="text-[13px] text-[#999]">
                                    {paymentProofFiles.length === 0
                                        ? 'Chưa chọn ảnh nào'
                                        : `Đã chọn ${paymentProofFiles.length} ảnh`}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => paymentProofRef.current?.click()}
                                className="rounded-[8px] bg-[#333] px-5 py-2 text-[13px] font-bold text-white transition hover:bg-[#555]"
                            >
                                {paymentProofFiles.length === 0 ? 'Chọn ảnh' : 'Tải thêm'}
                            </button>
                            <input
                                ref={paymentProofRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(event) => {
                                    const files = event.target.files;
                                    if (!files) return;
                                    const selectedFiles = Array.from(files);
                                    setPaymentProofFiles((prev) => [...prev, ...selectedFiles]);
                                    setSubmitError(null);
                                    if (event.target) event.target.value = '';
                                }}
                            />
                        </div>
                        {paymentProofFiles.length > 0 && (
                            <div className="mt-4 grid grid-cols-5 gap-2">
                                {paymentProofFiles.map((file, i) => (
                                    <div key={`${file.name}-${i}`} className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Minh chứng ${i + 1}`}
                                            className="h-20 w-full rounded-[8px] object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPaymentProofFiles((prev) => prev.filter((_, idx) => idx !== i));
                                            }}
                                            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d32f2f] text-[12px] leading-none text-white"
                                            aria-label="Xóa ảnh"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            type="button"
                            onClick={async () => {
                                if (isSubmitting) return;
                                if (paymentProofFiles.length === 0) {
                                    setSubmitError(
                                        'Vui lòng tải lên minh chứng thanh toán trước khi gửi.',
                                    );
                                    return;
                                }
                                if (cccdFiles.length < 2) {
                                    setSubmitError(
                                        'Vui lòng tải ảnh CCCD mặt trước và mặt sau.',
                                    );
                                    return;
                                }
                                if (menuFiles.length < 5) {
                                    setSubmitError(
                                        'Vui lòng tải lên ít nhất 5 ảnh menu hoặc món ăn.',
                                    );
                                    return;
                                }
                                setSubmitError(null);
                                setIsSubmitting(true);
                                try {
                                    const [cccdUrls, menuUrls, paymentUrls] = await Promise.all([
                                        uploadStoreFiles(cccdFiles, 'cccd'),
                                        uploadStoreFiles(menuFiles, 'menu'),
                                        uploadStoreFiles(paymentProofFiles, 'payment'),
                                    ]);

                                    await userCommerceApi.dangKyMoCuaHang({
                                        chu_so_huu: ownerName.trim(),
                                        so_cccd: cccd.trim(),
                                        so_dien_thoai: storePhone.trim(),
                                        dia_chi: storeAddress.trim(),
                                        ten_cua_hang: storeName.trim(),
                                        so_dien_thoai_lien_he: storeContactPhone.trim(),
                                        danh_muc_kinh_doanh: category.trim(),
                                        gio_mo_cua: hoursFrom.trim(),
                                        gio_dong_cua: hoursTo.trim(),
                                        dia_chi_kinh_doanh: businessAddress.trim(),
                                        dong_y_dieu_khoan: true,
                                        anh_cccd: cccdUrls,
                                        anh_menu: menuUrls,
                                        minh_chung_thanh_toan: paymentUrls,
                                    });
                                    setStep('pending');
                                } catch (error) {
                                    setSubmitError(
                                        error instanceof Error
                                            ? error.message
                                            : 'Không gửi được đăng ký mở cửa hàng',
                                    );
                                } finally {
                                    setIsSubmitting(false);
                                }
                            }}
                            className="min-w-[300px] rounded-[10px] bg-[#2e7d32] py-3.5 text-center text-[18px] font-bold text-white transition hover:bg-[#256b28]"
                            id="btn-submit-payment"
                        >
                            {isSubmitting ? 'ĐANG GỬI...' : 'GỬI'}
                        </button>
                    </div>
                    {submitError ? (
                        <p className="mt-3 text-center text-sm text-red-500">{submitError}</p>
                    ) : null}
                </div>
            </div>
        );
    }

    /* ══════════════════════════════════════════
       STEP 4: PENDING (Thanh toán thành công)
       ══════════════════════════════════════════ */
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <span className="text-[48px]">⏳</span>
            <h2 className="mt-4 text-[20px] font-bold uppercase text-black">
                HỒ SƠ MỞ CỬA HÀNG ĐANG CHỜ DUYỆT
            </h2>
            <p className="mt-3 max-w-[500px] text-[15px] leading-7 text-[#555]">
                Chuyên viên của DishNet đang kiểm tra thông tin gian hàng của bạn. Kết quả sẽ được gửi qua thông báo hệ thống và email.
            </p>
        </div>
    );
}
