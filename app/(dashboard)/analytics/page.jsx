import React from 'react';
import { getAuthenticatedUser } from '@/lib/auth';
import { getAnalyticsData } from '@/lib/tracker';
import { StreakCard } from '@/components/analytics/StreakCard';
import { TopicChart } from '@/components/analytics/TopicChart';
import { CompanyCoverageChart } from '@/components/analytics/CompanyCoverageChart';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const user = await getAuthenticatedUser();
  const analytics = await getAnalyticsData(user?.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">DSA Analytics & Mastery</h1>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
          Real metrics derived from your personal problem solves, streaks, and curriculum coverage.
        </p>
      </div>

      {/* Streak & Consistency Card */}
      <StreakCard
        streak={analytics.streak}
        totalSolved={analytics.totalSolved}
        totalProblems={analytics.totalProblems}
      />

      {/* Recharts Topic Completion Chart */}
      <TopicChart data={analytics.topicBreakdown} />

      {/* Target Companies from Course Sheet */}
      <CompanyCoverageChart companies={analytics.companyInsights} />
    </div>
  );
}
