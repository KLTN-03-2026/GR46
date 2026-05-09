'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/shared/AuthContext';
import { resolveNotificationTarget, type NotificationItem } from '@/features/notifications/data';
import { userCommerceApi } from '@/shared/userCommerceApi';

function NotificationIcon({ type }: { type: NotificationItem['type'] }) {
    const config = {
        like: { bg: 'bg-[#1f7ae0]', label: 'TG' },
        support: { bg: 'bg-[#1f7ae0]', label: 'HT' },
        follow: { bg: 'bg-[#1f7ae0]', label: 'TD' },
        comment: { bg: 'bg-[#35c85a]', label: 'BL' },
    }[type];

    return (
        <span className={`absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white ${config.bg}`}>
            {config.label}
        </span>
    );
}

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get('q') ?? '';
    const isHome = pathname === '/';
    const isRanking = pathname.startsWith('/ranking');
    const isExplore = pathname.startsWith('/explore');
    const isStorePage = pathname.startsWith('/store');
    const [searchValue, setSearchValue] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
    const [unreadMessageCount, setUnreadMessageCount] = useState(0);
    const { nguoiDung, dangNhap, dangTai, dangXuat } = useAuth();
    const [recentSearches, setRecentSearches] = useState([
        'Bún bò', 'Mỳ Quảng', 'Khu AAA', 'Cơm ngon bếp việt', 'Cơm ngon hà thành', 'chay express',
    ]);
    const searchRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) setIsSearchOpen(false);
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) setIsNotificationsOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isNotificationsOpen || !dangNhap) return;

        let mounted = true;
        void userCommerceApi
            .layThongBao({ trang: 1, so_luong: 20 })
            .then((payload: any) => {
                if (!mounted) return;
                const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
                const mapped: NotificationItem[] = rows.map((item: any, index: number) => ({
                    id: String(item.id ?? `header-noti-${index}`),
                    avatar: String(
                        item?.nguoi_nhan?.anh_dai_dien ??
                            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
                    ),
                    type:
                        String(item.loai_thong_bao ?? '').includes('tuong_tac')
                            ? 'like'
                            : String(item.loai_thong_bao ?? '').includes('binh_luan')
                              ? 'comment'
                              : String(item.loai_thong_bao ?? '').includes('theo_doi')
                                ? 'follow'
                                : 'support',
                    message: String(item.tieu_de || item.noi_dung || 'Bạn có thông báo mới'),
                    loaiThongBao: String(item.loai_thong_bao ?? ''),
                    loaiDoiTuong: String(item.loai_doi_tuong ?? ''),
                    idDoiTuong: item.id_doi_tuong != null ? Number(item.id_doi_tuong) : null,
                    time: item.ngay_tao ? new Date(item.ngay_tao).toLocaleString('vi-VN') : 'Vừa xong',
                    isRead: Boolean(item.da_doc),
                }));
                setNotifications(mapped);
                setUnreadNotificationCount(mapped.filter((item) => !item.isRead).length);
            })
            .catch(() => {
                if (mounted) {
                    setNotifications([]);
                    setUnreadNotificationCount(0);
                }
            });

        return () => {
            mounted = false;
        };
    }, [dangNhap, isNotificationsOpen]);

    useEffect(() => {
        if (!dangNhap) return;
        let mounted = true;
        const syncUnreadNotifications = async () => {
            try {
                const payload: any = await userCommerceApi.layThongBao({
                    trang: 1,
                    so_luong: 50,
                    chi_chua_doc: true,
                });
                if (!mounted) return;
                const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
                setUnreadNotificationCount(rows.length);
            } catch {
                if (mounted) setUnreadNotificationCount(0);
            }
        };

        void syncUnreadNotifications();
        const intervalId = window.setInterval(() => {
            void syncUnreadNotifications();
        }, 15000);

        return () => {
            mounted = false;
            window.clearInterval(intervalId);
        };
    }, [dangNhap]);

    useEffect(() => {
        if (!dangNhap) return;
        let mounted = true;
        const syncUnreadMessageCount = async () => {
            try {
                const payload: any = await userCommerceApi.layDanhSachTroChuyen({
                    trang: 1,
                    so_luong: 50,
                });
                if (!mounted) return;
                const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
                const total = rows.reduce((sum: number, item: any) => sum + Number(item?.so_tin_chua_doc ?? 0), 0);
                setUnreadMessageCount(total);
            } catch {
                if (mounted) setUnreadMessageCount(0);
            }
        };

        void syncUnreadMessageCount();
        const intervalId = window.setInterval(() => {
            void syncUnreadMessageCount();
        }, 15000);

        return () => {
            mounted = false;
            window.clearInterval(intervalId);
        };
    }, [dangNhap]);

    const handleNotificationClick = async (item: NotificationItem) => {
        const target = resolveNotificationTarget(item);
        const id = Number(item.id);

        if (Number.isFinite(id) && id > 0 && !item.isRead) {
            try {
                await userCommerceApi.danhDauThongBaoDaDoc(id);
            } catch {
                // ignore mark-read failures to avoid blocking navigation
            }
        }

        setNotifications((current) =>
            current.map((notification) =>
                notification.id === item.id
                    ? { ...notification, isRead: true }
                    : notification,
            ),
        );
        setUnreadNotificationCount((current) => Math.max(0, current - (item.isRead ? 0 : 1)));
        setIsNotificationsOpen(false);
        router.push(target);
    };

    const submitSearch = (query: string) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;
        setRecentSearches((current) => [trimmedQuery, ...current.filter((entry) => entry.toLowerCase() !== trimmedQuery.toLowerCase())].slice(0, 6));
        setIsSearchOpen(false);
        router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    };

    const handleLogout = async () => {
        await dangXuat();
        setIsProfileOpen(false);
        setIsNotificationsOpen(false);
        router.push('/login');
    };

    const vaiTroLabel = nguoiDung?.vai_tro === 'chu_cua_hang' ? 'Cửa hàng'
        : nguoiDung?.vai_tro === 'admin' ? 'Admin' : 'Người dùng';
    const avatarSrc =
        nguoiDung?.anh_dai_dien && String(nguoiDung.anh_dai_dien).trim()
            ? String(nguoiDung.anh_dai_dien)
            : null;
    const daHydrate = useSyncExternalStore(
        () => () => { },
        () => true,
        () => false,
    );
    const sanSangHienThiTheoPhien = daHydrate && !dangTai;

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b-2 border-border-green bg-white px-5 py-1.5">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Image src="/images/logo.png" alt="DishNet Logo" width={80} height={80}
                        className="h-auto w-20 flex-shrink-0" priority />
                </Link>

                <div ref={searchRef} className="relative">
                    <div className={`flex min-w-[300px] items-center rounded-full border bg-white px-5 py-2.5 transition-all duration-200 ${
                        isSearchOpen ? 'border-green-primary shadow-[0_0_0_3px_rgba(40,94,25,0.08)]'
                            : 'border-border-gray focus-within:border-green-primary focus-within:shadow-[0_0_0_3px_rgba(40,94,25,0.1)]'
                    }`}>
                        <span className="mr-2.5 text-text-gray">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                            </svg>
                        </span>
                        <input type="text" placeholder="Tìm kiếm trên DishNet"
                            value={isSearchOpen ? searchValue : currentQuery || searchValue}
                            onFocus={() => { setSearchValue(currentQuery || searchValue); setIsSearchOpen(true); }}
                            onChange={(event) => setSearchValue(event.target.value)}
                            onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); submitSearch(searchValue); } }}
                            className="flex-1 border-none bg-transparent text-base placeholder:text-text-gray" id="search-input" />
                    </div>

                    {isSearchOpen ? (
                        <div className="absolute left-0 top-[calc(100%+18px)] z-50 w-[520px] overflow-hidden rounded-[20px] border border-[#edf2eb] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                            <div className="px-8 py-5 text-[22px] font-bold text-[#6f796f]">Mới đây</div>
                            <div className="pb-4">
                                {recentSearches.map((item) => (
                                    <div key={item} className="flex items-center justify-between gap-4 px-8 py-3 text-[18px] text-black transition hover:bg-[#f8faf8]">
                                        <div className="flex min-w-0 items-center gap-4">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#cfd5cf] text-[#8b948b]">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                                            </span>
                                            <button onClick={() => submitSearch(item)} className="truncate text-left">{item}</button>
                                        </div>
                                        <button onClick={() => setRecentSearches((current) => current.filter((entry) => entry !== item))}
                                            className="text-[24px] leading-none text-[#909090] transition hover:text-black" aria-label={`Xóa ${item}`}>×</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            <nav className="flex items-center gap-3">
                {!isStorePage && (
                    <>
                        <Link href="/" className={`whitespace-nowrap rounded-lg px-5 py-2.5 text-lg font-bold transition-all duration-200 ${isHome ? 'text-green-primary' : 'text-text-gray hover:bg-green-primary/5 hover:text-green-primary'}`}>Bảng Tin</Link>
                        <Link href="/ranking" className={`whitespace-nowrap rounded-lg px-5 py-2.5 text-lg font-bold transition-all duration-200 ${isRanking ? 'text-green-primary' : 'text-text-gray hover:bg-green-primary/5 hover:text-green-primary'}`}>Bảng Xếp Hạng</Link>
                        <Link href="/explore" className={`whitespace-nowrap rounded-lg px-5 py-2.5 text-lg font-bold transition-all duration-200 ${isExplore ? 'text-green-primary' : 'text-text-gray hover:bg-green-primary/5 hover:text-green-primary'}`}>Khám Phá</Link>
                    </>
                )}

                {sanSangHienThiTheoPhien && dangNhap && nguoiDung?.vai_tro === 'chu_cua_hang' && !isStorePage ? (
                    <Link href="/store" className="ml-2 whitespace-nowrap rounded-full border border-[#ef4444]/15 bg-[#fff1ee] px-5 py-2.5 text-base font-bold text-[#d92d20] transition hover:-translate-y-0.5 hover:bg-[#ffe7e1]">
                        Vào cửa hàng
                    </Link>
                ) : null}

                {sanSangHienThiTheoPhien && dangNhap && isStorePage ? (
                    <Link href="/" className="ml-2 whitespace-nowrap rounded-full border border-[#2f6f25]/15 bg-[#eef8ea] px-5 py-2.5 text-base font-bold text-[#2f6f25] transition hover:-translate-y-0.5 hover:bg-[#e4f2df]">
                        Về DishNet
                    </Link>
                ) : null}

                {sanSangHienThiTheoPhien && dangNhap && nguoiDung ? (
                    <div className="ml-3 flex items-center gap-3">
                        <Link
                            href="/messages"
                            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#eef8ea] text-[#2f6f25] transition hover:-translate-y-0.5"
                            aria-label="Tin nhắn"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                            </svg>
                            {unreadMessageCount > 0 ? (
                                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff4d4f] px-1 text-[10px] font-bold text-white">
                                    {unreadMessageCount > 99 ? '99+' : unreadMessageCount}
                                </span>
                            ) : null}
                        </Link>

                        <div ref={notificationRef} className="relative">
                            <button type="button" onClick={() => { setIsNotificationsOpen((c) => !c); setIsProfileOpen(false); }}
                                className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#fff8d9] text-[#f6b600] transition hover:-translate-y-0.5" aria-label="Thông báo">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2a4 4 0 0 0-4 4v1.1A7 7 0 0 0 5 13v4l-2 2v1h18v-1l-2-2v-4a7 7 0 0 0-3-5.9V6a4 4 0 0 0-4-4Zm0 20a3 3 0 0 0 2.83-2H9.17A3 3 0 0 0 12 22Z" />
                                </svg>
                                {unreadNotificationCount > 0 ? (
                                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff4d4f] px-1 text-[10px] font-bold text-white">
                                        {unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}
                                    </span>
                                ) : null}
                            </button>

                            {isNotificationsOpen ? (
                                <div className="fixed right-5 top-[76px] z-50 w-[460px] overflow-hidden rounded-[22px] border border-[#dfe5db] bg-white shadow-[0_22px_40px_rgba(0,0,0,0.14)]">
                                    <div className="flex items-center justify-between px-6 pb-2 pt-5">
                                        <div className="text-[24px] font-bold text-black">Thông báo</div>
                                        <Link href="/notifications" onClick={() => setIsNotificationsOpen(false)}
                                            className="text-[16px] font-semibold text-[#2f6f25] transition hover:underline">Xem tất cả</Link>
                                    </div>
                                    <div className="px-6 pb-3 pt-1">
                                        <button type="button" className="rounded-full bg-[#eef8ea] px-4 py-2 text-[15px] font-bold text-[#2f6f25]">Tất cả</button>
                                    </div>
                                    <div className="px-6 text-[19px] font-bold text-[#232323]">Trước đó</div>
                                    <div className="max-h-[380px] space-y-1 overflow-y-auto px-3 py-3">
                                        {notifications.slice(0, 3).map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => void handleNotificationClick(item)}
                                                className="flex w-full items-center gap-3 rounded-[16px] px-3 py-3 text-left transition hover:bg-[#f8faf7]"
                                            >
                                                <div className="relative shrink-0">
                                                    <img src={item.avatar} alt="" className="h-16 w-16 rounded-full object-cover" />
                                                    <NotificationIcon type={item.type} />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[16px] leading-7 text-[#191919]">{item.message}</p>
                                                    <p className="mt-1 text-[14px] font-semibold text-[#2f6f25]">{item.time}</p>
                                                </div>
                                                <span className={`mr-1 h-4 w-4 rounded-full ${item.isRead ? 'bg-[#bfc8b9]' : 'bg-[#2f8f22]'}`} />
                                            </button>
                                        ))}
                                        {notifications.length === 0 ? (
                                            <div className="px-3 py-5 text-center text-sm text-[#70816d]">Chưa có thông báo mới</div>
                                        ) : null}
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div ref={profileRef} className="relative">
                            <button type="button" onClick={() => { setIsProfileOpen((c) => !c); setIsNotificationsOpen(false); }}
                                className="flex items-center gap-3 rounded-full border border-[#eef1ea] bg-white px-2 py-1.5 shadow-[0_8px_20px_rgba(72,101,64,0.08)] transition hover:border-[#d9e5d4]">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#f6f1ca] text-[11px] font-bold text-[#4f5b2d]">
                                        {avatarSrc ? (
                                            <img
                                                src={avatarSrc}
                                                alt={nguoiDung.ten_hien_thi}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            nguoiDung.ten_hien_thi.slice(0, 6)
                                        )}
                                    </div>
                                    <div className="hidden text-left md:block">
                                        <div className="max-w-[150px] truncate text-[14px] font-bold text-[#1d1d1d]">{nguoiDung.ten_hien_thi}</div>
                                        <div className="text-[12px] text-[#70816d]">Tài khoản {vaiTroLabel.toLowerCase()}</div>
                                    </div>
                                </div>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                            </button>

                            {isProfileOpen ? (
                                <div className="absolute right-0 top-[calc(100%+14px)] z-50 w-[320px] max-w-[calc(100vw-24px)] overflow-hidden rounded-[18px] border border-[#e5ebe0] bg-white shadow-[0_22px_40px_rgba(0,0,0,0.12)]">
                                    <div className="border-b border-[#eef2eb] bg-[linear-gradient(135deg,#f6fbf2_0%,#ffffff_100%)] px-5 py-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0 flex items-center gap-3">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f6f1ca] text-[11px] font-bold text-[#4f5b2d]">
                                                    {avatarSrc ? (
                                                        <img
                                                            src={avatarSrc}
                                                            alt={nguoiDung.ten_hien_thi}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        nguoiDung.ten_hien_thi.slice(0, 2).toUpperCase()
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="truncate text-[17px] font-bold text-[#1d1d1d]">{nguoiDung.ten_hien_thi}</div>
                                                    <div className="mt-1 truncate text-[14px] text-[#70816d]">@{nguoiDung.ten_dang_nhap}</div>
                                                </div>
                                            </div>
                                            <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                                nguoiDung.vai_tro === 'chu_cua_hang' ? 'bg-[#fff1ee] text-[#d92d20]' : 'bg-[#edf7ed] text-[#2f7d32]'
                                            }`}>{vaiTroLabel}</span>
                                        </div>
                                    </div>

                                    <div className="py-2">
                                        {nguoiDung.vai_tro === 'chu_cua_hang' ? (
                                            <>
                                                <Link href="/store-profile" className="block px-5 py-3 text-[17px] text-[#333333] transition hover:bg-[#f6faf4]">Trang cửa hàng</Link>
                                                <Link href="/messages" className="block px-5 py-3 text-[17px] text-[#333333] transition hover:bg-[#f6faf4]">
                                                    Tin nhắn cửa hàng
                                                    {unreadMessageCount > 0 ? (
                                                        <span className="ml-2 rounded-full bg-[#ff4d4f] px-2 py-0.5 text-[11px] font-bold text-white">
                                                            {unreadMessageCount > 99 ? '99+' : unreadMessageCount}
                                                        </span>
                                                    ) : null}
                                                </Link>
                                                <Link href="/user/support" className="block px-5 py-3 text-[17px] text-[#333333] transition hover:bg-[#f6faf4]">Trợ giúp và hỗ trợ</Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link href="/user/profile" className="block px-5 py-3 text-[17px] text-[#333333] transition hover:bg-[#f6faf4]">Trang cá nhân</Link>
                                                <Link href="/messages" className="block px-5 py-3 text-[17px] text-[#333333] transition hover:bg-[#f6faf4]">
                                                    Tin nhắn
                                                    {unreadMessageCount > 0 ? (
                                                        <span className="ml-2 rounded-full bg-[#ff4d4f] px-2 py-0.5 text-[11px] font-bold text-white">
                                                            {unreadMessageCount > 99 ? '99+' : unreadMessageCount}
                                                        </span>
                                                    ) : null}
                                                </Link>
                                                <Link href="/user/orders?menu=placed" className="block px-5 py-3 text-[17px] text-[#333333] transition hover:bg-[#f6faf4]">Đơn hàng</Link>
                                                <Link href="/user/settings" className="block px-5 py-3 text-[17px] text-[#333333] transition hover:bg-[#f6faf4]">Cài đặt</Link>
                                                <Link href="/user/support" className="block px-5 py-3 text-[17px] text-[#333333] transition hover:bg-[#f6faf4]">Trợ giúp và hỗ trợ</Link>
                                            </>
                                        )}
                                    </div>

                                    <div className="border-t border-[#eef2eb] p-2">
                                        <button type="button" onClick={handleLogout}
                                            className="w-full rounded-[12px] px-4 py-3 text-left text-[17px] font-semibold text-[#d64242] transition hover:bg-[#fff3f3]">
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : sanSangHienThiTheoPhien ? (
                    <Link href="/login"
                        className="whitespace-nowrap rounded-full border border-green-primary bg-green-primary px-8 py-3 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1e4a13] active:translate-y-0"
                        id="header-login-btn">
                        Đăng nhập
                    </Link>
                ) : (
                    <div className="h-[50px] w-[148px] rounded-full border border-transparent" aria-hidden="true" />
                )}
            </nav>
        </header>
    );
}
