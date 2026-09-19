import React from 'react';
import Link from 'next/link';
import { Building2, ChevronRight } from 'lucide-react';
import { Card, ProgressBar } from '@/components/ui';

export function CompanyCoverageChart({ companies = [] }) {
  return (
    <Card className="p-6 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-zinc-200">
            Top Company Sheet Coverage
          </h3>
        </div>
        <Link
          href="/companies"
          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
        >
          View all companies <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {companies.slice(0, 12).map((item) => {
          const pct = item.total > 0 ? Math.round((item.solved / item.total) * 100) : 0;
          return (
            <Link
              key={item.company}
              href={`/problems?company=${encodeURIComponent(item.company)}`}
              className="group rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-950/70 p-3.5 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900 transition-all block cursor-pointer shadow-none hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.company}
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                  {item.solved} / {item.total}
                </span>
              </div>
              <ProgressBar
                value={item.solved}
                max={item.total}
                className="h-1.5 bg-slate-200 dark:bg-zinc-800"
                barClassName={pct > 50 ? 'bg-emerald-500' : 'bg-blue-500'}
              />
              <div className="flex justify-between items-center mt-1.5 text-[10px] text-slate-500 dark:text-zinc-500">
                <span>{pct}% solved</span>
                <span>{item.remaining} remaining</span>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
