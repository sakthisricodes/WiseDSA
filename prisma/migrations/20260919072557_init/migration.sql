-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "difficulty" TEXT,
    "companies" TEXT[],
    "rawCompanies" TEXT,
    "remarks" TEXT,
    "techniques" TEXT[],
    "isImportant" BOOLEAN NOT NULL DEFAULT false,
    "isInterviewQ" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT NOT NULL DEFAULT 'Apna College DSA Sheet',
    "url" TEXT,
    "rawText" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProblem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNSOLVED',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "needsRevision" BOOLEAN NOT NULL DEFAULT false,
    "revisionCount" INTEGER NOT NULL DEFAULT 0,
    "solvedAt" TIMESTAMP(3),
    "lastAttemptedAt" TIMESTAMP(3),
    "notes" TEXT,
    "approach" TEXT,
    "timeComplexity" TEXT,
    "spaceComplexity" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RevisionLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userProblemId" TEXT NOT NULL,
    "revisedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "revisionRound" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "RevisionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE INDEX "User_clerkUserId_idx" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_slug_key" ON "Problem"("slug");

-- CreateIndex
CREATE INDEX "Problem_topic_idx" ON "Problem"("topic");

-- CreateIndex
CREATE INDEX "Problem_slug_idx" ON "Problem"("slug");

-- CreateIndex
CREATE INDEX "UserProblem_userId_status_idx" ON "UserProblem"("userId", "status");

-- CreateIndex
CREATE INDEX "UserProblem_userId_needsRevision_idx" ON "UserProblem"("userId", "needsRevision");

-- CreateIndex
CREATE INDEX "UserProblem_problemId_idx" ON "UserProblem"("problemId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProblem_userId_problemId_key" ON "UserProblem"("userId", "problemId");

-- CreateIndex
CREATE INDEX "RevisionLog_userId_idx" ON "RevisionLog"("userId");

-- CreateIndex
CREATE INDEX "RevisionLog_userProblemId_idx" ON "RevisionLog"("userProblemId");

-- AddForeignKey
ALTER TABLE "UserProblem" ADD CONSTRAINT "UserProblem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProblem" ADD CONSTRAINT "UserProblem_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevisionLog" ADD CONSTRAINT "RevisionLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevisionLog" ADD CONSTRAINT "RevisionLog_userProblemId_fkey" FOREIGN KEY ("userProblemId") REFERENCES "UserProblem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
