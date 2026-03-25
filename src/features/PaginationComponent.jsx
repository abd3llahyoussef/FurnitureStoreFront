import React from 'react';

export default function PaginationComponent({ pageNumber, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        let startPage = Math.max(1, pageNumber - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex items-center gap-1">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(pageNumber - 1)}
                disabled={pageNumber === 1}
                className="btn btn-sm btn-ghost disabled:opacity-30"
            >
                Prev
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
                {getPageNumbers().map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`btn btn-sm btn-square ${
                            pageNumber === page 
                                ? 'bg-[#f5be91] border-[#f5be91] text-black hover:bg-[#e0ac83]' 
                                : 'btn-ghost'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(pageNumber + 1)}
                disabled={pageNumber === totalPages}
                className="btn btn-sm btn-ghost disabled:opacity-30"
            >
                Next
            </button>
        </div>
    );
}
