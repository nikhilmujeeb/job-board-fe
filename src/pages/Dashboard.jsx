import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import JobSeekerDashboard from './JobSeekerDashboard';
import EmployerDashboard from './EmployerDashboard';

const Dashboard = () => {
  const userRole = localStorage.getItem('role'); // Assuming role is saved in localStorage
  const authToken = localStorage.getItem('authToken'); // Assuming the auth token is saved here

  // If the user is not logged in (no authToken), redirect to login page
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  // Fallback for invalid or missing user role
  if (!userRole) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard">
      <Routes>
        {userRole === 'admin' && (
          <Route path="/admin" element={<AdminDashboard />} />
        )}
        {userRole === 'jobSeeker' && (
          <Route path="/job-seeker" element={<JobSeekerDashboard />} />
        )}
        {userRole === 'employer' && (
          <Route path="/employer" element={<EmployerDashboard />} />
        )}

        {/* Redirect for invalid routes or missing role */}
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
