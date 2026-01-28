import React from 'react';
import '../styles/contact.css';

const Contact: React.FC = () => {
  return (
    <section className="contact">
      <div className="contact-card">
        <h1>Let’s connect</h1>
        <p>
          I’m always open to discussing new opportunities, interesting problems, or collaborations.
        </p>
        <div className="contact-items">
          <a className="contact-link" href="mailto:powell.c@northeastern.edu">
            powell.c@northeastern.edu
          </a>
          <div className="contact-links">
            <a href="https://github.com/bbuckwheatt" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/cameron-powell-/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://drive.google.com/file/d/1vkAo0ptWCJjsrb_eoZdmm7-QZS0xIr7_/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
