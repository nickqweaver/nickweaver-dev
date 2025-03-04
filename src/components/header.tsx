"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", title: "Home" },
  { href: "/#work", title: "Work" },
  { href: "/#about", title: "About" },
  { href: "/blog", title: "Blog" },
  { href: "/#contact", title: "Contact" },
];
export function Header() {
  const link = "text-sm hover:text-primary transition-colors";
  return (
    <header className="fixed top-0 w-full z-40 bg-background/80 backdrop-filter backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-bold teal-gradient flex justify-center gap-2 items-center"
        >
          <Icon
            icon="solar:code-circle-line-duotone"
            className="w-8 h-8 text-teal"
          />
          <span className="text-lg md:text-2xl">NICKWEAVER.DEV</span>
        </Link>
        <nav className="flex gap-4 md:gap-8">
          <ul className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Icon
                    className="h-[1.2rem] w-[1.2rem]"
                    icon="solar:hamburger-menu-linear"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {links.map((l) => (
                  <DropdownMenuItem key={l.title}>
                    <Link href={l.href} className={link}>
                      {l.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </ul>
          <ul className="items-center gap-8 hidden md:flex">
            {links.map((l) => (
              <li key={l.title}>
                <Link href={l.href} className={link}>
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
