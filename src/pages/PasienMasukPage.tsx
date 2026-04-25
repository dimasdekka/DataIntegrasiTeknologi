/**
 * src/pages/PasienMasukPage.tsx
 *
 * Role: Admission Form page — /pasien/masuk.
 * Wraps PatientForm in a styled card with page-level title/description.
 * Uses PageTransition for route animation.
 */

import { PageTransition } from '@/components/ui/PageTransition';
import { PatientForm } from '@/components/features/pasien/PatientForm';
import { UserPlus } from 'lucide-react';

export function PasienMasukPage() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
              <UserPlus className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Pendaftaran Pasien Baru</h1>
              <p className="text-sm text-slate-500">
                Lengkapi formulir di bawah untuk mendaftarkan pasien rawat inap
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Data Pasien
            </h2>
            <p className="mt-0.5 text-xs text-slate-400">
              Semua kolom bertanda <span className="text-rose-500 font-medium">*</span> wajib diisi
            </p>
          </div>

          {/* Form Body */}
          <div className="p-6">
            <PatientForm />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
