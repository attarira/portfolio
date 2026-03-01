"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import SectionHeading from "./SectionHeading";

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    className="transition-transform duration-200 group-hover:translate-x-0.5"
  >
    <path
      d="M6 3L11 8L6 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Projects"
          subtitle="Selected work across healthcare AI, fintech ML systems, and cloud infrastructure."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-black/50"
            >
              {/* Subtle gradient hover effect */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-xl font-semibold tracking-tight text-foreground/90 transition-colors group-hover:text-foreground">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-5 space-y-3 border-l-2 border-white/5 pl-4 transition-colors group-hover:border-accent/30">
                  <p className="text-sm text-muted">
                    <span className="font-semibold text-foreground/70">Problem:</span>{" "}
                    {project.problem}
                  </p>
                  <p className="text-sm text-muted">
                    <span className="font-semibold text-foreground/70">Impact:</span>{" "}
                    {project.outcome}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium tracking-wide text-muted-foreground transition-colors group-hover:border-accent/20 group-hover:bg-accent/5 group-hover:text-foreground/90 mb-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-8 flex items-center gap-6">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    Source Code
                    <ArrowIcon />
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-foreground"
                      aria-label={`View ${project.title} live demo`}
                    >
                      Live Demo
                      <ArrowIcon />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
