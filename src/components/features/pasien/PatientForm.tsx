import { Loader2, UserPlus } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { usePatientForm } from "@/hooks/usePatientForm";
import { DOCTORS } from "@/constants/doctors";
import { ROOMS } from "@/constants/rooms";
import { cn, getTodayString } from "@/lib/utils";

const inputClass = (hasError: boolean) =>
  cn(
    "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400",
    "focus:outline-none focus:ring-2 transition-all",
    hasError
      ? "border-rose-400 focus:border-rose-400 focus:ring-rose-500/20"
      : "border-slate-200 focus:border-blue-400 focus:ring-blue-500/20",
  );

export function PatientForm() {
  const { state, formAction, isPending } = usePatientForm();
  const errors = state.errors || {};

  return (
    <form
      action={formAction}
      noValidate
      aria-label="Formulir pendaftaran pasien rawat inap"
      className="flex flex-col gap-6"
    >
      {/* Row 1: Nama + NIK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          id="namaPasien"
          label="Nama Pasien"
          required
          error={errors.namaPasien?.[0]}
        >
          <input
            id="namaPasien"
            name="namaPasien"
            type="text"
            placeholder="Contoh: Budi Santoso"
            autoComplete="name"
            defaultValue={state.data?.namaPasien}
            aria-describedby={
              errors.namaPasien ? "namaPasien-error" : undefined
            }
            className={inputClass(!!errors.namaPasien)}
          />
        </FormField>

        <FormField
          id="nik"
          label="NIK"
          required
          error={errors.nik?.[0]}
          hint="Nomor Induk Kependudukan — 16 digit"
        >
          <input
            id="nik"
            name="nik"
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={16}
            placeholder="3201012505850001"
            autoComplete="off"
            defaultValue={state.data?.nik}
            aria-describedby={errors.nik ? "nik-error" : "nik-hint"}
            className={cn(inputClass(!!errors.nik), "font-mono tracking-wider")}
          />
        </FormField>
      </div>

      {/* Row 2: Diagnosa */}
      <FormField
        id="diagnosa"
        label="Diagnosa Masuk"
        required
        error={errors.diagnosa?.[0]}
        hint="Minimal 10 karakter"
      >
        <textarea
          id="diagnosa"
          name="diagnosa"
          rows={3}
          placeholder="Deskripsikan diagnosa utama pasien saat masuk..."
          defaultValue={state.data?.diagnosa}
          aria-describedby={
            errors.diagnosa ? "diagnosa-error" : "diagnosa-hint"
          }
          className={cn(
            inputClass(!!errors.diagnosa),
            "resize-none leading-relaxed",
          )}
        />
      </FormField>

      {/* Row 3: Tanggal + Dokter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          id="tanggalMasuk"
          label="Tanggal Masuk"
          required
          error={errors.tanggalMasuk?.[0]}
        >
          <input
            id="tanggalMasuk"
            name="tanggalMasuk"
            type="date"
            max={getTodayString()}
            defaultValue={state.data?.tanggalMasuk}
            aria-describedby={
              errors.tanggalMasuk ? "tanggalMasuk-error" : undefined
            }
            className={inputClass(!!errors.tanggalMasuk)}
          />
        </FormField>

        <FormField
          id="dokterPenanggungJawab"
          label="Dokter Penanggung Jawab"
          required
          error={errors.dokterPenanggungJawab?.[0]}
        >
          <select
            id="dokterPenanggungJawab"
            name="dokterPenanggungJawab"
            defaultValue={state.data?.dokterPenanggungJawab || ""}
            aria-describedby={
              errors.dokterPenanggungJawab
                ? "dokterPenanggungJawab-error"
                : undefined
            }
            className={inputClass(!!errors.dokterPenanggungJawab)}
          >
            <option value="">-- Pilih Dokter --</option>
            {DOCTORS.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} — {doc.specialty}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Row 4: Ruangan */}
      <FormField
        id="ruangan"
        label="Ruangan"
        required
        error={errors.ruangan?.[0]}
      >
        <select
          id="ruangan"
          name="ruangan"
          defaultValue={state.data?.ruangan || ""}
          aria-describedby={errors.ruangan ? "ruangan-error" : undefined}
          className={inputClass(!!errors.ruangan)}
        >
          <option value="">-- Pilih Ruangan --</option>
          {ROOMS.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name} — {room.class} (Lantai {room.floor})
            </option>
          ))}
        </select>
      </FormField>

      {/* Submit */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          aria-disabled={isPending}
          className={cn(
            "inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            isPending
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md",
          )}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Menyimpan...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              Daftarkan Pasien
            </>
          )}
        </button>
      </div>
    </form>
  );
}
