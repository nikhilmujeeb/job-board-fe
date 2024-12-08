import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import
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
  const location = useLocation();

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

      // Check if the response contains the token
      const token = response?.token;
      if (!token) {
        throw new Error("Token missing from response.");
      }

      // Decode and validate token
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);  // Log the token to check its structure
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", decoded.role);
      localStorage.setItem("userId", decoded.userId);  // Ensure you're storing the userId      

      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("Session expired. Please login again.");
      }

      // Save token and role to localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", decoded.role);

      console.log("Token stored in localStorage:", localStorage.getItem('authToken'));  // Confirm token is saved

      alert("Login successful!");

      // Redirect based on role or fallback to home
      const redirectPath = location.state?.from || {
        admin: "/admin",
        employer: "/employer",
        user: "/user-dashboard",
      }[decoded.role] || "/";

      console.log("Redirecting to:", redirectPath); // Log the redirect path

      navigate(redirectPath, { replace: true });
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
