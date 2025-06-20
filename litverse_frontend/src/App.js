import React, { useState } from "react";
import "./App.css";
import { ThemeProvider } from "./ThemeContext";
import Navbar from "./components/Navbar";
import BrowseNovels from "./components/BrowseNovels";

/**
 * AppContent - high-polish, branded app shell with layout, transitions, and theme features.
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

  // App shell with maximum width, color backgrounds, hierarchy, card-style layout, transitions.
  return (
    <div className="bg-gradient-to-b from-primary/90 via-white/85 to-accent/10 dark:from-darkBg dark:via-[#232329] dark:to-primary/30 min-h-screen transition-colors flex flex-col font-sans">
      <Navbar onNav={handleNavClick} />
      <main className="flex-1 pt-20 sm:pt-24 pb-10 bg-transparent transition-all">
        <div className="max-w-5xl mx-auto px-4">
          {view === "home" && (
            <section className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="rounded-xl max-w-xl w-full shadow-2xl p-10 pb-7 bg-white/95 dark:bg-darkCard/95 mb-8 border border-gray-200 dark:border-gray-800 backdrop-blur-2xl transition-all">
                <div className="text-accent font-semibold uppercase tracking-[0.15em] text-sm mb-2 drop-shadow">
                  Read, Discover & Enjoy
                </div>
                <h1 className="text-5xl sm:text-6xl font-extrabold text-primary dark:text-accent tracking-tighter mb-3 mt-1 drop-shadow-xl transition-colors">
                  LitVerse
                </h1>
                <p className="text-lg sm:text-xl text-secondary dark:text-gray-300 mb-8 leading-relaxed">
                  A modern, immersive platform to browse and read public domain novels from the Gutenberg Project.
                </p>
                <button
                  className="inline-block bg-accent hover:bg-yellow-400 text-primary font-semibold px-8 py-3 text-lg rounded-xl shadow-2xl transition-all duration-200 ring-2 ring-accent/60 hover:ring-4 hover:scale-105 focus:outline-none focus:ring-yellow-400 tracking-wide
                  group"
                  onClick={handleBrowseClick}
                  autoFocus
                >
                  <span className="inline-block transition-colors">Browse Novels</span>
                </button>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-base mt-5 select-none">
                <span className="italic">Immersive reading. Modern experience. Free forever.</span>
              </div>
            </section>
          )}
          {view === "browse" && (
            <BrowseNovels onSelectBook={handleBookSelected} />
          )}
          {view === "reader" && (
            <section className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="rounded-xl max-w-lg w-full shadow-2xl p-8 bg-white dark:bg-darkCard border border-gray-200 dark:border-gray-700 text-center transition-all">
                <h3 className="text-2xl font-bold mb-3 text-primary dark:text-accent drop-shadow">
                  Book Reader Coming Soon
                </h3>
                {selectedBook && (
                  <div>
                    <div className="mb-2 font-semibold text-lg text-primary dark:text-accent">{selectedBook.title}</div>
                    <div className="text-sm text-secondary dark:text-gray-400">
                      {selectedBook.authors && selectedBook.authors.map((a) => a.name).join(", ")}
                    </div>
                  </div>
                )}
                <div className="mt-4 text-gray-500 dark:text-gray-400">
                  Full reading functionality will be available in the next update!
                </div>
                <button
                  className="mt-7 mb-2 px-7 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-accent hover:text-primary dark:bg-secondary dark:hover:bg-yellow-400 dark:hover:text-primary shadow-lg transition-all ring-2 ring-secondary hover:ring-accent focus:outline-none"
                  onClick={() => setView("browse")}
                >
                  Back to Browse
                </button>
                <button
                  className="block mx-auto mt-2 px-4 py-1.5 text-gray-400 font-semibold hover:text-primary/80 underline text-sm transition-colors"
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
      {/* Slim, minimalist branded footer */}
      <footer className="w-full py-6 mt-auto bg-white/70 dark:bg-darkBg/80 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 text-sm select-none transition-colors">
        &copy; {new Date().getFullYear()} <span className="font-bold text-primary dark:text-accent">LitVerse</span>
        <span className="mx-1">·</span>
        <a
          href="https://www.gutenberg.org/"
          className="text-accent hover:underline hover:text-yellow-500 transition-colors"
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
