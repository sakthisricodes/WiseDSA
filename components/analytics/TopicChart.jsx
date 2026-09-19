'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card } from '@/components/ui';
import { Layers } from 'lucide-react';

export function TopicChart({ data = [] }) {
  const chartData = data.map((d) => ({
    name: d.topic.length > 12 ? d.topic.slice(0, 10) + '...' : d.topic,
    fullName: d.topic,
    Solved: d.solved,
    Remaining: d.total - d.solved,
    total: d.total
  }));

  return (
    <Card className="p-6 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-zinc-200">
            Topic Completion & Solved vs Remaining
          </h3>
        </div>
        <span className="text-xs text-slate-500 dark:text-zinc-500 font-mono">16 Curriculum Topics</span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" strokeOpacity={0.4} vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              angle={-25}
              textAnchor="end"
            />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 shadow-xl text-xs space-y-1">
                      <p className="font-bold text-slate-900 dark:text-white">{item.fullName}</p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium">Solved: {item.Solved}</p>
                      <p className="text-slate-500 dark:text-zinc-400">Total: {item.total}</p>
                      <p className="text-blue-600 dark:text-blue-400 font-mono font-medium">
                        {Math.round((item.Solved / item.total) * 100)}% Complete
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              iconType="circle"
            />
            <Bar dataKey="Solved" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Remaining" stackId="a" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
