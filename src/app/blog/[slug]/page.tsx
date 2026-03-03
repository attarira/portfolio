import { notFound } from "next/navigation";
import Link from "next/link";
import { blogs } from "@/data/blog";

export function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.02),transparent_50%)]" />

      <article className="relative z-10 py-24 px-6 max-w-3xl mx-auto">
        <Link
          href="/#blog"
          className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 mb-12 text-sm font-medium tracking-wide"
        >
          &larr; Back to Home
        </Link>

        <header className="mb-14">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground/90">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm tracking-wider text-muted-foreground uppercase">
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-border"></span>
            <span>{post.readTime}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium tracking-wide text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="space-y-8 text-muted leading-relaxed text-base md:text-lg">
          {post.content.map((block, i) => {
            switch (block.type) {
              case "paragraph":
                return <p key={i} className="opacity-90">{block.text}</p>;
              case "heading":
                return (
                  <h2 key={i} className="text-2xl font-semibold text-foreground/90 mt-16 mb-6 tracking-tight">
                    {block.text}
                  </h2>
                );
              case "code":
                return (
                  <pre key={i} className="bg-white/5 p-4 rounded-xl overflow-x-auto border border-white/10 text-sm font-mono mt-8 mb-8">
                    <code>{block.text}</code>
                  </pre>
                );
              case "list":
                return (
                  <ul key={i} className="list-disc space-y-3 pl-5 opacity-90 marker:text-white/30">
                    {block.items?.map((item, j) => (
                      <li key={j} className="pl-2">{item}</li>
                    ))}
                  </ul>
                );
              default:
                return null;
            }
          })}
        </div>
      </article>
    </main>
  );
}
