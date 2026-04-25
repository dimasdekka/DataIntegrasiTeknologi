/**
 * src/lib/utils.ts
 *
 * Role: Shared utility functions used across the application.
 * - cn(): Tailwind class merging via clsx + tailwind-merge
 * - formatDate(): Consistent Indonesian locale date formatting
 * - generateId(): UUID-like ID generation for mock data
 * - formatNIK(): Mask NIK for display (show last 4 digits)
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function formatNIK(nik: string): string {
  return nik.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}
