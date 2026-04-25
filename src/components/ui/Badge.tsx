/**
 * src/components/ui/Badge.tsx
 *
 * Role: Status/class chip component for room class display.
 * Uses CVA for variant-driven styling without manual className logic.
 *
 * Variants: kelas1, kelas2, kelas3, vip — each with distinct color semantics.
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { RoomClass } from '@/types';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        kelas1: 'bg-blue-100 text-blue-800',
        kelas2: 'bg-emerald-100 text-emerald-800',
        kelas3: 'bg-slate-100 text-slate-700',
        vip: 'bg-amber-100 text-amber-800',
        default: 'bg-slate-100 text-slate-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

function roomClassToVariant(roomClass: RoomClass): BadgeVariant {
  const map: Record<RoomClass, BadgeVariant> = {
    'Kelas 1': 'kelas1',
    'Kelas 2': 'kelas2',
    'Kelas 3': 'kelas3',
    VIP: 'vip',
  };
  return map[roomClass];
}

interface BadgeProps {
  label: string;
  roomClass?: RoomClass;
  className?: string;
}

export function Badge({ label, roomClass, className }: BadgeProps) {
  const variant = roomClass ? roomClassToVariant(roomClass) : 'default';
  return (
    <span className={cn(badgeVariants({ variant }), className)}>{label}</span>
  );
}
