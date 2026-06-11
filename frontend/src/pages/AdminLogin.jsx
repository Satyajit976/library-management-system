import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {

    const token =
      localStorage.getItem(
        "adminToken"
      );

    if (token) {
      navigate("/admin-dashboard");
    }

  }, [navigate]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await API.post(
          "/admin/login",
          formData
        );

      localStorage.setItem(
        "adminToken",
        response.data.token
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(
          response.data.admin
        )
      );

      setMessage(
        "Admin Login Successful"
      );

      setTimeout(() => {

        navigate(
          "/admin-dashboard"
        );

      }, 1000);

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (
  <div className="container">

    <div className="form-card">

      <h1 className=" page-title">
        Admin Login
      </h1>

      <form
        onSubmit={handleSubmit}
      >

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

      {message && (
        <p className="success">{message}</p>
      )}

    </div>

  </div>
);
}

export default AdminLogin;