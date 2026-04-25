/**
 * src/components/ui/DataTable.tsx
 *
 * Role: Generic, typed data table accepting a columns config + data array.
 * Supports sortable columns with keyboard accessibility (role="button",
 * tabIndex={0}, onKeyDown Enter/Space).
 *
 * Design Decision: Generic over T extends object so it can render any
 * entity type with type-safe column key access.
 */

import { memo, useCallback, type KeyboardEvent } from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SkeletonRow } from '@/components/ui/SkeletonRow';
import { EmptyState } from '@/components/ui/EmptyState';
import type { SortConfig } from '@/types';

export interface TableColumn<T extends object> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  className?: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends object> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  sortConfig?: SortConfig;
  onSort?: (key: keyof T) => void;
  getRowKey: (row: T) => string;
  skeletonRows?: number;
}

function SortIcon({ column, sortConfig }: { column: string; sortConfig?: SortConfig }) {
  if (!sortConfig || sortConfig.key !== column) {
    return <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />;
  }
  if (sortConfig.direction === 'asc') {
    return <ArrowUp className="h-3.5 w-3.5 text-blue-600" />;
  }
  return <ArrowDown className="h-3.5 w-3.5 text-blue-600" />;
}

function DataTableInner<T extends object>({
  columns,
  data,
  isLoading = false,
  emptyTitle = 'Tidak ada data',
  emptyDescription = 'Belum ada data yang tersedia.',
  emptyAction,
  sortConfig,
  onSort,
  getRowKey,
  skeletonRows = 5,
}: DataTableProps<T>) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTableCellElement>, key: keyof T) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSort?.(key);
      }
    },
    [onSort]
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full caption-bottom text-sm" role="table">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {columns.map((col) => {
              const isSortable = col.sortable && onSort;
              const isActive = sortConfig?.key === col.key;

              return (
                <th
                  key={String(col.key)}
                  scope="col"
                  onClick={isSortable ? () => onSort(col.key as keyof T) : undefined}
                  onKeyDown={
                    isSortable
                      ? (e) => handleKeyDown(e, col.key as keyof T)
                      : undefined
                  }
                  role={isSortable ? 'button' : undefined}
                  tabIndex={isSortable ? 0 : undefined}
                  aria-sort={
                    isActive && sortConfig?.direction === 'asc'
                      ? 'ascending'
                      : isActive && sortConfig?.direction === 'desc'
                        ? 'descending'
                        : undefined
                  }
                  className={cn(
                    'px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap',
                    isSortable &&
                      'cursor-pointer select-none hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500',
                    isActive && 'text-blue-700',
                    col.className
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {col.header}
                    {isSortable && (
                      <SortIcon column={String(col.key)} sortConfig={sortConfig} />
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: skeletonRows }, (_, i) => (
              <SkeletonRow key={i} columns={columns.length} />
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <EmptyState
                  title={emptyTitle}
                  description={emptyDescription}
                  action={emptyAction}
                />
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={getRowKey(row)}
                className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={cn('px-4 py-3 text-slate-700', col.className)}
                  >
                    {col.render
                      ? col.render(row)
                      : String(row[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Cast to maintain generic type through memo
export const DataTable = memo(DataTableInner) as typeof DataTableInner;
