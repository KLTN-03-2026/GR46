import SearchResultsClient from '@/features/search/SearchResultsClient';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const query = q?.trim() || 'bún bò';

    return <SearchResultsClient query={query} />;
}
