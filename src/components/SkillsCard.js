import { createClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import Image from "next/image";
import SkillIcon from "./SkillIcon";

export default async function SkillsCard({ skill }) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const starIcon = supabase.storage
    .from("Portfolio-assets")
    .getPublicUrl("icons/star.svg").data.publicUrl;
  const starGreyIcon = supabase.storage
    .from("Portfolio-assets")
    .getPublicUrl("icons/star_grey.svg").data.publicUrl;

  return (
    <div className="bg-card/20 border border-card/60 p-5 rounded-2xl hover:border-primary/40 hover:bg-card/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden h-full">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-card/40 border border-card/40 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
            <SkillIcon
              src={skill.dark_mode || skill.icon}
              alt={`${skill.name} icon`}
            />
          </div>

          <div
            className="flex gap-1 items-center"
            title={`Level ${skill.level}/5`}
          >
            {[...Array(5)].map((_, dotIndex) => {
              const isFilled = dotIndex < skill.level;
              return (
                <div
                  key={dotIndex}
                  className="w-4 h-4 relative transition-transform duration-300 hover:scale-110"
                >
                  <Image
                    src={isFilled ? starIcon : starGreyIcon}
                    alt={isFilled ? "Filled star" : "Grey star"}
                    fill
                    className="object-contain"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <h3 className="text-base font-bold tracking-tight text-bright group-hover:text-primary transition-colors duration-200">
          {skill.name}
        </h3>

        <p className="text-xs text-muted mt-1.5 leading-relaxed">
          {skill.description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
    </div>
  );
}
