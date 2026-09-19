import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { getAuthenticatedUser } from '@/lib/auth';
import { getProblemDetails } from '@/lib/tracker';
import { ProblemDetailForm } from '@/components/problems/ProblemDetailForm';

export const dynamic = 'force-dynamic';

export default async function ProblemDetailPage({ params }) {
  const user = await getAuthenticatedUser();
  const problem = await getProblemDetails(params.id, user?.id);

  if (!problem) {
    notFound();
  }

  return (
    <div className="space-y-5">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/problems" className="hover:text-zinc-200 flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Problems
        </Link>
        <ChevronRight className="h-3 w-3 text-zinc-600" />
        <Link
          href={`/problems?topic=${encodeURIComponent(problem.topic)}`}
          className="hover:text-zinc-200"
        >
          {problem.topic}
        </Link>
        <ChevronRight className="h-3 w-3 text-zinc-600" />
        <span className="text-zinc-300 font-medium truncate max-w-xs">{problem.title}</span>
      </div>

      <ProblemDetailForm problem={problem} />
    </div>
  );
}
