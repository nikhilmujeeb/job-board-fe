import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/employerDashboard.css";

const EmployerDashboard = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [showApplicants, setShowApplicants] = useState(false);
  const [selectedJobApplicants, setSelectedJobApplicants] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.warn("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      setLoadingJobs(true);
      try {
        const jobResponse = await axios.get(
          "https://job-board-be-vk4x.onrender.com/api/job/employer-jobs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPostedJobs(jobResponse.data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setPostedJobs([]);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleViewApplicants = (job) => {
    setSelectedJobApplicants(job.applicants || []);
    setSelectedJobTitle(job.title);
    setShowApplicants(true);
  };

  const handleEdit = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  return (
    <div className="employer-dashboard">
      <h1>Employer Dashboard</h1>
      <p>Manage your job listings and view applicants.</p>

      <div className="post-job-link">
        <h2>Post a New Job</h2>
        <button onClick={() => navigate("/create-job")}>
          Go to Create Job Post Page
        </button>
      </div>

      <div className="posted-jobs">
        <h2>Your Posted Jobs</h2>
        {loadingJobs ? (
          <p>Loading jobs...</p>
        ) : postedJobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul>
            {postedJobs.map((job) => (
              <li key={job._id} className="job-container">
                <h2>{job.title}</h2>
                <p>
                  {job.company} - {job.location}
                </p>
                <p>
                  <strong>Applicants:</strong> {job.applicants?.length || 0}
                </p>
                <button onClick={() => handleViewApplicants(job)}>
                  View Applicants
                </button>
                <button onClick={() => handleEdit(job._id)}>Edit Job</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Applicants Modal */}
      {showApplicants && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowApplicants(false)}>
              &times;
            </button>
            <h2>Applicants for {selectedJobTitle}</h2>
            {selectedJobApplicants.length > 0 ? (
              <ul>
                {selectedJobApplicants.map((applicant, index) => (
                  <li key={index}>
                    <p>
                      <strong>Name:</strong> {applicant.name || "N/A"}
                    </p>
                    <p>
                      <strong>Email:</strong> {applicant.email || "N/A"}
                    </p>
                     <button
                        onClick={() => {
                          if (applicant._id) {
                            console.log("Navigating to applicant profile:", applicant._id);
                            navigate(`/profile/${applicant._id}`);
                          } else {
                            console.error("Applicant ID is missing.");
                          }
                        }}
                        >
                          View Profile
                      </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applicants yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
