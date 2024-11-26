import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", content: "" });

  const navigate = useNavigate();

  // Admin authentication check
  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expired. Redirecting to login.");
          localStorage.removeItem("authToken");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "https://job-board-be-vk4x.onrender.com/api/admin/check-admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data.isAdmin) {
          alert("Access denied. Admins only.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Admin check failed:", error);
        alert("Unable to verify admin status. Please log in.");
        navigate("/login");
      }
    };

    checkAdmin();
  }, [navigate]);

  // Fetch pending job listings
  useEffect(() => {
    const fetchPendingJobs = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.log("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      try {
        console.log("Fetching pending jobs...");
        const response = await axios.get(
          "https://job-board-be-vk4x.onrender.com/api/job/pending",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const jobs = response.data.jobs || [];
        const filteredJobs = jobs.filter((job) => !job.isApproved);
        setJobListings(filteredJobs);
      } catch (error) {
        console.error("Error fetching pending jobs:", error);
        setJobListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingJobs();
  }, [navigate]);

  // Approve a job listing
  const approveJob = async (jobId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `https://job-board-be-vk4x.onrender.com/api/job/approve/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage({ type: "success", content: response.data.message });
      setJobListings((prev) => prev.filter((job) => job._id !== jobId)); // Remove approved job from the list
    } catch (error) {
      setMessage({
        type: "error",
        content: error.response?.data?.message || "Failed to approve job listing.",
      });
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Approve job listings submitted by employers.</p>

      {message.content && (
        <p className={message.type === "success" ? "success-message" : "error-message"}>
          {message.content}
        </p>
      )}

      {loading ? (
        <p>Loading job listings...</p>
      ) : jobListings.length === 0 ? (
        <p>No job listings pending approval.</p>
      ) : (
        <table className="job-listings-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobListings.map((job) => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>
                  <button onClick={() => approveJob(job._id)} className="approve-button">
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
