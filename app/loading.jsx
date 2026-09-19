import React from 'react';

export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 bg-slate-200 dark:bg-zinc-800 rounded-lg" />
        <div className="h-4 w-96 max-w-full bg-slate-100 dark:bg-zinc-850 rounded" />
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 bg-slate-200 dark:bg-zinc-800 rounded" />
              <div className="h-6 w-6 bg-slate-100 dark:bg-zinc-800 rounded-md" />
            </div>
            <div className="h-7 w-20 bg-slate-200 dark:bg-zinc-800 rounded-md" />
            <div className="h-2 w-full bg-slate-100 dark:bg-zinc-800/60 rounded-full" />
          </div>
        ))}
      </div>

      {/* Main content split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 space-y-4">
          <div className="h-4 w-40 bg-slate-200 dark:bg-zinc-800 rounded" />
          <div className="space-y-3 pt-2">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="h-12 bg-slate-50 dark:bg-zinc-850 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="h-80 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 space-y-4">
          <div className="h-4 w-32 bg-slate-200 dark:bg-zinc-800 rounded" />
          <div className="h-56 bg-slate-50 dark:bg-zinc-850 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
