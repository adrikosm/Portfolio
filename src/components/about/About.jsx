import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Typewriter from "typewriter-effect";
import "./about.css";
import { profileData } from "../../data/profileData";

const About = () => {
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hasScrolled, setHasScrolled] = useState(false);
  const resumeButtonRef = useRef(null);
  const { identity, about } = profileData;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse-following glow effect for resume button.
  useEffect(() => {
    const button = resumeButtonRef.current;
    if (!button) return undefined;

    const handleMouseMove = (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      button.style.setProperty("--x", `${x}px`);
      button.style.setProperty("--y", `${y}px`);
    };

    button.addEventListener("mousemove", handleMouseMove);
    return () => button.removeEventListener("mousemove", handleMouseMove);
  }, []);

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


  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-background-elements">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      <motion.div className="about-container" variants={containerVariants} animate="visible">
        {/* Left Content */}
        <motion.div className="about-content" variants={itemVariants}>
          <motion.div className="greeting-wrapper" variants={itemVariants}>
            <span className="greeting-line" />
            <h3 className="about-greeting">{about.greeting}</h3>
          </motion.div>

          <motion.h1 className="about-name" variants={itemVariants}>
            {identity.name}
          </motion.h1>

          <motion.div className="about-role" variants={itemVariants}>
            <div className="role-typewriter">
              <Typewriter
                options={{
                  strings: about.roleTypewriter,
                  autoStart: true,
                  loop: true,
                  delay: 80,
                  deleteSpeed: 50,
                  pauseFor: 5000,
                }}
              />
            </div>
          </motion.div>

          <motion.p className="about-description" variants={itemVariants}>
            {about.description}
          </motion.p>

          <motion.div className="about-actions" variants={itemVariants}>
            <motion.a
              ref={resumeButtonRef}
              href={identity.resume}
              download={identity.resumeFileName}
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
              onClick={(event) => {
                event.preventDefault();
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Stats/Highlights */}
          <motion.div className="about-stats" variants={itemVariants}>
            {about.stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Ambient Visual */}
        <motion.div className="about-visual" variants={imageVariants}>
          <div className="ambient-glow" />
          <div className="accent-line" />
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
            <motion.div className="mouse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <motion.div className="wheel" animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
            </motion.div>
            <span className="scroll-text">Scroll Down</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
