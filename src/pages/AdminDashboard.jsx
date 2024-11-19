import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", content: "" });

  const navigate = useNavigate();

  // Check if the user is an admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get(
          "https://job-board-be-vk4x.onrender.com/api/admin/check-admin",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is correct
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
  

  // Fetch job listings pending approval
  useEffect(() => {
    const fetchPendingJobs = async () => {
      try {
        const response = await axios.get('https://job-board-be-vk4x.onrender.com/api/job/pending', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        console.log('Pending Jobs:', response.data.jobs);
      } catch (error) {
        console.error('Error fetching pending jobs:', error);
      }
    };    
  }, []);

  // Approve a job listing
  const approveJob = async (jobId) => {
    try {
      const response = await axios.put(
        `https://job-board-be-vk4x.onrender.com/api/job/approve/${jobId}`
      );
      setMessage({ type: "success", content: response.data.message });
      setJobListings((prev) => prev.filter((job) => job._id !== jobId));
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
