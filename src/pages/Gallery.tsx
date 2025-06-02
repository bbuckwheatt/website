import React from 'react';
import { Link } from 'react-router-dom';
import Iceland from './images-gallery/iceland.jpeg';
import Food from './images-gallery/food.jpeg';
import Meatball from './images-gallery/meatball.jpeg';
import Ireland from './images-gallery/ireland.JPG';
import Italy from './images-gallery/italy.jpeg';
import London from './images-gallery/london.jpeg';
import '../styles/gallery.css';

// Example categories data
const categories = [
  { name: 'Iceland', image: Iceland, path: '/gallery/iceland' },
  { name: 'Ireland', image: Ireland, path: '/gallery/ireland' },
  { name: 'London', image: London, path: '/gallery/london' },
  { name: 'Italy', image: Italy, path: '/gallery/italy' },
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
