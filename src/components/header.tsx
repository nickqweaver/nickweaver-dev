"use client"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Icon } from "@iconify/react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const links = [
  { href: "/", title: "Home" },
  { href: "/#focus", title: "Focus" },
  { href: "/#projects", title: "Projects" },
  { href: "/#writing", title: "Writing" },
  { href: "/#links", title: "Links" },
]

export function Header() {
  const link =
    "text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-mono uppercase tracking-[0.3em]"
        >
          <Icon icon="lucide:terminal" className="h-5 w-5 text-primary" />
          <span>Nick Weaver</span>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <ul className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Icon className="h-[1.2rem] w-[1.2rem]" icon="lucide:menu" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {links.map((item) => (
                  <DropdownMenuItem key={item.title}>
                    <Link href={item.href} className={link}>
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </ul>
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className={link}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
