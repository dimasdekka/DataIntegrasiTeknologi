/**
 * src/components/features/pasien/PatientDetailModal.tsx
 *
 * Role: Radix UI Dialog showing full patient details in read-only mode.
 * Uses shadcn/ui Dialog primitives (direct Radix usage) for focus trapping
 * and Escape-to-close behavior.
 *
 * Design Decision: Receives a Patient | null — when null, the dialog is
 * not rendered (controlled by parent via open + onClose props).
 */

import * as Dialog from '@radix-ui/react-dialog';
import { X, User, CreditCard, Stethoscope, Calendar, UserCheck, BedDouble } from 'lucide-react';
import type { Patient } from '@/types';
import { formatDate, formatNIK } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface PatientDetailModalProps {
  patient: Patient | null;
  open: boolean;
  onClose: () => void;
}

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <div className="flex gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
        <div className="mt-0.5 text-sm font-medium text-slate-800 break-words">{value}</div>
      </div>
    </div>
  );
}

export function PatientDetailModal({ patient, open, onClose }: PatientDetailModalProps) {
  if (!patient) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-slate-100">
            <div>
              <Dialog.Title className="text-lg font-bold text-slate-900">
                Detail Pasien
              </Dialog.Title>
              <Dialog.Description className="mt-0.5 text-sm text-slate-500">
                Informasi lengkap pasien rawat inap
              </Dialog.Description>
            </div>
            <Dialog.Close
              onClick={onClose}
              aria-label="Tutup dialog"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto scrollbar-thin">
            {/* Patient ID chip */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">
                ID: {patient.id.slice(0, 8).toUpperCase()}
              </span>
              <Badge label={patient.ruanganKelas} roomClass={patient.ruanganKelas} />
            </div>

            <div className="divide-y divide-slate-100">
              <DetailRow
                icon={<User className="h-4 w-4" />}
                label="Nama Pasien"
                value={patient.namaPasien}
              />
              <DetailRow
                icon={<CreditCard className="h-4 w-4" />}
                label="NIK"
                value={
                  <span className="font-mono tracking-wider">
                    {formatNIK(patient.nik)}
                  </span>
                }
              />
              <DetailRow
                icon={<Stethoscope className="h-4 w-4" />}
                label="Diagnosa Masuk"
                value={patient.diagnosa}
              />
              <DetailRow
                icon={<Calendar className="h-4 w-4" />}
                label="Tanggal Masuk"
                value={formatDate(patient.tanggalMasuk)}
              />
              <DetailRow
                icon={<UserCheck className="h-4 w-4" />}
                label="Dokter Penanggung Jawab"
                value={patient.dokterNama}
              />
              <DetailRow
                icon={<BedDouble className="h-4 w-4" />}
                label="Ruangan"
                value={
                  <span>
                    {patient.ruanganNama}{' '}
                    <span className="text-slate-400">·</span>{' '}
                    {patient.ruanganKelas}
                  </span>
                }
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t border-slate-100">
            <Dialog.Close
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            >
              Tutup
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
