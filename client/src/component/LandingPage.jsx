import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import '../CSS/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle the Login button click
  const handleLoginClick = () => {
    navigate("/signup_page"); // Navigate to the SignUp page (you can change the route to login if needed)
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">CUET Store</div>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#about">About</a></li>
            <li><button className="info-btn">Info</button></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <img
          src="https://cdn.hashnode.com/res/hashnode/image/upload/v1728455992795/631c43b5-e0f8-4305-859e-2bda6f25802f.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp" // Replace with your CUET image URL
          alt="CUET"
          className="hero-image"
        />
        <div className="hero-content">
          <h1>CUET Store</h1>
          <p>Your one-stop shop for all CUET essentials</p>
          <div className="buttons">
            <button className="contact-btn">Contact</button>
            {/* Login Button now navigates to SignUp page */}
            <button className="read-more-btn" onClick={handleLoginClick}>Login</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
