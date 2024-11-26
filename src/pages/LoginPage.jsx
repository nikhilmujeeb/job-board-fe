import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login, signup } from "../services/api";
import { jwtDecode } from "jwt-decode"; // Correct import
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
        return; // Avoid continuing after successful signup
      }

      const token = response.token;

      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded);

      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("Session expired. Please login again.");
      }

      // Save the token and role in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", decoded.role);
      console.log("Token stored:", localStorage.getItem("authToken"));
      console.log("Role stored:", localStorage.getItem("role"));

      alert("Login successful!");

      // Redirect to the dashboard based on the role
      const redirectPath = location.state?.from || `/${decoded.role}`;
      console.log("Redirecting to:", redirectPath);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
      console.error("Error during submission:", err);  // Log the error for debugging
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
                <option>--Select Role--</option>
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
