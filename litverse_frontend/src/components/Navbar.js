import React from "react";
import { useTheme } from "../ThemeContext";

/**
 * PUBLIC_INTERFACE
 * Navbar: high-polish, sticky, branded, modern navigation for LitVerse with advanced interactions.
 */
const Navbar = ({ onNav }) => {
  const { theme, toggleTheme } = useTheme();

  // Navigation links (matching views in main shell)
  const navLinks = [
    { name: "Home", slug: "home" },
    { name: "Browse Novels", slug: "browse" },
  ];

  function handleNavLink(slug, evt) {
    evt.preventDefault();
    if (onNav) onNav(slug);
    else window.location.hash = "#" + slug;
  }

  return (
    // Sticky/fixed navbar with shadow, high-contrast/brand polish
    <header className="sticky top-0 z-50 shadow-2xl transition-all duration-300 bg-primary/95 dark:bg-darkCard/95 backdrop-blur-sm">
      <nav className="max-w-5xl mx-auto px-4 flex h-16 items-center justify-between select-none">
        {/* LitVerse Logo / Typography Brand */}
        <a
          href="/"
          aria-label="LitVerse Home"
          className="flex items-center gap-3 group"
          tabIndex={0}
        >
          {/* Logo box */}
          <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-accent text-primary font-extrabold text-2xl shadow ring-2 ring-accent/30 group-hover:scale-105 group-hover:ring-4 transition-all">
            {/* Can insert SVG, for now T typographic */}
            L
          </span>
          {/* Typo Brand Name */}
          <span className="font-extrabold text-white dark:text-accent text-[1.45rem] tracking-tight leading-none font-sans drop-shadow-lg">
            LitVerse
          </span>
        </a>
        {/* Navigation + Theme Toggle */}
        <div className="flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.slug}
              href={"#" + link.slug}
              onClick={(evt) => handleNavLink(link.slug, evt)}
              className="relative font-semibold px-3 py-2 rounded-lg text-white/90 dark:text-accent/90 hover:text-accent dark:hover:text-accent/80 transition-colors duration-200 tracking-wide
              focus:ring-2 focus:ring-accent focus:outline-none
              hover:bg-white/10 dark:hover:bg-accent/10
              before:absolute before:-bottom-1 before:left-2 before:right-2 before:h-[3px] before:bg-accent before:opacity-0 group-hover:opacity-80 before:transition-all"
              tabIndex={0}
            >
              {link.name}
            </a>
          ))}
          {/* Theme Toggle: visually prominent circular, animated icon */}
          <button
            className={`relative ml-3 flex items-center justify-center w-11 h-11 rounded-full shadow-2xl bg-white/80 dark:bg-darkCard border-2 border-accent/40 text-primary dark:text-accent hover:bg-accent hover:text-primary dark:hover:bg-accent dark:hover:text-primary transition-all
            ring-2 ring-transparent focus:ring-accent/70 hover:scale-105`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title="Toggle theme"
            tabIndex={0}
          >
            {theme === "dark" ? (
              <span
                role="img"
                aria-label="Dark mode"
                className="text-2xl transition-all"
              >🌙</span>
            ) : (
              <span
                role="img"
                aria-label="Light mode"
                className="text-2xl transition-all"
              >☀️</span>
            )}
            {/* Micro-interaction highlight pulse */}
            <span className="absolute inset-0 rounded-full pointer-events-none animate-[ping_1s_ease-in-out_1] opacity-0 group-hover:opacity-20" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
