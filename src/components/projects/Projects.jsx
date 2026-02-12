import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import './projects.css';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState(null);

  // Project data - Real achievements from PowerPoints
  const projects = [
    {
      id: 1,
      title: "Enterprise Data Quality Framework",
      description: "Built comprehensive testing suite that caught 60% more data issues before production",
      longDescription: "After dealing with too many production incidents from bad data, I built a comprehensive dbt testing framework with 500+ custom tests. The hardest part wasn't writing tests - it was convincing the team to slow down deploys to fix the root causes. Took 3 months to implement properly, including custom generic tests for our specific business rules. Now data quality incidents are down 60% and we catch issues in CI before they hit Snowflake.",
      tags: ["dbt", "Snowflake", "SQL", "Testing", "Data Quality"],
      icon: "✓",
      gradient: "linear-gradient(135deg, #0077B3 0%, #A3D1E0 100%)",
      achievements: [
        "500+ custom dbt tests for schema validation and business rules",
        "Reduced production data quality incidents by 60%",
        "Created reusable generic test library adopted across 15+ projects",
        "Integrated automated testing in CI/CD pipeline catching issues pre-deploy",
        "Challenge: Balancing test coverage vs pipeline runtime (optimized to <10min)"
      ],
      github: "https://github.com/adrikosm/dbt-data-quality",
      demo: "#"
    },
    {
      id: 2,
      title: "dbt Macro Library & Code Standardization",
      description: "Cut SQL code by 60% building reusable Jinja macros - now an internal company package",
      longDescription: "Our dbt project had 15K+ lines of repetitive SQL across 200+ models. I spent 2 weeks analyzing patterns and built 20+ reusable Jinja macros for common transformations (pivot tables, column existence checks, surrogate keys, etc). The macro library reduced our codebase from 15K to 6K lines. Biggest challenge was convincing senior engineers to refactor existing models - showed them the maintenance burden reduction and they were sold. Now it's a packaged repo used by 5 teams company-wide.",
      tags: ["dbt", "Jinja", "SQL", "Snowflake", "Code Optimization"],
      icon: "🔧",
      gradient: "linear-gradient(135deg, #00b9e8 0%, #0077B3 100%)",
      achievements: [
        "Created 20+ production-ready Jinja macros reducing code from 15K to 6K lines",
        "Packaged as internal dbt library adopted by 5 teams across company",
        "Reduced new model development time by 40% through standardization",
        "Macro types: pivot_table(), column_exists(), generate_surrogate_key(), etc",
        "Challenge: Backward compatibility when refactoring 200+ existing models"
      ],
      github: "https://github.com/adrikosm/dbt-macro-library",
      demo: "#"
    },
    {
      id: 3,
      title: "Snowflake Cost & Performance Optimization",
      description: "Saved $15K/month in Snowflake costs through query optimization and warehouse tuning",
      longDescription: "Our monthly Snowflake bill hit $45K and leadership wanted answers. I spent a week in query_history analyzing the worst offenders - found that 80% of compute came from 20 poorly-written queries. Implemented clustering keys on large tables (100M+ rows), converted full-refresh to incremental models, and right-sized warehouses (we were using XL when M would suffice). The hardest part was a query that scanned 5TB daily - rewrote it using incremental snapshots. Reduced monthly costs to $30K while improving query performance 35%.",
      tags: ["dbt", "Snowflake", "SQL", "Performance Tuning", "Cost Optimization"],
      icon: "⚡",
      gradient: "linear-gradient(135deg, #A3D1E0 0%, #0077B3 100%)",
      achievements: [
        "Reduced monthly Snowflake costs from $45K to $30K (33% savings)",
        "Improved query performance by 35% through clustering keys & materialized views",
        "Converted 50+ full-refresh models to incremental (5TB scan → 50GB incremental)",
        "Right-sized warehouses: downgraded XL→M for 70% of workloads",
        "Challenge: Optimizing a 5TB daily scan query without changing upstream systems"
      ],
      github: "https://github.com/adrikosm/snowflake-optimization",
      demo: "#"
    },
    {
      id: 4,
      title: "Real-Time Streaming Pipeline (Kafka + Spark)",
      description: "Built event streaming pipeline processing 50K events/min with sub-second latency",
      longDescription: "Business needed real-time analytics on user events - batch processing wasn't cutting it. Built a streaming pipeline using Kafka for ingestion and Spark Structured Streaming for processing. Hardest challenge was handling late-arriving events and exactly-once processing semantics. Had to deal with Kafka rebalancing issues at scale (partitions kept reassigning under load). Solution: tuned consumer configs and implemented proper windowing with watermarks. Now processes 50K events/minute with <1sec end-to-end latency. Learned a lot about distributed systems failure modes.",
      tags: ["Kafka", "Spark", "Streaming", "Python", "Real-time Analytics"],
      icon: "🔄",
      gradient: "linear-gradient(135deg, #0077B3 0%, #00b9e8 100%)",
      achievements: [
        "Processes 50K events/minute with sub-second latency",
        "Implemented exactly-once processing using Kafka transactions",
        "Built watermarking strategy for handling late-arriving events (up to 1 hour late)",
        "Handles Kafka rebalancing gracefully through consumer config tuning",
        "Challenge: Debugging partition assignment issues under heavy load"
      ],
      github: "https://github.com/adrikosm/kafka-spark-streaming",
      demo: "#"
    },
    {
      id: 5,
      title: "Infrastructure as Code (Terraform + CI/CD)",
      description: "Automated data infrastructure deployment - reduced setup time from 2 days to 10 minutes",
      longDescription: "We were manually provisioning Snowflake warehouses, databases, and schemas - taking 2 days per new environment. I championed moving to Terraform despite team resistance ('it's too complex'). Built modules for Snowflake resources (warehouses, databases, roles, grants) and integrated with Azure DevOps CI/CD. Biggest hurdle was managing state files securely and handling resource dependencies. Had one incident where I accidentally deleted a prod schema (rolled back using state file backup - lesson learned about workspace isolation). Now we spin up complete environments in 10 minutes with full git history.",
      tags: ["Terraform", "IaC", "CI/CD", "Azure DevOps", "Snowflake", "Automation"],
      icon: "📊",
      gradient: "linear-gradient(135deg, #00b9e8 0%, #A3D1E0 100%)",
      achievements: [
        "Reduced environment provisioning from 2 days to 10 minutes",
        "Built reusable Terraform modules for Snowflake (warehouses, databases, RBAC)",
        "Integrated IaC with Azure DevOps pipelines (plan on PR, apply on merge)",
        "Implemented workspace isolation preventing cross-environment accidents",
        "Challenge: Recovering from accidental prod schema deletion (state file saved us)"
      ],
      github: "https://github.com/adrikosm/terraform-snowflake-modules",
      demo: "#"
    },
    {
      id: 6,
      title: "GDPR-Compliant Data Migration (500GB+ Excel → PostgreSQL)",
      description: "Migrated sensitive client data handling PII, encryption, and GDPR compliance requirements",
      longDescription: "Client had 500GB+ of Excel files with customer PII they needed in PostgreSQL. Couldn't just bulk load - needed GDPR compliance (data minimization, encryption at rest, audit logging). Built Python ETL with pandas for data cleaning, pgcrypto for column-level encryption, and implemented right-to-be-forgotten workflows. Biggest challenge was inconsistent Excel schemas across 1000+ files - used fuzzy matching to map columns. Also had to handle encoding issues (files were mix of UTF-8 and Windows-1252). Took 6 weeks but we processed everything with full audit trails and zero PII leaks.",
      tags: ["Python", "PostgreSQL", "GDPR", "Data Migration", "Data Privacy"],
      icon: "🗄️",
      gradient: "linear-gradient(135deg, #0077B3 0%, #00b9e8 100%)",
      achievements: [
        "Migrated 500GB+ Excel data with GDPR compliance (PII handling, encryption)",
        "Processed 1000+ files with inconsistent schemas using fuzzy column matching",
        "Implemented column-level encryption (pgcrypto) and audit logging",
        "Built right-to-be-forgotten workflow for GDPR Article 17 compliance",
        "Challenge: Handling mixed file encodings (UTF-8, Windows-1252) causing corruption"
      ],
      github: "https://github.com/adrikosm/excel-postgresql-gdpr-migration",
      demo: "#"
    }
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <motion.div
        className="projects-container"
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
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Real data engineering work - from initial struggles to production wins
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="projects-grid"
          variants={containerVariants}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={cardVariants}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-card-inner">
                {/* Card Background Gradient */}
                <div
                  className="project-gradient"
                  style={{ background: project.gradient }}
                />

                {/* Project Icon */}
                <div className="project-icon">{project.icon}</div>

                {/* Project Content */}
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  {/* Tags */}
                  <div className="project-tags">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="project-tag">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="project-tag more">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="project-cta">
                    <span className="view-details">View Details →</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          className="projects-footer"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.a
            href="https://github.com/adrikosm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faGithub} style={{ marginRight: '8px' }} />
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
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              {/* Modal Header */}
              <div
                className="modal-header"
                style={{ background: selectedProject.gradient }}
              >
                <div className="modal-icon">{selectedProject.icon}</div>
                <h2 className="modal-title">{selectedProject.title}</h2>
              </div>

              {/* Modal Body */}
              <div className="modal-body">
                <p className="modal-description">{selectedProject.longDescription}</p>

                {/* Achievements */}
                <div className="modal-section">
                  <h3 className="modal-section-title">Key Achievements</h3>
                  <ul className="achievements-list">
                    {selectedProject.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="modal-section">
                  <h3 className="modal-section-title">Technologies Used</h3>
                  <div className="modal-tags">
                    {selectedProject.tags.map((tag, index) => (
                      <span key={index} className="modal-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="modal-actions">
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FontAwesomeIcon icon={faGithub} style={{ marginRight: '8px' }} />
                    View on GitHub
                  </motion.a>
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
