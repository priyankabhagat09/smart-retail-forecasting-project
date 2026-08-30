import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
  title: "Smart Retail & Inventory Forecasting System",
  description: "Enterprise demand intelligence and automated inventory replenishment platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
