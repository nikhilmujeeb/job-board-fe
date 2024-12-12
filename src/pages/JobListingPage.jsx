import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/joblist.css';

const JobListingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); 
  const [isApplying, setIsApplying] = useState(false); 

  useEffect(() => {
    axios
      .get('https://job-board-be-vk4x.onrender.com/api/job')
      .then((response) => {
        setJobs(response.data);
        setFilteredJobs(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError('Failed to load jobs');
      });
  }, []);

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    filterJobs(newQuery, locationFilter, typeFilter, categoryFilter);
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setLocationFilter(newLocation);
    filterJobs(query, newLocation, typeFilter, categoryFilter);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setTypeFilter(newType);
    filterJobs(query, locationFilter, newType, categoryFilter);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategoryFilter(newCategory);
    filterJobs(query, locationFilter, typeFilter, newCategory);
  };

  const handleApplyClick = async (job) => {
    if (isApplying) return; 
    setIsApplying(true);

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please log in to apply for a job');
      setIsApplying(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://job-board-be-vk4x.onrender.com/api/job/apply/${job._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message || 'Application submitted.');
    } catch (error) {
      console.error('Error applying for job:', error);
      alert(error.response?.data?.message || 'Failed to apply for the job.');
    } finally {
      setIsApplying(false);
    }
  };

  const handleViewDetailsClick = (job) => {
    setSelectedJob(job);
  };

  const handleClosePopup = (e) => {
    if (e.target.className === 'popup') {
      setSelectedJob(null); 
    }
  };

  const filterJobs = (query, location, type, category) => {
    const filtered = jobs.filter(
      (job) =>
        (!query || job.title?.toLowerCase().includes(query.toLowerCase())) &&
        (!location || job.location?.toLowerCase().includes(location.toLowerCase())) &&
        (!type || job.jobType?.toLowerCase() === type.toLowerCase()) &&
        (!category || job.category?.toLowerCase() === category.toLowerCase()) 
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
        <input
          type="text"
          value={locationFilter}
          onChange={handleLocationChange}
          placeholder="Search by location"
        />
        <select onChange={handleTypeChange} value={typeFilter}>
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
        <select onChange={handleCategoryChange} value={categoryFilter}>
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

      <div className="job-listings">
        {filteredJobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary Range:</strong> {job.salaryRange}</p>
              <p><strong>Job Type:</strong> {job.jobType}</p>
              <p><strong>Category:</strong> {job.category}</p>
              <button onClick={() => handleApplyClick(job)} disabled={isApplying}>
                {isApplying ? 'Applying...' : 'Apply'}
              </button>
              <button onClick={() => handleViewDetailsClick(job)}>View Details</button>
            </div>
          ))
        )}
      </div>

      {selectedJob && (
        <div className="popup" onClick={handleClosePopup}>
          <div className="popup-content">
            <button className="close-btn" onClick={() => setSelectedJob(null)}>
              X
            </button>
            <h3>{selectedJob.title}</h3>
            <p><strong>Company:</strong> {selectedJob.company}</p>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Salary Range:</strong> {selectedJob.salaryRange}</p>
            <p><strong>Job Type:</strong> {selectedJob.jobType}</p>
            <p><strong>Category:</strong> {selectedJob.category}</p> 
            <p><strong>Description:</strong> {selectedJob.description}</p>
            <p><strong>Requirements:</strong> {selectedJob.requirements}</p>
            <p><strong>Contact Email:</strong> {selectedJob.contact}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListingPage;
