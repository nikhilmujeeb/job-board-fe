import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/joblist.css';

const JobListingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); // Store selected job for popup

  useEffect(() => {
    axios.get('https://job-board-be-vk4x.onrender.com/api/job')
      .then(response => {
        setJobs(response.data);
        setFilteredJobs(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setError('Failed to load jobs');
      });
  }, []);

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    filterJobs(newQuery, locationFilter, typeFilter);
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setLocationFilter(newLocation);
    filterJobs(query, newLocation, typeFilter);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setTypeFilter(newType);
    filterJobs(query, locationFilter, newType);
  };

  const handleApplyClick = (job) => {
    alert(`Applying for ${job.title}`);
  };

  const handleViewDetailsClick = (job) => {
    setSelectedJob(job); // Show the details popup
  };

  const handleClosePopup = () => {
    setSelectedJob(null); // Close the popup
  };

  const filterJobs = (query, location, type) => {
    const filtered = jobs.filter(job =>
      (job.title && job.title.toLowerCase().includes(query.toLowerCase())) ||
      (job.company && job.company.toLowerCase().includes(query.toLowerCase())) ||
      (job.location && job.location.toLowerCase().includes(location.toLowerCase())) ||
      (job.jobType && job.jobType.toLowerCase().includes(type.toLowerCase()))
    );
    setFilteredJobs(filtered);
  };

  if (isLoading) return <div>Loading jobs...</div>;

  return (
    <div>
      <h2>Search for Jobs</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="filters">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search for jobs"
        />
        <select onChange={handleLocationChange} value={locationFilter}>
          <option value="">All Locations</option>
          <option value="New York">New York</option>
          <option value="Remote">Remote</option>
          {/* Add more options based on your job locations */}
        </select>
        <select onChange={handleTypeChange} value={typeFilter}>
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      <div className="job-listings">
        {filteredJobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary Range:</strong> {job.salaryRange}</p> {/* Fixed to match backend field */}
              <p><strong>Job Type:</strong> {job.jobType}</p>
              <button onClick={() => handleApplyClick(job)}>Apply</button>
              <button onClick={() => handleViewDetailsClick(job)}>View Details</button>
            </div>
          ))
        )}
      </div>

      {selectedJob && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={handleClosePopup}>X</button>
            <h3>{selectedJob.title}</h3>
            <p><strong>Company:</strong> {selectedJob.company}</p>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Salary Range:</strong> {selectedJob.salaryRange}</p>
            <p><strong>Job Type:</strong> {selectedJob.jobType}</p>
            <p><strong>Description:</strong> {selectedJob.description}</p>
            <p><strong>Requirements:</strong> {selectedJob.requirements}</p>
            <p><strong>Contact Email:</strong> {selectedJob.contact}</p> {/* Added contact email */}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListingPage;
