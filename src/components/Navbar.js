"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navbarItems = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "About", href: "/about" },
    { id: 3, name: "Skills", href: "/skills" },
    { id: 4, name: "Projects", href: "/projects" },
    { id: 5, name: "Contact", href: "/contact" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <nav
        className="
          relative w-full max-w-2xl md:w-fit flex items-center justify-between md:justify-center gap-8 px-6 py-3 
          rounded-full border border-card/40 bg-navbar backdrop-blur-md shadow-2xl transition-all duration-500
        "
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-muted hover:text-bright transition-colors p-1 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-5 h-5 transition-transform duration-300"
            style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navbarItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="relative overflow-hidden h-5 group text-sm font-medium text-muted hover:text-bright transition-colors duration-200"
            >
              <span className="block transform group-hover:-translate-y-full transition-transform duration-300 ease-out">
                {item.name}
              </span>
              <span className="block absolute top-full left-0 text-primary transform group-hover:-translate-y-full transition-transform duration-300 ease-out">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        <div
          className={`absolute top-16 left-0 right-0 bg-main/95 backdrop-blur-xl border border-card p-5 rounded-2xl flex flex-col gap-3 shadow-2xl transition-all duration-300 origin-top ${
            menuOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          } md:hidden`}
        >
          {navbarItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-muted hover:text-primary font-medium text-sm py-2 transition-colors border-b border-card/20 last:border-0"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}