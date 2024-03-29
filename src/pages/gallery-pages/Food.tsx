import React from 'react';
import nl from './travel-images/nl.jpeg';

const Food: React.FC = () => {
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

export default Food;
