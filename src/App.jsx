import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import ProfileCreatePage from './pages/ProfileCreatePage';
import JobListingPage from './pages/JobListingPage';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import CreateJobListing from './pages/CreateJob';
import AdminDashboard from './pages/AdminDashboard';

const App = () => (
  <ThemeProvider>
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/job-listings" element={<JobListingPage />} />
          <Route path="/create-profile" element={<ProfileCreatePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path='/careers' element={<Careers />} />
          <Route path="/create-job" element={<CreateJobListing />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainLayout>
    </Router>
  </ThemeProvider>
);

export default App;
