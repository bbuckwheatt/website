// src/components/Home.tsx
// import React from 'react';
 import profileImage from './selfie.JPG';

// const Home: React.FC = () => {
//     return (
//       <div className="hero">
//         <h1>Cameron Powell</h1>
//         <img src={profileImage} alt="Cameron Powell" className="profile-image" />
//         {/* If you imported the image, use profileImage as the src */}
//         {/* <img src={profileImage} alt="Your Name" className="profile-image" /> */}
//         <p>Here's a little about myself.</p>
//       </div>
//     );
//   };

// export default Home;
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
// import './home.css'; // Import a CSS file for styling

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Cameron Powell</h1>
        <p>Software Engineer | Financial Technologist</p>
      </div>
      <div className="content">
        <div className="profile-picture">
               <img src={profileImage} alt="Cameron Powell" className="profile-image" />
        </div>
        <div className="description">
          <p>
            My name is Cameron Powell, and I am a recent graduate from Northeastern University, where I studied Computer Science and Business Administration, with a concentration in Financial Technologies.
          </p>
          <Link to="/about">Learn More About Me</Link>
        </div>
      </div>
      <hr />
      <div className="experience">
        <h2>Experience</h2>
        <p>
          Here you can detail your experience, achievements, and anything relevant to your professional or academic background.
        </p>
        <Link to="/projects">View My Projects</Link>
      </div>
    </div>
  );
};

export default Home;

