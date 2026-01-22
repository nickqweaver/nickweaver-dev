import Link from "next/link"
import { BlogPost } from "@/components/blog-post"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/api"

export default function BlogPage() {
  const posts = getAllPosts()
  const postCount = String(posts.length).padStart(2, "0")

  return (
    <main className="container pb-20 pt-28">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
          <span>Logbook</span>
          <span className="text-foreground">Writing</span>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link href="/">Back home</Link>
        </Button>
      </div>
      <div className="mt-8 max-w-2xl space-y-4">
        <h1 className="text-3xl font-semibold md:text-5xl">Engineering notes</h1>
        <p className="text-muted-foreground">
          Notes on product work, performance, and design decisions.
        </p>
      </div>
      <div className="mt-8 rounded-xl border border-border bg-card/20">
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <span>entries</span>
          <span>count: {postCount}</span>
        </div>
        <div className="grid gap-4 p-5 md:grid-cols-2">
          {posts.map((post) => (
            <BlogPost key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </main>
  )
}
