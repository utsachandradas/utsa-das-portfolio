document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll progress bar
    initScrollProgress();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize FAQ accordion
    initFAQAccordion();
    
    // Initialize reveal on scroll
    initRevealOnScroll();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize active nav highlighting
    initActiveNav();
    
    // Initialize smooth scroll for anchors
    initSmoothScroll();
    
    // Handle window resize
    handleWindowResize();
});

/**
 * Initialize scroll progress bar
 */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }, { passive: true });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileToggle || !navLinks) return;

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu on link click
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && mobileToggle && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
            if (navLinks.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
}

/**
 * Initialize FAQ accordion
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => otherItem.classList.remove('active'));
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Close FAQ on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            faqItems.forEach(item => item.classList.remove('active'));
        }
    });
}

/**
 * Initialize reveal on scroll with Intersection Observer
 */
function initRevealOnScroll() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    if (!revealElements.length) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Initialize active nav highlighting
 */
function initActiveNav() {
    const navItems = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Handle window resize
 */
function handleWindowResize() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
            }
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            document.body.style.overflow = 'auto';
        }
    }, { passive: true });
}

// Prevent layout shift on scroll
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
if (scrollbarWidth > 0) {
    document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
}

// Add touch support for mobile
document.addEventListener('touchstart', function() {}, false);
