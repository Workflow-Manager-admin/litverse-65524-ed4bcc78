import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * BrowseNovels - Responsive, high-polish card layout for book discovery with LitVerse visual identity (CSS-only).
 */
const BrowseNovels = ({ onSelectBook }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    let url = "https://gutendex.com/books/?languages=en";
    if (search.trim()) {
      url += "&search=" + encodeURIComponent(search.trim());
    }
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
      })
      .then((data) => {
        setBooks(data.results || []);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <section className="browse-novels-section container">
      <h2 className="browse-novels-title">
        Browse Public Domain Novels
      </h2>
      <div className="search-bar-row">
        <input
          type="text"
          className="novel-search-input"
          value={search}
          placeholder="Search by title or author..."
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search novels"
        />
      </div>
      {loading && (
        <div className="loading-state">
          Loading novels...
        </div>
      )}
      {error && <div className="error-state">{error}</div>}
      <div className="novel-card-grid">
        {!loading &&
          !error &&
          books.map((book) => {
            const thumb =
              book.formats["image/jpeg"] ||
              book.formats["image/png"] ||
              null;
            const authors =
              book.authors.length > 0
                ? book.authors.map((a) => a.name).join(", ")
                : "Unknown author";
            return (
              <button
                key={book.id}
                className="novel-card"
                onClick={() => onSelectBook && onSelectBook(book)}
                tabIndex={0}
                type="button"
                aria-label={`Open ${book.title} by ${authors}`}
              >
                {thumb ? (
                  <div className="novel-card-thumb">
                    <img
                      src={thumb}
                      alt={`Cover for ${book.title}`}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="novel-card-noimg">?</div>
                )}
                <div className="novel-card-body">
                  <div className="novel-card-title" title={book.title}>
                    {book.title}
                  </div>
                  <div className="novel-card-author">{authors}</div>
                </div>
              </button>
            );
          })}
      </div>
      {!loading && !error && books.length === 0 && (
        <div className="empty-state">
          No results found.
        </div>
      )}
    </section>
  );
};

export default BrowseNovels;
