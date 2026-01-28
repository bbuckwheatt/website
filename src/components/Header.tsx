import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/header-style.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">Cameron Powell</div>
        <nav className="header-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
      <div className="header-right">
        <button className="theme-toggle">🌙</button>
      </div>
    </header>
  );
};

export default Header;
