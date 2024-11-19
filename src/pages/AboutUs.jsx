import React from 'react';
import '../styles/about.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Welcome to our Job Board Platform!</p>
      </header>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          We aim to connect talented individuals with the best job opportunities.
          Our platform is dedicated to providing job seekers and employers with a seamless, efficient, and transparent experience.
        </p>
      </section>

      <section className="values-section">
        <h2>Our Values</h2>
        <ul>
          <li>Integrity</li>
          <li>Innovation</li>
          <li>Accessibility</li>
          <li>Collaboration</li>
        </ul>
      </section>

      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <h3>Nikhil V Mujeeb</h3>
            <p>CEO & Co-Founder</p>
            <p>Passionate about connecting people to the right opportunities.</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Have questions or want to get in touch? Email us at <a href="mailto:contact@jobboard.com">contact@jobboard.com</a></p>
      </section>
    </div>
  );
};

export default AboutUs;
