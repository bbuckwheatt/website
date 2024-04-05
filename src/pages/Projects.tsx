// src/components/Projects.tsx
import animatorPic from './images-projects/animator.png';
import tttPic from './images-projects/ttt.png';
import webPic from './images-projects/web.png';
import collage from './images-projects/collage.png';
import React, { useState } from 'react';
import StopMotionStudioModal from '../components/StopMotionStudio/StopMotionStudioModal';


// Define a type for the project object
type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string; // Assuming you have images for your projects
  liveUrl: string; // URL to the live project
  repoUrl: string; // URL to the project's repository
};

// Sample projects data
const projects: Project[] = [
  {
    id: 1,
    title: 'This Website',
    description: 'This website was made without templates, totally from scratch. It was built using React, TypeScript, and CSS. I plan to continue to update and improve it as I learn more about web development. Feedback is welcome!',
    imageUrl: webPic,
    liveUrl: '',
    repoUrl: 'https://github.com/bbuckwheatt/website',
  },
  {
    id: 2,
    title: 'Stop Motion Animator',
    description: 'Proposed, developed, and implemented a fully functional stop-motion animation studio in the open-source remote collaboration tool, Covey.Town, utilizing React, TypeScript, and the Agile development system.',
    imageUrl: animatorPic,
    liveUrl: 'https://stop-motion-studio-hyvi.onrender.com',
    repoUrl: 'https://github.com/neu-cs4530/covey-town-project-team-603',
  },
  {
    id: 3,
    title: 'Photo Editor App',
    description: 'Utilized polymorphism and composition to create a decoupled, extensible tool in Java to collage and filter photos',
    imageUrl: collage,
    liveUrl: 'https://github.com/bbuckwheatt/collage',
    repoUrl: 'https://github.com/bbuckwheatt/collage',
  },

  {
    id: 4,
    title: 'Tic Tac Toe Game',
    description: 'Created a simple Tic Tac Toe game using React and TypeScript. Playable with 2 players in Northeastern University\'s Covey.Town, complete with a leaderboard and options to spectate games in progress.',
    imageUrl: tttPic,
    liveUrl: 'https://stop-motion-studio-hyvi.onrender.com',
    repoUrl: 'https://github.com/neu-cs4530/covey-town-project-team-603',
  },

  {
    id: 5,
    title: 'New York City Property Price Estimator',
    description: 'This is a brief description of Project One.',
    imageUrl: '',
    liveUrl: 'http://liveurl.com',
    repoUrl: 'http://repourl.com',
  },


];

const Projects: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  return (
    <section className="projects">
      <h1>My Projects</h1>
      <div className="project-list">
        {projects.map((project) => (
          <div key={project.id} className="project">
            <img src={project.imageUrl} alt={project.title} className="project-image" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.id === 2 ? (
              // This button will now toggle the modal based on `isModalOpen`
              <a onClick={openModal}>Open Studio</a>
            ) : (
              <>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">View Live</a>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">View Code</a>
              </>
            )}
          </div>
        ))}
      </div>
      {/* Conditionally render the StopMotionStudioModal based on `isModalOpen` */}
      <StopMotionStudioModal isOpen={isModalOpen} onClose={closeModal} />
    </section>

  );
};

export default Projects;
