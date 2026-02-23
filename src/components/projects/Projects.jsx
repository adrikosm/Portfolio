import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Activity, Database, Settings, Timer, Zap } from "lucide-react";
import "./projects.css";
import { profileData } from "../../data/profileData";

const CASE_STUDY_EMAIL = "adrikosm@gmail.com";

const getProofLabel = (linkStatus) => {
  if (linkStatus === "public") return "Public Repo";
  if (linkStatus === "coming_soon") return "Case Study Soon";
  return "Private Enterprise";
};

const projectIconMap = {
  Database,
  Settings,
  Zap,
  Activity,
  Timer
};

const Projects = () => {
  const shouldReduceMotion = useReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const closeButtonRef = useRef(null);
  const modalContentRef = useRef(null);
  const activeTriggerRef = useRef(null);
  const wasModalOpenRef = useRef(false);
  const { projects } = profileData;

  useEffect(() => {
    if (!selectedProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = modalContentRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      wasModalOpenRef.current = true;
      return;
    }

    if (wasModalOpenRef.current) {
      activeTriggerRef.current?.focus();
      wasModalOpenRef.current = false;
    }
  }, [selectedProject]);

  const openProject = (project, triggerElement) => {
    activeTriggerRef.current = triggerElement;
    setSelectedProject(project);
  };
  const closeProject = () => setSelectedProject(null);
  const getCaseStudyMailto = (projectTitle) =>
    `mailto:${CASE_STUDY_EMAIL}?subject=${encodeURIComponent(`Case study request: ${projectTitle}`)}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: "easeOut",
      },
    },
  };

  const modalTitleId = selectedProject ? `project-modal-title-${selectedProject.id}` : undefined;
  const modalDescriptionId = selectedProject ? `project-modal-description-${selectedProject.id}` : undefined;

  const renderIcon = (iconName) => {
    if (!iconName) return null;
    const LucideIcon = projectIconMap[iconName];
    if (!LucideIcon) return null;
    return <LucideIcon size={32} strokeWidth={1.5} className="lucide-icon text-accent opacity-90" />;
  };

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <motion.div className="projects-container" initial="hidden" animate={inView ? "visible" : "hidden"}>
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        >
          <h2 className="section-title">{projects.title}</h2>
          <p className="section-subtitle">{projects.subtitle}</p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="projects-grid" variants={containerVariants}>
          {projects.items.map((project) => (
            <motion.button
              key={project.id}
              type="button"
              className="project-card"
              variants={cardVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -10 }}
              onClick={(event) => openProject(project, event.currentTarget)}
              aria-haspopup="dialog"
              aria-label={`Open details for ${project.title}`}
            >
              <div className="project-card-inner">
                <div className="project-gradient" style={{ background: project.gradient }} />
                <div className="project-icon">{renderIcon(project.icon)}</div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <span className={`project-proof-badge ${project.linkStatus}`}>{getProofLabel(project.linkStatus)}</span>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tags">
                    {project.badges && project.badges.map((badge, index) => (
                      <span key={`badge-${index}`} className={`outcome-badge badge-${badge}`}>
                        {badge}
                      </span>
                    ))}
                    {project.stack.slice(0, 3).map((tag, index) => (
                      <span key={index} className="project-tag">
                        {tag}
                      </span>
                    ))}
                    {project.stack.length > 3 && <span className="project-tag more">+{project.stack.length - 3}</span>}
                  </div>

                  <div className="project-cta">
                    <span className="view-details">View Details →</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          className="projects-footer"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.6, duration: shouldReduceMotion ? 0 : 0.6 }}
        >
          <motion.a
            href="https://github.com/adrikosm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-large"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faGithub} style={{ marginRight: "8px" }} />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onClick={closeProject}
          >
            <motion.div
              ref={modalContentRef}
              className="modal-content"
              initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby={modalTitleId}
              aria-describedby={modalDescriptionId}
            >
              <button ref={closeButtonRef} type="button" className="modal-close" onClick={closeProject} aria-label="Close modal">
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <div className="modal-header" style={{ background: selectedProject.gradient }}>
                <div className="modal-icon">{renderIcon(selectedProject.icon)}</div>
                <h2 id={modalTitleId} className="modal-title">
                  {selectedProject.title}
                </h2>
              </div>

              <div className="modal-body">
                <p id={modalDescriptionId} className="modal-description">
                  {selectedProject.longDescription}
                </p>

                <div className="modal-section">
                  <h3 className="modal-section-title">Project Breakdown</h3>
                  <ul className="achievements-list">
                    <li>{selectedProject.problem}</li>
                    <li>{selectedProject.architecture}</li>
                    <li>{selectedProject.constraints}</li>
                    <li>{selectedProject.decisions}</li>
                    <li>{selectedProject.results}</li>
                  </ul>
                </div>

                <div className="modal-section">
                  <h3 className="modal-section-title">Key Achievements</h3>
                  <ul className="achievements-list">
                    {selectedProject.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                {selectedProject.improvements && (
                  <div className="modal-section">
                    <h3 className="modal-section-title">Future Improvements</h3>
                    <p className="modal-description">{selectedProject.improvements}</p>
                  </div>
                )}

                <div className="modal-section">
                  <h3 className="modal-section-title">Technologies & Outcomes</h3>
                  <div className="modal-tags">
                    {selectedProject.badges && selectedProject.badges.map((badge, index) => (
                      <span key={`badge-${index}`} className={`outcome-badge badge-${badge}`}>
                        {badge}
                      </span>
                    ))}
                    {selectedProject.stack.map((tag, index) => (
                      <span key={`stack-${index}`} className="modal-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  <p className="modal-proof-note">{selectedProject.proofNote}</p>

                  {selectedProject.linkStatus === "public" && selectedProject.github && (
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                    >
                      <FontAwesomeIcon icon={faGithub} style={{ marginRight: "8px" }} />
                      View on GitHub
                    </motion.a>
                  )}

                  {selectedProject.linkStatus === "private" && (
                    <motion.a
                      href={getCaseStudyMailto(selectedProject.title)}
                      className="btn btn-outline"
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                    >
                      <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "8px" }} />
                      Request Case Study
                    </motion.a>
                  )}

                  {selectedProject.linkStatus === "coming_soon" && (
                    <button type="button" className="btn btn-outline modal-btn-disabled" disabled>
                      Case Study Coming Soon
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
