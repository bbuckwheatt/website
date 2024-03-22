// src/components/Projects.tsx
import React from 'react';
import animatorPic from './animator.png';

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
    title: 'Stop Motion Animator',
    description: 'Proposed, developed, and implemented a fully functional stop-motion animation studio in the open-source remote collaboration tool, Covey.Town, utilizing React, TypeScript, and the Agile development system.',
    imageUrl: animatorPic,
    liveUrl: 'https://stop-motion-studio-hyvi.onrender.com',
    repoUrl: 'https://github.com/neu-cs4530/covey-town-project-team-603',
  },
  {
    id: 2,
    title: 'Photo Editor App',
    description: 'This is a brief description of Project One.',
    imageUrl: '/path-to-your-image.jpg',
    liveUrl: 'http://liveurl.com',
    repoUrl: 'http://repourl.com',
  },

  {
    id: 3,
    title: 'Tic Tac Toe Game',
    description: 'This is a brief description of Project One.',
    imageUrl: '/path-to-your-image.jpg',
    liveUrl: 'http://liveurl.com',
    repoUrl: 'http://repourl.com',
  },

  {
    id: 4,
    title: 'New York City Property Price Estimator',
    description: 'This is a brief description of Project One.',
    imageUrl: '/path-to-your-image.jpg',
    liveUrl: 'http://liveurl.com',
    repoUrl: 'http://repourl.com',
  },


];

const Projects: React.FC = () => {
  return (
    <section className="projects">
      <h2>My Projects</h2>
      <div className="project-list">
        {projects.map((project) => (
          <div key={project.id} className="project">
            <img src={project.imageUrl} alt={project.title} className="project-image" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">View Live</a>
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">View Code</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
