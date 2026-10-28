import { notFound } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { posts, resume } from "virtual:content"

export type Post = {
  title: string
  excerpt: string
  date: string
  author: { name: string; profileImageUrl?: string }
  ogImage: string
  slug: string
  githubRepo?: string
  readingTime: string
  status: "active" | "draft"
}

export type PostWithHtml = Post & { html: string }

export type Resume = {
  title: string
  lastUpdated: string
  html: string
}

// Content is compiled at build time by `plugins/content.ts` and only contains active posts.
// Server functions keep the rendered HTML in the Worker bundle instead of the client bundle.

export const getAllPosts = createServerFn({ method: "GET" }).handler((): Post[] =>
  posts.map(({ html: _html, ...post }) => post),
)

export const getPost = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(({ data: slug }): PostWithHtml => {
    const post = posts.find((candidate) => candidate.slug === slug)
    if (!post) throw notFound()
    return post
  })

export const getResume = createServerFn({ method: "GET" }).handler((): Resume => resume)
