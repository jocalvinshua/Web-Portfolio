import Link from "next/link";
import ScrollEffect from "../../../components/ScrollEffect";
import ImageCarousel from "@/components/ImageCarousel";
import { createClient } from "@/lib/supabase";
import { cookies } from "next/headers";

export const revalidate = 3600;

// ── Tech tag color mapping ──
const techColors = {
  React: {
    bg: "rgba(97,218,251,0.08)",
    border: "rgba(97,218,251,0.2)",
    text: "#61dafb",
  },
  "Node.js": {
    bg: "rgba(104,160,99,0.08)",
    border: "rgba(104,160,99,0.2)",
    text: "#68a063",
  },
  "Tailwind CSS": {
    bg: "rgba(56,189,248,0.08)",
    border: "rgba(56,189,248,0.2)",
    text: "#38bdf8",
  },
  "OpenAI API": {
    bg: "rgba(16,163,127,0.08)",
    border: "rgba(16,163,127,0.2)",
    text: "#10a37f",
  },
  Supabase: {
    bg: "rgba(62,207,142,0.08)",
    border: "rgba(62,207,142,0.2)",
    text: "#3ecf8e",
  },
  "Jikan API": {
    bg: "rgba(225,100,100,0.08)",
    border: "rgba(225,100,100,0.2)",
    text: "#e16464",
  },
};

const defaultTechColor = {
  bg: "rgba(148,163,184,0.08)",
  border: "rgba(148,163,184,0.2)",
  text: "#94a3b8",
};

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  let project = null;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from("my_projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Proyek tidak ditemukan di Supabase:", error.message);
    } else {
      project = data;
    }
  } catch (err) {
    console.error("Kesalahan jaringan database:", err);
  }

  if (!project) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6 text-bright"
        style={{ backgroundColor: "#0a0a0b" }}
      >
        <p className="text-[11px] font-mono tracking-[0.2em] text-primary">
          // ERROR 404
        </p>
        <h1 className="text-3xl font-extrabold text-bright">
          Project Not Found
        </h1>
        <p className="text-sm text-muted">
          This project doesn't exist or may have been removed.
        </p>
        <Link
          href="/projects"
          className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary border border-[#e11d48]/30 px-4 py-2 rounded-xl hover:bg-[#e11d48]/10 transition-all duration-200"
        >
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const hasImage = project.image && project.image.length > 0;

  return (
    <div
      className="min-h-screen text-bright selection:bg-[#e11d48]/30"
      style={{ backgroundColor: "#0a0a0b" }}
    >
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 80% 10%, rgba(225,29,72,0.06) 0%, transparent 70%)",
        }}
      />

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-20 flex flex-col gap-10">
        {/* ── Back button ── */}
        <ScrollEffect variant="fadeRight" duration={400}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[12px] font-mono text-muted hover:text-primary transition-colors duration-200 group w-fit"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
            Back to Projects
          </Link>
        </ScrollEffect>

        {/* ── Project header ── */}
        <ScrollEffect variant="fadeUp" delay={80} duration={550}>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[11px] font-mono tracking-[0.18em] text-primary">
                // CASE STUDY
              </span>
              <span className="text-[11px] font-mono text-muted/40 tracking-widest">
                {project.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-bright leading-[1.1]">
              {project.title}
              <span className="text-primary">.</span>
            </h1>
            <p className="text-[12px] font-mono text-muted/40">
              {project.year}
            </p>
          </div>
        </ScrollEffect>

        {/* ── Hero image ── */}
        <ScrollEffect variant="scaleUp" delay={150} duration={600}>
          <ImageCarousel images={project.image} title={project.title} />
        </ScrollEffect>

        {/* ── Detail grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Left: Description + highlights */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* Overview */}
            <ScrollEffect variant="fadeRight" delay={200} duration={550}>
              <div
                className="rounded-2xl border p-6 md:p-8 space-y-4 relative overflow-hidden"
                style={{
                  backgroundColor: "rgba(42,52,57,0.4)",
                  borderColor: "rgba(248,250,252,0.07)",
                }}
              >
                <div
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at top right, rgba(225,29,72,0.06), transparent 65%)",
                  }}
                />
                <h2 className="text-[13px] font-mono tracking-[0.15em] text-primary uppercase">
                  // Project Overview
                </h2>
                <p className="text-[14px] md:text-[15px] text-muted leading-relaxed">
                  {project.description}
                </p>
                {project.details && (
                  <p
                    className="text-[13px] md:text-[14px] text-muted/70 leading-relaxed pt-4"
                    style={{ borderTop: "1px solid rgba(248,250,252,0.06)" }}
                  >
                    {project.details}
                  </p>
                )}
              </div>
            </ScrollEffect>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <ScrollEffect variant="fadeRight" delay={300} duration={550}>
                <div
                  className="rounded-2xl border p-6 md:p-8 space-y-4"
                  style={{
                    backgroundColor: "rgba(42,52,57,0.3)",
                    borderColor: "rgba(248,250,252,0.07)",
                  }}
                >
                  <h2 className="text-[13px] font-mono tracking-[0.15em] text-primary uppercase">
                    // Key Highlights
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {project.highlights.map((item, i) => (
                      <ScrollEffect
                        key={i}
                        variant="fadeRight"
                        delay={360 + i * 70}
                        duration={400}
                      >
                        <li className="flex items-start gap-3 text-[13px] text-muted leading-relaxed group">
                          <span className="bg-primary mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                          {item}
                        </li>
                      </ScrollEffect>
                    ))}
                  </ul>
                </div>
              </ScrollEffect>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {/* Tech Stack */}
            {project.technologies && (
              <ScrollEffect variant="fadeLeft" delay={220} duration={550}>
                <div
                  className="rounded-2xl border p-5 space-y-4"
                  style={{
                    backgroundColor: "rgba(42,52,57,0.35)",
                    borderColor: "rgba(248,250,252,0.07)",
                  }}
                >
                  <h3 className="text-[11px] font-mono tracking-[0.18em] text-primary uppercase">
                    // Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => {
                      const style = techColors[tech] ?? defaultTechColor;
                      return (
                        <span
                          key={i}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-lg border"
                          style={{
                            backgroundColor: style.bg,
                            borderColor: style.border,
                            color: style.text,
                          }}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </ScrollEffect>
            )}

            {/* Project meta */}
            <ScrollEffect variant="fadeLeft" delay={310} duration={550}>
              <div
                className="rounded-2xl border p-5 space-y-3"
                style={{
                  backgroundColor: "rgba(42,52,57,0.35)",
                  borderColor: "rgba(248,250,252,0.07)",
                }}
              >
                <h3 className="text-[11px] font-mono tracking-[0.18em] text-primary uppercase mb-1">
                  // Project Info
                </h3>
                {[
                  { label: "Year", value: project.year },
                  { label: "Category", value: project.category },
                ].map((meta) => (
                  <div
                    key={meta.label}
                    className="flex items-center justify-between py-2"
                    style={{ borderBottom: "1px solid rgba(248,250,252,0.05)" }}
                  >
                    <span className="text-[11px] font-mono text-muted/50 uppercase tracking-wider">
                      {meta.label}
                    </span>
                    <span className="text-[11px] font-mono text-muted/50 uppercase tracking-wider">
                      {meta.value}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollEffect>

            {/* CTA */}
            {project.link && (
              <ScrollEffect variant="fadeLeft" delay={400} duration={500}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl border font-medium text-[13px] transition-all duration-200 group hover:border-[#e11d48]/50 hover:bg-[#e11d48]/10"
                  style={{
                    backgroundColor: "rgba(225,29,72,0.08)",
                    borderColor: "rgba(225,29,72,0.25)",
                    color: "#e11d48",
                  }}
                >
                  <span>
                    {project.link.includes("github")
                      ? "View on GitHub"
                      : "Open Live Demo"}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </ScrollEffect>
            )}
          </div>
        </div>

        {/* ── Bottom nav ── */}
        <ScrollEffect variant="fadeUp" delay={100} duration={500}>
          <div
            className="flex items-center justify-between pt-8 mt-4"
            style={{ borderTop: "1px solid rgba(248,250,252,0.06)" }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[12px] font-mono text-muted hover:text-bright transition-colors duration-200 group"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1">
                ←
              </span>
              All Projects
            </Link>
            <span className="text-[11px] font-mono text-muted/30 tracking-widest">
              {project.year} · {project.category}
            </span>
          </div>
        </ScrollEffect>
      </main>
    </div>
  );
}
