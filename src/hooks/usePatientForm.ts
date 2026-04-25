import { useActionState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { patientFormSchema, type PatientFormSchema } from "@/lib/schemas";
import { usePatientStore } from "@/store/usePatientStore";

export interface PatientFormState {
  data?: Partial<PatientFormSchema>;
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
}

export function usePatientForm() {
  const navigate = useNavigate();
  const addPatient = usePatientStore((s) => s.addPatient);

  const [state, formAction, isPending] = useActionState<PatientFormState, FormData>(
    async (_prevState, formData) => {
      // Ambil seluruh isi form menjadi object standar
      const data = Object.fromEntries(formData);
      
      // Validasi struktur data menggunakan Zod
      const parsed = patientFormSchema.safeParse(data);

      if (!parsed.success) {
        return {
          data: data as Partial<PatientFormSchema>,
          errors: parsed.error.flatten().fieldErrors,
          message: "Validasi gagal. Mohon periksa kembali form anda.",
        };
      }

      try {
        await addPatient(parsed.data);
        return { success: true, data: parsed.data };
      } catch (err) {
        return {
          data: data as Partial<PatientFormSchema>,
          message: err instanceof Error ? err.message : "Gagal menyimpan data pasien",
        };
      }
    },
    {}
  );

  // Pantau perubahan state untuk menampilkan notifikasi dan navigasi
  useEffect(() => {
    if (state.success && state.data) {
      toast.success("Pasien berhasil didaftarkan!", {
        description: `${state.data.namaPasien} telah ditambahkan ke daftar rawat inap.`,
      });
      navigate("/pasien/daftar");
    } else if (state.message && !state.errors) {
      toast.error("Gagal mendaftarkan pasien", {
        description: state.message,
      });
    }
  }, [state, navigate]);

  return { state, formAction, isPending };
}
