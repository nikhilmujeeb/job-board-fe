import React from "react";
import "../styles/helpCenter.css";

const HelpCenter = () => {
  return (
    <div className="help-center">
      <h1>Help Center</h1>
      <p>
        Welcome to the Help Center. Find answers to your questions or contact us for further assistance.
      </p>

      <section>
        <h2>FAQs</h2>
        <div className="faq">
          <h3>1. How do I log in to the platform?</h3>
          <p>
            You can log in using the email and password you provided during signup. If you're an admin, ensure your account has admin privileges.
          </p>

          <h3>2. I forgot my password. How can I reset it?</h3>
          <p>
            Go to the login page and click on "Forgot Password." Enter your registered email address, and we will send you a link to reset your password.
          </p>

          <h3>3. How do I contact support?</h3>
          <p>
            You can reach out to our support team using the "Contact Support" section below.
          </p>
        </div>
      </section>

      <section>
        <h2>Troubleshooting</h2>
        <div className="troubleshooting">
          <h3>Login Issues</h3>
          <p>
            Ensure that you are using the correct email and password. If the issue persists, clear your browser cache and try again. For token-related issues, log out and log back in.
          </p>

          <h3>Admin Access Issues</h3>
          <p>
            Verify that your account has admin privileges. If you're unable to access admin features, contact support for assistance.
          </p>
        </div>
      </section>

      <section>
        <h2>Contact Support</h2>
        <p>If you need further help, feel free to reach out to us:</p>
        <ul>
          <li>Email: <a href="mailto:support@example.com">support@example.com</a></li>
          <li>Phone: +1 800-123-4567</li>
          <li>Live Chat: Available soon</li>
        </ul>
      </section>
    </div>
  );
};

export default HelpCenter;
