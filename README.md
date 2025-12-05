# ACES 15-Day Learning Challenge

A Next.js 15 application for managing a 15-day learning challenge with daily submissions, streak tracking, and leaderboards.

## Features

- 🔐 **Google Authentication** via NextAuth
- 📊 **Dashboard** with progress tracking and streak monitoring
- 🏆 **Leaderboard** with participant rankings
- 👤 **Public Profiles** for all participants
- 🛠️ **Admin Panel** for participant management
- 📱 **Responsive Design** using Shadcn UI + Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB + Prisma
- **Auth**: NextAuth v5
- **UI**: Shadcn UI + Tailwind CSS v4
- **Forms**: React Hook Form + Zod
- **State**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- MongoDB database
- Google OAuth credentials

### Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd aces-learning-challenge
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
DATABASE_URL="mongodb+srv://..."
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@example.com"
CHALLENGE_ACTIVE="true"
```

4. Generate Prisma client:

```bash
bun x prisma generate
```

5. Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

| Variable               | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `DATABASE_URL`         | MongoDB connection string                                         |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID                                            |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret                                        |
| `NEXTAUTH_SECRET`      | Secret for NextAuth session encryption                            |
| `NEXTAUTH_URL`         | Base URL of the application                                       |
| `ADMIN_EMAIL`          | Email address of the admin user                                   |
| `CHALLENGE_ACTIVE`     | Set to "true" to enable the challenge, "false" to show ended page |

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin panel
│   ├── auth/login/        # Login page
│   ├── dashboard/         # User dashboard
│   ├── home/              # Home/enrollment page
│   ├── leaderboard/       # Leaderboard
│   ├── u/[id]/           # Public user profiles
│   └── challenge-ended/   # Challenge ended page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── navbar.tsx        # Navigation component
├── lib/                   # Utilities
│   ├── prisma.ts         # Prisma client
│   ├── challenge.ts      # Challenge utilities
│   └── utils.ts          # General utilities
├── auth.ts               # NextAuth configuration
└── middleware.ts         # Route protection middleware
```

## Challenge Rules

1. **Daily Submissions**: Participants must submit what they learned each day
2. **No Skipping**: Missing a single day results in automatic disqualification
3. **Social Proof**: Each submission must include a social media link
4. **Domain Lock**: Domain cannot be changed after enrollment
5. **Sponsor Tags**: Posts must tag sponsors and ACES

## Admin Features

- View all participants and their progress
- Filter by domain or status
- Manually disqualify or reinstate participants
- Export participant data to CSV
- View analytics and statistics

## Development

### Adding New Components

Use Shadcn CLI to add components:

```bash
bun x shadcn@latest add <component-name>
```

### Database Migrations

After modifying the Prisma schema:

```bash
bun x prisma db push
```

## License

MIT
