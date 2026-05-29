import Image from "next/image";
import Link from "next/link";
import ScrollEffect from "./ScrollEffect";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase";
import CVButton from "./CVButton";

export default async function HeaderSection() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let profile = {
    email: "",
    github_url: "#",
    cv_url: "",
    linkedin_url: "#",
  };

  try {
    const { data, error } = await supabase
      .from("profile")
      .select("email, github_url, cv_url, linkedin_url")
      .single(); // Mengambil satu objek langsung jika baris data profil hanya satu

    if (error) throw error;
    if (data) profile = data;
  } catch (error) {
    console.error("Gagal memuat data profil:", error.message);
  }

  const socials = [
    {
      name: "GitHub",
      href: profile.github_url,
      icon: (
        <Image
          src="/icons/github_light.svg"
          alt="GitHub"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: "LinkedIn",
      href: profile.linkedin_url,
      icon: (
        <Image
          src="/icons/linkedin_light.svg"
          alt="LinkedIn"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/jocalvinshua",
      icon: (
        <Image
          src="/icons/instagram_light.svg"
          alt="Instagram"
          width={24}
          height={24}
        />
      ),
    },
  ];

  return (
    <section>
      {/* Header Area */}
      <header className="mb-8 md:mb-16">
        <ScrollEffect variant="fadeDown" duration={500}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-card/40 border border-card/60 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono text-muted tracking-wide">
              Available for New Project
            </span>
          </div>
        </ScrollEffect>

        <ScrollEffect variant="fadeUp" delay={80} duration={550}>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Joshua Calvin<span className="text-primary">.</span>
          </h1>
        </ScrollEffect>
      </header>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Kolom Kiri */}
        <ScrollEffect
          variant="fadeRight"
          delay={150}
          duration={600}
          className="lg:col-span-2"
        >
          <div className="bg-card/20 border border-card p-6 md:p-8 rounded-2xl flex flex-col justify-between shadow-2xl backdrop-blur-sm h-full">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Text */}
              <div className="flex flex-col gap-4 text-center md:text-left order-2 md:order-1">
                <ScrollEffect variant="fadeUp" delay={250} duration={500}>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Hi, I'm Joshua Calvin
                  </h2>
                </ScrollEffect>

                <ScrollEffect variant="fadeUp" delay={320} duration={500}>
                  <p className="text-muted leading-relaxed text-sm md:text-base max-w-md">
                    I am an Information Technology student specializing in
                    Computer Science and full-stack development. I build
                    high-performance web applications and have a keen interest
                    in intelligent systems.
                  </p>
                </ScrollEffect>

                <ScrollEffect variant="fadeUp" delay={400} duration={500}>
                  <div className="mt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                    <Link
                      href="/projects"
                      className="inline-block px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
                    >
                      View My Works
                    </Link>
                    {/* Oper URL hasil fetch data supabase ke props button */}
                    <CVButton cvUrl={profile.cv_url} />
                  </div>
                </ScrollEffect>
              </div>

              {/* Avatar */}
              <ScrollEffect
                variant="scaleUp"
                delay={200}
                duration={600}
                className="relative flex-shrink-0 order-1 md:order-2"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500"></div>
                  <img
                    src="/profile-img.png"
                    alt="Joshua Calvin"
                    className="relative rounded-full w-40 h-40 md:w-44 md:h-44 object-cover border-2 border-primary/40 p-1 bg-main"
                  />
                </div>
              </ScrollEffect>
            </div>

            {/* Socials footer */}
            <ScrollEffect variant="fadeUp" delay={480} duration={500}>
              <div className="mt-8 pt-6 border-t border-card/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-muted">
                  // Connect with me:
                </span>
                <div className="flex gap-3">
                  {socials.map((social, index) => (
                    <ScrollEffect
                      key={index}
                      variant="scaleUp"
                      delay={520 + index * 70}
                      duration={400}
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.name}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card/30 text-muted hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <span className="font-medium text-sm">
                          {social.icon}
                        </span>
                      </a>
                    </ScrollEffect>
                  ))}
                </div>
              </div>
            </ScrollEffect>
          </div>
        </ScrollEffect>

        {/* Kolom Kanan */}
        <div className="flex flex-col gap-6 justify-between">
          <ScrollEffect
            variant="fadeLeft"
            delay={250}
            duration={600}
            className="flex-1"
          >
            <div className="bg-card/30 border border-card p-6 rounded-2xl h-full">
              <h3 className="text-sm font-mono tracking-wider text-primary uppercase mb-3">
                // Core Focus
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Fascinated by the intersection of structured project management
                and clean architectures. Always striving to build software that
                is both elegant on the inside and impactful on the outside.
              </p>
            </div>
          </ScrollEffect>

          <ScrollEffect
            variant="fadeLeft"
            delay={370}
            duration={600}
            className="flex-1"
          >
            <div className="bg-card/40 border border-card p-6 rounded-2xl shadow-xl h-full">
              <h3 className="text-sm font-mono tracking-wider text-primary uppercase mb-4">
                // Technical Arsenal
              </h3>
              <ul className="grid grid-cols-1 gap-3 text-sm font-medium">
                {[
                  "Full Stack Development",
                  "UI/UX Interactive Design",
                  "Data Analysis & Machine Learning",
                ].map((skill, index) => (
                  <ScrollEffect
                    key={index}
                    variant="fadeRight"
                    delay={450 + index * 80}
                    duration={400}
                  >
                    <li className="flex items-center gap-3 text-muted hover:text-bright transition-colors group">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-125 transition-transform"></span>
                      {skill}
                    </li>
                  </ScrollEffect>
                ))}
              </ul>
            </div>
          </ScrollEffect>
        </div>
      </div>
    </section>
  );
}
