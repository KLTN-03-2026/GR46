'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { RankingReviewerDetailData } from './data';

type ProfileTab = 'posts' | 'videos' | 'reposts';

function HeartIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[18px] w-[18px] fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 16.5 3.9 10.8a3.97 3.97 0 0 1 0-5.72 3.76 3.76 0 0 1 5.45 0L10 5.7l.65-.62a3.76 3.76 0 0 1 5.45 0 3.97 3.97 0 0 1 0 5.72L10 16.5Z" />
        </svg>
    );
}

function CommentIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[18px] w-[18px] fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16.5 9.3c0 3.6-3 6.5-6.8 6.5-1.1 0-2.2-.24-3.14-.7L3.5 16l1-2.82a6.22 6.22 0 0 1-1.57-4.18c0-3.58 3.05-6.5 6.77-6.5 3.75 0 6.8 2.92 6.8 6.5Z" />
        </svg>
    );
}

function RepostStatIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[18px] w-[18px] fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 6.5h7.2L10.6 4.8" />
            <path d="M15 13.5H7.8l1.6 1.7" />
            <path d="m12.2 6.5 2.1 2.2-2.1 2.1" />
            <path d="m7.8 13.5-2.1-2.2 2.1-2.1" />
        </svg>
    );
}

function SendIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[18px] w-[18px] fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16.6 10 4 15.8l2-4.7L4 4.2 16.6 10Z" />
            <path d="M6.1 11.1h4.1" />
        </svg>
    );
}

function ProfilePostCard({
    post,
}: {
    post: RankingReviewerDetailData['posts'][number];
}) {
    return (
        <article className="border-t border-[#d6d6d6] px-5 py-4">
            <div className="grid grid-cols-[34px_minmax(0,1fr)] gap-3">
                <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eceff4] text-[22px]">👤</div>
                    <div className="mt-3 h-full min-h-[250px] w-px bg-[#e4e4e4]" />
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-[#1a1a1a]">@vy.fooodieee</span>
                        <span className="text-[11px] text-[#7a7a7a]">{post.date}</span>
                    </div>

                    <div className="mt-3 space-y-2.5 text-[12px] leading-7 text-[#3d3d3d]">
                        {post.content.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-3 grid max-w-[500px] grid-cols-2 gap-3">
                        {post.images.map((image, index) => (
                            <img key={`${post.id}-${index}`} src={image} alt="" className="h-[148px] w-full rounded-[10px] object-cover" />
                        ))}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-5 text-[13px] text-[#505050]">
                        <span className="inline-flex items-center gap-1.5"><HeartIcon />{post.likes}</span>
                        <span className="inline-flex items-center gap-1.5"><CommentIcon />{post.comments}</span>
                        <span className="inline-flex items-center gap-1.5"><RepostStatIcon />{post.shares}</span>
                        <span className="inline-flex items-center gap-1.5"><SendIcon />{post.sends}</span>
                        <button type="button" className="ml-auto rounded-full border border-[#59a84f] px-5 py-1.5 text-[12px] font-bold text-[#3b8a31]">
                            Đặt món
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

function VideoCard({
    item,
}: {
    item: RankingReviewerDetailData['videos'][number];
}) {
    return (
        <article className="group relative overflow-hidden rounded-[14px]">
            <img src={item.image} alt="" className="h-[220px] w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {item.pinned ? (
                <span className="absolute left-3 top-3 rounded-[10px] bg-[#ff3356] px-3 py-1 text-[13px] font-bold text-white">Đã ghim</span>
            ) : null}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[14px] font-semibold text-white">
                <span>▷</span>
                <span>{item.views}</span>
            </div>
        </article>
    );
}

export default function RankingReviewerDetailPageClient({
    reviewer,
}: {
    reviewer: RankingReviewerDetailData;
}) {
    const [activeTab, setActiveTab] = useState<ProfileTab>('posts');

    const visiblePosts = useMemo(() => reviewer.posts, [reviewer.posts]);
    const visibleVideos = useMemo(() => reviewer.videos, [reviewer.videos]);

    return (
        <div className="bg-[#f1f1ee] py-5">
            <section className="mx-auto w-full max-w-[1080px] overflow-hidden rounded-[22px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
                <div className="px-7 pb-4 pt-5">
                    <div className="grid gap-5 lg:grid-cols-[170px_minmax(0,1fr)]">
                        <div className="flex justify-center lg:justify-start">
                            <div className="flex h-[158px] w-[158px] items-center justify-center rounded-full bg-[#f6f1ca] p-4">
                                <img src={reviewer.avatar} alt={reviewer.name} className="h-[112px] w-[112px] rounded-full object-cover" />
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-[30px] font-bold text-black">{reviewer.name}</h1>
                                    <p className="mt-1.5 text-[18px] text-[#4a4a4a]">{reviewer.handle}</p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="rounded-full bg-[#fde8bf] px-5 py-3 text-[18px] font-bold text-[#211d11]">⭐ TOP REVIEWER</span>
                                    <span className="rounded-full bg-[#f8d4cf] px-5 py-3 text-[18px] font-bold text-[#2d241f]">ĐỘ UY TÍN <span className="ml-2 text-[#ff4327]">{reviewer.trustScore}</span></span>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2 text-[16px] text-[#242424]">
                                <span><b>{reviewer.postsCount}</b> bài viết</span>
                                <span><b>{reviewer.followers}</b> người theo dõi</span>
                                <span>Đang theo dõi <b>{reviewer.following}</b> người dùng</span>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <button type="button" className="min-w-[180px] rounded-[12px] bg-black px-5 py-2.5 text-[16px] font-bold text-white">Theo dõi</button>
                                <Link
                                    href={`/messages/${reviewer.id}`}
                                    className="min-w-[156px] rounded-[12px] bg-[#edf2ed] px-5 py-2.5 text-center text-[16px] font-bold text-[#161616]"
                                >
                                    Nhắn tin
                                </Link>
                                <button type="button" className="rounded-[10px] bg-[#f3f3f3] px-3.5 py-2.5 text-[16px]">🧑‍🤝‍🧑</button>
                                <button type="button" className="rounded-[10px] bg-[#f3f3f3] px-3.5 py-2.5 text-[16px]">↗</button>
                                <button type="button" className="rounded-[10px] bg-[#f3f3f3] px-3.5 py-2.5 text-[16px]">•••</button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-b border-[#bcbcbc]">
                        <div className="flex flex-wrap items-center gap-5">
                            <button
                                type="button"
                                onClick={() => setActiveTab('posts')}
                                className={`border-b-2 px-2 pb-3 text-[15px] font-bold transition ${
                                    activeTab === 'posts' ? 'border-black text-black' : 'border-transparent text-[#6d6d6d]'
                                }`}
                            >
                                ▦ Bài viết
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('videos')}
                                className={`border-b-2 px-2 pb-3 text-[15px] font-bold transition ${
                                    activeTab === 'videos' ? 'border-black text-black' : 'border-transparent text-[#6d6d6d]'
                                }`}
                            >
                                ◉ Video
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('reposts')}
                                className={`border-b-2 px-2 pb-3 text-[15px] font-bold transition ${
                                    activeTab === 'reposts' ? 'border-black text-black' : 'border-transparent text-[#6d6d6d]'
                                }`}
                            >
                                ⇅ Bài đăng lại
                            </button>
                        </div>

                        <div className="mb-3 flex items-center gap-2">
                            <button type="button" className="rounded-[8px] border border-[#e0e0e0] bg-white px-3 py-1.5 text-[13px] font-semibold">Mới nhất</button>
                            <button type="button" className="rounded-[8px] bg-[#f1f1f1] px-3 py-1.5 text-[13px] font-semibold text-[#9a9a9a]">Cũ nhất</button>
                        </div>
                    </div>
                </div>

                {activeTab === 'posts' ? (
                    <div>
                        {visiblePosts.map((post) => (
                            <ProfilePostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : null}

                {activeTab === 'videos' ? (
                    <div className="px-6 pb-6 pt-5">
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {visibleVideos.map((video) => (
                                <VideoCard key={video.id} item={video} />
                            ))}
                        </div>
                    </div>
                ) : null}

                {activeTab === 'reposts' ? (
                    <div className="px-6 py-12 text-center text-[15px] text-[#787878]">
                        Chưa có bài đăng lại nào được hiển thị.
                    </div>
                ) : null}
            </section>
        </div>
    );
}
