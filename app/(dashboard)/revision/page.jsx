import React from 'react';
import Link from 'next/link';
import { RotateCcw, CheckCircle, Sparkles, ArrowRight, Code2 } from 'lucide-react';
import { getAuthenticatedUser } from '@/lib/auth';
import { getProblemsWithUserProgress } from '@/lib/tracker';
import { RevisionQueueCard } from '@/components/revision/RevisionQueueCard';
import { Card, Button } from '@/components/ui';

export const dynamic = 'force-dynamic';

export default async function RevisionPage() {
  const user = await getAuthenticatedUser();
  const problems = await getProblemsWithUserProgress(user?.id, {
    needsRevision: true
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Revision Queue</h1>
            <span className="rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 px-2.5 py-0.5 text-xs font-mono font-semibold">
              {problems.length} pending
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Spaced repetition queue for challenging problems, algorithmic edge cases, and technique refreshers.
          </p>
        </div>

        <Link href="/problems">
          <Button variant="outline" size="sm" className="text-xs gap-1.5">
            <Code2 className="h-3.5 w-3.5" />
            Explore More Problems
          </Button>
        </Link>
      </div>

      {problems.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-3">
            <CheckCircle className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-zinc-200">Revision queue is clean!</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-500 max-w-sm mt-1 mb-4">
            No problems currently marked for revision. When solving problems, toggle &quot;Needs Revision&quot; to schedule them here for recall.
          </p>
          <Link href="/problems">
            <Button size="sm" className="text-xs gap-1.5">
              Browse Problems <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3.5">
          {problems.map((problem) => (
            <RevisionQueueCard key={problem.id} problem={problem} />
          ))}
        </div>
      )}
    </div>
  );
}
