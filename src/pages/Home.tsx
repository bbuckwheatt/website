// src/components/Home.tsx
// import React from 'react';
import profileImage from './images-home/selfie.JPG';

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
      <div className="content">
        <div className="hero">
          <h1>Cameron Powell</h1>
          <h2>Software Engineer | Financial Technologist</h2>
        </div>
      </div>
      <div className="content">
        <div className="profile-picture">
          <img src={profileImage} alt="Cameron Powell" />
        </div>
        <div className="description">
          <h1>My Story</h1>
          <p>
          My name is Cameron Powell, and I recently graduated from Northeastern University
           where I studied Computer Science and Business Administration with a concentration
            in Fintech. I graduated from St. John's Preparatory School in 2019, where I 
            received my high school education. From high school, I went on to study abroad
             in Rome at John Cabot University for my first semester of college through 
             Northeastern's N.U.in program. In December of 2023, I completed all of my coursework
              for my undergraduate studies at Northeastern and will attend my official graduation
               in May 2024. For my two co-ops at Northeastern, I worked at Enel X North America, 
               first as a Demand Response Support Analyst intern for six months in 2021, and then 
               as an Energy Markets Business Analyst intern for eight months in 2022. I am currently
                looking for a full-time work opportunity, and I am excited to see what the future has in store for me!
          </p>
          <Link to="/about">Learn More About Me</Link>
        </div>
      </div>
      <hr />
      <div className="content">
        <div className="mission">
          <h1>My Mission</h1>
          <p>
            code
          </p>
        </div>
      </div>
      <hr />
      <div className="content">
        <div className="experience">
          <h1>My Experience</h1>
          <p>
            Here you can detail your experience, achievements, and anything relevant to your professional or academic background.
          </p>
          <Link to="/projects">View My Projects</Link>
        </div>
      </div>
      <hr />
      <div className="content">
        <div className="hobbies">
          <h1>My Hobbies</h1>
          <p>
            code
          </p>
          <Link to="/gallery">View My Gallery</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

