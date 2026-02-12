// Andreas Mavropoulos Portfolio - Main JavaScript

class PortfolioApp {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupTypewriter();
        this.setupParticles();
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupContactForm();
        this.setupScrollTop();
        this.setupMobileMenu();
    }

    // Theme Management
    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        const body = document.body;

        // Set initial theme
        body.setAttribute('data-theme', this.theme);
        themeToggle.textContent = this.theme === 'light' ? '🌙' : '☀️';

        themeToggle.addEventListener('click', () => {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            body.setAttribute('data-theme', this.theme);
            themeToggle.textContent = this.theme === 'light' ? '🌙' : '☀️';
            localStorage.setItem('theme', this.theme);

            // Animate theme change
            anime({
                targets: themeToggle,
                rotate: '360deg',
                duration: 500,
                easing: 'easeInOutQuad'
            });
        });
    }

    // Typewriter Effect
    setupTypewriter() {
        const nameTyped = new Typed('#typedName', {
            strings: ['Andreas Mavropoulos'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: false,
            showCursor: true,
            cursorChar: '|'
        });

        const roleTyped = new Typed('#typedRole', {
            strings: ['Data Engineer', 'Backend Developer', 'Cloud Architect', 'ML Engineer'],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 2000,
            startDelay: 3000,
            loop: true,
            showCursor: false
        });
    }

    // Particle Background
    setupParticles() {
        let particles = [];
        let canvas, ctx;
        let animationId;

        function initParticles() {
            canvas = document.getElementById('particles-canvas');
            if (!canvas) return;
            
            ctx = canvas.getContext('2d');
            resizeCanvas();
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
            
            animate();
        }

        function resizeCanvas() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function animate() {
            if (!ctx || !canvas) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 124, 237, ${particle.opacity})`;
                ctx.fill();
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(0, 124, 237, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
            
            animationId = requestAnimationFrame(animate);
        }

        // Initialize particles after page load
        window.addEventListener('load', initParticles);
        window.addEventListener('resize', resizeCanvas);
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Navbar scroll effect
        let lastScrollY = window.scrollY;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                navbar.style.backdropFilter = 'blur(10px)';
            }

            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active link highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Contact Form
    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (this.validateForm(data)) {
                this.submitForm(data);
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateForm(data) {
        let isValid = true;
        
        if (!data.name.trim()) {
            this.showFieldError('name', 'Name is required');
            isValid = false;
        }
        
        if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) {
            this.showFieldError('email', 'Valid email is required');
            isValid = false;
        }
        
        if (!data.message.trim()) {
            this.showFieldError('message', 'Message is required');
            isValid = false;
        }
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        this.clearFieldError(fieldName);
        
        switch (fieldName) {
            case 'name':
                if (!value) {
                    this.showFieldError(fieldName, 'Name is required');
                    return false;
                }
                break;
            case 'email':
                if (!value) {
                    this.showFieldError(fieldName, 'Email is required');
                    return false;
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    this.showFieldError(fieldName, 'Please enter a valid email');
                    return false;
                }
                break;
            case 'message':
                if (!value) {
                    this.showFieldError(fieldName, 'Message is required');
                    return false;
                }
                break;
        }
        
        return true;
    }

    showFieldError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        const errorElement = field.parentNode.querySelector('.error-message');
        
        field.style.borderColor = '#ef4444';
        
        if (!errorElement) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.style.color = '#ef4444';
            error.style.fontSize = '0.875rem';
            error.style.marginTop = '0.5rem';
            error.textContent = message;
            field.parentNode.appendChild(error);
        } else {
            errorElement.textContent = message;
        }
    }

    clearFieldError(fieldName) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        const errorElement = field.parentNode.querySelector('.error-message');
        
        field.style.borderColor = '';
        
        if (errorElement) {
            errorElement.remove();
        }
    }

    submitForm(data) {
        const submitButton = document.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            // Show success message
            this.showSuccessMessage();
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    showSuccessMessage() {
        const form = document.getElementById('contactForm');
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="
                background: #10b981;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                text-align: center;
                animation: slideIn 0.3s ease;
            ">
                ✓ Message sent successfully! I'll get back to you soon.
            </div>
        `;
        
        form.parentNode.insertBefore(successDiv, form);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Scroll to Top
    setupScrollTop() {
        const scrollTopBtn = document.getElementById('scrollTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenu');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                
                // Animate hamburger menu
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach((span, index) => {
                    if (navLinks.classList.contains('active')) {
                        if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        if (index === 1) span.style.opacity = '0';
                        if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        span.style.transform = '';
                        span.style.opacity = '';
                    }
                });
            });
        }
    }
}

// Enhanced hover effects for interactive elements
function setupHoverEffects() {
    // Skill tags hover effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            anime({
                targets: tag,
                scale: 1.1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        tag.addEventListener('mouseleave', () => {
            anime({
                targets: tag,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });

    // Project cards hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -10,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button, .project-link, .contact-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Performance optimization
function setupPerformanceOptimizations() {
    // Debounced scroll handler
    let scrollTimeout;
    function debouncedScrollHandler() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Handle scroll events here
        }, 16); // ~60fps
    }
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    setupHoverEffects();
    setupPerformanceOptimizations();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        .pulse-animation {
            animation: pulse 2s infinite;
        }
        
        .nav-links a.active::after {
            width: 100% !important;
        }
        
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex !important;
                position: absolute;
                top: 80px;
                left: 0;
                right: 0;
                background: var(--bg-primary);
                flex-direction: column;
                padding: 2rem;
                box-shadow: 0 10px 30px var(--shadow-medium);
                border-top: 1px solid var(--border-color);
            }
            
            .nav-links.active li {
                margin: 1rem 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}