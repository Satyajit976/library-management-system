import { useEffect, useState } from "react";
import API from "../services/api";
import { FaBook } from "react-icons/fa";

function MyBooks() {

  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [reminders, setReminders] = useState([]);

  const token =
    localStorage.getItem("studentToken");

  const fetchMyBooks = async () => {

    try {

      const response =
        await API.get(
          "/borrow/my-books",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setBooks(
        response.data.borrows
      );

    } catch (error) {

      console.log(error);

    }

  };

  const fetchReminders =
  async () => {

    try {

      const response =
        await API.get(
          "/borrow/reminder",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setReminders(
        response.data.books
      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchMyBooks();
    fetchReminders();

  }, []);

  const handleReturn = async (
  borrowId
) => {

  const confirmReturn =
    window.confirm(
      "Return this book?"
    );

  if (!confirmReturn)
    return;

  try {

    const response =
      await API.put(
        `/borrow/return/${borrowId}`,
        {},
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

    fetchMyBooks();

  } catch (error) {

    setMessage(
      error.response?.data?.message ||
      "Return Failed"
    );

  }

};

  return (
    <div className=" container">

      <h1 className=" page-title">
        My Borrowed Books
      </h1>
      <h2 className="page-title">
  Due Date Reminders
</h2>

{reminders.map((item) => (

  <div
    key={item._id}
    className="card"
  >

    <h3>
      {item.bookId?.title}
    </h3>

    <p>
      Due Date:
      {" "}
      {new Date(
        item.dueDate
      ).toLocaleDateString()}
    </p>

    {item.overdue ? (

      <span className="overdue">
        OVERDUE
      </span>

    ) : (

      <span className="status-borrowed">
        ACTIVE
      </span>

    )}

  </div>

))}

      {message && (
        <p className="success">{message}</p>
      )}

      {books.length === 0 ? (
        <h3>
          No Books Borrowed
        </h3>
      ) : (
        books.map((borrow) => (

          <div
            key={borrow._id}
            className="card"
          >

            <h3>
                <FaBook />
                {" "}
                {
                    borrow.bookId
                      ?.title
                }
            </h3>

            <p>
              Author:
              {
                borrow.bookId
                  ?.author
              }
            </p>

            <p>
              Category:
              {
                borrow.bookId
                  ?.category
              }
            </p>

            <p>
              Due Date:
              {
                new Date(
                  borrow.dueDate
                ).toLocaleDateString()
              }
            </p>

            <p>
                {borrow.returned ? (
                  <span className="status-returned">
                    Returned
                  </span>
                ) : new Date(borrow.dueDate) < new Date() ? (
                  <span className="overdue">
                    Overdue
                  </span>
                ) : (
                  <span className="status-borrowed">
                    Borrowed
                  </span>
                )}
            </p>

           {!borrow.returned && (

            <button
               onClick={() =>
                 handleReturn(
                   borrow._id
                )
               }
            >
               Return Book
             </button>

            )}

          </div>

        ))
      )}

    </div>
  );
}

export default MyBooks;