import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../styles/employerDashboard.css";

const EmployerDashboard = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Please log in.");
          navigate("/login");
          return;
        }

        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          alert("Session expired. Please log in again.");
          navigate("/login");
          return;
        }

        setLoadingJobs(true);
        const jobResponse = await axios.get(
          "https://job-board-be-vk4x.onrender.com/api/job/employer-jobs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPostedJobs(jobResponse.data.jobs || []);
        setLoadingJobs(false);

        setLoadingProfiles(true);
        const profileResponse = await axios.get(
          "https://job-board-be-vk4x.onrender.com/api/id/profiles",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Profile Response:", profileResponse.data);

        if (Array.isArray(profileResponse.data)) {
          setProfiles(profileResponse.data);
        } else {
          setProfiles(profileResponse.data.profiles || []);
        }

        setLoadingProfiles(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPostedJobs([]);
        setProfiles([]);
        setLoadingJobs(false);
        setLoadingProfiles(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job post?")) {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Please log in.");
          navigate("/login");
          return;
        }

        console.log("Token:", token);
        console.log("Job ID:", jobId);

        const response = await axios.delete(
          `https://job-board-be-vk4x.onrender.com/api/job/${jobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setPostedJobs((prevJobs) =>
            prevJobs.filter((job) => job._id !== jobId)
          );
          alert("Job post deleted successfully.");
        } else {
          alert("Failed to delete job post. Please try again later.");
        }
      } catch (error) {
        console.error("Error deleting job:", error);

        if (error.response?.status === 403) {
          alert(
            "You do not have permission to delete this job post. Please contact the admin."
          );
        } else if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          navigate("/login");
        } else {
          alert("Failed to delete job post. Please try again later.");
        }
      }
    }
  };

  const handleEdit = (jobId) => {
    navigate(`/edit-job/${jobId}`); // Redirect to edit job page with the jobId
  };

  return (
    <div className="employer-dashboard">
      <h1>Employer Dashboard</h1>
      <p>Manage your job listings and view user profiles.</p>

      <div className="post-job-link">
        <h2>Post a New Job</h2>
        <button onClick={() => navigate("/create-job")}>
          Go to Create Job Post Page
        </button>
      </div>

      {/* Posted Jobs Section */}
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
                <div className="button-container">
  <button className="delete-btn" onClick={() => handleDelete(job._id)}>
    ×
  </button>
  <button className="edit-btn" onClick={() => handleEdit(job._id)}>
    <i className="fas fa-pencil-alt"></i> {/* Edit Icon */}
  </button>
</div>
            <h2>{job.title}</h2>
        <p>
           {job.company} - {job.location}
        </p>
         <p>
          <strong>Applicants:</strong>
          {job.applicants && job.applicants.length > 0 ? (
          <ul>
            {job.applicants.map((applicant, index) => (
              <li key={index}>
                {applicant.email || "No email provided"}
              </li>
            ))}
          </ul>
          ) : (
              <span>No applicants yet</span>
              )}
            </p>
          </li>
            ))}
          </ul>
        )}
      </div>

      {/* Profiles Section */}
      <div className="profiles-section">
        <h2>All Profiles</h2>
        {loadingProfiles ? (
          <p>Loading profiles...</p>
        ) : profiles.length === 0 ? (
          <p>No profiles available.</p>
        ) : (
          <ul>
            {profiles.map((profile) => (
              <li key={profile._id} className="profile-container">
                <h3>
                  {profile.firstName} {profile.middleName} {profile.lastName}
                </h3>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Phone:</strong> {profile.phone}</p>
                <p><strong>Bio:</strong> {profile.bio}</p>

                <p><strong>Skills:</strong> {profile.skills.join(", ")}</p>

                {/* Education */}
                <p><strong>Education:</strong>
                  {profile.education.map((edu, index) => (
                    <span key={edu._id}>
                      {edu.degree} in {edu.fieldOfStudy} from {edu.school} 
                      ({new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()})
                      {index < profile.education.length - 1 && ", "}
                    </span>
                  ))}
                </p>

                {/* Experience */}
                <p><strong>Experience:</strong>
                  {profile.experience.map((exp, index) => (
                    <span key={exp._id}>
                      {exp.jobTitle} at {exp.company} ({new Date(exp.startDate).getFullYear()} - 
                      {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"})
                      {index < profile.experience.length - 1 && ", "}
                    </span>
                  ))}
                </p>

                {/* Social Links */}
                {profile.socialLinks && (
                  <p><strong>Social Links:</strong>
                    {profile.socialLinks.linkedin && (
                      <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    )}
                    {profile.socialLinks.github && (
                      <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                    )}
                    {profile.socialLinks.twitter && (
                      <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                    )}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
