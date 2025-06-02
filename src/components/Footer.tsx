// src/components/Footer.tsx
import React from 'react';
import '../styles/footer-style.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <a href="https://github.com/bbuckwheatt" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/cameron-powell-" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://drive.google.com/file/d/1vkAo0ptWCJjsrb_eoZdmm7-QZS0xIr7_/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>
        <p className="copyright">© 2024 Cameron Powell</p>
      </div>
    </footer>
  );
};

export default Footer;
