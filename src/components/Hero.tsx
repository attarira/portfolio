"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

/* ── Lazy-load the 3D vortex so it doesn't block initial paint ── */
const VortexField = dynamic(() => import("./VortexField"), { ssr: false });

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 lg:px-16"
      style={{ background: "#000000" }}
    >
      {/* ─── BACKGROUND: 3D Particle Vortex ─── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <VortexField />
      </div>

      {/* ─── Gradient overlay for text readability ─── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.0) 70%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* ─── LEFT: Text Content ─── */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Rayaan Attari
            </h1>
            <p className="mt-3 text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase sm:text-sm">
              Machine Learning Engineer
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="mt-8 text-base leading-[1.75] text-muted sm:text-lg"
          >
            I&apos;m a Machine Learning Engineer with 3+ years of experience building and deploying real-world AI systems across healthcare, fintech, and enterprise software. My work sits at the intersection of applied machine learning, product, and infrastructure, from early prototypes to production systems running in the cloud on GCP and AWS.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mt-10 flex items-center gap-6"
          >
            <a
              href="#projects"
              className="inline-flex items-center rounded bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors duration-200 hover:bg-foreground/90"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted underline underline-offset-4 transition-colors duration-200 hover:text-foreground"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-muted underline underline-offset-4 transition-colors duration-200 hover:text-foreground"
            >
              Contact
            </a>
          </motion.div>

          {/* Social proof logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mt-14 flex items-center gap-10"
          >
            <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground/60 uppercase">
              Previously at
            </span>
            <div className="flex items-center gap-8">
              <Image
                src="/columbia-logo.png"
                alt="Columbia University"
                width={28}
                height={28}
                className="opacity-40 grayscale transition-opacity duration-300 hover:opacity-70"
              />
              <Image
                src="/routerr-logo.png"
                alt="Routerr Health"
                width={72}
                height={20}
                className="h-5 w-auto opacity-40 grayscale transition-opacity duration-300 hover:opacity-70"
              />
              <Image
                src="/perficient-logo.png"
                alt="Perficient"
                width={80}
                height={20}
                className="h-5 w-auto opacity-40 grayscale transition-opacity duration-300 hover:opacity-70"
              />
            </div>
          </motion.div>
        </div>

        {/* ─── RIGHT: empty column so text stays left-aligned in grid ─── */}
        <div className="hidden lg:block" />
      </div>
    </section>
  );
}
