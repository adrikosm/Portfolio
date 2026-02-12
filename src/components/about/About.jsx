import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Typewriter from 'typewriter-effect';
import "./about.css";
import logo from "../../assets/programming.png";
import resume from "../../assets/Resume.pdf";

const About = () => {
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hasScrolled, setHasScrolled] = useState(false);
  const resumeButtonRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse-following glow effect for resume button
  useEffect(() => {
    const button = resumeButtonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      button.style.setProperty('--x', `${x}px`);
      button.style.setProperty('--y', `${y}px`);
    };

    button.addEventListener('mousemove', handleMouseMove);
    return () => button.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation variants
  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  const imageVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { number: "4+", label: "Years Experience" },
    { number: "20+", label: "Projects Completed" },
    { number: "20+", label: "Technologies" }
  ];

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-background-elements">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <motion.div
        className="about-container"
        variants={containerVariants}
        animate="visible"
      >
        {/* Left Content */}
        <motion.div className="about-content" variants={itemVariants}>
          <motion.div className="greeting-wrapper" variants={itemVariants}>
            <span className="greeting-line"></span>
            <h3 className="about-greeting">Hi, I am</h3>
          </motion.div>

          <motion.h1
            className="about-name"
            variants={itemVariants}
          >
            Andreas Mavropoulos
          </motion.h1>

          <motion.div
            className="about-role"
            variants={itemVariants}
          >
            <div className="role-typewriter">
              <Typewriter
                options={{
                  strings: [
                    'Data Engineer',
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 80,
                  deleteSpeed: 50,
                  pauseFor: 5000,
                }}
              />
            </div>
          </motion.div>

          <motion.p
            className="about-description"
            variants={itemVariants}
          >
            I build data systems that handle terabytes of data daily. My work focuses on
            making messy data reliable through smart pipelines, quality testing, and
            cost-effective infrastructure. Currently architecting enterprise data warehouses
            at Alpha FMC.
          </motion.p>

          <motion.div
            className="about-actions"
            variants={itemVariants}
          >
            <motion.a
              ref={resumeButtonRef}
              href={resume}
              download="Andreas_Mavropoulos_Resume.pdf"
              className="btn btn-primary btn-resume button-creative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Download Resume
            </motion.a>

            <motion.a
              href="#contact"
              className="btn btn-outline btn-contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Stats/Highlights */}
          <motion.div
            className="about-stats"
            variants={itemVariants}
          >
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="about-image"
          variants={imageVariants}
        >
          <motion.div
            className="image-wrapper"
            whileHover={{ scale: 1.02, rotate: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="image-backdrop"></div>
            <div className="image-glow"></div>
            <img src={logo} alt="Programming illustration" className="hero-image" />

            {/* Glass Cards */}
            <motion.div
              className="glass-card card-1"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="card-icon">🚀</span>
              <div className="card-content">
                <span className="card-title">Scalable</span>
                <span className="card-subtitle">Pipelines</span>
              </div>
            </motion.div>

            <motion.div
              className="glass-card card-2"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <span className="card-icon">☁️</span>
              <div className="card-content">
                <span className="card-title">Cloud</span>
                <span className="card-subtitle">Native</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.div
              className="mouse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="wheel"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <span className="scroll-text">Scroll Down</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
