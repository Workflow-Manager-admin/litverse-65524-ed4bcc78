import React, { useEffect } from "react";
import { useTheme } from "../ThemeContext";

/**
 * PUBLIC_INTERFACE
 * Navbar: high-polish, sticky, branded, modern navigation for LitVerse with advanced interactions.
 */
const Navbar = ({ onNav }) => {
  const { theme, toggleTheme } = useTheme();

  // Set theme class on body
  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

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
    <header className="navbar">
      <nav className="navbar-content" role="navigation">
        {/* Logo box and brand */}
        <a
          href="/"
          aria-label="LitVerse Home"
          className="flex items-center group"
          tabIndex={0}
          style={{ textDecoration: 'none' }}
        >
          <span className="logo-box">L</span>
          <span className="nav-brand">LitVerse</span>
        </a>
        <div className="nav-links">
          {navLinks.map((link) => (
            <button
              key={link.slug}
              onClick={(evt) => handleNavLink(link.slug, evt)}
              className="nav-link"
              tabIndex={0}
              type="button"
            >
              {link.name}
            </button>
          ))}
          {/* Theme Toggle: visually prominent circular icon */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title="Toggle theme"
            tabIndex={0}
            type="button"
          >
            {theme === "dark" ? (
              <span role="img" aria-label="Dark mode">🌙</span>
            ) : (
              <span role="img" aria-label="Light mode">☀️</span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
