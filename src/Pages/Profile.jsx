import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaSignOutAlt,
  FaImages,
  FaHeart,
  FaCalendarAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [likedImages, setLikedImages] = useState([]);
  const [loadingLikes, setLoadingLikes] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    fetchLikedImages(parsedUser.token);
  }, [navigate]);

  /* ================= FETCH LIKED IMAGES ================= */
  const fetchLikedImages = async (token) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/image/likes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLikedImages(res.data);
    } catch (error) {
      console.error("Failed to fetch liked images", error);
      toast.error("Failed to load favorite images");
    } finally {
      setLoadingLikes(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    toast.success("Signed out successfully");
    navigate("/login");
  };

  const handleEditProfile = () => {
    toast.info("Feature coming soon");
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p className="loading-text">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* ================= PROFILE HEADER ================= */}
      <div className="profile-header">
        <div className="profile-avatar-section">
          <div className="avatar-container">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff&size=150`}
              alt="avatar"
              className="profile-avatar"
            />
            <div className="avatar-badge">
              <FaImages />
            </div>
          </div>
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      {/* ================= PROFILE CONTENT ================= */}
      <div className="profile-content">
        {/* Account Information */}
        <div className="profile-details">
          <h2 className="section-title">Account Information</h2>

          <div className="details-grid">
            <div className="detail-item">
              <div className="detail-icon">
                <FaUser />
              </div>
              <div className="detail-content">
                <label className="detail-label">Full Name</label>
                <p className="detail-value">{user.name}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <FaEnvelope />
              </div>
              <div className="detail-content">
                <label className="detail-label">Email Address</label>
                <p className="detail-value">{user.email}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <FaCalendarAlt />
              </div>
              <div className="detail-content">
                <label className="detail-label">Member Since</label>
                <p className="detail-value">
                  {new Date(
                    user.createdAt || Date.now()
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="account-actions">
          <h2 className="section-title">Account Actions</h2>

          <div className="action-buttons">
            <button
              className="action-btn secondary"
              onClick={handleEditProfile}
            >
              <FaUser className="btn-icon" />
              Edit Profile
            </button>

            <button className="action-btn danger" onClick={handleSignOut}>
              <FaSignOutAlt className="btn-icon" />
              Sign Out
            </button>
          </div>
        </div>

        {/* ================= FAVORITE IMAGES ================= */}
        <div className="saved-images-section">
          <h2 className="section-title">My Favorite Images</h2>

          {loadingLikes ? (
            <p>Loading favorites...</p>
          ) : likedImages.length === 0 ? (
            <div className="no-saved-images">
              <FaHeart className="no-saved-icon" />
              <h3>No favorite images yet</h3>
              <p>Like images to see them here.</p>
            </div>
          ) : (
            <div className="images-grid">
              {likedImages.map((img) => (
                <div key={img._id} className="image-card">
                  <img
                    src={img.imageUrl}
                    alt={img.tags}
                    className="image"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
