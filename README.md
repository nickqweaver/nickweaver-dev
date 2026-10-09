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

The contact form (`POST /api/contact`) posts to a Discord webhook stored as the
`DiscordWebhookUrl` SST secret and read with `Resource.DiscordWebhookUrl.value` from
`sst/resource`.

- `npm run dev` reads `.dev.vars` in the repo root (see `.dev.vars.example`), which mimics the
  bindings SST links into the deployed Worker.
- `npm run preview` reads `.dev.vars` next to the built config, so copy it first:
  `cp .dev.vars dist/server/.dev.vars`.
- `npx sst dev` runs `npm run dev` with the real linked secrets of your personal stage.

## Deploy

[SST](https://sst.dev/docs/component/cloudflare/tan-stack-start/) deploys the app to Cloudflare
Workers (`sst.config.ts`). SST state lives in R2 on the same Cloudflare account. There is no
`wrangler.*` file in the repo: SST generates the Worker config and passes it to the Cloudflare
Vite plugin through `SST_WRANGLER_PATH`. Locally `vite.config.ts` supplies the equivalent
(`main`, `nodejs_compat`).

- Pushes to `main` deploy the `production` stage (`nickweaver.dev`) through
  `.github/workflows/deploy.yml`, using the `CLOUDFLARE_API_TOKEN` and
  `CLOUDFLARE_DEFAULT_ACCOUNT_ID` repository secrets.
- `npm run deploy` deploys production from your machine with the same two env vars.
- `npx sst deploy --stage <name>` deploys a throwaway stage on a `workers.dev` URL;
  `npx sst remove --stage <name>` tears it down.
- Set secrets per stage: `npx sst secret set DiscordWebhookUrl <url> --stage production`.

Create the API token from the "Edit Cloudflare Workers" template, scoped to your account and the
`nickweaver.dev` zone, then add Zone › DNS › Edit and Zone › Zone › Read (SST looks up the zone
and attaches the Worker custom domain).
