/**
 * src/components/features/pasien/PatientForm.tsx
 *
 * Role: Admission form rendering component.
 * Pure rendering concern — all logic lives in usePatientForm hook.
 *
 * Design Decision: Uses native <input> and <select> styled with Tailwind
 * for full control. FormField wrapper handles label/error/hint association.
 * NIK input uses inputMode="numeric" + pattern for mobile keyboard hints.
 */

import { Loader2, UserPlus } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { FormField } from '@/components/ui/FormField';
import { usePatientForm } from '@/hooks/usePatientForm';
import { DOCTORS } from '@/constants/doctors';
import { ROOMS } from '@/constants/rooms';
import { cn, getTodayString } from '@/lib/utils';

const inputClass = (hasError: boolean) =>
  cn(
    'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400',
    'focus:outline-none focus:ring-2 transition-all',
    hasError
      ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-500/20'
      : 'border-slate-200 focus:border-blue-400 focus:ring-blue-500/20'
  );

export function PatientForm() {
  const { form, onSubmit, isSubmitting } = usePatientForm();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          error={errors.namaPasien?.message}
        >
          <input
            id="namaPasien"
            type="text"
            placeholder="Contoh: Budi Santoso"
            autoComplete="name"
            aria-describedby={errors.namaPasien ? 'namaPasien-error' : undefined}
            {...register('namaPasien')}
            className={inputClass(!!errors.namaPasien)}
          />
        </FormField>

        <FormField
          id="nik"
          label="NIK"
          required
          error={errors.nik?.message}
          hint="Nomor Induk Kependudukan — 16 digit"
        >
          <input
            id="nik"
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={16}
            placeholder="3201012505850001"
            autoComplete="off"
            aria-describedby={errors.nik ? 'nik-error' : 'nik-hint'}
            {...register('nik')}
            className={cn(inputClass(!!errors.nik), 'font-mono tracking-wider')}
          />
        </FormField>
      </div>

      {/* Row 2: Diagnosa */}
      <FormField
        id="diagnosa"
        label="Diagnosa Masuk"
        required
        error={errors.diagnosa?.message}
        hint="Minimal 10 karakter"
      >
        <textarea
          id="diagnosa"
          rows={3}
          placeholder="Deskripsikan diagnosa utama pasien saat masuk..."
          aria-describedby={errors.diagnosa ? 'diagnosa-error' : 'diagnosa-hint'}
          {...register('diagnosa')}
          className={cn(inputClass(!!errors.diagnosa), 'resize-none leading-relaxed')}
        />
      </FormField>

      {/* Row 3: Tanggal + Dokter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          id="tanggalMasuk"
          label="Tanggal Masuk"
          required
          error={errors.tanggalMasuk?.message}
        >
          <input
            id="tanggalMasuk"
            type="date"
            max={getTodayString()}
            aria-describedby={errors.tanggalMasuk ? 'tanggalMasuk-error' : undefined}
            {...register('tanggalMasuk')}
            className={inputClass(!!errors.tanggalMasuk)}
          />
        </FormField>

        <FormField
          id="dokterPenanggungJawab"
          label="Dokter Penanggung Jawab"
          required
          error={errors.dokterPenanggungJawab?.message}
        >
          <Controller
            name="dokterPenanggungJawab"
            control={control}
            render={({ field }) => (
              <select
                id="dokterPenanggungJawab"
                {...field}
                aria-describedby={
                  errors.dokterPenanggungJawab
                    ? 'dokterPenanggungJawab-error'
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
            )}
          />
        </FormField>
      </div>

      {/* Row 4: Ruangan */}
      <FormField
        id="ruangan"
        label="Ruangan"
        required
        error={errors.ruangan?.message}
      >
        <Controller
          name="ruangan"
          control={control}
          render={({ field }) => (
            <select
              id="ruangan"
              {...field}
              aria-describedby={errors.ruangan ? 'ruangan-error' : undefined}
              className={inputClass(!!errors.ruangan)}
            >
              <option value="">-- Pilih Ruangan --</option>
              {ROOMS.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} — {room.class} (Lantai {room.floor})
                </option>
              ))}
            </select>
          )}
        />
      </FormField>

      {/* Submit */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className={cn(
            'inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
            isSubmitting
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md'
          )}
        >
          {isSubmitting ? (
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
