import { Component, type ReactNode, type ErrorInfo } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || "Terjadi kesalahan yang tidak diketahui",
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="max-w-md w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
            <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-rose-100 mb-4">
              <AlertTriangle
                className="h-7 w-7 text-rose-600"
                aria-hidden="true"
              />
            </div>
            <h1 className="text-lg font-bold text-slate-900 mb-2">
              Oops! Terjadi Kesalahan
            </h1>
            <p className="text-sm text-slate-500 mb-1">
              Aplikasi mengalami error yang tidak terduga.
            </p>
            <p className="text-xs font-mono text-rose-600 bg-rose-50 rounded px-3 py-2 mb-6">
              {this.state.errorMessage}
            </p>
            <button
              onClick={this.handleReload}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
