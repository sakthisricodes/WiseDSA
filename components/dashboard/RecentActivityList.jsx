import React from 'react';
import Link from 'next/link';
import { History, CheckCircle2, Clock, RotateCcw, Calendar } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';

export function RecentActivityList({ activities = [] }) {
  if (!activities || activities.length === 0) {
    return (
      <Card className="p-5 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <History className="h-4 w-4 text-slate-400 dark:text-zinc-400" />
          <h3 className="text-sm font-semibold text-slate-800 dark:text-zinc-200 uppercase tracking-wider">
            Recent Activity
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-zinc-500">No activity yet. Start solving problems to track progress!</p>
      </Card>
    );
  }

  return (
    <Card className="p-5 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-sm font-semibold text-slate-800 dark:text-zinc-200 uppercase tracking-wider">
            Recent Activity
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-zinc-500">Last updated</span>
      </div>

      <div className="space-y-2.5">
        {activities.map((p) => {
          const isSolved = p.userProgress.status === 'SOLVED';
          const timestamp = p.userProgress.solvedAt || p.userProgress.lastAttemptedAt;

          return (
            <Link
              key={p.id}
              href={`/problems/${p.slug}`}
              className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-900/80 p-3 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-850 transition-all shadow-none hover:shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div
                  className={`p-1.5 rounded-md shrink-0 ${
                    isSolved
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {isSolved ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Clock className="h-3.5 w-3.5" />
                  )}
                </div>

                <div className="space-y-0.5 truncate">
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-zinc-200 truncate">
                    {p.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-zinc-500 font-mono">
                    <span>{p.topic}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-2.5 w-2.5" />
                      {formatDate(timestamp)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1.5">
                {p.userProgress.attempts > 0 && (
                  <span className="text-[10px] font-mono text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-transparent px-1.5 py-0.5 rounded">
                    {p.userProgress.attempts} attempts
                  </span>
                )}
                {p.userProgress.needsRevision && (
                  <Badge variant="purple" className="text-[10px] py-0 px-1.5">
                    Revise
                  </Badge>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
