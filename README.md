# BUSA — Frontend

Next.js frontend for BUSA, a community platform for Uzbek students living in South Korea (Busan).

## Features

- Student profile pages
- Community feed, posts, comments, likes
- Events, gallery, visa info pages
- Admin dashboard
- Responsive design (mobile + desktop)

## Tech stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS
- **Backend:** [busa](https://github.com/CloudVisioner/busa) — NestJS, GraphQL, Prisma, Supabase (separate repo)

## Architecture

This is the frontend client. It's structured as a standalone Next.js app, separate from the [backend API](https://github.com/CloudVisioner/busa). It consumes the backend's GraphQL/REST endpoints for auth, posts, profiles, and admin features.

## Setup

```bash
yarn install
yarn run dev
```

Open `http://localhost:3000`. Requires the [backend](https://github.com/CloudVisioner/busa) running for full functionality.

## Related

- Backend repo: [busa](https://github.com/CloudVisioner/busa)
