import Link from "next/link"
import { getPost } from "@/lib/api"
import { remark } from "remark"
import rehypePrism from "rehype-prism-plus"
import rehypeStringify from "rehype-stringify"
import remarkRehype from "remark-rehype"
import remarkGfm from "remark-gfm"

import "prismjs/themes/prism-tomorrow.css"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icon } from "@iconify/react"
import { notFound } from "next/navigation"

const DEFAULT_AVATAR_URL =
  "https://cdn.uploadslate.com/ca454007-87bd-46e7-a34f-87f40efd308a?width=56&height=56&format=webp"

export default async function Post({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  const { author, date, readingTime, status } = post
  const avatarUrl = author.profileImageUrl ?? DEFAULT_AVATAR_URL
  const entryId = post.slug.toUpperCase()

  if (status !== "active") {
    notFound()
  }

  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(post.content)

  function formatDate(isoString: string) {
    const date = new Date(isoString)
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const year = date.getFullYear()

    return `${month}/${day}/${year}`
  }

  return (
    <article className="container pb-20 pt-28">
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
            <span>Log entry</span>
            <span className="text-foreground">{entryId}</span>
          </div>
          <Link
            href="/blog"
            className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground"
          >
            Back to writing
          </Link>
        </div>
        <h1 className="mt-6 text-3xl font-semibold md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <div className="flex items-center gap-3">
            <Avatar className="h-14 w-14">
              <AvatarImage alt={author.name} src={avatarUrl} className="object-cover" />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">{author.name}</span>
              <span className="text-xs text-muted-foreground">Software engineer</span>
              <a
                href="https://twitter.com/TheSWEaver"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-[0.65rem] font-mono uppercase tracking-[0.18em] text-muted-foreground/70 transition-colors hover:text-muted-foreground"
              >
                <Icon icon="simple-icons:x" className="h-3 w-3" />
                @TheSWEaver
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="lucide:calendar" className="h-4 w-4" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="lucide:clock" className="h-4 w-4" />
            <span>{readingTime}</span>
          </div>
        </div>
      </div>
      <div className="prose prose-sm mt-10 max-w-none dark:prose-invert md:prose-lg xl:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: result.toString() }} />
      </div>
    </article>
  )
}
