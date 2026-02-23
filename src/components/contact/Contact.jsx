import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import "./contact.css";

const CONTACT_ENDPOINT = process.env.REACT_APP_CONTACT_ENDPOINT?.trim();
const CONTACT_EMAIL = 'adrikosm@gmail.com';
const SUBMIT_COOLDOWN_MS = 12000;
const initialFormData = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

const Contact = () => {
  const shouldReduceMotion = useReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState(() => ({ ...initialFormData }));
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [website, setWebsite] = useState('');
  const lastSubmitRef = useRef(0);
  const successTimerRef = useRef(null);

  useEffect(() => () => {
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }
  }, []);

  const trackEvent = (eventName, payload = {}) => {
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...payload });
    }
  };

  const getErrorId = (fieldName) => `${fieldName}-error`;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Basic email regex validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error immediately when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    if (submitError) {
      setSubmitError('');
    }
  };

  const openMailClient = () => {
    const messageBody = [
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      '',
      formData.message.trim()
    ].join('\n');

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(formData.subject.trim())}&body=${encodeURIComponent(messageBody)}`;
    window.location.href = mailtoUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(false);
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    // Honeypot: ignore obvious bot submissions silently.
    if (website.trim()) {
      return;
    }

    const now = Date.now();
    if (now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) {
      setSubmitError('Please wait a few seconds before submitting again.');
      return;
    }

    lastSubmitRef.current = now;
    setIsSubmitting(true);
    trackEvent('contact_submit_start', {
      method: CONTACT_ENDPOINT ? 'api' : 'mailto'
    });

    try {
      if (CONTACT_ENDPOINT) {
        const response = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim()
          })
        });

        if (!response.ok) {
          throw new Error('Submission failed');
        }
        setSuccessMessage("Message sent successfully. I'll get back to you soon.");
      } else {
        openMailClient();
        setSuccessMessage('Your email client was opened with your message details.');
      }

      setSubmitSuccess(true);
      setFormData({ ...initialFormData });
      setWebsite('');
      trackEvent('contact_submit_success', {
        method: CONTACT_ENDPOINT ? 'api' : 'mailto'
      });

      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
      successTimerRef.current = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('Unable to send right now. Please email me directly at adrikosm@gmail.com.');
      trackEvent('contact_submit_error', {
        method: CONTACT_ENDPOINT ? 'api' : 'mailto',
        message: error instanceof Error ? error.message : 'unknown'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      label: 'Email',
      value: 'adrikosm@gmail.com',
      link: 'mailto:adrikosm@gmail.com',
      color: '#00b9e8'
    },
    {
      icon: faMapMarkerAlt,
      label: 'Location',
      value: 'Frankfurt, Germany',
      color: '#10b981'
    }
  ];

  const socialLinks = [
    {
      icon: faGithub,
      label: 'GitHub',
      url: 'https://github.com/adrikosm',
      color: '#6c72e0'
    },
    {
      icon: faLinkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/andreas-mavropoulos/',
      color: '#0077b5'
    }
  ];

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <motion.div
        className="contact-container"
        initial={{ opacity: 0, x: -100 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ duration: shouldReduceMotion ? 0 : 1.3, ease: "easeOut" }}
      >
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Open to data engineering roles, consulting opportunities, and technical collaboration.
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Info */}
          <motion.div
            className="contact-info-wrapper"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
          >
            <h3 className="contact-info-title">Contact Information</h3>
            <p className="contact-info-description">
              Reach out to discuss data platform architecture, pipeline modernization, or open roles where measurable engineering impact is a priority.
            </p>

            {/* Contact Details */}
            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="contact-detail-item"
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.3 + index * 0.1 }}
                  whileHover={shouldReduceMotion ? undefined : { x: 10 }}
                >
                  <div className="contact-icon" style={{ color: info.color }}>
                    <FontAwesomeIcon icon={info.icon} />
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">{info.label}</span>
                    {info.link ? (
                      <a href={info.link} className="contact-value">
                        {info.value}
                      </a>
                    ) : (
                      <span className="contact-value">{info.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="social-links">
              <h4 className="social-title">Follow Me</h4>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ color: social.color }}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.2, rotate: 5 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
          >
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="honeypot-field" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name Field */}
              <motion.div
                className={`form-group ${errors.name ? 'error' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
              >
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? getErrorId('name') : undefined}
                />
                {errors.name && (
                  <motion.span
                    id={getErrorId('name')}
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  >
                    {errors.name}
                  </motion.span>
                )}
              </motion.div>

              {/* Email Field */}
              <motion.div
                className={`form-group ${errors.email ? 'error' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
              >
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="your.email@example.com"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? getErrorId('email') : undefined}
                />
                {errors.email && (
                  <motion.span
                    id={getErrorId('email')}
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  >
                    {errors.email}
                  </motion.span>
                )}
              </motion.div>

              {/* Subject Field */}
              <motion.div
                className={`form-group ${errors.subject ? 'error' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.5 }}
              >
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="What's this about?"
                  autoComplete="off"
                  required
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? getErrorId('subject') : undefined}
                />
                {errors.subject && (
                  <motion.span
                    id={getErrorId('subject')}
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  >
                    {errors.subject}
                  </motion.span>
                )}
              </motion.div>

              {/* Message Field */}
              <motion.div
                className={`form-group ${errors.message ? 'error' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.6 }}
              >
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Tell me about your project or question..."
                  rows="5"
                  autoComplete="off"
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? getErrorId('message') : undefined}
                />
                {errors.message && (
                  <motion.span
                    id={getErrorId('message')}
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  >
                    {errors.message}
                  </motion.span>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className={`btn btn-primary btn-submit ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.7 }}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '8px' }} />
                    Send Message
                  </>
                )}
              </motion.button>

              {submitError && (
                <p className="submit-error" role="alert" aria-live="assertive">
                  {submitError}
                </p>
              )}

              {!CONTACT_ENDPOINT && (
                <p className="submit-helper">
                  API endpoint is not configured. Submitting opens your email client.
                </p>
              )}
            </form>

            {/* Success Message */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  role="status"
                  aria-live="polite"
                >
                  <div className="success-icon">✓</div>
                  <h4>Message Sent Successfully!</h4>
                  <p>{successMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
