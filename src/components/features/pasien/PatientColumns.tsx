/**
 * src/components/features/pasien/PatientColumns.tsx
 *
 * Role: Column definitions for the Patient DataTable.
 * Extracted to keep PatientTable focused on layout concerns only.
 *
 * Design Decision: usePatientColumns returns columns as a memoized array
 * (via useMemo) so reference equality is maintained between renders,
 * preventing unnecessary DataTable re-renders.
 */

import { memo, useState, useCallback, useMemo } from 'react';
import { Eye } from 'lucide-react';
import type { Patient } from '@/types';
import type { TableColumn } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { PatientDetailModal } from '@/components/features/pasien/PatientDetailModal';
import { formatDate } from '@/lib/utils';

// ─── Action Cell ──────────────────────────────────────────────────────────────

interface ActionCellProps {
  patient: Patient;
}

const ActionCell = memo(({ patient }: ActionCellProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button
        onClick={handleOpen}
        aria-label={`Lihat detail ${patient.namaPasien}`}
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
        Detail
      </button>

      <PatientDetailModal
        patient={patient}
        open={isOpen}
        onClose={handleClose}
      />
    </>
  );
});
ActionCell.displayName = 'ActionCell';

// ─── Columns Hook ─────────────────────────────────────────────────────────────

export function usePatientColumns(): TableColumn<Patient>[] {
  return useMemo<TableColumn<Patient>[]>(
    () => [
      {
        key: 'namaPasien',
        header: 'Nama Pasien',
        sortable: true,
        className: 'min-w-[140px] font-medium text-slate-900',
        render: (row) => <span className="font-medium">{row.namaPasien}</span>,
      },
      {
        key: 'nik',
        header: 'NIK',
        className: 'min-w-[140px] font-mono text-xs',
        render: (row) => (
          <span className="font-mono text-xs tracking-wider text-slate-600">
            {row.nik}
          </span>
        ),
      },
      {
        key: 'diagnosa',
        header: 'Diagnosa',
        className: 'min-w-[200px] max-w-[280px]',
        render: (row) => (
          <span
            className="block truncate max-w-[260px] text-slate-600"
            title={row.diagnosa}
          >
            {row.diagnosa}
          </span>
        ),
      },
      {
        key: 'tanggalMasuk',
        header: 'Tgl. Masuk',
        sortable: true,
        className: 'min-w-[120px] whitespace-nowrap',
        render: (row) => (
          <span className="text-slate-600 whitespace-nowrap">
            {formatDate(row.tanggalMasuk)}
          </span>
        ),
      },
      {
        key: 'dokterNama',
        header: 'Dokter',
        className: 'min-w-[160px]',
        render: (row) => (
          <span className="text-slate-600">{row.dokterNama}</span>
        ),
      },
      {
        key: 'ruanganNama',
        header: 'Ruangan',
        className: 'min-w-[120px]',
        render: (row) => (
          <div className="flex flex-col gap-1">
            <span className="text-slate-700 text-xs">{row.ruanganNama}</span>
            <Badge label={row.ruanganKelas} roomClass={row.ruanganKelas} />
          </div>
        ),
      },
      {
        key: 'id',
        header: 'Aksi',
        className: 'min-w-[80px]',
        render: (row) => <ActionCell patient={row} />,
      },
    ],
    []
  );
}
