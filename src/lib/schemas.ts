import { z } from "zod";

export const patientFormSchema = z.object({
  namaPasien: z
    .string()
    .min(1, "Nama pasien wajib diisi")
    .min(3, "Nama pasien minimal 3 karakter"),

  nik: z
    .string()
    .min(1, "NIK wajib diisi")
    .regex(/^\d{16}$/, "NIK harus tepat 16 digit angka"),

  diagnosa: z
    .string()
    .min(1, "Diagnosa masuk wajib diisi")
    .min(10, "Diagnosa masuk minimal 10 karakter"),

  tanggalMasuk: z
    .string()
    .min(1, "Tanggal masuk wajib diisi")
    .refine((val) => {
      const selected = new Date(val + "T00:00:00");
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return selected <= today;
    }, "Tanggal masuk tidak boleh di masa depan"),

  dokterPenanggungJawab: z
    .string()
    .min(1, "Dokter penanggung jawab wajib dipilih"),

  ruangan: z.string().min(1, "Ruangan wajib dipilih"),
});

export type PatientFormSchema = z.infer<typeof patientFormSchema>;
