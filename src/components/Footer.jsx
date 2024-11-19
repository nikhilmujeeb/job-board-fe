import React from 'react';

const Footer = () => (
<footer>
  <div class="newsletter">
    <h2>Stay Updated with Our News</h2>
    <p>Subscribe to receive the latest updates and job opportunities directly to your inbox.</p>
    <form class="subscribe-form">
      <input type="email" placeholder="Enter your email" required />
      <button type="submit">Sign Up</button>
    </form>
    <p class="terms">By clicking Sign Up, you agree to our <a href="#">Terms and Conditions</a>.</p>
  </div>
  <div class="footer-sections">
    <div class="footer-column">
      <h4>Useful Links</h4>
      <ul>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#">Job Listings</a></li>
        <li><a href="#">Help Center</a></li>
        <li><a href="#">FAQs</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h4>Resources</h4>
      <ul>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Site Map</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h4>Follow Us</h4>
      <ul>
        <li><a href="#">Facebook Page</a></li>
        <li><a href="#">Twitter Feed</a></li>
        <li><a href="#">LinkedIn Profile</a></li>
        <li><a href="#">Instagram</a></li>
        <li><a href="#">YouTube Channel</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h4>Get in Touch</h4>
      <ul>
        <li><a href="#">Email Us</a></li>
        <li><a href="#">Support</a></li>
        <li><a href="#">Feedback</a></li>
        <li><a href="#">Community</a></li>
        <li><a href="#">Join Our Community</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="logo">JOB SEEKER</div>
    <p>© 2024 Job Seeker. All rights reserved.</p>
  </div>
</footer>

);

export default Footer;
