'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('dsa-tracker-theme');
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    } else if (document.documentElement.classList.contains('light')) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('dsa-tracker-theme', nextTheme);

    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 ${className}`}
      >
        <Moon className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-amber-400 hover:text-amber-300 transition-colors" />
      ) : (
        <Moon className="h-4 w-4 text-indigo-500 hover:text-indigo-600 transition-colors" />
      )}
    </button>
  );
}
