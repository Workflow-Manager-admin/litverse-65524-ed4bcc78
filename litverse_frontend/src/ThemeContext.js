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
 * and toggles .dark-theme class for dark mode support in standard CSS.
 */
export function ThemeProvider({ children }) {
  // Get from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    // Set .dark-theme class on <body>
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
    // Save preference for persistence
    window.localStorage.setItem("theme", theme);
    // Smooth color transition
    document.body.style.transition = "background-color 0.4s, color 0.4s";
    return () => {
      document.body.style.transition = "";
    };
  }, [theme]);

  /**
   * PUBLIC_INTERFACE
   * Toggle between dark and light themes.
   */
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
