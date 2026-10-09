/// <reference path="./.sst/platform/config.d.ts" />

const DOMAIN = "nickweaver.dev"
// Keep in sync with LOCAL_WORKER_CONFIG in vite.config.ts.
const COMPATIBILITY_DATE = "2026-10-01"

export default $config({
  app(input) {
    const production = input?.stage === "production"

    return {
      name: "nickweaver-dev",
      // State lives in an R2 bucket on the same Cloudflare account; no AWS involved.
      home: "cloudflare",
      removal: production ? "retain" : "remove",
      protect: production,
    }
  },
  async run() {
    const production = $app.stage === "production"

    // `npx sst secret set DiscordWebhookUrl <url> --stage <stage>`. Non-production stages
    // default to empty, so the contact form answers 500 "Server misconfigured" there.
    const discordWebhookUrl = new sst.Secret("DiscordWebhookUrl", production ? undefined : "")

    const site = new sst.cloudflare.TanStackStart("Site", {
      // Only production claims the apex; other stages are reachable on their workers.dev URL.
      domain: production ? DOMAIN : undefined,
      link: [discordWebhookUrl],
      transform: {
        server: {
          compatibility: {
            date: COMPATIBILITY_DATE,
            flags: ["nodejs_compat"],
          },
        },
      },
    })

    return {
      url: site.url,
    }
  },
})
