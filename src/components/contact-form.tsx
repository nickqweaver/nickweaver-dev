"use client"

import { useState } from "react"

type Status = "idle" | "sending" | "success" | "error"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<Status>("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to send")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-2">
        <div className="text-muted-foreground">
          <span className="text-dr-green">❯</span> ./send.sh --to nick
        </div>
        <div className="text-dr-green">✓ Message sent. I&apos;ll get back to you soon.</div>
        <button
          onClick={() => {
            setStatus("idle")
            setFormData({ name: "", email: "", message: "" })
          }}
          className="text-muted-foreground hover:text-primary transition-colors mt-4"
        >
          → send another
        </button>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="space-y-2">
        <div className="text-muted-foreground">
          <span className="text-dr-red">❯</span> ./send.sh --to nick
        </div>
        <div className="text-dr-red">✗ Failed to send. Try again?</div>
        <button
          onClick={() => setStatus("idle")}
          className="text-muted-foreground hover:text-primary transition-colors mt-4"
        >
          → retry
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
        disabled={status === "sending"}
        className="text-muted-foreground hover:text-dr-green transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "[sending...]" : "[send]"}
      </button>
    </form>
  )
}
