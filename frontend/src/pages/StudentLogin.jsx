import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function StudentLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  useEffect(()=>{
    const token = localStorage.getItem("studentToken");
    if(token){
      navigate("/books");
    }
  },[]);

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
        "/students/login",
        formData
      );

      localStorage.setItem(
        "studentToken",
        response.data.token
      );

      localStorage.setItem(
        "student",
        JSON.stringify(
          response.data.student
        )
      );

      setMessage("Login Successful");

      setTimeout(() => {
        navigate("/books");
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

      <h1 className=" page-title">Student Login</h1>

      <form onSubmit={handleSubmit}>

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

export default StudentLogin;