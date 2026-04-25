'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { userCommerceApi } from '@/shared/userCommerceApi';

/* ───────── types ───────── */
type RequestStatus = 'pending' | 'resolved';

interface SupportRequest {
    id: string;
    apiId: number;
    topic: string;
    content: string;
    contact: string;
    date: string;
    status: RequestStatus;
    response?: string;
    attachments?: string[];
}

/* ───────── constants ───────── */
const TOPIC_OPTIONS = [
    'Không đặt được món',
    'Đơn hàng bị lỗi / bị hủy',
    'Thanh toán thất bại',
    'Bị trừ tiền nhưng chưa có đơn',
    'Hoàn tiền',
    'Báo cáo bài viết vi phạm',
    'Review không đúng sự thật',
    'Spam / nội dung rác',
    'Khiếu nại bị xóa bài',
    'Không nhận được hoa hồng',
    'Sai doanh thu',
    'Link món không hoạt động',
    'Báo cáo click/đơn sai',
];

const CATEGORY_CARDS = [
    {
        title: 'Đặt món & thanh toán',
        subtitle: 'Đặt món & thanh toán',
        bg: '#FEF6D9',
        icon: '🛒',
    },
    {
        title: 'Kiếm tiền',
        subtitle: 'Đặt món & thanh toán',
        bg: '#EBF5FE',
        icon: '💰',
    },
    {
        title: 'Cửa hàng',
        subtitle: 'Báo cáo nội dung',
        bg: '#EEFAF7',
        icon: '🏪',
    },
    {
        title: 'Bài viết & Review',
        subtitle: 'Bài viết, bình luận, chia sẻ',
        bg: '#FCF0F7',
        icon: '📝',
    },
];

const MAX_CONTENT_LENGTH = 1000;

/* ───────── view types ───────── */
type ViewState =
    | { type: 'main' }
    | { type: 'form' }
    | { type: 'list' }
    | { type: 'detail'; request: SupportRequest };

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */
export default function UserSupportPage() {
    const [view, setView] = useState<ViewState>({ type: 'main' });
    const [requests, setRequests] = useState<SupportRequest[]>([]);
    const [searchHelp, setSearchHelp] = useState('');
    const [isLoadingRequests, setIsLoadingRequests] = useState(false);
    const [requestsError, setRequestsError] = useState<string | null>(null);

    const mapListItemToRequest = useCallback((item: any): SupportRequest => {
        const guiLuc = item?.thoi_gian_gui ? new Date(item.thoi_gian_gui) : null;
        return {
            id: item?.ma_yeu_cau ? String(item.ma_yeu_cau) : `HT-${item?.id ?? Date.now()}`,
            apiId: Number(item?.id ?? 0),
            topic: item?.chu_de ?? 'Yêu cầu hỗ trợ',
            content: item?.noi_dung_tom_tat ?? '',
            contact: '',
            date: guiLuc
                ? guiLuc.toLocaleDateString('vi-VN')
                : '',
            status: item?.trang_thai === 'da_giai_quyet' ? 'resolved' : 'pending',
        };
    }, []);

    const tachNoiDungVaLienHe = useCallback((noiDungRaw?: string) => {
        if (!noiDungRaw) {
            return { contact: '', content: '' };
        }
        const normalized = String(noiDungRaw);
        const marker = 'Thong tin lien he:';
        if (!normalized.startsWith(marker)) {
            return { contact: '', content: normalized.trim() };
        }

        const [firstLine = '', ...restLines] = normalized.split('\n');
        return {
            contact: firstLine.replace(marker, '').trim(),
            content: restLines.join('\n').trim(),
        };
    }, []);

    const loadRequests = useCallback(async () => {
        setIsLoadingRequests(true);
        setRequestsError(null);
        try {
            const data: any = await userCommerceApi.layDanhSachHoTro({ so_luong: 100 });
            const mapped = Array.isArray(data?.du_lieu)
                ? data.du_lieu.map(mapListItemToRequest)
                : [];
            setRequests(mapped);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Không tải được danh sách yêu cầu hỗ trợ';
            setRequestsError(message);
        } finally {
            setIsLoadingRequests(false);
        }
    }, [mapListItemToRequest]);

    useEffect(() => {
        void loadRequests();
    }, [loadRequests]);

    const handleSubmitRequest = useCallback(
        async (data: { topic: string; content: string; contact: string; files: File[] }) => {
            const tep_dinh_kem = data.files.map(
                (file) =>
                    `https://cdn.dishnet.local/support/${encodeURIComponent(file.name)}`,
            );

            await userCommerceApi.taoHoTro({
                chu_de: data.topic,
                noi_dung: data.content,
                thong_tin_lien_he: data.contact,
                tep_dinh_kem,
            });
            await loadRequests();
            setView({ type: 'main' });
        },
        [loadRequests],
    );

    return (
        <div className="min-h-[calc(100vh-80px)] bg-bg-light">
            {/* ── MAIN SUPPORT HUB ── */}
            <div className="mx-auto max-w-[1400px] px-6 py-8">
                {/* Title */}
                <h1 className="mb-6 text-[28px] font-bold text-black">
                    Trợ giúp và hỗ trợ
                </h1>

                <div className="overflow-hidden rounded-[20px] bg-white shadow-sm">
                    <div className="flex flex-col lg:flex-row">
                        {/* ── LEFT SIDE: Search + Topic cards ── */}
                        <div className="flex-1 p-8">
                            {/* Search bar */}
                            <div className="relative mb-8 max-w-[500px]">
                                <div className="flex items-center rounded-full border border-border-gray bg-white px-5 py-3 transition-all focus-within:border-green-primary focus-within:shadow-[0_0_0_3px_rgba(40,94,25,0.08)]">
                                    <span className="mr-3 text-text-gray">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="m21 21-4.35-4.35" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm trợ giúp"
                                        value={searchHelp}
                                        onChange={(e) => setSearchHelp(e.target.value)}
                                        className="flex-1 border-none bg-transparent text-base placeholder:text-text-gray"
                                        id="search-help-input"
                                    />
                                </div>
                            </div>

                            {/* Category cards grid */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {CATEGORY_CARDS.map((card) => (
                                    <button
                                        key={card.title}
                                        className="flex items-center gap-4 rounded-[20px] px-5 py-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                                        style={{ backgroundColor: card.bg }}
                                    >
                                        <span className="text-3xl">{card.icon}</span>
                                        <div>
                                            <div className="text-lg font-semibold text-black">
                                                {card.title}
                                            </div>
                                            <div className="mt-0.5 text-sm font-light text-black/70">
                                                {card.subtitle}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ── RIGHT SIDE: Contact support ── */}
                        <div className="flex flex-col items-center border-t border-gray-100 px-8 py-8 lg:w-[380px] lg:border-l lg:border-t-0">
                            <div className="w-full rounded-[20px] bg-[#EAF5FD] px-6 py-7 text-center">
                                <h2 className="mb-4 text-xl font-semibold text-black">
                                    Liên hệ hỗ trợ
                                </h2>

                                {/* Gửi yêu cầu hỗ trợ link */}
                                <button
                                    onClick={() => setView({ type: 'form' })}
                                    className="mb-3 flex w-full items-center justify-center gap-2 rounded-[10px] border border-gray-200 bg-white px-5 py-3 text-base font-semibold text-black transition-all hover:bg-gray-50"
                                    id="btn-open-form"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                    Gửi yêu cầu hỗ trợ
                                </button>

                                {/* Gửi yêu cầu button */}
                                <button
                                    onClick={() => setView({ type: 'form' })}
                                    className="mb-5 w-full rounded-[10px] bg-[#4082F2] px-5 py-3 text-center text-base font-bold text-white transition-all hover:bg-[#3570d4] active:bg-[#2c5fb8]"
                                    id="btn-send-request"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Gửi yêu cầu
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </span>
                                </button>

                                {/* Divider "Hoặc" */}
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-border-gray" />
                                    <span className="text-sm font-medium text-text-gray">
                                        Hoặc
                                    </span>
                                    <div className="h-px flex-1 bg-border-gray" />
                                </div>

                                {/* Phone */}
                                <a
                                    href="tel:0123456789"
                                    className="flex items-center justify-center gap-3 text-[22px] font-extrabold text-[#3276C2] transition-colors hover:text-[#265da0]"
                                >
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    0123 456 789
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* ── BOTTOM: Danh sách yêu cầu đã gửi ── */}
                    <div className="border-t border-gray-100 px-8 py-4">
                        <button
                            onClick={() => setView({ type: 'list' })}
                            className="w-full rounded-[10px] bg-[#EAF8EB] px-6 py-4 text-center text-lg font-semibold text-[#258F22] transition-all hover:bg-[#ddf2de] active:bg-[#d0ebd1]"
                            id="btn-view-requests"
                        >
                            Danh sách các yêu cầu đã gửi
                        </button>
                        {isLoadingRequests && (
                            <p className="mt-2 text-center text-sm text-text-gray">
                                Đang tải dữ liệu hỗ trợ...
                            </p>
                        )}
                        {requestsError && (
                            <p className="mt-2 text-center text-sm text-red-500">
                                {requestsError}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* ── MODALS ── */}
            {view.type === 'form' && (
                <SendRequestModal
                    onClose={() => setView({ type: 'main' })}
                    onSubmit={handleSubmitRequest}
                />
            )}

            {view.type === 'list' && (
                <RequestListModal
                    requests={requests}
                    onClose={() => setView({ type: 'main' })}
                    onViewDetail={async (req) => {
                        try {
                            const detail: any = await userCommerceApi.layChiTietHoTro(
                                req.apiId,
                            );
                            const parsed = tachNoiDungVaLienHe(detail?.noi_dung_yeu_cau);
                            const guiLuc = detail?.thoi_gian_gui
                                ? new Date(detail.thoi_gian_gui)
                                : null;
                            const detailRequest: SupportRequest = {
                                id: detail?.ma_yeu_cau
                                    ? String(detail.ma_yeu_cau)
                                    : req.id,
                                apiId: Number(detail?.id ?? req.apiId),
                                topic: detail?.chu_de ?? req.topic,
                                content: parsed.content || req.content,
                                contact: parsed.contact || req.contact,
                                date: guiLuc
                                    ? guiLuc.toLocaleDateString('vi-VN')
                                    : req.date,
                                status:
                                    detail?.trang_thai === 'da_giai_quyet'
                                        ? 'resolved'
                                        : 'pending',
                                response:
                                    detail?.thong_tin_phan_hoi?.noi_dung_phan_hoi ??
                                    req.response,
                                attachments: Array.isArray(detail?.tep_dinh_kem)
                                    ? detail.tep_dinh_kem
                                          .map((item: any) => item?.url)
                                          .filter((item: unknown) => typeof item === 'string')
                                    : [],
                            };
                            setView({ type: 'detail', request: detailRequest });
                        } catch {
                            setView({ type: 'detail', request: req });
                        }
                    }}
                />
            )}

            {view.type === 'detail' && (
                <RequestDetailModal
                    request={view.request}
                    onClose={() => setView({ type: 'list' })}
                />
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   MODAL: GỬI YÊU CẦU HỖ TRỢ
   ═══════════════════════════════════════════ */
function SendRequestModal({
    onClose,
    onSubmit,
}: {
    onClose: () => void;
    onSubmit: (data: { topic: string; content: string; contact: string; files: File[] }) => Promise<void>;
}) {
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState('');
    const [contact, setContact] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isValid = topic.trim() && content.trim() && contact.trim();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleRemoveFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className="relative w-full max-w-[680px] animate-[fadeInUp_0.25s_ease-out] overflow-hidden rounded-[10px] bg-white shadow-2xl"
                style={{ maxHeight: '90vh' }}
            >
                {/* Scrollable content area */}
                <div className="max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-8 py-5">
                        <h2 className="text-xl font-semibold text-black">
                            Gửi yêu cầu hỗ trợ
                        </h2>
                        <button
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            id="btn-close-form"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="M6 6 18 18" />
                            </svg>
                        </button>
                    </div>

                    {/* Subtitle */}
                    <div className="px-8 pt-4">
                        <p className="text-sm font-medium text-text-gray">
                            Mô tả vấn đề bạn đang gặp phải, đội ngũ DishNet sẽ phản hồi sớm nhất
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="mx-8 my-4 h-px bg-border-gray" />

                    {/* Form fields */}
                    <div className="space-y-5 px-8 pb-6">
                        {/* Thông tin yêu cầu — Chọn chủ đề */}
                        <div>
                            <label className="mb-2 block text-base font-semibold text-black">
                                Thông tin yêu cầu
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsTopicDropdownOpen(!isTopicDropdownOpen)}
                                    className={`flex w-full items-center justify-between rounded-[10px] border px-4 py-3 text-left text-base transition-colors ${
                                        topic
                                            ? 'border-gray-300 text-black'
                                            : 'border-border-gray text-text-gray'
                                    } hover:border-green-primary`}
                                    id="dropdown-topic"
                                >
                                    {topic || 'Chọn chủ đề'}
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className={`transition-transform ${isTopicDropdownOpen ? 'rotate-180' : ''}`}
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>

                                {isTopicDropdownOpen && (
                                    <div className="absolute left-0 top-[calc(100%+4px)] z-20 max-h-[240px] w-full overflow-y-auto rounded-[10px] border border-gray-200 bg-white shadow-lg">
                                        {TOPIC_OPTIONS.map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => {
                                                    setTopic(opt);
                                                    setIsTopicDropdownOpen(false);
                                                }}
                                                className={`block w-full px-4 py-3 text-left text-sm transition-colors hover:bg-green-50 ${
                                                    topic === opt
                                                        ? 'bg-green-50 font-semibold text-green-primary'
                                                        : 'text-gray-700'
                                                }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Nội dung chi tiết */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label className="text-base font-semibold text-black">
                                    Nội dung chi tiết
                                </label>
                                <span className="text-sm text-text-gray">
                                    {content.length}/{MAX_CONTENT_LENGTH}
                                </span>
                            </div>
                            <textarea
                                value={content}
                                onChange={(e) => {
                                    if (e.target.value.length <= MAX_CONTENT_LENGTH)
                                        setContent(e.target.value);
                                }}
                                rows={5}
                                placeholder={'Tiêu đề vấn đề :\nVí dụ : không nhận được tiền hoa hồng'}
                                className="w-full resize-none rounded-[10px] border border-border-gray px-4 py-3 text-base text-black outline-none transition-colors placeholder:text-text-gray focus:border-green-primary"
                                id="textarea-content"
                            />
                        </div>

                        {/* Tệp đính kèm */}
                        <div>
                            <label className="mb-2 block text-base font-semibold text-black">
                                Tệp đính kèm
                            </label>
                            <div className="flex items-start gap-4">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 rounded-[10px] border border-border-gray px-4 py-3 text-sm text-text-gray transition-colors hover:border-green-primary hover:text-green-primary"
                                    id="btn-choose-file"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                    </svg>
                                    Chọn tệp
                                </button>
                                <p className="flex-1 pt-1 text-sm text-text-gray">
                                    Tải lên ảnh lỗi, hóa đơn hoặc minh chứng để hỗ trợ nhanh hơn.
                                </p>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                                onChange={handleFileChange}
                                className="hidden"
                                id="file-input"
                            />

                            {/* File list */}
                            {files.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {files.map((file, i) => (
                                        <div
                                            key={`${file.name}-${i}`}
                                            className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                                        >
                                            <span className="truncate text-sm text-gray-700">
                                                {file.name}
                                            </span>
                                            <button
                                                onClick={() => handleRemoveFile(i)}
                                                className="ml-2 text-gray-400 hover:text-red-500"
                                            >
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M18 6 6 18" />
                                                    <path d="M6 6 18 18" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Thông tin liên hệ */}
                        <div>
                            <label className="mb-2 block text-base font-semibold text-black">
                                Thông tin liên hệ
                            </label>
                            <input
                                type="text"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder="Email / số điện thoại"
                                className="w-full rounded-[10px] border border-border-gray px-4 py-3 text-base text-black outline-none transition-colors placeholder:text-text-gray focus:border-green-primary"
                                id="input-contact"
                            />
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center justify-center gap-4 pt-2">
                            <button
                                onClick={onClose}
                                className="rounded-[10px] border border-border-gray bg-white px-8 py-3 text-base font-semibold text-black transition-colors hover:bg-gray-50"
                                id="btn-cancel-form"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={async () => {
                                    if (!isValid || isSubmitting) return;
                                    setSubmitError(null);
                                    setIsSubmitting(true);
                                    try {
                                        await onSubmit({ topic, content, contact, files });
                                    } catch (error) {
                                        setSubmitError(
                                            error instanceof Error
                                                ? error.message
                                                : 'Không gửi được yêu cầu hỗ trợ',
                                        );
                                    } finally {
                                        setIsSubmitting(false);
                                    }
                                }}
                                disabled={!isValid || isSubmitting}
                                className="rounded-[10px] border border-[#258F22] bg-[#258F22] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1f7a1d] disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300"
                                id="btn-submit-form"
                            >
                                {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
                            </button>
                        </div>
                        {submitError && (
                            <p className="text-center text-sm text-red-500">{submitError}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   MODAL: DANH SÁCH CÁC YÊU CẦU ĐÃ GỬI
   ═══════════════════════════════════════════ */
function RequestListModal({
    requests,
    onClose,
    onViewDetail,
}: {
    requests: SupportRequest[];
    onClose: () => void;
    onViewDetail: (req: SupportRequest) => void;
}) {
    const [activeTab, setActiveTab] = useState<'pending' | 'resolved'>('pending');

    const filteredRequests = requests.filter((r) => r.status === activeTab);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className="relative w-full max-w-[1000px] animate-[fadeInUp_0.25s_ease-out] overflow-hidden rounded-[10px] bg-white shadow-2xl"
                style={{ maxHeight: '85vh' }}
            >
                <div className="max-h-[85vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-white px-8 pt-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-black">
                                Danh sách các yêu cầu đã gửi
                            </h2>
                            <button
                                onClick={onClose}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                                id="btn-close-list"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="M6 6 18 18" />
                                </svg>
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="mt-4 flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('resolved')}
                                className={`relative px-6 pb-3 text-base font-semibold transition-colors ${
                                    activeTab === 'resolved'
                                        ? 'text-[#285E19]'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                                id="tab-resolved"
                            >
                                Đã giải quyết
                                {activeTab === 'resolved' && (
                                    <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-t bg-[#285E19]" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('pending')}
                                className={`relative px-6 pb-3 text-base font-medium transition-colors ${
                                    activeTab === 'pending'
                                        ? 'text-[#285E19]'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                                id="tab-pending"
                            >
                                Đang chờ xử lý
                                {activeTab === 'pending' && (
                                    <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-t bg-[#285E19]" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Request list */}
                    <div className="space-y-3 px-8 py-5">
                        {filteredRequests.length === 0 ? (
                            <div className="py-16 text-center text-gray-400">
                                <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="mx-auto mb-3 text-gray-300"
                                >
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14,2 14,8 20,8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10,9 9,9 8,9" />
                                </svg>
                                Không có yêu cầu nào
                            </div>
                        ) : (
                            filteredRequests.map((req) => (
                                <button
                                    key={req.id}
                                    onClick={() => onViewDetail(req)}
                                    className="flex w-full items-center justify-between rounded-[10px] border border-[#E2E3E2] bg-white px-5 py-4 text-left transition-all hover:border-green-primary/30 hover:shadow-sm"
                                >
                                    <div className="flex-1">
                                        <div className="text-base font-medium text-black">
                                            {req.topic}
                                        </div>
                                        <div className="mt-1 line-clamp-1 text-sm text-gray-500">
                                            {req.content}
                                        </div>
                                    </div>
                                    <div className="ml-4 flex flex-col items-end gap-2">
                                        <span className="text-sm text-text-gray">{req.date}</span>
                                        <span
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                                req.status === 'resolved'
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'bg-amber-50 text-amber-700'
                                            }`}
                                        >
                                            {req.status === 'resolved'
                                                ? '✅ Đã giải quyết'
                                                : '⏳ Đang chờ xử lý'}
                                        </span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   MODAL: XEM CHI TIẾT YÊU CẦU
   ═══════════════════════════════════════════ */
function RequestDetailModal({
    request,
    onClose,
}: {
    request: SupportRequest;
    onClose: () => void;
}) {
    const isPending = request.status === 'pending';

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className="relative w-full max-w-[680px] animate-[fadeInUp_0.25s_ease-out] overflow-hidden rounded-[10px] bg-white shadow-2xl"
                style={{ maxHeight: '85vh' }}
            >
                <div className="max-h-[85vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-8 py-5">
                        <h2 className="text-xl font-semibold text-black">
                            {isPending
                                ? 'Yêu cầu hỗ trợ đang chờ xử lý'
                                : 'Yêu cầu hỗ trợ đã giải quyết'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            id="btn-close-detail"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="M6 6 18 18" />
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="space-y-5 px-8 py-6">
                        {/* Thông tin yêu cầu */}
                        <div>
                            <label className="mb-2 block text-base font-semibold text-black">
                                Thông tin yêu cầu
                            </label>
                            <div className="rounded-[10px] border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-600">
                                {request.topic}
                            </div>
                        </div>

                        {/* Nội dung chi tiết */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label className="text-base font-semibold text-black">
                                    Nội dung chi tiết
                                </label>
                                <span className="text-sm text-text-gray">
                                    {request.content.length}/{MAX_CONTENT_LENGTH}
                                </span>
                            </div>
                            <div className="min-h-[80px] rounded-[10px] border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-600">
                                {request.content}
                            </div>
                        </div>

                        {/* Tệp đính kèm */}
                        <div>
                            <label className="mb-2 block text-base font-semibold text-black">
                                Tệp đính kèm
                            </label>
                            {request.attachments && request.attachments.length > 0 ? (
                                <div className="space-y-2">
                                    {request.attachments.map((fileUrl, index) => (
                                        <a
                                            key={`${fileUrl}-${index}`}
                                            href={fileUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 rounded-[10px] border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-blue-600 hover:text-blue-700"
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                            </svg>
                                            Tệp đính kèm {index + 1}
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-[10px] border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-text-gray">
                                    Không có tệp đính kèm
                                </div>
                            )}
                        </div>

                        {/* Thông tin liên hệ */}
                        <div>
                            <label className="mb-2 block text-base font-semibold text-black">
                                Thông tin liên hệ
                            </label>
                            <div className="rounded-[10px] border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-600">
                                {request.contact}
                            </div>
                        </div>

                        {/* Status / Response */}
                        {isPending ? (
                            <div className="rounded-[10px] border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-medium text-amber-700">
                                ⏳ Chúng tôi sẽ phản hồi sớm nhất
                            </div>
                        ) : (
                            <div>
                                <label className="mb-2 block text-base font-semibold text-black">
                                    Kết quả xử lý
                                </label>
                                <div className="whitespace-pre-wrap rounded-[10px] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                    {request.response}
                                </div>
                            </div>
                        )}

                        {/* Back button */}
                        <div className="flex justify-center pt-1">
                            <button
                                onClick={onClose}
                                className="w-full rounded-[10px] border border-border-gray bg-white py-3 text-center text-base font-semibold text-black transition-colors hover:bg-gray-50"
                                id="btn-back-detail"
                            >
                                Quay lại
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
