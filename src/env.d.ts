/// <reference types="vite/client" />

declare module "virtual:content" {
  export const posts: import("./lib/api").PostWithHtml[]
  export const resume: import("./lib/api").Resume
}

// Worker bindings. Set locally in `.dev.vars`; set by the deploy pipeline in production.
declare module "cloudflare:workers" {
  export const env: {
    DISCORD_WEBHOOK_URL?: string
  }
}
