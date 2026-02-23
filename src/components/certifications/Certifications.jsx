import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faGraduationCap, faAward, faCalendar } from "@fortawesome/free-solid-svg-icons";
import "./certifications.css";
import { profileData } from "../../data/profileData";

const iconMap = {
  certificate: faCertificate,
  graduationCap: faGraduationCap
};

const Certifications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { certifications } = profileData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="certifications" className="certifications-section" ref={ref}>
      <motion.div className="certifications-container" initial="hidden" animate={inView ? "visible" : "hidden"}>
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{certifications.title}</h2>
          <p className="section-subtitle">{certifications.subtitle}</p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div className="certifications-grid" variants={containerVariants}>
          {certifications.items.map((cert) => (
            <motion.div
              key={cert.id}
              className={`certification-card ${cert.type}`}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="cert-icon-circle"
                style={{
                  background: `linear-gradient(135deg, ${cert.color} 0%, ${cert.color}dd 100%)`,
                  boxShadow: `0 8px 25px ${cert.color}40`
                }}
              >
                <FontAwesomeIcon icon={iconMap[cert.iconKey] || faCertificate} className="cert-icon" />
              </div>

              <div className="cert-badge">
                <FontAwesomeIcon icon={faAward} />
                <span>{cert.type === "degree" ? "Degree" : "Certificate"}</span>
              </div>

              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <h4 className="cert-institution">{cert.institution}</h4>

                <div className="cert-meta">
                  <span className="cert-location">{cert.location}</span>
                  <span className="cert-separator">•</span>
                  <span className="cert-year">
                    <FontAwesomeIcon icon={faCalendar} /> {cert.year}
                  </span>
                </div>

                <p className="cert-description">{cert.description}</p>
              </div>

              <div className="cert-decoration" style={{ background: cert.color }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Footer */}
        <motion.div
          className="certifications-footer"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="cert-stats">
            <div className="cert-stat-item">
              <FontAwesomeIcon icon={faGraduationCap} />
              <span>{certifications.stats[0]}</span>
            </div>
            <div className="cert-stat-item">
              <FontAwesomeIcon icon={faCertificate} />
              <span>{certifications.stats[1]}</span>
            </div>
            <div className="cert-stat-item">
              <FontAwesomeIcon icon={faAward} />
              <span>{certifications.stats[2]}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Certifications;
