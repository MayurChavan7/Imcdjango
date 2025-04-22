import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    published_year: "",
    author: "",
    genre: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError("Error fetching books");
    }
  };

  const addBook = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setBooks((prev) => [...prev, data]);
        setFormData({ title: "", published_year: "", author: "", genre: "" });
        setError("");
      } else {
        const errData = await response.json();
        setError(JSON.stringify(errData));
      }
    } catch (err) {
      setError("Error adding book");
    }
  };

  const updateBook = async (id, updatedData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      });

      const updatedBook = await response.json();
      setBooks((prev) =>
        prev.map((book) => (book.id === id ? updatedBook : book))
      );
    } catch (err) {
      setError("Error updating book");
    }
  };

  const deleteBook = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
        method: "DELETE"
      });
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      setError("Error deleting book");
    }
  };

  return (
    <div className="App">
      <h1>Book Library</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Published Year"
          value={formData.published_year}
          onChange={(e) =>
            setFormData({ ...formData, published_year: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onDelete={deleteBook}
          onUpdate={updateBook}
        />
      ))}
    </div>
  );
}

function BookCard({ book, onDelete, onUpdate }) {
  const [editData, setEditData] = useState({
    title: book.title,
    published_year: book.published_year,
    author: book.author,
    genre: book.genre
  });

  return (
    <div style={{ border: "1px solid black", padding: "1rem", marginBottom: "1rem" }}>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Published Year:</strong> {book.published_year}</p>

      <div>
        <input
          type="text"
          placeholder="New Title"
          value={editData.title}
          onChange={(e) =>
            setEditData({ ...editData, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="New Author"
          value={editData.author}
          onChange={(e) =>
            setEditData({ ...editData, author: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="New Genre"
          value={editData.genre}
          onChange={(e) =>
            setEditData({ ...editData, genre: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="New Published Year"
          value={editData.published_year}
          onChange={(e) =>
            setEditData({ ...editData, published_year: e.target.value })
          }
        />
        <button onClick={() => onUpdate(book.id, editData)}>Update</button>
        <button onClick={() => onDelete(book.id)}>Delete</button>
      </div>

      <div>
        <h4>Reviews:</h4>
        {book.reviews && book.reviews.length > 0 ? (
          book.reviews.map((review, index) => (
            <div key={index}>
              <p>⭐ {review.rating}/5 - {review.comment}</p>
              <p><small>{new Date(review.timestamp).toLocaleString()}</small></p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
