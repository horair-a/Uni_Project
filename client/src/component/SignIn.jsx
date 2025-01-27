import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import "../CSS/SignIn.css"; // Import the CSS file
import axios from 'axios'; // Import axios for making HTTP requests
import toast from 'react-hot-toast'; // For displaying success or error messages
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle form data changes
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending login request to the server
      const response = await axios.put('http://localhost:8000/api/signup', formData);

      // If login is successful, show a success message and redirect
      toast.success(response.data.message, { position: "top-right" });
      console.log(response.data.role)
      if(response.data.role === "admin"){
        navigate("/dashboard");  
        // localStorage.setItem("Data",response.data)
        localStorage.setItem("Data", JSON.stringify(response.data));

      }
      else{
        navigate("/user/requestOrder")
       // console.log(response.data)
        // localStorage.setItem("Data",response.data)
        localStorage.setItem("Data", JSON.stringify(response.data));

      }
      // You can navigate to a different page here if necessary (e.g., dashboard)
    } catch (error) {
      // Handle error and show a failure message
      console.error('Login failed:', error);
      toast.error("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="container">
      <div className="overlay" />

      <div className="signup-form">
        <div className="header-1">
          <h1>CUET STORE</h1>
          <p>Login to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Mail className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="form-input"
              value={formData.email}
              onChange={inputHandler}
              required
            />
          </div>

          <div className="form-group">
            <Lock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-input"
              value={formData.password}
              onChange={inputHandler}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            <span>Login</span>
            <ArrowRight />
          </button>
        </form>

        <p className="login-link">
          Don't have an account?{' '}
          <a href="/login_page">Sign Up</a> {/* Link to the signup page */}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
