import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/employerDashboard.css";

const EmployerDashboard = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: "", company: "", location: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log in.");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "https://job-board-be-vk4x.onrender.com/api/job/employer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPostedJobs(response.data.jobs || []);
      } catch (error) {
        console.error("Error fetching posted jobs:", error);
        setPostedJobs([]);
      }
    };

    fetchPostedJobs();
  }, [navigate]);

  const handlePostJob = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://job-board-be-vk4x.onrender.com/api/job/create",
        newJob,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Job posted successfully!");
      setPostedJobs([...postedJobs, response.data.job]);
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job.");
    }
  };

  return (
    <div className="employer-dashboard">
      <h1>Employer Dashboard</h1>
      <p>Manage your job listings and post new opportunities.</p>

      <div className="post-job-form">
        <h2>Post a New Job</h2>
        <input
          type="text"
          placeholder="Job Title"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company Name"
          value={newJob.company}
          onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newJob.location}
          onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
        />
        <button onClick={handlePostJob}>Post Job</button>
      </div>

      <div className="posted-jobs">
        <h2>Your Posted Jobs</h2>
        {postedJobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul>
            {postedJobs.map((job) => (
              <li key={job._id}>
                <h2>{job.title}</h2>
                <p>{job.company} - {job.location}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
