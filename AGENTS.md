# AGENTS.md

## Repo overview

- Next.js 14 app router in `src/app`.
- TypeScript + Tailwind CSS.
- Content posts in `_posts` consumed by `src/lib/api.ts`.

## Commands

### Install

- `npm install`

### Development

- `npm run dev` (Next.js dev server on `http://localhost:3000`).

### Build

- `npm run build`
- `npm run start` (serve production build).

### Lint

- `npm run lint`
- Single file: `npm run lint -- --file src/app/page.tsx`

### Format

- `npm run format` (check)
- `npm run format:write` (write)

### Tests

- No test runner configured yet (no `test` script).
- If you add tests, update this file with the command and single-test invocation.

## Cursor/Copilot rules

- No `.cursor/rules`, `.cursorrules`, or `.github/copilot-instructions.md` found.

## Code style

### Formatting

- Prettier is the source of truth (`.prettierrc.json`).
- 2-space indentation, 100 char line width.
- No semicolons, double quotes, trailing commas.
- Use `npm run format` before finalizing changes.

### Imports

- Prefer `import type` for type-only imports.
- Group imports roughly as: React/Next, third-party, internal `@/`, relative, styles.
- Use path alias `@/*` for `src/*` imports.
- Keep `use client` directive as the first statement when needed.

### Components

- Components are PascalCase and exported as named functions.
- Use server components by default; add `"use client"` only when necessary.
- Props are typed with `interface` or `type` aliases.
- Prefer explicit return types only when needed for clarity.

### Types & data

- `tsconfig.json` has `strict: true`; avoid `any`.
- Use `type` for data shapes (e.g., `Post`) and `interface` for props.
- Favor `Readonly` for immutable props when practical.
- Keep data helpers in `src/lib` and avoid direct FS usage in components.

### Naming

- camelCase for variables and functions.
- PascalCase for React components and types.
- UPPER_SNAKE_CASE for module constants.
- Prefer descriptive names over abbreviations.

### Styling

- Tailwind CSS is primary; keep classes in `className`.
- Use `cn` from `src/lib/utils.ts` for conditional class names.
- Avoid inline styles unless required.
- Prefer semantic HTML tags (`section`, `nav`, etc.).

### Accessibility

- Provide `sr-only` text for icon-only controls.
- Always include `rel="noopener noreferrer"` with `target="_blank"`.
- Keep heading order logical (`h1` → `h2` → `h3`).

### Performance

- Prefer static or server-rendered content when possible.
- Avoid large client components unless needed for interactivity.
- Use `next/image` for optimized images when added.

### Error handling

- Handle filesystem and parsing errors in server utilities (e.g., `_posts`).
- Prefer early returns and clear error messages over silent failures.
- Avoid throwing raw errors in React components; render fallbacks where possible.

### Next.js conventions

- App router lives in `src/app`.
- Use `next/link` for internal navigation.
- Use `Metadata` in layout files for SEO.
- Static assets live under `public/` (not committed here).
- Keep server-only utilities in `src/lib`.

### Content posts

- Markdown posts live in `_posts/*.md`.
- `src/lib/api.ts` reads posts via `gray-matter`.
- Update `Post` type when frontmatter changes.

## File organization

- `src/app`: route segments, layouts, and pages.
- `src/components`: UI and shared components.
- `src/lib`: utilities and data access.
- `src/app/globals.css`: global Tailwind styles.

## Do/Don't checklist

- Do run `npm run lint` and `npm run format` before PRs.
- Do keep imports sorted and type-only imports explicit.
- Do prefer server components unless client features are required.
- Don't add new scripts without updating this file.
- Don't introduce new style systems without discussion.

## Single-test guidance (future)

- If adding Vitest: `npm run test -- --run src/path/to/file.test.ts`
- If adding Jest: `npm run test -- --runTestsByPath src/path/to/file.test.ts`
- Document the chosen test runner here once added.

## Notes for agents

- Keep changes minimal and consistent with existing patterns.
- Avoid modifying `node_modules` or generated files.
- Use `npm` scripts from `package.json` as canonical.

## Quick reference

- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Format check: `npm run format`
- Format write: `npm run format:write`
- Start prod: `npm run start`

## Common pitfalls

- Missing `"use client"` for components using hooks or `window`.
- Forgetting to update `Post` type when `_posts` schema changes.
- Mixing relative paths when `@/` alias would be clearer.
- Ignoring lint errors from Next.js `core-web-vitals`.

## Code patterns seen

- Functional components with inline JSX.
- `Icon` from `@iconify/react` for icons.
- Tailwind utility classes for layout and typography.
- Simple mapping over arrays for lists with `key`.

## Analytics

- Plausible script loaded in `src/app/page.tsx`.
- Keep analytics script deferred to avoid blocking.

## Update policy

- Keep this file current when commands or tooling changes.
- Add new conventions here when they become standard.

## Contact

- Repository appears to be a personal portfolio site.
- When in doubt, match style in `src/app` and `src/components`.
