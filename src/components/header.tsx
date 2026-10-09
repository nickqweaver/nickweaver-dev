import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

const links: { to: "/" | "/blog"; hash?: string; label: string }[] = [
  { to: "/", hash: "experience", label: "experience" },
  { to: "/", hash: "projects", label: "projects" },
  { to: "/blog", label: "writing" },
  { to: "/", hash: "contact", label: "contact" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="container">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            ~/nick.weaver
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <span className="text-border">│</span>
            <ThemeToggle />
          </nav>

          {/* Mobile menu button */}
          <button
            className="text-muted-foreground hover:text-primary md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "[close]" : "[menu]"}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="flex flex-col gap-2 border-t border-border py-4 text-sm md:hidden">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                onClick={() => setMenuOpen(false)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
