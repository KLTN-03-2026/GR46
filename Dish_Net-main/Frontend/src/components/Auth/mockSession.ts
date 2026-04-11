'use client';

export type MockAccountType = 'user' | 'store';

export type MockSession = {
    isAuthenticated: boolean;
    accountType: MockAccountType;
    displayName: string;
    handle: string;
    avatarLabel: string;
    notificationCount: number;
};

export const mockSessionStorageKey = 'dishnet_mock_session';

export const defaultMockSession: MockSession = {
    isAuthenticated: false,
    accountType: 'user',
    displayName: 'Đi Ăn Thôi',
    handle: '@accclone',
    avatarLabel: 'Đi Ăn Thôi',
    notificationCount: 1,
};

export const mockAccounts: Record<MockAccountType, MockSession> = {
    user: {
        isAuthenticated: true,
        accountType: 'user',
        displayName: 'Đi Ăn Thôi',
        handle: '@accclone',
        avatarLabel: 'Đi Ăn Thôi',
        notificationCount: 1,
    },
    store: {
        isAuthenticated: true,
        accountType: 'store',
        displayName: 'Nét Huế - Hàng Bông',
        handle: '@nethue.store',
        avatarLabel: 'Nét Huế',
        notificationCount: 3,
    },
};

export function readMockSession(): MockSession {
    if (typeof window === 'undefined') {
        return defaultMockSession;
    }

    const savedSession = window.localStorage.getItem(mockSessionStorageKey);
    if (!savedSession) {
        return defaultMockSession;
    }

    try {
        const parsedSession = JSON.parse(savedSession) as Partial<MockSession>;

        return {
            ...defaultMockSession,
            ...parsedSession,
            isAuthenticated: Boolean(parsedSession.isAuthenticated),
            accountType: parsedSession.accountType === 'store' ? 'store' : 'user',
        };
    } catch {
        window.localStorage.removeItem(mockSessionStorageKey);
        return defaultMockSession;
    }
}

export function writeMockSession(session: MockSession) {
    window.localStorage.setItem(mockSessionStorageKey, JSON.stringify(session));
}

export function clearMockSession() {
    writeMockSession({ ...defaultMockSession, isAuthenticated: false });
}
