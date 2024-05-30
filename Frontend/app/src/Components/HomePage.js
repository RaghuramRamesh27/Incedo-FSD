import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="navbar-logo">Attendance System</div>
       
        <div className="navbar-buttons">
          <button className="nav-button" onClick={handleLoginClick}>
            Login
          </button>
          <button className="nav-button" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      </nav>
      <div className="home-content">
        <h1>Attendance System</h1>
        <p>Welcome to our attendance system. Please login or register to continue.</p>
      </div>
    </div>
  );
};

export default HomePage;
