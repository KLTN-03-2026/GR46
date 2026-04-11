import PublicLayoutClient from './PublicLayoutClient';

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <PublicLayoutClient>{children}</PublicLayoutClient>;
}
