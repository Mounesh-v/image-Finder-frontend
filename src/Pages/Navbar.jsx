import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageContext from "../Context/ImageContext";
import { useContext } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));

    const handleScroll = () => {
      const navbar = document.querySelector(".navbar-transparent");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const { FetchedCategory, FetchImages, setQuery } = useContext(ImageContext);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = () => {
    setQuery(searchText); // update query state
    FetchImages(searchText); // fetch images based on input
  };

  const handleCategoryClick = (value) => {
    setSelectedCategory(value);
    FetchedCategory(value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-transparent fixed-top">
      <div className="container-fluid">
        {/* LEFT — Brand */}
        <Link className="navbar-brand fw-bold " style={{ color: "white" }} to="/">
          Image Finder
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          {/* RIGHT — Search + Auth */}
          <div className="d-flex align-items-center ms-auto gap-3">
            {/* Search Bar */}
            <div
              className="input-group"
              style={{
                maxWidth: "320px",
                backgroundColor: "rgb(252, 251, 251)",
                borderRadius: "8px",
              }}
            >
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search images..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button className="btn btn-primary px-3" onClick={handleSearch}>
                🔍
              </button>
            </div>

            {/* Auth / User */}
            {!user ? (
              <>
                <Link className="btn btn-outline-light" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary" to="/signup">
                  Signup
                </Link>
              </>
            ) : (
              <div className="dropdown">
                <button
                  className="btn p-0 border-0 bg-transparent"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=0d6efd&color=fff`}
                    className="rounded-circle"
                    alt="avatar"
                    style={{ width: "40px", height: "40px" }}
                  />
                </button>

                <ul
                  className={`dropdown-menu dropdown-menu-end ${
                    profileOpen ? "show" : ""
                  }`}
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleSignOut}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
