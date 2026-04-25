/**
 * src/components/ui/SkeletonRow.tsx
 *
 * Role: Single shimmer row for the table loading skeleton.
 * Renders 7 shimmer cells matching the patient table's column count.
 * Wrapped in React.memo to prevent unnecessary re-renders.
 */

import { memo } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonRowProps {
  columns?: number;
}

const SkeletonCell = memo(({ width }: { width: string }) => (
  <td className="px-4 py-3">
    <div className={cn('h-4 rounded shimmer', width)} />
  </td>
));
SkeletonCell.displayName = 'SkeletonCell';

const CELL_WIDTHS = ['w-32', 'w-36', 'w-40', 'w-24', 'w-36', 'w-24', 'w-16'];

export const SkeletonRow = memo(({ columns = 7 }: SkeletonRowProps) => {
  const widths = CELL_WIDTHS.slice(0, columns);
  return (
    <tr className="border-b border-slate-100">
      {widths.map((w, i) => (
        <SkeletonCell key={i} width={w} />
      ))}
    </tr>
  );
});
SkeletonRow.displayName = 'SkeletonRow';
