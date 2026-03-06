"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface DemoShellProps<T> {
  title: string;
  fetchData: () => Promise<T>;
  children: (data: T | null, isLoading: boolean, isError: boolean) => React.ReactNode;
}

export default function DemoShell<T>({ title, fetchData, children }: DemoShellProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // We wrap the fetch action in a callback so we can easily trigger a "Reset Demo"
  const executeFetch = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setData(null);

    try {
      const response = await fetchData();
      setData(response);
    } catch (err) {
      console.error("Demo Fetch Error:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    // Initial fetch
    executeFetch();
  }, [executeFetch]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Demo Header Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/#projects"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-200 group-hover:-translate-x-1"
              >
                <path
                  d="M10 13L5 8L10 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Portfolio Return
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <h1 className="text-sm font-semibold tracking-wide text-foreground/90">
              {title} <span className="text-accent ml-1 uppercase text-[10px] tracking-widest border border-accent/30 rounded-full px-2 py-0.5 bg-accent/5">Demo</span>
            </h1>
          </div>
          
          <button
            onClick={executeFetch}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-4 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className={isLoading ? "animate-spin" : ""}
            >
              <path
                d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.65685 2 11.1569 2.67157 12.2426 3.75736L14 5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 2V5.5H10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Reset Demo
          </button>
        </div>
      </header>

      {/* Demo Content Area */}
      <main className="flex-1 relative overflow-hidden bg-white/[0.01]">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center pt-20"
            >
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
              <p className="mt-4 text-sm tracking-widest text-muted uppercase">Processing Data...</p>
            </motion.div>
          )}

          {!isLoading && isError && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6"
            >
              <div className="max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center backdrop-blur-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-red-500 mb-2">Simulated Error Encounted</h2>
                <p className="text-sm text-foreground/70 mb-6">
                  The demo encountered a simulated error state. This is useful for demonstrating how the application handles robust failure modes.
                </p>
                <button
                  onClick={executeFetch}
                  className="rounded-lg bg-red-500/10 px-6 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/20"
                >
                  Retry Connection
                </button>
              </div>
            </motion.div>
          )}

          {!isLoading && !isError && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full w-full overflow-y-auto"
            >
              {children(data, isLoading, isError)}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
