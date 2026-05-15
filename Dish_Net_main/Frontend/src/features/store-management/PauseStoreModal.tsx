'use client';

import { useEffect, useState } from 'react';

type PauseMode = 'indefinite' | 'scheduled';

export type PauseStoreConfirmPayload = {
    mode: PauseMode;
    tu_ngay?: string; // ISO datetime
    den_ngay?: string; // ISO datetime
};

type Props = {
    open: boolean;
    isSubmitting?: boolean;
    onClose: () => void;
    onConfirm: (payload: PauseStoreConfirmPayload) => void;
};

function formatDateInput(date: Date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, h) => {
    const label = `${String(h).padStart(2, '0')}:00`;
    return { value: label, label };
});

export default function PauseStoreModal({ open, isSubmitting, onClose, onConfirm }: Props) {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const [mode, setMode] = useState<PauseMode>('indefinite');
    const [fromDate, setFromDate] = useState(formatDateInput(today));
    const [fromTime, setFromTime] = useState('12:00');
    const [toDate, setToDate] = useState(formatDateInput(tomorrow));
    const [toTime, setToTime] = useState('12:00');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) {
            setMode('indefinite');
            setError(null);
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isSubmitting) onClose();
        };
        window.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, isSubmitting, onClose]);

    if (!open) return null;

    const handleConfirm = () => {
        setError(null);
        if (mode === 'scheduled') {
            const start = new Date(`${fromDate}T${fromTime}:00`);
            const end = new Date(`${toDate}T${toTime}:00`);
            if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
                setError('Vui lòng chọn ngày giờ hợp lệ.');
                return;
            }
            if (end.getTime() <= start.getTime()) {
                setError('Thời gian kết thúc phải sau thời gian bắt đầu.');
                return;
            }
            onConfirm({ mode, tu_ngay: start.toISOString(), den_ngay: end.toISOString() });
            return;
        }
        onConfirm({ mode });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="relative w-full max-w-[520px] rounded-[20px] bg-white p-7 shadow-2xl">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    aria-label="Đóng"
                    className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-[#6b7280] transition hover:bg-[#f3f4f6] disabled:opacity-50"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff4e6]">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9.5 12 4l9 5.5" />
                        <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
                        <path d="M9 21V12h6v9" />
                    </svg>
                </div>

                <h2 className="text-center text-[22px] font-bold text-[#111827]">Tạm nghỉ bán?</h2>
                <p className="mt-2 text-center text-[14px] leading-6 text-[#6b7280]">
                    Khi tạm nghỉ bán, cửa hàng của bạn sẽ tạm thời ẩn với khách hàng.
                    <br />
                    Bạn vẫn có thể xem báo cáo và quản lý cửa hàng.
                </p>

                <div className="mt-6">
                    <p className="mb-3 text-[14px] font-semibold text-[#111827]">Chọn thời gian tạm nghỉ</p>

                    <label className="flex cursor-pointer items-center gap-3 py-2">
                        <input
                            type="radio"
                            name="pause-mode"
                            value="indefinite"
                            checked={mode === 'indefinite'}
                            onChange={() => setMode('indefinite')}
                            className="h-4 w-4 accent-[#2e7d32]"
                        />
                        <span className="text-[14px] text-[#111827]">Tạm nghỉ đến khi bật lại</span>
                    </label>

                    <label className="flex cursor-pointer items-center gap-3 py-2">
                        <input
                            type="radio"
                            name="pause-mode"
                            value="scheduled"
                            checked={mode === 'scheduled'}
                            onChange={() => setMode('scheduled')}
                            className="h-4 w-4 accent-[#2e7d32]"
                        />
                        <span className="text-[14px] text-[#111827]">Tạm nghỉ trong khoảng thời gian</span>
                    </label>

                    {mode === 'scheduled' && (
                        <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-[10px] bg-[#f9fafb] p-4">
                            <div className="space-y-2">
                                <p className="text-[12px] font-medium text-[#6b7280]">Từ ngày</p>
                                <div className="flex gap-2">
                                    <input
                                        type="date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        className="h-9 flex-1 min-w-0 rounded-[6px] border border-[#d1d5db] bg-white px-2 text-[13px] text-[#111827] focus:border-[#2e7d32] focus:outline-none"
                                    />
                                    <select
                                        value={fromTime}
                                        onChange={(e) => setFromTime(e.target.value)}
                                        className="h-9 w-[78px] rounded-[6px] border border-[#d1d5db] bg-white px-2 text-[13px] text-[#111827] focus:border-[#2e7d32] focus:outline-none"
                                    >
                                        {HOUR_OPTIONS.map((o) => (
                                            <option key={o.value} value={o.value}>{o.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <span className="self-end pb-[6px] text-[14px] text-[#6b7280]">—</span>
                            <div className="space-y-2">
                                <p className="text-[12px] font-medium text-[#6b7280]">Đến ngày</p>
                                <div className="flex gap-2">
                                    <input
                                        type="date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        className="h-9 flex-1 min-w-0 rounded-[6px] border border-[#d1d5db] bg-white px-2 text-[13px] text-[#111827] focus:border-[#2e7d32] focus:outline-none"
                                    />
                                    <select
                                        value={toTime}
                                        onChange={(e) => setToTime(e.target.value)}
                                        className="h-9 w-[78px] rounded-[6px] border border-[#d1d5db] bg-white px-2 text-[13px] text-[#111827] focus:border-[#2e7d32] focus:outline-none"
                                    >
                                        {HOUR_OPTIONS.map((o) => (
                                            <option key={o.value} value={o.value}>{o.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-5 flex items-start gap-2 rounded-[10px] bg-[#ecfdf5] px-4 py-3 text-[13px] leading-5 text-[#065f46]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-[2px] shrink-0">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    <span>Trong thời gian tạm nghỉ, khách hàng sẽ không thấy cửa hàng của bạn và không thể đặt món.</span>
                </div>

                {error && (
                    <p className="mt-3 text-center text-[13px] font-medium text-[#dc2626]">{error}</p>
                )}

                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 h-[44px] rounded-[10px] border border-[#d1d5db] text-[14px] font-semibold text-[#374151] transition hover:bg-[#f9fafb] disabled:opacity-60"
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={isSubmitting}
                        className="flex-1 h-[44px] rounded-[10px] bg-[#2e7d32] text-[14px] font-bold text-white transition hover:bg-[#256628] disabled:opacity-60"
                    >
                        {isSubmitting ? 'Đang xử lý…' : 'Xác nhận tạm nghỉ'}
                    </button>
                </div>
            </div>
        </div>
    );
}
