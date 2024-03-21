import React from 'react';
import { Link } from 'react-router-dom';

// const Header: React.FC = () => {
//   return (
//     <header>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/projects">Projects</Link></li>
//           <li><Link to="/about">About</Link></li>
//           {/* Add other navigation links here */}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;

//styled attempt

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <nav>
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/projects" className="nav-link">Projects</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          {/* Other navigation links */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;