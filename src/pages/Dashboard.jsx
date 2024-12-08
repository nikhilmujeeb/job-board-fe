import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const userRole = localStorage.getItem('role'); // Get the role from localStorage
  const authToken = localStorage.getItem('authToken'); // Get auth token

  console.log("Auth Token:", authToken);
  console.log("User Role:", userRole);

  useEffect(() => {
    if (!authToken || !userRole || !['admin', 'employer', 'user'].includes(userRole)) {
      // No token or invalid role - Show login message and prompt to login
      setMessage('Please log in to access your dashboard.');
      setIsLoading(false); // Stop loading once we decide the behavior
    } else {
      // If token and role are valid, navigate to respective dashboard
      setIsLoading(false); // Stop loading before redirect
      console.log("Redirecting to dashboard...");

      if (userRole === 'admin') {
        navigate('/admin');  // Admin dashboard
      } else if (userRole === 'employer') {
        navigate('/employer');  // Employer dashboard
      } else if (userRole === 'user') {
        navigate('/user-dashboard');  // User dashboard
      }
    }
  }, [authToken, userRole, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading until the authentication check completes
  }

  return (
    <div>
      <h2>{message}</h2>
      {/* Optionally, provide a link or button to navigate to the login page */}
      {!authToken && (
        <button onClick={() => navigate('/login')}>Go to Login</button>
      )}
    </div>
  );
};

export default Dashboard;
