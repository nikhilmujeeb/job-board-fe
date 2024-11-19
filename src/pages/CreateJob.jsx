import React, { useState } from "react";
import axios from "axios";
import "../styles/createjob.css";

const CreateJobListing = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salaryRange: "",
    location: "",
    category: "",
    jobType: "",
    experience: "",
    company: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://job-board-be-vk4x.onrender.com/api/job/request",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setSuccessMessage("Job listing created successfully!");
      setFormData({
        title: "",
        description: "",
        salaryRange: "",
        location: "",
        category: "",
        jobType: "",
        experience: "",
        company: "",
        contact: "",
      });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while creating the job listing."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-listing-page">
      <div className="job-listing-header">
        <h1>Create a Job Listing</h1>
        <p>Fill out the form below to create a new job listing.</p>
      </div>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form className="job-listing-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter the job title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            placeholder="Describe the job role and responsibilities"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="salaryRange">Salary Range</label>
          <input
            type="text"
            id="salaryRange"
            name="salaryRange"
            placeholder="e.g., $50,000 - $70,000"
            value={formData.salaryRange}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Job Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter the job location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Job Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Software">Software</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
            <option value="Sales">Sales</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
            <option value="Engineering">Engineering</option>
            <option value="Creative Arts">Creative Arts</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="jobType">Job Type</label>
          <select
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
          >
            <option value="">Select job type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience Level</label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          >
            <option value="">Select experience level</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="company">Company Name</label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Enter your company name"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Email</label>
          <input
            type="email"
            id="contact"
            name="contact"
            placeholder="Enter a contact email"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
};

export default CreateJobListing;
