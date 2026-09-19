import React from 'react';
import Link from 'next/link';
import { FileQuestion, ArrowLeft, Home, Code2 } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-6 text-center space-y-4 border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
          <FileQuestion className="h-6 w-6" />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">404 Error</span>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            The problem or curriculum route you are looking for does not exist or may have been moved.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2.5 pt-2">
          <Link href="/problems">
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 border-slate-200 dark:border-zinc-700"
            >
              <Code2 className="h-3.5 w-3.5" />
              Browse 375 Problems
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button size="sm" className="text-xs gap-1.5">
              <Home className="h-3.5 w-3.5" />
              Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
