import ProjectCard from "@/components/ProjectCard";
import HeaderSection from "@/components/HeaderSection";
import ScrollEffect from "@/components/ScrollEffect";
import SkillsCard from "@/components/SkillsCard";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { cookies } from "next/headers";

export const revalidate = 3600;

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let skills = [];
  let projects = [];

  try {
    const [skillsRes, projectsRes] = await Promise.all([
      supabase
        .from("my_skills")
        .select("*")
        .order("level", { ascending: false }),
      supabase
        .from("my_projects")
        .select("*")
        .order("year", { ascending: false }),
    ]);

    // Cek apakah ada error terselubung dari database
    if (skillsRes.error) console.error("Error Skills:", skillsRes.error);
    if (projectsRes.error) console.error("Error Projects:", projectsRes.error);

    skills = skillsRes.data || [];
    projects = projectsRes.data || [];

    // console.log("Data Proyek Berhasil Diambil:", projects);
  } catch (error) {
    console.error("Gagal mengeksekusi Promise.all:", error);
  }

  const featuredProjects = projects.slice(0, 3);
  const featuredSkills = skills.filter((skill) => skill.level >= 4);

  return (
    <div
      className="min-h-screen text-[#f8fafc] selection:bg-[#e11d48]/30 selection:text-[#f8fafc]"
      style={{ backgroundColor: "#0a0a0b" }}
    >
      {/* ── Fixed ambient background ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 55% 40% at 75% 5%, rgba(225,29,72,0.07) 0%, transparent 65%)",
            "radial-gradient(ellipse 40% 50% at 5% 90%, rgba(42,52,57,0.5) 0%, transparent 60%)",
            "radial-gradient(ellipse 30% 30% at 50% 50%, rgba(42,52,57,0.15) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col gap-32">
        {/* ══ SECTION 1 — HERO ══ */}
        <HeaderSection />

        {/* ══ SECTION 2 — FEATURED PROJECTS ══ */}
        <section>
          {/* Section heading */}
          <ScrollEffect variant="fadeUp" duration={500}>
            <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
              <div className="flex flex-col gap-2">
                {/* Label */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-[#e11d48] tracking-[0.18em]">
                    // 02
                  </span>
                  <div
                    className="h-px w-10"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(225,29,72,0.5), transparent)",
                    }}
                  />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#f8fafc] leading-tight">
                  Featured <span className="text-[#e11d48]">Projects</span>
                  <span className="text-[#e11d48]">.</span>
                </h2>
                <p className="text-[14px] text-[#94a3b8] leading-relaxed max-w-md">
                  Showcasing impactful projects and technical achievements.
                </p>
              </div>

              {/* Desktop "View All" link */}
              <Link
                href="/projects"
                className="hidden md:inline-flex items-center gap-2 text-[12px] font-mono text-[#94a3b8] hover:text-[#e11d48] transition-colors duration-200 group"
              >
                View all projects
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </div>
          </ScrollEffect>

          {/* Projects grid */}
          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredProjects.map((project, i) => (
                <ScrollEffect
                  key={project.projects_id}
                  variant="fadeUp"
                  delay={i * 100}
                  duration={550}
                >
                  <ProjectCard project={project} index={i} />
                </ScrollEffect>
              ))}
            </div>
          ) : (
            <EmptyState label="No projects found" />
          )}

          {/* Mobile CTA */}
          <ScrollEffect variant="fadeUp" delay={350} duration={400}>
            <div className="mt-8 flex justify-center md:hidden">
              <SectionCTA href="/projects" label="View All Projects" />
            </div>
          </ScrollEffect>
        </section>

        {/* ══ SECTION 3 — FEATURED SKILLS ══ */}
        <section>
          {/* Section heading */}
          <ScrollEffect variant="fadeUp" duration={500}>
            <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-[#e11d48] tracking-[0.18em]">
                    // 03
                  </span>
                  <div
                    className="h-px w-10"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(225,29,72,0.5), transparent)",
                    }}
                  />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#f8fafc] leading-tight">
                  Featured <span className="text-[#e11d48]">Skills</span>
                  <span className="text-[#e11d48]">.</span>
                </h2>
                <p className="text-[14px] text-[#94a3b8] leading-relaxed max-w-md">
                  Key skills that define my professional experience.
                </p>
              </div>

              <Link
                href="/skills"
                className="hidden md:inline-flex items-center gap-2 text-[12px] font-mono text-[#94a3b8] hover:text-[#e11d48] transition-colors duration-200 group"
              >
                View all skills
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </div>
          </ScrollEffect>

          {/* Skills grid */}
          {featuredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredSkills.map((skill, i) => (
                <ScrollEffect
                  key={skill.skills_id}
                  variant="fadeUp"
                  delay={i * 90}
                  duration={550}
                >
                  <SkillsCard skill={skill} />
                </ScrollEffect>
              ))}
            </div>
          ) : (
            <EmptyState label="No skills found" />
          )}

          {/* Mobile CTA */}
          <ScrollEffect variant="fadeUp" delay={350} duration={400}>
            <div className="mt-8 flex justify-center md:hidden">
              <SectionCTA href="/skills" label="View All Skills" />
            </div>
          </ScrollEffect>
        </section>

        {/* ══ FOOTER CTA STRIP ══ */}
        <ScrollEffect variant="fadeUp" delay={100} duration={600}>
          <div
            className="rounded-2xl border p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
            style={{
              backgroundColor: "rgba(42,52,57,0.35)",
              borderColor: "rgba(248,250,252,0.07)",
            }}
          >
            {/* Decorative glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 100% 50%, rgba(225,29,72,0.07), transparent 65%)",
              }}
            />
            <div className="relative flex flex-col gap-2 text-center md:text-left">
              <p className="text-[11px] font-mono text-[#e11d48] tracking-[0.2em]">
                // OPEN TO WORK
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#f8fafc] tracking-tight">
                Let's build something great.
              </h3>
              <p className="text-[14px] text-[#94a3b8] max-w-sm">
                Have a project in mind? I'm currently available for new
                opportunities.
              </p>
            </div>
            <div className="relative flex gap-3 flex-wrap justify-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-[#f8fafc] border rounded-xl transition-all duration-200 hover:bg-[#f8fafc]/5"
                style={{ borderColor: "#f8fafc26" }}
              >
                Learn more
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white rounded-xl transition-all duration-200 hover:opacity-90 shadow-lg"
                style={{
                  backgroundColor: "#e11d48",
                  boxShadow: "0 8px 24px -8px rgba(225,29,72,0.4)",
                }}
              >
                Get in touch
                <span>→</span>
              </Link>
            </div>
          </div>
        </ScrollEffect>
      </main>
    </div>
  );
}

function SectionCTA({ href, label }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white rounded-xl transition-all duration-200 hover:opacity-90 shadow-lg"
      style={{
        backgroundColor: "#e11d48",
        boxShadow: "0 8px 24px -8px rgba(225,29,72,0.35)",
      }}
    >
      {label}
    </Link>
  );
}

function EmptyState({ label }) {
  return (
    <div
      className="w-full py-16 rounded-2xl border flex items-center justify-center"
      style={{
        borderColor: "rgba(248,250,252,0.06)",
        borderStyle: "dashed",
        backgroundColor: "rgba(42,52,57,0.2)",
      }}
    >
      <p className="text-[11px] font-mono tracking-widest text-[#94a3b8]/30">
        // {label.toUpperCase()}
      </p>
    </div>
  );
}
