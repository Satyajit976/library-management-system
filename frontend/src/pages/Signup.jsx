import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/students/signup",
        formData
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/student-login");
      }, 1500);

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (
  <div className="container">

    <div className="form-card">

      <h1 className=" page-title">Student Registration</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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
          Signup
        </button>

      </form>

      {message && (
        <p className="success">{message}</p>
      )}

    </div>

  </div>
);
}

export default Signup;