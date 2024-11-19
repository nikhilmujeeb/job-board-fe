import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, signup } from '../services/api'; // Assuming you have these API services
import { jwtDecode } from 'jwt-decode';  // Correct import
import '../styles/login.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let response;
      if (isLogin) {
        response = await login({ email, password });
      } else {
        response = await signup({ name, email, password });
        alert('Signup successful! Please login.');
        setIsLogin(true); // Switch to login form after successful signup
        return;
      }

      const token = response.token;

      // Decode token and check expiration
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error('Session expired. Please login again.');
      }

      // Store token and role in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('role', decoded.role); // Assuming role is in the token

      alert(isLogin ? 'Login successful!' : 'Signup successful!');

      // Redirect to the dashboard or previous page
      const redirectPath = location.state?.from || `/${decoded.role}`; // Redirect to role-based dashboard
      navigate(redirectPath);
    } catch (err) {
      setError(isLogin ? 'Login failed. Please check your credentials.' : 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h1>{isLogin ? 'Login' : 'Signup'}</h1>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="input-container">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Signup'}
        </button>
      </form>

      <button onClick={() => setIsLogin(!isLogin)} className="switch-form-btn">
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default LoginPage;
