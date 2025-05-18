/**
 * Elegance Nail Salon - Button Paint Effects JavaScript
 * Adds interactive paint splash effects to buttons
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Create paint splatter container once
    const splatterContainer = document.createElement('div');
    splatterContainer.className = 'paint-splatter-container';
    document.body.appendChild(splatterContainer);

    // Add the brush highlight element to primary buttons
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        const brushHighlight = document.createElement('div');
        brushHighlight.className = 'brush-highlight';
        button.appendChild(brushHighlight);
    });

    // Get all buttons
    const buttons = document.querySelectorAll('.btn');
    
    // Add event listeners to all buttons
    buttons.forEach(button => {
        // Touch start effect for mobile
        button.addEventListener('touchstart', function() {
            this.classList.add('btn-touch-feedback');
        });
        
        // Touch end effect for mobile
        button.addEventListener('touchend', function() {
            this.classList.remove('btn-touch-feedback');
            createPaintSplash(this);
        });
        
        // Click effect for desktop
        button.addEventListener('click', function(e) {
            createPaintSplash(this);
        });
    });
    
    /**
     * Create paint splash effect when button is clicked
     * @param {Element} button - The button that was clicked
     */
    function createPaintSplash(button) {
        // Get the button color for the splash
        let splashColor;
        if (button.classList.contains('btn-primary')) {
            splashColor = '#F8C3C8'; // Pink
        } else if (button.classList.contains('btn-secondary')) {
            splashColor = '#D4AF37'; // Gold
        } else {
            splashColor = '#FAF0E6'; // Default
        }
        
        // Create 3-5 splatters for a nice effect
        const splatterCount = Math.floor(Math.random() * 3) + 3;
        
        for (let i = 0; i < splatterCount; i++) {
            // Create a splatter element
            const splatter = document.createElement('div');
            splatter.className = 'paint-splatter-element';
            
            // Random rotation for variety
            const rotation = Math.random() * 360;
            splatter.style.setProperty('--rotation', `${rotation}deg`);
            
            // Calculate position near the button
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Random offset from center
            const offsetX = (Math.random() - 0.5) * rect.width * 1.5;
            const offsetY = (Math.random() - 0.5) * rect.height * 1.5;
            
            // Set splatter position
            splatter.style.left = `${centerX + offsetX}px`;
            splatter.style.top = `${centerY + offsetY}px`;
            
            // Add to container
            splatterContainer.appendChild(splatter);
            
            // Remove after animation completes
            setTimeout(() => {
                splatter.remove();
            }, 1000);
        }
    }
});