import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import HelpCenter from './pages/HelpCenter';
import ContactUs from "./pages/ContactUs";
import SuccessStories from "./pages/SuccessStories";
import Feedback from './pages/Feedback';
import SocialMedia from './pages/SocialMedia';
import Support from './pages/Support';
import TermsAndPrivacy from './pages/TermsOfService';
import EmployerDashboard from "./pages/EmployerDashboard";
import UserDashboard from './pages/UserDashboard'; 
import ProfilePage from "./pages/ProfilePage";
import EditJobPage from "./pages/EditJobPage.jsx";

const App = () => (
  <ThemeProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/job-listings" element={<JobListingPage />} />
          <Route path="/create-profile" element={<ProfileCreatePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path='/careers' element={<Careers />} />
          <Route path="/create-job" element={<CreateJobListing />} />
          <Route path='/help-center' element={<HelpCenter />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/social-media" element={<SocialMedia />} />
          <Route path="/support" element={<Support />} />
          <Route path="/terms-and-privacy" element={<TermsAndPrivacy />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/edit-job/:jobId" element={<EditJobPage />} />
          <Route path="/dashboard/*" element={<ProtectedRoute element={<Dashboard />} />} />
        </Routes>
      </MainLayout>
  </ThemeProvider>
);

export default App;
