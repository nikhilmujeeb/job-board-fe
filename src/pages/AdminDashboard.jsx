import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
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
        console.warn("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          console.warn("Token expired. Redirecting to login.");
          localStorage.removeItem("authToken");
          navigate("/login");
          return;
        }

        const { data } = await axios.get(
          "https://job-board-be-vk4x.onrender.com/api/admin/check-admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!data.isAdmin) {
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
        console.warn("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }
    
      try {
        const { data } = await axios.get(
          "https://job-board-be-vk4x.onrender.com/api/job/pending",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        console.log("Full API Response:", data); // Log entire response to inspect data structure
    
        // Check if 'isApproved' is properly set
        data.forEach(job => {
          console.log(`Job Title: ${job.title}, isApproved: ${job.isApproved}`);
        });
    
        const pendingJobs = data?.filter((job) => job.isApproved === false) || [];
        console.log("Pending jobs after filtering:", pendingJobs);
    
        setJobListings(pendingJobs);
      } catch (error) {
        console.error("Error fetching pending jobs:", error.message);
        setJobListings([]);
      } finally {
        setLoading(false);
      }
    };    

    fetchPendingJobs();
  }, [navigate]);

  // Approve a job listing
  const approveJob = async (jobId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.put(
        `https://job-board-be-vk4x.onrender.com/api/job/approve/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({
        type: "success",
        content: data.message || "Job approved successfully.",
      });
      setJobListings((prevJobs) =>
        prevJobs.filter((job) => job._id !== jobId)
      );
    } catch (error) {
      console.error("Error approving job listing:", error.message);
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
              <th>Salary Range</th>
              <th>Category</th>
              <th>Experience</th>
              <th>Contact</th>
              <th>Job Type</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobListings.map((job) => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{job.salaryRange}</td>
                <td>{job.category}</td>
                <td>{job.experience}</td>
                <td>{job.contact}</td>
                <td>{job.jobType}</td>
                <td className="description">{job.description}</td>
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
