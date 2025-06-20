import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * BrowseNovels - Modern responsive card layout with branded accents, search, loading/empty states.
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
    <section className="py-10">
      <h2 className="text-3xl font-extrabold mb-6 text-primary dark:text-accent drop-shadow-sm">
        Browse Public Domain Novels
      </h2>
      <div className="mb-7">
        <input
          type="text"
          className="px-5 py-2.5 border-2 border-accent/40 rounded-lg w-full max-w-md mb-2 focus:ring-2 focus:ring-accent focus:outline-none bg-white dark:bg-darkCard text-lg font-medium text-primary dark:text-accent placeholder:text-gray-400 transition"
          value={search}
          placeholder="Search by title or author..."
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search novels"
        />
      </div>
      {loading && (
        <div className="text-secondary dark:text-gray-300 font-medium">
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
                className="group bg-white dark:bg-darkCard rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-modern flex flex-col h-full p-0 cursor-pointer overflow-hidden focus:outline-accent hover:shadow-xl hover:border-accent ring-0 transition-all"
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
                      className="object-contain block rounded-t-xl mx-auto max-h-44 w-full bg-transparent transition-all duration-150 group-hover:scale-105"
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
                  <div className="text-sm text-secondary dark:text-gray-400">
                    {authors}
                  </div>
                </div>
                <div className="w-full h-[5px] bg-accent/80 opacity-0 group-hover:opacity-100 transition" />
              </button>
            );
          })}
      </div>
      {!loading && !error && books.length === 0 && (
        <div className="mt-6 text-secondary italic">
          No results found.
        </div>
      )}
    </section>
  );
};

export default BrowseNovels;
