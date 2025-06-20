import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * BrowseNovels - Responsive, high-polish card layout for book discovery with LitVerse visual identity.
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
    <section className="py-8">
      <h2 className="text-3xl font-extrabold mb-7 text-primary dark:text-accent drop-shadow-lg tracking-tight">
        Browse Public Domain Novels
      </h2>
      <div className="mb-7 flex flex-col sm:flex-row sm:items-center gap-2">
        <input
          type="text"
          className="px-5 py-3 border-2 border-accent/40 rounded-xl w-full max-w-md focus:ring-2 focus:ring-accent focus:outline-none bg-white dark:bg-darkCard text-lg font-semibold text-primary dark:text-accent placeholder:text-gray-400 shadow-lg transition-all"
          value={search}
          placeholder="Search by title or author..."
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search novels"
        />
      </div>
      {loading && (
        <div className="text-secondary dark:text-gray-300 font-medium text-lg animate-pulse">
          Loading novels...
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
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
                className="group bg-white/95 dark:bg-darkCard rounded-xl border-2 border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col h-full p-0 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent/70 hover:shadow-[0_8px_36px_0_rgba(250,204,21,0.18)] hover:border-accent hover:scale-105 transition-all duration-200"
                onClick={() => onSelectBook && onSelectBook(book)}
                tabIndex={0}
                type="button"
                aria-label={`Open ${book.title} by ${authors}`}
              >
                {thumb ? (
                  <div className="w-full h-44 bg-neutral-100 dark:bg-darkBg flex items-center justify-center">
                    <img
                      src={thumb}
                      alt={`Cover for ${book.title}`}
                      className="object-contain block rounded-t-xl max-h-44 w-full transition-all duration-150 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-full h-44 bg-accent/30 dark:bg-darkBg rounded-t-xl flex items-center justify-center text-4xl text-accent font-extrabold select-none">
                    ?
                  </div>
                )}
                <div className="flex-1 flex flex-col p-4 gap-1 justify-between">
                  <div className="font-bold text-lg text-primary dark:text-accent mb-1 truncate" title={book.title}>
                    {book.title}
                  </div>
                  <div className="text-sm text-secondary dark:text-gray-400 truncate">
                    {authors}
                  </div>
                </div>
                {/* animated accent bar on hover */}
                <div className="w-full h-[5px] bg-accent/80 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-2 transition-all duration-200" />
              </button>
            );
          })}
      </div>
      {!loading && !error && books.length === 0 && (
        <div className="mt-6 text-secondary italic text-lg">
          No results found.
        </div>
      )}
    </section>
  );
};

export default BrowseNovels;
