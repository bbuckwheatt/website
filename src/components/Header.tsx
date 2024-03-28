import React from 'react';
import { Link } from 'react-router-dom';

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
    </header>
  );
};

export default Header;