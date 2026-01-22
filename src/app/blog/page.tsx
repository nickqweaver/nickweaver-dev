import Link from "next/link"
import { BlogPost } from "@/components/blog-post"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/api"

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="container pb-20 pt-28">
      <div className="max-w-2xl space-y-4">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
          Writing
        </p>
        <h1 className="text-3xl font-semibold md:text-5xl">Systems notes</h1>
        <p className="text-muted-foreground">
          Field notes on reliability, distributed debugging, and infrastructure design.
        </p>
        <Button asChild size="sm" variant="outline">
          <Link href="/">Back home</Link>
        </Button>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <BlogPost key={post.slug} {...post} />
        ))}
      </div>
    </main>
  )
}
