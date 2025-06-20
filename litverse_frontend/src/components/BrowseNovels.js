import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * BrowseNovels - Fetches and displays list of public domain books from the Gutendex API.
 * Users can see title, author(s), and cover image (if available).
 * Selecting a book will trigger a callback with book details (for future integration with reader view).
 */
const BrowseNovels = ({ onSelectBook }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Minimal search interface - static query for demo (could expand)
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
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Browse Public Domain Novels</h2>
      <div className="mb-5">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded w-full max-w-md mb-2 dark:bg-[#232329] dark:border-gray-600 dark:text-white"
          value={search}
          placeholder="Search by title or author..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading && <div className="text-gray-600 dark:text-gray-300">Loading novels...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {!loading && !error && books.map((book) => {
          const thumb =
            book.formats["image/jpeg"] ||
            (book.formats["image/png"] || null);
          const authors =
            book.authors.length > 0
              ? book.authors.map((a) => a.name).join(", ")
              : "Unknown author";
          return (
            <div
              key={book.id}
              className="bg-white dark:bg-[#18181b] rounded shadow border border-gray-200 dark:border-gray-700 p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
              onClick={() => onSelectBook && onSelectBook(book)}
              tabIndex={0}
              role="button"
              aria-label={`Open ${book.title} by ${authors}`}
              style={{ minHeight: "200px" }}
            >
              {thumb ? (
                <img
                  src={thumb}
                  alt={`Cover for ${book.title}`}
                  className="w-full h-40 object-cover rounded mb-3 border border-gray-100 dark:border-gray-800"
                  loading="lazy"
                  style={{ background: "#eee", objectFit: "contain" }}
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 rounded mb-3 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <div className="font-semibold text-base mb-1 text-gray-800 dark:text-gray-100">
                {book.title}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{authors}</div>
            </div>
          );
        })}
      </div>
      {!loading && !error && books.length === 0 && (
        <div className="mt-4 text-gray-500">No results found.</div>
      )}
    </div>
  );
};

export default BrowseNovels;
