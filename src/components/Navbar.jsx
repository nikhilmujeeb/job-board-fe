import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const authCheckInterval = setInterval(() => {
      setIsAuthenticated(!!localStorage.getItem("authToken"));
    }, 1000);

    return () => clearInterval(authCheckInterval);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    alert("Logged out successfully.");
  };

  const toggleNavbar = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page when the button is clicked
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo-link">
            <span className="logo-text">JOB SEEKER</span>
          </Link>
          <div className="navbar-links">
            <Link to="/job-listings">Job Listings</Link>
            <Link to="/dashboard">Dashboard</Link>
            <div className="more-options" onClick={toggleNavbar}>
              <span>More Options ▼</span>
            </div>
          </div>
        </div>
        <div className="navbar-right">
          <button className="theme-button" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="auth-button">
              Logout
            </button>
          ) : (
            <button onClick={handleLoginClick} className="auth-button">
              Login
            </button>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="dropdown-expanded">
          <div className="dropdown-column">
            <h3>Explore Opportunities</h3>
            <Link to="/job-listings">Find Jobs</Link>
            <Link to="/create-profile">Create/Update Profile</Link>
            <Link to="/dashboard">Dashboard</Link>
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
            <Link to="/terms-and-privacy">Terms & Privacy</Link>
          </div>
          <div className="dropdown-column">
            <h3>Stay Connected</h3>
            <Link to="/social-media">Social Media</Link>
            <Link to="/feedback">Feedback</Link>
            <Link to="/support">Support</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
