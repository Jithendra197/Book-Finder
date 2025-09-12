




import React, { useState } from "react";

export default function BookFinder() {
  const [book, setBook] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function searchBooks(e) {
    e.preventDefault();
    if (!book) return;

    setLoading(true);
    setError(null);
    setBooks([]);

    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${book}`);
      const data = await res.json();
      setBooks(data.docs || []);
      
    } catch (err) {
      setError("Failed to fetch books");
    }

    setLoading(false);
  }


  return (
    <div className="w-full bg-gray-400 mx-auto p-6 ">
      <h1 className="text-2xl font-bold text-center mb-4">Book Finder</h1>
      <form onSubmit={searchBooks} className="flex justify-center gap-2 mb-6">
        <input type="text" placeholder="Search....." value={book} onChange={(e) => setBook(e.target.value)} className="flex w-[500px] focus:outline-none border-white border-1  p-2 rounded-3xl bg-white" />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded-3xl">Search</button>
      </form>

      {loading && <p className="text-center">Loading books...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
        
      
        <div className="">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book, index) => (
            <div key={index} className="shadow-lg p-2  bg-gray-300 rounded text-center">
              <img src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`: `https://covers.openlibrary.org/b/id/10110415-M.jpg`} alt={book.title} className="mx-auto mb-2 h-40 object-cover"/>
              <h2 className="font-bold text-md mb-1">{book.title}</h2>
              <p className="text-xs text-black font-semibold">
                Author: {book.author_name ? book.author_name : "Unknown Author"}
              </p>
              <p className="text-xs text-black font-semibold">Year: {book.first_publish_year || "N/A"}</p>
            </div>
          ))}
        </div>
        </div>
    
      

      {!loading && books.length === 0 && !error && (
        <p className="text-center text-gray-600">Search for a book to see results</p>
      )}
    </div>
);
}