/**
 * Sparkle Nails - Main JavaScript File
 * Handles all interactive elements for our super girly nail salon website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initGalleryFilter();
    initTestimonialSlider();
    initAnimations();
    initContactForm();
    lazyLoadImages();
    initMobileTouchEffects(); // Add mobile touch effects
    
    // Add sparkle cursor effect to the body
    document.body.classList.add('heart-cursor');
});

/**
 * Apply lazy loading to all images on the page
 */
function lazyLoadImages() {
    // Find all images on the page
    const images = document.querySelectorAll('img');
    
    // Add loading="lazy" attribute to all images that don't already have it
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

/**
 * Handle navigation functionality
 */
function initNavigation() {
    const header = document.querySelector('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle scroll effects for header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        highlightActiveNavLink();
    });
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navList.classList.toggle('open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navList.classList.contains('open') && 
            !e.target.closest('.nav-list') && 
            !e.target.closest('.mobile-toggle')) {
            navList.classList.remove('open');
        }
    });
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('open');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip empty hash links
            if (this.getAttribute('href') === '#') return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Highlight the active navigation link based on scroll position
 */
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Get current scroll position
    const scrollPosition = window.scrollY + 100; // Offset for header height
    
    // Find the current section
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    // Update active class on navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Handle gallery filtering functionality
 */
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length && galleryItems.length) {
        // Set up click event for each filter button
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Handle testimonial slider functionality
 */
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length && dots.length) {
        let currentIndex = 0;
        
        // Show first testimonial by default
        showTestimonial(0);
        
        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
                currentIndex = index;
            });
        });
        
        // Auto rotate testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
        
        // Function to show a specific testimonial
        function showTestimonial(index) {
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            // Show selected testimonial
            testimonials[index].style.display = 'block';
            
            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }
    }
}

/**
 * Initialize scroll animations
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                // Stop observing once the animation has been triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Start observing elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Handle contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            
            // Validate fields
            let isValid = true;
            
            if (!nameField.value.trim()) {
                showError(nameField, 'Please enter your name');
                isValid = false;
            } else {
                clearError(nameField);
            }
            
            if (!emailField.value.trim()) {
                showError(emailField, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailField.value.trim())) {
                showError(emailField, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(emailField);
            }
            
            if (!messageField.value.trim()) {
                showError(messageField, 'Please enter your message');
                isValid = false;
            } else {
                clearError(messageField);
            }
            
            // If form is valid, simulate form submission
            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending...';
                
                // Simulate form submission (would be replaced with actual API call)
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                    
                    // Show success message
                    const formWrapper = contactForm.parentElement;
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.style.padding = '15px';
                    successMessage.style.marginTop = '15px';
                    successMessage.style.backgroundColor = '#d4edda';
                    successMessage.style.color = '#155724';
                    successMessage.style.borderRadius = '5px';
                    successMessage.style.textAlign = 'center';
                    successMessage.innerText = 'Thank you! Your message has been sent successfully.';
                    
                    formWrapper.appendChild(successMessage);
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
        
        // Add input event listeners to clear errors when typing
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                clearError(this);
            });
        });
    }
    
    // Helper functions for form validation
    function showError(field, message) {
        // Get the parent form group
        const formGroup = field.closest('.form-group');
        
        // Remove existing error message if any
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and add error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.style.color = '#ff4057';
        errorMessage.style.fontSize = '0.8rem';
        errorMessage.style.marginTop = '5px';
        errorMessage.innerText = message;
        
        formGroup.appendChild(errorMessage);
        
        // Add error style to the input
        field.style.borderColor = '#ff4057';
    }
    
    function clearError(field) {
        // Get the parent form group
        const formGroup = field.closest('.form-group');
        
        // Remove error message if exists
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        
        // Reset input style
        field.style.borderColor = '';
    }
    
    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

/**
 * Add glitter effect to elements
 */
function addGlitter() {
    const glitterElements = document.querySelectorAll('.add-glitter');
    
    glitterElements.forEach(element => {
        element.classList.add('glitter');
    });
}

/**
 * Enhance touch interaction for mobile devices
 * Makes buttons and cards feel more responsive on touch
 */
function initMobileTouchEffects() {
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        // Add active state class on touch start
        button.addEventListener('touchstart', function(e) {
            this.classList.add('touch-active');
        }, {passive: true});
        
        // Remove active state on touch end
        button.addEventListener('touchend', function(e) {
            this.classList.remove('touch-active');
        }, {passive: true});
        
        // Remove active state if touch is moved away
        button.addEventListener('touchmove', function(e) {
            const touch = e.touches[0];
            const rect = this.getBoundingClientRect();
            
            // Check if finger moved outside the button
            if (touch.clientX < rect.left || touch.clientX > rect.right || 
                touch.clientY < rect.top || touch.clientY > rect.bottom) {
                this.classList.remove('touch-active');
            }
        }, {passive: true});
    });
    
    // Add touch feedback to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Add active state on touch start
        card.addEventListener('touchstart', function(e) {
            this.classList.add('touch-active');
            
            // Create ripple effect
            const rect = this.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'touch-ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 700);
        }, {passive: true});
        
        // Remove active state on touch end
        card.addEventListener('touchend', function(e) {
            this.classList.remove('touch-active');
        }, {passive: true});
    });
    
    // Add touch feedback to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        // Add active state on touch start
        item.addEventListener('touchstart', function(e) {
            this.classList.add('touch-active');
        }, {passive: true});
        
        // Remove active state on touch end
        item.addEventListener('touchend', function(e) {
            this.classList.remove('touch-active');
            
            // Add a slight delay before removing the active state
            // This makes the touch feedback more noticeable
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 200);
        }, {passive: true});
    });
}

// Call glitter effect after a short delay to ensure page is loaded
setTimeout(addGlitter, 500);