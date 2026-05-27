"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="w-full mt-12 bg-main border-t border-card/40 selection:bg-primary/30">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-10">
        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <div className="text-center">
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight text-bright group"
            >
              Joshua Calvin
              <span className="text-primary group-hover:animate-pulse">.</span>
            </Link>
          </div>
          <p>© {currentYear} Joshua Calvin Siahaan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
