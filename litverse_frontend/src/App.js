import React from 'react';
import './App.css';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';

// Main Application Content (navbar, main layout, etc.)
function AppContent() {
  return (
    <div className="app min-h-screen bg-white dark:bg-[#18181b] transition-colors">
      {/* Static Navbar fixed at top */}
      <Navbar />
      {/* Add top padding to prevent content being hidden under fixed navbar */}
      <main className="pt-20">
        <div className="container">
          <div className="hero">
            <div className="subtitle">A modern, responsive online novel reader</div>
            <h1 className="title">LitVerse</h1>
            <div className="description">
              Start building your application.
            </div>
            <button className="btn btn-large">Browse Novels</button>
          </div>
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