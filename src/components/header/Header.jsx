import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "./header.css";

const NAV_ITEMS = [
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Certifications", id: "certifications" },
  { name: "Interests", id: "interests" },
  { name: "Contact", id: "contact" }
];

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const lastScrollYRef = useRef(0);
  const menuToggleButtonRef = useRef(null);
  const closeMenuButtonRef = useRef(null);
  const shouldReturnFocusRef = useRef(false);

  // Handle scroll and mouse effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled for styling
      setIsScrolled(currentScrollY > 20);

      // Determine visibility
      if (currentScrollY < 50) {
        setIsVisible(true); // Always visible at top
      } else {
        // Show if scrolling up, hide if scrolling down
        setIsVisible(currentScrollY < lastScrollYRef.current);
      }

      lastScrollYRef.current = currentScrollY;

      const viewportPosition = currentScrollY + 120;
      let nextActive = NAV_ITEMS[0].id;
      for (const item of NAV_ITEMS) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= viewportPosition) {
          nextActive = item.id;
        }
      }
      setActiveSection(nextActive);
    };

    const handleMouseMove = (e) => {
      // Show header if mouse is near the top of the screen
      if (e.clientY < 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const openMenu = () => {
    shouldReturnFocusRef.current = false;
    setIsMenuOpen(true);
  };

  const closeMenu = ({ returnFocus = false } = {}) => {
    shouldReturnFocusRef.current = returnFocus;
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      if (shouldReturnFocusRef.current) {
        menuToggleButtonRef.current?.focus();
        shouldReturnFocusRef.current = false;
      }
      return undefined;
    }

    closeMenuButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu({ returnFocus: true });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Close menu when clicking on a link
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMenu({ returnFocus: false });

    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Header height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: shouldReduceMotion ? 'auto' : 'smooth'
      });
    }
  };

  // Animation variants
  const headerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: "easeOut"
      }
    },
    hidden: {
      y: "-100%",
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: "easeIn"
      }
    }
  };

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: shouldReduceMotion ? 1000 : 400,
        damping: shouldReduceMotion ? 100 : 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: shouldReduceMotion ? 1000 : 300,
        damping: shouldReduceMotion ? 100 : 30,
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: shouldReduceMotion ? 0 : 0.2
      }
    }
  };

  const menuItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: shouldReduceMotion ? 0 : -100 }
      }
    }
  };

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      animate={isVisible ? "visible" : "hidden"}
      variants={headerVariants}
    >
      <nav className="nav-container">
        {/* Logo/Brand */}
        <motion.div
          className="nav-brand"
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          <a href="#about" onClick={(e) => handleNavClick(e, "about")}>
            Andreas M.
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="nav-menu desktop-menu">
          {NAV_ITEMS.map((item, index) => (
            <motion.li
              key={item.id}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.1 * index + 0.6 }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.name}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Social Links & Theme Toggle */}
        <div className="nav-actions">
          <motion.a
            href="https://github.com/adrikosm"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon github"
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 1.1 }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.1, rotate: 5 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/andreas-mavropoulos/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon linkedin"
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 1.2 }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.1, rotate: -5 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </motion.a>

          <motion.button
            onClick={toggleDarkMode}
            className="theme-toggle"
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 1.3 }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.1, rotate: 180 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            aria-label="Toggle theme"
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="mobile-menu-toggle"
            onClick={() => (isMenuOpen ? closeMenu({ returnFocus: true }) : openMenu())}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-panel"
            ref={menuToggleButtonRef}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                className="mobile-menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                onClick={() => closeMenu({ returnFocus: true })}
              />
              <motion.ul
                id="mobile-menu-panel"
                className="mobile-menu"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.li className="mobile-menu-header" variants={menuItemVariants}>
                  <span className="mobile-brand">Menu</span>
                  <button
                    type="button"
                    className="mobile-close-btn"
                    onClick={() => closeMenu({ returnFocus: true })}
                    aria-label="Close menu"
                    ref={closeMenuButtonRef}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </motion.li>

                {NAV_ITEMS.map((item) => (
                  <motion.li
                    key={item.id}
                    variants={menuItemVariants}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                      aria-current={activeSection === item.id ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}

                <motion.li
                  className="mobile-socials"
                  variants={menuItemVariants}
                >
                  <a href="https://github.com/adrikosm" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                  <a href="https://www.linkedin.com/in/andreas-mavropoulos/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </motion.li>
              </motion.ul>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
