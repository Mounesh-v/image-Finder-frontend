import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageContext from "../Context/ImageContext";
import "./Navbar.css";
import {
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaImages,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const { setQuery, FetchedCategory } = useContext(ImageContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setQuery(searchTerm.trim());
      setSearchTerm("");
    }
  };

  const handleCategoryClick = (category) => {
    FetchedCategory(category);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const categories = [
    { name: "Nature", value: "nature", icon: "🌿" },
    { name: "Animals", value: "animals", icon: "🐾" },
    { name: "Technology", value: "technology", icon: "💻" },
    { name: "Food", value: "food", icon: "🍽️" },
    { name: "Travel", value: "travel", icon: "✈️" },
    { name: "Sports", value: "sports", icon: "⚽" },
    { name: "Art", value: "art", icon: "🎨" },
    { name: "Music", value: "music", icon: "🎵" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
  if (isMobileMenuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [isMobileMenuOpen]);


  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link
            to="/"
            className="navbar-logo"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaImages className="logo-icon" />
            <span className="logo-text">ImageFinder</span>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className="hamburger-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Search Bar - Desktop */}
          <div className="search-container">
            <form
              onSubmit={handleSearch}
              className={`search-form ${isSearchFocused ? "focused" : ""}`}
            >
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="search-input"
                />
              </div>
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>
          </div>

          {/* User Menu - Desktop */}
          <div className="navbar-actions">
            {user ? (
              <div className="user-menu">
                <div
                  className="user-info"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <FaUser className="user-icon" />
                  <span className="user-name">{user.name}</span>
                </div>
                <div
                  className={`user-dropdown ${isUserMenuOpen ? "open" : ""}`}
                >
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <FaUser className="dropdown-icon" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsUserMenuOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                    className="dropdown-item logout-btn"
                  >
                    <FaSignOutAlt className="dropdown-icon" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link
                  to="/login"
                  className="auth-btn login-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="auth-btn signup-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Categories Bar - Desktop */}
        <div className="categories-bar">
          <div className="categories-container">
            <div className="categories-list">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    handleCategoryClick(category.value);
                    setIsMobileMenuOpen(false);
                  }}
                  className="category-btn"
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>⨯</div>
        <div
          className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-menu-content">
            {/* Mobile Search */}
            <div className="mobile-menu-search">
              <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-wrapper">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search for images..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                <button type="submit" className="search-btn">
                  Search
                </button>
              </form>
            </div>

            {/* Mobile User Actions */}
            <div className="mobile-menu-actions">
              {user ? (
                <>
                  <div
                    className="user-info"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  >
                    <FaUser className="user-icon" />
                    <span className="user-name">{user.name}</span>
                  </div>

                  {isUserMenuOpen && (
                    <div className="user-dropdown">
                      <Link
                        to="/profile"
                        className="dropdown-item"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaUser className="dropdown-icon" />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item logout-btn"
                      >
                        <FaSignOutAlt className="dropdown-icon" />
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="auth-btn login-btn">
                    Login
                  </Link>
                  <Link to="/signup" className="auth-btn signup-btn">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Categories */}
            <div className="mobile-menu-categories">
              <div className="categories-list">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    className="category-btn"
                    onClick={() => {
                      handleCategoryClick(category.value);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
