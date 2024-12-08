import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all tokens and roles
    setIsAuthenticated(false);
    alert("Logged out successfully.");
    navigate("/login");
  };

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-left">
          <Link to="/" className="logo-link">
            <span className="logo-text">JOB SEEKER</span>
          </Link>

          {/* Navbar Links */}
          <div className="navbar-links">
            <Link to="/job-listings">Job Listings</Link>
            <Link to="/dashboard">Dashboard</Link>
            <div className="more-options" onClick={toggleNavbar}>
              <span>More Options ▼</span>
            </div>
          </div>
        </div>

        {/* Theme Toggle and Auth Links */}
        <div className="navbar-right">
          <button className="theme-button" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isExpanded && (
        <div className="dropdown-expanded">
          <div className="dropdown-column">
            <h3>Explore Opportunities</h3>
            <Link to="/job-listings">Find Jobs</Link>
            <Link to="/create-job">Post a Job</Link>
            <Link to="/create-profile">Create Profile</Link>
          </div>
          <div className="dropdown-column">
            <h3>User Resources</h3>
            <Link to="/help-center">Help Center</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/success-stories">Success Stories</Link>
          </div>
          <div className="dropdown-column">
            <h3>Company Information</h3>
            <Link to="/about-us">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/terms-and-privacy">Terms of Service & Privacy Policy</Link>
          </div>
          <div className="dropdown-column">
            <h3>Stay Connected</h3>
            <Link to="/social-media">Social Media</Link>
            <Link to="/feedback">Feedback</Link>
            <Link to="/support">Support</Link>
          </div>
          <div>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="auth-button logout-button">
              Logout
            </button>
          ) : (
            <Link to="/login" className="auth-button login-button">
              Login
            </Link>
          )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
