import React, { useState } from "react";
import "./App.css";
import { ThemeProvider } from "./ThemeContext";
import Navbar from "./components/Navbar";
import BrowseNovels from "./components/BrowseNovels";

/**
 * AppContent - branded app shell with CSS classes, transitions, and theme features using standard CSS.
 */
function AppContent() {
  // Main view state: "home", "browse", "reader"
  const [view, setView] = useState("home");
  const [selectedBook, setSelectedBook] = useState(null);

  function handleNavClick(dest) {
    setView(dest);
    if (dest !== "reader") setSelectedBook(null);
  }
  function handleBrowseClick() {
    setView("browse");
    setSelectedBook(null);
  }
  function handleBookSelected(book) {
    setSelectedBook(book);
    setView("reader");
  }
  function handleBackHome() {
    setView("home");
    setSelectedBook(null);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar onNav={handleNavClick} />
      <main style={{ flex: "1 1 auto" }}>
        <div className="container">
          {view === "home" && (
            <section className="hero-section">
              <div className="hero-card">
                <div style={{ color: "var(--accent)", fontWeight: 600, fontSize: "1.07rem", letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: "0.7rem" }}>
                  Read, Discover & Enjoy
                </div>
                <h1 className="hero-title">
                  LitVerse
                </h1>
                <p className="hero-desc">
                  A modern, immersive platform to browse and read public domain novels from the Gutenberg Project.
                </p>
                <button
                  className="hero-btn"
                  onClick={handleBrowseClick}
                  autoFocus
                >
                  <span>Browse Novels</span>
                </button>
              </div>
              <div className="hero-tagline">
                Immersive reading. Modern experience. Free forever.
              </div>
            </section>
          )}
          {view === "browse" && (
            <BrowseNovels onSelectBook={handleBookSelected} />
          )}
          {view === "reader" && (
            <section className="reader-section">
              <div className="reader-card">
                <h3 className="reader-title">
                  Book Reader Coming Soon
                </h3>
                {selectedBook && (
                  <div>
                    <div className="reader-title" style={{ fontSize: "1.15rem" }}>{selectedBook.title}</div>
                    <div className="reader-author">
                      {selectedBook.authors && selectedBook.authors.map((a) => a.name).join(", ")}
                    </div>
                  </div>
                )}
                <div className="reader-desc">
                  Full reading functionality will be available in the next update!
                </div>
                <button
                  className="reader-btn"
                  onClick={() => setView("browse")}
                >
                  Back to Browse
                </button>
                <button
                  className="reader-link"
                  onClick={handleBackHome}
                  tabIndex={0}
                >
                  Back to Home
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
      <footer>
        &copy; {new Date().getFullYear()} <span className="footer-brand">LitVerse</span>
        <span className="mx-1">&middot;</span>
        <a
          href="https://www.gutenberg.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gutenberg API
        </a>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
// App root: wrap in ThemeProvider for context/persistence
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
