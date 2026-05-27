# 🚀 Full-Stack Personal Portfolio Website

Welcome to my personal portfolio website repository! This platform is built to showcase my academic journey, software engineering projects, tech stacks, and professional work experiences.

🌐 **Live Demo:** [jocalvinshua-portfolio.vercel.app](https://jocalvinshua-portfolio.vercel.app/)

---

## 🛠️ Tech Stack & Architecture

This project is built using a modern, scalable hybrid-rendering architecture:

* **Frontend Framework:** Next.js (App Router) with React.js
* **Styling:** Tailwind CSS (featuring dynamic Light/Dark mode orchestration via `next-themes`)
* **Database & Storage:** Supabase (PostgreSQL for dynamic relational fetching & Supabase Storage for assets/icons)
* **Components & Motion:** Smooth contextual scrolling, custom scroll indicators, and interactive Client-Server decoupled hydration.
* **Deployment:** Vercel (Edge Network Distribution)

---

## ✨ Features

* **Decoupled Server/Client Architecture:** Data fetching is managed secure-by-design natively via Next.js Server Components, fetching structured relations from Supabase while passing state cleanly to client interaction contexts.
* **Dynamic Theme Toggling:** Seamless transition between ambient Dark/Light mode leveraging Tailwind configurations without *hydration mismatches* or screen flickering.
* **Responsive Timeline UI:** Fully fluid and interactive Sidebar Scroll-Spy tracking viewports to reflect active sections (Introduction, Experience, Education, Achievements).
* **Real-time Storage Fetching:** Synchronous asset generation utilizing Supabase JS SDK CDN infrastructure for high-fidelity icons and rendering properties.
