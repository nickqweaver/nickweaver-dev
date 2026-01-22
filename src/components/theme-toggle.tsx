"use client"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycle = () => {
    if (theme === "dark") setTheme("light")
    else setTheme("dark")
  }

  return (
    <button
      onClick={cycle}
      className="text-muted-foreground hover:text-primary transition-colors"
      title="Toggle theme"
    >
      <span className="hidden dark:inline">[light]</span>
      <span className="dark:hidden">[dark]</span>
    </button>
  )
}
