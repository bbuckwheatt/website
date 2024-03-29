// src/components/About.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => 
// {
//   return (
//     <section className="about">

//     </section>
//   );
// };

{
  return (
    <div className="home-container">
      <div className="content">
      </div>
      <div className="content">
        <div className="profile-picture">
          {/* <img src={profileImage} alt="Cameron Powell" /> */}
        </div>
        <div className="about">
        <h2>About Me</h2>
      <p>As I'm sure you've read by now, my name is Cameron Powell, but most people just call me Cam.
        I am 23 years old, living in Boston Massachusetts with my girlfriend and my cat, Meatball.
        I graduated from Northeastern University in December of 2023 with honors, where I received 
        a Bachelor of Science in Computer Science and Business Administration with a concentration 
        in Financial Technology. 
      </p>

      <p>I graduated from St. John's Preparatory School in 2019, where I
            received my high school education. From high school, I went on to study abroad
            in Rome at John Cabot University for my first semester of college through
            Northeastern's N.U.in program. In December of 2023, I completed all of my coursework
            for my undergraduate studies at Northeastern and will attend my official graduation
            in May 2024.
            </p>
            <p>
              For my two co-ops at Northeastern, I worked at Enel X North America,
              first as a Demand Response Support Analyst intern for six months in 2021, and then
              as an Energy Markets Business Analyst intern for eight months in 2022. I am currently
              looking for a full-time work opportunity, and I am excited to see what the future has in store for me!
              </p>
              
          <Link to="/gallery">Check Out My Life in Photos</Link>
        </div>
      </div>
      <hr />
      <div className="content">
        <div className="mission">
          <h1>Skills</h1>
          <p>
            i code
          </p>
        </div>
      </div>
      <hr />
      <div className="content">
        <div className="experience">
          <h1>My Experience</h1>
          <p>
            lots nd lots
          </p>
          <Link to="/projects">View My Projects</Link>
        </div>
      </div>
      <hr />
      <div className="content">
        <div className="hobbies">
          <h1>My Hobbies</h1>
          <p>
            coding
          </p>
          <Link to="/hobbies">Learn What I Do For Fun!</Link>
        </div>
      </div>
    </div>
  );
};

export default About;
