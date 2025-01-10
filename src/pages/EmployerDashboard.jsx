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
  const [selectedJob, setSelectedJob] = useState(null); // For popup
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

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job post?");
    if (!confirmDelete) return;
  
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      console.warn("No token found. Redirecting to login.");
      navigate("/login");
      return;
    }
  
    try {
      await axios.delete(
        `https://job-board-be-vk4x.onrender.com/api/job/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPostedJobs(postedJobs.filter((job) => job._id !== jobId));
      alert("Job deleted successfully.");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job.");
    }
  };  

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  const handleClosePopup = () => {
    setSelectedJob(null);
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
                <div className="job-actions">
                  <button onClick={() => handleViewApplicants(job)}>View Applicants</button>
                  <button onClick={() => handleEdit(job._id)}>Edit Job</button>
                  <button onClick={() => handleDelete(job._id)}>Delete Job</button>
                  <button onClick={() => handleViewDetails(job)}>View Details</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Applicants Modal */}
      {showApplicants && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setShowApplicants(false)}
            >
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

      {/* Job Details Popup */}
      {selectedJob && (
        <div className="popup" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClosePopup}>
              X
            </button>
            <h3>{selectedJob.title}</h3>
            <p>
              <strong>Company:</strong> {selectedJob.company}
            </p>
            <p>
              <strong>Location:</strong> {selectedJob.location}
            </p>
            <p>
              <strong>Salary Range:</strong> {selectedJob.salaryRange}
            </p>
            <p>
              <strong>Job Type:</strong> {selectedJob.jobType}
            </p>
            <p>
              <strong>Category:</strong> {selectedJob.category}
            </p>
            <p>
              <strong>Experience:</strong> {selectedJob.experience}
            </p>
            <p>
              <strong>Description:</strong> {selectedJob.description}
            </p>
            <p>
              <strong>Requirements:</strong> {selectedJob.requirements}
            </p>
            <p>
              <strong>Contact Email:</strong> {selectedJob.contact}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
