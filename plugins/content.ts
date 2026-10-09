import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import type { Plugin } from "vite"
import type { Post, PostWithHtml, Resume } from "../src/lib/api.ts"
import { renderMarkdown } from "../src/lib/markdown.ts"

const VIRTUAL_ID = "virtual:content"
const RESOLVED_ID = `\0${VIRTUAL_ID}`

export type PostSource = Post & { content: string }

function postsDir(root: string) {
  return path.join(root, "_posts")
}

function contentDir(root: string) {
  return path.join(root, "_content")
}

/** Reads every active post from `_posts`, sorted by file name. Drafts are dropped here. */
export async function readPosts(root: string): Promise<PostSource[]> {
  const fileNames = (await fs.readdir(postsDir(root))).filter((name) => name.endsWith(".md")).sort()

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const contents = await fs.readFile(path.join(postsDir(root), fileName), "utf8")
      const { data, content } = matter(contents)
      const slug = fileName.replace(/\.md$/, "")
      return { ...data, slug, content } as PostSource
    }),
  )

  return posts.filter((post) => post.status === "active")
}

async function readResume(root: string): Promise<Resume> {
  const contents = await fs.readFile(path.join(contentDir(root), "resume.md"), "utf8")
  const { data, content } = matter(contents)

  return {
    title: data.title || "Resume",
    lastUpdated: data.lastUpdated || "",
    html: await renderMarkdown(content),
  }
}

/**
 * Exposes `_posts` and `_content` as the `virtual:content` module. Markdown is parsed and
 * rendered here at build time, so the Worker never touches the filesystem and never runs
 * remark/prism per request.
 */
export function content(): Plugin {
  let root = process.cwd()

  return {
    name: "nickweaver:content",
    configResolved(config) {
      root = config.root
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    async load(id) {
      if (id !== RESOLVED_ID) return

      const sources = await readPosts(root)
      const posts: PostWithHtml[] = await Promise.all(
        sources.map(async ({ content, ...post }) => ({
          ...post,
          html: await renderMarkdown(content),
        })),
      )
      const resume = await readResume(root)

      return [
        `export const posts = ${JSON.stringify(posts)}`,
        `export const resume = ${JSON.stringify(resume)}`,
      ].join("\n")
    },
    configureServer(server) {
      const dirs = [postsDir(root), contentDir(root)]
      server.watcher.add(dirs)

      const reload = async (file: string) => {
        if (!dirs.some((dir) => file.startsWith(dir))) return

        for (const environment of Object.values(server.environments)) {
          const mod = environment.moduleGraph.getModuleById(RESOLVED_ID)
          if (mod) await environment.reloadModule(mod)
        }
        server.ws.send({ type: "full-reload" })
      }

      server.watcher.on("add", reload).on("change", reload).on("unlink", reload)
    },
  }
}
