import type { Metadata } from 'next';
import ChatboxPageClient from '@/features/chatbox/ChatboxPageClient';

export const metadata: Metadata = {
    title: 'Trợ lý AI - DishNet',
};

export default function ChatboxPage() {
    return <ChatboxPageClient />;
}
