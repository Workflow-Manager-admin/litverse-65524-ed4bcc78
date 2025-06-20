import React from "react";
import { useTheme } from "../ThemeContext";

/**
 * PUBLIC_INTERFACE
 * Navbar - Static (non-responsive) navigation bar with always-visible links and theme toggle for LitVerse app.
 */
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Reader", href: "#reader" }, // Placeholder links
    { name: "Browse Novels", href: "#browse" },
  ];

  return (
    <header className="w-full bg-white/80 dark:bg-[#18181b] shadow-sm fixed top-0 z-40 transition-colors">
      <nav className="max-w-5xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo/Brand */}
        <a href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white select-none">
          <span className="text-yellow-400 text-2xl">≡</span>
          <span className="tracking-tight">LitVerse</span>
        </a>
        {/* Navigation Links and Theme Toggle (Static, always visible) */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-yellow-600 dark:text-gray-100 dark:hover:text-yellow-300 font-medium transition-colors px-2 py-1"
            >
              {link.name}
            </a>
          ))}
          <button
            className="ml-4 px-3 py-1 rounded bg-gray-100 dark:bg-[#232329] border border-gray-300 dark:border-gray-700 text-sm font-semibold text-gray-800 dark:text-white hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-300 dark:hover:text-black transition"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
