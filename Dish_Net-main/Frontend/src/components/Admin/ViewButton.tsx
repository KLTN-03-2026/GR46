import Link from 'next/link';
import React from 'react';

interface ViewButtonBaseProps {
    label?: string;
    variant?: 'green' | 'blue';
}

interface ViewButtonWithHref extends ViewButtonBaseProps {
    href: string;
    onClick?: never;
}

interface ViewButtonWithOnClick extends ViewButtonBaseProps {
    href?: never;
    onClick: () => void;
}

type ViewButtonProps = ViewButtonWithHref | ViewButtonWithOnClick;

const variantClasses: Record<string, string> = {
    green: 'bg-green-500 hover:bg-green-600 text-white',
    blue: 'bg-blue-500 hover:bg-blue-600 text-white',
};

export default function ViewButton({ href, onClick, label = 'Xem', variant = 'green' }: ViewButtonProps) {
    const btnClass = `px-4 py-1.5 rounded-md ${variantClasses[variant] ?? variantClasses.green} text-xs font-semibold transition-colors inline-block cursor-pointer`;

    if (href) {
        return (
            <Link href={href} className={btnClass}>
                {label}
            </Link>
        );
    }
    return (
        <button onClick={onClick} className={btnClass}>
            {label}
        </button>
    );
}
