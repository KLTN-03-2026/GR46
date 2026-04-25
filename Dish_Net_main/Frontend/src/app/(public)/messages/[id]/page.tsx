import MessagePageClient from '@/features/messages/MessagePageClient';

export default async function MessagePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <MessagePageClient targetId={id} />;
}
