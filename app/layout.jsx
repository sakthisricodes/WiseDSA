import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: {
    default: 'WiseDSA — 375 Course Problems',
    template: '%s | WiseDSA',
  },
  description: 'WiseDSA — An educational project for learning and practicing Data Structures & Algorithms across the 375 canonical course-sheet problems.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'WiseDSA — 375 Course Problems',
    description: 'An educational project for learning and practicing Data Structures & Algorithms with full progress persistence and spaced repetition.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('dsa-tracker-theme');
                  if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `
          }}
        />
      </head>
      <body className="bg-zinc-950 text-zinc-100 min-h-screen">
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}

