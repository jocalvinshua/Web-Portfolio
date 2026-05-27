import Link from "next/link";

const MAX_VISIBLE_TAGS = 3;

export default function ProjectCard({ index, project }) {
  const visibleTechs = project.technologies.slice(0, MAX_VISIBLE_TAGS);
  const remainingCount = project.technologies.length - MAX_VISIBLE_TAGS;

  return (
    <div
      key={index}
      className="group relative flex flex-col bg-[#2A3439] border border-[#f8fafc]/[0.06] rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#e11d48]/30 hover:-translate-y-1 hover:shadow-[0_24px_60px_-12px_rgba(225,29,72,0.12)]"
    >
      {/* Index badge */}
      <span className="absolute top-4 right-4 z-10 text-[10px] font-mono text-bright/40 tracking-widest select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Image area */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#0a0a0b]">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {project.image && project.image.length > 0 ? (
          <img
            src={project.image[0]}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] relative z-0"
            loading="lazy"
          />
        ) : (
          /* Skeleton placeholder */
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="flex flex-col items-center gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-lg border border-bright/10 bg-[#f8fafc]/[0.03] flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-bright/30"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <div className="space-y-2 w-32">
                <div className="h-1.5 bg-bright/10 rounded-full w-full" />
                <div className="h-1.5 bg-bright/[0.06] rounded-full w-3/4 mx-auto" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 px-5 pb-5 pt-4 bg-[#0a0a0b]/50">
        <h3 className="text-[15px] font-semibold tracking-tight text-bright leading-snug group-hover:text-white transition-colors duration-200 pr-8">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-[13px] leading-relaxed text-bright line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Divider */}
        <div className="mt-4 mb-3 h-px bg-[#f8fafc]/[0.06]" />
        <div className="flex items-center justify-between gap-3">
          {/* Tech tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {visibleTechs.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="inline-flex items-center text-[11px] font-mono text-bright bg-[#0a0a0b]/50 border border-[#f8fafc]/[0.08] px-2.5 py-1 rounded-md tracking-wide hover:text-[#f8fafc] hover:border-[#e11d48]/30 transition-colors duration-150"
              >
                {tech}
              </span>
            ))}

            {remainingCount > 0 && (
              <span
                className="inline-flex items-center text-[11px] font-mono text-bright/50 bg-[#0a0a0b]/30 border border-dashed border-[#f8fafc]/[0.08] px-2.5 py-1 rounded-md tracking-wide"
                title={project.technologies.slice(MAX_VISIBLE_TAGS).join(", ")}
              >
                +{remainingCount}
              </span>
            )}
          </div>

          {/* View More button */}
          <Link
            href={`/projects/${project.slug}`}
            className="shrink-0 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#e11d48] border border-[#e11d48]/30 bg-[#e11d48]/[0.06] hover:bg-[#e11d48]/15 hover:border-[#e11d48]/60 px-3 py-1.5 rounded-lg transition-all duration-200 group/btn"
          >
            View
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}