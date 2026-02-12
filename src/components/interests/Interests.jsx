import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faBook,
  faPlane,
  faUtensils,
  faFilm
} from "@fortawesome/free-solid-svg-icons";
import "./interests.css";

const Interests = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const interests = [
    {
      id: 1,
      name: "Strongman",
      icon: faDumbbell,
      color: "#ef4444",
      description: "Discipline & Strength"
    },
    {
      id: 2,
      name: "Fantasy Books",
      icon: faBook,
      color: "#8b5cf6",
      description: "Imagination & Learning"
    },
    {
      id: 3,
      name: "Traveling",
      icon: faPlane,
      color: "#00b9e8",
      description: "Exploration & Culture"
    },
    {
      id: 4,
      name: "Culinary Arts",
      icon: faUtensils,
      color: "#f59e0b",
      description: "Creativity & Taste"
    },
    {
      id: 5,
      name: "Cinema",
      icon: faFilm,
      color: "#10b981",
      description: "Stories & Art"
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="interests" className="interests-section" ref={ref}>
      <motion.div
        className="interests-container"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Beyond Code</h2>
          <p className="section-subtitle">
            What drives me outside of data engineering
          </p>
        </motion.div>

        {/* Interests Grid */}
        <motion.div
          className="interests-grid"
          variants={containerVariants}
        >
          {interests.map((interest) => (
            <motion.div
              key={interest.id}
              className="interest-card"
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="interest-icon-wrapper"
                style={{
                  background: `linear-gradient(135deg, ${interest.color} 0%, ${interest.color}cc 100%)`,
                  boxShadow: `0 8px 25px ${interest.color}40`
                }}
                whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <FontAwesomeIcon icon={interest.icon} className="interest-icon" />
              </motion.div>
              <h3 className="interest-name">{interest.name}</h3>
              <p className="interest-description">{interest.description}</p>
              <div
                className="interest-accent"
                style={{ background: interest.color }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Quote */}
        <motion.div
          className="interests-footer"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="interests-quote">
            "A well-rounded engineer brings diverse perspectives to problem-solving"
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Interests;
