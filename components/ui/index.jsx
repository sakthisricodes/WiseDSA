import React from 'react';
import { cn } from '@/lib/utils';

export function Button({
  className,
  variant = 'default',
  size = 'default',
  disabled,
  children,
  ...props
}) {
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-500 shadow-sm shadow-blue-900/20 active:scale-[0.98]',
    secondary:
      'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:border-zinc-700 active:scale-[0.98]',
    outline:
      'border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-zinc-700/80 dark:text-zinc-200 dark:bg-transparent dark:hover:bg-zinc-800/80 dark:hover:text-white active:scale-[0.98]',
    ghost:
      'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50',
    destructive:
      'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/30 dark:hover:bg-red-500/20',
    emerald:
      'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-600/20 dark:text-emerald-300 dark:border-emerald-500/40 dark:hover:bg-emerald-600/30 active:scale-[0.98]',
    amber:
      'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 dark:bg-amber-600/20 dark:text-amber-300 dark:border-amber-500/40 dark:hover:bg-amber-600/30 active:scale-[0.98]',
    purple:
      'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 dark:bg-purple-600/20 dark:text-purple-300 dark:border-purple-500/40 dark:hover:bg-purple-600/30 active:scale-[0.98]'
  };

  const sizes = {
    default: 'h-9 px-4 py-2 text-sm',
    sm: 'h-7 px-2.5 text-xs',
    lg: 'h-11 px-6 text-base',
    icon: 'h-8 w-8 p-0'
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default:
      'bg-slate-100 text-slate-700 border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
    primary:
      'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30 font-medium',
    emerald:
      'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-medium',
    amber:
      'bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/30 font-medium',
    purple:
      'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30 font-medium',
    red:
      'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30 font-medium',
    outline:
      'border-slate-300 text-slate-600 dark:border-zinc-700 dark:text-zinc-400 font-medium'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium tracking-wide transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 shadow-sm transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ProgressBar({ value = 0, max = 100, className, barClassName }) {
  const percentage = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0));

  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800', className)}>
      <div
        className={cn(
          'h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-blue-500 to-indigo-500',
          barClassName
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'flex h-9 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 px-3 py-1 text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500 transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}
