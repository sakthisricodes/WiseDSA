import React from 'react';
import Link from 'next/link';
import { Building2, ArrowRight } from 'lucide-react';
import { getAuthenticatedUser } from '@/lib/auth';
import { getAnalyticsData } from '@/lib/tracker';
import { ProgressBar, Badge } from '@/components/ui';

export const dynamic = 'force-dynamic';

export default async function CompaniesPage() {
  const user = await getAuthenticatedUser();
  const analytics = await getAnalyticsData(user?.id);
  const companies = analytics.companyInsights || [];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Company Sheet Insights</h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
          Curated question frequency based on historical company interview tags in the course sheet dataset.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {companies.map((c) => {
          const pct = c.total > 0 ? Math.round((c.solved / c.total) * 100) : 0;
          return (
            <Link
              key={c.company}
              href={`/problems?company=${encodeURIComponent(c.company)}`}
              className="group rounded-xl border border-slate-200 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/60 p-4 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50/60 dark:hover:bg-zinc-850 transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {c.company}
                  </h3>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {c.total} questions
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                  {c.solved} solved • {c.remaining} remaining
                </p>
              </div>

              <div>
                <ProgressBar
                  value={c.solved}
                  max={c.total}
                  className="h-1.5 bg-slate-200 dark:bg-zinc-800"
                  barClassName={pct > 50 ? 'bg-emerald-500' : 'bg-blue-500'}
                />
                <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500 dark:text-zinc-400">
                  <span>{pct}% completed</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    Filter <ArrowRight className="h-2.5 w-2.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
