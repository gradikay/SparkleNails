/**
 * Elegance Nail Salon - Improved Button Paint Effects
 * More responsive and visually appealing effects
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Create paint splatter container
    const splatterContainer = document.createElement('div');
    splatterContainer.className = 'paint-splatter-container';
    document.body.appendChild(splatterContainer);
    
    // Add highlight elements to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        const highlight = document.createElement('div');
        highlight.className = 'highlight';
        button.appendChild(highlight);
        
        // Add event listeners for effects
        button.addEventListener('click', createSplashEffect);
        button.addEventListener('touchstart', handleTouchStart, {passive: true});
        button.addEventListener('touchend', handleTouchEnd, {passive: true});
    });
    
    /**
     * Handle touch start on buttons
     * @param {TouchEvent} e - The touch event
     */
    function handleTouchStart(e) {
        this.classList.add('btn-touch-feedback');
        // We'll create the splash on touch end instead
    }
    
    /**
     * Handle touch end on buttons
     * @param {TouchEvent} e - The touch event
     */
    function handleTouchEnd(e) {
        this.classList.remove('btn-touch-feedback');
        createSplashEffect.call(this, e);
    }
    
    /**
     * Create paint splash effect when button is clicked/tapped
     * @param {Event} e - The event object
     */
    function createSplashEffect(e) {
        const button = this;
        
        // Determine color based on button type
        let color;
        if (button.classList.contains('btn-primary')) {
            color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#F8C3C8';
        } else if (button.classList.contains('btn-secondary')) {
            color = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#D4AF37';
        } else {
            color = '#FAF0E6';
        }
        
        // Get position for the splatter (from event or button center)
        let x, y;
        
        if (e.type === 'touchend' && e.changedTouches && e.changedTouches[0]) {
            // Touch position
            x = e.changedTouches[0].clientX;
            y = e.changedTouches[0].clientY;
        } else if (e.clientX && e.clientY) {
            // Mouse position
            x = e.clientX;
            y = e.clientY;
        } else {
            // Fallback to button center
            const rect = button.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        }
        
        // Create multiple splatters
        const splatterCount = Math.floor(Math.random() * 5) + 3; // 3-7 splatters
        
        for (let i = 0; i < splatterCount; i++) {
            createSplatter(x, y, color);
        }
        
        // Create small, quick splashes around the button
        for (let i = 0; i < 8; i++) {
            const rect = button.getBoundingClientRect();
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 30 + 20;
            const splashX = rect.left + rect.width/2 + Math.cos(angle) * distance;
            const splashY = rect.top + rect.height/2 + Math.sin(angle) * distance;
            
            createPaintSplash(splashX, splashY, color);
        }
    }
    
    /**
     * Create a single splatter element
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {string} color - Color for the splatter
     */
    function createSplatter(x, y, color) {
        // Create splatter element
        const splatter = document.createElement('div');
        splatter.className = 'paint-splatter';
        
        // Randomize properties
        const size = Math.random() * 40 + 20; // 20-60px
        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = (Math.random() - 0.5) * 60;
        const rotation = Math.random() * 360;
        
        // Create SVG background
        const splatterType = Math.floor(Math.random() * 3);
        let path;
        
        switch(splatterType) {
            case 0:
                path = 'M50,15 C70,15 85,30 85,50 C85,70 70,85 50,85 C30,85 15,70 15,50 C15,30 30,15 50,15 Z';
                break;
            case 1:
                path = 'M24,45 C20,25 43,15 60,20 C80,25 85,50 75,70 C65,85 40,80 30,65 C20,50 28,65 24,45 Z';
                break;
            case 2:
                path = 'M40,20 C60,10 85,30 80,50 C75,70 60,85 40,75 C20,65 10,40 25,30 C35,25 30,25 40,20 Z';
                break;
        }
        
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="${path}" fill="${color}" opacity="0.8"/></svg>`;
        const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        
        // Style the splatter
        splatter.style.width = `${size}px`;
        splatter.style.height = `${size}px`;
        splatter.style.left = `${x + offsetX}px`;
        splatter.style.top = `${y + offsetY}px`;
        splatter.style.backgroundImage = `url(${svgUrl})`;
        splatter.style.transform = `rotate(${rotation}deg)`;
        
        // Add to container
        splatterContainer.appendChild(splatter);
        
        // Add animation class
        setTimeout(() => {
            splatter.classList.add('animate');
        }, 10);
        
        // Remove after animation completes
        setTimeout(() => {
            splatter.remove();
        }, 800);
    }
    
    /**
     * Create small paint splash
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {string} color - Color for the splash
     */
    function createPaintSplash(x, y, color) {
        const splash = document.createElement('div');
        splash.className = 'paint-splash';
        
        if (color.includes('F8C3C8')) {
            splash.classList.add('paint-splash-primary');
        } else {
            splash.classList.add('paint-splash-secondary');
        }
        
        splash.style.left = `${x}px`;
        splash.style.top = `${y}px`;
        
        document.body.appendChild(splash);
        
        setTimeout(() => {
            splash.remove();
        }, 1000);
    }
});