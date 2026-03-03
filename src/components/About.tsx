"use client";

import { motion } from "framer-motion";

const UniversityIcon = () => (
  <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.25L1.5 10l10.5 5.75L22.5 10 12 4.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M22.5 10v6a1.5 1.5 0 01-1.5 1.5h-1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15v3c0 1.25 1.75 2.25 3.75 2.25s3.75-1 3.75-2.25v-3" />
  </svg>
);

const CloudIcon = () => (
  <svg className="w-3.5 h-3.5 mr-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const CheckBadgeIcon = () => (
  <svg className="w-3.5 h-3.5 mr-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

export default function About() {
  return (
    <section id="about" className="px-6 py-24 md:py-32 bg-transparent text-white font-sans">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-16"
        >
          {/* Hero Headline & Refined Body */}
          <div>
            <h2 className="font-mono text-xs tracking-[2px] uppercase text-white/40 mb-6">
              About
            </h2>
            <h1 className="text-3xl md:text-[2.5rem] leading-[1.2] font-semibold tracking-tight text-white mb-8 max-w-[800px]">
              I&apos;m a Machine Learning Engineer with 3+ years of experience building and deploying real-world AI systems across healthcare, fintech, and enterprise software.
            </h1>

            <div className="space-y-6 max-w-[650px] text-base md:text-[1.05rem] leading-[1.6] text-white/70 font-light">
              <p>
                My work sits at the intersection of applied machine learning, product, and infrastructure — from early prototypes to production systems running in the cloud on GCP and AWS.
              </p>
              <p>
                Most recently, I&apos;ve been the founding ML engineer at Routerr Health, a healthcare startup working to make Hospital-at-Home care actually scalable. Our goal is simple but hard: get the right clinician to the right patient at the right time. I focus on building the intelligence behind that process so care teams can move faster, operate more efficiently, and ultimately deliver better patient outcomes.
              </p>
              <p>
                Before that, I worked in fintech at Avati, building predictive risk models used by banks to catch early signs of portfolio risk and prevent major losses. At Perficient, I helped modernize large enterprise platforms by migrating legacy systems to cloud-native microservices on Google Cloud.
              </p>
              <p>
                I&apos;m especially interested in building LLM-powered products, intelligent agents, and real-time ML systems that solve practical problems. My core tools include Python, PyTorch, TensorFlow, LangChain, RAG pipelines, Docker, Kubernetes, and modern cloud platforms.
              </p>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-mono text-xs tracking-[2px] uppercase text-white/40 mb-6">
              Education
            </h3>
            <div className="space-y-4 max-w-[650px]">
              <div className="flex items-start gap-5 rounded-xl bg-[#161616] p-6 transition-colors hover:bg-[#1a1a1a]">
                <div className="shrink-0 mt-0.5">
                  <UniversityIcon />
                </div>
                <div>
                  <p className="text-base font-medium text-white/90 tracking-tight">
                    Columbia University
                  </p>
                  <p className="text-sm text-white/50 mt-1 font-light">
                    Master of Science — Computer Science · Aug 2024 — Dec 2025
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5 rounded-xl bg-[#161616] p-6 transition-colors hover:bg-[#1a1a1a]">
                <div className="shrink-0 mt-0.5">
                  <UniversityIcon />
                </div>
                <div>
                  <p className="text-base font-medium text-white/90 tracking-tight">
                    Grinnell College
                  </p>
                  <p className="text-sm text-white/50 mt-1 font-light">
                    Bachelor of Arts — Computer Science &amp; Mathematics · Aug 2018 — May 2022
                  </p>
                  <p className="text-sm text-emerald-400 mt-2 font-medium tracking-wide">
                    Phi Beta Kappa · Honors in CS · Dean&apos;s List (x8)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-mono text-xs tracking-[2px] uppercase text-white/40 mb-6">
              Certifications
            </h3>
            <div className="flex flex-wrap gap-3 max-w-[650px]">
              {[
                { name: "Google Cloud — ML Engineer", icon: <CloudIcon /> },
                { name: "Scrum Fundamentals Certified", icon: <CheckBadgeIcon /> },
                { name: "AT&T Summer Learning Academy Extern", icon: <CheckBadgeIcon /> },
              ].map((cert) => (
                <span
                  key={cert.name}
                  className="inline-flex items-center rounded-full border border-white/10 bg-transparent px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {cert.icon}
                  {cert.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
