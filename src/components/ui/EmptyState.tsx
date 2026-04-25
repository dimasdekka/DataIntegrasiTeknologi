/**
 * src/components/ui/EmptyState.tsx
 *
 * Role: Illustrated empty state for when the patient list is empty.
 * Accepts title, description, and an optional action slot for CTA buttons.
 */

import type { ReactNode } from 'react';
import { ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-16 px-6 text-center',
        className
      )}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <ClipboardList className="h-10 w-10 text-slate-400" aria-hidden="true" />
      </div>
      <div className="max-w-xs">
        <h3 className="text-base font-semibold text-slate-700">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
