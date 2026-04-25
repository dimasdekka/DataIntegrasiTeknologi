import type { Patient, RoomClass } from "@/types";
import { generateId } from "@/lib/utils";

interface RawPatient {
  namaPasien: string;
  nik: string;
  diagnosa: string;
  tanggalMasuk: string;
  dokterPenanggungJawab: string;
  dokterNama: string;
  ruangan: string;
  ruanganNama: string;
  ruanganKelas: RoomClass;
}

const rawPatients: RawPatient[] = [
  {
    namaPasien: "Budi Prasetyo",
    nik: "3201012505850001",
    diagnosa: "Diabetes Mellitus Tipe 2 dengan komplikasi neuropati perifer",
    tanggalMasuk: "2026-04-01",
    dokterPenanggungJawab: "dr-001",
    dokterNama: "Dr. Ahmad Fauzi, Sp.PD",
    ruangan: "rm-201",
    ruanganNama: "Ruang Melati 201",
    ruanganKelas: "Kelas 2",
  },
  {
    namaPasien: "Siti Aminah",
    nik: "3201014506900002",
    diagnosa: "Hipertensi Grade II dengan riwayat gagal jantung kongestif",
    tanggalMasuk: "2026-04-03",
    dokterPenanggungJawab: "dr-003",
    dokterNama: "Dr. Budi Santoso, Sp.JP",
    ruangan: "rm-101",
    ruanganNama: "Ruang Cempaka 101",
    ruanganKelas: "Kelas 1",
  },
  {
    namaPasien: "Ahmad Hidayat",
    nik: "3201011203750003",
    diagnosa: "Appendisitis akut perforasi memerlukan tindakan operatif segera",
    tanggalMasuk: "2026-04-05",
    dokterPenanggungJawab: "dr-002",
    dokterNama: "Dr. Siti Rahayu, Sp.B",
    ruangan: "rm-302",
    ruanganNama: "Ruang Mawar 302",
    ruanganKelas: "Kelas 3",
  },
  {
    namaPasien: "Dewi Lestari",
    nik: "3201012208920004",
    diagnosa: "Preeklampsia berat usia kehamilan 36 minggu G2P1A0",
    tanggalMasuk: "2026-04-07",
    dokterPenanggungJawab: "dr-004",
    dokterNama: "Dr. Dewi Kurniawati, Sp.OG",
    ruangan: "rm-102",
    ruanganNama: "Ruang Cempaka 102",
    ruanganKelas: "Kelas 1",
  },
  {
    namaPasien: "Rizky Maulana",
    nik: "3201011505950005",
    diagnosa: "Stroke iskemik akut dengan hemiparesis dextra onset 6 jam",
    tanggalMasuk: "2026-04-09",
    dokterPenanggungJawab: "dr-005",
    dokterNama: "Dr. Rizki Firmansyah, Sp.N",
    ruangan: "rm-vip-1",
    ruanganNama: "Suite Anggrek VIP-1",
    ruanganKelas: "VIP",
  },
  {
    namaPasien: "Rina Wulandari",
    nik: "3201013107880006",
    diagnosa:
      "Pneumonia komunitas dengan saturasi oksigen 88% memerlukan rawat inap",
    tanggalMasuk: "2026-04-10",
    dokterPenanggungJawab: "dr-001",
    dokterNama: "Dr. Ahmad Fauzi, Sp.PD",
    ruangan: "rm-202",
    ruanganNama: "Ruang Melati 202",
    ruanganKelas: "Kelas 2",
  },
  {
    namaPasien: "Hendra Setiawan",
    nik: "3201011902800007",
    diagnosa:
      "Kolelitiasis dengan kolesistitis akut memerlukan kolesistektomi laparoskopi",
    tanggalMasuk: "2026-04-12",
    dokterPenanggungJawab: "dr-002",
    dokterNama: "Dr. Siti Rahayu, Sp.B",
    ruangan: "rm-301",
    ruanganNama: "Ruang Mawar 301",
    ruanganKelas: "Kelas 3",
  },
  {
    namaPasien: "Yuli Rahayu",
    nik: "3201012809970008",
    diagnosa: "Demam berdarah dengue derajat II dengan trombositopenia berat",
    tanggalMasuk: "2026-04-14",
    dokterPenanggungJawab: "dr-001",
    dokterNama: "Dr. Ahmad Fauzi, Sp.PD",
    ruangan: "rm-303",
    ruanganNama: "Ruang Mawar 303",
    ruanganKelas: "Kelas 3",
  },
  {
    namaPasien: "Agus Salim",
    nik: "3201010604720009",
    diagnosa:
      "Infark miokard akut STEMI anterior onset 2 jam memerlukan PCI primer",
    tanggalMasuk: "2026-04-15",
    dokterPenanggungJawab: "dr-003",
    dokterNama: "Dr. Budi Santoso, Sp.JP",
    ruangan: "rm-vip-2",
    ruanganNama: "Suite Anggrek VIP-2",
    ruanganKelas: "VIP",
  },
  {
    namaPasien: "Nur Fadilah",
    nik: "3201012311990010",
    diagnosa:
      "Abortus imminens usia kehamilan 10 minggu G1P0A0 dengan perdarahan",
    tanggalMasuk: "2026-04-17",
    dokterPenanggungJawab: "dr-004",
    dokterNama: "Dr. Dewi Kurniawati, Sp.OG",
    ruangan: "rm-201",
    ruanganNama: "Ruang Melati 201",
    ruanganKelas: "Kelas 2",
  },
  {
    namaPasien: "Eko Prasetya",
    nik: "3201011707830011",
    diagnosa:
      "Epilepsi partial kompleks refrakter dengan frekuensi kejang meningkat",
    tanggalMasuk: "2026-04-18",
    dokterPenanggungJawab: "dr-005",
    dokterNama: "Dr. Rizki Firmansyah, Sp.N",
    ruangan: "rm-202",
    ruanganNama: "Ruang Melati 202",
    ruanganKelas: "Kelas 2",
  },
  {
    namaPasien: "Wati Ningsih",
    nik: "3201015209910012",
    diagnosa: "Typhoid fever dengan komplikasi intestinal perforasi ringan",
    tanggalMasuk: "2026-04-20",
    dokterPenanggungJawab: "dr-001",
    dokterNama: "Dr. Ahmad Fauzi, Sp.PD",
    ruangan: "rm-302",
    ruanganNama: "Ruang Mawar 302",
    ruanganKelas: "Kelas 3",
  },
  {
    namaPasien: "Muhamad Iqbal",
    nik: "3201011401020013",
    diagnosa:
      "Hernia inguinalis lateralis dextra inkarserata memerlukan operasi emergensi",
    tanggalMasuk: "2026-04-21",
    dokterPenanggungJawab: "dr-002",
    dokterNama: "Dr. Siti Rahayu, Sp.B",
    ruangan: "rm-303",
    ruanganNama: "Ruang Mawar 303",
    ruanganKelas: "Kelas 3",
  },
  {
    namaPasien: "Kartini Susanti",
    nik: "3201016508780014",
    diagnosa: "Gagal ginjal kronik stadium IV dengan hiperkalemia simtomatik",
    tanggalMasuk: "2026-04-22",
    dokterPenanggungJawab: "dr-001",
    dokterNama: "Dr. Ahmad Fauzi, Sp.PD",
    ruangan: "rm-101",
    ruanganNama: "Ruang Cempaka 101",
    ruanganKelas: "Kelas 1",
  },
  {
    namaPasien: "Faisal Akbar",
    nik: "3201010903010015",
    diagnosa: "Meningitis bakterialis dengan penurunan kesadaran GCS 10",
    tanggalMasuk: "2026-04-24",
    dokterPenanggungJawab: "dr-005",
    dokterNama: "Dr. Rizki Firmansyah, Sp.N",
    ruangan: "rm-102",
    ruanganNama: "Ruang Cempaka 102",
    ruanganKelas: "Kelas 1",
  },
];

export const MOCK_PATIENTS: Patient[] = rawPatients.map((p) => ({
  ...p,
  id: generateId(),
  createdAt: new Date(p.tanggalMasuk + "T08:00:00.000Z").toISOString(),
}));
