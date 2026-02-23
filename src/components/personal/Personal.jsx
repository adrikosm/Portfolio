import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faServer,
  faChartLine,
  faMobile,
  faFire,
  faSnowflake,
  faFileCode,
  faGears,
  faArrowsRotate,
  faProjectDiagram,
  faSitemap
} from "@fortawesome/free-solid-svg-icons";
import { faPython, faDocker, faGitAlt, faAws, faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import "./personal.css";
import { profileData } from "../../data/profileData";

const iconMap = {
  python: faPython,
  database: faDatabase,
  server: faServer,
  chart: faChartLine,
  mobile: faMobile,
  fire: faFire,
  snowflake: faSnowflake,
  fileCode: faFileCode,
  gears: faGears,
  arrows: faArrowsRotate,
  diagram: faProjectDiagram,
  sitemap: faSitemap,
  docker: faDocker,
  git: faGitAlt,
  aws: faAws,
  microsoft: faMicrosoft
};

const Personal = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { skills } = profileData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <motion.div className="skills-container" initial="hidden" animate={inView ? "visible" : "hidden"}>
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{skills.title}</h2>
          <p className="section-subtitle">{skills.subtitle}</p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div className="tools-grid" variants={containerVariants}>
          {skills.tools.map((tool) => (
            <motion.div
              key={tool.name}
              className="tool-card"
              variants={itemVariants}
              style={{ "--tool-color": `${tool.color}25` }}
              whileHover={{
                scale: 1.08,
                y: -8,
                boxShadow: `0 20px 40px ${tool.color}30`,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className="tool-icon-wrapper" whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                <FontAwesomeIcon icon={iconMap[tool.iconKey] || faDatabase} className="tool-icon" style={{ color: tool.color }} />
              </motion.div>
              <h3 className="tool-name">{tool.name}</h3>
              <div className="tool-accent" style={{ background: tool.color }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="skills-footer"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="skills-stats">
            {skills.footerStats.map((stat) => (
              <div className="stat-badge" key={stat.label}>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="skills-note">{skills.note}</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Personal;
