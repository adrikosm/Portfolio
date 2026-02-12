import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCertificate,
  faGraduationCap,
  faAward,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";
import "./certifications.css";

const Certifications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const certifications = [
    {
      id: 1,
      type: "degree",
      title: "B.Sc. Information and Technology",
      institution: "Harokopio University",
      location: "Athens, Greece",
      year: "Graduated",
      icon: faGraduationCap,
      color: "#8b5cf6",
      description: "Comprehensive study in Computer Science, Information Systems, and Data Management",
    },
    {
      id: 2,
      type: "certificate",
      title: "Elements of AI",
      institution: "University of Helsinki",
      location: "Finland",
      year: "Certified",
      icon: faCertificate,
      color: "#00b9e8",
      description: "Introduction to AI, machine learning, and neural networks fundamentals",
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
      <motion.div
        className="certifications-container"
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
          <h2 className="section-title">Education & Certifications</h2>
          <p className="section-subtitle">
            Academic foundation and continuous learning in technology and AI
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          className="certifications-grid"
          variants={containerVariants}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              className={`certification-card ${cert.type}`}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Icon Circle */}
              <div
                className="cert-icon-circle"
                style={{
                  background: `linear-gradient(135deg, ${cert.color} 0%, ${cert.color}dd 100%)`,
                  boxShadow: `0 8px 25px ${cert.color}40`
                }}
              >
                <FontAwesomeIcon icon={cert.icon} className="cert-icon" />
              </div>

              {/* Badge */}
              <div className="cert-badge">
                <FontAwesomeIcon icon={faAward} />
                <span>{cert.type === 'degree' ? 'Degree' : 'Certificate'}</span>
              </div>

              {/* Content */}
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

              {/* Decorative Elements */}
              <div className="cert-decoration" style={{ background: cert.color }}></div>
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
              <span>1 Degree</span>
            </div>
            <div className="cert-stat-item">
              <FontAwesomeIcon icon={faCertificate} />
              <span>1+ Certification</span>
            </div>
            <div className="cert-stat-item">
              <FontAwesomeIcon icon={faAward} />
              <span>Continuous Learning</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Certifications;
