/**
 * src/components/layout/MainLayout.tsx
 *
 * Role: Shared layout wrapping all pages with:
 *   1. Top navigation bar with NavLink active indicators
 *   2. Breadcrumb showing current route name
 *   3. <Outlet /> for nested route content
 *
 * Design Decision: Uses React Router's NavLink for automatic active
 * class injection. Breadcrumb maps pathname to human-readable labels.
 */

import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Activity, ClipboardList, UserPlus, ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const BREADCRUMB_MAP: Record<string, string> = {
  '/pasien/masuk': 'Pendaftaran Pasien',
  '/pasien/daftar': 'Daftar Pasien Aktif',
};

const NAV_LINKS = [
  {
    to: '/pasien/masuk',
    label: 'Pendaftaran',
    icon: UserPlus,
    end: true,
  },
  {
    to: '/pasien/daftar',
    label: 'Daftar Pasien',
    icon: ClipboardList,
    end: true,
  },
] as const;

function Breadcrumb({ pathname }: { pathname: string }) {
  const pageName = BREADCRUMB_MAP[pathname];

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <span className="flex items-center gap-1 text-slate-400">
        <Home className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Rawat Inap</span>
      </span>
      {pageName && (
        <>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" />
          <span className="font-medium text-slate-700" aria-current="page">
            {pageName}
          </span>
        </>
      )}
    </nav>
  );
}

export function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* ── Top Navigation Bar ────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo / Brand */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
                <Activity className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none">
                  MedInap
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Modul Rawat Inap</p>
              </div>
            </div>

            {/* Nav Links */}
            <nav
              className="flex items-center gap-1"
              role="navigation"
              aria-label="Navigasi utama"
            >
              {NAV_LINKS.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  aria-label={label}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    )
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ── Breadcrumb Bar ────────────────────────────────────────────── */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5">
          <Breadcrumb pathname={location.pathname} />
        </div>
      </div>

      {/* ── Page Content ──────────────────────────────────────────────── */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6" id="main-content">
        <Outlet />
      </main>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-slate-400">
            © 2026 MedInap — Sistem Informasi Rawat Inap
          </p>
        </div>
      </footer>
    </div>
  );
}
