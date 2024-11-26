import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role'); // Get the role from localStorage
  const authToken = localStorage.getItem('authToken'); // Get auth token

  useEffect(() => {
    if (!authToken) {
      // Redirect to login if there's no token
      navigate("/login");
    } else if (!userRole || !['admin', 'employer', 'user'].includes(userRole)) {
      // Redirect to login if the role is missing or invalid
      navigate("/login");
    } else {
      // Redirect to respective dashboard based on role
      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'employer') {
        navigate('/employer');
      } else if (userRole === 'user') {
        navigate('/user'); // Make sure '/user' is the correct route for JobSeekerDashboard
      }
    }
  }, [authToken, userRole, navigate]);

  return null; // No need to render anything here
};

export default Dashboard;
