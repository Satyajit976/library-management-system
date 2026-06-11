import { useEffect, useState } from "react";
import API from "../services/api";
import { FaBook } from "react-icons/fa";

function Books() {

  const [search, setSearch]= useState('');
  const [category, setCategory]= useState('');
  const [books, setBooks] = useState([]);
  const [days, setDays] = useState({});
  const [message, setMessage] = useState("");

  const token =
    localStorage.getItem("studentToken");

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

  const handleBorrow = async (
    bookId
  ) => {

    try {

      const borrowDays =
        days[bookId] || 1;

      const response =
        await API.post(
          "/borrow",
          {
            bookId,
            days: borrowDays
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setMessage(
        response.data.message
      );

      fetchBooks();

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Borrow Failed"
      );

    }

  };

  return (
    <div className=" container">

      <h1 className=" page-title">Library Books</h1>

      {message && (
        <p className="success">{message}</p>
      )}
      <input
    type="text"
    placeholder="Search Books"
    value={search}
    onChange={(e) =>
    setSearch(e.target.value)
    }
    />

    <select
      value={category}
      onChange={(e) =>
        setCategory(e.target.value)
      }
    >
      <option value="">
        All Categories
      </option>

      <option value="Mathematics">
        Maths
      </option>

      <option value="Science">
        Science
      </option>

      <option value="Geography">
        Geography
      </option>

      <option value="Computer Science">
        Computer Science
      </option>

    </select>
      <div className=" book-grid">
      {books
        .filter((book) =>
          book.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
        )
        .filter((book) =>
          category === ""
            ? true
            : book.category === category
        )
        .map((book) => (

        <div
          key={book._id} className=" book-card"
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >

          <h3>
            <FaBook />
            {" "}
            {book.title}
          </h3>

          <p>
            Author:
            {book.author}
          </p>

          <div className="category-badge">
            {book.category}
          </div>

          <p>
            Available Copies:
            <span
                className={
                book.availableCopies > 0
                ? "status-returned"
                : "overdue"
                }
            >
            {book.availableCopies}
        </span>
        </p>

          <input
            type="number"
            min="1"
            max="30"
            placeholder="Days"
            onChange={(e) =>
              setDays({
                ...days,
                [book._id]:
                  e.target.value
              })
            }
          />

          <button
            onClick={() =>
              handleBorrow(
                book._id
              )
            }
          >
            Borrow
          </button>

        </div>

      ))}
      </div>

    </div>
  );
}

export default Books;