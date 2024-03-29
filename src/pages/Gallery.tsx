import React from 'react';
import { Link } from 'react-router-dom';
import Travel from './images-gallery/iceland.jpeg';
import Food from './images-gallery/food.jpeg';
import Meatball from './images-gallery/meatball.jpeg';


// Example categories data
const categories = [
  { name: 'Travel', image: Travel, path: '/gallery/travel' },
  { name: 'Food', image: Food, path: '/gallery/food' },
  { name: 'Meatball the Cat', image: Meatball, path: '/gallery/meatball' },
  // Add more categories as needed
];

const Gallery: React.FC = () => {
  return (
    <div className="gallery">
      {categories.map((category) => (
        <div key={category.name} className="category">
          <Link to={category.path}>
            <img src={category.image} alt={category.name} />
            <p>{category.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
