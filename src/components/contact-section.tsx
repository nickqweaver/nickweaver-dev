"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 teal-gradient text-center">
            Get in Touch
          </h2>

          {isSubmitted ? (
            <div className="text-center p-8 rounded-lg bg-secondary">
              <Icon
                className="h-12 w-12 text-primary mx-auto mb-4"
                icon="solar:check-circle-linear"
              />
              <h3 className="text-2xl font-medium mb-2">Message Sent!</h3>
              <p className="text-muted-foreground mb-6">
                Thank you for reaching out. I&apos;ll get back to you as soon as
                possible.
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    required
                    className="bg-background border-input focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="bg-background border-input focus:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-foreground">
                  Subject
                </Label>
                <Input
                  id="subject"
                  required
                  className="bg-background border-input focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={6}
                  required
                  className="bg-background border-input focus:border-primary"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? <>Sending...</> : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
