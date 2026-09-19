'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  CircleDot,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Flame,
  Star,
  Info
} from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import { updateProblemStatusAction, toggleRevisionAction } from '@/app/actions';

export function ProblemRow({ problem }) {
  const [isPending, startTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState(problem.userProgress.status);
  const [needsRevision, setNeedsRevision] = useState(problem.userProgress.needsRevision);

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    startTransition(async () => {
      await updateProblemStatusAction(problem.id, newStatus);
    });
  };

  const handleRevisionToggle = () => {
    const nextVal = !needsRevision;
    setNeedsRevision(nextVal);
    startTransition(async () => {
      await toggleRevisionAction(problem.id, nextVal);
    });
  };

  return (
    <tr className="group border-b border-slate-100 dark:border-zinc-850 hover:bg-slate-50/80 dark:hover:bg-zinc-900/60 transition-colors">
      {/* Index & Checkbox status */}
      <td className="py-3 px-3 w-10 text-center font-mono text-xs text-slate-400 dark:text-zinc-400">
        #{problem.orderIndex}
      </td>

      {/* Title, topic, and tags */}
      <td className="py-3 px-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <Link
              href={`/problems/${problem.slug}`}
              className="text-sm font-semibold text-slate-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {problem.title}
            </Link>

            {problem.isImportant && (
              <Badge variant="amber" className="text-[10px] py-0 px-1.5 flex items-center gap-0.5">
                <Star className="h-2.5 w-2.5 fill-amber-400/50" /> Important
              </Badge>
            )}

            {problem.isInterviewQ && (
              <Badge variant="purple" className="text-[10px] py-0 px-1.5 flex items-center gap-0.5">
                <Flame className="h-2.5 w-2.5 text-purple-400" /> Interview Qs
              </Badge>
            )}

            {problem.url && (
              <a
                href={problem.url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 p-0.5"
                title="Open external problem link"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Remarks & Techniques */}
          {(problem.remarks || (problem.techniques && problem.techniques.length > 0)) && (
            <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-500 dark:text-zinc-400">
              {problem.remarks && (
                <span className="text-slate-500 dark:text-zinc-400 italic flex items-center gap-1 mr-1">
                  <Info className="h-3 w-3 text-slate-400 dark:text-zinc-400 inline" /> {problem.remarks}
                </span>
              )}
              {problem.techniques &&
                problem.techniques.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 text-[10px] font-mono border border-slate-200 dark:border-zinc-700/50"
                  >
                    {tech}
                  </span>
                ))}
            </div>
          )}
        </div>
      </td>

      {/* Topic */}
      <td className="py-3 px-3 whitespace-nowrap">
        <Link
          href={`/problems?topic=${encodeURIComponent(problem.topic)}`}
          className="text-xs text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 font-mono"
        >
          {problem.topic}
        </Link>
      </td>

      {/* Companies */}
      <td className="py-3 px-3">
        <div className="flex flex-wrap gap-1 max-w-xs">
          {problem.companies && problem.companies.length > 0 ? (
            <>
              {problem.companies.slice(0, 3).map((comp) => (
                <Link
                  key={comp}
                  href={`/problems?company=${encodeURIComponent(comp)}`}
                  className="rounded border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/60 px-1.5 py-0.5 text-[10px] text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700 hover:text-slate-900 dark:hover:text-zinc-200 transition-colors"
                >
                  {comp}
                </Link>
              ))}
              {problem.companies.length > 3 && (
                <span className="text-[10px] text-slate-400 dark:text-zinc-400 px-1 self-center" title={problem.companies.slice(3).join(', ')}>
                  +{problem.companies.length - 3}
                </span>
              )}
            </>
          ) : (
            <span className="text-slate-400 dark:text-zinc-400 text-xs">—</span>
          )}
        </div>
      </td>

      {/* Status Selector */}
      <td className="py-3 px-3 whitespace-nowrap">
        <select
          value={currentStatus}
          disabled={isPending}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`text-xs font-semibold rounded-lg px-2.5 py-1 border transition-colors cursor-pointer focus:outline-none ${
            currentStatus === 'SOLVED'
              ? 'status-solved'
              : currentStatus === 'IN_PROGRESS'
              ? 'status-inprogress'
              : 'status-unsolved'
          }`}
        >
          <option value="UNSOLVED">Unsolved</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="SOLVED">Solved</option>
        </select>
      </td>

      {/* Revision Toggle */}
      <td className="py-3 px-3 text-center whitespace-nowrap">
        <button
          onClick={handleRevisionToggle}
          disabled={isPending}
          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
            needsRevision
              ? 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/50 shadow-xs'
              : 'bg-transparent text-slate-400 dark:text-zinc-400 border-transparent hover:border-slate-200 dark:hover:border-zinc-800 hover:text-slate-600 dark:hover:text-zinc-300'
          }`}
          title={needsRevision ? 'Marked for revision' : 'Mark for revision'}
        >
          <RotateCcw className={`h-3.5 w-3.5 ${needsRevision ? 'animate-spin-slow' : ''}`} />
        </button>
      </td>

      {/* Action details link */}
      <td className="py-3 px-3 text-right">
        <Link
          href={`/problems/${problem.slug}`}
          className="text-xs text-slate-400 hover:text-blue-600 dark:text-zinc-500 dark:hover:text-blue-400 p-1 transition-colors inline-flex items-center"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </td>
    </tr>
  );
}
