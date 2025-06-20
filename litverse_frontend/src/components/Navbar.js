import React from "react";
import { useTheme } from "../ThemeContext";

/**
 * PUBLIC_INTERFACE
 * Navbar - Modern, fixed responsive navbar with theme toggle and enhanced branding.
 */
const Navbar = ({ onNav }) => {
  const { theme, toggleTheme } = useTheme();

  // Define navigation: prefer handler if available, else href fallback.
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
    <header className="w-full bg-primary/95 dark:bg-darkCard/95 shadow-modern fixed top-0 left-0 z-40 transition-colors">
      <nav className="max-w-5xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo / Brand */}
        <a
          href="/"
          className="flex gap-2 items-center text-xl font-extrabold tracking-tight select-none text-white dark:text-accent"
          aria-label="Home"
        >
          <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-accent text-primary font-black text-2xl shadow ring-2 ring-accent/20 mr-1">
            L
          </span>
          <span className="font-extrabold text-white dark:text-accent text-[1.35rem] tracking-tight leading-none">
            LitVerse
          </span>
        </a>
        {/* Navigation and Theme Toggle */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.slug}
              href={"#" + link.slug}
              onClick={(evt) => handleNavLink(link.slug, evt)}
              className="relative px-2 py-1 rounded text-white/90 dark:text-accent/90 text-base font-medium hover:text-accent dark:hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            className="ml-2 p-2 rounded-lg bg-white/80 dark:bg-darkCard border-2 border-accent/50 hover:bg-accent hover:text-primary dark:hover:bg-accent dark:hover:text-primary transition-colors shadow"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <span role="img" aria-label="Dark mode" className="text-xl">
                🌙
              </span>
            ) : (
              <span role="img" aria-label="Light mode" className="text-xl">
                ☀️
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
