import { PaginationProps } from "../../schemas/data";
import { useIsMobile } from "../../utility/useIsMobile";
import "./pagination.css";
import { useState, useEffect } from "react";

export const Pagination = ({
  totalPages,
  currentPage = 1,
  onPageChange,
}: PaginationProps) => {
  const [range, setRange] = useState<(number | "...")[]>([]);
  const START = 1;
  const END = totalPages;

  const isMobile = useIsMobile();

  const getPageRange = (): (number | "...")[] => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", END];
    }
    if (currentPage >= END - 3) {
      return [START, "...", END - 4, END - 3, END - 2, END - 1, END];
    }
    return [
      START,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      END,
    ];
  };

  useEffect(() => {
    setRange(getPageRange());
  }, [totalPages, currentPage]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const page = target.dataset.page;
    if (page && page !== "...") {
      onPageChange(Number(page));
    }
  };

  const paginationHelperButtonsRequired = totalPages > 4;

  return (
    <div className="pagination" onClick={handleClick}>
      {paginationHelperButtonsRequired ? (
        <>
          <button data-page="1" disabled={currentPage === 1}>
            &lt;&lt;
          </button>
          <button
            data-page={(currentPage - 1).toString()}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
        </>
      ) : (
        <></>
      )}

      {isMobile ? (
        <span>
          Page {currentPage} of {totalPages}
        </span>
      ) : (
        range.map((page, index) => (
          <button
            key={index}
            data-page={typeof page === "number" ? page.toString() : undefined}
            disabled={page === "..."}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))
      )}
      {paginationHelperButtonsRequired ? (
        <>
          <button
            data-page={(currentPage + 1).toString()}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
          <button
            data-page={totalPages.toString()}
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
