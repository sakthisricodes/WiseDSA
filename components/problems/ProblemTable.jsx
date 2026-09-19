import React from 'react';
import { ProblemRow } from './ProblemRow';
import { Card } from '@/components/ui';
import { Code2 } from 'lucide-react';

export function ProblemTable({ problems = [] }) {
  if (!problems || problems.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 text-center border-zinc-800 bg-zinc-900/30">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-500 mb-3">
          <Code2 className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-zinc-200">No matching problems</h3>
        <p className="text-xs text-zinc-500 max-w-sm mt-1">
          Try adjusting your search query, topic, company, or technique filter.
        </p>
      </Card>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-zinc-800 bg-zinc-950/80 text-[11px] uppercase tracking-wider text-zinc-400">
            <tr>
              <th className="py-3 px-3 w-10 text-center font-mono">#</th>
              <th className="py-3 px-3">Problem & Techniques</th>
              <th className="py-3 px-3">Topic</th>
              <th className="py-3 px-3">Companies</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-center">Revision</th>
              <th className="py-3 px-3 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-850">
            {problems.map((problem) => (
              <ProblemRow key={problem.id} problem={problem} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-800/80 bg-zinc-950/60 px-4 py-3 text-xs text-zinc-400">
        <span>Showing {problems.length} problems</span>
        <span className="font-mono text-[11px] text-zinc-400">375 Problems from Apna College DSA Course Sheet</span>
      </div>
    </div>
  );
}
