import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

const Home: React.FC = () => <div>Home Page Content</div>;
const Projects: React.FC = () => <div>Projects Page Content</div>;
const About: React.FC = () => <div>About Page Content</div>;

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route exact path="/" component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/about" component={About} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
