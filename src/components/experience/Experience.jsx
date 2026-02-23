import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faCalendar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./experience.css";
import { profileData } from "../../data/profileData";

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { experience } = profileData;

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
      <motion.div className="experience-container" initial="hidden" animate={inView ? "visible" : "hidden"}>
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{experience.title}</h2>
          <p className="section-subtitle">{experience.subtitle}</p>
        </motion.div>

        {/* Timeline */}
        <motion.div className="timeline" variants={containerVariants}>
          {experience.roles.map((exp, index) => (
            <motion.div key={exp.id} className={`timeline-item ${exp.current ? "current" : ""}`} variants={itemVariants}>
              {/* Timeline Marker */}
              <div className="timeline-marker">
                <div className="marker-dot" />
                {index < experience.roles.length - 1 && <div className="marker-line" />}
              </div>

              {/* Experience Card */}
              <motion.div className="experience-card" whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
                {exp.current && <div className="current-badge">Current</div>}

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
