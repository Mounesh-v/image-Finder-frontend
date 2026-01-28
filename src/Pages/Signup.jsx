import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaImages, FaUserPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Auth.css';

const API = import.meta.env.VITE_API_URL;

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API}/api/users/signup`, form);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data?.name,
          email: res.data?.email,
          token: res.data?.token,
        })
      );

      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed!";
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
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join thousands of creators and find amazing images</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                name="name"
                type="text"
                className="form-input"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
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
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                required
                minLength="6"
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
                Creating Account...
              </>
            ) : (
              <>
                <FaUserPlus className="btn-icon" />
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in here
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

export default Signup;
