'use server';

import { revalidatePath } from 'next/cache';
import { getAuthenticatedUser } from '@/lib/auth';
import { saveUserProgress, logProblemRevision } from '@/lib/tracker';

/**
 * Server Action: Quick-toggle problem status (UNSOLVED, IN_PROGRESS, SOLVED)
 */
export async function updateProblemStatusAction(problemId, newStatus) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const result = await saveUserProgress(user.id, problemId, {
    status: newStatus
  });

  revalidatePath('/dashboard');
  revalidatePath('/problems');
  revalidatePath('/revision');
  revalidatePath('/analytics');

  return { success: true, data: result };
}

/**
 * Server Action: Toggle "Needs Revision" flag
 */
export async function toggleRevisionAction(problemId, needsRevision) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const result = await saveUserProgress(user.id, problemId, {
    needsRevision: Boolean(needsRevision)
  });

  revalidatePath('/dashboard');
  revalidatePath('/problems');
  revalidatePath('/revision');

  return { success: true, data: result };
}

/**
 * Server Action: Save personal notes, approach, and complexities
 */
export async function saveProblemNotesAction(problemId, details) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const result = await saveUserProgress(user.id, problemId, {
    notes: details.notes || '',
    approach: details.approach || '',
    timeComplexity: details.timeComplexity || '',
    spaceComplexity: details.spaceComplexity || '',
    status: details.status || undefined,
    attempts: typeof details.attempts === 'number' ? details.attempts : undefined,
    needsRevision: typeof details.needsRevision === 'boolean' ? details.needsRevision : undefined
  });

  revalidatePath(`/problems/${problemId}`);
  revalidatePath('/problems');
  revalidatePath('/dashboard');
  revalidatePath('/revision');

  return { success: true, data: result };
}

/**
 * Server Action: Mark problem as revised and record revision log milestone
 */
export async function markProblemRevisedAction(problemId, revisionNotes = '') {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const result = await logProblemRevision(user.id, problemId, revisionNotes);

  revalidatePath('/revision');
  revalidatePath('/dashboard');
  revalidatePath('/problems');
  revalidatePath(`/problems/${problemId}`);

  return { success: true, data: result };
}

/**
 * Server Action: Increment attempt count
 */
export async function incrementProblemAttemptsAction(problemId, currentAttempts = 0) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const result = await saveUserProgress(user.id, problemId, {
    attempts: currentAttempts + 1
  });

  revalidatePath(`/problems/${problemId}`);
  revalidatePath('/problems');

  return { success: true, data: result };
}
