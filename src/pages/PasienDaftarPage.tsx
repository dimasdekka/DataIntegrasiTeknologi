import { useEffect, useCallback } from "react";
import { ClipboardList } from "lucide-react";
import { PageTransition } from "@/components/ui/PageTransition";
import { PatientTable } from "@/components/features/pasien/PatientTable";
import { usePatientStore } from "@/store/usePatientStore";

export function PasienDaftarPage() {
  const patients = usePatientStore((s) => s.patients);
  const isLoading = usePatientStore((s) => s.isLoading);
  const error = usePatientStore((s) => s.error);
  const fetchPatients = usePatientStore((s) => s.fetchPatients);

  useEffect(() => {
    if (patients.length === 0 && !isLoading) {
      void fetchPatients();
    }
  }, [fetchPatients, patients.length, isLoading]);

  const handleRetry = useCallback(() => {
    void fetchPatients();
  }, [fetchPatients]);

  return (
    <PageTransition>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
            <ClipboardList className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Daftar Pasien Aktif
            </h1>
            <p className="text-sm text-slate-500">
              Kelola dan pantau pasien rawat inap yang sedang aktif
            </p>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <PatientTable
          patients={patients}
          isLoading={isLoading}
          error={error}
          onRetry={handleRetry}
        />
      </div>
    </PageTransition>
  );
}
