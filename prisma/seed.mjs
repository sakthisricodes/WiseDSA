/**
 * Prisma Seed Script (ES Module .mjs)
 * Seeds all 375 problems from the Apna College DSA Course Sheet into PostgreSQL.
 * Idempotent: uses slug-based upsert so it can be safely rerun multiple times.
 *
 * Run with:  node prisma/seed.mjs
 *        or: npm run seed
 */

import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

async function loadDataset() {
  // lib/data/index.js combines all four dataset parts into allDsaProblems (375 total):
  //   courseProblems  (all-problems.js)   = prob-001 … prob-177  (177 problems)
  //   part2Problems   (dataset-part2.js)  = prob-178 … prob-305  (128 problems)
  //   part3Problems   (dataset-part3.js)  = prob-306 … prob-375  ( 70 problems)
  const { courseProblems } = await import('../lib/data/all-problems.js');
  const { part2Problems }  = await import('../lib/data/dataset-part2.js');
  const { part3Problems }  = await import('../lib/data/dataset-part3.js');

  const allProblems = [
    ...(courseProblems || []),
    ...(part2Problems  || []),
    ...(part3Problems  || []),
  ];

  console.log(`  Part 1+2 (Arrays → Greedy + Stacks/Queues): ${(courseProblems || []).length}`);
  console.log(`  Part 3   (Binary Trees → Tries):            ${(part2Problems  || []).length}`);
  console.log(`  Part 4   (DP, Bit Manipulation, Seg Trees): ${(part3Problems  || []).length}`);
  console.log(`  ─────────────────────────────────────────────`);
  console.log(`  Total:                                       ${allProblems.length}`);

  return allProblems;
}

async function main() {
  console.log('🌱 DSA Tracker — Database Seed (375 problems)\n');

  // --- 1. Load dataset ---
  console.log('📂 Loading dataset from lib/data/ ...');
  const dataset = await loadDataset();
  console.log(`✅ Loaded ${dataset.length} problems.\n`);

  if (dataset.length === 0) {
    console.error('❌ Dataset is empty! Aborting seed.');
    process.exit(1);
  }

  // --- 2. Ensure demo user exists ---
  const demoUser = await prisma.user.upsert({
    where: { clerkUserId: 'demo_guest_user_123' },
    update: {},
    create: {
      clerkUserId: 'demo_guest_user_123',
      email: 'demo@dsatracker.dev',
      name: 'Portfolio Guest',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
  });
  console.log(`👤 Demo user: ${demoUser.email} (db id: ${demoUser.id})\n`);

  // --- 3. Upsert all 375 problems ---
  console.log('📝 Upserting problems into the Problem table...');

  let createdCount = 0;
  let updatedCount = 0;
  let errorCount  = 0;

  for (const item of dataset) {
    if (!item.slug) {
      console.warn(`  ⚠️  Skipping item without slug: "${item.title}"`);
      errorCount++;
      continue;
    }

    try {
      const existing = await prisma.problem.findUnique({
        where: { slug: item.slug },
        select: { id: true },
      });

      if (existing) {
        // Already in DB — update all mutable fields, keep existing DB id unchanged
        await prisma.problem.update({
          where: { slug: item.slug },
          data: {
            title:        item.title,
            topic:        item.topic,
            difficulty:   item.difficulty   ?? null,
            companies:    item.companies    || [],
            rawCompanies: item.rawCompanies ?? null,
            remarks:      item.remarks      ?? null,
            techniques:   item.techniques   || [],
            isImportant:  Boolean(item.isImportant),
            isInterviewQ: Boolean(item.isInterviewQ),
            source:       item.source       || 'Apna College DSA Sheet',
            url:          item.url          ?? null,
            rawText:      item.rawText      ?? null,
            orderIndex:   item.orderIndex   ?? 0,
          },
        });
        updatedCount++;
      } else {
        // New — create with the canonical dataset id (prob-001, prob-002, …)
        // so UserProblem.problemId references match correctly.
        await prisma.problem.create({
          data: {
            id:           item.id,
            title:        item.title,
            slug:         item.slug,
            topic:        item.topic,
            difficulty:   item.difficulty   ?? null,
            companies:    item.companies    || [],
            rawCompanies: item.rawCompanies ?? null,
            remarks:      item.remarks      ?? null,
            techniques:   item.techniques   || [],
            isImportant:  Boolean(item.isImportant),
            isInterviewQ: Boolean(item.isInterviewQ),
            source:       item.source       || 'Apna College DSA Sheet',
            url:          item.url          ?? null,
            rawText:      item.rawText      ?? null,
            orderIndex:   item.orderIndex   ?? 0,
          },
        });
        createdCount++;
      }
    } catch (e) {
      console.error(`  ❌ [${item.id}] "${item.slug}": ${e.message}`);
      errorCount++;
    }
  }

  console.log(`\n✅ Seeding complete!`);
  console.log(`   Created : ${createdCount}`);
  console.log(`   Updated : ${updatedCount}`);
  console.log(`   Errors  : ${errorCount}`);

  // --- 4. Verification ---
  const totalInDb = await prisma.problem.count();
  console.log(`\n📊 Total Problem rows in database: ${totalInDb}`);

  const expected = dataset.length; // 375
  if (totalInDb >= expected) {
    console.log(`🎉 DB count (${totalInDb}) ≥ dataset (${expected}). All good!`);
  } else {
    console.warn(`⚠️  Mismatch: DB has ${totalInDb} but dataset has ${expected}.`);
    if (errorCount > 0) {
      console.warn(`   ${errorCount} item(s) failed — check errors above.`);
    }
  }

  // --- 5. Duplicate slug check ---
  const slugGroups = await prisma.$queryRaw`
    SELECT slug, COUNT(*) as cnt
    FROM "Problem"
    GROUP BY slug
    HAVING COUNT(*) > 1
  `;
  if (Array.isArray(slugGroups) && slugGroups.length > 0) {
    console.warn(`\n⚠️  Duplicate slugs found: ${JSON.stringify(slugGroups)}`);
  } else {
    console.log(`✅ No duplicate slugs.`);
  }

  console.log('\n🚀 Database seeding finished.');
}

main()
  .catch((e) => {
    console.error('❌ Fatal error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
