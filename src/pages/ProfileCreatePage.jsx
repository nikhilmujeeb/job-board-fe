import React, { useState } from 'react';
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5 MB. Please upload a smaller file.');
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
  
      if (e.target.value.trim() !== '') {
        const newSkills = e.target.value.split(',').map((skill) => skill.trim());
        
        setProfileData((prevData) => ({
          ...prevData,
          skills: [...prevData.skills, ...newSkills], 
        }));
        e.target.value = '';
      }
    }
  };  

  const validateFields = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'dateOfBirth',
      'address',
      'email',
      'phone',
      'bio',
      'skills',
      'education',
      'experience',
      'socialLinks',
    ];

    for (let field of requiredFields) {
      if (!profileData[field] || (Array.isArray(profileData[field]) && profileData[field].length === 0)) {
        return `Field "${field}" is required.`;
      }
    }
    return null;
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateFields();
    if (error) {
      alert(error);
      return;
    }

    const token = localStorage.getItem('authToken')?.trim(); 
    const payload = {
      ...profileData, 
    };

    try {
      const response = await axios.post(
        'https://job-board-be-vk4x.onrender.com/api/id/profile', 
        payload,
        {
          headers: {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      console.log('Profile saved successfully:', response.data);
      navigate('/'); 
    } catch (error) {
      console.error('Error saving profile:', error.response || error.message);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="profile-create-container">
      <h1>Create or Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={profileData.middleName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={profileData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <div className="phone-input">
            <Select
              options={countryCodeOptions}
              value={countryCodeOptions.find(
                (option) => option.value === profileData.countryCode
              )}
              onChange={handleCountryCodeChange}
            />
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label>Bio</label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Skills</label>
          <input
            type="text"
            onKeyPress={handleSkillsChange} 
            placeholder="Press Enter to add skill"
           />
          <div className="skills-list">
            {profileData.skills.length > 0 && (
              <ul>
                {profileData.skills.map((skill, index) => (
                  <li key={index}>
                    {skill}
                    <button type="button" onClick={() => handleRemoveSkill(skill)}>Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <label>Education</label>
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
              <input
                type="date"
                name={`education.${index}.startDate`}
                value={edu.startDate}
                onChange={handleChange}
              />
              <input
                type="date"
                name={`education.${index}.endDate`}
                value={edu.endDate}
                onChange={handleChange}
              />
              <button type="button" onClick={() => handleRemoveEducation(index)}>
                Remove Education
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddEducation}>
            Add Education
          </button>
        </div>
        <div>
          <label>Experience</label>
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
                type="date"
                name={`experience.${index}.startDate`}
                value={exp.startDate}
                onChange={handleChange}
              />
              <input
                type="date"
                name={`experience.${index}.endDate`}
                value={exp.endDate}
                onChange={handleChange}
              />
              <textarea
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
        <div>
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
        <div>
          <label>Resume</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileCreatePage;
