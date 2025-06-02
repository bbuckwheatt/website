import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header-style.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">Cameron Powell</div>
        <nav className="header-nav">
          <Link to="/" className="active">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
      <div className="header-right">
        <button className="theme-toggle">🌙</button>
      </div>
    </header>
  );
};

export default Header;
