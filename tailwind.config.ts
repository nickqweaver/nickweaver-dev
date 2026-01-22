/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: ({ theme }: { theme: (path: string) => string[] | string }) => {
        const sans = (theme("fontFamily.sans") as string[]).join(", ")
        const mono = (theme("fontFamily.mono") as string[]).join(", ")
        const proseColors = {
          "--tw-prose-body": "hsl(var(--foreground))",
          "--tw-prose-headings": "hsl(var(--foreground))",
          "--tw-prose-lead": "hsl(var(--muted-foreground))",
          "--tw-prose-links": "hsl(var(--primary))",
          "--tw-prose-bold": "hsl(var(--foreground))",
          "--tw-prose-counters": "hsl(var(--muted-foreground))",
          "--tw-prose-bullets": "hsl(var(--muted-foreground))",
          "--tw-prose-hr": "hsl(var(--border))",
          "--tw-prose-quotes": "hsl(var(--foreground))",
          "--tw-prose-quote-borders": "hsl(var(--border))",
          "--tw-prose-captions": "hsl(var(--muted-foreground))",
          "--tw-prose-code": "hsl(var(--foreground))",
          "--tw-prose-pre-code": "hsl(var(--foreground))",
          "--tw-prose-pre-bg": "hsl(var(--secondary))",
          "--tw-prose-th-borders": "hsl(var(--border))",
          "--tw-prose-td-borders": "hsl(var(--border))",
        }

        return {
          DEFAULT: {
            css: {
              ...proseColors,
              fontFamily: sans,
              lineHeight: "1.8",
              h1: { letterSpacing: "-0.02em" },
              h2: { letterSpacing: "-0.02em" },
              h3: { letterSpacing: "-0.01em" },
              a: { textDecoration: "none", fontWeight: "500" },
              "a:hover": { textDecoration: "underline" },
              code: { fontFamily: mono, fontWeight: "500" },
              pre: {
                fontFamily: mono,
                borderRadius: theme("borderRadius.lg"),
                border: "1px solid hsl(var(--border))",
              },
            },
          },
          invert: {
            css: {
              ...proseColors,
              fontFamily: sans,
              a: { textDecoration: "none", fontWeight: "500" },
              "a:hover": { textDecoration: "underline" },
              code: { fontFamily: mono, fontWeight: "500" },
              pre: {
                fontFamily: mono,
                borderRadius: theme("borderRadius.lg"),
                border: "1px solid hsl(var(--border))",
              },
            },
          },
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
