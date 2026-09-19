const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting DSA Tracker Database Seeding...');

  // Try reading JSON dataset
  let dataset = [];
  const jsonPath = path.join(__dirname, '../data/dsa-problems.json');
  if (fs.existsSync(jsonPath)) {
    dataset = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  }

  if (!dataset || dataset.length === 0) {
    console.log('Loading dataset from module...');
    // Fallback: load compiled dataset
  }

  console.log(`Found ${dataset.length} problems to seed/sync.`);

  // 1. Create or ensure Demo / Default User exists
  const demoUser = await prisma.user.upsert({
    where: { clerkUserId: 'demo_guest_user_123' },
    update: {},
    create: {
      clerkUserId: 'demo_guest_user_123',
      email: 'demo@dsatracker.dev',
      name: 'Portfolio Guest',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    }
  });

  console.log(`👤 Demo User verified: ${demoUser.email} (${demoUser.id})`);

  // 2. Idempotently upsert each Problem record
  let createdCount = 0;
  let updatedCount = 0;

  for (const item of dataset) {
    const existing = await prisma.problem.findUnique({
      where: { slug: item.slug }
    });

    if (existing) {
      await prisma.problem.update({
        where: { slug: item.slug },
        data: {
          title: item.title,
          topic: item.topic,
          difficulty: item.difficulty,
          companies: item.companies || [],
          rawCompanies: item.rawCompanies,
          remarks: item.remarks,
          techniques: item.techniques || [],
          isImportant: item.isImportant || false,
          isInterviewQ: item.isInterviewQ || false,
          source: item.source || "Apna College DSA Sheet",
          url: item.url,
          rawText: item.rawText,
          orderIndex: item.orderIndex
        }
      });
      updatedCount++;
    } else {
      await prisma.problem.create({
        data: {
          id: item.id,
          title: item.title,
          slug: item.slug,
          topic: item.topic,
          difficulty: item.difficulty,
          companies: item.companies || [],
          rawCompanies: item.rawCompanies,
          remarks: item.remarks,
          techniques: item.techniques || [],
          isImportant: item.isImportant || false,
          isInterviewQ: item.isInterviewQ || false,
          source: item.source || "Apna College DSA Sheet",
          url: item.url,
          rawText: item.rawText,
          orderIndex: item.orderIndex
        }
      });
      createdCount++;
    }
  }

  console.log(`✅ Problems synchronization complete: ${createdCount} created, ${updatedCount} updated.`);
  console.log('🚀 Database seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
