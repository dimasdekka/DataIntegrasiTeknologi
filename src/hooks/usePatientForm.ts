import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { patientFormSchema, type PatientFormSchema } from "@/lib/schemas";
import { usePatientStore } from "@/store/usePatientStore";

interface UsePatientFormResult {
  form: ReturnType<typeof useForm<PatientFormSchema>>;
  onSubmit: (data: PatientFormSchema) => Promise<void>;
  isSubmitting: boolean;
}

export function usePatientForm(): UsePatientFormResult {
  const navigate = useNavigate();
  const addPatient = usePatientStore((s) => s.addPatient);

  const form = useForm<PatientFormSchema>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      namaPasien: "",
      nik: "",
      diagnosa: "",
      tanggalMasuk: "",
      dokterPenanggungJawab: "",
      ruangan: "",
    },
    mode: "onBlur",
  });

  const onSubmit = useCallback(
    async (data: PatientFormSchema) => {
      try {
        await addPatient(data);
        toast.success("Pasien berhasil didaftarkan!", {
          description: `${data.namaPasien} telah ditambahkan ke daftar rawat inap.`,
        });
        void navigate("/pasien/daftar");
      } catch {
        toast.error("Gagal mendaftarkan pasien", {
          description: "Terjadi kesalahan. Silakan coba lagi.",
        });
      }
    },
    [addPatient, navigate],
  );

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  };
}
