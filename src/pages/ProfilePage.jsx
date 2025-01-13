import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `https://job-board-be-vk4x.onrender.com/api/id/profile/${id}`
        );
        if (response.data) {
          setProfile(response.data);
        } else {
          setProfile(null); // No profile found
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile.");
      }
    };

    fetchProfile();
  }, [id]);

  if (error) {
    return <div className="profile-container">{error}</div>;
  }

  if (!profile) {
    return <div className="profile-container">No profile available.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>
          {profile.firstName} {profile.middleName || ""} {profile.lastName}
        </h1>
        <p>{profile.bio}</p>
      </div>

      <div className="profile-section">
        <h2>Personal Information</h2>
        <p><strong>Date of Birth:</strong> {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.countryCode} {profile.phone}</p>
      </div>

      <div className="profile-section">
        <h2>Skills</h2>
        <ul>
          {profile.skills?.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="profile-section education">
        <h2>Education</h2>
        {profile.education?.map((edu, index) => (
          <div key={index}>
            <p><strong>School:</strong> {edu.school}</p>
            <p><strong>Degree:</strong> {edu.degree}</p>
            <p><strong>Field of Study:</strong> {edu.fieldOfStudy}</p>
            <p>
              <strong>Duration:</strong> {new Date(edu.startDate).toLocaleDateString()} -{" "}
              {new Date(edu.endDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div className="profile-section experience">
        <h2>Experience</h2>
        {profile.experience?.map((exp, index) => (
          <div key={index}>
            <p><strong>Company:</strong> {exp.company}</p>
            <p><strong>Job Title:</strong> {exp.jobTitle}</p>
            <p>
              <strong>Duration:</strong> {new Date(exp.startDate).toLocaleDateString()} -{" "}
              {new Date(exp.endDate).toLocaleDateString()}
            </p>
            <p><strong>Description:</strong> {exp.description}</p>
          </div>
        ))}
      </div>

      <div className="profile-section profile-links">
        <h2>Social Links</h2>
        {profile.socialLinks?.linkedin && (
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              {profile.socialLinks.linkedin}
            </a>
          </p>
        )}
        {profile.socialLinks?.github && (
          <p>
            <strong>GitHub:</strong>{" "}
            <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
              {profile.socialLinks.github}
            </a>
          </p>
        )}
        {profile.socialLinks?.twitter && (
          <p>
            <strong>Twitter:</strong>{" "}
            <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              {profile.socialLinks.twitter}
            </a>
          </p>
        )}
      </div>

      {profile.resume && (
        <div className="profile-section">
          <h2>Resume</h2>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-link"
          >
            View Resume
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
