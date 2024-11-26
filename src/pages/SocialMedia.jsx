import React from "react";
import "../styles/feedbackSocialSupport.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const SocialMedia = () => (
<div className="page-container social-media-section">
  <h1>Follow Us on Social Media</h1>
  <div className="social-media-icons">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-facebook"></i>
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-twitter"></i>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
  </div>
</div>

);

export default SocialMedia;
