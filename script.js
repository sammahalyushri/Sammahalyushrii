// Enhanced Portfolio JavaScript - Modern Transitions & Effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all effects
    initScrollAnimations();
    initHeaderBehavior();
    initSmoothScrolling();
    initLoadingAnimations();
    initInteractiveEffects();
    initParallaxEffects();
    initMobileOptimizations();
});

// Scroll-triggered animations for sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Stagger animation for child elements
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Observe specific elements for staggered animations
    const animateElements = document.querySelectorAll('.education-item, .experience-item, .skills-list li, .reference-item, .trainings-list li');
    animateElements.forEach(el => {
        el.classList.add('stagger-child');
    });
}

// Dynamic header behavior
function initHeaderBehavior() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (scrollY > lastScrollY && scrollY > 200) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

// Enhanced smooth scrolling
function initSmoothScrolling() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Add active state to clicked nav item
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active nav item on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + document.querySelector('header').offsetHeight + 50;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { passive: true });
}

// Loading animations
function initLoadingAnimations() {
    // Add loading class to body initially
    document.body.classList.add('loading');

    // Simulate loading time for visual effect
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');

        // Animate profile picture entrance
        const profilePic = document.querySelector('.profile-pic');
        if (profilePic) {
            profilePic.style.animation = 'profileEntrance 0.8s ease-out forwards';
        }
    }, 300);
}

// Interactive effects
function initInteractiveEffects() {
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.education-item, .experience-item, .skills-list li, .reference-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Ripple effect for buttons and links
    const buttons = document.querySelectorAll('.cert-link, .social-icon');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('#hero h2');
    if (heroTitle) {
        typeWriter(heroTitle, heroTitle.textContent);
    }
}

// Parallax effects
function initParallaxEffects() {
    const hero = document.querySelector('#hero');
    if (!hero) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;

        hero.style.transform = `translateY(${parallax}px)`;

        // Parallax for hero content
        const heroContent = hero.querySelector('.container');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        ticking = false;
    }

    function requestParallax() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestParallax, { passive: true });
}

// Mobile optimizations
function initMobileOptimizations() {
    // Touch feedback for mobile devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');

        // Add touch feedback to interactive elements
        const touchElements = document.querySelectorAll('.education-item, .experience-item, .skills-list li, .reference-item, .cert-link');

        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-feedback');
            });

            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-feedback');
                }, 150);
            });
        });
    }

    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Utility functions
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function typeWriter(element, text) {
    element.textContent = '';
    element.style.opacity = '1';

    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 500);
}

// Add CSS for animations via JavaScript
const animationCSS = `
    /* Scroll animations */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .stagger-child {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .stagger-child.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    /* Header behavior */
    header {
        transition: transform 0.3s ease, backdrop-filter 0.3s ease;
    }

    header.header-hidden {
        transform: translateY(-100%);
    }

    header.scrolled {
        backdrop-filter: blur(20px);
        background: rgba(15, 23, 42, 0.95);
    }

    /* Loading animations */
    body.loading * {
        animation-play-state: paused !important;
    }

    body.loaded {
        animation: fadeIn 0.5s ease-in;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes profileEntrance {
        0% {
            opacity: 0;
            transform: scale(0.3) rotate(-180deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.1) rotate(0deg);
        }
        100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
    }

    /* Ripple effect */
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
        z-index: 1;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    /* Touch feedback */
    .touch-feedback {
        background: var(--primary-light);
        transform: scale(0.98);
    }

    .touch-device .touch-feedback {
        transition: all 0.15s ease;
    }

    /* Active nav item */
    nav a.active {
        background: var(--gradient-primary);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    }

    /* Enhanced card interactions */
    .education-item, .experience-item, .skills-list li, .reference-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Smooth focus styles */
    button:focus, a:focus, input:focus, textarea:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;

// Inject animation CSS
const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);