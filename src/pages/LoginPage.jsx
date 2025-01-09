import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { login, signup } from "../services/api";
import "../styles/login.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    try {
      let response;
      if (isLogin) {
        response = await login({ email, password });
      } else {
        response = await signup({ name, email, password, role });
        alert("Signup successful! Please login.");
        setIsLogin(true);
        return;
      }
  
      const token = response?.token;
      const userRole = response?.role;
      const userId = response?.user?._id;
  
      if (!token || !userRole || !userId) {
        throw new Error("Token, role, or user ID missing from response.");
      }
  
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("userId", userId);  
  
      alert(isLogin ? "Login successful!" : "Signup successful!");
  
      navigate("/");
  
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
      console.error("Error during login:", err);
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <div className="auth-page">
      <h1>{isLogin ? "Login" : "Signup"}</h1>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="input-container">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Select Role --
                </option>
                <option value="user">User</option>
                <option value="employer">Employer</option>
              </select>
            </div>
          </>
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
          {isLoading ? "Loading..." : isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <button onClick={() => setIsLogin(!isLogin)} className="switch-form-btn">
        {isLogin ? "Switch to Signup" : "Switch to Login"}
      </button>
    </div>
  );
};

export default LoginPage;
