import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../CSS/SignIn.css"; // Import the CSS file

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",    // Changed from 'name' to 'username' to match schema
    email: "",
    department: "",  // Department field for user's department
    password: "",
  });

  const navigate = useNavigate();  // For navigation after successful signup

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend with form data
      const response = await axios.post("http://localhost:8000/api/signup", formData);
      toast.success(response.data.message, { position: "top-right" }); // Show success message
      navigate("/login_page");  
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Failed to sign up. Please try again.", { position: "top-right" });
    }
  };

  // Handle input changes
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container">
      <div className="overlay" />

      <div className="signup-form">
        <div className="header-1">
          <h1>CUET STORE</h1>
          <p>Join us today and start your journey</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <User className="icon" />
            <input
              type="text"
              placeholder="Username"
              className="form-input"
              value={formData.username}
              onChange={inputHandler}
              name="username"
              required
            />
          </div>

          <div className="form-group">
            <Mail className="icon" />
            <input
              type="email"
              placeholder="Email Address"
              className="form-input"
              value={formData.email}
              onChange={inputHandler}
              name="email"
              required
            />
          </div>

          <div className="form-group">
            <User className="icon" />
            <input
              type="text"
              placeholder="Department Name"
              className="form-input"
              value={formData.department}
              onChange={inputHandler}
              name="department"
              required
            />
          </div>

          <div className="form-group">
            <Lock className="icon" />
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              value={formData.password}
              onChange={inputHandler}
              name="password"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            <span>Sign Up</span>
            <ArrowRight />
          </button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <Link to='/login_page'>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;