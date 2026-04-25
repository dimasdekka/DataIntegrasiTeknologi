import { create } from "zustand";
import type { Patient, PatientFormValues } from "@/types";
import { MOCK_PATIENTS } from "@/lib/mockData";
import { DOCTORS } from "@/constants/doctors";
import { ROOMS } from "@/constants/rooms";
import { generateId } from "@/lib/utils";

interface PatientStore {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;

  fetchPatients: () => Promise<void>;
  addPatient: (data: PatientFormValues) => Promise<void>;
  setLoading: (v: boolean) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],
  isLoading: false,
  error: null,

  setLoading: (v: boolean) => set({ isLoading: v }),

  fetchPatients: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate network latency
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
      set({ patients: MOCK_PATIENTS, isLoading: false });
    } catch {
      set({
        isLoading: false,
        error: "Gagal memuat data pasien. Silakan coba lagi.",
      });
    }
  },

  addPatient: async (data: PatientFormValues) => {
    set({ isLoading: true });
    try {
      // Simulate 700ms async save
      await new Promise<void>((resolve) => setTimeout(resolve, 700));

      const doctor = DOCTORS.find((d) => d.id === data.dokterPenanggungJawab);
      const room = ROOMS.find((r) => r.id === data.ruangan);

      if (!doctor || !room) {
        throw new Error("Dokter atau ruangan tidak ditemukan");
      }

      const newPatient: Patient = {
        id: generateId(),
        namaPasien: data.namaPasien,
        nik: data.nik,
        diagnosa: data.diagnosa,
        tanggalMasuk: data.tanggalMasuk,
        dokterPenanggungJawab: data.dokterPenanggungJawab,
        dokterNama: doctor.name,
        ruangan: data.ruangan,
        ruanganNama: room.name,
        ruanganKelas: room.class,
        createdAt: new Date().toISOString(),
      };

      set((state) => ({
        patients: [newPatient, ...state.patients],
        isLoading: false,
      }));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Gagal menyimpan data pasien";
      set({ isLoading: false, error: message });
      throw err;
    }
  },
}));
