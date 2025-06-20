import React from 'react';
import './App.css';
import { ThemeProvider, useTheme } from './ThemeContext';

/** PUBLIC_INTERFACE
 * ThemeToggleButton switches theme (dark/light) via context.
 */
function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  // Text and icon reflect current mode
  const isDark = theme === "dark";
  return (
    <button
      className="btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{
        backgroundColor: isDark ? "#00ffff" : "#222",
        color: isDark ? "#222" : "#fff",
        fontWeight: 600,
        marginLeft: 12
      }}
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

function AppContent() {
  // App main content
  return (
    <div className="app min-h-screen bg-white dark:bg-[#18181b] transition-colors">
      <nav className="navbar bg-white dark:bg-[#232329] shadow-sm">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div className="logo dark:text-white">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <ThemeToggleButton />
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">AI Workflow Manager Template</div>
            <h1 className="title">litverse_frontend</h1>
            <div className="description">
              Start building your application.
            </div>
            <button className="btn btn-large">Button</button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Wrap App in ThemeProvider for context and persistence
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;