import fs from "node:fs/promises"
import path from "node:path"
import { Resvg } from "@resvg/resvg-js"
import type { ReactNode } from "react"
import satori from "satori"
import type { Plugin } from "vite"
import { OG_HOME_PATH, ogPostPath } from "../src/lib/seo.ts"
import { readPosts } from "./content.ts"
import { homeImage, OG_SIZE, postImage } from "./og-templates.ts"

const POST_IMAGE = /^\/og\/blog\/([^/]+)\.png$/

// Rollup asset file names are relative to the output directory.
function assetFileName(urlPath: string) {
  return urlPath.replace(/^\//, "")
}

// The old Next.js images were rendered by next/og, whose only bundled font is Noto Sans
// (the "monospace" family never resolved). Use the same file to keep the images identical.
const FONT_PATH = path.join(import.meta.dirname, "fonts/noto-sans-v27-latin-regular.ttf")

async function renderPng(node: ReactNode) {
  const font = await fs.readFile(FONT_PATH)
  const svg = await satori(node, {
    ...OG_SIZE,
    fonts: [{ name: "Noto Sans", data: font, weight: 400, style: "normal" }],
  })
  return new Resvg(svg, { fitTo: { mode: "width", value: OG_SIZE.width } }).render().asPng()
}

/**
 * Renders the Open Graph images at build time (Node only) and emits them as static client
 * assets, so satori/resvg never ship in the Worker. In dev they are rendered on request.
 */
export function ogImages(): Plugin {
  let root = process.cwd()

  return {
    name: "nickweaver:og-images",
    configResolved(config) {
      root = config.root
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url?.split("?")[0] ?? ""
        const slug = pathname.match(POST_IMAGE)?.[1]
        if (pathname !== OG_HOME_PATH && !slug) return next()

        try {
          let node = homeImage()
          if (slug) {
            const post = (await readPosts(root)).find((candidate) => candidate.slug === slug)
            if (!post) return next()
            node = postImage(post)
          }
          res.setHeader("Content-Type", "image/png")
          res.end(await renderPng(node))
        } catch (error) {
          next(error)
        }
      })
    },
    async generateBundle() {
      if (this.environment.name !== "client") return

      this.emitFile({
        type: "asset",
        fileName: assetFileName(OG_HOME_PATH),
        source: await renderPng(homeImage()),
      })
      for (const post of await readPosts(root)) {
        this.emitFile({
          type: "asset",
          fileName: assetFileName(ogPostPath(post.slug)),
          source: await renderPng(postImage(post)),
        })
      }
    },
  }
}
