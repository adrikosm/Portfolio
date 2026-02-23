import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { profileData } from "../../data/profileData";
import "./impact.css";

const ImpactMetrics = () => {
  const shouldReduceMotion = useReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { title, subtitle, cards } = profileData.impactMetrics;

  return (
    <section id="impact" className="impact-section" ref={ref}>
      <motion.div
        className="impact-container"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
      >
        <div className="section-header impact-header">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
          <p className="impact-updated">Profile data last updated: {profileData.lastUpdated}</p>
        </div>

        <div className="impact-grid">
          {cards.map((metric, index) => (
            <motion.article
              key={metric.id}
              className="impact-card"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.08 * index, duration: shouldReduceMotion ? 0 : 0.45 }}
            >
              <div className="impact-card-top">
                <span className="impact-value">{metric.value}</span>
                <details className="impact-tooltip-details" data-testid={`impact-details-${metric.id}`}>
                  <summary className="impact-tooltip" aria-label={`More context for ${metric.label}`}>
                    i
                  </summary>
                  <p className="impact-tooltip-content">{metric.timeframe} · Source: {metric.provenance}</p>
                </details>
              </div>
              <h3 className="impact-label">{metric.label}</h3>
              <p className="impact-context">{metric.context}</p>
              <p className="impact-meta">{metric.timeframe} · {metric.provenance}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ImpactMetrics;
