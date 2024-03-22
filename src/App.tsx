import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Footer from './components/Footer';

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
        {/* Define other routes here */}
      </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
