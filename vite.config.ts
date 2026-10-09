import { cloudflare } from "@cloudflare/vite-plugin"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { content } from "./plugins/content.ts"
import { ogImages } from "./plugins/og-images.ts"

const LOCAL_WORKER_CONFIG = {
  name: "nickweaver-dev",
  main: "@tanstack/react-start/server-entry",
  compatibility_date: "2026-10-01",
  compatibility_flags: ["nodejs_compat"],
}

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  // Server route modules import this Workers-only specifier; keep the client dep scan from
  // trying to resolve it.
  optimizeDeps: {
    exclude: ["cloudflare:workers"],
  },
  plugins: [
    content(),
    ogImages(),
    cloudflare({
      viteEnvironment: { name: "ssr" },
      // SST generates the Worker config at deploy time. There is no wrangler file in the
      // repo, so locally we supply what one would: without `main` the plugin treats the app
      // as assets-only, and Start needs nodejs_compat for AsyncLocalStorage.
      configPath: process.env.SST_WRANGLER_PATH,
      config: process.env.SST_WRANGLER_PATH ? undefined : LOCAL_WORKER_CONFIG,
    }),
    tanstackStart({
      // Every page is static content, so serve prerendered HTML from the asset store instead of
      // rendering React in the Worker per request. Links are crawled from `/`.
      // Flat `blog.html` files keep `/blog` canonical: Workers assets would redirect `/blog` to
      // `/blog/` if it were `blog/index.html`.
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: false,
        failOnError: true,
        // Skip `/blog/` (the index route's id) so it redirects to `/blog` instead of duplicating it.
        filter: ({ path }) => path === "/" || !path.endsWith("/"),
      },
    }),
    viteReact(),
  ],
})
