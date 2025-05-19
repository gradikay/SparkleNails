/**
 * Elegance Nail Salon - Gallery JavaScript
 * Handles gallery filtering and lightbox functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // DOM Elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    // Variables
    let currentImageIndex = 0;
    let filteredItems = [];

    /**
     * Initialize gallery functionality
     */
    function initGallery() {
        // Set up gallery filtering
        filterButtons.forEach(button => {
            button.addEventListener('click', filterGallery);
        });

        // Set up gallery item click for lightbox
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(item, index));
        });

        // Lightbox controls
        setupLightboxControls();

        // Set initial filtered items to all items
        updateFilteredItems('all');
    }

    /**
     * Filter gallery items based on category
     */
    function filterGallery() {
        // Remove active class from all filter buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter category
        const filterValue = this.getAttribute('data-filter');
        
        // Update the filtered items array
        updateFilteredItems(filterValue);
        
        // Show/hide gallery items based on filter
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.classList.remove('hidden');
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }, 300);
            }
        });
    }

    /**
     * Update the filtered items array based on the filter
     * @param {string} filter - The filter category
     */
    function updateFilteredItems(filter) {
        filteredItems = Array.from(galleryItems).filter(item => {
            return filter === 'all' || item.classList.contains(filter);
        });
    }

    /**
     * Open the lightbox with the clicked gallery item
     * @param {Element} item - The gallery item that was clicked
     * @param {number} index - The index of the gallery item
     */
    function openLightbox(item, index) {
        // Find the index in filtered items
        const filteredIndex = filteredItems.indexOf(item);
        if (filteredIndex === -1) return;
        
        currentImageIndex = filteredIndex;
        
        // Get image source and caption
        const imgSrc = item.querySelector('img').src;
        const captionTitle = item.querySelector('h3').textContent;
        const captionDesc = item.querySelector('p').textContent;
        
        // Set lightbox content
        lightboxImg.src = imgSrc;
        lightboxCaption.innerHTML = `<h3>${captionTitle}</h3><p>${captionDesc}</p>`;
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close the lightbox
     */
    function closeLightboxHandler() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear lightbox image after transition
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    }

    /**
     * Set up lightbox control events
     */
    function setupLightboxControls() {
        // Close button
        closeLightbox.addEventListener('click', closeLightboxHandler);
        
        // Close on clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightboxHandler();
            }
        });
        
        // Previous button
        lightboxPrev.addEventListener('click', showPreviousImage);
        
        // Next button
        lightboxNext.addEventListener('click', showNextImage);
        
        // Keyboard navigation
        document.addEventListener('keydown', handleLightboxKeyboard);
    }

    /**
     * Show the previous image in the lightbox
     */
    function showPreviousImage(e) {
        e.stopPropagation();
        
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = filteredItems.length - 1;
        }
        
        updateLightboxImage();
    }

    /**
     * Show the next image in the lightbox
     */
    function showNextImage(e) {
        e.stopPropagation();
        
        currentImageIndex++;
        if (currentImageIndex >= filteredItems.length) {
            currentImageIndex = 0;
        }
        
        updateLightboxImage();
    }

    /**
     * Update the lightbox image and caption
     */
    function updateLightboxImage() {
        const item = filteredItems[currentImageIndex];
        const imgSrc = item.querySelector('img').src;
        const captionTitle = item.querySelector('h3').textContent;
        const captionDesc = item.querySelector('p').textContent;
        
        // Add fade-out class
        lightboxImg.classList.add('fade-out');
        
        // After a short delay, update the image and remove fade-out
        setTimeout(() => {
            lightboxImg.src = imgSrc;
            lightboxCaption.innerHTML = `<h3>${captionTitle}</h3><p>${captionDesc}</p>`;
            lightboxImg.classList.remove('fade-out');
        }, 200);
    }

    /**
     * Handle keyboard navigation for the lightbox
     * @param {KeyboardEvent} e - The keyboard event
     */
    function handleLightboxKeyboard(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightboxHandler();
                break;
            case 'ArrowLeft':
                showPreviousImage(e);
                break;
            case 'ArrowRight':
                showNextImage(e);
                break;
        }
    }

    // Initialize gallery
    initGallery();
});
