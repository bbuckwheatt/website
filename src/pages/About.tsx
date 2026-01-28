import React from 'react';
import '../styles/about.css';

const About: React.FC = () => {
  return (
    <section className="about-page">
      <header className="about-hero">
        <h1>About Cameron</h1>
        <p>
          Lead Solutions Engineer based in Boston. I build technical partnerships that translate
          ambitious goals into reliable products, integrations, and deployments.
        </p>
      </header>

      <div className="about-grid">
        <div className="about-card">
          <h2>Summary</h2>
          <p>
            I lead the Solutions Engineering function at CustomGPT.ai, where I’ve delivered
            enterprise-grade implementations, led security reviews, and built internal tooling
            that scales sales and customer success. My work blends systems thinking, technical
            depth, and high-touch communication.
          </p>
        </div>

        <div className="about-card">
          <h2>Technical Focus</h2>
          <ul>
            <li>AI automation, RAG workflows, and API integrations</li>
            <li>Product implementation and solution architecture</li>
            <li>Data tooling: dashboards, telemetry, and insights</li>
            <li>Frontend engineering with React + TypeScript</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Education</h2>
          <p>
            Northeastern University — B.S. in Computer Science &amp; Business Administration
            (FinTech concentration). Graduated May 2024, Cum Laude, 3.7 GPA.
          </p>
        </div>

        <div className="about-card">
          <h2>Interests</h2>
          <p>
            Technology, strategy and role-playing games, science fiction, finance, fitness,
            hiking, cooking, coffee, and pickleball.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
