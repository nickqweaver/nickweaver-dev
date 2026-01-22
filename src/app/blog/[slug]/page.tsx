import Link from "next/link"
import { getPost } from "@/lib/api"
import { remark } from "remark"
import rehypePrism from "rehype-prism-plus"
import rehypeStringify from "rehype-stringify"
import remarkRehype from "remark-rehype"
import remarkGfm from "remark-gfm"
import { notFound } from "next/navigation"

import "prismjs/themes/prism-tomorrow.css"

export default async function Post({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  if (post.status !== "active") {
    notFound()
  }

  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(post.content)

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <article className="container py-12 md:py-16">
      <div className="max-w-3xl">
        <div className="mb-8">
          <div className="mb-6 text-muted-foreground">
            <span className="text-dr-green">❯</span> cat posts/{post.slug}.md
          </div>
          <h1 className="text-2xl md:text-3xl text-foreground mb-4">{post.title}</h1>
          <p className="text-muted-foreground mb-4">{post.excerpt}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>{date}</span>
            <span>{post.readingTime}</span>
            <span>by {post.author.name}</span>
          </div>
        </div>

        <div className="divider mb-8" aria-hidden="true" />

        <div className="prose prose-sm max-w-none dark:prose-invert md:prose-base prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-dr-cyan prose-pre:bg-card prose-pre:border prose-pre:border-border">
          <div dangerouslySetInnerHTML={{ __html: result.toString() }} />
        </div>

        <div className="divider mt-12 mb-8" aria-hidden="true" />

        <div className="flex gap-6">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← all posts
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← home
          </Link>
        </div>
      </div>
    </article>
  )
}
