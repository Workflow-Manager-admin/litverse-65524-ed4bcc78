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
 * ThemeProvider wraps children, manages theme state, persists it in localStorage, and adds Tailwind dark mode class to <html>.
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
    // Save preference
    window.localStorage.setItem("theme", theme);
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
