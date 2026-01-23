"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

const CommandMenuContext = createContext<{ open: boolean; setOpen: (open: boolean) => void } | null>(null)

export function useCommandMenu() {
  const context = useContext(CommandMenuContext)
  if (!context) throw new Error("useCommandMenu must be used within CommandMenuProvider")
  return context
}

const pages = [
  { name: "Home", href: "/", keywords: ["home", "index", "main"] },
  { name: "Blog", href: "/blog", keywords: ["blog", "posts", "writing", "articles"] },
  { name: "Resume", href: "/resume", keywords: ["resume", "cv", "experience", "work"] },
]

const sections = [
  { name: "Experience", href: "/#experience", keywords: ["experience", "work", "skills"] },
  { name: "Projects", href: "/#projects", keywords: ["projects", "work", "portfolio"] },
  { name: "Writing", href: "/#writing", keywords: ["writing", "blog", "posts"] },
  { name: "Contact", href: "/#contact", keywords: ["contact", "email", "message"] },
]

const socials = [
  { name: "GitHub", href: "https://github.com/nickqweaver", keywords: ["github", "code", "repo"] },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/nicholas-q-weaver/", keywords: ["linkedin", "professional"] },
  { name: "X / Twitter", href: "https://twitter.com/TheSWEaver", keywords: ["twitter", "x", "social"] },
]

export function CommandMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <CommandMenuContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandMenuDialog />
    </CommandMenuContext.Provider>
  )
}

function CommandMenuDialog() {
  const { open, setOpen } = useCommandMenu()
  const router = useRouter()
  const { setTheme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Pages">
          {pages.map((page) => (
            <CommandItem
              key={page.href}
              value={page.name + " " + page.keywords.join(" ")}
              onSelect={() => runCommand(() => router.push(page.href))}
            >
              <span className="text-dr-green mr-2">→</span>
              {page.name}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Sections">
          {sections.map((section) => (
            <CommandItem
              key={section.href}
              value={section.name + " " + section.keywords.join(" ")}
              onSelect={() => runCommand(() => router.push(section.href))}
            >
              <span className="text-dr-purple mr-2">#</span>
              {section.name}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem
            value="dark mode theme"
            onSelect={() => runCommand(() => setTheme("dark"))}
          >
            <span className="text-dr-cyan mr-2">◐</span>
            Dark Mode
          </CommandItem>
          <CommandItem
            value="light mode theme"
            onSelect={() => runCommand(() => setTheme("light"))}
          >
            <span className="text-dr-yellow mr-2">○</span>
            Light Mode
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links">
          {socials.map((social) => (
            <CommandItem
              key={social.href}
              value={social.name + " " + social.keywords.join(" ")}
              onSelect={() => runCommand(() => window.open(social.href, "_blank"))}
            >
              <span className="text-dr-pink mr-2">↗</span>
              {social.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
