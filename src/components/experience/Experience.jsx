import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faCalendar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./experience.css";

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      id: 1,
      title: "Data Engineer",
      company: "Alpha FMC",
      location: "Frankfurt, Germany",
      period: "2022 - Present",
      current: true,
      achievements: [
        "Architected multi-TB data warehouse processing 2M+ daily records across 50+ source systems using dbt on Snowflake (Large warehouse, 8-node cluster)",
        "Led technical decision to migrate from Airflow to Dagster - reduced pipeline orchestration complexity by 40% and improved observability through asset-based lineage",
        "Reduced data quality incidents by 60% implementing dbt's testing framework with 500+ custom tests for schema validation, referential integrity, and business rules",
        "Mentored 3 junior engineers on data modeling best practices - established team standards for incremental models and snapshot strategies",
        "Cut SQL codebase by 60% through reusable Jinja macros in dbt - created internal package with 20+ macros used across 15+ projects company-wide",
        "Optimized Snowflake warehouse performance reducing query runtime by 35% through clustering keys and materialized views - saved $15K/month in compute costs",
        "Built real-time streaming pipeline using Kafka and Spark Structured Streaming for event data - processes 50K events/minute with sub-second latency",
        "Implemented CI/CD for data pipelines using Azure DevOps with automated testing, slim CI runs, and blue-green deployment strategies",
      ],
      technologies: ["dbt", "Snowflake", "Azure", "Python", "SQL", "Dagster", "Streamlit", "Kafka", "Spark", "Docker", "Terraform", "Azure DevOps"],
    },
    {
      id: 2,
      title: "Data Solution Engineer",
      company: "Top Vision",
      location: "Frankfurt, Germany",
      period: "2020 - 2022",
      current: false,
      achievements: [
        "Designed ETL architecture processing 500GB+ client data daily from Excel/CSV to PostgreSQL using Python - handled data validation and GDPR compliance requirements",
        "Reduced data pipeline processing time by 40% through parallel processing with Python multiprocessing - processed 20+ datasets concurrently vs sequential approach",
        "Led migration of legacy PHP monolith to modular architecture - improved landing page load time by 30% through lazy loading and caching strategies (Redis)",
        "Built cross-platform Flutter app (Web/Android/iOS) with Firebase Auth - scaled to 5K+ users with role-based access control and real-time data sync",
        "Collaborated with client stakeholders in Agile sprints - translated business requirements into technical specs for 10+ ETL workflows",
        "Created data documentation using automated schema discovery - established data catalog reducing onboarding time for new team members by 50%",
      ],
      technologies: ["PostgreSQL", "Python", "PHP", "Flutter", "Firebase", "Redis", "Docker", "Git"],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="experience" className="experience-section" ref={ref}>
      <motion.div
        className="experience-container"
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
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            Designing data systems that process terabytes daily and empower data-driven decisions
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="timeline"
          variants={containerVariants}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`timeline-item ${exp.current ? 'current' : ''}`}
              variants={itemVariants}
            >
              {/* Timeline Marker */}
              <div className="timeline-marker">
                <div className="marker-dot"></div>
                {index < experiences.length - 1 && <div className="marker-line"></div>}
              </div>

              {/* Experience Card */}
              <motion.div
                className="experience-card"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {exp.current && (
                  <div className="current-badge">Current</div>
                )}

                {/* Header */}
                <div className="experience-header">
                  <div className="experience-icon">
                    <FontAwesomeIcon icon={faBriefcase} />
                  </div>
                  <div className="experience-title-group">
                    <h3 className="experience-title">{exp.title}</h3>
                    <h4 className="experience-company">{exp.company}</h4>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="experience-meta">
                  <div className="meta-item">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="meta-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Achievements */}
                <div className="experience-achievements">
                  <h5 className="achievements-title">Key Achievements:</h5>
                  <ul className="achievements-list">
                    {exp.achievements.map((achievement, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 0.1 * idx + 0.5, duration: 0.5 }}
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="experience-technologies">
                  {exp.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;
