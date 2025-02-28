"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { ExternalLink } from "lucide-react";

interface ProjectItemProps {
  title: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  image: string;
  imageAlt: string;
  link: string;
  align: "left" | "right";
}

export function ProjectItem({
  title,
  description,
  role,
  year,
  tags,
  image,
  imageAlt,
  link,
  align,
}: ProjectItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
        align === "right" ? "md:grid-flow-col" : ""
      }`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : "translateY(50px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <div className={`space-y-4 ${align === "right" ? "md:order-2" : ""}`}>
        <h3 className="text-2xl font-bold gradient-text">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-primary">{role}</span>
          <span className="text-sm text-muted-foreground">{year}</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span key={tag} className="skill-badge">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          Access Project <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
      <div className={`${align === "right" ? "md:order-1" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg cyberpunk-border">
          <Image
            src={image || "/placeholder.svg"}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
