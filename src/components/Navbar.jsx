import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // 1. Logic Theme & Scroll (Dikutip dari Navbar1)
  useEffect(() => {
    // Inisialisasi Tema
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    // Handle Scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#top' },
    { name: 'About me', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'My Work', href: '#work' },
    { name: 'Contact me', href: '#contact' }
  ];

  return (
    <>
      {/* Background Decor (Navbar1) */}
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden">
        <img src="./assets/header-bg-color.png" alt="" className="w-full" />
      </div>

      <div className={`fixed w-full z-50 transition-all duration-300 py-4 px-4`}>
        {/* Design Navbar2: Center, Fit Content, Pill Shape 
          Logic Navbar1: Scroll Effect (Background changes)
        */}
        <nav className={`
          mx-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500
          ${isScrolled 
            ? 'bg-white/50 backdrop-blur-lg shadow-sm dark:bg-darkTheme/70 dark:shadow-white/20 border-white/20' 
            : 'bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/30 dark:bg-transparent'}
          w-fit min-w-[300px] max-md:w-full max-md:justify-between
        `}>
          
          {/* MOBILE TOGGLE (Kiri) */}
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="md:hidden p-2 text-gray-800 dark:text-white"
          >
            <img src="./assets/menu-black.png" alt="" className="w-6 dark:hidden" />
            <img src="./assets/menu-white.png" alt="" className="w-6 hidden dark:block" />
          </button>

          {/* LOGO (Assets Navbar1) */}
          <a href="#top" className="flex-shrink-0 max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2">
            <img src="./assets/logo.png" alt="Logo" className="w-24 dark:hidden" />
            <img src="./assets/logo_dark.png" alt="Logo" className="w-24 hidden dark:block" />
          </a>

          {/* DESKTOP LINKS (Navbar1 font & Navbar2 effect) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-8 font-Ovo">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="relative overflow-hidden h-6 group text-gray-900 dark:text-white">
                <span className="block group-hover:-translate-y-full transition-transform duration-300">
                  {link.name}
                </span>
                <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-gray-500 dark:text-gray-300">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          {/* ACTIONS: Theme Toggle & Contact Button */}
          <div className="flex items-center gap-4 ml-8">
            <button onClick={toggleTheme} className="p-2 transition-transform active:scale-90">
              <img src="./assets/moon_icon.png" alt="" className="w-5 dark:hidden" />
              <img src="./assets/sun_icon.png" alt="" className="w-5 hidden dark:block" />
            </button>

            <a href="#contact" className="hidden lg:flex items-center gap-3 px-8 py-2 border border-gray-300 hover:bg-slate-100/70 dark:hover:bg-darkHover rounded-full font-Ovo dark:border-white/30 dark:text-white transition">
              Contact
              <img src="./assets/arrow-icon.png" alt="" className="w-3 dark:hidden" />
              <img src="./assets/arrow-icon-dark.png" alt="" className="w-3 hidden dark:block" />
            </a>
          </div>
        </nav>
      </div>

      {/* MOBILE SIDEBAR (Logic Navbar1 but Sidebar Style Navbar2) */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60] transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside className={`
        fixed top-0 left-0 h-full w-64 z-[70] p-10 bg-rose-50 dark:bg-darkHover transform transition-transform duration-500 ease-in-out font-Ovo md:hidden
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="absolute right-6 top-6" onClick={() => setIsSidebarOpen(false)}>
          <img src="./assets/close-black.png" alt="" className="w-5 cursor-pointer dark:hidden" />
          <img src="./assets/close-white.png" alt="" className="w-5 cursor-pointer hidden dark:block" />
        </div>

        <nav className="flex flex-col gap-6 mt-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsSidebarOpen(false)}
              className="text-lg text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Navbar;