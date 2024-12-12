import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const userRole = localStorage.getItem('role'); 
  const authToken = localStorage.getItem('authToken');

  console.log("Auth Token:", authToken);
  console.log("User Role:", userRole);

  useEffect(() => {
    if (!authToken || !userRole || !['admin', 'employer', 'user'].includes(userRole)) {
      setMessage('Please log in to access your dashboard.');
      setIsLoading(false); 
    } else {
      setIsLoading(false); 
      console.log("Redirecting to dashboard...");

      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'employer') {
        navigate('/employer');  
      } else if (userRole === 'user') {
        navigate('/user-dashboard'); 
      }
    }
  }, [authToken, userRole, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h2>{message}</h2>
      {!authToken && (
        <button onClick={() => navigate('/login')}>Go to Login</button>
      )}
    </div>
  );
};

export default Dashboard;
