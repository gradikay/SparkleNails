/**
 * Elegance Nail Salon - Navigation Micro-interactions
 * Enhanced interactive effects for navigation elements
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize nav menu item indices for staggered animations
    const navMenuItems = document.querySelectorAll('.nav-menu li');
    navMenuItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    // Add hover effects for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // Add ripple effect on click
        link.addEventListener('click', createRippleEffect);
        
        // Add shine effect on hover
        link.addEventListener('mouseenter', addShineEffect);
        link.addEventListener('mouseleave', removeShineEffect);
    });
    
    // Add special effects to the logo
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('mouseenter', logoHoverEffect);
        logoContainer.addEventListener('mouseleave', logoLeaveEffect);
    }
    
    /**
     * Create a ripple effect when clicking navigation links
     * @param {Event} e - The click event
     */
    function createRippleEffect(e) {
        const link = e.currentTarget;
        
        // Don't create ripple for active link
        if (link.classList.contains('active')) return;
        
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('nav-ripple');
        
        // Position ripple at click point
        const rect = link.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        // Add ripple to link
        link.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    /**
     * Add subtle shine effect on hover
     * @param {Event} e - The mouseenter event
     */
    function addShineEffect(e) {
        const link = e.currentTarget;
        
        // Create shine element
        const shine = document.createElement('span');
        shine.classList.add('nav-shine');
        
        // Add shine to link
        link.appendChild(shine);
        
        // Animate shine position
        setTimeout(() => {
            shine.style.left = '120%';
        }, 50);
    }
    
    /**
     * Remove shine effect on mouse leave
     * @param {Event} e - The mouseleave event
     */
    function removeShineEffect(e) {
        const link = e.currentTarget;
        const shine = link.querySelector('.nav-shine');
        
        if (shine) {
            shine.remove();
        }
    }
    
    /**
     * Logo hover effect with subtle animations
     */
    function logoHoverEffect() {
        const squareLogo = document.querySelector('.square-logo');
        const textLogo = document.querySelector('.text-logo');
        
        if (squareLogo) {
            squareLogo.style.transform = 'rotate(5deg)';
        }
        
        if (textLogo) {
            textLogo.style.transform = 'translateY(-2px)';
        }
    }
    
    /**
     * Reset logo effects when mouse leaves
     */
    function logoLeaveEffect() {
        const squareLogo = document.querySelector('.square-logo');
        const textLogo = document.querySelector('.text-logo');
        
        if (squareLogo) {
            squareLogo.style.transform = '';
        }
        
        if (textLogo) {
            textLogo.style.transform = '';
        }
    }
});