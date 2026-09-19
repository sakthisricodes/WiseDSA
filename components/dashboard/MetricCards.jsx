import React from 'react';
import { CheckCircle2, Clock, CircleDot, RotateCcw, Target, Sparkles } from 'lucide-react';
import { Card, ProgressBar } from '@/components/ui';

export function MetricCards({ overview }) {
  const { total, solved, inProgress, unsolved, needsRevision, completionPercentage } = overview;

  const stats = [
    {
      label: 'Total Sheet Problems',
      value: total,
      sublabel: 'Curriculum database',
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      label: 'Problems Solved',
      value: solved,
      sublabel: `${completionPercentage}% completed`,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      label: 'In Progress',
      value: inProgress,
      sublabel: 'Currently working on',
      icon: Clock,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    },
    {
      label: 'Unsolved Remaining',
      value: unsolved,
      sublabel: 'Ready to tackle',
      icon: CircleDot,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    },
    {
      label: 'Needs Revision',
      value: needsRevision,
      sublabel: 'Scheduled for recall',
      icon: RotateCcw,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Progress banner */}
      <Card className="relative overflow-hidden border border-slate-200 dark:border-zinc-800 bg-gradient-to-r from-white via-white to-blue-50/60 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-blue-950/30 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                DSA Mastery Progress
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {solved} of {total} Problems Completed
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Structured progress across 16 core computer science topics & algorithmic patterns.
            </p>
          </div>
          <div className="flex items-baseline gap-2 shrink-0">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {completionPercentage}%
            </span>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">overall</span>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar value={solved} max={total} className="h-2.5 bg-slate-100 dark:bg-zinc-800/80" />
        </div>
      </Card>

      {/* Grid Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card
              key={idx}
              className={`p-4 flex flex-col justify-between border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 ${stat.borderColor} hover:border-slate-300 dark:hover:border-zinc-700 transition-colors shadow-sm`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">{stat.label}</span>
                <div className={`p-1.5 rounded-lg ${stat.bgColor} ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</div>
                <div className="text-[11px] text-slate-400 dark:text-zinc-500 truncate">{stat.sublabel}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
