import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * ThemeContext provides theme state and toggle function to consumers.
 */
export const ThemeContext = createContext();

/**
 * PUBLIC_INTERFACE
 * useTheme is a convenience hook to access theme context.
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * PUBLIC_INTERFACE
 * ThemeProvider wraps children, manages theme state, persists it in localStorage,
 * and adds Tailwind dark mode class to <html>. Smooth fade transition is supported via Tailwind transition.
 */
export function ThemeProvider({ children }) {
  // Get from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    // Set <html> class for Tailwind dark mode
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Save preference for persistence
    window.localStorage.setItem("theme", theme);

    // Add fade transition for smooth theme switching
    root.style.transition = "background-color 0.4s, color 0.4s";
    // Remove after transition finishes to avoid affecting interactions
    return () => {
      root.style.transition = "";
    };
  }, [theme]);

  /**
   * PUBLIC_INTERFACE
   * Toggle between dark and light themes.
   * (UI handles animation - see container components)
   */
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
