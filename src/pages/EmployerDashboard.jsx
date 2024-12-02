import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corrected import
import "../styles/employerDashboard.css";

const EmployerDashboard = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Please log in.");
          navigate("/login");
          return;
        }

        const decodedToken = jwtDecode(token); // Use jwtDecode instead of jwt
        const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

        // Check if the token has expired
        if (decodedToken.exp < currentTime) {
          alert("Session expired. Please log in again.");
          navigate("/login");
          return;
        }

        // Fetch posted jobs
        setLoadingJobs(true); // Set loading state for jobs
        const jobResponse = await axios.get(
          "https://job-board-be-vk4x.onrender.com/api/job/employer-jobs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Job Response Data:", jobResponse.data); // Log the response data
        setPostedJobs(jobResponse.data.jobs || []);
        setLoadingJobs(false); // Set loadingJobs to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setPostedJobs([]);  // Clear posted jobs in case of an error
        setLoadingJobs(false);  // Set loading to false even in case of error
      }
    };

    fetchPostedJobs();
  }, [navigate]);

  // Handle deleting a job post
  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job post?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Please log in.");
          navigate("/login");
          return;
        }

        // Make API request to delete the job
        await axios.delete(
          `https://job-board-be-vk4x.onrender.com/api/job/${jobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Update state after deletion
        setPostedJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        alert("Job post deleted successfully.");
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete job post.");
      }
    }
  };

  return (
    <div className="employer-dashboard">
      <h1>Employer Dashboard</h1>
      <p>Manage your job listings and view user profiles.</p>

      {/* Redirect to Create Job Post Page */}
      <div className="post-job-link">
        <h2>Post a New Job</h2>
        <button onClick={() => navigate("/create-job")}>
          Go to Create Job Post Page
        </button>
      </div>

      {/* Display Posted Jobs */}
      <div className="posted-jobs">
        <h2>Your Posted Jobs</h2>
        {loadingJobs ? (
          <p>Loading jobs...</p>  // Display loading message while jobs are fetching
        ) : postedJobs.length === 0 ? (
          <p>No jobs posted yet.</p>  // Display message if no jobs are found
        ) : (
          <ul>
            {postedJobs.map((job) => (
              <li key={job._id} className="job-container">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(job._id)}
                >
                  ×
                </button>
                <h2>{job.title}</h2>
                <p>
                  {job.company} - {job.location}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
