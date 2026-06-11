import { useEffect, useState } from "react";
import API from "../services/api";

function ManageBooks() {

  const [books, setBooks] = useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      author: "",
      category: "",
      totalCopies: ""
    });

  const [editingId, setEditingId] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const token =
    localStorage.getItem(
      "adminToken"
    );

  const fetchBooks = async () => {

    try {

      const response =
        await API.get("/books");

      setBooks(response.data.books);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchBooks();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      if (editingId) {

        await API.put(
          `/books/${editingId}`,
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setMessage(
          "Book Updated Successfully"
        );

      } else {

        await API.post(
          "/books",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setMessage(
          "Book Added Successfully"
        );

      }

      setFormData({
        title: "",
        author: "",
        category: "",
        totalCopies: ""
      });

      setEditingId(null);

      fetchBooks();

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Operation Failed"
      );

    }

  };

  const handleEdit = (
    book
  ) => {

    setEditingId(book._id);

    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      totalCopies:
        book.totalCopies
    });

  };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this book?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/books/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setMessage(
          "Book Deleted Successfully"
        );

        fetchBooks();

      } catch (error) {

        setMessage(
          error.response?.data?.message ||
          "Delete Failed"
        );

      }

    };

  return (
    <div className=" container">

      <h1 className=" page-title">
        Manage Books
      </h1>

      {message && (
        <p className="success">{message}</p>
      )}

      <div className=" form-card">
      <h2>Add New Book</h2>
      <form
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="totalCopies"
          placeholder="Total Copies"
          value={formData.totalCopies}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">

          {editingId
            ? "Update Book"
            : "Add Book"}

        </button>

      </form>
      </div>

      <h2 className="page-title">
        Library Inventory
      </h2>

        <div className="book-grid">

        {books.map((book) => (
        <div
          key={book._id}
          className="card"
        >

          <h3>
            {book.title}
          </h3>

          <p>
            Author:
            {book.author}
          </p>

          <p>
            Category:
            {book.category}
          </p>

          <p>
            Total Copies:
            {book.totalCopies}
          </p>

          <p>
            Available:
            {book.availableCopies}
          </p>

          <button
            onClick={() =>
              handleEdit(book)
            }
          >
            Edit
          </button>

          {" "}

          <button
            onClick={() =>
              handleDelete(
                book._id
              )
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>
    </div>
  );
}

export default ManageBooks;