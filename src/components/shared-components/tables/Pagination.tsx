'use client';
import React from 'react';

interface PaginationProps {
  data?: any;
  totalCount?: number;
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: any) => void;
  handleSelectedPage: (page: any) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  data,
  totalCount,
  totalPages,
  currentPage,
  handlePageChange,
  handleSelectedPage,
}) => {
  const goToPreviousPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  // const currentPageData = data?.length;

  // Generate page numbers with ellipsis logic
  const getPageNumbers = () => {
    const elements: (number | string)[] = [];
    let lastDisplayed = 0;

    for (let page = 1; page <= totalPages; page++) {
      const isInRange =
        page === 1 ||
        page === totalPages ||
        Math.abs(page - currentPage) <= 1 ||
        (currentPage <= 3 && page <= 3) ||
        (currentPage >= totalPages - 2 && page >= totalPages - 2);

      if (isInRange) {
        if (page - lastDisplayed > 1 && lastDisplayed > 0) {
          elements.push('...');
        }
        elements.push(page);
        lastDisplayed = page;
      }
    }

    return elements;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center">
      {/* Previous */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
      >
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((item, idx) =>
          item === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => handleSelectedPage(item as number)}
              className={`px-4 py-2 rounded ${
                currentPage === item ? 'bg-brand-500 text-white' : 'text-gray-700 dark:text-gray-400'
              } flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500`}
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
