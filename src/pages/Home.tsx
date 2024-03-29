// src/components/Home.tsx
// import React from 'react';
import profileImage from './images-home/selfie.JPG';
import Image from './images-home/me.JPG';

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
            in Fintech.
          </p>
          <p> Outside of school and work I play video games and tabletop RPGs, care for my cat Meatball, code for fun on side projects, and love to cook.</p>
          <p>
            I am currently living in Boston, Massachusetts, and I am looking for a full-time opportunity to work as a software engineer.
            Feel free to browse my website to learn about me, what I like to do, and what I have accomplished so far.
          </p>
          <Link to="/about">Learn More About Me</Link>
        </div>
      </div>
      <hr />
      <div className="content">
        <div className="mission">
          <h1>My Mission</h1>
          <p>
            In my life, I strive to be the best version of myself that I can be. I am constantly learning and improving myself, and I am always looking for new opportunities to grow and develop my skills. I am passionate about technology and finance, and I am excited to see where my career takes me in the future. I am dedicated to making a positive impact on the world and helping others achieve their goals. I believe that with hard work, determination, and a positive attitude, anything is possible.
          </p>
        </div>
      </div>
      <hr />
      <div className="content">
        <div className="experience">
          <h1>My Experience</h1>
          <p>
            Over the course of my time at Northeastern, I had the opportunity to earn nearly 2 years of professional work experience through 2 separate co-ops, working at Enel X North America most notably as an Energy Markets Business Analyst intern. 
            These experiences allowed me to gain valuable skills in database management, coding, data analysis, project management, and business strategy. I also had the opportunity to work on a variety of projects individually and through my coursework,
             including developing a stop-motion animation studio in Covey.Town and creating a full-fledged photo editor app in Java. I am excited to continue to learn and grow as a software engineer, and am eager to take my talents somewhere where I can make a real impact.
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
          
          <Link to="/hobbies">Learn What I Do For Fun!</Link>
        </div>
        <div className="home-picture">
          <img src={Image} alt="Cameron Powell" />
        </div>
      </div>
    </div>
  );
};

export default Home;

