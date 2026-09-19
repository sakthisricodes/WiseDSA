'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Menu, ShieldCheck, LogIn } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export function Header({ onMobileMenuToggle, user }) {
  const hasClerkKey = Boolean(
    typeof window !== 'undefined'
      ? process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_')
      : true
  );

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 md:hidden cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <Link
            href="/problems"
            className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-zinc-800/80 bg-slate-50/80 dark:bg-zinc-900/60 px-3 py-1.5 text-xs text-slate-500 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700 hover:text-slate-900 dark:hover:text-zinc-200 transition-colors w-44 sm:w-64"
          >
            <Search className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" />
            <span className="truncate">Search 375 problems...</span>
            <kbd className="ml-auto hidden rounded border border-slate-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-800/50 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-zinc-400 sm:inline-block">
              /
            </kbd>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user?.isGuest ? (
          <Badge variant="amber" className="hidden sm:inline-flex py-1 px-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-1" />
            Guest Demo Mode
          </Badge>
        ) : (
          <Badge variant="emerald" className="hidden sm:inline-flex py-1 px-2.5">
            <ShieldCheck className="h-3.5 w-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
            Authenticated
          </Badge>
        )}

        <ThemeToggle />

        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-zinc-800">
          <SignedIn>
            <div className="flex items-center gap-2.5">
              <UserButton
                afterSignOutUrl="/dashboard"
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'h-8 w-8 rounded-full ring-2 ring-blue-500/30',
                  },
                }}
              />
              <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 hidden md:inline-block max-w-[120px] truncate">
                {user?.name || 'My Account'}
              </span>
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="redirect">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold h-8 px-3.5 transition-all border border-blue-600/30 bg-white text-blue-700 hover:bg-blue-50/80 hover:border-blue-600/60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:text-white cursor-pointer shadow-xs"
              >
                <LogIn className="h-3.5 w-3.5 text-blue-600 dark:text-zinc-300" />
                <span>Sign In</span>
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
