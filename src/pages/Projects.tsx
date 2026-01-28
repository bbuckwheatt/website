import React, { useState } from 'react';
import animatorPic from './images-projects/animator.png';
import tttPic from './images-projects/ttt.png';
import webPic from './images-projects/web.png';
import collage from './images-projects/collage.png';
import StopMotionStudioModal from '../components/StopMotionStudio/StopMotionStudioModal';
import '../styles/projects.css';

type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt: string;
  liveUrl?: string;
  repoUrl?: string;
  tags: string[];
  openStudio?: boolean;
  isPrivate?: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'CustomGPT Support Automation Workflow',
    description:
      'Built RAG-driven automation to streamline support triage and responses across multiple helpdesk platforms, reducing manual workload by 120+ hours per week.',
    imageUrl: webPic,
    imageAlt: 'Automation dashboard visualization',
    tags: ['RAG', 'APIs', 'Automation', 'Python'],
    isPrivate: true
  },
  {
    id: 2,
    title: 'Stop Motion Animator',
    description:
      'Integrated a full stop-motion animation studio into Northeastern’s Covey.Town platform with custom canvas tooling and figure-rotation algorithms.',
    imageUrl: animatorPic,
    imageAlt: 'Stop motion studio interface',
    liveUrl: 'https://stop-motion-studio-hyvi.onrender.com',
    repoUrl: 'https://github.com/neu-cs4530/covey-town-project-team-603',
    tags: ['React', 'TypeScript', 'Konva'],
    openStudio: true
  },
  {
    id: 3,
    title: 'This Website',
    description:
      'A handcrafted portfolio built with React and TypeScript, featuring a 3D interactive hero and a custom component system.',
    imageUrl: webPic,
    imageAlt: 'Portfolio website preview',
    repoUrl: 'https://github.com/bbuckwheatt/website',
    tags: ['React', 'TypeScript', 'Three.js']
  },
  {
    id: 4,
    title: 'Mars Rover Team — Robotics Software',
    description:
      'Contributed inverse-kinematics functionality for a 6-DOF robotic arm in Northeastern’s Mars Rover team.',
    imageUrl: tttPic,
    imageAlt: 'Mars rover interface mockup',
    tags: ['Python', 'Robotics', 'Kinematics']
  },
  {
    id: 5,
    title: 'Photo Editor & Collage Builder',
    description:
      'Designed a modular Java app for collage and photo filters using polymorphism and composition.',
    imageUrl: collage,
    imageAlt: 'Photo collage application',
    repoUrl: 'https://github.com/bbuckwheatt/collage',
    tags: ['Java', 'OOP', 'Design Patterns']
  }
];

const Projects: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="projects">
      <div className="projects-header">
        <h1>Selected Projects</h1>
        <p>
          A mix of enterprise implementations, product integrations, and creative experiments.
        </p>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <article key={project.id} className="project">
            {project.imageUrl && (
              <img src={project.imageUrl} alt={project.imageAlt} className="project-image" />
            )}
            <div className="project-body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-links">
                {project.openStudio ? (
                  <button className="link-button" onClick={openModal} type="button">
                    Open studio
                  </button>
                ) : null}
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    View live
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    View code
                  </a>
                ) : null}
                {project.isPrivate ? <span className="private-pill">Private</span> : null}
              </div>
            </div>
          </article>
        ))}
      </div>
      <StopMotionStudioModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default Projects;
