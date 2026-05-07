# GROVE

> **Sharp minds. Real talk. Brotherhood.**

## About

GROVE is a premium men's lifestyle, dating intelligence, and community platform. Think GQ meets Reddit meets an AI dating coach. A space for men to share real experiences, decode confusing situations, and grow together — with an AI coach available 24/7.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | Firebase Auth (Google + Apple + Magic Link) |
| Database | Supabase (PostgreSQL + RLS) |
| AI | Google Gemini API |
| Payments | Stripe |
| Deployment | Vercel |

## Features

- 📰 **Community Feed** — Anonymous posts categorized as green flags, red flags, dating wins, decode help, scene reports, and expert tips
- 🤖 **Grove AI** — Private AI dating coach powered by Gemini 1.5 Pro
- 👥 **Brotherhood Community** — City-based discussions and verified expert advice
- 💪 **Wellness Hub** — Fitness, mindset, and men's health content
- 🔍 **Vetting Tools** — Safety resources and background check integrations
- 💎 **Subscriptions** — Free / Grove+ / Grove Pro tiers via Stripe

## Setup Instructions

```bash
# Clone the repo
git clone https://github.com/Saad200327/grove-app.git
cd grove-app

# Install dependencies
npm install

# Copy env file and fill in your keys
cp .env.local.example .env.local

# Run development server
npm run dev
```

## Environment Variables

See `.env.local.example` for all required environment variables.

Required services:
- [Firebase Console](https://console.firebase.google.com) — Auth
- [Supabase Dashboard](https://supabase.com/dashboard) — Database
- [Google AI Studio](https://aistudio.google.com/apikey) — Gemini API Key
- [Stripe Dashboard](https://dashboard.stripe.com) — Payments

## License

MIT License — Copyright (c) 2025 GROVE
