import { notFound } from 'next/navigation';

import MessagePageClient from '@/features/messages/MessagePageClient';
import { getReviewerConversationById } from '@/features/ranking-reviewer-detail/data';

export default async function MessagePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const conversation = await getReviewerConversationById(id);

    if (!conversation) {
        notFound();
    }

    return <MessagePageClient conversation={conversation} />;
}
