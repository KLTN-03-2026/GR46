'use client';

import React from 'react';

export interface Column<T> {
    key: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    render?: (row: T, index: number) => React.ReactNode;
    className?: string;
}

interface AdminTableProps<T> {
    columns: Column<T>[];
    data: T[];
    rowKey: (row: T, index: number) => string | number;
    emptyMessage?: string;
    children?: React.ReactNode; // for custom footer (e.g. pagination)
}

export default function AdminTable<T>({
    columns,
    data,
    rowKey,
    emptyMessage = 'Không có dữ liệu phù hợp.',
    children,
}: AdminTableProps<T>) {
    const getAlignClass = (align?: string) => {
        switch (align) {
            case 'center': return 'text-center';
            case 'right': return 'text-right';
            default: return 'text-left';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/60">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`px-5 py-4 text-sm font-semibold text-gray-600 ${getAlignClass(col.align)} ${col.className || ''}`}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((row, i) => (
                            <tr
                                key={rowKey(row, i)}
                                className={`border-b border-gray-50 hover:bg-gray-50/40 transition-colors ${i === data.length - 1 ? 'border-none' : ''}`}
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={`px-5 py-4 text-sm ${getAlignClass(col.align)} ${col.className || ''}`}
                                    >
                                        {col.render
                                            ? col.render(row, i)
                                            : (row as Record<string, unknown>)[col.key] as React.ReactNode
                                        }
                                    </td>
                                ))}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-14 text-center text-gray-400 text-sm">
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer slot (pagination, etc.) */}
            {children}
        </div>
    );
}
