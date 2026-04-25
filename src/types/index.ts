/**
 * src/types/index.ts
 *
 * Role: Central domain type definitions for the Inpatient Module.
 * All interfaces are derived from Zod schemas in lib/schemas.ts using
 * z.infer<> to ensure types stay in sync with validation rules.
 *
 * Design Decision: Using discriminated unions for SortDirection and
 * separating PatientFormValues from Patient (Patient includes server-
 * generated fields like id and createdAt).
 */

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

export type RoomClass = 'Kelas 1' | 'Kelas 2' | 'Kelas 3' | 'VIP';

export interface Room {
  id: string;
  name: string;
  class: RoomClass;
  floor: number;
}

export interface Patient {
  id: string;
  namaPasien: string;
  nik: string;
  diagnosa: string;
  tanggalMasuk: string; // ISO date string YYYY-MM-DD
  dokterPenanggungJawab: string; // Doctor id
  dokterNama: string; // Denormalized for display
  ruangan: string; // Room id
  ruanganNama: string; // Denormalized for display
  ruanganKelas: RoomClass;
  createdAt: string; // ISO timestamp
}

export interface PatientFormValues {
  namaPasien: string;
  nik: string;
  diagnosa: string;
  tanggalMasuk: string;
  dokterPenanggungJawab: string;
  ruangan: string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: keyof Patient | null;
  direction: SortDirection;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
  startIndex: number;
  endIndex: number;
}

export interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}
