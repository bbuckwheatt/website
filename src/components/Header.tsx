import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/header-style.css';

type HeaderProps = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
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
        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 3a1 1 0 0 1 1 1v1.25a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm7.25 8a1 1 0 0 1 1 1 1 1 0 0 1-1 1H18a1 1 0 1 1 0-2h1.25ZM12 17.75a1 1 0 0 1 1 1V20a1 1 0 1 1-2 0v-1.25a1 1 0 0 1 1-1Zm-6.75-4.75a1 1 0 1 1 0-2H6.5a1 1 0 1 1 0 2H5.25Zm11.06-6.81a1 1 0 0 1 1.41 0l.88.88a1 1 0 1 1-1.41 1.41l-.88-.88a1 1 0 0 1 0-1.41ZM6.62 16.5a1 1 0 0 1 1.41 0l.88.88a1 1 0 0 1-1.41 1.41l-.88-.88a1 1 0 0 1 0-1.41ZM7.5 5.62a1 1 0 0 1 0 1.41l-.88.88A1 1 0 1 1 5.2 6.5l.88-.88a1 1 0 0 1 1.41 0Zm10.88 10.88a1 1 0 0 1 0 1.41l-.88.88a1 1 0 1 1-1.41-1.41l.88-.88a1 1 0 0 1 1.41 0ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M14.5 3.5a1 1 0 0 1 1 1c0 6.08-4.92 11-11 11a1 1 0 0 1-1-1 9.5 9.5 0 0 0 11-11 1 1 0 0 1 1-1Zm4.5 10a1 1 0 0 1 1 1A8.5 8.5 0 1 1 10 4a1 1 0 0 1 0 2 6.5 6.5 0 1 0 7 7.5 1 1 0 0 1 1-1Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
