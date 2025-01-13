import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct named import

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      console.warn("No token found. Redirecting to login.");
      navigate("/login");
      return;
    }
  
    try {
      // Decode the token to get the userId
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      console.log("Decoded User ID:", userId);
  
      // Fetch the profile data using the userId
      const fetchProfile = async () => {
        try {
          const profileResponse = await axios.get(
            `https://job-board-be-vk4x.onrender.com/api/id/profile/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (profileResponse.data) {
            setProfile(profileResponse.data);
          } else {
            setProfile(null); // No profile found
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            // Profile not found
            setProfile(null);
          } else {
            setError("Failed to fetch data. Please try again later.");
            console.error("Error fetching profile:", error);
          }
        }
      };
  
      // Fetch the applied jobs
      const fetchAppliedJobs = async () => {
        try {
          const jobsResponse = await axios.get(
            `https://job-board-be-vk4x.onrender.com/api/user/getJobsApplied`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAppliedJobs(jobsResponse.data.jobs);
        } catch (error) {
          setError("Failed to fetch applied jobs.");
          console.error("Error fetching applied jobs:", error);
        }
      };
  
      fetchProfile();
      fetchAppliedJobs();
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error decoding token:", error);
      setError("Invalid token.");
      setLoading(false); // Set loading to false even if token decoding fails
    }
  }, [navigate]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  if (!profile) {
    return <div>No profile data available.</div>;
  }  

  if (!profile) {
    return (
      <div className="user-dashboard">
        <h1>User Dashboard</h1>
        <p>Profile is not created yet. Please complete your profile.</p>
        <button onClick={() => navigate("/create-profile")}>Create Profile</button>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>

      <section className="profile-info">
        <h2>Profile Information</h2>
        <div>
          <strong>Name: </strong>
          {profile.firstName} {profile.middleName} {profile.lastName}
        </div>
        <div>
          <strong>Email: </strong>
          {profile.email}
        </div>
        <div>
          <strong>Phone: </strong>
          {profile.countryCode} {profile.phone}
        </div>
        <div>
          <strong>Bio: </strong>
          {profile.bio}
        </div>
        <div>
          <strong>Skills: </strong>
          <ul>
            {profile.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill, index) => <li key={index}>{skill}</li>)
            ) : (
              <li>No skills available</li>
            )}
          </ul>
        </div>
        <div>
          <strong>Address: </strong>
          {profile.address}
        </div>
        <div>
          <strong>Date of Birth: </strong>
          {new Date(profile.dateOfBirth).toLocaleDateString()}
        </div>

        <h3>Education</h3>
        <ul>
          {profile.education && profile.education.length > 0 ? (
            profile.education.map((edu, index) => (
              <li key={index}>
                <strong>{edu.degree} in {edu.fieldOfStudy}</strong> from {edu.school} ({new Date(edu.startDate).toLocaleDateString()} - {new Date(edu.endDate).toLocaleDateString()})
              </li>
            ))
          ) : (
            <li>No education information available</li>
          )}
        </ul>

        <h3>Experience</h3>
        <ul>
          {profile.experience && profile.experience.length > 0 ? (
            profile.experience.map((exp, index) => (
              <li key={index}>
                <strong>{exp.jobTitle}</strong> at {exp.company} ({new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"})
                <p>{exp.description}</p>
              </li>
            ))
          ) : (
            <li>No work experience available</li>
          )}
        </ul>

        <h3>Social Links</h3>
        <div>
          {profile.socialLinks ? (
            <ul>
              {profile.socialLinks.linkedin && <li><a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>}
              {profile.socialLinks.github && <li><a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>}
              {profile.socialLinks.twitter && <li><a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></li>}
            </ul>
          ) : (
            <p>No social links available</p>
          )}
        </div>
      </section>

      <section className="applied-jobs">
        <h2>Jobs You Have Applied To</h2>
        {appliedJobs.length > 0 ? (
          <ul>
            {appliedJobs.map((job, index) => (
              <li key={index}>
                <strong>{job.title}</strong> at {job.company} <br />
                <span>{job.location}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have not applied to any jobs yet.</p>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
