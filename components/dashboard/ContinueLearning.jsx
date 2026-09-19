import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle2, RotateCcw } from 'lucide-react';
import { Card, Badge } from '@/components/ui';

export function ContinueLearning({ problems = [] }) {
  if (!problems || problems.length === 0) {
    return (
      <Card className="p-5 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
          Continue Learning
        </h3>
        <p className="text-xs text-slate-500 dark:text-zinc-500">All questions solved! Awesome job.</p>
      </Card>
    );
  }

  return (
    <Card className="p-5 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 flex flex-col justify-between shadow-sm">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Play className="h-4 w-4 text-emerald-500 fill-emerald-500/20" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-zinc-200 uppercase tracking-wider">
              Continue Learning
            </h3>
          </div>
          <Link
            href="/problems"
            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
          >
            All problems <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="space-y-2.5">
          {problems.map((p) => (
            <Link
              key={p.id}
              href={`/problems/${p.slug}`}
              className="group flex items-center justify-between rounded-lg border border-slate-200 dark:border-zinc-800/90 bg-slate-50/70 dark:bg-zinc-900/90 p-3 hover:border-blue-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-850 transition-all shadow-none hover:shadow-sm"
            >
              <div className="space-y-1 min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-mono">
                    {p.topic}
                  </Badge>
                  {p.isImportant && (
                    <Badge variant="amber" className="text-[10px] py-0 px-1.5">
                      Important
                    </Badge>
                  )}
                  {p.userProgress.needsRevision && (
                    <Badge variant="purple" className="text-[10px] py-0 px-1.5 flex items-center gap-0.5">
                      <RotateCcw className="h-2.5 w-2.5" /> Revision
                    </Badge>
                  )}
                </div>
                <h4 className="text-xs font-semibold text-slate-900 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                  {p.title}
                </h4>
                {p.companies && p.companies.length > 0 && (
                  <p className="text-[11px] text-slate-500 dark:text-zinc-500 truncate">
                    {p.companies.slice(0, 3).join(', ')}
                    {p.companies.length > 3 ? ` +${p.companies.length - 3}` : ''}
                  </p>
                )}
              </div>

              <div className="shrink-0 flex items-center">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Solve <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}
