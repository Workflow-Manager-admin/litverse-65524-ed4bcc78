import React, { useState } from "react";
import "./App.css";
import { ThemeProvider } from "./ThemeContext";
import Navbar from "./components/Navbar";
import BrowseNovels from "./components/BrowseNovels";

/**
 * AppContent - App shell with modern layout and theme.
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

  // App shell layout with max width, themed backgrounds, spacing
  return (
    <div className="bg-primary min-h-screen transition-colors flex flex-col">
      <Navbar onNav={handleNavClick} />
      <main className="flex-1 pt-20 pb-8 bg-neutral-50 dark:bg-darkBg transition-colors">
        <div className="max-w-5xl mx-auto px-4">
          {view === "home" && (
            <section className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="rounded-2xl max-w-lg w-full shadow-modern p-10 pb-7 bg-white/90 dark:bg-darkCard mb-8 border border-gray-200 dark:border-gray-700">
                <div className="text-accent font-medium uppercase tracking-wide text-sm mb-2">
                  Read, Discover & Enjoy
                </div>
                <h1 className="text-5xl sm:text-6xl font-extrabold text-primary dark:text-white tracking-tighter mb-4 drop-shadow-xl">
                  LitVerse
                </h1>
                <p className="text-lg sm:text-xl text-secondary dark:text-gray-300 mb-8">
                  A modern, responsive platform to browse and read public domain novels from the Gutenberg Project.
                </p>
                <button
                  className="inline-block bg-accent hover:bg-yellow-300 text-primary font-semibold px-7 py-3 text-lg rounded-lg shadow-lg transition ring-2 ring-accent/40 hover:ring-yellow-300"
                  onClick={handleBrowseClick}
                >
                  Browse Novels
                </button>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-base mt-8">
                <span className="italic">Immersive reading. Modern experience. Free forever.</span>
              </div>
            </section>
          )}
          {view === "browse" && (
            <BrowseNovels onSelectBook={handleBookSelected} />
          )}
          {view === "reader" && (
            <section className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="rounded-xl max-w-lg w-full shadow-modern p-8 bg-white dark:bg-darkCard border border-gray-200 dark:border-gray-700 text-center">
                <h3 className="text-2xl font-bold mb-3 text-primary dark:text-white">
                  Book Reader Coming Soon
                </h3>
                {selectedBook && (
                  <div>
                    <div className="mb-2 font-semibold text-lg">{selectedBook.title}</div>
                    <div className="text-sm text-secondary dark:text-gray-400">
                      {selectedBook.authors && selectedBook.authors.map((a) => a.name).join(", ")}
                    </div>
                  </div>
                )}
                <div className="mt-4 text-gray-500 dark:text-gray-400">
                  Full reading functionality will be available in the next update!
                </div>
                <button
                  className="mt-6 px-6 py-2 bg-secondary text-white rounded-md hover:bg-accent hover:text-primary dark:bg-secondary dark:hover:bg-yellow-400 dark:hover:text-primary transition"
                  onClick={() => setView("browse")}
                >
                  Back to Browse
                </button>
                <button
                  className="block mx-auto mt-3 px-4 py-1.5 text-gray-400 hover:text-primary underline text-sm"
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
      <footer className="w-full py-6 mt-auto bg-white/70 dark:bg-darkBg border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} <span className="font-bold text-primary dark:text-accent">LitVerse</span>
        <span className="mx-1">·</span>
        <a
          href="https://www.gutenberg.org/"
          className="text-accent hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gutenber API
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