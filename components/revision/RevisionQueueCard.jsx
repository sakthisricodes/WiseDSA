'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  RotateCcw,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ExternalLink,
  MessageSquareText,
  Star,
  Flame
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { markProblemRevisedAction } from '@/app/actions';

export function RevisionQueueCard({ problem }) {
  const [isPending, startTransition] = useTransition();
  const [showNotesInput, setShowNotesInput] = useState(false);
  const [revNotes, setRevNotes] = useState('');
  const [revisedRound, setRevisedRound] = useState(problem.userProgress.revisionCount || 0);
  const [isDone, setIsDone] = useState(false);

  const handleMarkRevised = () => {
    startTransition(async () => {
      await markProblemRevisedAction(problem.id, revNotes);
      setRevisedRound((r) => r + 1);
      setIsDone(true);
    });
  };

  if (isDone) {
    return (
      <Card className="p-4 border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/10 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
          <CheckCircle2 className="h-4 w-4" />
          <span>
            {problem.title} marked as revised (Round #{revisedRound})!
          </span>
        </div>
        <Link
          href={`/problems/${problem.slug}`}
          className="text-xs text-slate-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          View Details
        </Link>
      </Card>
    );
  }

  return (
    <Card className="p-5 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-4 hover:border-slate-300 dark:hover:border-zinc-700 transition-colors shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-zinc-850 pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-500 dark:text-zinc-500">#{problem.orderIndex}</span>
            <Badge variant="outline" className="font-mono text-[11px]">
              {problem.topic}
            </Badge>
            {problem.isImportant && (
              <Badge variant="amber" className="text-[10px]">
                <Star className="h-2.5 w-2.5 fill-amber-400/50" /> Important
              </Badge>
            )}
            {problem.isInterviewQ && (
              <Badge variant="purple" className="text-[10px]">
                <Flame className="h-2.5 w-2.5 text-purple-400" /> Interview Q
              </Badge>
            )}
          </div>
          <Link
            href={`/problems/${problem.slug}`}
            className="text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
          >
            {problem.title}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="purple" className="text-xs py-1 px-2.5 font-mono font-semibold">
            Revision Round #{problem.userProgress.revisionCount || 0}
          </Badge>
        </div>
      </div>

      {/* Remarks or Notes preview */}
      <div className="space-y-2 text-xs">
        {problem.remarks && (
          <p className="text-slate-500 dark:text-zinc-400 italic">
            <span className="text-slate-700 dark:text-zinc-300 font-medium">Remark: </span>
            {problem.remarks}
          </p>
        )}

        {problem.userProgress.approach && (
          <div className="rounded-lg bg-slate-50 dark:bg-zinc-950/60 p-3 border border-slate-200 dark:border-zinc-850 space-y-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1">
              <MessageSquareText className="h-3 w-3" /> Saved Approach
            </span>
            <p className="text-slate-700 dark:text-zinc-300 text-xs line-clamp-2">
              {problem.userProgress.approach}
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-zinc-500 font-mono pt-1">
          {problem.userProgress.timeComplexity && (
            <span>Time: {problem.userProgress.timeComplexity}</span>
          )}
          {problem.userProgress.spaceComplexity && (
            <span>Space: {problem.userProgress.spaceComplexity}</span>
          )}
          <span>Attempts: {problem.userProgress.attempts || 0}</span>
          <span>Last attempt: {formatDate(problem.userProgress.lastAttemptedAt)}</span>
        </div>
      </div>

      {/* Revision notes drawer toggle */}
      {showNotesInput ? (
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-850">
          <textarea
            rows={2}
            placeholder="Revision notes (e.g. Cleared Kadane edge cases, solved in 10 mins)..."
            value={revNotes}
            onChange={(e) => setRevNotes(e.target.value)}
            className="w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 text-xs text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotesInput(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              variant="purple"
              size="sm"
              disabled={isPending}
              onClick={handleMarkRevised}
              className="text-xs font-semibold gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              {isPending ? 'Logging...' : 'Confirm Revision Round'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-zinc-850">
          <Link
            href={`/problems/${problem.slug}`}
            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium flex items-center gap-1"
          >
            Review solution & complexities <ArrowRight className="h-3 w-3" />
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNotesInput(true)}
              className="text-xs border-slate-200 dark:border-zinc-800"
            >
              Add Note & Revise
            </Button>
            <Button
              variant="purple"
              size="sm"
              disabled={isPending}
              onClick={handleMarkRevised}
              className="text-xs font-semibold gap-1"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Quick Mark Revised
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
