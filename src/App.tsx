import { Routes, Route, Navigate, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { PasienMasukPage } from "@/pages/PasienMasukPage";
import { PasienDaftarPage } from "@/pages/PasienDaftarPage";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route index element={<Navigate to="/pasien/daftar" replace />} />
            <Route path="/pasien/masuk" element={<PasienMasukPage />} />
            <Route path="/pasien/daftar" element={<PasienDaftarPage />} />
            {/* Catch-all fallback */}
            <Route
              path="*"
              element={<Navigate to="/pasien/daftar" replace />}
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </ErrorBoundary>
  );
}
