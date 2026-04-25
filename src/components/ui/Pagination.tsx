/**
 * src/components/ui/Pagination.tsx
 *
 * Role: Controlled, stateless pagination UI component.
 * Accepts page metadata and an onPageChange callback.
 * Renders: First / Prev / [page numbers with ellipsis] / Next / Last.
 *
 * Accessibility: All buttons have aria-labels and disabled states.
 */

import { memo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PaginationMeta } from '@/types';

interface PaginationProps {
  meta: PaginationMeta & { pageNumbers: (number | '...')[] };
  onPageChange: (page: number) => void;
}

export const Pagination = memo(({ meta, onPageChange }: PaginationProps) => {
  const { currentPage, totalPages, hasNext, hasPrev, pageNumbers, totalItems, startIndex, endIndex } = meta;

  const handleFirst = useCallback(() => onPageChange(1), [onPageChange]);
  const handlePrev = useCallback(() => onPageChange(currentPage - 1), [onPageChange, currentPage]);
  const handleNext = useCallback(() => onPageChange(currentPage + 1), [onPageChange, currentPage]);
  const handleLast = useCallback(() => onPageChange(totalPages), [onPageChange, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-slate-100">
      <p className="text-sm text-slate-500">
        Menampilkan{' '}
        <span className="font-medium text-slate-700">
          {totalItems === 0 ? 0 : startIndex + 1}–{Math.min(endIndex + 1, totalItems)}
        </span>{' '}
        dari <span className="font-medium text-slate-700">{totalItems}</span> pasien
      </p>

      <div className="flex items-center gap-1" role="navigation" aria-label="Navigasi halaman">
        <NavButton onClick={handleFirst} disabled={!hasPrev} aria-label="Halaman pertama">
          <ChevronsLeft className="h-4 w-4" />
        </NavButton>
        <NavButton onClick={handlePrev} disabled={!hasPrev} aria-label="Halaman sebelumnya">
          <ChevronLeft className="h-4 w-4" />
        </NavButton>

        {pageNumbers.map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-slate-400 select-none">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-label={`Halaman ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              className={cn(
                'h-8 w-8 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                page === currentPage
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              {page}
            </button>
          )
        )}

        <NavButton onClick={handleNext} disabled={!hasNext} aria-label="Halaman berikutnya">
          <ChevronRight className="h-4 w-4" />
        </NavButton>
        <NavButton onClick={handleLast} disabled={!hasNext} aria-label="Halaman terakhir">
          <ChevronsRight className="h-4 w-4" />
        </NavButton>
      </div>
    </div>
  );
});
Pagination.displayName = 'Pagination';

interface NavButtonProps {
  onClick: () => void;
  disabled: boolean;
  'aria-label': string;
  children: React.ReactNode;
}

function NavButton({ onClick, disabled, children, ...props }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={props['aria-label']}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        disabled
          ? 'cursor-not-allowed text-slate-300'
          : 'text-slate-600 hover:bg-slate-100'
      )}
    >
      {children}
    </button>
  );
}
