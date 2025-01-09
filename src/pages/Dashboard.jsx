import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('role');

    if (!authToken || !userRole) {
      navigate('/login');
      return;
    }

    if (userRole === 'admin') {
      navigate('/admin');
    } else if (userRole === 'employer') {
      navigate('/employer');
    } else if (userRole === 'user') {
      navigate('/user-dashboard');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Checking your role and redirecting...</p>
    </div>
  );
};

export default Dashboard;
