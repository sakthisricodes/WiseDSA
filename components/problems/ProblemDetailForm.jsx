'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  CircleDot,
  RotateCcw,
  ExternalLink,
  Save,
  Plus,
  Minus,
  Sparkles,
  Calendar,
  Layers,
  Building2,
  Tag,
  Star,
  Flame,
  Check,
  History
} from 'lucide-react';
import { Button, Badge, Card, Input } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import {
  saveProblemNotesAction,
  updateProblemStatusAction,
  toggleRevisionAction,
  markProblemRevisedAction
} from '@/app/actions';

export function ProblemDetailForm({ problem }) {
  const [isPending, startTransition] = useTransition();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [showRevisionModal, setShowRevisionModal] = useState(false);

  // Local form state
  const [status, setStatus] = useState(problem.userProgress.status || 'UNSOLVED');
  const [needsRevision, setNeedsRevision] = useState(Boolean(problem.userProgress.needsRevision));
  const [attempts, setAttempts] = useState(problem.userProgress.attempts || 0);
  const [approach, setApproach] = useState(problem.userProgress.approach || '');
  const [timeComplexity, setTimeComplexity] = useState(problem.userProgress.timeComplexity || '');
  const [spaceComplexity, setSpaceComplexity] = useState(problem.userProgress.spaceComplexity || '');
  const [notes, setNotes] = useState(problem.userProgress.notes || '');

  const handleSave = () => {
    startTransition(async () => {
      await saveProblemNotesAction(problem.id, {
        status,
        needsRevision,
        attempts,
        approach,
        timeComplexity,
        spaceComplexity,
        notes
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    });
  };

  const handleMarkRevised = () => {
    startTransition(async () => {
      await markProblemRevisedAction(problem.id, revisionNotes);
      setNeedsRevision(false);
      setShowRevisionModal(false);
      setRevisionNotes('');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left 2 Cols: Problem Metadata & Solution Notes */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header card */}
        <Card className="p-6 border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
                #{problem.orderIndex}
              </span>
              <Badge variant="outline" className="font-mono text-xs">
                {problem.topic}
              </Badge>
              {problem.isImportant && (
                <Badge variant="amber" className="flex items-center gap-1 text-xs">
                  <Star className="h-3 w-3 fill-amber-400/50" /> Important
                </Badge>
              )}
              {problem.isInterviewQ && (
                <Badge variant="purple" className="flex items-center gap-1 text-xs">
                  <Flame className="h-3 w-3 text-purple-400" /> Interview Question
                </Badge>
              )}
            </div>

            {problem.url && (
              <a
                href={problem.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              >
                Practice on External Platform <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
            {problem.title}
          </h1>

          {/* Remarks Callout */}
          {problem.remarks && (
            <div className="mb-4 rounded-lg border border-blue-200 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/10 p-3 text-xs text-blue-800 dark:text-blue-200">
              <span className="font-semibold text-blue-900 dark:text-blue-300">Sheet Remark: </span>
              {problem.remarks}
            </div>
          )}

          {/* Companies & Techniques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-zinc-800">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1 mb-1.5">
                <Building2 className="h-3.5 w-3.5" /> Company Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {problem.companies && problem.companies.length > 0 ? (
                  problem.companies.map((c) => (
                    <Badge key={c} variant="default" className="text-xs">
                      {c}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 dark:text-zinc-400">None tagged in sheet</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1 mb-1.5">
                <Tag className="h-3.5 w-3.5" /> Algorithmic Techniques
              </span>
              <div className="flex flex-wrap gap-1.5">
                {problem.techniques && problem.techniques.length > 0 ? (
                  problem.techniques.map((t) => (
                    <Badge key={t} variant="emerald" className="text-xs font-mono">
                      {t}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 dark:text-zinc-400">Standard implementation</span>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Notes & Solution Approach Card */}
        <Card className="p-6 border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Personal Notes & Solution Approach
            </h2>
            {savedSuccess && (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-pulse">
                <Check className="h-3.5 w-3.5" /> Saved successfully!
              </span>
            )}
          </div>

          {/* Approach */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-zinc-350 uppercase tracking-wider">
              My Algorithmic Approach
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Maintained two pointers / Kadane's algorithm keeping max_so_far and max_ending_here..."
              value={approach}
              onChange={(e) => setApproach(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-3 text-xs text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Complexities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-350 uppercase tracking-wider">
                Time Complexity
              </label>
              <Input
                placeholder="e.g. O(N) or O(N log N)"
                value={timeComplexity}
                onChange={(e) => setTimeComplexity(e.target.value)}
                className="font-mono text-xs bg-white dark:bg-zinc-950/80 border-slate-200 dark:border-zinc-800"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-350 uppercase tracking-wider">
                Space Complexity
              </label>
              <Input
                placeholder="e.g. O(1) auxiliary"
                value={spaceComplexity}
                onChange={(e) => setSpaceComplexity(e.target.value)}
                className="font-mono text-xs bg-white dark:bg-zinc-950/80 border-slate-200 dark:border-zinc-800"
              />
            </div>
          </div>

          {/* Detailed Code / Markdown Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-zinc-350 uppercase tracking-wider">
              Code Snippets & Key Edge Cases
            </label>
            <textarea
              rows={8}
              placeholder="Key insights, pitfalls (e.g. all negative numbers, integer overflow, empty array), edge cases..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-3 font-mono text-xs text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="gap-1.5 text-xs font-semibold"
            >
              <Save className="h-3.5 w-3.5" />
              {isPending ? 'Saving...' : 'Save Notes & Progress'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Right Column: Personal Tracking Panel & Revision History */}
      <div className="space-y-6">
        {/* Status & Revision Controls */}
        <Card className="p-6 border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-zinc-200 uppercase tracking-wider border-b border-slate-100 dark:border-zinc-800 pb-2">
            Personal Tracking
          </h2>

          {/* Status Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 dark:text-zinc-400">Current Status</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('UNSOLVED')}
                className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  status === 'UNSOLVED'
                    ? 'bg-red-50 text-red-700 border-red-300 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/50 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 dark:bg-zinc-950/60 dark:text-zinc-500 dark:border-zinc-800 dark:hover:text-zinc-300'
                }`}
              >
                Unsolved
              </button>
              <button
                type="button"
                onClick={() => setStatus('IN_PROGRESS')}
                className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  status === 'IN_PROGRESS'
                    ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/50 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 dark:bg-zinc-950/60 dark:text-zinc-500 dark:border-zinc-800 dark:hover:text-zinc-300'
                }`}
              >
                In Progress
              </button>
              <button
                type="button"
                onClick={() => setStatus('SOLVED')}
                className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  status === 'SOLVED'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/50 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 dark:bg-zinc-950/60 dark:text-zinc-500 dark:border-zinc-800 dark:hover:text-zinc-300'
                }`}
              >
                Solved
              </button>
            </div>
          </div>

          {/* Needs Revision Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/60">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-slate-900 dark:text-zinc-200 flex items-center gap-1.5">
                <RotateCcw className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                Needs Revision
              </span>
              <p className="text-[11px] text-slate-500 dark:text-zinc-500">
                Adds to your dedicated revision queue.
              </p>
            </div>
            <input
              type="checkbox"
              checked={needsRevision}
              onChange={(e) => setNeedsRevision(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-purple-600 focus:ring-purple-500 cursor-pointer"
            />
          </div>

          {/* Attempts counter */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/60">
            <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Attempts Count</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAttempts(Math.max(0, attempts - 1))}
                className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-700"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-8 text-center font-mono text-sm font-bold text-slate-900 dark:text-white">
                {attempts}
              </span>
              <button
                type="button"
                onClick={() => setAttempts(attempts + 1)}
                className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-700"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Dates Metadata */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-850 text-xs text-slate-500 dark:text-zinc-400">
            <div className="flex justify-between">
              <span>Last Attempted:</span>
              <span className="font-mono text-slate-800 dark:text-zinc-200">
                {formatDate(problem.userProgress.lastAttemptedAt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Solved On:</span>
              <span className="font-mono text-slate-800 dark:text-zinc-200">
                {formatDate(problem.userProgress.solvedAt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Revision Count:</span>
              <span className="font-mono text-purple-700 dark:text-purple-300 font-semibold">
                {problem.userProgress.revisionCount || 0} rounds
              </span>
            </div>
          </div>

          {/* Revision Action */}
          {needsRevision && (
            <Button
              onClick={() => setShowRevisionModal(true)}
              variant="purple"
              className="w-full text-xs font-semibold gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Mark as Revised (Round #{ (problem.userProgress.revisionCount || 0) + 1 })
            </Button>
          )}
        </Card>

        {/* Revision Log History Timeline */}
        <Card className="p-6 border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-zinc-800 pb-2">
            <History className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <h2 className="text-sm font-semibold text-slate-900 dark:text-zinc-200 uppercase tracking-wider">
              Revision History
            </h2>
          </div>

          {problem.revisionLogs && problem.revisionLogs.length > 0 ? (
            <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-zinc-800">
              {problem.revisionLogs.map((log) => (
                <div key={log.id} className="relative pl-6 space-y-1">
                  <div className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-purple-500 bg-white dark:bg-zinc-950 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-zinc-200">
                    <span>Revision #{log.revisionRound}</span>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono">
                      {formatDate(log.revisedAt)}
                    </span>
                  </div>
                  {log.notes && (
                    <p className="text-[11px] text-slate-600 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-950/60 p-2 rounded border border-slate-200 dark:border-zinc-850">
                      {log.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 dark:text-zinc-500">
              No revisions logged yet. Mark as revised after reviewing solution approach!
            </p>
          )}
        </Card>

        {/* Raw text audit box */}
        <Card className="p-4 border-slate-200 dark:border-zinc-800/80 bg-slate-50/80 dark:bg-zinc-950/40 text-[11px] text-slate-500 dark:text-zinc-500 space-y-1">
          <span className="font-semibold text-slate-700 dark:text-zinc-400">Sheet Source Row Audit:</span>
          <p className="font-mono text-[10px] text-slate-600 dark:text-zinc-400 break-words">
            {problem.rawText}
          </p>
        </Card>
      </div>

      {/* Revision Modal Popup */}
      {showRevisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/75 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 space-y-4 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Log Revision Round #{(problem.userProgress.revisionCount || 0) + 1}
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Record what you reviewed or key memory triggers for {problem.title}.
              </p>
            </div>

            <textarea
              rows={3}
              placeholder="e.g. Reviewed 2-pointer edge cases; solved cleanly in 12 mins."
              value={revisionNotes}
              onChange={(e) => setRevisionNotes(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3 text-xs text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRevisionModal(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="purple"
                size="sm"
                disabled={isPending}
                onClick={handleMarkRevised}
                className="text-xs font-semibold"
              >
                {isPending ? 'Logging...' : 'Confirm Revision'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
