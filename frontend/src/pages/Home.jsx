import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaCheckCircle
} from "react-icons/fa";

function Home() {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalBooks: 0,
        totalBorrowedBooks: 0,
        totalReturnedBooks: 0
    });

    const fetchStats = async () => {

  try {

    const response =
      await API.get("/admin/stats");

    setStats(response.data);

  } catch (error) {

    console.log(error);

  }

};

useEffect(() => {

  fetchStats();

}, []);


  return (
  <div className="home">

    {/* Statistics Section */}

    <div className="dashboard-cards">

      <div className="card">

    <h3>
      <FaUsers />
      Total Students
    </h3>

    <p>{stats.totalStudents}</p>

  </div>

  <div className="card">

    <h3>
      <FaBook />
      Total Books
    </h3>

    <p>{stats.totalBooks}</p>

  </div>

  <div className="card">

    <h3>
      <FaExchangeAlt />
      Borrowed Books
    </h3>

    <p>{stats.totalBorrowedBooks}</p>

  </div>

  <div className="card">

    <h3>
      <FaCheckCircle />
      Returned Books
    </h3>

    <p>{stats.totalReturnedBooks}</p>

  </div>

    </div>

    {/* Hero Section */}

    <div className="hero">

      <div className="hero-icon">
        <FaBook size={70} />
      </div>

      <h1>Library Management System</h1>

      <p>
        Manage, Borrow and Track Library Books Easily
      </p>

    </div>

    {/* Portal Section */}

    <div className="portal-container">

      <div className="portal-card">

        <h2>Student Portal</h2>

        <p>
          Register, Login and Borrow Books
        </p>

        <Link to="/signup">
          <button>Student Signup</button>
        </Link>

        <Link to="/student-login">
          <button>Student Login</button>
        </Link>

      </div>

      <div className="portal-card">

        <h2>Admin Portal</h2>

        <p>
          Manage Books and Monitor Students
        </p>

        <Link to="/admin-login">
          <button>Admin Login</button>
        </Link>

      </div>

    </div>

    {/* Features Section */}

    <div className="features">

      <div className="card">
        <h3>Book Management</h3>
        <p>
          Add, update and manage books efficiently.
        </p>
      </div>

      <div className="card">
        <h3>Borrow & Return</h3>
        <p>
          Track book borrowing and returns.
        </p>
      </div>

      <div className="card">
        <h3>Admin Dashboard</h3>
        <p>
          Monitor students, books and records.
        </p>
      </div>

    </div>

  </div>
);
}

export default Home;