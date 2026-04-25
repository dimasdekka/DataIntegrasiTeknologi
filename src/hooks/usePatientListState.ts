import { useState, useMemo, useEffect } from "react";
import type { Patient, SortConfig } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";

const PAGE_SIZE = 10;

export function usePatientListState(patients: Patient[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedQuery = useDebounce(searchQuery, 300);

  // Reset ke halaman 1 setiap kali pencarian berubah
  useEffect(() => setCurrentPage(1), [debouncedQuery]);

  const handleSort = (key: keyof Patient) => {
    setSortConfig((prev) => {
      if (prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return { key: null, direction: null };
    });
  };

  const processedPatients = useMemo(() => {
    let result = patients;

    // Proses 1: Filter Data
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase().trim();
      result = result.filter(
        (p) => p.namaPasien.toLowerCase().includes(q) || p.nik.includes(q)
      );
    }

    // Proses 2: Sorting Data
    if (sortConfig.key && sortConfig.direction) {
      const { key, direction } = sortConfig;
      result = [...result].sort((a, b) => {
        const comparison = String(a[key]).localeCompare(String(b[key]), "id-ID");
        return direction === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [patients, debouncedQuery, sortConfig]);

  const pagination = usePagination({
    totalItems: processedPatients.length,
    pageSize: PAGE_SIZE,
    currentPage,
  });

  const paginatedPatients = useMemo(() => {
    return processedPatients.slice(pagination.startIndex, pagination.endIndex + 1);
  }, [processedPatients, pagination.startIndex, pagination.endIndex]);

  return {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    setCurrentPage,
    paginatedPatients,
    filteredCount: processedPatients.length,
    pagination,
  };
}
