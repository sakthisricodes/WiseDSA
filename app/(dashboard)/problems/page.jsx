import React from 'react';
import { getAuthenticatedUser } from '@/lib/auth';
import { getProblemsWithUserProgress } from '@/lib/tracker';
import { getAllCompanies, getAllTechniques } from '@/lib/data';
import { ProblemFilters } from '@/components/problems/ProblemFilters';
import { ProblemTable } from '@/components/problems/ProblemTable';

export const dynamic = 'force-dynamic';

export default async function ProblemsPage({ searchParams }) {
  const user = await getAuthenticatedUser();

  const filters = {
    search: searchParams?.search,
    topic: searchParams?.topic,
    status: searchParams?.status,
    company: searchParams?.company,
    technique: searchParams?.technique,
    needsRevision: searchParams?.needsRevision,
    sortBy: searchParams?.sortBy
  };

  const problems = await getProblemsWithUserProgress(user?.id, filters);
  const companies = getAllCompanies();
  const techniques = getAllTechniques();

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Problem Explorer</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Search, filter, and track all 375 problems from the Apna College DSA Course Sheet by topic, company tag, and algorithmic technique.
          </p>
        </div>
      </div>

      <ProblemFilters companies={companies} techniques={techniques} />

      <ProblemTable problems={problems} />
    </div>
  );
}
