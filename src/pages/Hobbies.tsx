import React from 'react';
import '../styles/hobbies.css';

const hobbies = [
  'Technology and emerging tools',
  'Strategy and role-playing games',
  'Science fiction and fantasy',
  'Finance and markets',
  'Fitness and hiking',
  'Cooking and coffee',
  'Pickleball',
  'Photography and travel'
];

const Hobbies: React.FC = () => {
  return (
    <section className="hobbies">
      <h1>Hobbies & Interests</h1>
      <p>
        Outside of work, I’m usually experimenting with new tools, exploring the outdoors, or
        capturing moments on camera.
      </p>
      <div className="hobby-grid">
        {hobbies.map((hobby) => (
          <div key={hobby} className="hobby-card">
            {hobby}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hobbies;
