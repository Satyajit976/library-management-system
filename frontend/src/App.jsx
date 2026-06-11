import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import Books from "./pages/Books";
import MyBooks from "./pages/MyBooks";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ManageBooks from "./pages/ManageBooks";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/student-login"
          element={<StudentLogin />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/books"
          element={
          <ProtectedRoute>
            <Books />
          </ProtectedRoute>  
          }
        />

        <Route
          path="/my-books"
          element={
          <ProtectedRoute>
            <MyBooks />
          </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
          }
        />

        <Route
          path="/manage-books"
          element={
          <AdminProtectedRoute>
            <ManageBooks />
          </AdminProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;