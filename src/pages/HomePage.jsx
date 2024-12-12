import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [jobListings, setJobListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get('https://job-board-be-vk4x.onrender.com/api/job')
      .then((response) => {
        setJobListings(response.data.slice(0, 3)); 
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch job listings');
        setIsLoading(false);
      });

    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleApply = async (jobId) => {
    if (!isLoggedIn) {
      alert('You need to be logged in to apply for jobs');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        `https://job-board-be-vk4x.onrender.com/api/job/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert('Failed to apply for the job');
    }
  };

  return (
    <div className="home-page">
      {/* Banner Section */}
      <div className="banner">
        <h1>Welcome to Job Seeker</h1>
        <p>Your one-stop platform for finding and posting job opportunities</p>
        <Link to="/create-profile" className="cta-button">
          Get Started By Making a Profile
        </Link>
      </div>

      {/* Features Section */}
      <div className="features">
        <h2>Our Key Features</h2>
        <div className="feature">
          <h3>Find Job Opportunities</h3>
          <p>Browse through thousands of job listings and apply to the one that fits your skills and interests.</p>
        </div>
        <div className="feature">
          <h3>Employers Create Listings</h3>
          <p>Employers can post job listings to connect with qualified candidates easily.</p>
        </div>
        <div className="feature">
          <h3>And More</h3>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="job-listings">
        <h2>Available Job Listings</h2>
        {isLoading ? (
          <p>Loading job listings...</p>
        ) : error ? (
          <p>{error}</p>
        ) : jobListings.length > 0 ? (
          <ul>
            {jobListings.map((job) => (
              <li key={job._id}>
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p>{job.location || 'Location not specified'}</p>
                <p>{job.salaryRange || 'Salary not specified'}</p>
                <p>{job.description}</p>
                <button
                  className="cta-button"
                  onClick={() => handleApply(job._id)}
                >
                  Apply Now
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No job listings available</p>
        )}

        {/* See More Button */}
        <div className="see-more">
          <Link to="/job-listings" className="cta-button">
            See More
          </Link>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h2>What Our Users Are Saying</h2>
        <div className="testimonial">
          <p>"Job Seeker helped me land my dream job. The application process was seamless and easy to track!"</p>
          <h4>- Sarah M., Job Seeker</h4>
        </div>
        <div className="testimonial">
          <p>"As an employer, I was able to find the perfect candidate quickly. The platform is intuitive and simple to use."</p>
          <h4>- John D., Employer</h4>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
