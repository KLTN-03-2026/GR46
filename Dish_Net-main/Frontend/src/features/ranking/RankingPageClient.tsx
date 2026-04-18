'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { rankingPageData, type RankingRowItem, type RankingTab } from './data';

const tabOrder: RankingTab[] = ['stores', 'reviewers', 'foods'];

function SelectField({ label }: { label: string }) {
    return (
        <div className="relative">
            <select
                aria-label={label}
                defaultValue={label}
                className="min-w-[160px] appearance-none rounded-[8px] border border-[#b9c9b1] bg-white px-5 py-3 pr-11 text-[15px] text-[#20251f] shadow-[0_1px_0_rgba(255,255,255,0.8)] focus:outline-none"
            >
                <option>{label}</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#70756e]">⌄</span>
        </div>
    );
}

function RankBadge({ rank, trend }: { rank: number; trend?: RankingRowItem['trend'] }) {
    const isTopThree = rank <= 3;

    if (isTopThree) {
        const palette = [
            'bg-[#f7b500] text-white shadow-[0_8px_18px_rgba(247,181,0,0.22)]',
            'bg-[#cbd5df] text-[#334155] shadow-[0_8px_18px_rgba(148,163,184,0.18)]',
            'bg-[#d68b4d] text-white shadow-[0_8px_18px_rgba(214,139,77,0.2)]',
        ][rank - 1];

        return (
            <div className="flex items-center gap-2">
                <div className={`relative flex h-9 w-9 items-center justify-center rounded-[12px] ${palette}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="absolute top-[4px] opacity-80">
                        <path d="M12 3l2.2 4.46 4.92.72-3.56 3.47.84 4.9L12 14.8l-4.4 2.75.84-4.9-3.56-3.47 4.92-.72L12 3Z" fill="currentColor" />
                    </svg>
                    <span className="relative z-10 mt-3 text-[14px] font-bold leading-none">{rank}</span>
                </div>
                {trend === 'up' ? <TrendArrow direction="up" /> : null}
                {trend === 'down' ? <TrendArrow direction="down" /> : null}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <span className="min-w-[22px] text-center text-[26px] font-bold leading-none text-[#66744d]">{rank}</span>
            {trend === 'up' ? <TrendArrow direction="up" /> : null}
            {trend === 'down' ? <TrendArrow direction="down" /> : null}
        </div>
    );
}

function TrendArrow({ direction }: { direction: 'up' | 'down' }) {
    return (
        <span
            className={`mt-1 inline-block h-0 w-0 border-l-[8px] border-r-[8px] border-l-transparent border-r-transparent ${
                direction === 'up' ? 'border-b-[14px] border-b-[#64ba2e]' : 'border-t-[14px] border-t-[#ef2d2d]'
            }`}
        />
    );
}

function LogoBadge({ value }: { value?: string }) {
    return (
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] bg-[#ffd319] text-[22px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
            {value ?? '🍽️'}
        </span>
    );
}

function ScoreValue({ value }: { value: string }) {
    const [rating, detail] = value.split(' ★ ');

    return (
        <span className="text-[17px] font-bold text-[#f3a000]">
            {rating} <span className="text-[#ffbc08]">★</span>{' '}
            <span className="font-medium text-[#c8bc6f]">{detail ? `(${detail.replace(/[()]/g, '')})` : ''}</span>
        </span>
    );
}

export default function RankingPageClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeTab = (searchParams.get('tab') as RankingTab) ?? 'stores';
    const currentTab = tabOrder.includes(activeTab) ? activeTab : 'stores';
    const config = rankingPageData[currentTab];

    const setTab = (tab: RankingTab) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('tab', tab);
        router.replace(`${pathname}?${params.toString()}`);
    };

    const tableGridClass = currentTab === 'reviewers'
        ? 'grid-cols-[74px_minmax(250px,1.3fr)_minmax(170px,0.88fr)_minmax(150px,0.8fr)_minmax(150px,0.8fr)_minmax(170px,0.9fr)_110px]'
        : currentTab === 'foods'
            ? 'grid-cols-[74px_minmax(220px,0.9fr)_minmax(280px,1.2fr)_minmax(180px,0.85fr)_minmax(150px,0.7fr)_110px]'
            : 'grid-cols-[74px_minmax(280px,1.45fr)_minmax(190px,0.95fr)_minmax(180px,0.85fr)_minmax(180px,0.9fr)_110px]';

    return (
        <div className="bg-[#f5f4f0] py-4 lg:py-5">
            <section className="mx-auto w-full max-w-[1520px] rounded-[24px] bg-[#f3f1ed] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <div className="mx-auto max-w-[1340px]">
                    <h1 className="text-[28px] font-bold uppercase tracking-[0.02em] text-black sm:text-[36px]">Bảng Xếp Hạng</h1>

                    <div className="mt-5 overflow-hidden rounded-[26px] bg-white shadow-[0_14px_32px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col gap-4 border-b border-[#efebe5] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-5">
                            <div className="grid w-full max-w-[640px] grid-cols-3 rounded-[18px] bg-[#f7f5f1] p-1">
                                {tabOrder.map((tab, index) => {
                                    const isActive = currentTab === tab;

                                    return (
                                        <div key={tab} className="relative flex items-center justify-center px-1">
                                            {index > 0 ? (
                                                <span className="absolute left-0 top-1/2 h-[32px] w-px -translate-y-1/2 bg-[#d8d8d3]" />
                                            ) : null}
                                            <button
                                                type="button"
                                                onClick={() => setTab(tab)}
                                                className={`relative min-h-[52px] w-full rounded-[14px] px-3 py-3 text-center text-[17px] font-bold transition ${
                                                    isActive
                                                        ? 'bg-[#2d6f1e] text-white shadow-[inset_0_-1px_0_rgba(255,255,255,0.12)]'
                                                        : 'text-[#a5b49c] hover:text-[#2d6f1e]'
                                                }`}
                                            >
                                                {rankingPageData[tab].label}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex h-[54px] w-full max-w-[340px] items-center rounded-full border border-[#cfc9c0] bg-white px-6 text-[15px] text-[#b0bba4]">
                                Tìm kiếm trên bảng xếp hạng
                            </div>
                        </div>

                        <div className="border-b border-[#efebe5] bg-[#f7f5f1] px-4 py-4 sm:px-6 lg:px-8">
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="mr-3 text-[16px] font-semibold text-black sm:text-[18px]">Lọc theo</span>
                                {config.filters.map((filter) => (
                                    <SelectField key={filter} label={filter} />
                                ))}
                            </div>
                        </div>

                        <div className="px-3 pb-3 pt-0 sm:px-4 sm:pb-4 lg:px-5">
                            <div className="overflow-x-auto rounded-[24px] border border-[#ece8e1] bg-white">
                                <div className={`grid min-w-[1120px] items-center gap-4 border-b border-[#ece8e1] bg-white px-6 py-4 text-[18px] font-bold text-black ${tableGridClass}`}>
                                    <div />
                                    <div>{config.columns.primary}</div>
                                    {currentTab === 'foods' ? <div>{config.columns.secondary}</div> : null}
                                    <div className="text-center">{config.columns.score}</div>
                                    <div className="text-center">{config.columns.metric}</div>
                                    {currentTab === 'reviewers' ? <div className="text-center">{config.columns.secondaryMetric}</div> : null}
                                    {currentTab === 'stores' || currentTab === 'reviewers' ? (
                                        <div className="text-center">{config.columns.finalMetric}</div>
                                    ) : null}
                                    <div />
                                </div>

                                {config.rows.map((row) => (
                                    <div
                                        key={row.id}
                                        className={`grid min-w-[1120px] items-center gap-4 border-b border-[#ece8e1] px-6 py-4 text-[15px] last:border-b-0 ${tableGridClass}`}
                                    >
                                        <RankBadge rank={row.rank} trend={row.trend} />

                                        {currentTab === 'foods' ? (
                                            <div className="min-w-0 text-[16px] font-semibold text-[#111111]">
                                                {row.href ? (
                                                    <Link href={row.href} className="transition hover:text-[#2d6f1e]">
                                                        {row.name}
                                                    </Link>
                                                ) : (
                                                    row.name
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex min-w-0 items-center gap-5">
                                                <LogoBadge value={row.logo} />
                                                <div className="min-w-0">
                                                    <div className="truncate text-[16px] font-semibold text-[#111111]">
                                                        {row.href ? (
                                                            <Link href={row.href} className="transition hover:text-[#2d6f1e]">
                                                                {row.name}
                                                            </Link>
                                                        ) : (
                                                            row.name
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {currentTab === 'foods' ? (
                                            <div className="flex min-w-0 items-center gap-5">
                                                <LogoBadge value={row.secondaryLogo} />
                                                <div className="truncate text-[16px] font-semibold text-[#111111]">
                                                    {row.secondaryHref ? (
                                                        <Link href={row.secondaryHref} className="transition hover:text-[#2d6f1e]">
                                                            {row.secondaryName}
                                                        </Link>
                                                    ) : (
                                                        row.secondaryName
                                                    )}
                                                </div>
                                            </div>
                                        ) : null}

                                        <div className="text-center">
                                            <ScoreValue value={row.score} />
                                        </div>

                                        <div className="text-center text-[17px] font-bold text-[#2ca03d]">{row.metric}</div>

                                        {currentTab === 'reviewers' ? (
                                            <div className="text-center text-[17px] font-bold text-[#2ca03d]">{row.secondaryMetric}</div>
                                        ) : null}

                                        {currentTab === 'stores' || currentTab === 'reviewers' ? (
                                            <div className="text-center text-[17px] font-bold text-[#ff2a19]">{row.finalMetric}</div>
                                        ) : null}

                                        <div className="flex justify-end">
                                            {row.href ? (
                                                <Link
                                                    href={row.href}
                                                    className="rounded-full border border-[#9a9a9a] px-6 py-1.5 text-[15px] text-[#666666] transition hover:border-[#2d6f1e] hover:text-[#2d6f1e]"
                                                >
                                                    Xem
                                                </Link>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="rounded-full border border-[#9a9a9a] px-6 py-1.5 text-[15px] text-[#666666]"
                                                >
                                                    Xem
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
