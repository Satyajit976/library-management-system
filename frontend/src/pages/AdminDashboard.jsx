import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { FaUsers, FaBook, FaExchangeAlt, FaUndo } from "react-icons/fa";

function AdminDashboard() {

  const navigate = useNavigate();

  const [dashboard, setDashboard] =
    useState({});

  const [students, setStudents] =
    useState([]);

  const [records, setRecords] =
    useState([]);

  const token =
    localStorage.getItem(
      "adminToken"
    );

  useEffect(() => {

    if (!token) {
      navigate("/admin-login");
      return;
    }

    fetchDashboard();
    fetchStudents();
    fetchRecords();

  }, []);

  const fetchDashboard =
    async () => {

      try {

        const response =
          await API.get(
            "/admin/dashboard",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setDashboard(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const fetchStudents =
    async () => {

      try {

        const response =
          await API.get(
            "/admin/students",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setStudents(
          response.data.students
        );

      } catch (error) {

        console.log(error);

      }

    };

  const fetchRecords =
    async () => {

      try {

        const response =
          await API.get(
            "/admin/borrow-records",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setRecords(
          response.data.records
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleLogout =
    () => {

      localStorage.removeItem(
        "adminToken"
      );

      localStorage.removeItem(
        "admin"
      );

      navigate(
        "/admin-login"
      );

    };

  return (
    <div className=" container">

      <h1 className=" page-title">
        Admin Dashboard
      </h1>

      <button
        onClick={handleLogout}
      >
        Logout
      </button>

      <hr />

      <h2>
  Dashboard Summary
</h2>

<div className="dashboard-cards">

  <div className="card">
  <h3>
    <FaUsers />
    {" "}
    Total Students
  </h3>

  <p>{dashboard.totalStudents}</p>
</div>

<div className="card">
  <h3>
    <FaBook />
    {" "}
    Total Books
  </h3>

  <p>{dashboard.totalBooks}</p>
</div>

<div className="card">
  <h3>
    <FaExchangeAlt />
    {" "}
    Borrowed Books
  </h3>

  <p>{dashboard.totalBorrowedBooks}</p>
</div>

<div className="card">
  <h3>
    <FaUndo />
    {" "}
    Returned Books
  </h3>

  <p>{dashboard.totalReturnedBooks}</p>
</div>
</div>

<hr />

      <h2 className="page-title">
  Students
</h2>

<table>

  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>

  <tbody>

    {students.map((student) => (

      <tr key={student._id}>
        <td>{student.name}</td>
        <td>{student.email}</td>
      </tr>

    ))}

  </tbody>

</table>

      <hr />

      <h2 className="page-title">
  Borrow Records
</h2>

<table>

  <thead>

    <tr>

      <th>Student</th>

      <th>Email</th>

      <th>Book</th>

      <th>Category</th>

      <th>Due Date</th>

      <th>Status</th>

    </tr>

  </thead>

  <tbody>

    {records.map((record) => (

      <tr key={record._id}>

        <td>
          {record.studentId?.name}
        </td>

        <td>
          {record.studentId?.email}
        </td>

        <td>
          {record.bookId?.title}
        </td>

        <td>
          {record.bookId?.category}
        </td>

        <td>
          {new Date(
            record.dueDate
          ).toLocaleDateString()}
        </td>

        <td>
          <span
            className={
            record.returned
            ? "status-returned"
            : "status-borrowed"
            }
        >
        {record.returned
        ? "Returned"
        : "Borrowed"}
        </span>
        </td>

      </tr>

    ))}

  </tbody>

</table>

    </div>
  );
}

export default AdminDashboard;