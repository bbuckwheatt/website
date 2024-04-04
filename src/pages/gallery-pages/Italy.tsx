import React from 'react';
import nl from './iceland-images/nl.jpeg';

const Italy: React.FC = () => {
  return (
<div className="photo-gallery">
  <div className="photo-item">
    <img src={nl} alt="Description"/>
    <p className="photo-title">Northern Lights</p>
  </div>
  {/* <!-- Repeat photo-item for each photo --> */}
</div>

  );
};

export default Italy;
