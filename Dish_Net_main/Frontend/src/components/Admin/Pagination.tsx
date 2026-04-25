'use client';

import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisible?: number; // max page buttons shown, default 6
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    maxVisible = 6,
}: PaginationProps) {
    // Luôn hiển thị ít nhất 1 trang
    const safeTotalPages = Math.max(1, totalPages);

    const pages: (number | '...')[] = [];

    if (safeTotalPages <= maxVisible + 1) {
        for (let i = 1; i <= safeTotalPages; i++) pages.push(i);
    } else {
        const half = Math.floor(maxVisible / 2);
        let start = Math.max(1, currentPage - half);
        const end = Math.min(safeTotalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        if (start > 1) {
            pages.push(1);
            if (start > 2) pages.push('...');
        }

        for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) pages.push(i);
        }

        if (end < safeTotalPages) {
            if (end < safeTotalPages - 1) pages.push('...');
            pages.push(safeTotalPages);
        }
    }

    return (
        <div className="flex items-center justify-center px-6 py-4 border-t border-gray-100 gap-1.5">
            {/* Prev */}
            <button
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`w-8 h-8 rounded-lg border border-gray-200 text-sm flex items-center justify-center transition-colors cursor-pointer ${currentPage <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
            </button>

            {/* Page numbers */}
            {pages.map((page, i) =>
                page === '...' ? (
                    <span key={`dots-${i}`} className="text-sm text-gray-400 px-1">...</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium flex items-center justify-center transition-colors cursor-pointer ${currentPage === page
                            ? 'bg-green-500 text-white'
                            : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next */}
            <button
                disabled={currentPage >= safeTotalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`w-8 h-8 rounded-lg border border-gray-200 text-sm flex items-center justify-center transition-colors cursor-pointer ${currentPage >= safeTotalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
            </button>
        </div>
    );
}
