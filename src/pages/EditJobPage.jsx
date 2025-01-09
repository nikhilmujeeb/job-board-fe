import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/createjob.css";

const EditJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    salaryRange: "",
    location: "",
    category: "",
    jobType: "",
    experience: "",
    company: "",
    contact: "",
    requirements: "",
  });
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Please log in.");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `https://job-board-be-vk4x.onrender.com/api/job/${jobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        setLoading(false);
        setErrorMessage("Failed to load job details.");
      }
    };

    fetchJob();
  }, [jobId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({
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
      const token = localStorage.getItem("authToken");
      await axios.put(
        `https://job-board-be-vk4x.onrender.com/api/job/${jobId}`,
        job,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Job listing updated successfully!");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while updating the job listing."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading job...</p>;

  return (
    <div className="job-listing-page">
      <div className="job-listing-header">
        <h1>Edit Job Listing</h1>
        <p>Update the job listing details below.</p>
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
            value={job.title}
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
            value={job.description}
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
            value={job.salaryRange}
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
            value={job.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Job Category</label>
          <select
            id="category"
            name="category"
            value={job.category}
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
            value={job.jobType}
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
            value={job.experience}
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
            value={job.company}
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
            value={job.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="requirements">Job Requirements</label>
          <textarea
            id="requirements"
            name="requirements"
            rows="5"
            placeholder="List the job requirements"
            value={job.requirements}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Listing"}
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
