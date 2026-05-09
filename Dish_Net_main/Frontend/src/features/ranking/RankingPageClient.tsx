'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { RankingPageData, RankingRowItem, RankingTab } from './data';

const tabOrder: RankingTab[] = ['stores', 'reviewers', 'foods'];

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ label: string; value: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-[160px] appearance-none rounded-[8px] border border-[#b9c9b1] bg-white px-5 py-3 pr-11 text-[15px] text-[#20251f] shadow-[0_1px_0_rgba(255,255,255,0.8)] focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value || 'all'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#70756e]">⌄</span>
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
          <span className="relative z-10 mt-0 text-[14px] font-bold leading-none">{rank}</span>
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

function LogoBadge({ value }: { value?: string }) {
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] bg-[#ffd319] text-[22px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
      {value ?? '🍽️'}
    </span>
  );
}

function ScoreValue({ value }: { value: string }) {
  const [rating, detail] = value.split(' ★ ');
  const starSuffix = detail ? `★ ${detail}` : '★';

  return (
    <span className="text-[17px] font-bold text-[#f3a000]">
      {rating} <span className="text-[#f3a000]">{starSuffix}</span>
    </span>
  );
}

export default function RankingPageClient({
  initialData,
  initialTab,
  initialQuery,
}: {
  initialData: RankingPageData;
  initialTab: RankingTab;
  initialQuery: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get('tab') as RankingTab) ?? initialTab;
  const currentTab = tabOrder.includes(activeTab) ? activeTab : initialTab;
  const config = initialData[currentTab];
  const currentQuery = searchParams.get('q') ?? initialQuery;
  const filterSoDonHang = searchParams.get('so_don_hang_tu') ?? '';
  const filterDanhGia = searchParams.get('diem_danh_gia_tu') ?? '';
  const filterTrangThai = searchParams.get('trang_thai') ?? '';
  const filterTyLeHuy = searchParams.get('ty_le_huy_toi_da') ?? '';

  const setTab = (tab: RankingTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const setQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set('q', value.trim());
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const setFilterParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set(key, value.trim());
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const tableGridClass =
    currentTab === 'reviewers'
      ? 'grid-cols-[74px_minmax(250px,1.3fr)_minmax(170px,0.88fr)_minmax(150px,0.8fr)_minmax(150px,0.8fr)_minmax(170px,0.9fr)_110px]'
      : currentTab === 'foods'
        ? 'grid-cols-[74px_minmax(220px,0.9fr)_minmax(280px,1.2fr)_minmax(180px,0.85fr)_minmax(150px,0.7fr)_110px]'
        : 'grid-cols-[74px_minmax(280px,1.45fr)_minmax(190px,0.95fr)_minmax(180px,0.85fr)_minmax(180px,0.9fr)_110px]';

  return (
    <div className="bg-[#f5f4f0] py-2 lg:py-3">
      <section className="mx-auto w-full max-w-[1520px] rounded-[24px] bg-[#f3f1ed] px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <div className="mx-auto max-w-[1340px]">
          <h1 className="text-[28px] font-bold uppercase tracking-[0.02em] text-black sm:text-[36px]">Bảng Xếp Hạng</h1>

          <div className="mt-3 overflow-hidden rounded-[26px] bg-white shadow-[0_14px_32px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col gap-4 border-b border-[#efebe5] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-5">
              <div className="grid w-full max-w-[640px] grid-cols-3 rounded-[18px] bg-[#f7f5f1] p-1">
                {tabOrder.map((tab, index) => {
                  const isActive = currentTab === tab;

                  return (
                    <div key={tab} className="relative flex items-center justify-center px-1">
                      {index > 0 ? <span className="absolute left-0 top-1/2 h-[32px] w-px -translate-y-1/2 bg-[#d8d8d3]" /> : null}
                      <button
                        type="button"
                        onClick={() => setTab(tab)}
                        className={`relative min-h-[52px] w-full rounded-[14px] px-3 py-3 text-center text-[17px] font-bold transition ${
                          isActive
                            ? 'bg-[#2d6f1e] text-white shadow-[inset_0_-1px_0_rgba(255,255,255,0.12)]'
                            : 'text-[#a5b49c] hover:text-[#2d6f1e]'
                        }`}
                      >
                        {initialData[tab].label}
                      </button>
                    </div>
                  );
                })}
              </div>

              <input
                defaultValue={currentQuery}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setQuery((e.target as HTMLInputElement).value);
                  }
                }}
                placeholder="Tìm kiếm trên bảng xếp hạng"
                className="flex h-[54px] w-full max-w-[340px] items-center rounded-full border border-[#cfc9c0] bg-white px-6 text-[15px] text-[#3a3f39] placeholder:text-[#b0bba4]"
              />
            </div>

            <div className="border-b border-[#efebe5] bg-[#f7f5f1] px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center gap-4">
                <span className="mr-3 text-[16px] font-semibold text-black sm:text-[18px]">Lọc theo</span>
                <SelectField
                  label="Số đơn hàng"
                  value={filterSoDonHang}
                  onChange={(value) => setFilterParam('so_don_hang_tu', value)}
                  options={[
                    { label: 'Số đơn hàng', value: '' },
                    { label: 'Từ 50 đơn', value: '50' },
                    { label: 'Từ 100 đơn', value: '100' },
                    { label: 'Từ 200 đơn', value: '200' },
                  ]}
                />
                <SelectField
                  label="Đánh giá"
                  value={filterDanhGia}
                  onChange={(value) => setFilterParam('diem_danh_gia_tu', value)}
                  options={[
                    { label: 'Đánh giá', value: '' },
                    { label: 'Từ 3.5★', value: '3.5' },
                    { label: 'Từ 4.0★', value: '4' },
                    { label: 'Từ 4.5★', value: '4.5' },
                  ]}
                />
                <SelectField
                  label="Trạng thái"
                  value={filterTrangThai}
                  onChange={(value) => setFilterParam('trang_thai', value)}
                  options={[
                    { label: 'Trạng thái', value: '' },
                    { label: 'Hoạt động', value: 'hoat_dong' },
                    { label: 'Tạm dừng', value: 'tam_dung' },
                    { label: 'Chờ duyệt', value: 'cho_duyet' },
                  ]}
                />
                <SelectField
                  label="Tỷ lệ hủy"
                  value={filterTyLeHuy}
                  onChange={(value) => setFilterParam('ty_le_huy_toi_da', value)}
                  options={[
                    { label: 'Tỷ lệ hủy', value: '' },
                    { label: '≤ 1%', value: '1' },
                    { label: '≤ 3%', value: '3' },
                    { label: '≤ 5%', value: '5' },
                    { label: '≤ 10%', value: '10' },
                  ]}
                />
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
                  {currentTab === 'stores' || currentTab === 'reviewers' ? <div className="text-center">{config.columns.finalMetric}</div> : null}
                  <div />
                </div>

                {config.rows.map((row) => (
                  <div key={row.id} className={`grid min-w-[1120px] items-center gap-4 border-b border-[#ece8e1] px-6 py-4 text-[15px] last:border-b-0 ${tableGridClass}`}>
                    <RankBadge rank={row.rank} trend={row.trend} />

                    {currentTab === 'foods' ? (
                      <div className="min-w-0 text-[16px] font-semibold text-[#111111]">{row.href ? <Link href={row.href} className="transition hover:text-[#2d6f1e]">{row.name}</Link> : row.name}</div>
                    ) : (
                      <div className="flex min-w-0 items-center gap-5">
                        <LogoBadge value={row.logo} />
                        <div className="min-w-0"><div className="truncate text-[16px] font-semibold text-[#111111]">{row.href ? <Link href={row.href} className="transition hover:text-[#2d6f1e]">{row.name}</Link> : row.name}</div></div>
                      </div>
                    )}

                    {currentTab === 'foods' ? (
                      <div className="flex min-w-0 items-center gap-5">
                        <LogoBadge value={row.secondaryLogo} />
                        <div className="truncate text-[16px] font-semibold text-[#111111]">{row.secondaryHref ? <Link href={row.secondaryHref} className="transition hover:text-[#2d6f1e]">{row.secondaryName}</Link> : row.secondaryName}</div>
                      </div>
                    ) : null}

                    <div className="text-center"><ScoreValue value={row.score} /></div>
                    <div className="text-center text-[17px] font-bold text-[#2ca03d]">{row.metric}</div>
                    {currentTab === 'reviewers' ? <div className="text-center text-[17px] font-bold text-[#2ca03d]">{row.secondaryMetric}</div> : null}
                    {currentTab === 'stores' || currentTab === 'reviewers' ? <div className="text-center text-[17px] font-bold text-[#ff2a19]">{row.finalMetric}</div> : null}
                    <div className="flex justify-end">{row.href ? <Link href={row.href} className="rounded-full border border-[#9a9a9a] px-6 py-1.5 text-[15px] text-[#666666] transition hover:border-[#2d6f1e] hover:text-[#2d6f1e]">Xem</Link> : <button type="button" className="rounded-full border border-[#9a9a9a] px-6 py-1.5 text-[15px] text-[#666666]">Xem</button>}</div>
                  </div>
                ))}

                {config.rows.length === 0 ? (
                  <div className="p-8 text-center text-[#666]">Không có dữ liệu xếp hạng phù hợp.</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
