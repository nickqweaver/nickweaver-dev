import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import "./globals.css"
import { Icon } from "@iconify/react/dist/iconify.js"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Nick Weaver | Software Engineer",
  description:
    "Portfolio of Nick Weaver, a software engineer specializing in web development and cloud solutions.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>

        <footer className="border-t border-border py-6 bg-background">
          <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NICKWEAVER.DEV All rights reserved.
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com/nickqweaver"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon icon="octicon:mark-github-24" className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <p className="text-sm text-muted-foreground flex items-center mt-1">
                <a
                  href={`https://twitter.com/TheSWEaver`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <Icon icon="hugeicons:new-twitter" className="w-4 h-4" />
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
