---
title: Resume
lastUpdated: "2026-11-02"
---

## Experience

### Full Stack Software Engineer

**1up.ai** | Remote (New York, NY) | March 2026 – Present

- Built health monitoring across 34 third-party integrations, spanning LLM providers and RAG knowledge sources with failure tracking, outage alerts, and recovery notifications
- Developed seven OAuth integrations for RAG knowledge sources, supporting file imports and recursive folder sync, with automatic re-embedding when source documents change
- Created Answer Hub’s CMS-style publishing editor with section-based inline editing and live previews
- Led a codebase-wide code quality initiative: migrated the frontend to 100% TypeScript, resolved ~3,700 Python lint violations, and enforced type, lint, and formatting checks in CI to prevent regressions

### Full Stack Software Engineer

**SendOutCards** | Salt Lake City, UT | April 2022 – March 2026

- Built an asynchronous GraphQL wrapper around the legacy print pipeline with the production fulfillment team, adding custom enterprise print filters to onboard a client representing approximately $1M in annual revenue
- Optimized the batch-processing pipeline with an in-memory cache for reused images, eliminating redundant downloads and uploads and increasing throughput 5×
- Implemented a configurable gift-card fraud rules engine with automated purchase blocking and customer overrides, restoring normal transaction patterns after a surge of suspected fraud
- Retired a custom forked-Apollo/Redux data layer in favor of TanStack Query, unblocking React and TypeScript upgrades
- Rebuilt the greeting card rich text editor using TipTap/ProseMirror, keeping editing state local and debouncing Redux updates to reduce re-renders and eliminate noticeable typing lag
- Halved card editor load time with data prefetching, client-side cache tuning, and CloudFront catalog caching
- Upgraded three core repositories to React 18 and migrated from Webpack to Vite, reducing build times by approximately 80%

### Frontend Software Engineer

**SendOutCards** | Salt Lake City, UT | December 2019 – April 2022

- Rebuilt the card editor as a reusable React component supporting freeform placement, layering, rotation, custom sizing, and stickers
- Reduced the client-side bundle size by 82% through code splitting, external asset hosting, and dependency pruning
- Created Quantum Design System, a public TypeScript/React library published to npm for use across applications

---

## Projects

### Lineset

**Independent SaaS Project** | [lineset.app](https://lineset.app) | February 2026 – Present

- Designed and shipped SaaS for home-service contractors as the sole engineer, using Go/PostgreSQL, React/TanStack Start, AWS ECS/RDS, and Cloudflare Workers
- Built an AI voice and web chat receptionist that captures leads, books estimate appointments, and dispatches service calls, running on a custom Go agent harness with WebSocket and SSE streaming
- Responded to a bot flooding production with lead submissions by adding edge-level honeypot filtering in a Cloudflare Worker, silently dropping bot requests before they reached the backend
- Developed a no-code website builder with inline editing, undo/redo, autosave, versioned publishing, and built-in analytics tracking page views and click events with monthly rollups for trend comparison

---

## Skills

**Languages:** TypeScript, JavaScript, Python, Go, SQL

**Frameworks & Libraries:** React, Next.js, TanStack Start/Query/Router, Node.js, Django, GraphQL, OpenAI/Vercel AI SDKs

**Cloud & Backend:** AWS, Cloudflare Workers, Docker, PostgreSQL, Redis, Celery, RabbitMQ

---

## Education

**Salt Lake Community College**
A.S. in Business | January 2019
