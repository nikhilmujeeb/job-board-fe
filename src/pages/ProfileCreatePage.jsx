import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/createprofile.css';

const ProfileCreatePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    bio: '',
    skills: '',
    education: '',
    experience: '',
    socialLinks: { linkedin: '', github: '', twitter: '' },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      axios
        .get('https://job-board-be-vk4x.onrender.com/api/id/profiles', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setProfileData(response.data || {});
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setError('Failed to fetch profile data.');
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('You must be logged in to save your profile.');
      return;
    }

    const token = localStorage.getItem('authToken');
    try {
      await axios.post(
        'https://job-board-be-vk4x.onrender.com/api/id/profiles',
        profileData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/profile');
    } catch (err) {
      setError('Failed to save the profile. Please try again later.');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Create or Update Profile</h2>
      {error && <p>{error}</p>}
      {!isLoggedIn && <p style={{ color: 'red' }}>You must be logged in to save your profile.</p>}

      <form onSubmit={handleSubmit}>
        <textarea
          name="bio"
          value={profileData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
        />
        <input
          type="text"
          name="skills"
          value={profileData.skills}
          onChange={handleChange}
          placeholder="Your skills"
        />
        <input
          type="text"
          name="education"
          value={profileData.education}
          onChange={handleChange}
          placeholder="Your education"
        />
        <input
          type="text"
          name="experience"
          value={profileData.experience}
          onChange={handleChange}
          placeholder="Your experience"
        />
        {/* Social Links */}
        <input
          type="url"
          name="linkedin"
          value={profileData.socialLinks.linkedin}
          onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, linkedin: e.target.value } })}
          placeholder="LinkedIn URL"
        />
        <input
          type="url"
          name="github"
          value={profileData.socialLinks.github}
          onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, github: e.target.value } })}
          placeholder="GitHub URL"
        />
        <input
          type="url"
          name="twitter"
          value={profileData.socialLinks.twitter}
          onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, twitter: e.target.value } })}
          placeholder="Twitter URL"
        />
        <button type="submit" disabled={!isLoggedIn}>Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileCreatePage;
