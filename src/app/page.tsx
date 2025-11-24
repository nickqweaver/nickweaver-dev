import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { ContactSection } from "@/components/contact-section";
import { Icon } from "@iconify/react";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script
        defer
        data-domain="nickweaver.dev"
        src="https://plausible-analytics-ce-production-0932.up.railway.app/js/script.outbound-links.tagged-events.js"
      />
      <div className="relative min-h-screen bg-background text-foreground">
        <div className="relative z-10">
          <main>
            {/* Hero */}
            <section className="container pt-32 pb-20 md:pt-48 md:pb-32">
              <div className="max-w-3xl space-y-6">
                <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl teal-gradient animate-float">
                  Crafting Digital Experiences
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  Full Stack Engineer with 5 years of experience building robust
                  web applications and transforming user experiences.
                </p>
                <div className="flex-col sm:flex-row flex gap-4 pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Link href="#work">Explore Projects</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Link href="#contact" className="flex items-center">
                      <Icon
                        className="mr-2 h-5 w-5"
                        icon="solar:letter-linear"
                      />
                      Get in Touch
                    </Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Selected Work */}
            <section id="work" className="py-20">
              <div className="container">
                <h2 className="text-3xl font-bold mb-12 teal-gradient">
                  Professional Work
                </h2>
                <div className="space-y-8">
                  <ProjectCard
                    title="Digital Greeting Card Platform"
                    description="Developing a digital card system allowing users to create, customize, and send virtual greeting cards, expanding the company's product offerings beyond physical cards."
                    role="Full Stack Engineer"
                    year="2024-Present"
                    tags={["React", "Node.js", "GraphQL", "Django", "Python"]}
                    link="#"
                  />
                  <ProjectCard
                    title="TipTap Card Editor Rebuild"
                    description="Completely rebuilt a web-based greeting card rich text editor using TipTap and ProseMirror, significantly boosting performance and reducing re-renders for a smoother user experience."
                    role="Front-End Engineer"
                    year="2024-2025"
                    tags={[
                      "React",
                      "TypeScript",
                      "TipTap",
                      "ProseMirror",
                      "CSS",
                    ]}
                    link="#"
                  />
                  <ProjectCard
                    title="Saleor E-Commerce Integration"
                    description="Led the migration of a legacy custom ordering system to the Saleor e-commerce platform, enhancing order management capabilities and improving the customer purchasing experience."
                    role="Full Stack Engineer"
                    year="2023-2025"
                    tags={[
                      "React",
                      "Python",
                      "GraphQL",
                      "Saleor",
                      "PostgreSQL",
                    ]}
                    link="#"
                  />
                  <ProjectCard
                    title="Tiny LSM"
                    description="A toy LSM (Log Structured Merge Tree). I learned about LSM trees being the backbone for NoSQL databases so decided to build a very simple basic version of this"
                    role="Full Stack Engineer"
                    year="2025"
                    tags={["Python"]}
                    linke="https://github.com/nickqweaver/tiny-lsm"
                  />
                </div>
                <div className="mt-16 text-center">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="hover:bg-secondary hover:text-secondary-foreground"
                  >
                    <a
                      href="https://github.com/nickqweaver"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <Icon
                        icon="octicon:mark-github-24"
                        className="mr-2 h-6 w-6"
                      />
                      View GitHub Profile
                    </a>
                  </Button>
                </div>
              </div>
            </section>

            {/* About */}
            <section id="about" className="py-20 bg-secondary/30">
              <div className="container">
                <div className="grid grid-cols-1 gap-12 items-start">
                  <div className="md:col-span-2 space-y-6">
                    <h2 className="text-3xl font-bold mb-6 teal-gradient">
                      About Me
                    </h2>
                    <div className="prose dark:prose-invert">
                      <p>
                        I&apos;m a passionate Full Stack Engineer with 5 years
                        of experience specializing in web application
                        development. Currently working at SendOutCards, I enjoy
                        solving complex problems and creating intuitive user
                        experiences. My expertise spans across front-end and
                        back-end technologies, with a particular focus on React
                        ecosystems and modern JavaScript frameworks.
                      </p>

                      <p>
                        While I have several personal projects in development,
                        my professional work has focused on transforming
                        e-commerce experiences and rebuilding critical
                        user-facing applications. I&apos;m constantly learning
                        and expanding my skill set to stay at the forefront of
                        web technology.
                      </p>
                    </div>
                    <div className="space-y-8 pt-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-primary">
                          Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "React",
                            "Node.js",
                            "Python",
                            "GraphQL",
                            "TypeScript",
                            "AWS",
                            "Docker",
                            "PostgreSQL",
                            "MongoDB",
                            "Redis",
                          ].map((tech) => (
                            <span key={tech} className="skill-badge">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <ContactSection />
          </main>
        </div>
      </div>
    </>
  );
}
