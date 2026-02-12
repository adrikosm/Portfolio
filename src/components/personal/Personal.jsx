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
import {
  faPython,
  faDocker,
  faGitAlt,
  faAws,
  faPhp,
  faMicrosoft
} from "@fortawesome/free-brands-svg-icons";
import "./personal.css";

const Personal = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Complete tools data with all technologies Andreas uses + in-demand skills
  const toolsData = [
    // Core Data Engineering
    { name: "Python", icon: faPython, color: "#3776AB", category: "core" },
    { name: "SQL", icon: faDatabase, color: "#00758F", category: "core" },
    { name: "dbt", icon: faGears, color: "#FF694B", category: "core" },
    { name: "Snowflake", icon: faSnowflake, color: "#29B5E8", category: "core" },
    { name: "PostgreSQL", icon: faDatabase, color: "#336791", category: "core" },

    // Cloud Platforms (Top Priority - 74.5% of jobs)
    { name: "Azure", icon: faMicrosoft, color: "#0078D4", category: "cloud" },
    { name: "AWS", icon: faAws, color: "#FF9900", category: "cloud" },
    { name: "Docker", icon: faDocker, color: "#2496ED", category: "cloud" },
    { name: "Git", icon: faGitAlt, color: "#F05032", category: "cloud" },

    // Streaming & Real-Time Processing (High Demand)
    { name: "Kafka", icon: faArrowsRotate, color: "#231F20", category: "streaming" },
    { name: "Spark", icon: faFire, color: "#E25A1C", category: "streaming" },

    // Orchestration & Workflow (Essential)
    { name: "Airflow", icon: faProjectDiagram, color: "#017CEE", category: "orchestration" },
    { name: "Dagster", icon: faGears, color: "#6C72E0", category: "orchestration" },
    { name: "Streamlit", icon: faChartLine, color: "#FF4B4B", category: "orchestration" },

    // Additional Technologies
    { name: "Jinja", icon: faFileCode, color: "#B41717", category: "additional" },
    { name: "Flutter", icon: faMobile, color: "#02569B", category: "additional" },
    { name: "PHP", icon: faPhp, color: "#777BB4", category: "additional" },
    { name: "Firebase", icon: faFire, color: "#FFCA28", category: "additional" },

    // Concepts/Architecture
    { name: "ETL Pipelines", icon: faServer, color: "#10B981", category: "concepts" },
    { name: "Data Architecture", icon: faSitemap, color: "#8B5CF6", category: "concepts" },
  ];

  // Animation variants
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
      <motion.div
        className="skills-container"
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
          <h2 className="section-title">Technologies & Tools</h2>
          <p className="section-subtitle">
            Comprehensive toolkit for building robust data engineering solutions
          </p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          className="tools-grid"
          variants={containerVariants}
        >
          {toolsData.map((tool, index) => (
            <motion.div
              key={tool.name}
              className="tool-card"
              variants={itemVariants}
              style={{ '--tool-color': `${tool.color}25` }}
              whileHover={{
                scale: 1.08,
                y: -8,
                boxShadow: `0 20px 40px ${tool.color}30`,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="tool-icon-wrapper"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <FontAwesomeIcon
                  icon={tool.icon}
                  className="tool-icon"
                  style={{ color: tool.color }}
                />
              </motion.div>
              <h3 className="tool-name">{tool.name}</h3>
              <div
                className="tool-accent"
                style={{ background: tool.color }}
              />
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
            <div className="stat-badge">
              <span className="stat-value">20+</span>
              <span className="stat-label">Technologies Mastered</span>
            </div>
            <div className="stat-badge">
              <span className="stat-value">7</span>
              <span className="stat-label">Core Expertise Areas</span>
            </div>
            <div className="stat-badge">
              <span className="stat-value">100%</span>
              <span className="stat-label">Production Ready</span>
            </div>
          </div>
          <p className="skills-note">
            Continuously learning and expanding expertise to deliver cutting-edge data solutions
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Personal;
