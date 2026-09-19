'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-6 text-center space-y-4 border-red-500/30 bg-white dark:bg-zinc-900 shadow-lg">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
          <AlertTriangle className="h-6 w-6" />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Something went wrong
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            {error?.message || 'An unexpected error occurred while processing your request.'}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2.5 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => reset()}
            className="text-xs gap-1.5 border-slate-200 dark:border-zinc-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Try Again
          </Button>

          <Link href="/dashboard">
            <Button size="sm" className="text-xs gap-1.5">
              <Home className="h-3.5 w-3.5" />
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
