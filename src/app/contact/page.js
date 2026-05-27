"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollEffect from "@/components/ScrollEffect";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/jocalvinshua",
    icon: (
      <Image
        src="/icons/github_light.svg"
        alt="GitHub"
        width={20}
        height={20}
      />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/joshua-calvin-12a7a2319/",
    icon: (
      <Image
        src="/icons/linkedin_light.svg"
        alt="LinkedIn"
        width={20}
        height={20}
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
        width={20}
        height={20}
      />
    ),
  },
];

const contactMethods = [
  {
    label: "EMAIL",
    value: "calvinjoshua37@gmail.com",
    href: "mailto:calvinjoshua37@gmail.com",
    description: "Best for project inquiries and collaborations.",
  },
  {
    label: "LOCATION",
    value: "Kemayoran, Jakarta Pusat",
    href: null,
    description: "Open to remote opportunities worldwide.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // TODO: add your submit logic here
  const handleSubmit = async (e) => {
    e.preventDefault();
    // your email sending logic here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            "radial-gradient(ellipse 50% 40% at 80% 0%, rgba(225,29,72,0.07) 0%, transparent 65%)",
            "radial-gradient(ellipse 35% 50% at 0% 100%, rgba(42,52,57,0.5) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col gap-14 min-h-screen justify-center">
        {/* ── Page header ── */}
        <div className="flex flex-col gap-3">
          <ScrollEffect variant="fadeDown" duration={450}>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-[#e11d48] tracking-[0.18em]">
                // GET IN TOUCH
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

          <ScrollEffect variant="fadeUp" delay={80} duration={500}>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#f8fafc] leading-[1.1]">
              Let's Collaborate
              <span className="text-[#e11d48]">.</span>
            </h1>
          </ScrollEffect>

          <ScrollEffect variant="fadeUp" delay={150} duration={500}>
            <p className="text-[14px] text-[#94a3b8] leading-relaxed max-w-lg">
              Have a project in mind, a question, or just want to say hi? Drop
              me a message — I usually respond within 24 hours.
            </p>
          </ScrollEffect>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {contactMethods.map((method, i) => (
              <ScrollEffect
                key={i}
                variant="fadeRight"
                delay={i * 100 + 200}
                duration={500}
              >
                {method.href ? (
                  <a
                    href={method.href}
                    className="flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 group hover:border-[#e11d48]/30"
                    style={{
                      backgroundColor: "rgba(42,52,57,0.35)",
                      borderColor: "rgba(248,250,252,0.07)",
                    }}
                  >
                    <ContactMethodInner method={method} />
                  </a>
                ) : (
                  <div
                    className="flex items-start gap-4 p-5 rounded-2xl border"
                    style={{
                      backgroundColor: "rgba(42,52,57,0.35)",
                      borderColor: "rgba(248,250,252,0.07)",
                    }}
                  >
                    <ContactMethodInner method={method} />
                  </div>
                )}
              </ScrollEffect>
            ))}

            {/* Socials */}
            <ScrollEffect variant="fadeRight" delay={400} duration={500}>
              <div
                className="p-5 rounded-2xl border flex flex-col gap-4"
                style={{
                  backgroundColor: "rgba(42,52,57,0.25)",
                  borderColor: "rgba(248,250,252,0.07)",
                }}
              >
                <div>
                  <p className="text-[10px] font-mono text-[#e11d48] tracking-[0.2em] uppercase mb-1">
                    // Social Media
                  </p>
                  <p className="text-[13px] text-[#94a3b8] leading-relaxed">
                    Follow me for daily updates and project previews.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {socials.map((social, i) => (
                    <ScrollEffect
                      key={i}
                      variant="scaleUp"
                      delay={480 + i * 70}
                      duration={400}
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.name}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:-translate-y-1 hover:border-[#e11d48]/40"
                        style={{
                          backgroundColor: "rgba(10,10,11,0.5)",
                          borderColor: "rgba(248,250,252,0.08)",
                        }}
                      >
                        {social.icon}
                      </a>
                    </ScrollEffect>
                  ))}
                </div>
              </div>
            </ScrollEffect>

            {/* Availability */}
            <ScrollEffect variant="fadeRight" delay={520} duration={500}>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                style={{
                  backgroundColor: "rgba(16,163,127,0.06)",
                  borderColor: "rgba(16,163,127,0.2)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#10a37f] animate-pulse flex-shrink-0" />
                <p className="text-[12px] font-mono text-[#10a37f]">
                  Currently available for new projects
                </p>
              </div>
            </ScrollEffect>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="lg:col-span-3">
            <ScrollEffect variant="fadeLeft" delay={250} duration={600}>
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border p-6 md:p-8 flex flex-col gap-5 shadow-2xl"
                style={{
                  backgroundColor: "rgba(42,52,57,0.4)",
                  borderColor: "rgba(248,250,252,0.07)",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Full Name"
                    id="name"
                    type="text"
                    placeholder="Joshua Calvin"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <Field
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <Field
                  label="Subject"
                  id="subject"
                  type="text"
                  placeholder="Project inquiry, collaboration…"
                  value={formData.subject}
                  onChange={handleInputChange}
                />

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-[11px] font-mono text-[#94a3b8]/60 tracking-widest uppercase pl-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write the details of your message here..."
                    className="w-full rounded-xl px-4 py-3 text-[13px] text-[#f8fafc] placeholder:text-[#94a3b8]/30 focus:outline-none resize-none transition-all duration-200"
                    style={{
                      backgroundColor: "rgba(10,10,11,0.5)",
                      border: "1px solid rgba(248,250,252,0.08)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(225,29,72,0.5)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(225,29,72,0.08)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(248,250,252,0.08)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Footer row */}
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t"
                  style={{ borderColor: "rgba(248,250,252,0.06)" }}
                >
                  <p className="text-[11px] font-mono text-[#94a3b8]/30">
                    // Response within 24 hours
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-[13px] font-medium text-white rounded-xl transition-all duration-200 hover:opacity-90 shadow-lg"
                    style={{
                      backgroundColor: "#e11d48",
                      boxShadow: "0 8px 24px -8px rgba(225,29,72,0.4)",
                    }}
                  >
                    Send Message
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                </div>
              </form>
            </ScrollEffect>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── Field ── */
function Field({ label, id, type, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-mono text-[#94a3b8]/60 tracking-widest uppercase pl-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-[13px] text-[#f8fafc] placeholder:text-[#94a3b8]/30 focus:outline-none transition-all duration-200"
        style={{
          backgroundColor: "rgba(10,10,11,0.5)",
          border: "1px solid rgba(248,250,252,0.08)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "rgba(225,29,72,0.5)";
          e.target.style.boxShadow = "0 0 0 3px rgba(225,29,72,0.08)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(248,250,252,0.08)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

/* ── ContactMethodInner ── */
function ContactMethodInner({ method }) {
  return (
    <>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border"
        style={{
          backgroundColor: "rgba(225,29,72,0.08)",
          borderColor: "rgba(225,29,72,0.2)",
        }}
      >
        <span className="text-[11px] font-mono text-[#e11d48] font-bold">
          //
        </span>
      </div>
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <p className="text-[10px] font-mono text-[#94a3b8]/40 tracking-[0.18em] uppercase">
          {method.label}
        </p>
        <p className="text-[13px] font-semibold text-[#f8fafc] truncate group-hover:text-[#e11d48] transition-colors duration-200">
          {method.value}
        </p>
        <p className="text-[11px] text-[#94a3b8]/50 mt-0.5">
          {method.description}
        </p>
      </div>
    </>
  );
}
