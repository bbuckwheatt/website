import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaFilePdf } from 'react-icons/fa';
// If using React Icons or similar, import necessary icons
// Example: import { FaLinkedin, FaInstagram, FaFileAlt } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <nav>
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/projects" className="nav-link">Projects</Link></li>
          <li><Link to="/hobbies" className="nav-link">Hobbies</Link></li>
          <li><Link to="/gallery" className="nav-link">Gallery</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          {/* Other navigation links */}
        </ul>
      </nav>
      <div className="social-links">
        {/* Update href with your actual URLs */}
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="/path-to-your-resume.pdf" target="_blank" rel="noopener noreferrer"><FaFilePdf /></a>
      </div>
    </header>
  );
};

export default Header;
