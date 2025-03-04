import { BlogPost } from "@/components/blog-post";
import { getAllPosts } from "@/lib/api";

export default function BlogPage() {
  const post = getAllPosts();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="relative z-10 pt-24 pb-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {post.map((post, index) => (
              <BlogPost key={index} {...post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
