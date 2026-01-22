import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import "./globals.css"
import { Icon } from "@iconify/react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/nickqweaver",
    icon: "octicon:mark-github-24",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nicholas-q-weaver/",
    icon: "simple-icons:linkedin",
  },
  {
    label: "X",
    href: "https://twitter.com/TheSWEaver",
    icon: "simple-icons:x",
  },
]

export const metadata: Metadata = {
  title: "Nick Weaver | Systems SWE",
  description:
    "Systems-oriented software engineer focused on designing and debugging reliable, understandable distributed systems.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <div className="flex-1">{children}</div>
            <footer className="border-t border-border bg-background">
              <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Nick Weaver. Systems-oriented SWE.
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                    >
                      <Icon icon={link.icon} className="h-4 w-4" />
                      <span className="font-mono text-xs uppercase tracking-[0.2em]">
                        {link.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
