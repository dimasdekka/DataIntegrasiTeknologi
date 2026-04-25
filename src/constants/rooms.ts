/**
 * src/constants/rooms.ts
 *
 * Role: Static list of hospital rooms with class designations.
 * RoomClass maps to a badge color in the UI.
 */

import type { Room } from '@/types';

export const ROOMS: Room[] = [
  { id: 'rm-101', name: 'Ruang Cempaka 101', class: 'Kelas 1', floor: 1 },
  { id: 'rm-102', name: 'Ruang Cempaka 102', class: 'Kelas 1', floor: 1 },
  { id: 'rm-201', name: 'Ruang Melati 201', class: 'Kelas 2', floor: 2 },
  { id: 'rm-202', name: 'Ruang Melati 202', class: 'Kelas 2', floor: 2 },
  { id: 'rm-203', name: 'Ruang Melati 203', class: 'Kelas 2', floor: 2 },
  { id: 'rm-301', name: 'Ruang Mawar 301', class: 'Kelas 3', floor: 3 },
  { id: 'rm-302', name: 'Ruang Mawar 302', class: 'Kelas 3', floor: 3 },
  { id: 'rm-303', name: 'Ruang Mawar 303', class: 'Kelas 3', floor: 3 },
  { id: 'rm-vip-1', name: 'Suite Anggrek VIP-1', class: 'VIP', floor: 4 },
  { id: 'rm-vip-2', name: 'Suite Anggrek VIP-2', class: 'VIP', floor: 4 },
];
