"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { blogs } from "@/data/blog";
import SectionHeading from "./SectionHeading";
import Link from "next/link";

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(0);
  const blogsPerPage = 3;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const visibleBlogs = blogs.slice(
    currentPage * blogsPerPage,
    (currentPage + 1) * blogsPerPage
  );

  return (
    <section id="blog" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Writing"
          subtitle="Thoughts and technical deep-dives on machine learning, systems architecture, and AI engineering."
        />

        <div className="flex flex-col gap-6 min-h-[500px]">
          {visibleBlogs.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:border-white/20 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-black/50"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between mb-4">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground/90 transition-colors group-hover:text-foreground">
                      {post.title}
                    </h3>
                    <div className="shrink-0 flex items-center gap-3 text-xs tracking-wider text-muted-foreground uppercase mt-1 md:mt-1.5">
                      <span>{post.date}</span>
                      <span className="h-1 w-1 rounded-full bg-border"></span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <p className="text-[15px] leading-relaxed md:leading-loose text-muted mt-2">
                    {post.preview}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium tracking-wide text-muted-foreground transition-colors group-hover:border-accent/20 group-hover:bg-accent/5 group-hover:text-foreground/90 mb-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {totalPages > 0 && (
          <div className="mt-12 flex justify-center gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentPage === i
                    ? "bg-accent w-8"
                    : "bg-white/20 w-2 hover:bg-white/40"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
