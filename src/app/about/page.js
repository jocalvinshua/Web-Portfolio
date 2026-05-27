import { createClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import AboutSection from "./AboutSection";

export const revalidate = 3600;

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default async function AboutPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let experience = [];
  let education = [];

  try {
    const [experienceRes, educationRes] = await Promise.all([
      supabase.from("experience").select("*").order("start_date", { ascending: false }),
      supabase.from("education_history").select("*").order("start_date", { ascending: false }),
    ]);

    if (experienceRes.error) throw experienceRes.error;
    if (educationRes.error) throw educationRes.error;

    // Format dates before passing to client
    experience = (experienceRes.data || []).map((exp) => ({
      ...exp,
      period: `${formatDate(exp.start_date)} – ${exp.is_present ? "Present" : formatDate(exp.end_date)}`,
    }));

    education = (educationRes.data || []).map((edu) => ({
      ...edu,
      period: `${formatDate(edu.start_date)} – ${edu.is_present ? "Present" : formatDate(edu.end_date)}`,
    }));
  } catch (error) {
    console.error("[AboutPage] Supabase error:", error.message);
  }

  return <AboutSection experience={experience} education={education} />;
}