/**
 * src/constants/doctors.ts
 *
 * Role: Static list of doctors available for selection in the admission form.
 * In a real application this would be fetched from an API.
 */

import type { Doctor } from '@/types';

export const DOCTORS: Doctor[] = [
  { id: 'dr-001', name: 'Dr. Ahmad Fauzi, Sp.PD', specialty: 'Penyakit Dalam' },
  { id: 'dr-002', name: 'Dr. Siti Rahayu, Sp.B', specialty: 'Bedah' },
  { id: 'dr-003', name: 'Dr. Budi Santoso, Sp.JP', specialty: 'Jantung dan Pembuluh Darah' },
  { id: 'dr-004', name: 'Dr. Dewi Kurniawati, Sp.OG', specialty: 'Obstetri dan Ginekologi' },
  { id: 'dr-005', name: 'Dr. Rizki Firmansyah, Sp.N', specialty: 'Neurologi' },
];
