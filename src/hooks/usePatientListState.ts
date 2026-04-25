import { useState, useMemo, useEffect, useCallback } from "react";
import type { Patient, SortConfig, SortDirection } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";

const PAGE_SIZE = 10;

interface UsePatientListStateResult {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortConfig: SortConfig;
  handleSort: (key: keyof Patient) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  paginatedPatients: Patient[];
  filteredCount: number;
  pagination: ReturnType<typeof usePagination>;
}

export function usePatientListState(
  patients: Patient[],
): UsePatientListStateResult {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const debouncedQuery = useDebounce(searchQuery, 300);

  // Reset to page 1 whenever the search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  const handleSort = useCallback((key: keyof Patient) => {
    setSortConfig((prev) => {
      if (prev.key !== key) {
        return { key, direction: "asc" };
      }
      const nextDirection: SortDirection =
        prev.direction === "asc"
          ? "desc"
          : prev.direction === "desc"
            ? null
            : "asc";
      return nextDirection === null
        ? { key: null, direction: null }
        : { key, direction: nextDirection };
    });
  }, []);

  const filteredPatients = useMemo<Patient[]>(() => {
    if (!debouncedQuery.trim()) return patients;
    const q = debouncedQuery.toLowerCase().trim();
    return patients.filter(
      (p) => p.namaPasien.toLowerCase().includes(q) || p.nik.includes(q),
    );
  }, [patients, debouncedQuery]);

  const sortedPatients = useMemo<Patient[]>(() => {
    if (!sortConfig.key || !sortConfig.direction) return filteredPatients;

    const key = sortConfig.key;
    const dir = sortConfig.direction;

    return [...filteredPatients].sort((a, b) => {
      const aVal = a[key] as string;
      const bVal = b[key] as string;
      const comparison = aVal.localeCompare(bVal, "id-ID");
      return dir === "asc" ? comparison : -comparison;
    });
  }, [filteredPatients, sortConfig]);

  const pagination = usePagination({
    totalItems: sortedPatients.length,
    pageSize: PAGE_SIZE,
    currentPage,
  });

  const paginatedPatients = useMemo<Patient[]>(() => {
    return sortedPatients.slice(pagination.startIndex, pagination.endIndex + 1);
  }, [sortedPatients, pagination.startIndex, pagination.endIndex]);

  return {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    currentPage,
    setCurrentPage,
    paginatedPatients,
    filteredCount: filteredPatients.length,
    pagination,
  };
}
