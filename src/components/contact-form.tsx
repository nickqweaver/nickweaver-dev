"use client"

import { useState } from "react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder - will wire up to backend later
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="space-y-2">
        <div className="text-muted-foreground">
          <span className="text-dr-green">❯</span> ./send.sh --to nick
        </div>
        <div className="text-dr-green">✓ Message queued. I&apos;ll get back to you soon.</div>
        <button
          onClick={() => {
            setSubmitted(false)
            setFormData({ name: "", email: "", message: "" })
          }}
          className="text-muted-foreground hover:text-primary transition-colors mt-4"
        >
          → send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground block mb-1">
            <span className="text-dr-purple">$</span> NAME
          </label>
          <div className="flex items-center border border-border bg-background">
            <span className="text-dr-green px-3 py-2 border-r border-border">❯</span>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              placeholder="your name"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-1">
            <span className="text-dr-purple">$</span> EMAIL
          </label>
          <div className="flex items-center border border-border bg-background">
            <span className="text-dr-green px-3 py-2 border-r border-border">❯</span>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              placeholder="you@email.com"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground block mb-1">
          <span className="text-dr-purple">$</span> MESSAGE
        </label>
        <div className="flex border border-border bg-background">
          <span className="text-dr-green px-3 py-2 border-r border-border">❯</span>
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none resize-none"
            placeholder="what's on your mind?"
          />
        </div>
      </div>

      <button
        type="submit"
        className="text-muted-foreground hover:text-dr-green transition-colors"
      >
        [send]
      </button>
    </form>
  )
}
