import { createFileRoute } from "@tanstack/react-router"
import { env } from "cloudflare:workers"

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { name, email, message } = await request.json()

          if (!name || !email || !message) {
            return Response.json({ error: "Missing fields" }, { status: 400 })
          }

          const webhookUrl = env.DISCORD_WEBHOOK_URL

          if (!webhookUrl) {
            console.error("DISCORD_WEBHOOK_URL not configured")
            return Response.json({ error: "Server misconfigured" }, { status: 500 })
          }

          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              embeds: [
                {
                  title: "New Contact Form Submission",
                  color: 0x50fa7b, // Dracula green
                  fields: [
                    { name: "Name", value: name, inline: true },
                    { name: "Email", value: email, inline: true },
                    { name: "Message", value: message },
                  ],
                  timestamp: new Date().toISOString(),
                },
              ],
            }),
          })

          if (!response.ok) {
            console.error("Discord webhook failed:", response.status)
            return Response.json({ error: "Failed to send" }, { status: 500 })
          }

          return Response.json({ success: true })
        } catch (error) {
          console.error("Contact form error:", error)
          return Response.json({ error: "Server error" }, { status: 500 })
        }
      },
    },
  },
})
