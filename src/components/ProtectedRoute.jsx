import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const role = localStorage.getItem('role');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'admin') {
    return <Navigate to="/admin" replace />;
  } else if (role === 'employer') {
    return <Navigate to="/employer" replace />;
  } else if (role === 'user') {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
