'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useRef, useState } from 'react';

import type { UserProfile } from '@/features/profile/data';

type StoreStep = 'form' | 'contract' | 'payment' | 'pending';

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

/* ═══════════════════════════════════════════
   HELPER: Label Field
   ═══════════════════════════════════════════ */
function LabelField({
    label,
    value,
    onChange,
    placeholder,
    id,
    iconRight,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    id: string;
    iconRight?: 'pin';
}) {
    return (
        <div className="flex items-center gap-4">
            <span className="w-[140px] shrink-0 text-[15px] text-[#333]">{label}</span>
            <div className="flex flex-1 items-center rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
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
}: {
    profile: UserProfile;
    onBack: () => void;
}) {
    const [step, setStep] = useState<StoreStep>('form');

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
    const [menuImages, setMenuImages] = useState<string[]>([]);
    const [agreedContract, setAgreedContract] = useState(false);

    const menuInputRef = useRef<HTMLInputElement>(null);
    const cccdInputRef = useRef<HTMLInputElement>(null);
    const paymentProofRef = useRef<HTMLInputElement>(null);

    const handleMenuImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const urls = Array.from(files).map((f) => URL.createObjectURL(f));
        setMenuImages((prev) => [...prev, ...urls]);
    };

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
                <h2 className="text-[22px] font-bold text-black">Thông tin cơ bản</h2>
                <div className="mt-5 space-y-4">
                    <LabelField label="Chủ sở hữu" value={ownerName} onChange={setOwnerName} placeholder="Họ và tên theo CCCD" id="store-owner" />
                    <LabelField label="Số CCCD" value={cccd} onChange={setCccd} placeholder="Số CCCD" id="store-cccd" />
                    <LabelField label="Số điện thoại" value={storePhone} onChange={setStorePhone} placeholder="Số điện thoại gồm 10 số" id="store-phone" />
                    <LabelField label="Địa chỉ" value={storeAddress} onChange={setStoreAddress} placeholder="Số nhà, Tên đường, Quận/Huyện, Thành phố" id="store-address" iconRight="pin" />
                </div>

                {/* ── Thông tin cửa hàng ── */}
                <h2 className="mt-8 text-[22px] font-bold text-black">Thông tin cửa hàng</h2>
                <div className="mt-5 space-y-4">
                    <LabelField label="Tên cửa hàng" value={storeName} onChange={setStoreName} placeholder="Ví dụ : Mimi Foood" id="store-name" />
                    <LabelField label="Số điện thoại liên hệ" value={storeContactPhone} onChange={setStoreContactPhone} placeholder="Dùng để nhận thông báo đơn hàng" id="store-contact" />

                    {/* Danh mục – nhập trực tiếp hoặc chọn dropdown */}
                    <div className="flex items-center gap-4">
                        <span className="w-[140px] shrink-0 text-[15px] text-[#333]">Danh mục</span>
                        <div className="relative flex-1">
                            <div className="flex items-center rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3">
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
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
                                            }}
                                            className="block w-full px-4 py-2.5 text-left text-[14px] text-black transition hover:bg-[#f6faf4]"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Giờ hoạt động */}
                    <div className="flex items-center gap-4">
                        <span className="w-[140px] shrink-0 text-[15px] text-[#333]">Giờ hoạt động</span>
                        <div className="flex flex-1 items-center gap-3">
                            <input
                                type="text"
                                value={hoursFrom}
                                onChange={(e) => setHoursFrom(e.target.value)}
                                placeholder="hh:pp"
                                className="w-full rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3 text-center text-[15px] text-black outline-none placeholder:text-[#999]"
                                id="store-hours-from"
                            />
                            <span className="text-[#999]">—</span>
                            <input
                                type="text"
                                value={hoursTo}
                                onChange={(e) => setHoursTo(e.target.value)}
                                placeholder="hh:pp"
                                className="w-full rounded-[10px] border border-[#e0ddd6] bg-white px-4 py-3 text-center text-[15px] text-black outline-none placeholder:text-[#999]"
                                id="store-hours-to"
                            />
                        </div>
                    </div>

                    <LabelField label="Địa chỉ kinh doanh" value={businessAddress} onChange={setBusinessAddress} placeholder="Số nhà, Tên đường, Quận/Huyện, Thành phố" id="store-biz-address" iconRight="pin" />
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
                    <div className="flex items-center gap-4 rounded-[12px] border border-[#e0ddd6] bg-[#fdfcf8] px-5 py-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#dbeafe] text-[22px]">🪪</div>
                        <div className="flex-1">
                            <p className="text-[15px] font-semibold text-black">Căn cước công dân</p>
                            <p className="text-[13px] text-[#999]">Cần chụp mặt trước và mặt sau</p>
                        </div>
                        {cccdVerified ? (
                            <span className="rounded-[8px] bg-[#2e7d32] px-4 py-2 text-[13px] font-bold text-white">Đã xác minh</span>
                        ) : (
                            <button type="button" onClick={() => cccdInputRef.current?.click()} className="text-[#999]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        )}
                        <input ref={cccdInputRef} type="file" accept="image/*" multiple className="hidden" onChange={() => setCccdVerified(true)} />
                    </div>

                    {/* Ảnh Menu */}
                    <div className="rounded-[12px] border border-[#e0ddd6] bg-[#fdfcf8] px-5 py-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#fef3c7] text-[22px]">🍽️</div>
                            <div className="flex-1">
                                <p className="text-[15px] font-semibold text-black">Ảnh Menu/Món ăn tiêu biểu</p>
                                <p className="text-[13px] text-[#999]">Ít nhất 5 ảnh</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => menuInputRef.current?.click()}
                                className="rounded-[8px] bg-[#333] px-4 py-2 text-[13px] font-bold text-white transition hover:bg-[#555]"
                            >
                                Chọn ảnh
                            </button>
                            <input ref={menuInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleMenuImageChange} />
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
                    </div>
                </div>

                {/* ── Gửi ── */}
                <div className="mt-8 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setStep('contract')}
                        className="min-w-[160px] rounded-[10px] bg-[#2e7d32] px-10 py-3 text-[16px] font-bold text-white transition hover:bg-[#256b28]"
                        id="btn-submit-store"
                    >
                        Gửi
                    </button>
                </div>
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
                                <span>• Số tài khoản :</span>
                                <button className="text-[#999] hover:text-black">📋</button>
                            </p>
                            <p className="flex items-center justify-between">
                                <span>• Ngân hàng :</span>
                                <button className="text-[#999] hover:text-black">📋</button>
                            </p>
                            <p>• Chủ tài khoản :</p>
                            <p className="flex items-center justify-between">
                                <span>• Nội dung chuyển khoản: Tên_DNPRO.</span>
                                <button className="text-[#999] hover:text-black">📋</button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Upload proof + Submit */}
                <div className="border-t border-[#e8e8e8] px-10 py-6">
                    <div className="flex items-center justify-between rounded-[12px] border border-[#e0ddd6] bg-[#fdfcf8] px-6 py-4">
                        <p className="text-[15px] font-semibold text-black">Tải lên minh chứng đã thanh toán</p>
                        <button
                            type="button"
                            onClick={() => paymentProofRef.current?.click()}
                            className="rounded-[8px] bg-[#333] px-5 py-2 text-[13px] font-bold text-white transition hover:bg-[#555]"
                        >
                            Chọn ảnh
                        </button>
                        <input ref={paymentProofRef} type="file" accept="image/*" className="hidden" />
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            type="button"
                            onClick={() => setStep('pending')}
                            className="min-w-[300px] rounded-[10px] bg-[#2e7d32] py-3.5 text-center text-[18px] font-bold text-white transition hover:bg-[#256b28]"
                            id="btn-submit-payment"
                        >
                            GỬI
                        </button>
                    </div>
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
                THANH TOÁN THÀNH CÔNG - HỒ SƠ ĐANG CHỜ DUYỆT
            </h2>
            <p className="mt-3 max-w-[500px] text-[15px] leading-7 text-[#555]">
                Chúng tôi đã nhận được phí kích hoạt. Chuyên viên của DishNet đang kiểm tra thông tin gian hàng của bạn.
            </p>
        </div>
    );
}
