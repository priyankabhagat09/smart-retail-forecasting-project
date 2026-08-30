"use client";

import React from "react";
import { Ban } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackHint?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Isolates render failures to a single dashboard module instead of taking
 * down the whole page. Wrap any panel that renders untrusted or
 * data-dependent visualizations with this boundary.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center px-6">
          <div className="w-10 h-10 rounded-full bg-rose-600/10 border border-rose-600/30 flex items-center justify-center">
            <Ban className="w-5 h-5 text-rose-400" />
          </div>
          <p className="text-sm font-medium text-slate-200">This module failed to render.</p>
          <p className="text-xs text-slate-500 max-w-xs">
            {this.props.fallbackHint || "Try refreshing this panel. If the problem persists, contact platform support."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-1 text-xs font-medium px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
