import ProjectCard from "@/components/ProjectCard";
import ScrollEffect from "@/components/ScrollEffect";
import { createClient } from "@/lib/supabase";
import { cookies } from "next/headers";

export const revalidate = 3600;

export default async function Project() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let projects = [];
  try {
    const { data, error } = await supabase
      .from("my_projects")
      .select("*")
      .order("year", { ascending: false });
    if (error) throw error;
    projects = data || [];
  } catch (error) {
    console.error("Gagal memuat proyek:", error.message);
  }

  return (
    <div className="min-h-screen bg-main text-bright selection:bg-primary/30 selection:text-bright">
      <main className="max-w-6xl mx-auto px-6 py-24 flex flex-col gap-12 relative">
        <ScrollEffect variant="fadeLeft" duration={500}>
          <header className="flex flex-col gap-0.5">
            <ScrollEffect variant="fadeDown" duration={450}>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-[#e11d48] tracking-[0.18em]">
                  // SKILLS
                </span>
                <div
                  className="h-px w-12"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(225,29,72,0.5), transparent)",
                  }}
                />
              </div>
            </ScrollEffect>
            <h2 className="text-4xl font-bold tracking-tight text-bright">
              Projects<span className="text-primary">.</span>
            </h2>
            <p className="text-muted leading-relaxed text-md mt-4">
              Showcasing impactful projects and technical achievements.
            </p>
          </header>
          <div
            className="h-px w-full mt-10"
            style={{
              background:
                "linear-gradient(to right, rgba(225,29,72,0.2), rgba(248,250,252,0.06), transparent)",
            }}
          />
        </ScrollEffect>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ScrollEffect
              key={project.projects_id || project.slug}
              variant="fadeUp"
              delay={index * 100}
              duration={600}
            >
              <ProjectCard project={project} />
            </ScrollEffect>
          ))}
        </div>
      </main>
    </div>
  );
}
