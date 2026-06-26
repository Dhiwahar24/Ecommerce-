import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.scss";

function Signup() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords not matching");
      return;
    }

    try {
      const res = await axios.post("https://ecommerce-production-1b05.up.railway.app/auth/register", {
        name: form.name,
        age: form.age,
        gender: form.gender,
        email: form.email,
        password: form.password
      });
      console.log(res.data);
      alert(res.data);

      if (res.data === "REGISTER SUCCESS") {
        nav("/home");
      }
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container signup-container">
        <h1>Sign Up</h1>
        <p className="login-subtitle">
          Create your account to get started
        </p>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <input
          name="gender"
          placeholder="Gender"
          value={form.gender}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Re-enter Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button onClick={handleSignup}>
          Sign Up
        </button>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
