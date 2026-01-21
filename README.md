# TechBro - Gamified Coding Platform

TechBro is a Duolingo-style gamified learning platform for coding. It features interactive lessons, XP tracking, streaks, leagues, and a skill tree.

## 🚀 Getting Started

This project consists of two parts:
- `api`: NestJS backend (Port 4000)
- `web`: Next.js frontend (Port 3000)

### Prerequisites
- Node.js (v18+)
- PostgreSQL (or use the SQLite default if configured)

### 1. Setup Backend (API)
```bash
cd api
npm install
npx prisma generate
npx prisma db push  # Sync schema to DB
npm run start:dev
```
The API will run on `http://localhost:4000`.

### 2. Setup Frontend (Web)
```bash
cd web
npm install
npm run dev
```
The App will run on `http://localhost:3000`.

## 🔑 Authentication Demo
To quickly test the platform without creating a new account:
1. Go to the **Login** page.
2. Click the purple **"Try Demo Account"** button.
3. You will be logged in as a "Demo User" with pre-filled XP, Level 5, and Streaks.

## 🛠 Features
- **Gamification**: XP, Levels, Hearts, Gems, Streaks.
- **Skill Tree**: Unlockable path (Variables -> Data Types -> Conditionals).
- **Interactive Lessons**: Multiple choice & code fill-in questions.
- **Leagues**: Weekly leaderboards to compete with others.
- **Social**: Feed updates and friends (UI).
- **Profile**: Avatar customization and statistics.

## 📝 Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Zustand (State), Framer Motion.
- **Backend**: NestJS, Prisma ORM, Passport JWT Auth.
- **Database**: PostgreSQL / SQLite.

## ⚠️ Notes
- Social Login (Google/GitHub) buttons are currently UI placeholders for demonstration purposes.
- Use the **Demo Account** to see the full "Diamond League" experience immediately.
