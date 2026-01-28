import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';


// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const About = lazy(() => import('./pages/About'));
const Hobbies = lazy(() => import('./pages/Hobbies'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Iceland = lazy(() => import('./pages/gallery-pages/Iceland'));
const Ireland = lazy(() => import('./pages/gallery-pages/Ireland'));
const London = lazy(() => import('./pages/gallery-pages/London'));
const Italy = lazy(() => import('./pages/gallery-pages/Italy'));
const Food = lazy(() => import('./pages/gallery-pages/Food'));
const Meatball = lazy(() => import('./pages/gallery-pages/Meatball'));


// Loading component
const Loading: React.FC = () => (
  <div className="loading-container" style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '200px' 
  }}>
    <div>Loading...</div>
  </div>
);

// 404 Not Found component
const NotFound: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="app-shell">
          <Header theme={theme} onToggleTheme={toggleTheme} />
          <main className="app-main">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/hobbies" element={<Hobbies />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gallery/iceland" element={<Iceland />} />
                <Route path="/gallery/ireland" element={<Ireland />} />
                <Route path="/gallery/italy" element={<Italy />} />
                <Route path="/gallery/london" element={<London />} />
                <Route path="/gallery/food" element={<Food />} />
                <Route path="/gallery/meatball" element={<Meatball />} />
                {/* 404 Route - must be last */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
