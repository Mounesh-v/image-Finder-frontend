import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaImages } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Auth.css';

const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API}/api/users/login`, form);

      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          token: res.data.token,
        })
      );

      toast.success(`Welcome back, ${res.data.name}!`);
      navigate("/");

      if (res.data.token) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid Credentials";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-bg-shape shape-1"></div>
        <div className="auth-bg-shape shape-2"></div>
        <div className="auth-bg-shape shape-3"></div>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <FaImages className="logo-icon" />
            <span className="logo-text">ImageFinder</span>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                name="email"
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-btn primary-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Create one here
            </Link>
          </p>
        </div>

        <div className="auth-decoration">
          <div className="decoration-item"></div>
          <div className="decoration-item"></div>
          <div className="decoration-item"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
