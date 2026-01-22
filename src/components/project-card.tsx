import { Icon } from "@iconify/react"

interface ProjectCardProps {
  title: string
  description: string
  role: string
  year: string
  tags: string[]
  link: string
}

export function ProjectCard({ title, description, role, year, tags, link }: ProjectCardProps) {
  return (
    <div className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-primary">{role}</span>
        <span className="text-sm text-muted-foreground">{year}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
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
        View Project <Icon icon="solar:square-top-down-linear" className="ml-1 h-3 w-3" />
      </a>
    </div>
  )
}
