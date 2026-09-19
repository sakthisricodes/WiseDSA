import prisma from './prisma';
import { allDsaProblems, TOPICS } from './data';
import { getAuthenticatedUser } from './auth';

// In-memory progress cache for local testing / demo fallback when DB is connecting
const inMemoryProgress = new Map();
const inMemoryRevisionLogs = [];

/**
 * Retrieves all problems merged with the authenticated user's personal progress.
 */
export async function getProblemsWithUserProgress(userId, filters = {}) {
  const { search, topic, status, company, technique, needsRevision, sortBy = 'order' } = filters;

  let userProblemsMap = new Map();

  if (userId) {
    try {
      const records = await prisma.userProblem.findMany({
        where: { userId },
      });
      records.forEach((rec) => {
        userProblemsMap.set(rec.problemId, rec);
      });
    } catch (e) {
      // Fallback to in-memory store for guest/demo
      inMemoryProgress.forEach((val, key) => {
        if (key.startsWith(`${userId}:`)) {
          const pId = key.replace(`${userId}:`, '');
          userProblemsMap.set(pId, val);
        }
      });
    }
  }

  // Merge static problem dataset with user progress
  let problems = allDsaProblems.map((p) => {
    const userProgress = userProblemsMap.get(p.id) || {
      status: 'UNSOLVED',
      attempts: 0,
      needsRevision: false,
      revisionCount: 0,
      solvedAt: null,
      lastAttemptedAt: null,
      notes: '',
      approach: '',
      timeComplexity: '',
      spaceComplexity: ''
    };

    return {
      ...p,
      userProgress
    };
  });

  // Apply Search
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    problems = problems.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.topic.toLowerCase().includes(q) ||
        p.companies.some((c) => c.toLowerCase().includes(q)) ||
        p.techniques.some((t) => t.toLowerCase().includes(q)) ||
        (p.remarks && p.remarks.toLowerCase().includes(q))
      );
    });
  }

  // Filter by Topic
  if (topic && topic !== 'ALL') {
    problems = problems.filter((p) => p.topic.toLowerCase() === topic.toLowerCase());
  }

  // Filter by Status
  if (status && status !== 'ALL') {
    problems = problems.filter((p) => p.userProgress.status === status);
  }

  // Filter by Needs Revision
  if (needsRevision === true || needsRevision === 'true') {
    problems = problems.filter((p) => p.userProgress.needsRevision);
  }

  // Filter by Company
  if (company && company !== 'ALL') {
    problems = problems.filter((p) =>
      p.companies.some((c) => c.toLowerCase() === company.toLowerCase())
    );
  }

  // Filter by Technique
  if (technique && technique !== 'ALL') {
    problems = problems.filter((p) =>
      p.techniques.some((t) => t.toLowerCase() === technique.toLowerCase())
    );
  }

  // Sorting
  problems.sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title) || (a.orderIndex - b.orderIndex);
    }
    if (sortBy === 'topic') {
      return a.topic.localeCompare(b.topic) || (a.orderIndex - b.orderIndex);
    }
    if (sortBy === 'status') {
      const order = { SOLVED: 1, IN_PROGRESS: 2, UNSOLVED: 3 };
      const statusDiff = (order[a.userProgress.status] || 99) - (order[b.userProgress.status] || 99);
      return statusDiff !== 0 ? statusDiff : a.orderIndex - b.orderIndex;
    }
    if (sortBy === 'recently_attempted') {
      const dateA = a.userProgress.lastAttemptedAt ? new Date(a.userProgress.lastAttemptedAt).getTime() : 0;
      const dateB = b.userProgress.lastAttemptedAt ? new Date(b.userProgress.lastAttemptedAt).getTime() : 0;
      return (dateB - dateA) || (a.orderIndex - b.orderIndex);
    }
    if (sortBy === 'recently_solved') {
      const dateA = a.userProgress.solvedAt ? new Date(a.userProgress.solvedAt).getTime() : 0;
      const dateB = b.userProgress.solvedAt ? new Date(b.userProgress.solvedAt).getTime() : 0;
      return (dateB - dateA) || (a.orderIndex - b.orderIndex);
    }
    // Default by sheet order
    return a.orderIndex - b.orderIndex;
  });

  return problems;
}

/**
 * Retrieves a single problem with user progress details.
 */
export async function getProblemDetails(slugOrId, userId) {
  const problem = allDsaProblems.find((p) => p.slug === slugOrId || p.id === slugOrId);
  if (!problem) return null;

  let userProgress = {
    status: 'UNSOLVED',
    attempts: 0,
    needsRevision: false,
    revisionCount: 0,
    solvedAt: null,
    lastAttemptedAt: null,
    notes: '',
    approach: '',
    timeComplexity: '',
    spaceComplexity: ''
  };

  let revisionLogs = [];

  if (userId) {
    try {
      const record = await prisma.userProblem.findUnique({
        where: {
          userId_problemId: {
            userId,
            problemId: problem.id
          }
        },
        include: {
          revisionLogs: {
            orderBy: { revisedAt: 'desc' }
          }
        }
      });
      if (record) {
        userProgress = record;
        revisionLogs = record.revisionLogs || [];
      }
    } catch (e) {
      const inMem = inMemoryProgress.get(`${userId}:${problem.id}`);
      if (inMem) {
        userProgress = inMem;
      }
      revisionLogs = inMemoryRevisionLogs.filter(
        (l) => l.userId === userId && l.problemId === problem.id
      );
    }
  }

  return {
    ...problem,
    userProgress,
    revisionLogs
  };
}

/**
 * Calculates complete Dashboard metrics.
 */
export async function getDashboardMetrics(userId) {
  const problems = await getProblemsWithUserProgress(userId);

  const total = problems.length;
  let solved = 0;
  let inProgress = 0;
  let unsolved = 0;
  let needsRevision = 0;

  // Topic metrics
  const topicStats = {};
  TOPICS.forEach((t) => {
    topicStats[t] = { total: 0, solved: 0, inProgress: 0 };
  });

  problems.forEach((p) => {
    if (!topicStats[p.topic]) {
      topicStats[p.topic] = { total: 0, solved: 0, inProgress: 0 };
    }
    topicStats[p.topic].total++;

    if (p.userProgress.status === 'SOLVED') {
      solved++;
      topicStats[p.topic].solved++;
    } else if (p.userProgress.status === 'IN_PROGRESS') {
      inProgress++;
      topicStats[p.topic].inProgress++;
    } else {
      unsolved++;
    }

    if (p.userProgress.needsRevision) {
      needsRevision++;
    }
  });

  const completionPercentage = total > 0 ? Math.round((solved / total) * 100) : 0;

  // Recent activity: solved or attempted
  const recentActivity = problems
    .filter((p) => p.userProgress.lastAttemptedAt || p.userProgress.solvedAt)
    .sort((a, b) => {
      const timeA = Math.max(
        a.userProgress.solvedAt ? new Date(a.userProgress.solvedAt).getTime() : 0,
        a.userProgress.lastAttemptedAt ? new Date(a.userProgress.lastAttemptedAt).getTime() : 0
      );
      const timeB = Math.max(
        b.userProgress.solvedAt ? new Date(b.userProgress.solvedAt).getTime() : 0,
        b.userProgress.lastAttemptedAt ? new Date(b.userProgress.lastAttemptedAt).getTime() : 0
      );
      return timeB - timeA;
    })
    .slice(0, 6);

  // Continue learning: in-progress or next unsolved
  const continueLearning = problems
    .filter((p) => p.userProgress.status === 'IN_PROGRESS' || p.userProgress.status === 'UNSOLVED')
    .slice(0, 4);

  return {
    overview: {
      total,
      solved,
      inProgress,
      unsolved,
      needsRevision,
      completionPercentage
    },
    topicProgress: Object.entries(topicStats).map(([topic, stats]) => ({
      topic,
      total: stats.total,
      solved: stats.solved,
      inProgress: stats.inProgress,
      percentage: stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0
    })),
    recentActivity,
    continueLearning
  };
}

/**
 * Calculates analytics including streak, weekly solves, and company coverage.
 */
export async function getAnalyticsData(userId) {
  const problems = await getProblemsWithUserProgress(userId);

  const solvedProblems = problems.filter((p) => p.userProgress.status === 'SOLVED' && p.userProgress.solvedAt);

  // Solve dates set for streak calculation
  const solveDates = new Set();
  solvedProblems.forEach((p) => {
    const d = new Date(p.userProgress.solvedAt).toISOString().split('T')[0];
    solveDates.add(d);
  });

  // Calculate current & max streak
  let currentStreak = 0;
  let maxStreak = 0;
  let tempStreak = 0;

  // Check last 60 days
  const today = new Date();
  for (let i = 0; i < 60; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];

    if (solveDates.has(dateStr)) {
      tempStreak++;
      if (i === 0 || i === 1) currentStreak = Math.max(currentStreak, tempStreak);
      maxStreak = Math.max(maxStreak, tempStreak);
    } else {
      if (i > 1 && currentStreak === 0 && tempStreak > 0) {
        currentStreak = tempStreak;
      }
      tempStreak = 0;
    }
  }

  // Topic mastery distribution
  const topicBreakdown = TOPICS.map((topic) => {
    const topicProblems = problems.filter((p) => p.topic.toLowerCase() === topic.toLowerCase());
    const total = topicProblems.length;
    const solved = topicProblems.filter((p) => p.userProgress.status === 'SOLVED').length;
    return {
      topic,
      total,
      solved,
      percentage: total > 0 ? Math.round((solved / total) * 100) : 0
    };
  });

  // Company breakdown
  const companyMap = {};
  problems.forEach((p) => {
    p.companies.forEach((c) => {
      if (!companyMap[c]) {
        companyMap[c] = { company: c, total: 0, solved: 0, remaining: 0 };
      }
      companyMap[c].total++;
      if (p.userProgress.status === 'SOLVED') {
        companyMap[c].solved++;
      } else {
        companyMap[c].remaining++;
      }
    });
  });

  const companyInsights = Object.values(companyMap)
    .sort((a, b) => b.total - a.total)
    .slice(0, 15);

  return {
    streak: {
      current: currentStreak,
      longest: Math.max(currentStreak, maxStreak, solvedProblems.length > 0 ? 1 : 0),
      totalSolved: solvedProblems.length
    },
    topicBreakdown,
    companyInsights,
    totalProblems: problems.length,
    totalSolved: solvedProblems.length,
    completionRate: problems.length > 0 ? Math.round((solvedProblems.length / problems.length) * 100) : 0
  };
}

/**
 * Upserts a UserProblem progress record.
 */
export async function saveUserProgress(userId, problemId, data) {
  const now = new Date();

  const updateData = {
    ...data,
    updatedAt: now
  };

  if (data.status === 'SOLVED' && !data.solvedAt) {
    updateData.solvedAt = now;
  }
  if (data.status === 'IN_PROGRESS' || data.status === 'SOLVED') {
    updateData.lastAttemptedAt = now;
  }

  try {
    const result = await prisma.userProblem.upsert({
      where: {
        userId_problemId: {
          userId,
          problemId
        }
      },
      update: updateData,
      create: {
        userId,
        problemId,
        ...updateData
      }
    });
    return result;
  } catch (e) {
    console.error("saveUserProgress Prisma error:", e);
    // In-memory fallback
    const key = `${userId}:${problemId}`;
    const existing = inMemoryProgress.get(key) || {
      userId,
      problemId,
      status: 'UNSOLVED',
      attempts: 0,
      needsRevision: false,
      revisionCount: 0,
      notes: '',
      approach: '',
      timeComplexity: '',
      spaceComplexity: ''
    };

    const merged = {
      ...existing,
      ...updateData
    };
    inMemoryProgress.set(key, merged);
    return merged;
  }
}

/**
 * Logs a revision milestone and updates revisionCount.
 */
export async function logProblemRevision(userId, problemId, notes = '') {
  const now = new Date();

  try {
    const existing = await prisma.userProblem.findUnique({
      where: {
        userId_problemId: { userId, problemId }
      }
    });

    const newRound = (existing?.revisionCount || 0) + 1;

    const userProblem = await prisma.userProblem.upsert({
      where: {
        userId_problemId: { userId, problemId }
      },
      update: {
        revisionCount: newRound,
        needsRevision: false, // marked as revised
        lastAttemptedAt: now
      },
      create: {
        userId,
        problemId,
        revisionCount: newRound,
        needsRevision: false,
        status: 'SOLVED',
        solvedAt: now,
        lastAttemptedAt: now
      }
    });

    await prisma.revisionLog.create({
      data: {
        userId,
        userProblemId: userProblem.id,
        revisionRound: newRound,
        notes: notes || `Revision Round #${newRound} completed`,
        revisedAt: now
      }
    });

    return userProblem;
  } catch (e) {
    const key = `${userId}:${problemId}`;
    const current = inMemoryProgress.get(key) || { revisionCount: 0 };
    const newRound = (current.revisionCount || 0) + 1;
    const updated = {
      ...current,
      revisionCount: newRound,
      needsRevision: false,
      lastAttemptedAt: now
    };
    inMemoryProgress.set(key, updated);

    inMemoryRevisionLogs.push({
      id: `rev-${Date.now()}`,
      userId,
      problemId,
      revisionRound: newRound,
      notes: notes || `Revision Round #${newRound} completed`,
      revisedAt: now
    });

    return updated;
  }
}
