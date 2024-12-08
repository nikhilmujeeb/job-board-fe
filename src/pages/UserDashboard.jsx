import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct named import
import '../styles/user-dashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileAndJobs = async () => {
      const token = localStorage.getItem('authToken'); // Get token from localStorage
  
      if (!token) {
        navigate('/login'); // Redirect to login if the user is not logged in
        return;
      }
  
      // Decode the token and extract the userId
      const decoded = jwtDecode(token);
      const userId = decoded.userId; // Ensure this key matches the actual key in your token
      console.log("Decoded user ID:", userId);  // Log to verify the user ID
  
      if (!userId) {
        console.error("User ID is missing from the token.");
        setError("Unable to fetch profile. Please login again.");
        setLoading(false);
        return;
      }
  
      try {
        // Fetch profile data using the user ID
        const profileResponse = await axios.get(
          `https://job-board-be-vk4x.onrender.com/api/id/profile/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } } // Ensure this is correct
        );
        console.log("Profile data fetched:", profileResponse);  // Log to verify profile data
        setProfile(profileResponse.data);  // Update to set the full response
  
        // Fetch applied jobs
        const jobsResponse = await axios.get(
          'https://job-board-be-vk4x.onrender.com/api/user/getJobsApplied',
          { headers: { Authorization: `Bearer ${token}` } } // Ensure this is correct
        );
        console.log("Applied Jobs:", jobsResponse.data.jobs); // Log jobs to verify
        setAppliedJobs(jobsResponse.data.jobs);
  
      } catch (err) {
        console.error("Error fetching data:", err.response || err.message);
        setError('Failed to load profile or jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfileAndJobs();
  }, [navigate]);  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>

      <section className="profile-info">
        <h2>Profile Information</h2>
        <div><strong>Name: </strong>{profile.firstName} {profile.middleName} {profile.lastName}</div>
        <div><strong>Email: </strong>{profile.email}</div>
        <div><strong>Phone: </strong>{profile.countryCode} {profile.phone}</div>
        <div><strong>Bio: </strong>{profile.bio}</div>
        
        <div><strong>Skills: </strong>
          <ul>
            {profile.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill, index) => <li key={index}>{skill}</li>)
            ) : (
              <li>No skills available</li>
            )}
          </ul>
        </div>
        
        <div><strong>Address: </strong>{profile.address}</div>
        <div><strong>Date of Birth: </strong>{new Date(profile.dateOfBirth).toLocaleDateString()}</div>

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
                <strong>{exp.jobTitle}</strong> at {exp.company} ({new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'})
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
        <strong>{job.title}</strong> at {job.company} <br />  {/* Display company directly */}
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
