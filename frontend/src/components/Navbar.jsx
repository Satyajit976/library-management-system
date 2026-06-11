import { Link, useNavigate } from "react-router-dom";
import { FaBook} from 'react-icons/fa';

function Navbar() {

  const navigate = useNavigate();

  const studentToken =
    localStorage.getItem(
      "studentToken"
    );

  const adminToken =
    localStorage.getItem(
      "adminToken"
    );

  const logout = () => {

    localStorage.removeItem(
      "studentToken"
    );

    localStorage.removeItem(
      "adminToken"
    );

    navigate("/");
  };

  return (

    <nav className="navbar">

      <div className="logo">
        <FaBook />

        <Link to="/">
          📚 Library System
        </Link>

      </div>

      <div className="nav-links">

        {/* Student */}

        {studentToken && (

          <>

            <Link to="/books">
              Books
            </Link>

            <Link to="/my-books">
              My Books
            </Link>

            <button
                className="logout-btn"
                onClick={logout}
            >
                Logout
            </button>

          </>

        )}

        {/* Admin */}

        {adminToken && (

          <>

            <Link
              to="/admin-dashboard"
            >
              Dashboard
            </Link>

            <Link
              to="/manage-books"
            >
              Manage Books
            </Link>

            <button
              onClick={logout}
            >
              Logout
            </button>

          </>

        )}

        {/* Guest */}

        {!studentToken &&
        !adminToken && (

          <>

            <Link to="/signup">
              Signup
            </Link>

            <Link
              to="/student-login"
            >
              Student Login
            </Link>

            <Link
              to="/admin-login"
            >
              Admin Login
            </Link>

          </>

        )}

      </div>

    </nav>

  );
}

export default Navbar;