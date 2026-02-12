// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }
}

// Navigation Manager
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        
        this.init();
    }
    
    init() {
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Handle scroll events for active link highlighting
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }
    
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        this.closeMobileMenu();
    }
    
    handleScroll() {
        const scrollPos = window.scrollY + 100; // Offset for navbar height
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.setActiveLink(sectionId);
            }
        });
    }
    
    setActiveLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Scroll to Top Manager
class ScrollToTopManager {
    constructor() {
        this.scrollButton = document.getElementById('scrollToTop');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.scrollButton.addEventListener('click', () => this.scrollToTop());
    }
    
    handleScroll() {
        if (window.scrollY > 300) {
            this.scrollButton.classList.add('visible');
        } else {
            this.scrollButton.classList.remove('visible');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Contact Form Manager
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.toast = document.getElementById('toast');
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Validate form data
        if (!this.validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        try {
            await this.submitForm(data);
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            this.showErrorMessage();
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }
    
    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.name.trim()) {
            this.showValidationError('Please enter your name.');
            return false;
        }
        
        if (!emailRegex.test(data.email)) {
            this.showValidationError('Please enter a valid email address.');
            return false;
        }
        
        if (!data.message.trim()) {
            this.showValidationError('Please enter a message.');
            return false;
        }
        
        return true;
    }
    
    async submitForm(data) {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve();
            }, 1500);
        });
    }
    
    showSuccessMessage() {
        this.showToast('Message sent successfully!', 'success');
    }
    
    showErrorMessage() {
        this.showToast('Failed to send message. Please try again.', 'error');
    }
    
    showValidationError(message) {
        this.showToast(message, 'warning');
    }
    
    showToast(message, type = 'success') {
        const toastMessage = this.toast.querySelector('.toast-message');
        const toastIcon = this.toast.querySelector('.toast-icon');
        
        // Reset any existing classes and styles
        this.toast.classList.remove('show', 'hidden');
        
        // Update message and icon based on type
        toastMessage.textContent = message;
        switch (type) {
            case 'success':
                toastIcon.textContent = '✓';
                this.toast.style.backgroundColor = 'var(--color-success)';
                break;
            case 'error':
                toastIcon.textContent = '✗';
                this.toast.style.backgroundColor = 'var(--color-error)';
                break;
            case 'warning':
                toastIcon.textContent = '⚠';
                this.toast.style.backgroundColor = 'var(--color-warning)';
                break;
        }
        
        // Force a reflow to ensure the initial state is applied
        this.toast.offsetHeight;
        
        // Show toast immediately
        this.toast.classList.add('show');
        
        console.log('Toast shown:', message, type); // Debug log
        
        // Hide toast after 4 seconds
        setTimeout(() => {
            this.toast.classList.remove('show');
            setTimeout(() => {
                this.toast.classList.add('hidden');
            }, 300);
        }, 4000);
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.animatedElements = document.querySelectorAll('.skill-category, .project-card, .about-text, .contact-info, .contact-form');
        this.init();
    }
    
    init() {
        // Add fade-in class to elements
        this.animatedElements.forEach(element => {
            element.classList.add('fade-in');
        });
        
        // Set up intersection observer for fade-in animations
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements
        this.animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Smooth Interactions Manager
class InteractionsManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Add hover effects to skill items
        this.setupSkillHovers();
        
        // Add click effects to buttons
        this.setupButtonEffects();
        
        // Setup parallax effect for hero stars
        this.setupParallaxEffect();
    }
    
    setupSkillHovers() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.05) rotate(1deg)';
                item.style.transition = 'all 0.3s ease';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }
    
    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.position = 'absolute';
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                ripple.style.borderRadius = '50%';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 600ms linear';
                ripple.style.pointerEvents = 'none';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .btn {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
    
    setupParallaxEffect() {
        const stars = document.querySelectorAll('.star');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            stars.forEach((star, index) => {
                const speed = (index + 1) * 0.1;
                star.style.transform = `translate3d(0, ${rate * speed}px, 0)`;
            });
        });
    }
}

// Performance Manager
class PerformanceManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Throttle scroll events
        this.throttledScroll = this.throttle(() => {
            // Scroll-related operations are handled by individual managers
        }, 16); // ~60fps
        
        window.addEventListener('scroll', this.throttledScroll);
        
        // Lazy load images when they come into view
        this.setupLazyLoading();
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Application Initialization
class App {
    constructor() {
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeManagers());
        } else {
            this.initializeManagers();
        }
    }
    
    initializeManagers() {
        // Initialize all managers
        this.themeManager = new ThemeManager();
        this.navigationManager = new NavigationManager();
        this.scrollToTopManager = new ScrollToTopManager();
        this.contactFormManager = new ContactFormManager();
        this.animationManager = new AnimationManager();
        this.interactionsManager = new InteractionsManager();
        this.performanceManager = new PerformanceManager();
        
        // Add loaded class to body for CSS animations
        document.body.classList.add('loaded');
        
        console.log('Portfolio website loaded successfully! 🚀');
    }
}

// Start the application
const app = new App();