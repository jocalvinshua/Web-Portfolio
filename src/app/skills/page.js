import ScrollEffect from "@/components/ScrollEffect";
import SkillsCard from "@/components/SkillsCard";
import { createClient } from "@/lib/supabase";
import { cookies } from "next/headers";

export const revalidate = 3600;

export default async function SkillsPage() {
  let skills = [];

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from("my_skills")
      .select("*")
      .order("level", { ascending: false });

    if (error) throw error;
    skills = data || [];
  } catch (error) {
    console.error("Gagal memuat skills:", error.message);
  }

  // Group by category (falls back to "General" if no category field)
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const hasCategories = Object.keys(grouped).length > 1;

  return (
    <div
      className="min-h-screen text-[#f8fafc] selection:bg-[#e11d48]/30 selection:text-[#f8fafc]"
      style={{ backgroundColor: "#0a0a0b" }}
    >
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: [
            "radial-gradient(ellipse 55% 35% at 85% 5%, rgba(225,29,72,0.07) 0%, transparent 65%)",
            "radial-gradient(ellipse 40% 50% at 5% 85%, rgba(42,52,57,0.45) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col gap-16">

        {/* ── Page header ── */}
        <div className="flex flex-col gap-3">
          <ScrollEffect variant="fadeDown" duration={450}>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-[#e11d48] tracking-[0.18em]">
                // SKILLS
              </span>
              <div
                className="h-px w-12"
                style={{
                  background: "linear-gradient(to right, rgba(225,29,72,0.5), transparent)",
                }}
              />
            </div>
          </ScrollEffect>

          <ScrollEffect variant="fadeUp" delay={80} duration={500}>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#f8fafc] leading-[1.1]">
              Technical Skills
              <span className="text-[#e11d48]">.</span>
            </h1>
          </ScrollEffect>

          <ScrollEffect variant="fadeUp" delay={150} duration={500}>
            <p className="text-[14px] text-[#94a3b8] leading-relaxed max-w-lg">
              A collection of tools, frameworks, and technologies I work with — sorted by proficiency.
            </p>
          </ScrollEffect>
        </div>

        {/* ── Divider ── */}
        <div
          className="h-px w-full"
          style={{
            background: "linear-gradient(to right, rgba(225,29,72,0.2), rgba(248,250,252,0.06), transparent)",
          }}
        />

        {/* ── Skills grid (flat or grouped) ── */}
        {skills.length === 0 ? (
          <ScrollEffect variant="fadeUp">
            <div
              className="w-full py-20 rounded-2xl border flex items-center justify-center"
              style={{
                borderColor: "rgba(248,250,252,0.06)",
                borderStyle: "dashed",
                backgroundColor: "rgba(42,52,57,0.15)",
              }}
            >
              <p className="text-[11px] font-mono tracking-widest text-[#94a3b8]/30">
                // NO SKILLS FOUND
              </p>
            </div>
          </ScrollEffect>
        ) : hasCategories ? (
          /* Grouped by category */
          <div className="flex flex-col gap-14">
            {Object.entries(grouped).map(([category, items], groupIndex) => (
              <div key={category} className="flex flex-col gap-6">
                <ScrollEffect variant="fadeRight" delay={groupIndex * 60} duration={450}>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-[#e11d48] tracking-[0.18em]">
                      // {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] font-semibold text-[#f8fafc]">
                      {category}
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{
                        background: "linear-gradient(to right, rgba(248,250,252,0.07), transparent)",
                      }}
                    />
                    <span className="text-[11px] font-mono text-[#94a3b8]/30">
                      {items.length} {items.length === 1 ? "skill" : "skills"}
                    </span>
                  </div>
                </ScrollEffect>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((skill, i) => (
                    <ScrollEffect
                      key={skill.id ?? i}
                      variant="fadeUp"
                      delay={i * 80}
                      duration={500}
                    >
                      <SkillsCard skill={skill} index={i} />
                    </ScrollEffect>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Flat grid — no categories */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skill, i) => (
              <ScrollEffect
                key={skill.id ?? i}
                variant="fadeUp"
                delay={i * 70}
                duration={500}
              >
                <SkillsCard skill={skill} index={i} />
              </ScrollEffect>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}