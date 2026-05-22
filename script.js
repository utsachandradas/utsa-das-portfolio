document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Reveal Animation - Works with both .reveal and data-reveal
    const reveals = document.querySelectorAll(".reveal, [data-reveal]");

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 2. FAQ Accordion Logic - Works with both button and div implementations
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        if (question) {
            question.addEventListener("click", () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove("active");
                    }
                });
                item.classList.toggle("active");
                
                // Update aria-expanded for accessibility
                if (question.tagName === "BUTTON") {
                    const isExpanded = item.classList.contains("active");
                    question.setAttribute("aria-expanded", isExpanded);
                }
            });
        }
    });

    // 3. Mobile Menu Interactivity - Works with both .menu-toggle and .mobile-toggle
    const menuToggle = document.querySelector(".menu-toggle, .mobile-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const body = document.body;

    if (menuToggle && mobileMenu) {
        function toggleMenu() {
            menuToggle.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            body.classList.toggle("menu-open");
        }

        menuToggle.addEventListener("click", toggleMenu);

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                if (mobileMenu.classList.contains("active")) {
                    toggleMenu();
                }
            }
        });
    }

    // 4. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (this.classList.contains("mobile-nav-link") || this.classList.contains("mobile-menu-links a")) {
                    const mobileMenuElement = document.querySelector(".mobile-menu");
                    const menuToggleElement = document.querySelector(".menu-toggle, .mobile-toggle");
                    if (mobileMenuElement && mobileMenuElement.classList.contains("active")) {
                        menuToggleElement.classList.remove("active");
                        mobileMenuElement.classList.remove("active");
                        body.classList.remove("menu-open");
                    }
                }

                // Calculate scroll position accounting for fixed navbar
                const navbar = document.querySelector('.navbar, nav[role="navigation"]');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 5. Mobile Navigation Toggle for inner pages
    const mobileToggle = document.querySelector(".mobile-toggle");
    if (mobileToggle) {
        mobileToggle.addEventListener("click", function() {
            this.classList.toggle("active");
            const nav = document.querySelector("nav[role='navigation']");
            if (nav) {
                const navLinks = nav.querySelector(".nav-links");
                if (navLinks) {
                    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
                }
            }
        });
    }

    // 6. Navbar scroll effect - Add shadow on scroll
    const navbar = document.querySelector('.navbar, nav[role="navigation"]');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }
});
