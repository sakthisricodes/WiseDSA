'use client';

import React from 'react';
import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { Terminal, ArrowLeft } from 'lucide-react';

/**
 * Same appearance logic as sign-in page — read active theme from <html> and
 * build the Clerk `appearance` config accordingly.
 */
function buildAppearance(isDark) {
  if (isDark) {
    return {
      variables: {
        colorBackground: '#18181b',
        colorInputBackground: '#09090b',
        colorAlphaShade: '#09090b',
        colorText: '#f4f4f5',
        colorTextSecondary: '#a1a1aa',
        colorTextOnPrimaryBackground: '#ffffff',
        colorInputText: '#f4f4f5',
        colorNeutral: '#3f3f46',
        colorPrimary: '#2563eb',
        colorDanger: '#f87171',
        colorSuccess: '#34d399',
        borderRadius: '0.5rem',
        fontFamily: 'inherit',
        fontSize: '0.8125rem',
      },
      elements: {
        rootBox: 'w-full flex justify-center',
        card: 'bg-zinc-900 border border-zinc-800 shadow-xl rounded-2xl',
        socialButtonsBlockButton:
          'bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 transition-colors rounded-lg',
        socialButtonsBlockButtonText: 'text-zinc-200 font-medium text-xs',
        socialButtonsBlockButtonArrow: 'text-zinc-400',
        dividerLine: 'bg-zinc-700',
        dividerText: 'text-zinc-500 text-xs font-medium',
        formFieldLabel: 'text-zinc-300 text-xs font-medium',
        formFieldInput:
          'bg-zinc-950 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
        formButtonPrimary:
          'bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg shadow-sm transition-all active:scale-[0.98]',
        footer: 'bg-zinc-900 border-t border-zinc-800 rounded-b-2xl',
        footerAction: 'bg-zinc-900',
        footerActionText: 'text-zinc-400 text-xs',
        footerActionLink: 'text-blue-400 hover:text-blue-300 text-xs font-medium hover:underline',
        identityPreview: 'bg-zinc-950 border border-zinc-800 rounded-lg',
        identityPreviewText: 'text-zinc-200 text-xs font-medium',
        identityPreviewEditButton: 'text-blue-400 text-xs font-medium hover:underline',
        formFieldSuccessText: 'text-emerald-400 text-xs',
        formFieldErrorText: 'text-red-400 text-xs',
        alertText: 'text-red-400 text-xs',
        formFieldAction: 'text-blue-400 text-xs hover:underline',
        headerTitle: 'text-zinc-100 font-bold tracking-tight',
        headerSubtitle: 'text-zinc-400 text-xs',
      },
    };
  }

  return {
    variables: {
      colorBackground: '#ffffff',
      colorInputBackground: '#ffffff',
      colorAlphaShade: '#f8fafc',
      colorText: '#0f172a',
      colorTextSecondary: '#64748b',
      colorTextOnPrimaryBackground: '#ffffff',
      colorInputText: '#0f172a',
      colorNeutral: '#cbd5e1',
      colorPrimary: '#2563eb',
      colorDanger: '#dc2626',
      colorSuccess: '#059669',
      borderRadius: '0.5rem',
      fontFamily: 'inherit',
      fontSize: '0.8125rem',
    },
    elements: {
      rootBox: 'w-full flex justify-center',
      card: 'bg-white border border-slate-200 shadow-sm rounded-2xl',
      socialButtonsBlockButton:
        'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors rounded-lg',
      socialButtonsBlockButtonText: 'text-slate-700 font-medium text-xs',
      dividerLine: 'bg-slate-200',
      dividerText: 'text-slate-400 text-xs font-medium',
      formFieldLabel: 'text-slate-700 text-xs font-medium',
      formFieldInput:
        'bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
      formButtonPrimary:
        'bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg shadow-sm transition-all active:scale-[0.98]',
      footer: 'bg-white border-t border-slate-100 rounded-b-2xl',
      footerAction: 'bg-white',
      footerActionText: 'text-slate-500 text-xs',
      footerActionLink: 'text-blue-600 hover:text-blue-700 text-xs font-medium hover:underline',
      identityPreview: 'bg-slate-50 border border-slate-200 rounded-lg',
      identityPreviewText: 'text-slate-800 text-xs font-medium',
      identityPreviewEditButton: 'text-blue-600 text-xs font-medium hover:underline',
      formFieldSuccessText: 'text-emerald-600 text-xs',
      formFieldErrorText: 'text-red-600 text-xs',
      alertText: 'text-red-600 text-xs',
      formFieldAction: 'text-blue-600 text-xs hover:underline',
      headerTitle: 'text-slate-900 font-bold tracking-tight',
      headerSubtitle: 'text-slate-500 text-xs',
    },
  };
}

export default function SignUpPage() {
  const isDark =
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : true;

  const appearance = buildAppearance(isDark);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-50 dark:bg-zinc-950">
      <div className="w-full max-w-md flex flex-col items-center space-y-5">

        {/* Brand header */}
        <div className="w-full text-center space-y-2">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors mb-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Sign In
          </Link>
          <div className="flex items-center justify-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-xs"
              aria-hidden="true"
            >
              <Terminal className="h-4 w-4" style={{ color: 'white' }} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              WiseDSA
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Learn. Practice. Improve.
          </p>
        </div>

        {/* Clerk Auth Card */}
        <div className="w-full">
          <SignUp appearance={appearance} />
        </div>

        {/* Educational Notice */}
        <p className="text-center text-[11px] text-slate-400 dark:text-zinc-600 max-w-xs mx-auto leading-relaxed">
          WiseDSA — An educational project for learning and practicing Data Structures &amp; Algorithms.
        </p>
      </div>
    </div>
  );
}
