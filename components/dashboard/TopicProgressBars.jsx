import React from 'react';
import Link from 'next/link';
import { ChevronRight, Layers } from 'lucide-react';
import { Card, ProgressBar } from '@/components/ui';

export function TopicProgressBars({ topicProgress }) {
  return (
    <Card className="p-6 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-100 uppercase tracking-wider">
            Topic Breakdown
          </h3>
        </div>
        <Link
          href="/topics"
          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 flex items-center gap-1 font-medium transition-colors"
        >
          View all topics <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {topicProgress.map((tp) => (
          <Link
            key={tp.topic}
            href={`/problems?topic=${encodeURIComponent(tp.topic)}`}
            className="group rounded-xl border border-slate-200 dark:border-zinc-800/90 bg-slate-50/70 dark:bg-zinc-900/80 p-3.5 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-850 transition-all cursor-pointer shadow-none hover:shadow-sm"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-white transition-colors truncate">
                {tp.topic}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                {tp.solved} / {tp.total}
              </span>
            </div>
            <ProgressBar
              value={tp.solved}
              max={tp.total}
              className="h-1.5 bg-slate-200 dark:bg-zinc-800"
              barClassName={
                tp.percentage === 100
                  ? 'bg-emerald-500'
                  : tp.percentage > 50
                  ? 'bg-blue-500'
                  : 'bg-indigo-500'
              }
            />
            <div className="flex justify-between items-center mt-1.5 text-[10px] text-slate-500 dark:text-zinc-500">
              <span>{tp.percentage}% solved</span>
              {tp.inProgress > 0 && (
                <span className="text-amber-600 dark:text-amber-400 font-medium">{tp.inProgress} active</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
