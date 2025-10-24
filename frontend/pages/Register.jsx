import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmpassword: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Server error");
    }
  };


  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "Arial, sans-serif",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "300px",
  };

  const inputStyle = {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px",
    marginTop: "20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Register</h2>
        <input name="username" placeholder="Username" onChange={handleChange} required style={inputStyle} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={inputStyle} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={inputStyle} />
        <input name="confirmpassword" type="password" placeholder="Confirm Password" onChange={handleChange} required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
  );
}
