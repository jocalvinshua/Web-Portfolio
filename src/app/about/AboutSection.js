"use client";

import { useState, useEffect } from "react";
import ScrollEffect from "@/components/ScrollEffect";

const aboutNavigation = [
  { id: "introduction", label: "Introduction" },
  { id: "experience",   label: "Experience" },
  { id: "education",    label: "Education" },
  { id: "achievements", label: "Achievements & Certifications" },
];

export default function AboutSection({ experience = [], education = [] }) {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (const item of aboutNavigation) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition =
        element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(id);
    }
  };

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
            "radial-gradient(ellipse 60% 40% at 70% 20%, rgba(225,29,72,0.05) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 60% at 10% 80%, rgba(42,52,57,0.4) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row gap-12">

        {/* ── SIDEBAR ── */}
        <aside className="w-full md:w-60 flex-shrink-0 md:sticky md:top-24 h-auto md:h-full mb-8 md:mb-0">
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              backgroundColor: "rgba(42,52,57,0.6)",
              borderColor: "rgba(248,250,252,0.07)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Sidebar header */}
            <div
              className="px-5 pt-5 pb-4 border-b"
              style={{ borderColor: "rgba(248,250,252,0.06)" }}
            >
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#e11d48] mb-1">
                Portfolio
              </p>
              <p className="text-xs text-[#94a3b8]">Joshua Calvin Siahaan</p>
            </div>

            {/* Nav items */}
            <nav className="p-3 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible">
              {aboutNavigation.map((item, i) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative text-left w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group whitespace-nowrap md:whitespace-normal"
                    style={{
                      backgroundColor: isActive ? "rgba(225,29,72,0.1)" : "transparent",
                      color: isActive ? "#e11d48" : "#94a3b8",
                    }}
                  >
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full transition-all duration-300"
                      style={{
                        height: isActive ? "60%" : "0%",
                        backgroundColor: "#e11d48",
                      }}
                    />
                    <span
                      className="text-[10px] font-mono transition-colors duration-200"
                      style={{
                        color: isActive
                          ? "rgba(225,29,72,0.7)"
                          : "rgba(148,163,184,0.35)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] font-medium transition-colors duration-200 group-hover:text-[#f8fafc]">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div
              className="mx-4 mb-4 mt-1 h-px"
              style={{ backgroundColor: "rgba(248,250,252,0.05)" }}
            />
            <p className="text-[10px] font-mono text-[#94a3b8]/30 px-5 pb-4 tracking-widest hidden md:block">
              SCROLL TO EXPLORE
            </p>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 flex flex-col gap-24">

          {/* ── 01 INTRODUCTION ── */}
          <ScrollEffect>
            <section id="introduction" className="scroll-mt-24">
              <SectionLabel index="01" label="INTRODUCTION" />
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3 mb-8 text-[#f8fafc] leading-[1.1]">
                About Me<span className="text-[#e11d48]">.</span>
              </h1>

              <div
                className="rounded-2xl border p-7 md:p-9 space-y-5 text-[#94a3b8] leading-relaxed text-[14px] md:text-[15px] relative overflow-hidden"
                style={{
                  backgroundColor: "rgba(42,52,57,0.4)",
                  borderColor: "rgba(248,250,252,0.07)",
                }}
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at top right, rgba(225,29,72,0.08), transparent 70%)",
                  }}
                />
                <p>
                  Hello! I'm{" "}
                  <strong className="text-[#f8fafc] font-semibold">
                    Joshua Calvin
                  </strong>
                  , a Computer Science student at Calvin Institute of Technology.
                  I have a strong passion for building modern, scalable web
                  applications that are efficient, secure, and performant.
                </p>
                <p>
                  Besides focusing on software engineering using the JavaScript
                  ecosystem (React, Node.js, Express), I also have a keen
                  interest in the fields of{" "}
                  <em className="text-[#f8fafc]/70 not-italic font-medium">
                    Data Analytics
                  </em>{" "}
                  and{" "}
                  <em className="text-[#f8fafc]/70 not-italic font-medium">
                    Artificial Intelligence
                  </em>
                  .
                </p>
                <p>
                  For me, writing code is not just about making an application
                  work, but about how to design a clean, maintainable system
                  architecture that provides an exceptional user experience.
                </p>

                {/* Stat pills */}
                <div
                  className="flex flex-wrap gap-3 pt-2 border-t"
                  style={{ borderColor: "rgba(248,250,252,0.06)" }}
                >
                  {[
                    { label: "Focus",       value: "Full-Stack Dev" },
                    { label: "Interest",    value: "AI / Analytics" },
                    { label: "Institution", value: "Calvin IoT" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col px-4 py-2.5 rounded-xl border"
                      style={{
                        backgroundColor: "rgba(10,10,11,0.5)",
                        borderColor: "rgba(248,250,252,0.07)",
                      }}
                    >
                      <span className="text-[10px] font-mono text-[#94a3b8]/50 tracking-widest uppercase">
                        {stat.label}
                      </span>
                      <span className="text-[13px] font-semibold text-[#f8fafc] mt-0.5">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollEffect>

          {/* ── 02 EXPERIENCE ── */}
          <ScrollEffect>
            <section id="experience" className="scroll-mt-24">
              <SectionLabel index="02" label="EXPERIENCE" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-8 text-[#f8fafc]">
                Experience & Work History
              </h2>

              {experience.length === 0 ? (
                <EmptyState label="No experience entries yet" />
              ) : (
                <div className="relative flex flex-col gap-0">
                  <div
                    className="absolute left-[11px] top-3 bottom-3 w-px hidden md:block"
                    style={{
                      background:
                        "linear-gradient(to bottom, #e11d48, rgba(225,29,72,0.1))",
                    }}
                  />

                  {experience.map((exp, index) => (
                    <div
                      key={exp.id ?? index}
                      className="relative flex flex-col md:flex-row gap-6 pb-10 last:pb-0 group"
                    >
                      {/* Timeline dot */}
                      <div className="hidden md:flex flex-col items-center pt-1">
                        <div
                          className="w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 transition-all duration-300 group-hover:scale-110"
                          style={{ borderColor: "#e11d48", backgroundColor: "#0a0a0b" }}
                        >
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#e11d48" }} />
                        </div>
                      </div>

                      {/* Card */}
                      <div
                        className="flex-1 rounded-2xl border p-5 md:p-6 transition-all duration-300 group-hover:border-[#e11d48]/25"
                        style={{
                          backgroundColor: "rgba(42,52,57,0.35)",
                          borderColor: "rgba(248,250,252,0.07)",
                        }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="text-[15px] font-bold text-[#f8fafc] group-hover:text-[#e11d48] transition-colors duration-200">
                              {exp.role}
                            </h3>
                            <p className="text-[12px] font-mono text-[#94a3b8] mt-0.5">
                              {exp.company}
                            </p>
                          </div>
                          <span
                            className="text-[11px] font-mono px-3 py-1 rounded-full border whitespace-nowrap self-start"
                            style={{
                              backgroundColor: "rgba(10,10,11,0.6)",
                              borderColor: "rgba(248,250,252,0.08)",
                              color: "#94a3b8",
                            }}
                          >
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-[13px] text-[#94a3b8] leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </ScrollEffect>

          {/* ── 03 EDUCATION ── */}
          <ScrollEffect>
            <section id="education" className="scroll-mt-24">
              <SectionLabel index="03" label="EDUCATION" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-8 text-[#f8fafc]">
                Education History
              </h2>

              {education.length === 0 ? (
                <EmptyState label="No education entries yet" />
              ) : (
                <div className="flex flex-col gap-4">
                  {education.map((edu, index) => (
                    <div
                      key={edu.id ?? index}
                      className="rounded-2xl border p-5 md:p-6 relative overflow-hidden group transition-all duration-300 hover:border-[#e11d48]/25"
                      style={{
                        backgroundColor: "rgba(42,52,57,0.35)",
                        borderColor: "rgba(248,250,252,0.07)",
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(225,29,72,0.05), transparent)",
                        }}
                      />
                      <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-[15px] font-bold text-[#f8fafc]">
                            {edu.name}
                          </h3>
                          <p className="text-[13px] font-medium text-[#e11d48] mt-0.5">
                            {edu.degree}
                          </p>
                        </div>
                        <span
                          className="text-[11px] font-mono px-3 py-1 rounded-full border whitespace-nowrap self-start"
                          style={{
                            backgroundColor: "rgba(10,10,11,0.6)",
                            borderColor: "rgba(248,250,252,0.08)",
                            color: "#94a3b8",
                          }}
                        >
                          {edu.period}
                        </span>
                      </div>
                      <p className="relative text-[13px] text-[#94a3b8] leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </ScrollEffect>

          {/* ── 04 ACHIEVEMENTS ── */}
          <ScrollEffect>
            <section id="achievements" className="scroll-mt-24 mb-16">
              <SectionLabel index="04" label="ACHIEVEMENTS" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-8 text-[#f8fafc]">
                Achievements & Certifications
              </h2>
              <div
                className="rounded-2xl border p-6 md:p-8 min-h-[120px] flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(42,52,57,0.25)",
                  borderColor: "rgba(248,250,252,0.06)",
                  borderStyle: "dashed",
                }}
              >
                <p className="text-[12px] font-mono text-[#94a3b8]/30 tracking-widest">
                  // COMING SOON
                </p>
              </div>
            </section>
          </ScrollEffect>

        </div>
      </main>
    </div>
  );
}

/* ── Sub-components ── */

function SectionLabel({ index, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-mono text-[#e11d48] tracking-[0.18em]">
        // {index}
      </span>
      <span className="text-[11px] font-mono tracking-[0.18em] text-[#94a3b8]/50">
        {label}
      </span>
      <div
        className="flex-1 h-px"
        style={{
          background: "linear-gradient(to right, rgba(225,29,72,0.25), transparent)",
        }}
      />
    </div>
  );
}

function EmptyState({ label }) {
  return (
    <div
      className="w-full py-12 rounded-2xl border flex items-center justify-center"
      style={{
        borderColor: "rgba(248,250,252,0.06)",
        borderStyle: "dashed",
        backgroundColor: "rgba(42,52,57,0.15)",
      }}
    >
      <p className="text-[11px] font-mono tracking-widest text-[#94a3b8]/30">
        // {label.toUpperCase()}
      </p>
    </div>
  );
}