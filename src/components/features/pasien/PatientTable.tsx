/**
 * src/components/features/pasien/PatientTable.tsx
 *
 * Role: Patient list table with search, sort, pagination, error, and
 * empty/loading states. Composes DataTable + Pagination + search input.
 *
 * Design Decision: All complex state logic is delegated to usePatientListState.
 * This component is purely a rendering orchestrator — no business logic in JSX.
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RefreshCw, UserPlus } from 'lucide-react';
import { DataTable } from '@/components/ui/DataTable';
import { Pagination } from '@/components/ui/Pagination';
import { usePatientColumns } from '@/components/features/pasien/PatientColumns';
import { usePatientListState } from '@/hooks/usePatientListState';
import type { Patient } from '@/types';
import { cn } from '@/lib/utils';

interface PatientTableProps {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function PatientTable({ patients, isLoading, error, onRetry }: PatientTableProps) {
  const navigate = useNavigate();
  const columns = usePatientColumns();

  const {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    currentPage,
    setCurrentPage,
    paginatedPatients,
    filteredCount,
    pagination,
  } = usePatientListState(patients);

  const handleAddPatient = useCallback(() => {
    void navigate('/pasien/masuk');
  }, [navigate]);

  // ── Error State ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <div className="text-center">
          <p className="text-slate-700 font-medium">Terjadi kesalahan</p>
          <p className="mt-1 text-sm text-slate-500">{error}</p>
        </div>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <RefreshCw className="h-4 w-4" />
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-slate-100">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="patient-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau NIK..."
            aria-label="Cari pasien berdasarkan nama atau NIK"
            className={cn(
              'w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400',
              'focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all'
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          {!isLoading && (
            <span className="text-sm text-slate-500 whitespace-nowrap">
              {filteredCount} pasien
            </span>
          )}
          <button
            onClick={handleAddPatient}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 whitespace-nowrap"
          >
            <UserPlus className="h-4 w-4" />
            Tambah Pasien
          </button>
        </div>
      </div>

      {/* Table */}
      <DataTable<Patient>
        columns={columns}
        data={paginatedPatients}
        isLoading={isLoading}
        sortConfig={sortConfig}
        onSort={handleSort}
        getRowKey={(p) => p.id}
        skeletonRows={5}
        emptyTitle={
          searchQuery
            ? 'Pasien tidak ditemukan'
            : 'Belum ada pasien terdaftar'
        }
        emptyDescription={
          searchQuery
            ? `Tidak ada hasil untuk "${searchQuery}". Coba kata kunci lain.`
            : 'Daftarkan pasien baru untuk memulai pencatatan rawat inap.'
        }
        emptyAction={
          !searchQuery ? (
            <button
              onClick={handleAddPatient}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <UserPlus className="h-4 w-4" />
              Daftarkan Pasien Baru
            </button>
          ) : undefined
        }
      />

      {/* Pagination */}
      {!isLoading && paginatedPatients.length > 0 && (
        <Pagination meta={pagination} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}
