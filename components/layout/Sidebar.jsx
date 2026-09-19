'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Code2,
  RotateCcw,
  BarChart3,
  Building2,
  FolderTree,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/problems', label: 'Problems', icon: Code2 },
  { href: '/revision', label: 'Revision Queue', icon: RotateCcw, highlight: true },
  { href: '/analytics', label: 'Analytics & Streak', icon: BarChart3 },
  { href: '/companies', label: 'Company Tags', icon: Building2 },
  { href: '/topics', label: 'Topics Hub', icon: FolderTree },
];

export function Sidebar({ isCollapsed, setIsCollapsed }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r border-slate-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-xl transition-all duration-300 z-30 h-screen sticky top-0',
        isCollapsed ? 'w-18' : 'w-64'
      )}
    >
      {/* Brand / Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200 dark:border-zinc-800/80">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20">
            <Terminal className="h-5 w-5" style={{ color: 'white' }} strokeWidth={2.5} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                WiseDSA
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-500/20 dark:border-blue-500/30">
                  SHEET
                </span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">375 Curriculum Problems</span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white transition-colors cursor-pointer hidden md:flex"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto">
        {!isCollapsed && (
          <p className="px-3 text-[11px] font-medium tracking-wider uppercase text-slate-400 dark:text-zinc-500">
            Navigation
          </p>
        )}
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm dark:bg-blue-600/15 dark:text-blue-400 dark:border-blue-500/30 dark:shadow-blue-950/50'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  'h-4 w-4 shrink-0 transition-transform group-hover:scale-110',
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-700 dark:text-zinc-400 dark:group-hover:text-zinc-200'
                )}
              />
              {!isCollapsed && (
                <span className="truncate flex-1">{item.label}</span>
              )}
              {!isCollapsed && item.highlight && (
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Educational Project Notice & Curriculum Sheet */}
      {!isCollapsed && (
        <div className="p-3 m-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-900/40 space-y-1">
          <div className="flex items-center gap-1.5 mb-1">
            <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Educational Project</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">
            WiseDSA is an educational project for learning and practicing Data Structures & Algorithms across 375 course-sheet problems sourced from Apna College.
          </p>
        </div>
      )}

      {/* Footer / Status */}
      <div className="border-t border-slate-200 dark:border-zinc-800/80 p-3">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          {!isCollapsed && (
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">375 Problems Loaded</span>
          )}
        </div>
      </div>
    </aside>
  );
}
