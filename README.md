# nickweaver.dev

Personal site built with [TanStack Start](https://tanstack.com/start) and React, running on
[Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)
via `@cloudflare/vite-plugin`.

## Getting started

```bash
npm install
cp .dev.vars.example .dev.vars # optional: only needed to send contact form messages
npm run dev                    # http://localhost:3000, runs the server code in workerd
```

## Scripts

- `npm run dev` - Vite dev server with the Worker running in the local Workers runtime
- `npm run build` - production build into `dist/` (`dist/client` static assets, `dist/server` Worker + `wrangler.json`)
- `npm run preview` - serve the production build in the local Workers runtime
- `npm run typecheck` - `tsc --noEmit`
- `npm run format` / `npm run format:write` - Prettier check / write

## Content

- Blog posts live in `_posts/*.md`, the resume in `_content/resume.md`. Only posts with
  `status: "active"` front matter are published.
- `plugins/content.ts` parses and renders the markdown at build time and exposes it as the
  `virtual:content` module, so the Worker never reads the filesystem. Edits reload in dev.
- `plugins/og-images.ts` renders the Open Graph images (`/og/home.png`, `/og/blog/<slug>.png`)
  at build time with satori + resvg and emits them as static assets.

## Environment

The contact form (`POST /api/contact`) posts to a Discord webhook read from the
`DISCORD_WEBHOOK_URL` Worker binding (`import { env } from "cloudflare:workers"`).

- `npm run dev` reads `.dev.vars` in the repo root (see `.dev.vars.example`).
- `npm run preview` reads `.dev.vars` next to the built config, so copy it first:
  `cp .dev.vars dist/server/.dev.vars`.

There is no `wrangler.*` file in the repo: deploys generate the Worker config and pass it to
the Cloudflare Vite plugin through `SST_WRANGLER_PATH`. Locally `vite.config.ts` supplies the
equivalent (`main`, `nodejs_compat`).
