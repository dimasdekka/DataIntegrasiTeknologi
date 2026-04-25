import { useMemo } from "react";
import type { PaginationMeta } from "@/types";

interface UsePaginationOptions {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  siblingCount?: number;
}

interface UsePaginationResult extends PaginationMeta {
  pageNumbers: (number | "...")[];
}

export function usePagination({
  totalItems,
  pageSize,
  currentPage,
  siblingCount = 1,
}: UsePaginationOptions): UsePaginationResult {
  return useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const safePage = Math.min(Math.max(1, currentPage), totalPages);
    const startIndex = (safePage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    const hasNext = safePage < totalPages;
    const hasPrev = safePage > 1;

    // Build page numbers with ellipsis
    const pageNumbers = buildPageNumbers(safePage, totalPages, siblingCount);

    return {
      currentPage: safePage,
      totalPages,
      totalItems,
      pageSize,
      hasNext,
      hasPrev,
      startIndex,
      endIndex,
      pageNumbers,
    };
  }, [totalItems, pageSize, currentPage, siblingCount]);
}

function buildPageNumbers(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => i + 1,
    );
    return [...leftRange, "...", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1,
    );
    return [1, "...", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i,
  );
  return [1, "...", ...middleRange, "...", totalPages];
}
