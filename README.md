# ACES 15-Day Learning Challenge

A Next.js 15 application for managing ACES TechFest's 15-day learning challenge with daily submissions, streak tracking, and leaderboards.

## What is This?

The ACES 15-Day Learning Challenge is an educational initiative run during ACES TechFest events. This web application helps manage and track participants who commit to learning something new every day for 15 consecutive days.

**How it works:**
- Participants enroll by selecting a learning domain (Web Dev, AI/ML, Mobile Dev, etc.)
- Each day, they must submit what they learned along with social proof (LinkedIn/Twitter post)
- The system tracks streaks and automatically disqualifies participants who miss a day
- A leaderboard showcases active participants and their progress
- Admins can manage participants, view analytics, and export data

This platform makes it easy to run similar learning challenges for future TechFest events or other educational initiatives.

## Features

- 🔐 **Google Authentication** via NextAuth
- 📊 **Dashboard** with progress tracking and streak monitoring
- 🏆 **Leaderboard** with participant rankings
- 👤 **Public Profiles** for all participants
- 🛠️ **Admin Panel** for participant management
- 📱 **Responsive Design** using Shadcn UI + Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL (Neon) + Drizzle ORM
- **Auth**: NextAuth v5 (Google OAuth)
- **UI**: Shadcn UI + Tailwind CSS v4
- **Forms**: React Hook Form + Zod
- **State**: TanStack Query
- **Runtime**: Node.js or Bun

## Getting Started

### Prerequisites

- **Node.js 18+** or **Bun** (recommended)
- **PostgreSQL database** (we recommend [Neon](https://neon.tech) for free serverless PostgreSQL)
- **Google OAuth credentials** (for authentication)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/aceserc/15-days-learning-challenge.git
cd 15-days-learning-challenge
```

2. **Install dependencies:**

Using Bun (recommended):
```bash
bun install
```

Or using npm:
```bash
npm install
```

3. **Set up your database:**

Create a PostgreSQL database. We recommend using [Neon](https://neon.tech):
- Sign up for a free account at [neon.tech](https://neon.tech)
- Create a new project
- Copy the connection string (it will look like `postgresql://user:password@host/database`)

4. **Set up Google OAuth:**

To enable Google authentication:
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select an existing one
- Navigate to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "OAuth 2.0 Client ID"
- Configure the OAuth consent screen if prompted
- Set application type to "Web application"
- Add authorized redirect URIs:
  - `http://localhost:3000/api/auth/callback/google` (for local development)
  - Your production URL + `/api/auth/callback/google` (for deployment)
- Copy the Client ID and Client Secret

5. **Set up environment variables:**

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following variables to `.env`:

```env
# Database
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-a-random-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Admin Configuration
ADMIN_EMAIL="your-admin@email.com"

# Challenge Configuration
CHALLENGE_ACTIVE="true"
```

**How to generate NEXTAUTH_SECRET:**
```bash
# Using OpenSSL
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

6. **Initialize the database:**

Push the database schema to your PostgreSQL database:

```bash
bun run db
```

This will generate the Drizzle schema and push it to your database.

7. **Run the development server:**

```bash
bun dev
```

Or with npm:
```bash
npm run dev
```

8. **Open the application:**

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

9. **Login as admin:**

Sign in with the Google account matching the email you set in `ADMIN_EMAIL`. This account will have access to the admin panel at `/feed`.

## Environment Variables

All environment variables should be defined in a `.env` file in the root directory.

### Required Variables

| Variable               | Description                                                                          | Example                                                |
| ---------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `DATABASE_URL`         | PostgreSQL connection string from your database provider (Neon, Supabase, etc.)     | `postgresql://user:pass@host/db?sslmode=require`       |
| `GOOGLE_CLIENT_ID`     | OAuth 2.0 Client ID from Google Cloud Console                                       | `123456.apps.googleusercontent.com`                    |
| `GOOGLE_CLIENT_SECRET` | OAuth 2.0 Client Secret from Google Cloud Console                                   | `GOCSPX-xxxxxxxxxxxxx`                                 |
| `NEXTAUTH_SECRET`      | Random secret key for encrypting session tokens (generate with `openssl rand -base64 32`) | `your-32-character-random-string`                   |
| `NEXTAUTH_URL`         | Base URL of your application                                                         | `http://localhost:3000` (local) or your deployed URL   |
| `ADMIN_EMAIL`          | Google account email that will have admin access                                     | `admin@aceserc.org`                                    |

### Optional Variables

| Variable           | Description                                                                   | Default | Options         |
| ------------------ | ----------------------------------------------------------------------------- | ------- | --------------- |
| `CHALLENGE_ACTIVE` | Controls whether the challenge is active. When "false", shows ended page     | `"true"` | `"true"`, `"false"` |

### Setting up Environment Variables for Production

For production deployment (Vercel, Netlify, etc.):

1. Add all environment variables in your hosting platform's dashboard
2. Update `NEXTAUTH_URL` to your production domain (e.g., `https://yourdomain.com`)
3. Add your production callback URL to Google OAuth settings: `https://yourdomain.com/api/auth/callback/google`

## Project Structure

```
src/
├── app/                      # Next.js app router pages
│   ├── (pages)/             # Page routes
│   │   ├── (dash)/          # Dashboard layout group
│   │   │   ├── (dashboard)/ # Protected dashboard pages
│   │   │   ├── feed/        # Admin feed/panel
│   │   │   ├── leaderboard/ # Public leaderboard
│   │   │   ├── participate/ # Enrollment page
│   │   │   ├── profile/     # User profile
│   │   │   └── submissions/ # Submission history
│   │   ├── auth/            # Authentication pages
│   │   │   └── login/       # Login page
│   │   ├── challenge-ended/ # Challenge ended page
│   │   └── guidelines/      # Challenge guidelines
│   ├── api/                 # API routes
│   │   └── auth/            # NextAuth endpoints
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── components/              # React components
│   └── ui/                  # Shadcn UI components
├── content/                 # Configuration and content
│   ├── config.ts           # App configuration (name, logo, links)
│   ├── data.ts             # Challenge data (dates, TechFest version)
│   ├── domains.ts          # Learning domains list
│   └── sponsor.ts          # Sponsor information
├── db/                      # Database layer
│   ├── schema/             # Drizzle schema definitions
│   │   ├── auth.ts         # NextAuth tables
│   │   ├── leaderboard.tsx # Leaderboard view
│   │   ├── participants.ts # Participants table
│   │   ├── submissions.ts  # Submissions table
│   │   └── votes.ts        # Voting system
│   └── index.ts            # Database client
├── hooks/                   # Custom React hooks
├── lib/                     # Utility libraries
│   ├── auth.ts             # NextAuth configuration
│   ├── challenge.ts        # Challenge utilities
│   ├── event.ts            # Event date calculations
│   └── utils.ts            # General utilities
├── providers/               # React context providers
├── queries/                 # TanStack Query hooks and API calls
└── middleware.ts           # Route protection middleware
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

### Running Development Server

```bash
bun dev
# or
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
bun run build
# or
npm run build
```

### Starting Production Server

```bash
bun start
# or
npm start
```

### Code Quality

**Linting:**
```bash
bun run lint
# or
npm run lint
```

**Formatting:**
```bash
bun run format
# or
npm run format
```

This project uses [Biome](https://biomejs.dev/) for fast linting and formatting.

### Adding New UI Components

Use Shadcn CLI to add components:

```bash
bun x shadcn@latest add <component-name>
```

Example:
```bash
bun x shadcn@latest add button
bun x shadcn@latest add dialog
```

### Database Migrations

After modifying the Drizzle schema in `src/db/schema/`:

```bash
bun run db
```

This command:
1. Generates migration files in the `drizzle` directory
2. Pushes the schema changes to your database

### Working with the Database

**View your database:**
- Use [Neon Console](https://console.neon.tech) for Neon databases
- Or use Drizzle Studio:
  ```bash
  bun x drizzle-kit studio
  ```

**Reset database (⚠️ Warning: deletes all data):**
```bash
bun x drizzle-kit drop
bun run db
```

## How to Modify for the Next TechFest Version

When running this challenge for a future TechFest event, follow these steps:

### 1. Update Challenge Dates and Version

Edit `src/content/data.ts`:

```typescript
export const CHALLANGE_DATA = {
  startDate: new Date("2026-01-15"),  // Update to new start date
  techfestId: "v9.0",                  // Update version number
  durationInDays: 15,                  // Keep as 15 or change duration
  canSubmitTillDays: 16,              // Usually duration + 1
  postHashtags: ["#aces", "#alc", "#techfest"], // Update hashtags if needed
};
```

### 2. Update App Configuration (Optional)

Edit `src/content/config.ts` if you want to change branding:

```typescript
export const APP_CONFIG = {
  logo: "/logo.png",                    // Path to logo in public folder
  name: "ACES",                         // Organization name
  href: "https://aceserc.org",         // Organization website
  linkedinUrl: "https://www.linkedin.com/company/acesioe-pc"
};
```

### 3. Update Learning Domains (Optional)

Edit `src/content/domains.ts` to add, remove, or modify learning domains:

```typescript
export const DOMAINS = [
  { id: "web", name: "Web Development", icon: "🌐" },
  { id: "ai", name: "AI/ML", icon: "🤖" },
  // Add more domains as needed
];
```

### 4. Update Sponsor Information (Optional)

Edit `src/content/sponsor.ts`:

```typescript
export const SPONSORS = [
  {
    name: "Sponsor Name",
    logo: "/sponsors/logo.png",
    url: "https://sponsor.com",
    tier: "platinum"
  },
  // Add more sponsors
];
```

### 5. Reset the Database

**Option A: Start Fresh (Recommended)**

Create a new database for the new challenge:
1. Create a new database on Neon (or your provider)
2. Update `DATABASE_URL` in `.env` with the new connection string
3. Run `bun run db` to set up the schema

**Option B: Clear Existing Database**

⚠️ **Warning**: This will delete all participant data!

```bash
# Drop all tables
bun x drizzle-kit drop

# Recreate schema
bun run db
```

### 6. Update Guidelines and Content (Optional)

If you have custom guidelines or markdown content:

1. Check `src/content/md/` for any markdown files
2. Update rules, FAQs, or instructions as needed
3. Modify components in `src/app/(pages)/guidelines/` if needed

### 7. Test Everything

Before launching:

1. **Test enrollment flow:**
   - Sign in with a test account
   - Complete the enrollment form
   - Verify domain selection works

2. **Test submission flow:**
   - Submit a daily update
   - Verify social proof validation
   - Check streak tracking

3. **Test admin panel:**
   - Sign in with admin account
   - Verify participant list loads
   - Test filters and CSV export

4. **Test leaderboard:**
   - Verify rankings display correctly
   - Check that disqualified users don't appear

### 8. Deploy

1. Update environment variables in your hosting platform
2. Push changes to your repository
3. Verify deployment is successful
4. Test the production site thoroughly

### 9. Set Challenge to Active

In your production `.env`:

```env
CHALLENGE_ACTIVE="true"
```

When the challenge ends, set it to:

```env
CHALLENGE_ACTIVE="false"
```

This will show the "Challenge Ended" page to visitors.

## Customization Guide

### Changing Colors and Themes

The app uses Tailwind CSS v4. Edit `src/app/globals.css` to customize:

```css
@theme {
  --color-primary: #your-color;
  /* Add more custom colors */
}
```

### Modifying Challenge Rules

Edit the validation logic in:
- `src/queries/` - API endpoints and validation
- `src/lib/challenge.ts` - Challenge-specific utilities
- `src/lib/event.ts` - Date calculations and event state

### Adding New Features

1. Create new components in `src/components/`
2. Add new pages in `src/app/(pages)/`
3. Create API routes in `src/app/api/`
4. Add database schema changes in `src/db/schema/`
5. Run `bun run db` to apply schema changes

## Troubleshooting

### Database Connection Issues

**Error: "connect ECONNREFUSED"**
- Check your `DATABASE_URL` is correct
- Verify your database is running and accessible
- For Neon: ensure you've appended `?sslmode=require` to the connection string

**Error: "relation does not exist"**
- Run `bun run db` to push the schema
- Verify the database is empty or properly migrated

### Authentication Issues

**Error: "Missing NEXTAUTH_SECRET"**
- Generate a secret: `openssl rand -base64 32`
- Add it to your `.env` file

**OAuth callback error:**
- Verify your redirect URI in Google Console matches: `http://localhost:3000/api/auth/callback/google`
- Check `NEXTAUTH_URL` in `.env` is correct
- Ensure you're using the correct Google Client ID and Secret

### Build Errors

**Module not found errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules
rm -rf .next
bun install
```

**TypeScript errors:**
```bash
# Regenerate types
bun run db
```

### Admin Access Issues

**Can't access admin panel:**
- Verify the email you're signed in with matches `ADMIN_EMAIL` in `.env` exactly
- Admin panel is at `/feed` (not `/admin`)
- Try signing out and signing in again

## Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env`
4. Update `NEXTAUTH_URL` to your Vercel domain
5. Add Vercel domain to Google OAuth redirect URIs
6. Deploy!

### Deploying to Other Platforms

The app works on any Node.js hosting platform:
- **Netlify**: Add build command `npm run build` and publish directory `.next`
- **Railway**: Automatically detects Next.js apps
- **Render**: Use `npm run build` and `npm start`

Make sure to:
- Set all environment variables
- Update `NEXTAUTH_URL` to your domain
- Update Google OAuth redirect URIs

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT

---

**Maintained by ACES ERC** | [Website](https://aceserc.org) | [LinkedIn](https://www.linkedin.com/company/acesioe-pc)
