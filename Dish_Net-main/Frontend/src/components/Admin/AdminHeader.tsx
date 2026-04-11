'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function AdminHeader() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-50">
            {/* Left: Logo */}
            <Link href="/admin" className="flex items-center gap-3 w-[220px]">
                <div className="flex items-center">
                    <Image
                        src="/images/logo.png"
                        alt="DishNet Logo"
                        width={120}
                        height={40}
                        className="object-contain"
                    />
                </div>
            </Link>

            {/* Right: Bell & Admin Avatar */}
            <div className="flex items-center gap-6">
                <button className="relative p-1.5 text-gray-500 hover:text-black transition-colors cursor-pointer">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                    <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center border border-green-300">
                        {/* Avatar placeholder matching Figma 'image 406' */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#285E19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <span className="font-semibold text-base text-black hidden sm:block">Admin</span>
                </div>
            </div>
        </header>
    );
}
