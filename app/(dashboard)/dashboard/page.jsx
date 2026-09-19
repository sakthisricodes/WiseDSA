import React from 'react';
import { getAuthenticatedUser } from '@/lib/auth';
import { getDashboardMetrics } from '@/lib/tracker';
import { MetricCards } from '@/components/dashboard/MetricCards';
import { TopicProgressBars } from '@/components/dashboard/TopicProgressBars';
import { ContinueLearning } from '@/components/dashboard/ContinueLearning';
import { RecentActivityList } from '@/components/dashboard/RecentActivityList';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();
  const metrics = await getDashboardMetrics(user?.id);

  return (
    <div className="space-y-6">
      {/* Header title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Curriculum Dashboard</h1>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
          Real-time tracking of 375 problems from the Apna College DSA Course Sheet.
        </p>
      </div>

      {/* Main Metric Cards */}
      <MetricCards overview={metrics.overview} />

      {/* Grid: Continue Learning & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContinueLearning problems={metrics.continueLearning} />
        <RecentActivityList activities={metrics.recentActivity} />
      </div>

      {/* Topic breakdown with full numbers */}
      <TopicProgressBars topicProgress={metrics.topicProgress} />
    </div>
  );
}
