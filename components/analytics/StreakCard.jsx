import React from 'react';
import { Flame, Trophy, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui';

export function StreakCard({ streak, totalSolved, totalProblems }) {
  return (
    <Card className="p-6 border border-slate-200 dark:border-zinc-800 bg-gradient-to-br from-white via-white to-amber-50/50 dark:from-zinc-900 dark:via-zinc-900 dark:to-amber-950/20 space-y-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/30">
            <Flame className="h-5 w-5 fill-amber-500/20" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Solving Consistency & Streak
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">
              Days with at least 1 problem solved
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-amber-500 dark:text-amber-400 font-mono">
            {streak.current} {streak.current === 1 ? 'day' : 'days'}
          </span>
          <span className="block text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-semibold">
            Current Streak
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-950/60 p-3">
          <span className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">Longest Streak</span>
          <span className="text-xl font-bold text-slate-900 dark:text-white font-mono flex items-center justify-center gap-1">
            <Trophy className="h-4 w-4 text-amber-500" />
            {streak.longest} {streak.longest === 1 ? 'day' : 'days'}
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-950/60 p-3">
          <span className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">Problems Solved</span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono flex items-center justify-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            {totalSolved}
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-950/60 p-3">
          <span className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">Sheet Completion</span>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400 font-mono flex items-center justify-center gap-1">
            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            {totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0}%
          </span>
        </div>
      </div>
    </Card>
  );
}
