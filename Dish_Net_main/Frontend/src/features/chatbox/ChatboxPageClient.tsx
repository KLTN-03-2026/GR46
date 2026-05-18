'use client';

import { useEffect, useState } from 'react';
import { chatboxApi, type ChatbotPhien } from '@/shared/chatboxApi';
import { useAuth } from '@/shared/AuthContext';
import ChatboxPanel from './ChatboxPanel';

function formatDate(value?: string) {
    if (!value) return '';
    const d = new Date(value);
    return d.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
}

export default function ChatboxPageClient() {
    const { dangNhap, dangTai } = useAuth();
    const [phienList, setPhienList] = useState<ChatbotPhien[]>([]);
    const [activeId, setActiveId] = useState<number | undefined>(undefined);
    const [resetKey, setResetKey] = useState(0);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const taiDanhSach = async () => {
        if (!dangNhap) return;
        try {
            const list = await chatboxApi.danhSachPhien();
            setPhienList(list);
        } catch {
            setPhienList([]);
        }
    };

    useEffect(() => {
        if (dangTai) return;
        void taiDanhSach();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dangTai, dangNhap]);

    const xoa = (id: number) => {
        setDeletingId(id);
    };

    const xoaConfirm = async () => {
        if (deletingId === null) return;
        await chatboxApi.xoaPhien(deletingId);
        if (activeId === deletingId) {
            setActiveId(undefined);
            setResetKey((k) => k + 1);
        }
        setDeletingId(null);
        await taiDanhSach();
    };

    const taoMoi = () => {
        setActiveId(undefined);
        setResetKey((k) => k + 1);
    };

    return (
        <>
        {deletingId !== null && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={() => setDeletingId(null)}>
                <div className="w-full max-w-[360px] rounded-[16px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
                    <p className="text-[15px] font-semibold text-black">Xóa phiên chat?</p>
                    <p className="mt-1 text-[13px] text-[#666]">Toàn bộ lịch sử trò chuyện sẽ bị xóa vĩnh viễn.</p>
                    <div className="mt-5 flex justify-end gap-3">
                        <button type="button" onClick={() => setDeletingId(null)} className="rounded-[10px] border border-[#ddd] bg-white px-5 py-2 text-[13px] font-semibold text-black hover:bg-gray-50">Hủy</button>
                        <button type="button" onClick={() => void xoaConfirm()} className="rounded-[10px] bg-[#d32f2f] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#b71c1c]">Xóa</button>
                    </div>
                </div>
            </div>
        )}
        <div className="mx-auto flex h-[calc(100dvh-64px)] w-full max-w-6xl gap-3 p-3">
            <aside className="hidden w-72 flex-col rounded-xl bg-white shadow-sm ring-1 ring-black/5 md:flex">
                <div className="flex items-center justify-between border-b border-gray-200 p-3">
                    <h2 className="text-sm font-semibold text-gray-700">Phiên chat</h2>
                    <button
                        type="button"
                        onClick={taoMoi}
                        className="rounded-lg bg-[#2f6f25] px-3 py-1 text-xs font-semibold text-white hover:bg-[#245a1c]"
                    >
                        + Mới
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {!dangNhap && (
                        <p className="px-2 py-3 text-xs text-gray-500">
                            Đăng nhập để lưu lịch sử trò chuyện.
                        </p>
                    )}
                    {dangNhap && phienList.length === 0 && (
                        <p className="px-2 py-3 text-xs text-gray-500">Chưa có phiên nào.</p>
                    )}
                    <ul className="space-y-1">
                        {phienList.map((p) => (
                            <li key={p.id}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveId(p.id);
                                        setResetKey((k) => k + 1);
                                    }}
                                    className={`group flex w-full items-start gap-2 rounded-lg px-2 py-2 text-left text-xs transition ${
                                        activeId === p.id ? 'bg-[#eef8ea] ring-1 ring-[#56c194]' : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="flex-1 overflow-hidden">
                                        <span className="block truncate font-medium text-gray-800">
                                            {p.tieu_de || 'Phiên không tiêu đề'}
                                        </span>
                                        <span className="block text-[10px] text-gray-400">
                                            {formatDate(p.ngay_cap_nhat)}
                                        </span>
                                    </span>
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            void xoa(p.id);
                                        }}
                                        className="opacity-0 transition group-hover:opacity-100"
                                        aria-label="Xóa phiên"
                                    >
                                        🗑️
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <div className="flex-1 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
                <ChatboxPanel key={resetKey} variant="page" initialPhienId={activeId} />
            </div>
        </div>
        </>
    );
}
