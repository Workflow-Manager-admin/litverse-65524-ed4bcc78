import React, { useState } from "react";
import { useTheme } from "../ThemeContext";

/**
 * PUBLIC_INTERFACE
 * Navbar - Responsive navigation bar with links and theme toggle for LitVerse app.
 */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Reader", href: "#reader" }, // Placeholder links
    { name: "Browse Novels", href: "#browse" },
  ];

  const handleMobileToggle = () => setMobileOpen((prev) => !prev);

  return (
    <header className="w-full bg-white/80 dark:bg-[#18181b] shadow-sm fixed top-0 z-40 transition-colors">
      <nav className="max-w-5xl mx-auto px-4 sm:px-8 flex justify-between items-center h-16 relative">
        {/* Logo/Brand */}
        <a href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white select-none">
          <span className="text-yellow-400 text-2xl">☰</span>
          <span className="tracking-tight">LitVerse</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* Hamburger Menu (Mobile Only) */}
        <button
          className="md:hidden flex items-center text-gray-800 dark:text-white focus:outline-none"
          onClick={handleMobileToggle}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              // X/Close icon
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Hamburger icon
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-white dark:bg-[#232329] border-t border-gray-200 dark:border-gray-700 shadow-lg transition-transform duration-200 ${
            mobileOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-start px-8 py-4 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block w-full text-lg py-2 text-gray-800 dark:text-gray-100 hover:text-yellow-600 dark:hover:text-yellow-300 font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button
              className="mt-2 px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-base font-semibold bg-gray-100 dark:bg-[#232329] text-gray-800 dark:text-white hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-300 dark:hover:text-black transition"
              onClick={() => {
                toggleTheme();
                setMobileOpen(false);
              }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
