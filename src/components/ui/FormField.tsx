/**
 * src/components/ui/FormField.tsx
 *
 * Role: Reusable form field wrapper: label + input/select + inline error.
 * Ensures consistent spacing, accessible htmlFor/id pairing, and error display.
 *
 * Design Decision: Accepts children for maximum flexibility (works with
 * <input>, <select>, <textarea> etc.) while providing consistent structure.
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
  hint?: string;
}

export function FormField({
  id,
  label,
  error,
  required = false,
  className,
  children,
  hint,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700 select-none"
      >
        {label}
        {required && (
          <span className="ml-1 text-rose-500" aria-label="wajib diisi">
            *
          </span>
        )}
      </label>

      {children}

      {hint && !error && (
        <p className="text-xs text-slate-400">{hint}</p>
      )}

      {error && (
        <p
          role="alert"
          id={`${id}-error`}
          className="flex items-center gap-1 text-xs text-rose-600"
        >
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
