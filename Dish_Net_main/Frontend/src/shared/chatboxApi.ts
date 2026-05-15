const API_BASE = '/api';

type ApiEnvelope<T> = { success: boolean; message: string; data: T };

function isApiEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
    return (
        !!value &&
        typeof value === 'object' &&
        'success' in value &&
        'message' in value &&
        'data' in value
    );
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
    const path = `${API_BASE}${url}`;
    const requestUrl =
        typeof window === 'undefined'
            ? new URL(path, process.env.NEXT_PUBLIC_APP_ORIGIN ?? 'http://127.0.0.1:4000').toString()
            : path;

    const res = await fetch(requestUrl, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        credentials: 'include',
    });

    const body = await res.json().catch(() => null);
    const payload = isApiEnvelope<T>(body) ? body.data : body;

    if (!res.ok) {
        const message = isApiEnvelope(body) ? body.message : (body as { message?: string } | null)?.message;
        throw new Error(
            Array.isArray(message) ? message.join(', ') : message || 'Co loi xay ra',
        );
    }

    return payload as T;
}

export type ChatbotMessage = {
    id: number;
    vai_tro: 'user' | 'assistant';
    noi_dung: string;
    thoi_gian: string;
};

export type ChatbotPhien = {
    id: number;
    id_nguoi_dung: number | null;
    tieu_de: string | null;
    ngay_tao: string;
    ngay_cap_nhat: string;
};

export type ChatbotGuiResponse = {
    id_phien: number;
    tieu_de: string | null;
    tin_nhan: ChatbotMessage;
};

export const chatboxApi = {
    gui(noi_dung: string, id_phien?: number) {
        return request<ChatbotGuiResponse>('/chatbot/gui', {
            method: 'POST',
            body: JSON.stringify({ noi_dung, id_phien }),
        });
    },
    layLichSu(idPhien: number) {
        return request<{ phien: ChatbotPhien; tin_nhan: ChatbotMessage[] }>(
            `/chatbot/phien/${idPhien}`,
        );
    },
    danhSachPhien() {
        return request<ChatbotPhien[]>('/chatbot/phien');
    },
    xoaPhien(idPhien: number) {
        return request<{ thanh_cong: boolean }>(`/chatbot/phien/${idPhien}`, {
            method: 'DELETE',
        });
    },
};
