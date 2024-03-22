// src/components/Home.tsx
import React from 'react';
import profileImage from './selfie.JPG';

const Home: React.FC = () => {
    return (
      <div className="hero">
        <h1>Welcome to My Portfolio</h1>
        <img src={profileImage} alt="Cameron Powell" className="profile-image" />
        {/* If you imported the image, use profileImage as the src */}
        {/* <img src={profileImage} alt="Your Name" className="profile-image" /> */}
        <p>Here's a little about myself.</p>
      </div>
    );
  };

export default Home;
