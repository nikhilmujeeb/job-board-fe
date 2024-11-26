import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/jobSeekerDashboard.css";

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log in.");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "https://job-board-be-vk4x.onrender.com/api/job",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJobs(response.data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      }
    };

    fetchJobs();
  }, [navigate]);

  return (
    <div className="jobseeker-dashboard">
      <h1>Job Seeker Dashboard</h1>
      <p>Explore job opportunities and apply to the ones that match your skills.</p>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job._id}>
              <h2>{job.title}</h2>
              <p>{job.company} - {job.location}</p>
              <button onClick={() => alert("Apply for " + job.title)}>Apply</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobSeekerDashboard;
