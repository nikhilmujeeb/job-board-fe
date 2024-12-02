import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/createprofile.css';

const ProfileCreatePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    bio: '',
    skills: [], // Initialize skills as an empty array
    education: [{ school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
    experience: [{ company: '', jobTitle: '', startDate: '', endDate: '', description: '' }],
    socialLinks: { linkedin: '', github: '', twitter: '' }, // Ensure socialLinks is initialized
    resume: null,
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
          const data = response.data || {};
          data.skills = Array.isArray(data.skills) ? data.skills : []; // Ensure skills is always an array
          data.education = Array.isArray(data.education) ? data.education : []; // Ensure education is an array
          data.experience = Array.isArray(data.experience) ? data.experience : []; // Ensure experience is an array
          data.socialLinks = data.socialLinks || { linkedin: '', github: '', twitter: '' }; // Ensure socialLinks is initialized
          setProfileData(data);
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
    const field = name.split('.')[0]; 
    const index = name.split('.')[1]; 
    
    if (field === 'education') {
      const newEducation = [...profileData.education];
      newEducation[index] = { ...newEducation[index], [name.split('.')[2]]: value };
      setProfileData({ ...profileData, education: newEducation });
    } else if (field === 'experience') {
      const newExperience = [...profileData.experience];
      newExperience[index] = { ...newExperience[index], [name.split('.')[2]]: value };
      setProfileData({ ...profileData, experience: newExperience });
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      resume: e.target.files[0], 
    }));
  };

  const handleAddEducation = () => {
    setProfileData((prevData) => ({
      ...prevData,
      education: [...prevData.education, { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
    }));
  };

  const handleRemoveEducation = (index) => {
    const newEducation = [...profileData.education];
    newEducation.splice(index, 1);
    setProfileData({ ...profileData, education: newEducation });
  };

  const handleAddExperience = () => {
    setProfileData((prevData) => ({
      ...prevData,
      experience: [...prevData.experience, { company: '', jobTitle: '', startDate: '', endDate: '', description: '' }],
    }));
  };

  const handleRemoveExperience = (index) => {
    const newExperience = [...profileData.experience];
    newExperience.splice(index, 1);
    setProfileData({ ...profileData, experience: newExperience });
  };

  const handleSkillInputChange = (e) => {
    const { value } = e.target;
    if (e.key === 'Enter' && value.trim() !== '') {
      setProfileData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, value.trim()],
      }));
      e.target.value = ''; 
    }
  };

  const handleRemoveSkill = (index) => {
    const newSkills = [...profileData.skills];
    newSkills.splice(index, 1); 
    setProfileData({ ...profileData, skills: newSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('You must be logged in to save your profile.');
      return;
    }

    const token = localStorage.getItem('authToken');
    const formData = new FormData();

    for (const key in profileData) {
      if (profileData[key] instanceof Object && !Array.isArray(profileData[key])) {
        for (const subKey in profileData[key]) {
          formData.append(`socialLinks[${subKey}]`, profileData[key][subKey]);
        }
      } else if (Array.isArray(profileData[key])) {
        formData.append(key, JSON.stringify(profileData[key])); 
      } else {
        formData.append(key, profileData[key]);
      }
    }

    if (profileData.resume) {
      formData.append('resume', profileData.resume);
    }

    try {
      await axios.post(
        'https://job-board-be-vk4x.onrender.com/api/id/profiles',
        formData,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
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
        
        {/* Skills Input */}
        <div>
          <h3>Skills</h3>
          <input
            type="text"
            onKeyDown={handleSkillInputChange} 
            placeholder="Type a skill and press Enter"
          />
          <div>
            {Array.isArray(profileData.skills) && profileData.skills.length > 0 && (
              <ul>
                {profileData.skills.map((skill, index) => (
                  <li key={index}>
                    {skill} 
                    <button type="button" onClick={() => handleRemoveSkill(index)}>Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h3>Education</h3>
          {profileData.education.map((edu, index) => (
            <div key={index}>
              <input
                type="text"
                name={`education.${index}.school`}
                value={edu.school}
                onChange={handleChange}
                placeholder="School"
              />
              <input
                type="text"
                name={`education.${index}.degree`}
                value={edu.degree}
                onChange={handleChange}
                placeholder="Degree"
              />
              <input
                type="text"
                name={`education.${index}.fieldOfStudy`}
                value={edu.fieldOfStudy}
                onChange={handleChange}
                placeholder="Field of Study"
              />
               {/* Start Date Label and Input */}
              <div>
                <label htmlFor={`education.${index}.startDate`}>Start Date</label>
                <input
                  type="date"
                  name={`education.${index}.startDate`}
                  value={edu.startDate}
                  onChange={handleChange}
                  placeholder="Start Date"
                />
              </div>
              {/* End Date Label and Input */}
              <div>
                <label htmlFor={`education.${index}.endDate`}>End Date</label>
                <input
                  type="date"
                  name={`education.${index}.endDate`}
                  value={edu.endDate}
                  onChange={handleChange}
                  placeholder="End Date"
                />
              </div>

              <button type="button" onClick={() => handleRemoveEducation(index)}>
                Remove Education
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddEducation}>
            Add Education
          </button>
        </div>

        {/* Experience Section */}
        <div>
          <h3>Experience</h3>
          {profileData.experience.map((exp, index) => (
            <div key={index}>
              <input
                type="text"
                name={`experience.${index}.company`}
                value={exp.company}
                onChange={handleChange}
                placeholder="Company"
              />
              <input
                type="text"
                name={`experience.${index}.jobTitle`}
                value={exp.jobTitle}
                onChange={handleChange}
                placeholder="Job Title"
              />
              <input
                type="text"
                name={`experience.${index}.startDate`}
                value={exp.startDate}
                onChange={handleChange}
                placeholder="Start Date"
              />
              <input
                type="text"
                name={`experience.${index}.endDate`}
                value={exp.endDate}
                onChange={handleChange}
                placeholder="End Date"
              />
              <input
                type="text"
                name={`experience.${index}.description`}
                value={exp.description}
                onChange={handleChange}
                placeholder="Job Description"
              />
              <button type="button" onClick={() => handleRemoveExperience(index)}>
                Remove Experience
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddExperience}>
            Add Experience
          </button>
        </div>

        {/* Social Links */}
        <div>
          <h3>Social Links</h3>
          <input
            type="text"
            name="socialLinks.linkedin"
            value={profileData.socialLinks.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn"
          />
          <input
            type="text"
            name="socialLinks.github"
            value={profileData.socialLinks.github}
            onChange={handleChange}
            placeholder="GitHub"
          />
          <input
            type="text"
            name="socialLinks.twitter"
            value={profileData.socialLinks.twitter}
            onChange={handleChange}
            placeholder="Twitter"
          />
        </div>

        {/* Resume Upload */}
        <div>
          <label>Upload Resume</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileCreatePage;
