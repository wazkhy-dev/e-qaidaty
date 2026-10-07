import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Qaidaty ErrorBoundary] Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-sky-100 text-center space-y-4">
            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto text-3xl">
              ⚠️
            </div>
            <h1 className="text-xl font-extrabold text-[#0B1F44]">
              Qaidaty Mengalami Kendala Tampilan
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Terjadi kesalahan saat memuat komponen antarmuka. Silakan klik tombol di bawah untuk memuat ulang aplikasi.
            </p>
            {this.state.error && (
              <div className="p-3 bg-slate-50 rounded-xl text-left border border-slate-200 overflow-x-auto">
                <p className="text-[11px] font-mono text-rose-600 font-medium break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('qaidaty_user');
                window.location.reload();
              }}
              className="w-full py-3 bg-[#123F9A] text-white rounded-xl font-bold text-sm shadow-md hover:bg-blue-800 transition-all cursor-pointer"
            >
              Muat Ulang Qaidaty
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
