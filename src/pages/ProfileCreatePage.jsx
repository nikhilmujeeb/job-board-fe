import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import '../styles/createprofile.css';

const ProfileCreatePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    email: '',
    countryCode: '+91',
    phone: '',
    bio: '',
    skills: [],
    education: [{ school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
    experience: [{ company: '', jobTitle: '', startDate: '', endDate: '', description: '' }],
    socialLinks: { linkedin: '', github: '', twitter: '' },
    resume: null,
  });

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('authToken')?.trim();
      const userId = localStorage.getItem('userId');
  
      if (!token || !userId) {
        alert('You must be logged in to view or edit your profile.');
        navigate('/login');
        return;
      }
  
      try {
        const response = await axios.get(
          `https://job-board-be-vk4x.onrender.com/api/id/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          }
        );
  
        if (response.data) {
          setProfileData(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('No profile found for this user. Proceeding with profile creation.');
          navigate('/create-profile');
        } else {
          console.error('Error fetching profile:', error);
          alert('Failed to load profile. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfileData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parts = name.split('.');
  
    if (parts.length === 3) {
      const field = parts[0];
      const index = parseInt(parts[1], 10);
      const subField = parts[2];
  
      if (field === 'education') {
        const updatedEducation = [...profileData.education];
        updatedEducation[index] = { ...updatedEducation[index], [subField]: value };
        setProfileData({ ...profileData, education: updatedEducation });
      } else if (field === 'experience') {
        const updatedExperience = [...profileData.experience];
        updatedExperience[index] = { ...updatedExperience[index], [subField]: value };
        setProfileData({ ...profileData, experience: updatedExperience });
      }
    } else if (name.startsWith('socialLinks')) {
      const [field, subField] = name.split('.');
      setProfileData((prevData) => ({
        ...prevData,
        [field]: { ...prevData[field], [subField]: value },
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert(`File size exceeds 5 MB. The file size is ${Math.round(file.size / 1024 / 1024)} MB.`);
      return;
    }
    setProfileData((prevData) => ({ ...prevData, resume: file }));
  };

  const handleAddEducation = () => {
    setProfileData((prevData) => ({
      ...prevData,
      education: [...prevData.education, { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
    }));
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...profileData.education];
    updatedEducation.splice(index, 1);
    setProfileData({ ...profileData, education: updatedEducation });
  };

  const handleAddExperience = () => {
    setProfileData((prevData) => ({
      ...prevData,
      experience: [...prevData.experience, { company: '', jobTitle: '', startDate: '', endDate: '', description: '' }],
    }));
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...profileData.experience];
    updatedExperience.splice(index, 1);
    setProfileData({ ...profileData, experience: updatedExperience });
  };
  
  const handleRemoveSkill = (index) => {
    const updatedSkills = [...profileData.skills];
    updatedSkills.splice(index, 1);
    setProfileData({ ...profileData, skills: updatedSkills });
  };  

  const handleCountryCodeChange = (selectedOption) => {
    setProfileData({ ...profileData, countryCode: selectedOption.value });
  };

  const countryCodeOptions = [
    { value: '+1', label: 'United States (+1)' },
    { value: '+91', label: 'India (+91)' },
    { value: '+44', label: 'United Kingdom (+44)' },
    { value: '+61', label: 'Australia (+61)' },
    { value: '+81', label: 'Japan (+81)' },
    { value: '+49', label: 'Germany (+49)' },
    { value: '+33', label: 'France (+33)' },
    { value: '+39', label: 'Italy (+39)' },
    { value: '+34', label: 'Spain (+34)' },
    { value: '+55', label: 'Brazil (+55)' },
    { value: '+7', label: 'Russia (+7)' },
    { value: '+27', label: 'South Africa (+27)' },
    { value: '+52', label: 'Mexico (+52)' },
    { value: '+86', label: 'China (+86)' },
    { value: '+971', label: 'United Arab Emirates (+971)' },
    { value: '+47', label: 'Norway (+47)' },
    { value: '+82', label: 'South Korea (+82)' },
    { value: '+1', label: 'Canada (+1)' },
    { value: '+64', label: 'New Zealand (+64)' },
    { value: '+48', label: 'Poland (+48)' },
    { value: '+46', label: 'Sweden (+46)' },
    { value: '+32', label: 'Belgium (+32)' },
    { value: '+353', label: 'Ireland (+353)' },
    { value: '+56', label: 'Chile (+56)' },
    { value: '+54', label: 'Argentina (+54)' },
    { value: '+65', label: 'Singapore (+65)' },
    { value: '+886', label: 'Taiwan (+886)' },
    { value: '+34', label: 'Spain (+34)' },
    { value: '+58', label: 'Venezuela (+58)' },
    { value: '+961', label: 'Lebanon (+961)' },
    { value: '+63', label: 'Philippines (+63)' },
    { value: '+977', label: 'Nepal (+977)' },
    { value: '+971', label: 'United Arab Emirates (+971)' },
    { value: '+20', label: 'Egypt (+20)' },
    { value: '+44', label: 'United Kingdom (+44)' },
    { value: '+380', label: 'Ukraine (+380)' },
    { value: '+60', label: 'Malaysia (+60)' },
    { value: '+55', label: 'Brazil (+55)' },
    { value: '+503', label: 'El Salvador (+503)' },
    { value: '+227', label: 'Niger (+227)' },
    { value: '+233', label: 'Ghana (+233)' },
    { value: '+246', label: 'Ascension Island (+246)' },
    { value: '+256', label: 'Uganda (+256)' },
    { value: '+229', label: 'Benin (+229)' },
    { value: '+251', label: 'Ethiopia (+251)' },
    { value: '+53', label: 'Cuba (+53)' },
    { value: '+231', label: 'Liberia (+231)' },
    { value: '+240', label: 'Equatorial Guinea (+240)' },
    { value: '+222', label: 'Mauritania (+222)' },
    { value: '+265', label: 'Malawi (+265)' },
    { value: '+218', label: 'Libya (+218)' },
    { value: '+380', label: 'Ukraine (+380)' },
    { value: '+994', label: 'Azerbaijan (+994)' },
    { value: '+964', label: 'Iraq (+964)' },
    { value: '+973', label: 'Bahrain (+973)' }
  ];

  const handleSkillsChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newSkill = e.target.value.trim();
      if (newSkill && !profileData.skills.includes(newSkill)) {
        setProfileData((prevData) => ({
          ...prevData,
          skills: [...prevData.skills, newSkill],
        }));
      }
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken')?.trim();
    const userId = localStorage.getItem('userId');
  
    if (!token || !userId) {
      alert('You must be logged in to create or update your profile.');
      navigate('/login');
      return;
    }
  
    // Ensure socialLinks is an object
    let socialLinksObject = profileData.socialLinks;
    if (typeof socialLinksObject === 'string') {
      try {
        // Parse the string if it's a stringified object
        socialLinksObject = JSON.parse(socialLinksObject);
      } catch (error) {
        console.error('Invalid socialLinks format:', error);
        alert('Invalid socialLinks format. Please check your input.');
        return;
      }
    }
  
    const formData = new FormData();
    formData.append('firstName', profileData.firstName);
    formData.append('middleName', profileData.middleName);
    formData.append('lastName', profileData.lastName);
    formData.append('dateOfBirth', profileData.dateOfBirth);
    formData.append('address', profileData.address);
    formData.append('email', profileData.email);
    formData.append('phone', profileData.phone);
    formData.append('bio', profileData.bio);
    formData.append('skills', profileData.skills);
    formData.append('education', JSON.stringify(profileData.education));
    formData.append('experience', JSON.stringify(profileData.experience));
    formData.append('socialLinks', JSON.stringify(socialLinksObject));
  
    if (profileData.resume) {
      formData.append('resume', profileData.resume);
    }
  
    try {
      const response = await axios({
        method: profileData._id ? 'PUT' : 'POST', // If profile exists, use PUT, else POST
        url: `https://job-board-be-vk4x.onrender.com/api/id/profile${profileData._id ? `/${profileData._id}` : ''}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.data) {
        alert(profileData._id ? 'Profile updated successfully!' : 'Profile created successfully!');
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.error('Error handling profile submission:', error);
      alert('Failed to create or update profile. Please try again.');
    }
  };     

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-create-container">
      <h2>Create or Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={profileData.middleName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={profileData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <div className="phone-container">
            <Select
              options={countryCodeOptions}
              value={{ value: profileData.countryCode, label: profileData.countryCode }}
              onChange={handleCountryCodeChange}
            />
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Skills</label>
          <input
            type="text"
            onKeyDown={handleSkillsChange}
            placeholder="Press Enter to add a skill"
          />
          <div className="skills-list">
            {profileData.skills.map((skill, index) => (
              <div key={index} className="skill">
                <span>{skill}</span>
                <button type="button" onClick={() => handleRemoveSkill(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
            <label>Education</label>
            {profileData.education.map((edu, index) => (
              <div key={index} className="education-entry">
                <input
                  type="text"
                  name={`education.${index}.school`}
                  value={edu.school}
                  onChange={handleChange}
                  placeholder="School"
                  required
                />
                <input
                  type="text"
                  name={`education.${index}.degree`}
                  value={edu.degree}
                  onChange={handleChange}
                  placeholder="Degree"
                  required
                />
                <input
                  type="text"
                  name={`education.${index}.fieldOfStudy`}
                  value={edu.fieldOfStudy}
                  onChange={handleChange}
                  placeholder="Field of Study"
                  required
                />
                <input
                  type="date"
                  name={`education.${index}.startDate`}
                  value={formatDate(edu.startDate)}  // Use formatDate here
                  onChange={handleChange}
                  placeholder="Start Date"
                  required
                />
                <input
                  type="date"
                  name={`education.${index}.endDate`}
                  value={formatDate(edu.endDate)}  // Use formatDate here
                  onChange={handleChange}
                  placeholder="End Date"
                  required
                />
                <button type="button" onClick={() => handleRemoveEducation(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddEducation}>
              Add Education
            </button>
          </div>
        <div className="form-group">
          <label>Experience</label>
          {profileData.experience.map((exp, index) => (
            <div key={index} className="experience-entry">
              <input
                type="text"
                name={`experience.${index}.company`}
                value={exp.company}
                onChange={handleChange}
                placeholder="Company"
                required
              />
              <input
                type="text"
                name={`experience.${index}.jobTitle`}
                value={exp.jobTitle}
                onChange={handleChange}
                placeholder="Job Title"
                required
              />
              <input
                type="date"
                name={`experience.${index}.startDate`}
                value={exp.startDate}
                onChange={handleChange}
                placeholder="Start Date"
                required
              />
              <input
                type="date"
                name={`experience.${index}.endDate`}
                value={exp.endDate}
                onChange={handleChange}
                placeholder="End Date"
                required
              />
              <textarea
                name={`experience.${index}.description`}
                value={exp.description}
                onChange={handleChange}
                placeholder="Job Description"
                required
              ></textarea>
              <button type="button" onClick={() => handleRemoveExperience(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddExperience}>
            Add Experience
          </button>
        </div>
        <div className="form-group">
          <label>Social Links</label>
          <input
            type="url"
            name="socialLinks.linkedin"
            value={profileData.socialLinks.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn"
          />
          <input
            type="url"
            name="socialLinks.github"
            value={profileData.socialLinks.github}
            onChange={handleChange}
            placeholder="GitHub"
          />
          <input
            type="url"
            name="socialLinks.twitter"
            value={profileData.socialLinks.twitter}
            onChange={handleChange}
            placeholder="Twitter"
          />
        </div>
        <div className="form-group">
          <label>Upload Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <button type="submit">Save Profile</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileCreatePage;
