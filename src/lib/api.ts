import fs from "fs"
import path from "path"
import { join } from "path"
import matter from "gray-matter"

export type Post = {
  title: string
  excerpt: string
  date: string
  author: { name: string; profileImageUrl?: string }
  ogImage: string
  content: string
  slug: string
  githubRepo?: string
  readingTime: string
  status: "active" | "draft"
}

const POSTS_DIR = path.join(process.cwd(), "_posts")

export function getSlugs() {
  const fileNames = fs.readdirSync(POSTS_DIR)

  return fileNames.map((fileName) => {
    return fileName.replace(/\.md$/, "")
  })
}

export function getPost(slug: string) {
  const fullPath = join(POSTS_DIR, `${slug}.md`)
  const contents = fs.readFileSync(fullPath, "utf8")

  const { data, content } = matter(contents)

  return { ...data, slug, content } as unknown as Post
}

export function getAllPosts() {
  const slugs = getSlugs()

  return slugs.map((slug) => getPost(slug)).filter((post) => post.status === "active")
}

// Resume
export type Resume = {
  title: string
  lastUpdated: string
  content: string
}

const CONTENT_DIR = path.join(process.cwd(), "_content")

export function getResume(): Resume {
  const fullPath = join(CONTENT_DIR, "resume.md")
  const contents = fs.readFileSync(fullPath, "utf8")

  const { data, content } = matter(contents)

  return {
    title: data.title || "Resume",
    lastUpdated: data.lastUpdated || "",
    content,
  }
}
