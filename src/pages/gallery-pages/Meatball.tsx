import React from 'react';
import meat1 from './meatball-images/meat1.jpeg';
import meat2 from './meatball-images/meat2.jpeg';
import meat3 from './meatball-images/meat3.jpeg';
import meat4 from './meatball-images/meat4.jpeg';

const Meatball: React.FC = () => {
  return (
<div className="photo-gallery">
  <div className="photo-item">
    <img src={meat1} alt="Meatball"/>
    <p className="photo-title">Arrival</p>
  </div>
  <div className="photo-item">
    <img src={meat2} alt="Meatball"/>
    <p className="photo-title">Out of the Carrier</p>
  </div>
  <div className="photo-item">
    <img src={meat3} alt="Meatball"/>
    <p className="photo-title">Back into Hiding</p>
  </div>
  <div className="photo-item">
    <img src={meat4} alt="Meatball"/>
    <p className="photo-title">Caught in the Act! (Playing)</p>
  </div>
  {/* <!-- Repeat photo-item for each photo --> */}
</div>

  );
};

export default Meatball;
