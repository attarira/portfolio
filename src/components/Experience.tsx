"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Experience"
          subtitle="3+ years building AI systems across healthcare, fintech, and enterprise software."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* Vertical Timeline line */}
          <div
            className="absolute top-0 bottom-0 left-[15px] w-px bg-border/50"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.role}-${exp.company}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="relative pl-12 sm:pl-16"
              >
                {/* Timeline dot */}
                <div
                  className="absolute top-1.5 left-[11px] z-10 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background"
                  aria-hidden="true"
                />

                {/* Content card */}
                <div className="group rounded-xl border border-transparent bg-transparent transition-all duration-300 hover:bg-white/[0.02]">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent-foreground">
                      {exp.role}
                    </h3>
                    <span className="text-xs tracking-wider text-muted-foreground uppercase">
                      {exp.dates}
                    </span>
                  </div>
                  <p className="mt-1 font-medium text-muted">
                    {exp.company}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[14px] leading-relaxed text-muted-foreground transition-colors group-hover:text-muted"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/50"
                          aria-hidden="true"
                        />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
