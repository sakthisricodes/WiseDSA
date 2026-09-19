# WiseDSA — 375 Course Problems Tracker

**WiseDSA — An educational project for learning and practicing Data Structures & Algorithms.**

A full-stack algorithmic problem tracker and spaced repetition management platform designed for the **Apna College DSA Course Sheet** (375 canonical problems across 16 core curriculum topics).

Built with **Next.js 14 (App Router)**, **Clerk Authentication**, **Supabase PostgreSQL**, **Prisma ORM**, and **Tailwind CSS**.

---

## ✨ Features

- **375 Canonical Problems**: Full coverage of the 375 DSA course curriculum structured into 16 algorithmic domains (Arrays, Binary Trees, Dynamic Programming, Graphs, Tries, etc.).
- **Multi-Tenant User Isolation**: Real multi-user authentication powered by Clerk and PostgreSQL. User progress, notes, approaches, and revision logs are strictly isolated per account.
- **Spaced Repetition & Revision Queue**: Spaced review workflow with milestone tracking, revision rounds, and time/space complexity notes.
- **Advanced Filtering & Search**: Instant full-text search, topic filters, company interview frequency tags, and algorithmic technique tags.
- **Interactive Analytics**: Real-time solve metrics, consistency streaks, and topic completion progress visualizations.
- **Polished Light & Dark Modes**: Accessible design system with smooth theme switching and responsive layout.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (React 18, App Router, Server Actions)
- **Authentication**: Clerk (`@clerk/nextjs`) with middleware session verification
- **Database**: PostgreSQL (Supabase / Neon / Self-hosted)
- **ORM**: Prisma Client & Prisma Migrate
- **Styling**: Tailwind CSS & Lucide Icons
- **Deployment**: Vercel

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd dsa-tracker
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```env
# Supabase PostgreSQL connection string
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?schema=public"

# Clerk Authentication Keys (from https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Clerk Route Handlers
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"
```

### 3. Initialize & Seed Database

```bash
# Push schema to PostgreSQL database
npx prisma db push

# Explicitly seed all 375 canonical problems into PostgreSQL
npm run seed
```

> **Note on Production Deployment**: Production seeding is deliberately configured as an explicit manual command (`npm run seed` or `npx prisma db seed`) so that CI/CD deployments do not unexpectedly overwrite production database tables.

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

---

## 🚢 Deployment to Vercel

1. **Push to GitHub**: Push the repository to your GitHub account.
2. **Import Project into Vercel**: Connect your GitHub repository to Vercel.
3. **Set Environment Variables**:
   - `DATABASE_URL` (Use Supabase connection pooler URL on port 6543)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` (`/sign-in`)
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL` (`/sign-up`)
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` (`/dashboard`)
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` (`/dashboard`)
4. **Deploy**: Build command is automatically `next build` with `postinstall: "prisma generate"`.

---

## 🔒 Security & Data Isolation

- All user mutations use Next.js Server Actions with strict server-side `auth()` validation.
- Client requests cannot pass arbitrary user IDs; queries and updates are constrained by `userId` in `prisma.userProblem` composite keys (`userId_problemId`).
- Clerk secret keys are never bundled in client-side code.
