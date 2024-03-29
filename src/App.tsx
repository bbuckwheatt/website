import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Hobbies from './pages/Hobbies';
import Gallery from './pages/Gallery';
import Footer from './components/Footer';

import Travel from './pages/gallery-pages/Travel';
import Food from './pages/gallery-pages/Food';
import Meatball from './pages/gallery-pages/Meatball';

// const Home: React.FC = () => <div>Home Page Content</div>;
// const Projects: React.FC = () => <div>Projects Page Content</div>;
// const About: React.FC = () => <div>About Page Content</div>;

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main>
      <Routes>
        {/* <Route exact path="/" component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/about" component={About} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/travel" element={<Travel />} />
          <Route path="/gallery/food" element={<Food />} />
          <Route path="/gallery/meatball" element={<Meatball />} />
        {/* Define other routes here */}
      </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
