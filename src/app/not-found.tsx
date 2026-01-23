import Link from "next/link"

export default function NotFound() {
  return (
    <main className="container py-12 md:py-16">
      <div className="max-w-2xl">
        <div className="mb-6 text-muted-foreground">
          <span className="text-dr-green">❯</span> cd /unknown-path
        </div>

        <div className="mb-8">
          <span className="text-dr-red">bash: cd: /unknown-path: No such file or directory</span>
        </div>

        <div className="text-6xl md:text-8xl font-bold text-foreground mb-4">
          404
        </div>

        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← back home
          </Link>
        </div>
      </div>
    </main>
  )
}
