import React, { useState } from "react";
import "../styles/feedbackSocialSupport.css";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your feedback: "${feedback}"`);
    setFeedback("");
  };

  return (
<div className="page-container feedback-section">
  <h1>Feedback</h1>
  <form>
    <label htmlFor="name">Name</label>
    <input type="text" id="name" placeholder="Enter your name" />

    <label htmlFor="email">Email</label>
    <input type="email" id="email" placeholder="Enter your email" />

    <label htmlFor="message">Message</label>
    <textarea id="message" rows="5" placeholder="Enter your feedback"></textarea>

    <button type="submit">Submit Feedback</button>
  </form>
</div>
  );
};

export default Feedback;
