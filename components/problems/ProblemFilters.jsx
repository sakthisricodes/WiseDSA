'use client';

import React, { useState, useEffect, useTransition, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Search,
  Filter,
  X,
  RotateCcw,
  Building2,
  Tag,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { Input, Button } from '@/components/ui';
import { TOPICS } from '@/lib/data';

export function ProblemFilters({ companies = [], techniques = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const searchParam = searchParams.get('search') || '';
  const topic = searchParams.get('topic') || 'ALL';
  const status = searchParams.get('status') || 'ALL';
  const company = searchParams.get('company') || 'ALL';
  const technique = searchParams.get('technique') || 'ALL';
  const needsRevision = searchParams.get('needsRevision') === 'true';
  const sortBy = searchParams.get('sortBy') || 'order';

  // Fast, synchronous local state for instant typing responsiveness
  const [searchValue, setSearchValue] = useState(searchParam);

  // Sync local search input value if URL parameter changes externally (e.g. Back/Forward/Clear)
  useEffect(() => {
    setSearchValue(searchParam);
  }, [searchParam]);

  const updateParam = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== 'ALL' && value !== false) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams]
  );

  // Handle immediate local typing state update + background URL transition sync
  const handleSearchChange = (e) => {
    const nextValue = e.target.value;
    setSearchValue(nextValue); // Instant 0ms input render

    // Debounce URL update slightly to avoid rapid router navigations per frame
    const params = new URLSearchParams(searchParams.toString());
    if (nextValue && nextValue.trim()) {
      params.set('search', nextValue);
    } else {
      params.delete('search');
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const clearSearch = () => {
    setSearchValue('');
    updateParam('search', '');
  };

  const clearFilters = () => {
    setSearchValue('');
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  const hasActiveFilters =
    searchValue ||
    topic !== 'ALL' ||
    status !== 'ALL' ||
    company !== 'ALL' ||
    technique !== 'ALL' ||
    needsRevision ||
    sortBy !== 'order';

  return (
    <div className="space-y-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 backdrop-blur-sm shadow-sm">
      {/* Top Search & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-zinc-500" />
          <Input
            placeholder="Search problems by name, company, or technique hint..."
            value={searchValue}
            onChange={handleSearchChange}
            className="pl-9 h-9 bg-white dark:bg-zinc-950/60 border-slate-200 dark:border-zinc-800 text-xs"
          />
          {searchValue && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
              title="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Quick Revision filter toggle */}
        <Button
          variant={needsRevision ? 'purple' : 'outline'}
          size="sm"
          onClick={() => updateParam('needsRevision', !needsRevision)}
          className={`text-xs gap-1.5 shrink-0 h-9 px-3 ${
            needsRevision
              ? 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-600/20 dark:text-purple-300 dark:border-purple-500/40'
              : 'border-slate-200 dark:border-zinc-800'
          }`}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Needs Revision
        </Button>

        {/* Clear filters button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white shrink-0 gap-1.5 h-9 px-2.5"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </Button>
        )}
      </div>

      {/* 5 Clean, Responsive Filter Dropdowns in a unified grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
        {/* 1. Topic filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1 h-3.5 truncate">
            <Layers className="h-3 w-3 shrink-0" /> Topic
          </label>
          <select
            value={topic}
            onChange={(e) => updateParam('topic', e.target.value)}
            className="w-full h-9 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-2.5 py-1 text-xs text-slate-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
          >
            <option value="ALL">All Topics ({TOPICS.length})</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Status filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1 h-3.5 truncate">
            <Filter className="h-3 w-3 shrink-0" /> Status
          </label>
          <select
            value={status}
            onChange={(e) => updateParam('status', e.target.value)}
            className={`w-full h-9 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 border transition-colors cursor-pointer ${
              status === 'SOLVED'
                ? 'status-solved'
                : status === 'IN_PROGRESS'
                ? 'status-inprogress'
                : status === 'UNSOLVED'
                ? 'status-unsolved'
                : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-200'
            }`}
          >
            <option value="ALL">All Statuses</option>
            <option value="SOLVED">Solved</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="UNSOLVED">Unsolved</option>
          </select>
        </div>

        {/* 3. Company filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1 h-3.5 truncate">
            <Building2 className="h-3 w-3 shrink-0" /> Company
          </label>
          <select
            value={company}
            onChange={(e) => updateParam('company', e.target.value)}
            className="w-full h-9 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-2.5 py-1 text-xs text-slate-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
          >
            <option value="ALL">All Companies</option>
            {companies.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.count})
              </option>
            ))}
          </select>
        </div>

        {/* 4. Technique filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1 h-3.5 truncate">
            <Tag className="h-3 w-3 shrink-0" /> Technique
          </label>
          <select
            value={technique}
            onChange={(e) => updateParam('technique', e.target.value)}
            className="w-full h-9 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-2.5 py-1 text-xs text-slate-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
          >
            <option value="ALL">All Techniques</option>
            {techniques.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name} ({t.count})
              </option>
            ))}
          </select>
        </div>

        {/* 5. Sort order */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1 h-3.5 truncate">
            <ArrowUpDown className="h-3 w-3 shrink-0" /> Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => updateParam('sortBy', e.target.value)}
            className="w-full h-9 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-2.5 py-1 text-xs text-slate-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
          >
            <option value="order">Sheet Index</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="topic">Topic</option>
            <option value="status">Status</option>
            <option value="recently_solved">Recently Solved</option>
            <option value="recently_attempted">Recently Attempted</option>
          </select>
        </div>
      </div>
    </div>
  );
}
