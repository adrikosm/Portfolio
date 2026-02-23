import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Header from './components/header/Header';
import About from './components/about/About';
import ImpactMetrics from './components/impact/ImpactMetrics';
import Personal from './components/personal/Personal';
import Experience from './components/experience/Experience';
import Projects from './components/projects/Projects';
import Certifications from './components/certifications/Certifications';
import Interests from './components/interests/Interests';
import Contact from './components/contact/Contact';
import Footer from "./components/footer/Footer";

const App = () => {
  const shouldReduceMotion = useReducedMotion();
  // Lazy initialization: only reads localStorage once on mount
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync theme to DOM and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Show scroll-to-top button after scrolling past 400px
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth'
    });
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {/* Main content */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main id="main-content" tabIndex={-1}>
        <About />
        <ImpactMetrics />
        <Personal />
        <Experience />
        <Projects />
        <Certifications />
        <Interests />
        <Contact />
      </main>
      <Footer />

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="scroll-to-top"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
