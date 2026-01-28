import React from "react";
import "./Footer.css";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">ImageFinder</h2>
          <p className="footer-tagline">
            Discover, explore, and download stunning images from around the
            world.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <h4>Explore</h4>
            <ul>
              <li>Nature</li>
              <li>Animals</li>
              <li>Technology</li>
              <li>Travel</li>
            </ul>
          </div>

          <div>
            <h4>Product</h4>
            <ul>
              <li>Features</li>
              <li>Trending</li>
              <li>Favorites</li>
              <li>Collections</li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Licensing</li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* Bottom Bar */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} ImageFinder. Powered by Pixabay & Unsplash.
      </div>
    </footer>
  );
};

export default Footer;
