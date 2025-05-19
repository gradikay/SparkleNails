/**
 * Elegance Nail Salon - Main JavaScript
 * Handles core functionality: navigation, animations, and global features
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // DOM Elements
    const header = document.getElementById('header');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const serviceLists = document.querySelectorAll('.service-list');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    // Variables
    let currentTestimonial = 0;

    /**
     * Initialize all event listeners and functionality
     */
    function init() {
        // Mobile Navigation Toggle
        hamburger.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Service tabs functionality
        tabButtons.forEach(button => {
            button.addEventListener('click', switchServiceTab);
        });

        // Scrolling events and animations
        window.addEventListener('scroll', handleScroll);

        // Testimonial slider controls
        setupTestimonialControls();

        // Back to top button click event
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', scrollToTop);
        }

        // Initial calls to set up the page state
        checkScrollPosition();
        activateScrollAnimations();
        toggleBackToTopButton();
    }
    
    /**
     * Scroll to top of the page with smooth animation
     */
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Toggle mobile menu visibility
     */
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    /**
     * Handle scrolling events: sticky header, back to top button, and active nav links
     */
    function handleScroll() {
        checkScrollPosition();
        highlightActiveNavLink();
        toggleBackToTopButton();
    }

    /**
     * Check scroll position to toggle header styles
     */
    function checkScrollPosition() {
        if (window.scrollY > 300) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    /**
     * Toggle back to top button visibility based on scroll position
     */
    function toggleBackToTopButton() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    /**
     * Highlight the corresponding nav link when scrolling through sections
     */
    function highlightActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Switch between service tabs
     */
    function switchServiceTab(e) {
        // Remove active class from all buttons and service lists
        tabButtons.forEach(btn => btn.classList.remove('active'));
        serviceLists.forEach(list => list.classList.remove('active'));
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Show the corresponding service list
        const category = e.target.dataset.category;
        document.getElementById(category).classList.add('active');
    }

    /**
     * Set up testimonial slider controls
     */
    function setupTestimonialControls() {
        // Check if testimonial elements exist before setting up controls
        if (testimonialSlides.length > 0) {
            // Next testimonial button
            if (nextTestimonialBtn) {
                nextTestimonialBtn.addEventListener('click', () => {
                    updateTestimonial(currentTestimonial + 1);
                });
            }
            
            // Previous testimonial button
            if (prevTestimonialBtn) {
                prevTestimonialBtn.addEventListener('click', () => {
                    updateTestimonial(currentTestimonial - 1);
                });
            }
            
            // Dot navigation
            if (testimonialDots.length > 0) {
                testimonialDots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        updateTestimonial(index);
                    });
                });
            }
            
            // Auto-advance testimonials every 6 seconds
            setInterval(() => {
                updateTestimonial(currentTestimonial + 1);
            }, 6000);
        }
    }

    /**
     * Update the active testimonial
     * @param {number} index - The index of the testimonial to show
     */
    function updateTestimonial(index) {
        // Handle wrapping around
        if (index < 0) {
            index = testimonialSlides.length - 1;
        } else if (index >= testimonialSlides.length) {
            index = 0;
        }
        
        // Update current index
        currentTestimonial = index;
        
        // Remove active class from all slides and dots
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        testimonialSlides[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }

    /**
     * Activate scroll animations for elements
     */
    function activateScrollAnimations() {
        // Options for the Intersection Observer
        const options = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of the element visible
        };
        
        // Callback function for the Intersection Observer
        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target); // Stop observing once animation is triggered
                }
            });
        };
        
        // Create an Intersection Observer with the callback
        const observer = new IntersectionObserver(callback, options);
        
        // Target elements to animate
        const animateElements = document.querySelectorAll('.section-header, .service-item, .gallery-item, .about-content, .info-item, .booking-form');
        
        // Observe each element
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't override normal link behavior for empty href
            if (this.getAttribute('href') === '#') {
                return;
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                // Calculate header height for offset
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // No back-to-top buttons anymore

    // Initialize everything
    init();
});
