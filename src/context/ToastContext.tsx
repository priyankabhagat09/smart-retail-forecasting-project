"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { CircleAlert, CircleCheck, Sparkles } from "lucide-react";
import type { ToastMessage } from "@/types";

interface ToastContextValue {
  push: (toast: Omit<ToastMessage, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const push = useCallback((toast: Omit<ToastMessage, "id">) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((t) => [...t, { id, ...toast }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4200);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[340px]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-fadeIn rounded-lg border backdrop-blur-xl shadow-2xl px-4 py-3 flex items-start gap-3 ${
              t.tone === "success"
                ? "bg-emerald-500/10 border-emerald-500/30"
                : t.tone === "error"
                  ? "bg-rose-600/10 border-rose-600/30"
                  : "bg-indigo-500/10 border-indigo-500/30"
            }`}
          >
            {t.tone === "success" ? (
              <CircleCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            ) : t.tone === "error" ? (
              <CircleAlert className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-100">{t.title}</p>
              {t.description && <p className="text-xs text-slate-400 mt-0.5">{t.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
