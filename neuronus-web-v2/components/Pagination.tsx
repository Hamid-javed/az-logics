import Arrow from "@/public/images/home/Arrow";
import React, { useCallback } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Ensure the useCallback hook is always called
  const handlePageChange = useCallback(
    (page: number) => {
      onPageChange(page);
      window.history.pushState(null, "", `?page=${page}`);
    },
    [onPageChange],
  );

  if (totalPages <= 1) {
    return null;
  }

  const maxPagesToShow = 5;

  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxPagesToShow / 2),
      totalPages - maxPagesToShow + 1,
    ),
  );
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center my-12">
      <nav>
        <ul className="flex items-center space-x-2">
          <li>
            <button
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
              className="px-4 py-2 border rounded-md bg-primary text-white disabled:hover:brightness-100 hover:brightness-150 dark:text-dark-primary-default cursor-pointer disabled:cursor-not-allowed"
              disabled={currentPage === 1}
            >
              ⭠
            </button>
          </li>
          {pages.map((page) => (
            <li key={`page-${page}`}>
              <button
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md ${
                  page === currentPage
                    ? "border border-primary bg-white "
                    : "bg-gray-200 hover:bg-gray-400 cursor-pointer"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() =>
                handlePageChange(
                  currentPage < totalPages ? currentPage + 1 : totalPages,
                )
              }
              className="px-4 py-2 border rounded-md bg-primary text-white disabled:hover:brightness-100 hover:brightness-150 dark:text-dark-primary-default cursor-pointer disabled:cursor-not-allowed"
              disabled={currentPage === totalPages}
            >
              ⭢
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
