import { auth, currentUser } from '@clerk/nextjs/server';
import prisma from './prisma';

// Fallback guest user for isolated local demo when Clerk keys are not yet configured
const DEMO_GUEST_USER = {
  id: 'guest_user_id_demo',
  clerkUserId: 'demo_guest_user_123',
  email: 'guest@dsatracker.dev',
  name: 'Demo Developer',
  imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  isGuest: true
};

/**
 * Resolves the currently authenticated user.
 * In production: strictly verifies Clerk JWT token and syncs with PostgreSQL.
 * In local development/demo: safely falls back to demo guest user when Clerk keys are absent.
 */
export async function getAuthenticatedUser() {
  const isClerkConfigured =
    Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_')) &&
    Boolean(process.env.CLERK_SECRET_KEY && process.env.CLERK_SECRET_KEY.startsWith('sk_'));

  if (!isClerkConfigured) {
    // Isolated guest demo mode
    try {
      const user = await prisma.user.upsert({
        where: {
          clerkUserId: DEMO_GUEST_USER.clerkUserId
        },
        update: {},
        create: {
          clerkUserId: DEMO_GUEST_USER.clerkUserId,
          email: DEMO_GUEST_USER.email,
          name: DEMO_GUEST_USER.name,
          imageUrl: DEMO_GUEST_USER.imageUrl
        }
      });

      return { ...user, isGuest: true };
    } catch (dbError) {
      console.warn('Database error while creating demo user:', dbError);
      return DEMO_GUEST_USER;
    }
  }

  try {
    const { userId } = auth();
    if (!userId) {
      return {
        id: DEMO_GUEST_USER.id,
        clerkUserId: DEMO_GUEST_USER.clerkUserId,
        email: null,
        name: 'Guest Explorer',
        imageUrl: null,
        isGuest: true
      };
    }

    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress || null;
    const name = clerkUser ? `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() : null;
    const imageUrl = clerkUser?.imageUrl || null;

    try {
      // Sync or retrieve user from database
      const user = await prisma.user.upsert({
        where: { clerkUserId: userId },
        update: {
          email: email || undefined,
          name: name || undefined,
          imageUrl: imageUrl || undefined,
        },
        create: {
          clerkUserId: userId,
          email,
          name: name || 'DSA Developer',
          imageUrl
        }
      });
      return { ...user, isGuest: false };
    } catch (dbError) {
      console.warn('Database error while fetching user, using Clerk context:', dbError);
      return {
        id: userId,
        clerkUserId: userId,
        email,
        name: name || 'DSA Developer',
        imageUrl,
        isGuest: false
      };
    }
  } catch (authError) {
    console.warn('Clerk auth resolution error:', authError);
    return null;
  }
}
