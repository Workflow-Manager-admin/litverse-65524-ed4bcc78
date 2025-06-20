import React, { useState } from 'react';
import './App.css';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import BrowseNovels from './components/BrowseNovels';

// Main Application Content (navbar, main layout, etc.)
function AppContent() {
  // Determine which mode: 'home', 'browse', (future: 'reader')
  const [view, setView] = useState('home');
  // Selected book: for future reader integration
  const [selectedBook, setSelectedBook] = useState(null);

  // Handle navigation from top nav or UI - for now, only browse/home switch
  function handleNavClick(dest) {
    setView(dest);
    if (dest !== "reader") setSelectedBook(null);
  }

  // When the Browse Novels link or button is clicked
  function handleBrowseClick() {
    setView('browse');
    setSelectedBook(null);
  }

  function handleBookSelected(book) {
    setSelectedBook(book);
    setView('reader');
    // Reader integration to come later
  }

  // Simple main switch
  return (
    <div className="app min-h-screen bg-white dark:bg-[#18181b] transition-colors">
      <Navbar />
      <main className="pt-20">
        <div className="container">
          {view === 'home' && (
            <div className="hero">
              <div className="subtitle">A modern, responsive online novel reader</div>
              <h1 className="title">LitVerse</h1>
              <div className="description">
                Browse and read public domain novels from the Gutenberg archive in beautiful simplicity.
              </div>
              <button className="btn btn-large" onClick={handleBrowseClick}>Browse Novels</button>
            </div>
          )}
          {view === 'browse' && (
            <BrowseNovels onSelectBook={handleBookSelected} />
          )}
          {view === 'reader' && (
            <div className="py-12 text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Book Reader Coming Soon</h3>
              {selectedBook && (
                <div>
                  <div className="mb-2 font-semibold text-lg">{selectedBook.title}</div>
                  <div className="text-sm text-gray-500">
                    {selectedBook.authors && selectedBook.authors.map(a => a.name).join(", ")}
                  </div>
                </div>
              )}
              <div className="mt-4 text-gray-500">Full reading functionality will be available in the next update!</div>
              <button className="btn mt-5" onClick={() => setView('browse')}>Back to Browse</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
// Wrap App in ThemeProvider for context and persistence
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;