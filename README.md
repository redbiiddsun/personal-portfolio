# Portfolio — redbiiddsun.com

A single-page portfolio (EN/TH) plus an `/admin` area for managing sites on [redbiiddsun-service](https://api.redbiiddsun.com).

- **Stack:** SvelteKit 3 + Svelte 5, Tailwind CSS 4, TypeScript, Vite 8
- **Build:** `@sveltejs/adapter-static`, fully prerendered static site with no server of its own
- **Hosting:** Vercel (`vercel.json`)

## Project structure

```text
src/
  app.html                 HTML shell + Google Analytics / Clarity (runs only on redbiiddsun.com)
  lib/
    data.ts                All home page content (projects, experience, SITE_URL, ...)
    i18n.svelte.ts         UI strings in EN/TH
    types.ts               Types for data.ts
    components/            Home page sections
    admin/                 Admin API client and admin components
      api-origins.ts       API URLs (local / production)
      api.ts               Fetch wrapper, session token, every endpoint
  routes/
    +page.svelte           Home page (prerendered to HTML at build time)
    admin/                 Admin pages (ssr = false, browser only)
    robots.txt, sitemap.xml
static/                    Images, videos, favicon, og.jpg
vercel.json                /api → API rewrite, security headers
vite.config.js             Dev proxy /api → localhost:3000
```

## Prerequisites

| What | When | Notes |
| --- | --- | --- |
| **Node.js ≥ 22.17** | Always | Required by `@sveltejs/kit` (`>=22.17`); Vite needs `>=22.12` |
| **npm** | Always | `package-lock.json` is committed, use `npm ci` |
| **redbiiddsun-service** on `http://localhost:3000` | Testing `/admin` locally | Not needed for the home page |
| An admin account in redbiiddsun-service | Logging in to `/admin` | Passwords must be at least 12 characters |
| A Vercel account linked to this repo | Production deploys | |
| DNS for `redbiiddsun.com` pointing at Vercel | Production | Analytics and SEO are tied to this hostname |

**There is no `.env` file.** Values that differ between local and production are hard-coded (see [Values to keep in sync](#values-to-keep-in-sync)).

## Local development

```bash
npm ci
npm run dev          # http://localhost:5173
```

- The home page works straight away, no backend needed.
- `/admin` calls same-origin `/api/*`, which Vite proxies to `http://localhost:3000/*` (stripping `/api`). Start redbiiddsun-service on port 3000 first, or login will fail.
- If the API runs on another port, change `LOCAL_API_URL` in `src/lib/admin/api-origins.ts`.
- The OAuth provider settings (Google / LINE / TikTok) in the admin show the callback URL as `LOCAL_API_URL` in dev and `PRODUCTION_API_URL` in builds. Register that URL with each provider.
- Analytics (GA4 / Clarity) is intentionally **off** on localhost.

## Testing

There are no unit tests. Run these three steps before pushing:

```bash
npm run check        # svelte-check + TypeScript (must report 0 errors)
npm run build        # prerenders every page into build/; broken routes fail here
npm run preview      # serves build/ on http://localhost:4173, like production
```

`npm run preview` uses the same `/api` proxy as dev, so `/admin` can be tested against the local API too.

Manual checklist:

- [ ] Home page renders every section, EN/TH switch works and the language is remembered after refresh
- [ ] Cookie consent shows on first visit and not again after a choice
- [ ] Mobile (~375px wide) has no horizontal scroll
- [ ] `/robots.txt` and `/sitemap.xml` use the correct `SITE_URL`
- [ ] `/admin` redirects to `/admin/login` when logged out
- [ ] Login, change password, logout
- [ ] Create a site, edit settings, create/delete API keys, configure OAuth providers, manage users

## Production

Deployed on Vercel: pushing to `main` triggers a production build automatically, and every branch/PR gets a preview URL.

Vercel project settings:

| Setting | Value |
| --- | --- |
| Framework Preset | SvelteKit |
| Build Command | `npm run build` |
| Output Directory | `build` |
| Node.js Version | 22.x or newer |
| Environment Variables | None |
| Domain | `redbiiddsun.com` |

What `vercel.json` does:

- Rewrites `/api/:path*` → `https://api.redbiiddsun.com/:path*`, so the admin calls the API same-origin: the token never crosses origins and the API needs no CORS for `/admin`.
- `cleanUrls` serves `/admin/login` instead of `/admin/login.html`.
- Security headers: `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors 'none'`.

The API (redbiiddsun-service) must be ready first:

- Running at `https://api.redbiiddsun.com`
- Its `API_PUBLIC_URL` matches `PRODUCTION_API_URL`, since that is where OAuth providers send callbacks
- An admin account exists for login

Analytics only runs when the hostname is `redbiiddsun.com` and the path is not `/admin`, and sets cookies only after the visitor accepts (Google Consent Mode v2 + Clarity Consent API). IDs in `src/app.html`: GA4 `G-BB9H2QXLCQ`, Clarity `z2d1cdsh94`.

Manual deploy (without the Git integration):

```bash
npm i -g vercel
vercel           # preview
vercel --prod    # production
```

## Values to keep in sync

There are no env vars, so changing a domain means editing several places together:

| Value | Where |
| --- | --- |
| Site domain | `SITE_URL` in `src/lib/data.ts` and the hostname check in `src/app.html` |
| Production API URL | `PRODUCTION_API_URL` in `src/lib/admin/api-origins.ts` and the rewrite in `vercel.json` |
| Local API URL | `LOCAL_API_URL` in `src/lib/admin/api-origins.ts` |

## Editing content

- Projects / experience / skills / socials: `src/lib/data.ts` (bilingual text uses `{ en, th }`)
- UI strings: `src/lib/i18n.svelte.ts` (add every key in both EN and TH)
- Images: put them in `static/` and reference them from `/`, e.g. `/projects/pakprik/home.webp` (`.webp` preferred)
