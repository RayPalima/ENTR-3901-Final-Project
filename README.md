# Homestead — Your Digital Sanctuary for Property Evaluation

An AI-driven property evaluation platform built with Next.js, Tailwind CSS, Framer Motion, and Supabase.

## Prerequisites

- **Node.js** v18 or higher — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the `app` directory with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your [Supabase Dashboard](https://supabase.com/dashboard) under **Project Settings > API**.

### 3. Run the development server

```bash
npm run dev
```

The app will start at **http://localhost:3000**.

### 4. Build for production

```bash
npm run build
npm start
```

## Available Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start development server           |
| `npm run build` | Create optimized production build  |
| `npm start`     | Serve the production build locally |
| `npm run lint`  | Run ESLint                         |

## Tech Stack

| Technology       | Purpose                          |
| ---------------- | -------------------------------- |
| Next.js 16       | React framework (App Router)     |
| TypeScript       | Type safety                      |
| Tailwind CSS 4   | Styling                          |
| Framer Motion    | Animations & transitions         |
| Lucide React     | Icon library                     |
| Supabase         | Authentication & backend         |

## Project Structure

```
app/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── dashboard/        # Dashboard (protected, requires sign-in)
│   │   ├── browse/           # AI Browse & Search
│   │   ├── property/[id]/    # Property detail page
│   │   ├── settings/         # Investment settings
│   │   ├── shortlists/       # Saved shortlists
│   │   ├── profile/          # User profile
│   │   ├── signin/           # Sign in page
│   │   ├── signup/           # Sign up page
│   │   └── page.tsx          # Home page (public browse)
│   ├── components/           # Reusable UI components
│   │   ├── sidebar.tsx       # Navigation sidebar
│   │   ├── top-app-bar.tsx   # Top application bar
│   │   └── layout-shell.tsx  # Conditional layout wrapper
│   ├── context/
│   │   └── auth-context.tsx  # Authentication context & provider
│   └── lib/
│       └── supabase.ts       # Supabase client
├── .env.local                # Environment variables (not committed)
└── package.json
```

## Authentication Flow

1. Visit `/` — browse properties without signing in
2. Click **Get Started** to create an account at `/signup`
3. Confirm your email via the link Supabase sends
4. Sign in at `/signin` — redirects to `/dashboard`
5. Dashboard displays your name and email
6. Click **Logout** in the sidebar to sign out
